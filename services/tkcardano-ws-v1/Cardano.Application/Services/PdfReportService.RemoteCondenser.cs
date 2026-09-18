using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Action;
using iText.Kernel.Pdf.Annot;
using iText.Kernel.Pdf.Canvas;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.Extensions.Logging;

namespace Cardano.Application.Services
{
    /// <summary>
    /// Remote Condenser technical data sheet.
    /// Typography / rules / alignment measured from ThermoKey Dry Cooler datasheet
    /// (LiberationSans 7.7 body, 0.7pt rules, equal two-column label← →value).
    /// </summary>
    public partial class PdfReportService
    {
        // Measured from MSMWR2591D12M1 (EC) datasheet PDF
        private const float DsMargin = 26f;
        private const float DsBody = 7.7f;
        private const float DsMeta = 7.0f;
        private const float DsAddress = 4.9f;
        private const float DsTitle = 9.8f;
        private const float DsProduct = 10.5f;
        /// <summary>Section / header rules — Dry Cooler uses filled ~1pt bars across the content width.</summary>
        private const float DsRule = 1.0f;

        public async Task<byte[]> GenerateRemoteCondenserPdf(PerformanceReportsRequest dto)
        {
            try
            {
                using var ms = new MemoryStream();
                var writer = new PdfWriter(ms);
                var pdf = new PdfDocument(writer);
                // Letter-size like the reference (612×792); A4 is close but Letter matches x-positions better
                var doc = new Document(pdf, PageSize.LETTER);
                // iText SetMargins(top, right, bottom, left) — match Dry Cooler ~26pt sides
                doc.SetMargins(DsMargin, DsMargin, 48f, DsMargin);

                var regular = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);
                var bold = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);
                var italic = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_OBLIQUE);

                List<PerformanceResponse> performance = new();
                List<AccessoriesSelectedResponse> accessories = new();

                if (dto?.PerfRequest != null)
                    performance = await _thermalCalcService.GeneratePerformanceAsync(dto.PerfRequest);
                if (dto?.AccessPriceRequest != null)
                    accessories = await _accessoriesService.GetSelectedAccessoriesPerModel(dto.AccessPriceRequest);

                var perf = performance.FirstOrDefault();
                var model = perf?.ModelName ?? dto?.PerfRequest?.RemoteModel ?? "";

                // ===== HEADER (logo LEFT on page; address centered under logo only — Dry Cooler) =====
                var navy = new DeviceRgb(0, 70, 127);
                var taglineRose = new DeviceRgb(196, 107, 122);
                const float logoBlockWidth = 150f;

                var header = new Table(UnitValue.CreatePercentArray(new float[] { 38f, 62f }))
                    .UseAllAvailableWidth()
                    .SetBorder(Border.NO_BORDER);

                // Fixed-width brand stack so address centers under the logo, not the page
                var brandStack = new Table(UnitValue.CreatePointArray(new float[] { logoBlockWidth }))
                    .SetBorder(Border.NO_BORDER)
                    .SetHorizontalAlignment(HorizontalAlignment.LEFT);

                var logo = TryCreateLogoImage(logoBlockWidth - 10f);
                if (logo != null)
                {
                    brandStack.AddCell(new Cell().SetBorder(Border.NO_BORDER).SetPadding(0)
                        .Add(logo.SetHorizontalAlignment(HorizontalAlignment.LEFT).SetMarginBottom(2)));
                }
                else
                {
                    brandStack.AddCell(new Cell().SetBorder(Border.NO_BORDER).SetPadding(0)
                        .Add(new Paragraph("ThermoKey")
                            .SetFont(bold).SetFontSize(14).SetFontColor(navy)
                            .SetMargin(0).SetTextAlignment(TextAlignment.LEFT).SetMultipliedLeading(1f)));
                    brandStack.AddCell(new Cell().SetBorder(Border.NO_BORDER).SetPadding(0)
                        .Add(new Paragraph("Heat Exchange Solutions")
                            .SetFont(regular).SetFontSize(7.5f).SetFontColor(taglineRose)
                            .SetMarginTop(0).SetMarginBottom(2)
                            .SetTextAlignment(TextAlignment.LEFT).SetMultipliedLeading(1f)));
                }
                // Address: centered under the logo block (Dry Cooler MSMWR)
                brandStack.AddCell(new Cell().SetBorder(Border.NO_BORDER).SetPadding(0)
                    .Add(P("Via dell'industria 1", regular, DsAddress).SetTextAlignment(TextAlignment.CENTER)));
                brandStack.AddCell(new Cell().SetBorder(Border.NO_BORDER).SetPadding(0)
                    .Add(P("33061 Rivarotta di Rivignano di Teor (UD) - ITALY", regular, DsAddress).SetTextAlignment(TextAlignment.CENTER)));
                brandStack.AddCell(new Cell().SetBorder(Border.NO_BORDER).SetPadding(0)
                    .Add(P("Tel: +39/0432772300 - Fax: +39/0432779734", regular, DsAddress).SetTextAlignment(TextAlignment.CENTER)));

