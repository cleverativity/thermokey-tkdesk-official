using AutoMapper;
using Cardano.Application.Common.Enums;
using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Domain.Interfaces;
using iText.Commons.Bouncycastle.Cert.Ocsp;
using iText.IO.Font.Constants;
using iText.IO.Image;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Ocsp;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Services
{
    public class PdfReportService : IPdfReportService
    {
        private readonly IThermalCalcService _thermalCalcService;
        private readonly IAccessoriesService _accessoriesService;
        private readonly IThermalAdjustmentService _thermalAdjustmentService;
        // Lazy: MinIO client is created only when attaching the image (after DB work).
        private readonly Lazy<IObjectStorage> _objectStorage;

        private readonly IMapper _mapper;
        private readonly ILogger<PdfReportService> _logger;

        public PdfReportService(
            IThermalCalcService thermalCalcService,
            IAccessoriesService accessoriesService,
            IThermalAdjustmentService thermalAdjustmentService,
            Lazy<IObjectStorage> objectStorage,
            ILogger<PdfReportService> logger,
            IMapper mapper)
        {
            _thermalCalcService = thermalCalcService;
            _accessoriesService = accessoriesService;
            _thermalAdjustmentService = thermalAdjustmentService;
            _objectStorage = objectStorage;

            _mapper = mapper;
            _logger = logger;
        }

        /// <summary>
        /// Loads condenser drawing from MinIO using size number + folder tag
        /// (e.g. TMCH1163HUUDV → Table-type/HUU/TMK11-0-2-HUU.jpg).
        /// Runs only after DB/performance work; failures never fail the PDF.
        /// </summary>
        private async Task TryAddCondenserImageAsync(
            Document doc,
            string? modelName,
            string? airFlowDirection,
            string? condenserType)
        {
            try
            {
                if (!CondenserImageKeyResolver.TryParse(modelName, airFlowDirection, condenserType, out var parsed)
                    || parsed is null)
                {
                    _logger.LogWarning(
                        "Could not parse condenser model for report image: {ModelName}", modelName);
                    return;
                }

                _logger.LogInformation(
                    "Resolving condenser image for {ModelName} → root={Root}, series={Series}, size={Size}, airflow={AirFlow}",
                    modelName, parsed.RootFolder, parsed.Series, parsed.Size, airFlowDirection);

                var storage = _objectStorage.Value;
                byte[]? imageBytes = null;
                string? matchedKey = null;
                var attemptedKeys = new List<string>();

                // 1) List folder once, pick best key by size + series tag (avoids many slow GETs).
                //    This MinIO gateway often returns null S3Objects — then we fall through to candidates.
                var prefix = $"{parsed.RootFolder}/{parsed.Series}/";
                var listedKeys = await storage.ListObjectKeysAsync(prefix);
                matchedKey = CondenserImageKeyResolver.PickBestKey(listedKeys, parsed, airFlowDirection);

                if (matchedKey != null)
                {
                    attemptedKeys.Add(matchedKey);
                    imageBytes = await storage.GetObjectBytesAsync(matchedKey);
                }

                // 2) Fallback: try known filename candidates (TMK11-0-2-HUU.jpg, etc.)
                if (imageBytes is null || imageBytes.Length == 0)
                {
                    foreach (var key in CondenserImageKeyResolver.BuildCandidateKeys(parsed, airFlowDirection))
                    {
                        if (attemptedKeys.Contains(key, StringComparer.OrdinalIgnoreCase))
                            continue;

                        attemptedKeys.Add(key);
                        imageBytes = await storage.GetObjectBytesAsync(key);
                        if (imageBytes is { Length: > 0 })
                        {
                            matchedKey = key;
                            break;
                        }
                    }
                }

                if (imageBytes is null || imageBytes.Length == 0 || matchedKey is null)
                {
                    _logger.LogWarning(
                        "No MinIO condenser image found for model {ModelName} (series {Series}, size {Size}). Tried: {Keys}",
                        modelName, parsed.Series, parsed.Size, string.Join(", ", attemptedKeys.Take(12)));
                    return;
                }

                if (!LooksLikeSupportedImage(imageBytes))
                {
                    _logger.LogWarning(
                        "MinIO object {ObjectKey} for model {ModelName} is not a recognizable image ({Length} bytes, header={Header})",
                        matchedKey,
                        modelName,
                        imageBytes.Length,
                        BitConverter.ToString(imageBytes.Take(16).ToArray()));
                    return;
                }

                var img = new Image(ImageDataFactory.Create(imageBytes));
                img.SetMaxWidth(480);
                img.SetHorizontalAlignment(HorizontalAlignment.CENTER);
                img.SetMarginTop(12);
                img.SetMarginBottom(8);
                doc.Add(img);

                _logger.LogInformation("Attached condenser image {ObjectKey} for model {ModelName}", matchedKey, modelName);
            }
            catch (Exception ex)
            {
                // Never fail the report because of MinIO.
                _logger.LogWarning(ex, "Failed to attach condenser image for model {ModelName}", modelName);
            }
        }

        private static bool LooksLikeSupportedImage(byte[] bytes)
        {
            if (bytes.Length < 4)
                return false;

            if (bytes[0] == 0xFF && bytes[1] == 0xD8 && bytes[2] == 0xFF)
                return true;

            if (bytes[0] == 0x89 && bytes[1] == 0x50 && bytes[2] == 0x4E && bytes[3] == 0x47)
                return true;

            if (bytes[0] == 0x47 && bytes[1] == 0x49 && bytes[2] == 0x46)
                return true;

            if (bytes[0] == 0x42 && bytes[1] == 0x4D)
                return true;

            return false;
        }

        /// <summary>
        /// Tries to load thermokey_logo.png from server path (header/thermokey_logo.png) or from embedded resource.
        /// Returns an Image with the given width, or null if neither source is available.
        /// </summary>
        private Image? TryCreateLogoImage(float width)
        {
            const string logoFileName = "thermokey_logo.png";
            var filePath = System.IO.Path.GetFullPath(System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "header", logoFileName));
            if (File.Exists(filePath))
            {
                try
                {
                    var img = new Image(ImageDataFactory.Create(filePath)).SetWidth(width);
                    return img;
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to load logo from {Path}", filePath);
                }
            }
            else
            {
                _logger.LogDebug("Logo file not found at {Path}; trying embedded resource", filePath);
            }

            var asm = Assembly.GetExecutingAssembly();
            var resourceName = asm.GetManifestResourceNames().FirstOrDefault(n => n.EndsWith(".header.thermokey_logo.png", StringComparison.OrdinalIgnoreCase));
            if (resourceName != null)
            {
                try
                {
                    using var stream = asm.GetManifestResourceStream(resourceName);
                    if (stream != null)
                    {
                        using var ms = new MemoryStream();
                        stream.CopyTo(ms);
                        var img = new Image(ImageDataFactory.Create(ms.ToArray())).SetWidth(width);
                        return img;
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to load embedded logo resource");
                }
            }

            return null;
        }

        private void AddFooterToAllPages(PdfDocument pdf)
        {
            try
            {
                if (pdf == null || pdf.GetNumberOfPages() == 0)
                    return;

                int numberOfPages = pdf.GetNumberOfPages();
                var fontRegular = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);

                for (int i = 1; i <= numberOfPages; i++)
                {
                    try
                    {
                        PdfPage page = pdf.GetPage(i);

                        if (page == null)
                            continue;

                        Rectangle pageSize = page.GetPageSize();

                        if (pageSize == null)
                            continue;

                        float y = pageSize.GetBottom() + 30;
                        float pageWidth = pageSize.GetWidth();

                        // Get the page content stream for drawing - use last position to overlay on top
                        PdfCanvas canvas = new PdfCanvas(page.NewContentStreamAfter(), page.GetResources(), pdf);

                        // Draw horizontal line above footer
                        canvas.SetStrokeColor(ColorConstants.BLACK);
                        canvas.SetLineWidth(1);
                        canvas.MoveTo(30, y + 25);
                        canvas.LineTo(pageWidth - 30, y + 25);
                        canvas.Stroke();

                        // Draw footer text - centered "Manual" and "Version: BE_v1.13.0" below it
                        canvas.BeginText();
                        canvas.SetFontAndSize(fontRegular, 9);
                        canvas.MoveText(pageWidth / 2 - 20, y);
                        canvas.ShowText("Manual");
                        canvas.MoveText(-20, -14);
                        canvas.ShowText("Version: BE_v1.13.0");
                        canvas.EndText();

                        canvas.Release();
                    }
                    catch (Exception pageEx)
                    {
                        _logger.LogWarning(pageEx, $"Error adding footer to page {i}");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding footer to PDF pages");
            }
        }

        public async Task<byte[]> GenerateRemoteCondenserPdf(PerformanceReportsRequest dto)
        {
            try
            {
                using var ms = new MemoryStream();
                var writer = new PdfWriter(ms);
                var pdf = new PdfDocument(writer);
                var doc = new Document(pdf);
                doc.SetMargins(15, 15, 15, 20);

                var boldFont = PdfFontFactory.CreateFont("Helvetica-Bold");
                var fontRegular = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);
                var fontBold = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);

                // Define color scheme
                var headerBgColor = new DeviceRgb(52, 73, 94);      // Dark blue-gray
                var headerTextColor = ColorConstants.WHITE;
                var sectionBgColor = new DeviceRgb(236, 240, 241); // Light gray-blue
                var alternateRowColor = new DeviceRgb(245, 245, 245); // Very light gray

                List<PerformanceResponse> performance = new List<PerformanceResponse>();
                List<AccessoriesSelectedResponse> accessoriesPriceList = new List<AccessoriesSelectedResponse>();

                if (dto?.PerfRequest != null)
                    performance = await _thermalCalcService.GeneratePerformanceAsync(dto.PerfRequest);

                if (dto?.AccessPriceRequest != null)
                    accessoriesPriceList = await _accessoriesService.GetSelectedAccessoriesPerModel(dto.AccessPriceRequest);

                // -------------------------------------------------------
                //  HEADER TABLE (LOGO LEFT, ADDRESS RIGHT)
                // -------------------------------------------------------
                var headerTable = new Table(UnitValue.CreatePercentArray(new float[] { 40, 60 }));
                headerTable.SetWidth(UnitValue.CreatePercentValue(100));
                headerTable.SetBorder(Border.NO_BORDER);

                // ----- LEFT: LOGO -----
                var logoCell = new Cell();
                logoCell.SetBorder(Border.NO_BORDER);
                logoCell.SetVerticalAlignment(VerticalAlignment.TOP);
                var logoImg = TryCreateLogoImage(160);
                if (logoImg != null)
                    logoCell.Add(logoImg);
                else
                    logoCell.Add(new Paragraph("THERMAL KEY S.R.L.").SetFont(fontBold).SetFontSize(10));
                headerTable.AddCell(logoCell);

                // ----- RIGHT: COMPANY INFO -----
                var companyInfo = new Paragraph();
                companyInfo.Add(new Text("THERMAL KEY S.R.L.\n").SetFont(fontBold).SetFontSize(10));
                companyInfo.Add(new Text("Via dell'industria 1\n").SetFont(fontRegular).SetFontSize(8));
                companyInfo.Add(new Text("33061 Rivignano di Teor (UD) - ITALY\n").SetFont(fontRegular).SetFontSize(8));
                companyInfo.Add(new Text("Tel: +39/0432772300\n").SetFont(fontRegular).SetFontSize(8));
                companyInfo.Add(new Text("Fax: +39/0432779734").SetFont(fontRegular).SetFontSize(8));

                var rightCell = new Cell();
                rightCell.Add(companyInfo);
                rightCell.SetBorder(Border.NO_BORDER);
                rightCell.SetTextAlignment(TextAlignment.RIGHT);
                rightCell.SetVerticalAlignment(VerticalAlignment.TOP);
                headerTable.AddCell(rightCell);
                doc.Add(headerTable);

                // Add solid line break
                var line = new Paragraph();
                line.SetBorder(new SolidBorder(ColorConstants.BLACK, 1f));
                line.SetMarginTop(10);
                line.SetMarginBottom(15);
                doc.Add(line);

                // -------------------------------------------------------
                //  TECHNICAL DATA TABLE - Two Column Layout
                // -------------------------------------------------------
                var tech = new Table(UnitValue.CreatePercentArray(new float[] { 50, 50 }));
                tech.UseAllAvailableWidth();
                tech.SetBorder(Border.NO_BORDER);

                // REMOTE CONDENSERS - Full width header
                var remoteHeaderCell = new Cell(1, 2);
                var p0 = new Paragraph(LocalizationHelper.GetLabel("RemoteCondensers", dto?.Language ?? SupportedLanguage.English));
                p0.SetFont(boldFont);
                p0.SetFontSize(8);
                p0.SetMarginTop(6);
                p0.SetMarginBottom(4);
                remoteHeaderCell.Add(p0);
                tech.AddCell(remoteHeaderCell);

                // Model Row
                var p2Label = new Paragraph(LocalizationHelper.GetLabel("Model", dto?.Language ?? SupportedLanguage.English));
                p2Label.SetFont(boldFont);
                p2Label.SetFontSize(8);
                tech.AddCell(p2Label);

                var p2Value = new Paragraph(performance[0].ModelName ?? "N/A");
                p2Value.SetFont(boldFont);
                p2Value.SetFontSize(8);
                tech.AddCell(p2Value);

                // TECHNICAL DATA - Full width header
                var techHeaderCell = new Cell(1, 2);
                var p3 = new Paragraph(LocalizationHelper.GetLabel("TechnicalData", dto?.Language ?? SupportedLanguage.English));
                p3.SetFont(boldFont);
                p3.SetFontSize(8);
                p3.SetMarginTop(6);
                p3.SetMarginBottom(4);
                techHeaderCell.Add(p3);
                tech.AddCell(techHeaderCell);

                // Helper function to create a formatted cell
                Func<string, string, Cell> CreateTechCell = (labelKey, value) =>
                {
                    var cell = new Cell();
                    var para = new Paragraph();
                    var localizedLabel = LocalizationHelper.GetLabel(labelKey, dto?.Language ?? SupportedLanguage.English);
                    para.Add(new Text(localizedLabel + ": ").SetFont(fontRegular).SetFontSize(8));
                    para.Add(new Text(value).SetFont(fontRegular).SetFontSize(8));
                    para.SetFontSize(8);
                    cell.Add(para);
                    cell.SetPadding(3);
                    return cell;
                };

                foreach (var perfTechnical in performance)
                {
                    tech.AddCell(CreateTechCell("RealCapacity", perfTechnical.Capacity.ToString("F2")));
                    tech.AddCell(CreateTechCell("RequestedCondensingTemp", perfTechnical.At_Requested_Condensing_Temp.ToString()));

                    tech.AddCell(CreateTechCell("RequestedCapacity", perfTechnical.Thermal_capacity.ToString()));
                    tech.AddCell(CreateTechCell("RealCondensingTemp", perfTechnical.At_Real_Condensing_Temp.ToString()));

                    tech.AddCell(CreateTechCell("Ratio", perfTechnical.Ratio.ToString()));
                    tech.AddCell(CreateTechCell("DesuperHeatTemp", perfTechnical.DesuperHeatTemp.ToString()));

                    tech.AddCell(CreateTechCell("RefrigerantType", perfTechnical.RefrigerantType));
                    tech.AddCell(CreateTechCell("SubCoolingTemp", perfTechnical.SubCooling_Temp.ToString()));

                    tech.AddCell(CreateTechCell("AirInletTemp", perfTechnical.InterAirTemp.ToString()));
                    tech.AddCell(CreateTechCell("AirOutletTemp", perfTechnical.OutletAir_Temp.ToString()));

                    tech.AddCell(CreateTechCell("Altitude", perfTechnical.Altitude.ToString()));
                    tech.AddCell(CreateTechCell("RefSidePressureDrop", perfTechnical.RefrigerantTSidePressureDrop.ToString()));

                    tech.AddCell(CreateTechCell("AirFlow", perfTechnical.AirFlow.ToString()));
                    tech.AddCell(CreateTechCell("AirSidePressureDrop", perfTechnical.AirSidePressureDrop.ToString()));

                    tech.AddCell(CreateTechCell("SPLAccessories", perfTechnical.SPLinAccountEN1387.ToString()));
                    tech.AddCell(CreateTechCell("AtDistance", perfTechnical.AtDistance.ToString()));

                    tech.AddCell(CreateTechCell("AcousticPowerLevel", perfTechnical.AccousticPowerLevel.ToString()));
                    tech.AddCell(CreateTechCell("MaterialCasing", perfTechnical.MaterialCasing));

                    tech.AddCell(CreateTechCell("AirHumidity", perfTechnical.AirHumidity.ToString()));
                    tech.AddCell(CreateTechCell("Weight", perfTechnical.Weights.ToString()));

                    tech.AddCell(CreateTechCell("FinMaterial", perfTechnical.Altitude.ToString()));
                    tech.AddCell(CreateTechCell("InternalVolume", perfTechnical.Internal_vol.ToString()));

                    // Surface - Full width cell
                    var surfaceCell = new Cell(1, 2);
                    var surfacePara = new Paragraph();
                    surfacePara.Add(new Text(LocalizationHelper.GetLabel("Surface", dto?.Language ?? SupportedLanguage.English) + " ")
                        .SetFont(fontRegular).SetFontSize(8));
                    surfacePara.Add(new Text(perfTechnical.Surface.ToString("F1"))
                        .SetFont(fontRegular).SetFontSize(8));
                    surfaceCell.Add(surfacePara);
                    surfaceCell.SetPadding(3);
                    tech.AddCell(surfaceCell);
                }

                doc.Add(tech);


                // -------------------------------------------------------
                //  INLETS & OUTLETS TABLE
                // -------------------------------------------------------
                var inlet_outlet = new Table(UnitValue.CreatePercentArray(new float[] { 33.33f, 33.33f, 33.33f }));
                inlet_outlet.UseAllAvailableWidth();

                // Helper function
                Func<string, string, Cell> CreateInletOutletCell = (labelKey, value) =>
                {
                    var cell = new Cell();
                    var para = new Paragraph();
                    var localizedLabel = LocalizationHelper.GetLabel(labelKey, dto?.Language ?? SupportedLanguage.English);
                    para.Add(new Text(localizedLabel + ": ").SetFont(fontRegular).SetFontSize(8));
                    para.Add(new Text(value).SetFont(fontRegular).SetFontSize(8));
                    cell.Add(para);
                    cell.SetPadding(3);
                    return cell;
                };

                // Header cell
                var inletOutletHeaderCell = new Cell(1, 3);
                var inletOutletHeaderPara = new Paragraph(LocalizationHelper.GetLabel("InletsOutlets", dto?.Language ?? SupportedLanguage.English));
                inletOutletHeaderPara.SetFont(boldFont);
                inletOutletHeaderPara.SetFontSize(8);
                inletOutletHeaderPara.SetMarginTop(6);
                inletOutletHeaderPara.SetMarginBottom(4);
                inletOutletHeaderCell.Add(inletOutletHeaderPara);
                inlet_outlet.AddCell(inletOutletHeaderCell);

                foreach (var perfOutInlet in performance)
                {
                    inlet_outlet.AddCell(CreateInletOutletCell("OutletConnection", perfOutInlet.Outlet_connection ?? "N/A"));
                    inlet_outlet.AddCell(CreateInletOutletCell("InletConnection", perfOutInlet.Inlet_connection ?? "N/A"));
                    inlet_outlet.AddCell(CreateInletOutletCell("PositionConnections", perfOutInlet.Position_connection ?? "N/A"));
                }

                doc.Add(inlet_outlet);


                // -------------------------------------------------------
                //  FAN TECHNICAL DATA TABLE
                // -------------------------------------------------------
                var fan_technical = new Table(UnitValue.CreatePercentArray(new float[] { 33.33f, 33.33f, 33.33f }));
                fan_technical.UseAllAvailableWidth();

                // Helper function
                Func<string, string, Cell> CreateFanCell = (labelKey, value) =>
                {
                    var cell = new Cell();
                    var para = new Paragraph();
                    var localizedLabel = LocalizationHelper.GetLabel(labelKey, dto?.Language ?? SupportedLanguage.English);
                    para.Add(new Text(localizedLabel + ": ").SetFont(fontRegular).SetFontSize(8));
                    para.Add(new Text(value).SetFont(fontRegular).SetFontSize(8));
                    cell.Add(para);
                    cell.SetPadding(3);
                    return cell;
                };

                // Header cell
                var fanHeaderCell = new Cell(1, 3);
                var fanHeaderPara = new Paragraph(LocalizationHelper.GetLabel("FanTechnicalData", dto?.Language ?? SupportedLanguage.English));
                fanHeaderPara.SetFont(boldFont);
                fanHeaderPara.SetFontSize(8);
                fanHeaderPara.SetMarginTop(6);
                fanHeaderPara.SetMarginBottom(4);
                fanHeaderCell.Add(fanHeaderPara);
                fan_technical.AddCell(fanHeaderCell);

                foreach (var perfFan in performance)
                {
                    fan_technical.AddCell(CreateFanCell("NumberOfFans", perfFan.No_fans.ToString()));
                    fan_technical.AddCell(CreateFanCell("SPL", perfFan.Spl.ToString()));
                    fan_technical.AddCell(CreateFanCell("Link", perfFan.Link ?? "N/A"));

                    fan_technical.AddCell(CreateFanCell("PowerLevel", perfFan.Power_level.ToString()));
                    fan_technical.AddCell(CreateFanCell("RPM", perfFan.Rpm_max.ToString()));
                    fan_technical.AddCell(CreateFanCell("Voltage", perfFan.Voltage.ToString()));

                    fan_technical.AddCell(CreateFanCell("PowerMax", perfFan.Power_max.ToString()));
                    fan_technical.AddCell(CreateFanCell("Frequency", perfFan.Frequency.ToString()));
                    fan_technical.AddCell(CreateFanCell("CurrentMax", perfFan.Current_a_max.ToString("F2")));
                }

                doc.Add(fan_technical);


                // -------------------------------------------------------
                //  ACCESSORIES LIST TABLE
                // -------------------------------------------------------
                var acc = new Table(UnitValue.CreatePercentArray(new float[] { 50, 50 }));
                acc.UseAllAvailableWidth();
                acc.SetBorder(new SolidBorder(ColorConstants.BLACK, 1f));

                // ACCESSORIES LIST header - Full width
                var accHeaderCell = new Cell(1, 2);
                var accHeaderPara = new Paragraph(LocalizationHelper.GetLabel("AccessoriesList", dto?.Language ?? SupportedLanguage.English));
                accHeaderPara.SetFont(boldFont);
                accHeaderPara.SetFontSize(8);
                accHeaderPara.SetPaddingLeft(3);
                accHeaderPara.SetMarginTop(6);
                accHeaderPara.SetMarginBottom(4);
                accHeaderCell.Add(accHeaderPara);
                accHeaderCell.SetBorder(new SolidBorder(ColorConstants.BLACK, 1f));
                acc.AddCell(accHeaderCell);

                // ACCESSORIES LIST
                foreach (var accessory in accessoriesPriceList)
                {
                    if (accessory.AccessoriesItems != null)
                    {
                        foreach (var accItem in accessory.AccessoriesItems)
                        {
                            // Accessory Item Name
                            var accCell1 = new Cell();
                            accCell1.Add(new Paragraph(accItem.Item + ":").SetFont(fontBold).SetFontSize(8).SetPaddingLeft(3));
                            accCell1.SetTextAlignment(TextAlignment.LEFT);
                            accCell1.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                            accCell1.SetBorder(Border.NO_BORDER);
                            acc.AddCell(accCell1);

                            // Accessory Price Data
                            var dataCell1 = new Cell();
                            dataCell1.Add(new Paragraph("€ " + accItem.Price).SetFont(fontRegular).SetFontSize(8).SetPaddingRight(3));
                            dataCell1.SetPadding(1);
                            dataCell1.SetTextAlignment(TextAlignment.RIGHT);
                            dataCell1.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                            dataCell1.SetBorder(Border.NO_BORDER);
                            acc.AddCell(dataCell1);
                        }
                    }
                }

                doc.Add(acc);

                // PAGE BREAK
                doc.Add(new AreaBreak());

                // -------------------------------------------------------
                //  PRICE DETAILS TABLE
                // -------------------------------------------------------
                var priceTable = new Table(UnitValue.CreatePercentArray(new float[] { 50, 50 }));
                priceTable.UseAllAvailableWidth();
                priceTable.SetBorder(new SolidBorder(ColorConstants.BLACK, 1f));

                // SUMMARY PRICE header - Full width
                var priceHeaderCell = new Cell(1, 2);
                var priceHeaderPara = new Paragraph(LocalizationHelper.GetLabel("PriceDetails", dto?.Language ?? SupportedLanguage.English));
                priceHeaderPara.SetFont(boldFont);
                priceHeaderPara.SetFontSize(8);
                priceHeaderPara.SetPaddingLeft(3);
                priceHeaderPara.SetMarginTop(6);
                priceHeaderPara.SetMarginBottom(4);
                priceHeaderCell.Add(priceHeaderPara);
                priceHeaderCell.SetBorder(new SolidBorder(ColorConstants.BLACK, 1f));
                priceTable.AddCell(priceHeaderCell);

                foreach (var accessory in accessoriesPriceList)
                {
                    // Gross Unit Price
                    var priceCell1 = new Cell();
                    priceCell1.Add(new Paragraph(LocalizationHelper.GetLabel("GrossUnitPrice", dto?.Language ?? SupportedLanguage.English))
                        .SetFont(fontBold).SetFontSize(8).SetPaddingLeft(3));
                    priceCell1.SetTextAlignment(TextAlignment.LEFT);
                    priceCell1.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    priceCell1.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(priceCell1);

                    var dataCell1 = new Cell();
                    dataCell1.Add(new Paragraph("€ " + accessory.TotalNetPrice).SetFont(fontRegular).SetFontSize(8).SetPaddingRight(3));
                    dataCell1.SetTextAlignment(TextAlignment.RIGHT);
                    dataCell1.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    dataCell1.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(dataCell1);

                    // Accessories Price
                    var priceCell2 = new Cell();
                    priceCell2.Add(new Paragraph(LocalizationHelper.GetLabel("AccessoriesPrice", dto?.Language ?? SupportedLanguage.English))
                        .SetFont(fontBold).SetFontSize(8).SetPaddingLeft(3));
                    priceCell2.SetTextAlignment(TextAlignment.LEFT);
                    priceCell2.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    priceCell2.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(priceCell2);

                    var dataCell2 = new Cell();
                    dataCell2.Add(new Paragraph("€ " + accessory.AccessoriesPrice).SetFont(fontRegular).SetFontSize(8).SetPaddingRight(3));
                    dataCell2.SetTextAlignment(TextAlignment.RIGHT);
                    dataCell2.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    dataCell2.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(dataCell2);

                    // Total Gross Price
                    var priceCell3 = new Cell();
                    priceCell3.Add(new Paragraph(LocalizationHelper.GetLabel("TotalGrossPrice", dto?.Language ?? SupportedLanguage.English))
                        .SetFont(fontBold).SetFontSize(8).SetPaddingLeft(3));
                    priceCell3.SetTextAlignment(TextAlignment.LEFT);
                    priceCell3.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    priceCell3.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(priceCell3);

                    var dataCell3 = new Cell();
                    dataCell3.Add(new Paragraph("€ " + accessory.UnitPrice).SetFont(fontRegular).SetFontSize(8).SetPaddingRight(3));
                    dataCell3.SetPadding(5);
                    dataCell3.SetTextAlignment(TextAlignment.RIGHT);
                    dataCell3.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    dataCell3.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(dataCell3);

                    // Discount
                    var priceCell4 = new Cell();
                    priceCell4.Add(new Paragraph(LocalizationHelper.GetLabel("Discount", dto?.Language ?? SupportedLanguage.English))
                        .SetFont(fontBold).SetFontSize(8).SetPaddingLeft(3));
                    priceCell4.SetTextAlignment(TextAlignment.LEFT);
                    priceCell4.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    priceCell4.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(priceCell4);

                    var dataCell4 = new Cell();
                    dataCell4.Add(new Paragraph("€ " + accessory.Discount.ToString("F2")).SetFont(fontRegular).SetFontSize(8).SetPaddingRight(3));
                    dataCell4.SetTextAlignment(TextAlignment.RIGHT);
                    dataCell4.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    dataCell4.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(dataCell4);

                    // Total Net Price
                    var priceCell5 = new Cell();
                    priceCell5.Add(new Paragraph(LocalizationHelper.GetLabel("TotalNetPrice", dto?.Language ?? SupportedLanguage.English))
                        .SetFont(fontBold).SetFontSize(8).SetPaddingLeft(3));
                    priceCell5.SetTextAlignment(TextAlignment.LEFT);
                    priceCell5.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    priceCell5.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(priceCell5);

                    var dataCell5 = new Cell();
                    dataCell5.Add(new Paragraph("€ " + accessory.TotalNetPrice).SetFont(fontRegular).SetFontSize(8).SetPaddingRight(3));
                    dataCell5.SetTextAlignment(TextAlignment.RIGHT);
                    dataCell5.SetVerticalAlignment(VerticalAlignment.MIDDLE);
                    dataCell5.SetBorder(Border.NO_BORDER);
                    priceTable.AddCell(dataCell5);
                }

                doc.Add(priceTable);



                // -------------------------------------------------------
                //  GEOMETRIC PARAMETERS TABLE
                // -------------------------------------------------------
                var geoTable = new Table(UnitValue.CreatePercentArray(new float[] { 50, 50 }));
                geoTable.UseAllAvailableWidth();

                // Geometric Parameters header - Full width
                var geoHeaderCell = new Cell(1, 2);
                var geoHeaderPara = new Paragraph(LocalizationHelper.GetLabel("GeometricParameters", dto?.Language ?? SupportedLanguage.English));
                geoHeaderPara.SetFont(boldFont);
                geoHeaderPara.SetFontSize(8);
                geoHeaderPara.SetMarginTop(6);
                geoHeaderPara.SetMarginBottom(4);
                geoHeaderCell.Add(geoHeaderPara);
                geoTable.AddCell(geoHeaderCell);

                foreach (var perfGeometric in performance)
                {
                    if (dto?.PerfRequest?.AirFlowDirection == "Vertical")
                    {
                        geoTable.AddCell(CreateTechCell("LengthValue1", perfGeometric.lvl1.ToString()));
                        geoTable.AddCell(CreateTechCell("LengthValue2", perfGeometric.lvl2.ToString()));

                        geoTable.AddCell(CreateTechCell("LengthValue3", perfGeometric.lvl3.ToString()));
                        geoTable.AddCell(CreateTechCell("LengthValue4", perfGeometric.lvl4.ToString()));

                        geoTable.AddCell(CreateTechCell("LengthValue5", perfGeometric.lvl5.ToString()));
                        geoTable.AddCell(CreateTechCell("WidthValue1", perfGeometric.Wv1.ToString()));

                        geoTable.AddCell(CreateTechCell("WidthValue2", perfGeometric.Wv2.ToString()));
                        geoTable.AddCell(CreateTechCell("HeightValue1", perfGeometric.Hv1.ToString()));

                        geoTable.AddCell(CreateTechCell("HeightValue2", perfGeometric.Hv2.ToString()));
                        geoTable.AddCell(CreateTechCell("HeightValue3", perfGeometric.Hv3.ToString()));

                        geoTable.AddCell(CreateTechCell("HeightValue4", perfGeometric.Hv4.ToString()));
                        geoTable.AddCell(CreateTechCell("P1", perfGeometric.P1.ToString()));

                        // Dv1 - Full width cell
                        var dv1Cell = new Cell(1, 2);
                        var dv1Para = new Paragraph();
                        dv1Para.Add(new Text(LocalizationHelper.GetLabel("Dv1", dto?.Language ?? SupportedLanguage.English) + " ")
                            .SetFont(fontRegular).SetFontSize(7));
                        dv1Para.Add(new Text(perfGeometric.Dv1.ToString())
                            .SetFont(fontRegular).SetFontSize(7));
                        dv1Cell.Add(dv1Para);
                        dv1Cell.SetPadding(3);
                        geoTable.AddCell(dv1Cell);
                    }
                    else
                    {
                        geoTable.AddCell(CreateTechCell("LengthHorizontal1", perfGeometric.lh1.ToString()));
                        geoTable.AddCell(CreateTechCell("LengthHorizontal2", perfGeometric.lh2.ToString()));

                        geoTable.AddCell(CreateTechCell("LengthHorizontal3", perfGeometric.lh3.ToString()));
                        geoTable.AddCell(CreateTechCell("LengthHorizontal4", perfGeometric.lh4.ToString()));

                        geoTable.AddCell(CreateTechCell("LengthHorizontal5", perfGeometric.lh5.ToString()));
                        geoTable.AddCell(CreateTechCell("WidthHorizontal1", perfGeometric.Wh1.ToString()));

                        geoTable.AddCell(CreateTechCell("WidthHorizontal2", perfGeometric.Wh2.ToString()));
                        geoTable.AddCell(CreateTechCell("WidthHorizontal3", perfGeometric.Wh3.ToString()));

                        geoTable.AddCell(CreateTechCell("WidthHorizontal4", perfGeometric.Wh4.ToString()));
                        geoTable.AddCell(CreateTechCell("HeightHorizontal1", perfGeometric.Hh1.ToString()));

                        geoTable.AddCell(CreateTechCell("HeightHorizontal2", perfGeometric.Hh2.ToString()));
                        geoTable.AddCell(CreateTechCell("HeightHorizontal3", perfGeometric.Hh3.ToString()));

                        geoTable.AddCell(CreateTechCell("HeightHorizontal4", perfGeometric.Hh4.ToString()));
                        geoTable.AddCell(CreateTechCell("P2", perfGeometric.P2.ToString()));

                        // Dh1 - Full width cell
                        var dh1Cell = new Cell(1, 2);
                        var dh1Para = new Paragraph();
                        dh1Para.Add(new Text(LocalizationHelper.GetLabel("Dh1", dto?.Language ?? SupportedLanguage.English) + " ")
                            .SetFont(fontRegular).SetFontSize(7));
                        dh1Para.Add(new Text(perfGeometric.Dh1.ToString())
                            .SetFont(fontRegular).SetFontSize(7));
                        dh1Cell.Add(dh1Para);
                        dh1Cell.SetPadding(3);
                        geoTable.AddCell(dh1Cell);
                    }
                }

                // Notes - Full width cell spanning 2 columns
                var notesCell = new Cell(1, 2);
                var notesPara = new Paragraph();
                notesPara.SetFontSize(8);
                notesPara.SetTextAlignment(TextAlignment.LEFT);
                notesPara.Add(new Text(LocalizationHelper.GetLabel("Note1", dto?.Language ?? SupportedLanguage.English) + "\n").SetFont(fontRegular).SetFontSize(8));
                notesPara.Add(new Text(LocalizationHelper.GetLabel("Note2", dto?.Language ?? SupportedLanguage.English) + "\n").SetFont(fontRegular).SetFontSize(8));
                notesPara.Add(new Text(LocalizationHelper.GetLabel("Note3", dto?.Language ?? SupportedLanguage.English) + "\n").SetFont(fontRegular).SetFontSize(8));
                notesPara.Add(new Text(LocalizationHelper.GetLabel("Note4", dto?.Language ?? SupportedLanguage.English) + "\n").SetFont(fontRegular).SetFontSize(8));
                notesPara.Add(new Text(LocalizationHelper.GetLabel("Note5", dto?.Language ?? SupportedLanguage.English) + "\n").SetFont(fontRegular).SetFontSize(8));
                notesPara.Add(new Text(LocalizationHelper.GetLabel("Note6", dto?.Language ?? SupportedLanguage.English)).SetFont(fontRegular).SetFontSize(8));
                notesCell.Add(notesPara);
                notesCell.SetPadding(5);
                geoTable.AddCell(notesCell);

                doc.Add(geoTable);

                // MinIO drawing — after all DB-backed content is already loaded
                var modelName = performance.FirstOrDefault()?.ModelName
                    ?? dto?.PerfRequest?.RemoteModel;
                await TryAddCondenserImageAsync(
                    doc,
                    modelName,
                    dto?.PerfRequest?.AirFlowDirection,
                    dto?.PerfRequest?.CondenserType);

                // Add footer to all pages BEFORE closing the document
                AddFooterToAllPages(pdf);

                // Close document
                doc.Close();

                // Close PDF document
                pdf.Close();

                return ms.ToArray();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating RemoteCondenser PDF");
                throw;
            }
        }

        public async Task<byte[]> GenerateEnergyAnalysisPdf(EAnalysisReportsRequest dto)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                PdfWriter writer = new PdfWriter(ms);

                PageSize pdfPageSize = new PageSize(
                    PageSize.A4.GetHeight(),
                    PageSize.A4.GetWidth() * 2
                );
                pdfPageSize.Rotate();

                PdfDocument pdf = new PdfDocument(writer);
                pdf.SetDefaultPageSize(pdfPageSize);

                Document doc = new Document(pdf);

                PdfFont boldFont = PdfFontFactory.CreateFont("Helvetica-Bold");

                // -------------------------------------------------------
                // LOAD FONTS
                // -------------------------------------------------------
                PdfFont fontRegular = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);
                PdfFont fontBold = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);

                // -------------------------------------------------------
                // HEADER TABLE (LOGO LEFT, ADDRESS RIGHT)
                // -------------------------------------------------------
                Table headerTable = new Table(UnitValue.CreatePercentArray(new float[] { 40, 60 }));
                headerTable.SetWidth(UnitValue.CreatePercentValue(100));

                // ----- LEFT: LOGO -----
                var logoCell = new Cell().SetBorder(Border.NO_BORDER);
                var logoImgEnergy = TryCreateLogoImage(180);
                if (logoImgEnergy != null)
                    logoCell.Add(logoImgEnergy);
                else
                    logoCell.Add(new Paragraph("THERMAL KEY S.R.L.").SetFont(fontBold).SetFontSize(10));
                headerTable.AddCell(logoCell);

                // ----- RIGHT: COMPANY INFO -----
                Paragraph address = new Paragraph();
                address.Add(new Text("Via dell'industria 1\n").SetFont(fontRegular).SetFontSize(8));
                address.Add(new Text("33061 Rivignano di Teor (UD) - ITALY\n").SetFont(fontRegular).SetFontSize(8));
                address.Add(new Text("Tel: +39/0432772300 - Fax: +39/0432779734").SetFont(fontRegular).SetFontSize(8));

                Cell rightCell = new Cell();
                rightCell.Add(address);
                rightCell.SetBorder(Border.NO_BORDER);
                rightCell.SetTextAlignment(TextAlignment.RIGHT);
                rightCell.SetVerticalAlignment(VerticalAlignment.MIDDLE);

                headerTable.AddCell(rightCell);

                doc.Add(headerTable);

                // Solid line break
                Paragraph line = new Paragraph();
                line.SetBorder(new SolidBorder(ColorConstants.BLACK, 1));
                line.SetMarginTop(0);
                line.SetMarginBottom(10);
                doc.Add(line);

                // Title
                Paragraph titlePara = new Paragraph(
                    LocalizationHelper.GetLabel("EnergyAnalysisReport", dto?.Language ?? SupportedLanguage.English)
                );
                titlePara.SetFont(fontBold);
                titlePara.SetFontSize(14);
                titlePara.SetTextAlignment(TextAlignment.CENTER);
                titlePara.SetMarginBottom(10);
                doc.Add(titlePara);

                // ENERGY ANALYSIS TABLE (13 columns)
                Table energyTable = new Table(
                    UnitValue.CreatePercentArray(new float[]
                    {
            7.7f, 7.7f, 7.7f, 7.7f, 7.7f, 7.7f, 7.7f,
            7.7f, 7.7f, 7.7f, 7.7f, 7.7f, 7.7f
                    })
                );
                energyTable.UseAllAvailableWidth();
                energyTable.SetBorder(new SolidBorder(ColorConstants.BLACK, 1));

                // Headers
                string[] headers =
                {
                    LocalizationHelper.GetLabel("AirTempInlet", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("Capacity", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("AirFlow", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("DpAir", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("SPL", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("RPMTable", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("Power", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("CurrentAllFans", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("TubeVolume", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("Weight", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("ConnectDiamInlet", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("ConnectDiamOutlet", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("Price", dto ?.Language ?? SupportedLanguage.English)
                 };

                foreach (string header in headers)
                {
                    Cell headerCell = new Cell();
                    Paragraph headerPara = new Paragraph(header)
                        .SetFont(fontBold)
                        .SetFontSize(7)
                        .SetTextAlignment(TextAlignment.CENTER);

                    headerCell.Add(headerPara);
                    headerCell.SetPadding(3);
                    headerCell.SetBackgroundColor(ColorConstants.LIGHT_GRAY);

                    energyTable.AddCell(headerCell);
                }

                // Units row
                string[] units =
                {
                    LocalizationHelper.GetLabel("[°C]", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[kW]", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[m^3/h] ", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[Pa]", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[dB(A)]@m ", dto ?.Language ?? SupportedLanguage.English),
                    "",
                    LocalizationHelper.GetLabel("[Watt]", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[A]", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[dm^3] ", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[kg]", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[mm]", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[mm] ", dto ?.Language ?? SupportedLanguage.English),
                    LocalizationHelper.GetLabel("[€]", dto ?.Language ?? SupportedLanguage.English)
                };

                foreach (string unit in units)
                {
                    Cell unitCell = new Cell();
                    Paragraph unitPara = new Paragraph(unit)
                        .SetFont(fontRegular)
                        .SetFontSize(6)
                        .SetTextAlignment(TextAlignment.CENTER);

                    unitCell.Add(unitPara);
                    unitCell.SetPadding(2);
                    unitCell.SetBackgroundColor(ColorConstants.WHITE);

                    energyTable.AddCell(unitCell);
                }


                List<EAnalysisResponse> energyAnalysis = new();

                var request = dto?.EAnalysisRequest;
                if (request != null)
                {
                    energyAnalysis = await _thermalAdjustmentService.GetEAnalysisAsync(request);
                }


                if (energyAnalysis != null)
                {
                    foreach (var enerAnalysis in energyAnalysis)
                    {
                        string[] dataValues =
                        {
                            enerAnalysis.AirTempInlet.ToString("F2"),
                            enerAnalysis.Capacity.ToString("F2"),
                            enerAnalysis.AirFlow.ToString("F2"),
                            enerAnalysis.DpAir.ToString("F2"),
                            enerAnalysis.Spl.ToString("F2"),
                            enerAnalysis.Rpm.ToString("F2"),
                            enerAnalysis.Power.ToString("F2"),
                            enerAnalysis.CurrentFans.ToString("F2"),
                            enerAnalysis.TubeVolume.ToString("F2"),
                            enerAnalysis.Weight.ToString("F2"),
                            enerAnalysis.ConnectDiamInlet ?? string.Empty,
                            enerAnalysis.ConnectDiamOutlet ?? string.Empty,
                            enerAnalysis.Price.ToString("F2")
                        };

                        foreach (string value in dataValues)
                        {
                            Cell dataCell = new Cell();
                            Paragraph dataPara = new Paragraph(value ?? string.Empty)
                                .SetFont(fontRegular)
                                .SetFontSize(8)
                                .SetTextAlignment(TextAlignment.CENTER);

                            dataCell.Add(dataPara);
                            dataCell.SetPadding(2);

                            energyTable.AddCell(dataCell);
                        }
                    }
                }

                doc.Add(energyTable);

                doc.Close();

                return ms.ToArray();
            }
        }
    }
}