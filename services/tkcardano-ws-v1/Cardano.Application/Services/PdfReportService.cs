using AutoMapper;
using Cardano.Application.Common.Enums;
using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Application.Interfaces.Services;
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
    public partial class PdfReportService : IPdfReportService
    {
        private readonly IThermalCalcService _thermalCalcService;
        private readonly IAccessoriesService _accessoriesService;
        private readonly IThermalAdjustmentService _thermalAdjustmentService;
        private readonly ICondenserImageService _condenserImageService;

        private readonly IMapper _mapper;
        private readonly ILogger<PdfReportService> _logger;

        public PdfReportService(
            IThermalCalcService thermalCalcService,
            IAccessoriesService accessoriesService,
            IThermalAdjustmentService thermalAdjustmentService,
            ICondenserImageService condenserImageService,
            ILogger<PdfReportService> logger,
            IMapper mapper)
        {
            _thermalCalcService = thermalCalcService;
            _accessoriesService = accessoriesService;
            _thermalAdjustmentService = thermalAdjustmentService;
            _condenserImageService = condenserImageService;

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
            string? condenserType,
            float maxWidth = 480)
        {
            try
            {
                var image = await _condenserImageService.TryGetImageAsync(
                    modelName,
                    airFlowDirection,
                    condenserType);

                if (image is null)
                    return;

                var img = new Image(ImageDataFactory.Create(image.Bytes));
                img.SetMaxWidth(maxWidth);
                img.SetHorizontalAlignment(HorizontalAlignment.CENTER);
                img.SetMarginTop(8);
                img.SetMarginBottom(4);
                doc.Add(img);

                _logger.LogInformation(
                    "Attached condenser image {ObjectKey} for model {ModelName}",
                    image.ObjectKey,
                    modelName);
            }
            catch (Exception ex)
            {
                // Never fail the report because of MinIO.
                _logger.LogWarning(ex, "Failed to attach condenser image for model {ModelName}", modelName);
            }
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
                            FormatEnergyValue(enerAnalysis.AirTempInlet),
                            FormatEnergyValue(enerAnalysis.Capacity),
                            FormatEnergyValue(enerAnalysis.AirFlow),
                            FormatEnergyValue(enerAnalysis.DpAir),
                            FormatEnergyValue(enerAnalysis.Spl),
                            FormatEnergyValue(enerAnalysis.Rpm),
                            FormatEnergyValue(enerAnalysis.Power),
                            FormatEnergyValue(enerAnalysis.CurrentFans),
                            FormatEnergyValue(enerAnalysis.TubeVolume),
                            FormatEnergyValue(enerAnalysis.Weight),
                            enerAnalysis.ConnectDiamInlet ?? string.Empty,
                            enerAnalysis.ConnectDiamOutlet ?? string.Empty,
                            FormatEnergyValue(enerAnalysis.Price)
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

        private static string FormatEnergyValue(double value)
        {
            return double.IsNaN(value) || double.IsInfinity(value)
                ? "-"
                : value.ToString("F2");
        }
    }
}