                var brand = new Cell()
                    .SetBorder(Border.NO_BORDER)
                    .SetPadding(0)
                    .SetVerticalAlignment(VerticalAlignment.TOP)
                    .SetHorizontalAlignment(HorizontalAlignment.LEFT)
                    .Add(brandStack);
                header.AddCell(brand);

                // Right meta: Company/Attention/… | Date/SW/… — top-aligned with logo
                var meta = new Table(UnitValue.CreatePercentArray(new float[] { 24f, 26f, 22f, 28f }))
                    .UseAllAvailableWidth()
                    .SetBorder(Border.NO_BORDER);
                Meta(meta, italic, bold, "Company", "");
                Meta(meta, italic, bold, "Date", DateTime.Now.ToString("MM/dd/yy HH:mm:ss"), valueAlign: TextAlignment.RIGHT);
                Meta(meta, italic, bold, "Attention of", "");
                Meta(meta, italic, bold, "SW Version", "BE_v1.13.0", valueAlign: TextAlignment.RIGHT);
                Meta(meta, italic, bold, "City", "");
                Meta(meta, italic, bold, "Doc type", "Data Sheet", valueAlign: TextAlignment.RIGHT);
                Meta(meta, italic, bold, "Telephone", "");
                Meta(meta, italic, bold, "Reference", "000000000", valueAlign: TextAlignment.RIGHT);
                Meta(meta, italic, bold, "Fax", "");
                Meta(meta, italic, bold, "Position", "", valueAlign: TextAlignment.RIGHT);
                header.AddCell(new Cell()
                    .SetBorder(Border.NO_BORDER)
                    .SetPaddingLeft(8)
                    .SetPaddingTop(0)
                    .SetVerticalAlignment(VerticalAlignment.TOP)
                    .Add(meta));
                doc.Add(header);

                // ──── TECHNICAL DATA SHEET ────  (no grey bar — Dry Cooler is plain centered text)
                Rule(doc, top: 8, bottom: 3);
                doc.Add(new Paragraph("TECHNICAL DATA SHEET")
                    .SetFont(bold)
                    .SetFontSize(DsTitle)
                    .SetTextAlignment(TextAlignment.CENTER)
                    .SetMarginTop(0)
                    .SetMarginBottom(0)
                    .SetMultipliedLeading(1f));
                doc.Add(new Paragraph($"REMOTE CONDENSER {model} /")
                    .SetFont(bold)
                    .SetFontSize(DsProduct)
                    .SetMarginTop(6)
                    .SetMarginBottom(0)
                    .SetMultipliedLeading(1f));
                Rule(doc, top: 3, bottom: 4);

                if (perf == null)
                {
                    doc.Add(P("No performance data available.", regular, DsBody));
                }
                else
                {
                    var vertical = string.Equals(dto?.PerfRequest?.AirFlowDirection, "Vertical", StringComparison.OrdinalIgnoreCase);

                    // PERFORMANCE — same pair order as Dry Cooler (Requested + Ratio, then Capacity)
                    Section(doc, bold, "PERFORMANCE");
                    Rows(doc, regular,
                        F("Requested Capacity", Num(perf.Thermal_capacity, "0.0"), "kW"),
                        F("Ratio", Num(perf.Ratio, "0.0"), "%"),
                        F("Capacity", Num(perf.Capacity, "0.0"), "kW"));
                    Rule(doc, top: 3, bottom: 3);

                    // REFRIGERANT SIDE (RC equivalent of Dry Cooler TUBE SIDE)
                    Section(doc, bold, "REFRIGERANT SIDE");
                    Rows(doc, regular,
                        F("Refrigerant", OrDash(perf.RefrigerantType)),
                        F("At the Requested Condensing Temper", Num(perf.At_Requested_Condensing_Temp, "0.0"), "°C"),
                        F("At the Real Condensing Temper", Num(perf.At_Real_Condensing_Temp, "0.0"), "°C"),
                        F("Desuper Heat Temp.", Num(perf.DesuperHeatTemp, "0.00"), "K"),
                        F("Subcooling Temp.", Num(perf.SubCooling_Temp, "0.00"), "K"),
                        F("Ref. Side Pressure Drop", Num(perf.RefrigerantTSidePressureDrop, "0.00"), "kPa"));
                    Rule(doc, top: 3, bottom: 3);

                    // AIR SIDE
                    Section(doc, bold, "AIR SIDE");
                    Rows(doc, regular,
                        F("Inlet Air Temperature", Num(perf.InterAirTemp, "0.0"), "°C"),
                        F("Outlet Air Temperature", Num(perf.OutletAir_Temp, "0.0"), "°C"),
                        F("Inlet Relative Humidity", Num(perf.AirHumidity, "0.0"), "%"),
                        F("Altitude", Num(perf.Altitude, "0"), "m"),
                        F("Air Flow", Num(perf.AirFlow, "0"), "m³/h"),
                        F("Air Side Pressure Drop", Num(perf.AirSidePressureDrop, "0"), "Pa"));
                    Rule(doc, top: 3, bottom: 3);

                    // FANS TECHNICAL DATA — Working Point / Nominal like Dry Cooler
                    Section(doc, bold, "FANS TECHNICAL DATA");
                    Rows(doc, regular,
                        F("Fan Number", Num(perf.No_fans, "0")),
                        F("Link", OrDash(perf.Link)),
                        F("Rpm [Nominal Data]", Num(perf.Rpm_max, "0"), "rpm"),
                        F("Phases-Voltage-Frequency", $"3ph / {Num(perf.Voltage, "0")}V / {Num(perf.Frequency, "0")}Hz"),
                        F("Power x 1 [Nominal Data]", Num(perf.Power_max, "0"), "W"),
                        F("Current x 1 [Nominal Data]", Num(perf.Current_a_max, "0.0"), "A"),
                        F("Rpm [Working Point]", Num(perf.Rpm_wp, "0"), "rpm"),
                        F("Power x 1 [Working Point]", Num(perf.Power_wp, "0"), "W"),
                        F("Current x 1 [Working Point]", Num(perf.Current_a_wp, "0.0"), "A"));
                    Rule(doc, top: 3, bottom: 3);

                    // FAN NOISE DATA
                    Section(doc, bold, "FAN NOISE DATA");
                    Rows(doc, regular,
                        F("Sound Pressure Level [Working point]", Num(perf.Spl > 0 ? perf.Spl : perf.SPLinAccountEN1387, "0"), "dB(A)"),
                        F("Sound Power Level [Working point]", Num(perf.Power_level > 0 ? perf.Power_level : perf.AccousticPowerLevel, "0"), "dB(A)"));
                    Rows(doc, regular,
                        F("At the distance of", Num(perf.AtDistance, "0"), "m"),
                        ("in accordance with EN 13487/EN ISO 3744", ""));
                    Rule(doc, top: 3, bottom: 3);

                    // HEAT EXCHANGER DATA
                    Section(doc, bold, "HEAT EXCHANGER DATA");
                    Rows(doc, regular,
                        F("Fin Material", OrDash(perf.Fin_Material)),
                        F("Casing Material", OrDash(perf.MaterialCasing)),
                        F("Surface", Num(perf.Surface, "0.0"), "m²"),
                        F("Internal Volume", Num(perf.Internal_vol, "0.0"), "dm³"),
                        F("Inlet Connection", OrDash(perf.Inlet_connection)),
                        F("Outlet Connection", OrDash(perf.Outlet_connection)),
                        F("Connections", OrDash(perf.Position_connection)));
                    Rule(doc, top: 3, bottom: 3);

                    // DIMENSIONS AND WEIGHT
                    Section(doc, bold, "DIMENSIONS AND WEIGHT");
                    var dims = new List<(string, string)>
                    {
                        F("Weight", Num(perf.Weights, "0"), "kg"),
                    };
                    if (vertical)
                    {
                        dims.Add(F("Length", Num(perf.lvl3 > 0 ? perf.lvl3 : perf.lvl2, "0"), "mm"));
                        dims.Add(F("Width", Num(perf.Wv1, "0"), "mm"));
                        dims.Add(F("Height", Num(perf.Hv2 > 0 ? perf.Hv2 : perf.Hv1, "0"), "mm"));
                        dims.Add(F("L1", Num(perf.lvl1, "0"), "mm"));
                        dims.Add(F("L2", Num(perf.lvl2, "0"), "mm"));
                        dims.Add(F("L3", Num(perf.lvl3, "0"), "mm"));
                        dims.Add(F("L4", Num(perf.lvl4, "0"), "mm"));
                        dims.Add(F("L5", Num(perf.lvl5, "0"), "mm"));
                        dims.Add(F("W1", Num(perf.Wv1, "0"), "mm"));
                        dims.Add(F("W2", Num(perf.Wv2, "0"), "mm"));
                        dims.Add(F("H1", Num(perf.Hv1, "0"), "mm"));
                        dims.Add(F("H2", Num(perf.Hv2, "0"), "mm"));
                        dims.Add(F("H3", Num(perf.Hv3, "0"), "mm"));
                        dims.Add(F("H4", Num(perf.Hv4, "0"), "mm"));
                        dims.Add(F("P1", Num(perf.P1, "0"), "mm"));
                        dims.Add(F("Dv1", Num(perf.Dv1, "0"), "mm"));
                    }
                    else
                    {
                        dims.Add(F("Length", Num(perf.lh3 > 0 ? perf.lh3 : perf.lh2, "0"), "mm"));
                        dims.Add(F("Width", Num(perf.Wh1, "0"), "mm"));
                        dims.Add(F("Height", Num(perf.Hh2 > 0 ? perf.Hh2 : perf.Hh1, "0"), "mm"));
                        dims.Add(F("L1", Num(perf.lh1, "0"), "mm"));
                        dims.Add(F("L2", Num(perf.lh2, "0"), "mm"));
                        dims.Add(F("L3", Num(perf.lh3, "0"), "mm"));
                        dims.Add(F("L4", Num(perf.lh4, "0"), "mm"));
                        dims.Add(F("L5", Num(perf.lh5, "0"), "mm"));
                        dims.Add(F("W1", Num(perf.Wh1, "0"), "mm"));
                        dims.Add(F("W2", Num(perf.Wh2, "0"), "mm"));
                        dims.Add(F("H1", Num(perf.Hh1, "0"), "mm"));
                        dims.Add(F("H2", Num(perf.Hh2, "0"), "mm"));
                        dims.Add(F("H3", Num(perf.Hh3, "0"), "mm"));
                        dims.Add(F("H4", Num(perf.Hh4, "0"), "mm"));
                        dims.Add(F("P2", Num(perf.P2, "0"), "mm"));
                        dims.Add(F("Dh1", Num(perf.Dh1, "0"), "mm"));
                    }
                    Rows(doc, regular, dims.ToArray());
                    Rule(doc, top: 3, bottom: 3);
                }

                if (accessories.Any(a => a.AccessoriesItems?.Any() == true))
                {
                    Section(doc, bold, "ACCESSORIES LIST");
                    var t = new Table(UnitValue.CreatePercentArray(new float[] { 75f, 25f }))
                        .UseAllAvailableWidth().SetBorder(Border.NO_BORDER);
                    foreach (var a in accessories)
                    foreach (var item in a.AccessoriesItems ?? [])
                    {
                        t.AddCell(BodyCell(item.Item ?? "", regular, TextAlignment.LEFT));
                        t.AddCell(BodyCell("€ " + item.Price, regular, TextAlignment.RIGHT));
                    }
                    doc.Add(t);
                    Rule(doc, top: 3, bottom: 3);
                }

                if (accessories.Count > 0)
                {
                    Section(doc, bold, "PRICE DETAILS");
                    var t = new Table(UnitValue.CreatePercentArray(new float[] { 75f, 25f }))
                        .UseAllAvailableWidth().SetBorder(Border.NO_BORDER);
                    foreach (var a in accessories)
                    {
                        t.AddCell(BodyCell("Gross Unit Price", regular, TextAlignment.LEFT));
                        t.AddCell(BodyCell("€ " + a.TotalNetPrice, regular, TextAlignment.RIGHT));
                        t.AddCell(BodyCell("Accessories Price", regular, TextAlignment.LEFT));
                        t.AddCell(BodyCell("€ " + a.AccessoriesPrice, regular, TextAlignment.RIGHT));
                        t.AddCell(BodyCell("Total Gross Price", regular, TextAlignment.LEFT));
                        t.AddCell(BodyCell("€ " + a.UnitPrice, regular, TextAlignment.RIGHT));
                        t.AddCell(BodyCell("Discount", regular, TextAlignment.LEFT));
                        t.AddCell(BodyCell("€ " + a.Discount.ToString("0.00"), regular, TextAlignment.RIGHT));
                        t.AddCell(BodyCell("Total Net Price", regular, TextAlignment.LEFT));
                        t.AddCell(BodyCell("€ " + a.TotalNetPrice, regular, TextAlignment.RIGHT));
                    }
                    doc.Add(t);
                    Rule(doc, top: 3, bottom: 3);
                }

                await TryAddCondenserImageAsync(
                    doc, model, dto?.PerfRequest?.AirFlowDirection, dto?.PerfRequest?.CondenserType, maxWidth: 240);

                DrawFooter(pdf);
                doc.Close();
                pdf.Close();
                return ms.ToArray();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating RemoteCondenser PDF");
                throw;
            }
        }

        // ---------- Dry Cooler primitives (measured) ----------

        private static void Rule(Document doc, float top, float bottom)
        {
            // Full-width filled bar (Dry Cooler "border" between sections)
            var bar = new Div()
                .SetMarginTop(top)
                .SetMarginBottom(0)
                .SetPadding(0)
                .SetHeight(DsRule)
                .SetBackgroundColor(ColorConstants.BLACK)
                .SetWidth(UnitValue.CreatePercentValue(100));
            doc.Add(bar);
            if (bottom > 0)
                doc.Add(new Paragraph().SetMarginTop(0).SetMarginBottom(bottom).SetFontSize(1));
        }

        private static void Section(Document doc, PdfFont bold, string title)
        {
            // Section title only — Dry Cooler puts the 0.7pt rule BELOW the group (after data).
            doc.Add(new Paragraph(title)
                .SetFont(bold)
                .SetFontSize(DsBody)
                .SetMarginTop(2)
                .SetMarginBottom(2)
                .SetMultipliedLeading(1f));
        }

        /// <summary>
        /// Two equal columns; within each: label left-aligned, value right-aligned
        /// (Dry Cooler mid-split ≈ x=310 on 612pt page).
        /// Body uses regular weight for both label and value at 7.7pt.
        /// </summary>
        private static void Rows(Document doc, PdfFont regular, params (string Label, string Value)[] fields)
        {
            var table = new Table(UnitValue.CreatePercentArray(new float[] { 50f, 50f }))
                .UseAllAvailableWidth()
                .SetBorder(Border.NO_BORDER)
                .SetMarginBottom(0);

            for (var i = 0; i < fields.Length; i += 2)
            {
                table.AddCell(Half(regular, fields[i], padRight: 8));
                if (i + 1 < fields.Length)
                    table.AddCell(Half(regular, fields[i + 1], padRight: 0));
                else
                    table.AddCell(new Cell().SetBorder(Border.NO_BORDER).SetPadding(0));
            }

            doc.Add(table);
        }

        private static Cell Half(PdfFont regular, (string Label, string Value) field, float padRight)
        {
            // Dry Cooler: label left, value right-aligned near the column gutter (~x=270 / x=560)
            var inner = new Table(UnitValue.CreatePercentArray(new float[] { 62f, 38f }))
                .UseAllAvailableWidth()
                .SetBorder(Border.NO_BORDER);

            inner.AddCell(new Cell()
                .SetBorder(Border.NO_BORDER)
                .SetPaddingTop(1.0f).SetPaddingBottom(1.0f).SetPaddingLeft(0).SetPaddingRight(4)
                .Add(new Paragraph(field.Label ?? "")
                    .SetFont(regular)
                    .SetFontSize(DsBody)
                    .SetMargin(0)
                    .SetMultipliedLeading(1.05f)));

            inner.AddCell(new Cell()
                .SetBorder(Border.NO_BORDER)
                .SetPaddingTop(1.0f).SetPaddingBottom(1.0f).SetPaddingLeft(2).SetPaddingRight(0)
                .SetTextAlignment(TextAlignment.RIGHT)
                .Add(new Paragraph(field.Value ?? "")
                    .SetFont(regular)
                    .SetFontSize(DsBody)
                    .SetMargin(0)
                    .SetMultipliedLeading(1.05f)));

            return new Cell()
                .SetBorder(Border.NO_BORDER)
                .SetPadding(0)
                .SetPaddingRight(padRight)
                .Add(inner);
        }

        private static void Meta(
            Table t,
            PdfFont italic,
            PdfFont bold,
            string label,
            string value,
            TextAlignment valueAlign = TextAlignment.LEFT)
        {
            t.AddCell(new Cell().SetBorder(Border.NO_BORDER).SetPaddingTop(1.2f).SetPaddingBottom(1.2f).SetPaddingRight(2)
                .Add(new Paragraph(label + ":").SetFont(italic).SetFontSize(DsMeta).SetMargin(0)));
            t.AddCell(new Cell().SetBorder(Border.NO_BORDER).SetPaddingTop(1.2f).SetPaddingBottom(1.2f)
                .SetTextAlignment(valueAlign)
                .Add(new Paragraph(string.IsNullOrEmpty(value) ? "\u00A0" : value)
                    .SetFont(bold)
                    .SetFontSize(DsMeta)
                    .SetMargin(0)
                    .SetTextAlignment(valueAlign)));
        }

        private static Paragraph P(string text, PdfFont font, float size)
            => new Paragraph(text).SetFont(font).SetFontSize(size).SetMargin(0).SetMultipliedLeading(1.1f);

        private static Cell BodyCell(string text, PdfFont font, TextAlignment align)
            => new Cell()
                .SetBorder(Border.NO_BORDER)
                .SetPaddingTop(1.1f).SetPaddingBottom(1.1f)
                .SetTextAlignment(align)
                .Add(new Paragraph(text).SetFont(font).SetFontSize(DsBody).SetMargin(0));

        private static (string, string) F(string label, string? value, string? unit = null)
            => (label, unit == null ? (value ?? "") : $"{value} {unit}");

        private static string Num(double v, string fmt)
            => double.IsNaN(v) || double.IsInfinity(v) ? "" : v.ToString(fmt);

        private static string OrDash(string? v)
            => string.IsNullOrWhiteSpace(v) ? "" : v;

        private void DrawFooter(PdfDocument pdf)
        {
            try
            {
                const string precautions = "Precautions for the use of TKMicro MCHX Microchannel Cores:";
                const string url = "https://www.thermokey.com/en/download/technical-manuals";
                var font = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);
                var linkBlue = new DeviceRgb(0, 102, 204);

                for (var i = 1; i <= pdf.GetNumberOfPages(); i++)
                {
                    var page = pdf.GetPage(i);
                    var box = page.GetPageSize();
                    var canvas = new PdfCanvas(page.NewContentStreamAfter(), page.GetResources(), pdf);

                    var left = DsMargin;
                    var right = box.GetWidth() - DsMargin;
                    // Two-row footer: precautions + Page N on top row, blue link below
                    var yLink = box.GetBottom() + 14;
                    var yText = yLink + 11;
                    var yRule = yText + 9;

                    // Top divider
                    canvas.SetFillColor(ColorConstants.BLACK);
                    canvas.Rectangle(left, yRule, right - left, DsRule);
                    canvas.Fill();

                    // Left: precautions
                    canvas.SetFillColor(ColorConstants.BLACK);
                    canvas.BeginText().SetFontAndSize(font, 7)
                        .MoveText(left, yText)
                        .ShowText(precautions)
                        .EndText();

                    // Right: Page N (same baseline as precautions)
                    var pageTxt = $"Page {i}";
                    var pageW = font.GetWidth(pageTxt, 7);
                    canvas.BeginText().SetFontAndSize(font, 7)
                        .MoveText(right - pageW, yText)
                        .ShowText(pageTxt)
                        .EndText();

                    // Left second row: blue underlined URL
                    var urlW = font.GetWidth(url, 7);
                    canvas.SetFillColor(linkBlue);
                    canvas.BeginText().SetFontAndSize(font, 7)
                        .MoveText(left, yLink)
                        .ShowText(url)
                        .EndText();
                    canvas.SetStrokeColor(linkBlue).SetLineWidth(0.45f);
                    canvas.MoveTo(left, yLink - 1.2f);
                    canvas.LineTo(left + urlW, yLink - 1.2f);
                    canvas.Stroke();

                    // Clickable link annotation
                    var linkRect = new Rectangle(left, yLink - 2, urlW + 2, 11);
                    var annotation = new PdfLinkAnnotation(linkRect);
                    annotation.SetAction(PdfAction.CreateURI(url));
                    annotation.SetBorder(new PdfArray(new float[] { 0, 0, 0 }));
                    page.AddAnnotation(annotation);

                    canvas.Release();
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to draw datasheet footer");
            }
        }
    }
}
