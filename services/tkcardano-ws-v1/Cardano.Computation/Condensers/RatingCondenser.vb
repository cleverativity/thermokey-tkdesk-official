Imports System.Text.RegularExpressions
Imports Cardano.Domain.Entities
Imports Cardano.Domain.Models

Public Class RatingCondenser

    Private Shared ReadOnly ModelDiameterRegex As New Regex(
        "^(?:2X|3X)?(?:TM[CK]|JM[CK])[HLQR](\d{2})(\d{2})",
        RegexOptions.IgnoreCase Or RegexOptions.Compiled)

    Private Shared ReadOnly EbmDiameterRegex As New Regex(
        "A3G\s*(\d{3})",
        RegexOptions.IgnoreCase Or RegexOptions.Compiled)

    Private Shared ReadOnly ZiehlDiameterRegex As New Regex(
        "FN(\d{3})",
        RegexOptions.IgnoreCase Or RegexOptions.Compiled)

    Public Function SelectUnits(condensers As List(Of Condenser), search As RatingSearch) As List(Of RatingMatch)
        Dim matches As New List(Of RatingMatch)

        If condensers Is Nothing OrElse condensers.Count = 0 Then
            Return matches
        End If

        If search Is Nothing Then
            search = New RatingSearch()
        End If

        Dim seriesFilter = Normalize(search.Series)
        Dim subseriesFilter = Normalize(search.Subseries)
        Dim fanTypeFilter = Normalize(search.FanType)
        Dim fanBrandFilter = NormalizeFanBrand(search.FanBrand)
        Dim noiseFilter = MapNoiseClassToLetter(search.NoiseClass)
        Dim diameterFilter As Integer? = NormalizeOptionalDiameter(search.FanDiameter)

        ' Series/subseries M has no Remote Condenser family in this catalog.
        If seriesFilter = "M" OrElse subseriesFilter = "M" Then
            Return matches
        End If

        ' VIP / CiEsse are Dry Cooler brands and are not in this catalog.
        If fanBrandFilter = "UNSUPPORTED" Then
            Return matches
        End If

        ' EBM Papst and Ziehl-Abegg exist only as EC overlays.
        If fanTypeFilter = "AC" AndAlso (fanBrandFilter = "EBMPAPST" OrElse fanBrandFilter = "ZIEHLABEGG") Then
            Return matches
        End If

        Dim ecData As NEW_EcFansData = Nothing
        If NeedsEcData(fanTypeFilter, fanBrandFilter) Then
            ecData = New NEW_EcFansData()
        End If

        For Each unit In condensers
            Dim model = If(unit.Model, String.Empty).Trim().ToUpperInvariant()
            Dim subseries = ResolveSubseries(model)
            Dim modules = ResolveModuleCount(model)
            Dim fans = unit.Num_Of_Fan_Rows * unit.Num_Of_Fan_Per_Row
            Dim noiseLetter = ResolveFanType(model, unit.Fan_Series)

            If Not MatchesSeries(unit.Series, seriesFilter, subseries) Then
                Continue For
            End If

            If Not MatchesSubseries(subseriesFilter, subseries) Then
                Continue For
            End If

            If search.NumberOfModules.HasValue AndAlso modules <> search.NumberOfModules.Value Then
                Continue For
            End If

            If search.NumberOfFans.HasValue AndAlso fans <> search.NumberOfFans.Value Then
                Continue For
            End If

            If Not MatchesAssembly(search.[Assembly], modules) Then
                Continue For
            End If

            If search.MaxLengthMm.HasValue AndAlso unit.Vertical_Machine_Length > search.MaxLengthMm.Value Then
                Continue For
            End If

            If search.MaxHeightMm.HasValue AndAlso unit.Vertical_Machine_Height > search.MaxHeightMm.Value Then
                Continue For
            End If

            If search.MaxWidthMm.HasValue AndAlso unit.Vertical_Machine_Width > search.MaxWidthMm.Value Then
                Continue For
            End If

            If search.MaxWeightKg.HasValue AndAlso unit.Machine_Weight_Vertical > search.MaxWeightKg.Value Then
                Continue For
            End If

            If Not MatchesNoiseClass(noiseFilter, noiseLetter) Then
                Continue For
            End If

            If Not MatchesCoilGeometry(search.CoilGeometry, unit.Coil_Type) Then
                Continue For
            End If

            If Not MatchesFluidPassages(search.FluidPassages, unit.Num_Of_Passes) Then
                Continue For
            End If

            Dim includeAc = fanTypeFilter = "ALL" OrElse fanTypeFilter = "AC"
            Dim includeEc = fanTypeFilter = "EC" OrElse fanBrandFilter = "EBMPAPST" OrElse fanBrandFilter = "ZIEHLABEGG"

            If includeAc AndAlso fanBrandFilter = "ALL" AndAlso fanTypeFilter <> "EC" Then
                Dim acDiameter = ResolveDiameter(model, unit.Fan_Model)
                If MatchesDiameter(diameterFilter, acDiameter) Then
                    matches.Add(CreateMatch(unit, model, subseries, seriesFilter, noiseLetter, modules, fans, "AC", Nothing, acDiameter, unit.Fan_Model, search))
                End If
            End If

            If includeEc AndAlso ecData IsNot Nothing Then
                Dim ecIndex = FindEcIndex(model, ecData.EC_New_CondenserModel_EBMPapst)
                Dim ebmName = GetEcFanName(ecData.EC_New_FanSeriesEbmPapst, ecIndex)
                Dim ziehlName = GetEcFanName(ecData.EC_New_FanSeriesZiehl, ecIndex)

                If fanBrandFilter = "ALL" OrElse fanBrandFilter = "EBMPAPST" Then
                    If IsValidEcName(ebmName) Then
                        Dim ebmDiameter = ResolveDiameter(model, ebmName)
                        If MatchesDiameter(diameterFilter, ebmDiameter) Then
                            matches.Add(CreateMatch(unit, model, subseries, seriesFilter, noiseLetter, modules, fans, "EC", "EBM Papst", ebmDiameter, ebmName, search))
                        End If
                    End If
                End If

                If fanBrandFilter = "ALL" OrElse fanBrandFilter = "ZIEHLABEGG" Then
                    If IsValidEcName(ziehlName) Then
                        Dim ziehlDiameter = ResolveDiameter(model, ziehlName)
                        If MatchesDiameter(diameterFilter, ziehlDiameter) Then
                            matches.Add(CreateMatch(unit, model, subseries, seriesFilter, noiseLetter, modules, fans, "EC", "Ziehl-Abegg", ziehlDiameter, ziehlName, search))
                        End If
                    End If
                End If
            End If
        Next

        Return matches
    End Function

    Public Function CalculateUnit(condensers As List(Of Condenser), search As RatingSearch, condenserId As Integer) As RatingMatch
        If condensers Is Nothing OrElse condensers.Count = 0 OrElse condenserId <= 0 Then
            Return Nothing
        End If

        If search Is Nothing Then
            search = New RatingSearch()
        End If

        Dim unit = condensers.FirstOrDefault(Function(item) item.Id = condenserId)
        If unit Is Nothing Then
            Return Nothing
        End If

        Dim catalogAirFlow = ResolveCatalogAirFlow(unit, search)
        Dim fansFlow = ResolveOperatingAirFlow(search, unit.FanRPM_Delta, catalogAirFlow)
        Dim capacity = CalculateRatedCapacity(unit, search, fansFlow)
        Dim pressureDrop = CalculateAirPressureDrop(unit, search, fansFlow)
        Dim refrigerantPressureDrop = CalculateRefrigerantPressureDrop(unit, search, fansFlow)
        Dim outletAir = CalculateOutletAirTemperature(search.DryBulbC, capacity, fansFlow, search.AltitudeM)
        Dim model = If(unit.Model, String.Empty).Trim().ToUpperInvariant()
        Dim modules = ResolveModuleCount(model)
        Dim noise = CalculateRatedNoise(unit, search)
        Dim ventilation = CalculateVentilation(unit, search, model)

        Return New RatingMatch With {
            .Id = unit.Id,
            .ModelId = unit.Id,
            .ModelCode = ResolveCommercialModel(unit.Model, ventilation.FanType, search.FanBrand),
            .FanCode = ventilation.FanName,
            .CoilCode = unit.Coil_Type,
            .CoilGeometry = ResolveCoilGeometry(unit.Coil_Type),
            .FluidPassages = MapPassesToLabel(unit.Num_Of_Passes),
            .FanDrive = ventilation.FanType,
            .FanBrand = search.FanBrand,
            .FanDiameter = ventilation.Diameter,
            .NumberOfFans = ventilation.NumberOfFans,
            .NumberOfCoils = Math.Max(unit.Number_Coils, 1),
            .NumberOfPasses = unit.Num_Of_Passes,
            .Rpm = unit.FanRPM_Delta,
            .FanSpeedPercent = ResolveFanSpeedPercent(search, unit.FanRPM_Delta),
            .FanSpeedRpm = ResolveFanSpeedRpm(search, unit.FanRPM_Delta),
            .[Assembly] = ResolveAssembly(modules),
            .Length = unit.Vertical_Machine_Length,
            .Height = unit.Vertical_Machine_Height,
            .Width = unit.Vertical_Machine_Width,
            .Weight = unit.Machine_Weight_Vertical,
            .DryBulb = search.DryBulbC,
            .RelHumidity = search.RelHumidity,
            .Altitude = search.AltitudeM,
            .RefrigerantType = search.RefrigerantType,
            .Condensing = search.CondensingC,
            .SubCooling = search.SubCoolingK,
            .ThermalCapacity = search.ThermalCapacityKw,
            .CalculatedCapacity = capacity,
            .AirFlowM3h = If(fansFlow > 0, Math.Round(fansFlow, 0), Nothing),
            .OutletAirC = outletAir,
            .AirPressureDropPa = pressureDrop,
            .RefrigerantPressureDropKpa = refrigerantPressureDrop,
            .CondenserType = ResolveCondenserType(model),
            .InnerVolume = If(unit.Tube_Volume > 0, Math.Round(unit.Tube_Volume, 2), Nothing),
            .ExchangeArea = CalculateExchangeArea(unit, model),
            .InletConnection = FormatConnection(unit, search, isInlet:=True),
            .OutletConnection = FormatConnection(unit, search, isInlet:=False),
            .SoundPower = noise.SoundPower,
            .SoundPressure = noise.SoundPressure,
            .DistanceM = noise.DistanceM,
            .FanName = ventilation.FanName,
            .FanLink = ventilation.Link,
            .FanRows = ventilation.FanRows,
            .FansPerRow = ventilation.FansPerRow,
            .RpmWp = ventilation.RpmWp,
            .RpmMax = ventilation.RpmMax,
            .Voltage = ventilation.Voltage,
            .Frequency = ventilation.Frequency,
            .Phases = ventilation.Phases,
            .SinglePowerWp = ventilation.SinglePowerWp,
            .SinglePowerMax = ventilation.SinglePowerMax,
            .SingleCurrentWp = ventilation.SingleCurrentWp,
            .SingleCurrentMax = ventilation.SingleCurrentMax
        }
    End Function

    Private Function CreateMatch(
        unit As Condenser,
        model As String,
        subseries As String,
        seriesFilter As String,
        noiseLetter As String,
        modules As Integer,
        fans As Integer,
        fanDrive As String,
        brand As String,
        diameter As Integer?,
        fanCode As String,
        search As RatingSearch) As RatingMatch

        Return New RatingMatch With {
            .Id = unit.Id,
            .ModelId = unit.Id,
            .ModelCode = ResolveCommercialModel(unit.Model, fanDrive, brand),
            .FanCode = If(String.IsNullOrWhiteSpace(fanCode), unit.Fan_Model, fanCode),
            .CoilCode = unit.Coil_Type,
            .CoilGeometry = ResolveCoilGeometry(unit.Coil_Type),
            .FluidPassages = MapPassesToLabel(unit.Num_Of_Passes),
            .Series = If(String.IsNullOrWhiteSpace(unit.Series), seriesFilter, unit.Series),
            .Subseries = subseries,
            .FanType = noiseLetter,
            .FanDrive = fanDrive,
            .FanBrand = brand,
            .FanDiameter = diameter,
            .NoiseClass = MapLetterToNoiseClass(noiseLetter),
            .NumberOfModules = modules,
            .NumberOfFans = fans,
            .NumberOfCoils = Math.Max(unit.Number_Coils, 1),
            .NumberOfPasses = unit.Num_Of_Passes,
            .[Assembly] = ResolveAssembly(modules),
            .Rpm = unit.FanRPM_Delta,
            .FanSpeedPercent = ResolveFanSpeedPercent(search, unit.FanRPM_Delta),
            .FanSpeedRpm = ResolveFanSpeedRpm(search, unit.FanRPM_Delta),
            .Length = unit.Vertical_Machine_Length,
            .Height = unit.Vertical_Machine_Height,
            .Width = unit.Vertical_Machine_Width,
            .Weight = unit.Machine_Weight_Vertical,
            .DryBulb = search.DryBulbC,
            .RelHumidity = search.RelHumidity,
            .Altitude = search.AltitudeM,
            .RefrigerantType = search.RefrigerantType,
            .Condensing = search.CondensingC,
            .SubCooling = search.SubCoolingK,
            .ThermalCapacity = search.ThermalCapacityKw
        }
    End Function

    Private Function MatchesSeries(catalogSeries As String, seriesFilter As String, resolvedSubseries As String) As Boolean
        If IsUnconstrained(seriesFilter) Then
            Return True
        End If

        If seriesFilter = "T" OrElse seriesFilter = "J" Then
            Return resolvedSubseries = seriesFilter
        End If

        Return String.Equals(If(catalogSeries, String.Empty).Trim(), seriesFilter, StringComparison.OrdinalIgnoreCase)
    End Function

    Private Function MatchesSubseries(subseriesFilter As String, resolvedSubseries As String) As Boolean
        If IsUnconstrained(subseriesFilter) Then
            Return True
        End If

        Return resolvedSubseries = subseriesFilter
    End Function

    Private Function MatchesAssembly(assemblyFilter As String, modules As Integer) As Boolean
        Dim filter = Normalize(assemblyFilter)

        If IsUnconstrained(filter) Then
            Return True
        End If

        If filter = "SINGLE" Then
            Return modules = 1
        End If

        If filter = "ASSEMBLED" Then
            Return modules >= 2
        End If

        Return True
    End Function

    Private Function MatchesNoiseClass(noiseFilter As String, noiseLetter As String) As Boolean
        If IsUnconstrained(noiseFilter) Then
            Return True
        End If

        Return String.Equals(noiseLetter, noiseFilter, StringComparison.OrdinalIgnoreCase)
    End Function

    Private Function MatchesCoilGeometry(geometryFilter As String, coilType As String) As Boolean
        Dim filter = Normalize(geometryFilter)

        If IsUnconstrained(filter) Then
            Return True
        End If

        Dim resolved = ResolveCoilGeometry(coilType)
        Return String.Equals(resolved, filter, StringComparison.OrdinalIgnoreCase)
    End Function

    Private Function ResolveCoilGeometry(coilType As String) As String
        If String.IsNullOrWhiteSpace(coilType) Then
            Return Nothing
        End If

        Dim compact = coilType.Trim().ToUpperInvariant().Replace("_", "")

        If compact.StartsWith("32") Then
            Return "TkMicro32"
        End If

        If compact.StartsWith("25") Then
            Return "TkMicro25"
        End If

        Return Nothing
    End Function

    Private Function MatchesFluidPassages(passagesFilter As String, numberOfPasses As Integer) As Boolean
        Dim expected = MapFluidPassagesToCount(passagesFilter)
        If Not expected.HasValue Then
            Return True
        End If

        Return numberOfPasses = expected.Value
    End Function

    Private Function MapFluidPassagesToCount(value As String) As Integer?
        Dim filter = Normalize(value)

        Select Case filter
            Case "SINGLE", "1"
                Return 1
            Case "DOUBLE", "2"
                Return 2
            Case "QUAD", "4"
                Return 4
            Case Else
                Return Nothing
        End Select
    End Function

    Private Function MapPassesToLabel(numberOfPasses As Integer) As String
        Select Case numberOfPasses
            Case 1
                Return "Single"
            Case 2
                Return "Double"
            Case 4
                Return "Quad"
            Case Else
                If numberOfPasses <= 0 Then
                    Return Nothing
                End If
                Return numberOfPasses.ToString()
        End Select
    End Function

    Private Function MatchesDiameter(diameterFilter As Integer?, resolvedDiameter As Integer?) As Boolean
        If Not diameterFilter.HasValue Then
            Return True
        End If

        Return resolvedDiameter.HasValue AndAlso resolvedDiameter.Value = diameterFilter.Value
    End Function

    Private Function ResolveAssembly(modules As Integer) As String
        If modules >= 2 Then
            Return "Assembled"
        End If

        Return "Single"
    End Function

    Private Function ResolveCondenserType(model As String) As String
        If IsJumbo(model) Then
            Return "V-Type"
        End If

        Return "Table-Type"
    End Function

    Private Function ResolveSubseries(model As String) As String
        If IsJumbo(model) Then
            Return "J"
        End If

        If model.StartsWith("TMC") OrElse model.StartsWith("TMK") Then
            Return "T"
        End If

        If model.StartsWith("MC") Then
            Return "M"
        End If

        Return String.Empty
    End Function

    Private Function ResolveModuleCount(model As String) As Integer
        If model.StartsWith("3X") Then
            Return 3
        End If

        If model.StartsWith("2X") Then
            Return 2
        End If

        Return 1
    End Function

    Private Function IsJumbo(model As String) As Boolean
        Return model.StartsWith("JMC") _
            OrElse model.StartsWith("JMK") _
            OrElse model.StartsWith("2XJMC") _
            OrElse model.StartsWith("3XJMC") _
            OrElse model.StartsWith("2XJMK") _
            OrElse model.StartsWith("3XJMK")
    End Function

    Private Function ResolveFanType(model As String, fanSeries As String) As String
        Dim stem = model
        If stem.StartsWith("2X") OrElse stem.StartsWith("3X") Then
            stem = stem.Substring(2)
        End If

        If stem.Length >= 4 AndAlso Char.IsLetter(stem(3)) Then
            Select Case stem(3)
                Case "H"c
                    Return "H"
                Case "L"c
                    Return "L"
                Case "Q"c
                    Return "Q"
                Case "R"c
                    Return "R"
            End Select
        End If

        If Not String.IsNullOrWhiteSpace(fanSeries) Then
            Return fanSeries.Trim().ToUpperInvariant()
        End If

        Return String.Empty
    End Function

    Private Function MapNoiseClassToLetter(value As String) As String
        Dim filter = Normalize(value)

        Select Case filter
            Case "HIGH", "H"
                Return "H"
            Case "LOW", "L"
                Return "L"
            Case "QUIET", "Q"
                Return "Q"
            Case "RESIDENTIAL", "R"
                Return "R"
            Case Else
                Return "ALL"
        End Select
    End Function

    Private Function MapLetterToNoiseClass(letter As String) As String
        Select Case Normalize(letter)
            Case "H"
                Return "High"
            Case "L"
                Return "Low"
            Case "Q"
                Return "Quiet"
            Case "R"
                Return "Residential"
            Case Else
                Return Nothing
        End Select
    End Function

    Private Function NormalizeFanBrand(value As String) As String
        If String.IsNullOrWhiteSpace(value) Then
            Return "ALL"
        End If

        Dim compact = value.Trim().ToUpperInvariant().Replace(" ", "").Replace("-", "")

        If compact = "ALL" Then
            Return "ALL"
        End If

        If compact.Contains("VIP") OrElse compact.Contains("CIESSE") OrElse compact.Contains("ATEX") Then
            Return "UNSUPPORTED"
        End If

        If compact.Contains("EBM") OrElse compact.Contains("PAPST") OrElse compact = "B1" Then
            Return "EBMPAPST"
        End If

        If compact.Contains("ZIEHL") OrElse compact.Contains("ABEGG") OrElse compact = "B2" Then
            Return "ZIEHLABEGG"
        End If

        Return "UNSUPPORTED"
    End Function

    Private Function ResolveCommercialModel(model As String, fanDrive As String, brand As String) As String
        Dim baseModel = StripFanSuffix(If(model, String.Empty).Trim())
        If String.IsNullOrWhiteSpace(baseModel) Then
            Return baseModel
        End If

        Dim drive = Normalize(fanDrive)
        Dim fanBrand = NormalizeFanBrand(brand)

        If drive <> "EC" AndAlso fanBrand <> "EBMPAPST" AndAlso fanBrand <> "ZIEHLABEGG" Then
            Return baseModel
        End If

        If fanBrand = "ZIEHLABEGG" Then
            Return baseModel & "B2"
        End If

        Return baseModel & "B1"
    End Function

    Private Function StripFanSuffix(model As String) As String
        If String.IsNullOrWhiteSpace(model) Then
            Return model
        End If

        If model.EndsWith("B1", StringComparison.OrdinalIgnoreCase) OrElse model.EndsWith("B2", StringComparison.OrdinalIgnoreCase) Then
            Return model.Substring(0, model.Length - 2)
        End If

        Return model
    End Function

    Private Function NeedsEcData(fanTypeFilter As String, fanBrandFilter As String) As Boolean
        Return fanTypeFilter = "EC" OrElse fanBrandFilter = "EBMPAPST" OrElse fanBrandFilter = "ZIEHLABEGG"
    End Function

    Private Function FindEcIndex(model As String, ecModels As String()) As Integer
        If ecModels Is Nothing OrElse ecModels.Length = 0 Then
            Return -1
        End If

        If Not String.IsNullOrWhiteSpace(model) Then
            Dim exact = -1
            Dim prefix = -1
            Dim prefixLength = 0

            For i = 0 To ecModels.Length - 1
                Dim ecModel = If(ecModels(i), String.Empty).Trim().ToUpperInvariant()
                If ecModel.Length = 0 Then
                    Continue For
                End If

                If model = ecModel Then
                    exact = i
                    Exit For
                End If

                If model.StartsWith(ecModel) AndAlso ecModel.Length > prefixLength Then
                    prefix = i
                    prefixLength = ecModel.Length
                End If
            Next

            If exact >= 0 Then
                Return exact
            End If

            If prefix >= 0 Then
                Return prefix
            End If
        End If

        Return -1
    End Function

    Private Function GetEcFanName(fanNames As String(), index As Integer) As String
        If fanNames Is Nothing OrElse index < 0 OrElse index >= fanNames.Length Then
            Return Nothing
        End If

        Return fanNames(index)
    End Function

    Private Function IsValidEcName(name As String) As Boolean
        If String.IsNullOrWhiteSpace(name) Then
            Return False
        End If

        Dim trimmed = name.Trim()
        Return Not trimmed.Contains("*"c) AndAlso trimmed.Length > 0
    End Function

    Private Function ResolveDiameter(model As String, fanCode As String) As Integer?
        Dim fromFan = ParseFanCodeDiameter(fanCode)
        If fromFan.HasValue Then
            Return fromFan
        End If

        Return ParseModelDiameter(model)
    End Function

    Private Function ParseModelDiameter(model As String) As Integer?
        If String.IsNullOrWhiteSpace(model) Then
            Return Nothing
        End If

        Dim match = ModelDiameterRegex.Match(model)
        If Not match.Success Then
            Return Nothing
        End If

        Dim code As Integer
        If Integer.TryParse(match.Groups(2).Value, code) Then
            Return DiameterCodeToMm(code)
        End If

        Return Nothing
    End Function

    Private Function ParseFanCodeDiameter(fanCode As String) As Integer?
        If String.IsNullOrWhiteSpace(fanCode) Then
            Return Nothing
        End If

        Dim ebm = EbmDiameterRegex.Match(fanCode)
        If ebm.Success Then
            Dim mm As Integer
            If Integer.TryParse(ebm.Groups(1).Value, mm) Then
                Return mm
            End If
        End If

        Dim ziehl = ZiehlDiameterRegex.Match(fanCode)
        If ziehl.Success Then
            Dim code As Integer
            If Integer.TryParse(ziehl.Groups(1).Value, code) Then
                Return DiameterCodeToMm(code)
            End If
        End If

        Return Nothing
    End Function

    Private Function NormalizeOptionalDiameter(value As Integer?) As Integer?
        If Not value.HasValue Then
            Return Nothing
        End If

        Return DiameterCodeToMm(value.Value)
    End Function

    Private Function DiameterCodeToMm(code As Integer) As Integer
        If code >= 100 Then
            If code = 900 Then
                Return 910
            End If
            Return code
        End If

        If code = 90 OrElse code = 91 Then
            Return 910
        End If

        Return code * 10
    End Function

    Private Function Normalize(value As String) As String
        If String.IsNullOrWhiteSpace(value) Then
            Return "ALL"
        End If

        Return value.Trim().ToUpperInvariant()
    End Function

    Private Function IsUnconstrained(value As String) As Boolean
        Return String.IsNullOrWhiteSpace(value) OrElse value = "ALL"
    End Function

    Private Function ResolveFanSpeedPercent(search As RatingSearch, catalogRpm As Integer) As Double?
        Dim speedValue = ResolveFanSpeedValue(search)
        If IsFanSpeedPercent(If(search Is Nothing, Nothing, search.FanSpeedUnit)) Then
            Return speedValue
        End If

        If catalogRpm <= 0 Then
            Return Nothing
        End If

        Return Math.Round(speedValue / catalogRpm * 100, 1)
    End Function

    Private Function ResolveFanSpeedRpm(search As RatingSearch, catalogRpm As Integer) As Double?
        Dim speedValue = ResolveFanSpeedValue(search)
        If IsFanSpeedPercent(If(search Is Nothing, Nothing, search.FanSpeedUnit)) Then
            Return Math.Round(catalogRpm * speedValue / 100, 0)
        End If

        Return speedValue
    End Function

    Private Function ResolveFanSpeedValue(search As RatingSearch) As Double
        If search Is Nothing OrElse Not search.FanSpeedValue.HasValue Then
            Return 100
        End If

        Return search.FanSpeedValue.Value
    End Function

    Private Function IsFanSpeedPercent(unit As String) As Boolean
        If String.IsNullOrWhiteSpace(unit) Then
            Return True
        End If

        Dim normalized = unit.Trim().ToUpperInvariant()
        Return normalized = "%" OrElse normalized = "PERCENT" OrElse normalized = "PCT"
    End Function

    Private Function ResolveCatalogAirFlow(unit As Condenser, search As RatingSearch) As Double
        Dim fanType = Normalize(If(search Is Nothing, Nothing, search.FanType))
        Dim brand = NormalizeFanBrand(If(search Is Nothing, Nothing, search.FanBrand))
        Dim useEc = fanType = "EC" OrElse brand = "EBMPAPST" OrElse brand = "ZIEHLABEGG"

        If Not useEc Then
            Return unit.Delta_Fans_Flow
        End If

        Dim ecData As New NEW_EcFansData()
        If brand = "ZIEHLABEGG" Then
            Return GetEcCatalogFlow(ecData.EC_Curve1_FlowRate_Ziehl, unit)
        End If

        Return GetEcCatalogFlow(ecData.EC_Curve1_FlowRate_EBMPapst, unit)
    End Function

    Private Function GetEcCatalogFlow(flows As Double(), unit As Condenser) As Double
        Dim index = unit.Id - 1
        If flows IsNot Nothing AndAlso index >= 0 AndAlso index < flows.Length AndAlso flows(index) > 0 Then
            Return flows(index)
        End If

        Return unit.Delta_Fans_Flow
    End Function

    Private Function CalculateRatedCapacity(unit As Condenser, search As RatingSearch, fansFlow As Double) As Double?
        If search Is Nothing OrElse Not search.CondensingC.HasValue OrElse Not search.DryBulbC.HasValue Then
            Return Nothing
        End If

        Dim deltaTemperature = search.CondensingC.Value - search.DryBulbC.Value
        If deltaTemperature <= 0 OrElse fansFlow <= 0 Then
            Return Nothing
        End If

        Dim coilCount = Math.Max(unit.Number_Coils, 1)
        Dim refrigerant = If(String.IsNullOrWhiteSpace(search.RefrigerantType), "R-404A", search.RefrigerantType.Trim())
        Dim airPressure = AtmosphericPressureKpa(search.AltitudeM)
        Dim correction = If(unit.Correction_Delta = 0, 1, unit.Correction_Delta)

        Try
            Dim coilEngine As New ThermokeyCondenserCapacities
            Dim coilCapacity = coilEngine.CoilStandardCapacity(
                unit.Coil_Type,
                unit.Coil_Length,
                refrigerant,
                (fansFlow / 60) / coilCount,
                deltaTemperature,
                airPressure)

            If search.SubCoolingK.HasValue AndAlso Math.Abs(search.SubCoolingK.Value - 3) > 0.05 Then
                Dim subCoolEngine As New CardanoAdditionalCalculationEngine
                coilCapacity += subCoolEngine.CapacitySubCooling(
                    unit.Coil_Type,
                    unit.Coil_Length,
                    refrigerant,
                    fansFlow / coilCount,
                    search.SubCoolingK.Value,
                    airPressure)
            End If

            If coilCapacity <= 0 Then
                Return Nothing
            End If

            Return Math.Round(correction * coilCapacity * coilCount, 1)
        Catch
            Return Nothing
        End Try
    End Function

    Private Function CalculateRefrigerantPressureDrop(unit As Condenser, search As RatingSearch, fansFlow As Double) As Double?
        If search Is Nothing OrElse Not search.CondensingC.HasValue OrElse Not search.DryBulbC.HasValue OrElse fansFlow <= 0 Then
            Return Nothing
        End If

        Dim deltaTemperature = (5 / 9) * (search.CondensingC.Value - search.DryBulbC.Value)
        If deltaTemperature <= 0 Then
            Return Nothing
        End If

        Dim coilCount = Math.Max(unit.Number_Coils, 1)
        Dim refrigerant = If(String.IsNullOrWhiteSpace(search.RefrigerantType), "R-404A", search.RefrigerantType.Trim())
        Dim airPressure = AtmosphericPressureKpa(search.AltitudeM)

        Try
            Dim coilEngine As New ThermokeyCondenserCapacities
            Dim drop = coilEngine.CoilStandardRefrigerantPressureDrop(
                unit.Coil_Type,
                unit.Coil_Length,
                refrigerant,
                (fansFlow / 60) / coilCount,
                deltaTemperature,
                airPressure)

            If drop < 0 Then
                Return Nothing
            End If

            Return Math.Round(drop, 2)
        Catch
            Return Nothing
        End Try
    End Function

    Private Function CalculateAirPressureDrop(unit As Condenser, search As RatingSearch, fansFlow As Double) As Double?
        If fansFlow <= 0 Then
            Return Nothing
        End If

        Dim coilCount = Math.Max(unit.Number_Coils, 1)
        Dim refrigerant = If(String.IsNullOrWhiteSpace(If(search Is Nothing, Nothing, search.RefrigerantType)), "R-404A", search.RefrigerantType.Trim())
        Dim airPressure = AtmosphericPressureKpa(If(search Is Nothing, Nothing, search.AltitudeM))

        Try
            Dim coilEngine As New ThermokeyCondenserCapacities
            Dim drop = 1.45 * coilEngine.CoilStandardAirPressureDrop(
                unit.Coil_Type,
                unit.Coil_Length,
                refrigerant,
                (fansFlow / 60) / coilCount,
                airPressure)

            If drop < 0 Then
                Return Nothing
            End If

            Return Math.Round(drop, 0)
        Catch
            Return Nothing
        End Try
    End Function

    Private Function CalculateOutletAirTemperature(dryBulbC As Double?, capacityKw As Double?, fansFlow As Double, altitudeM As Double?) As Double?
        If Not dryBulbC.HasValue OrElse Not capacityKw.HasValue OrElse fansFlow <= 0 OrElse capacityKw.Value <= 0 Then
            Return Nothing
        End If

        Dim airPressure = AtmosphericPressureKpa(altitudeM)
        Dim density = 1.204 * (airPressure / 101.3253547504) * (293.15 / (273.15 + dryBulbC.Value))
        If density <= 0 Then
            Return Nothing
        End If

        Const specificHeat As Double = 1.006
        Dim deltaT = (capacityKw.Value * 3600) / (density * fansFlow * specificHeat)
        Return Math.Round(dryBulbC.Value + deltaT, 1)
    End Function

    Private Function ResolveOperatingAirFlow(search As RatingSearch, catalogRpm As Integer, catalogAirFlow As Double) As Double
        Dim speedPercent = ResolveFanSpeedPercent(search, catalogRpm)
        If Not speedPercent.HasValue Then
            speedPercent = 100
        End If

        Return catalogAirFlow * speedPercent.Value / 100
    End Function

    Private Function AtmosphericPressureKpa(altitudeM As Double?) As Double
        Dim altitude = If(altitudeM, 0)
        Dim factor = 1 - 0.0000225577 * altitude
        If factor <= 0 Then
            Return 101.3253547504
        End If

        Return 101.3253547504 * Math.Pow(factor, 5.25588)
    End Function

    Private Function CalculateExchangeArea(unit As Condenser, model As String) As Double?
        Dim theta As Double = 0
        If model.Contains("JMC") OrElse model.Contains("TMC") Then
            theta = 25
        ElseIf model.Contains("JMK") OrElse model.Contains("TMK") Then
            theta = 32
        End If

        If theta <= 0 OrElse unit.Coil_Length <= 0 OrElse unit.Num_Of_Tubes <= 0 Then
            Return Nothing
        End If

        Const distanceOfTubes As Double = 9.2
        Const louverPitch As Double = 2.54
        Const depthOfFinFillet As Double = 0.38
        Dim coilCount = Math.Max(unit.Number_Coils, 1)
        Dim diagonal = Math.Sqrt(((louverPitch / 2000) - (depthOfFinFillet / 1000)) ^ 2 + (distanceOfTubes / 1000) ^ 2)
        Dim surface = 4 * diagonal * (theta / 1000) * Int(unit.Coil_Length / louverPitch) * (unit.Num_Of_Tubes + 1) * coilCount
        If surface <= 0 Then
            Return Nothing
        End If

        Return Math.Round(surface, 2)
    End Function

    Private Function CalculateRatedNoise(unit As Condenser, search As RatingSearch) As (SoundPower As Double?, SoundPressure As Double?, DistanceM As Double?)
        Dim distance = If(search IsNot Nothing AndAlso search.DistanceM.HasValue AndAlso search.DistanceM.Value > 0, search.DistanceM.Value, 10)
        Dim fanRows = unit.Num_Of_Fan_Rows
        Dim fansPerRow = unit.Num_Of_Fan_Per_Row
        If fanRows <= 0 OrElse fansPerRow <= 0 Then
            Return (Nothing, Nothing, distance)
        End If

        Dim totalLwa = ResolveCatalogFanLwa(unit, search)
        If totalLwa <= 0 Then
            Return (Nothing, Nothing, distance)
        End If

        Dim lengthM = unit.Vertical_Machine_Length / 1000.0
        Dim heightM = unit.Vertical_Machine_Height / 1000.0
        Dim widthM = unit.Vertical_Machine_Width / 1000.0
        If lengthM <= 0 OrElse heightM <= 0 OrElse widthM <= 0 Then
            Return (Nothing, Nothing, distance)
        End If

        Try
            Dim fanNoise As New FanNoiseMachine With {
                .TotalLWA = totalLwa,
                .FanRowsNumber = fanRows,
                .FanNumberPerEachRow = fansPerRow,
                .MachineLength = lengthM,
                .MachineHeight = heightM,
                .MachineWidth = widthM,
                .DistanceFromMachine = distance
            }

            Dim soundPower = fanNoise.FanTotalNoisePowerLevel
            Dim soundPressure = fanNoise.MachineFanNoise
            If Double.IsNaN(soundPower) OrElse Double.IsInfinity(soundPower) Then
                Return (Nothing, Nothing, distance)
            End If

            Dim roundedPower As Double? = Math.Round(soundPower, 0)
            Dim roundedPressure As Double? = Nothing
            If Not Double.IsNaN(soundPressure) AndAlso Not Double.IsInfinity(soundPressure) Then
                roundedPressure = Math.Round(soundPressure, 0)
            End If

            Return (roundedPower, roundedPressure, distance)
        Catch
            Return (Nothing, Nothing, distance)
        End Try
    End Function

    Private Function ResolveCatalogFanLwa(unit As Condenser, search As RatingSearch) As Double
        Dim fanType = Normalize(If(search Is Nothing, Nothing, search.FanType))
        Dim brand = NormalizeFanBrand(If(search Is Nothing, Nothing, search.FanBrand))
        Dim useEc = fanType = "EC" OrElse brand = "EBMPAPST" OrElse brand = "ZIEHLABEGG"

        If Not useEc Then
            Return unit.Fan_Noise_Delta
        End If

        Dim ecData As New NEW_EcFansData()
        Dim index = unit.Id - 1
        If brand = "ZIEHLABEGG" Then
            Return GetEcCatalogNoise(ecData.Nom_Value_Ziehl_EC_Noise_EC_Max, index, unit.Fan_Noise_Delta)
        End If

        Return GetEcCatalogNoise(ecData.Nom_Value_EBM_Papst_EC_NoiseStar_EC_Max, index, unit.Fan_Noise_Delta)
    End Function

    Private Function GetEcCatalogNoise(values As Single(), index As Integer, fallback As Double) As Double
        If values IsNot Nothing AndAlso index >= 0 AndAlso index < values.Length AndAlso values(index) > 0 Then
            Return values(index)
        End If

        Return fallback
    End Function

    Private Function CalculateVentilation(unit As Condenser, search As RatingSearch, model As String) As VentilationResult
        Dim fanRows = Math.Max(unit.Num_Of_Fan_Rows, 0)
        Dim fansPerRow = Math.Max(unit.Num_Of_Fan_Per_Row, 0)
        Dim fanCount = Math.Max(fanRows * fansPerRow, 1)
        Dim fanType = Normalize(If(search Is Nothing, Nothing, search.FanType))
        Dim brand = NormalizeFanBrand(If(search Is Nothing, Nothing, search.FanBrand))
        Dim useEc = fanType = "EC" OrElse brand = "EBMPAPST" OrElse brand = "ZIEHLABEGG"

        If useEc Then
            Dim ecVentilation = CalculateEcVentilation(unit, model, brand, fanRows, fansPerRow, fanCount)
            If Not String.IsNullOrWhiteSpace(ecVentilation.FanName) Then
                Return ecVentilation
            End If
        End If

        Return CalculateAcVentilation(unit, model, fanRows, fansPerRow, fanCount)
    End Function

    Private Function CalculateAcVentilation(unit As Condenser, model As String, fanRows As Integer, fansPerRow As Integer, fanCount As Integer) As VentilationResult
        Dim voltage = If(unit.Fan_Voltage > 0, CType(unit.Fan_Voltage, Integer?), Nothing)
        Dim rpm = PositiveRound(unit.FanRPM_Delta, 0)
        Dim power = PositiveRound(unit.FanPower_Delta, 0)
        Dim current = PositiveRound(unit.FanCurrent_Delta, 2)

        Return New VentilationResult With {
            .FanName = unit.Fan_Model,
            .FanType = "AC",
            .Link = "AC",
            .Diameter = ResolveDiameter(model, unit.Fan_Model),
            .FanRows = fanRows,
            .FansPerRow = fansPerRow,
            .NumberOfFans = fanCount,
            .RpmWp = rpm,
            .RpmMax = rpm,
            .Voltage = voltage,
            .Frequency = 50,
            .Phases = ResolvePhases(voltage),
            .SinglePowerWp = power,
            .SinglePowerMax = power,
            .SingleCurrentWp = current,
            .SingleCurrentMax = current
        }
    End Function

    Private Function CalculateEcVentilation(unit As Condenser, model As String, brand As String, fanRows As Integer, fansPerRow As Integer, fanCount As Integer) As VentilationResult
        Dim ecData As New NEW_EcFansData()
        Dim index = unit.Id - 1
        Dim useZiehl = brand = "ZIEHLABEGG"
        Dim fanNames = If(useZiehl, ecData.EC_New_FanSeriesZiehl, ecData.EC_New_FanSeriesEbmPapst)
        Dim fanName = ResolveEcFanName(fanNames, index, model, ecData.EC_New_CondenserModel_EBMPapst)
        If Not IsValidEcName(fanName) Then
            Return New VentilationResult()
        End If

        Dim voltageValue = If(useZiehl,
            GetEcCatalogSingle(ecData.Nom_Value_Ziehl_EC_Voltage, index, 0),
            GetEcCatalogSingle(ecData.Nom_Value_EBM_Papst_EC_Voltage, index, 0))
        Dim voltage = If(voltageValue > 0, CType(CInt(voltageValue), Integer?), Nothing)
        Dim phases = ResolvePhases(voltage)
        Dim linkPrefix = If(phases = 1, "EC-1Ph-", "EC-3Ph-")
        Dim linkSuffix = If(useZiehl, "(B2)", "(B1)")

        Dim rpmMax = PositiveRound(If(useZiehl,
            GetEcCatalogSingle(ecData.Nom_Value_Ziehl_FanRPM_EC_Max, index, 0),
            GetEcCatalogSingle(ecData.Nom_Value_EBM_Papst_RPM_EC_Max, index, 0)), 0)
        Dim powerMax = PositiveRound(If(useZiehl,
            GetEcCatalogSingle(ecData.Nom_Value_Ziehl_FanPower_EC_Max, index, 0),
            GetEcCatalogSingle(ecData.Nom_Value_EBM_Papst_FanPower_EC_Max, index, 0)), 0)
        Dim currentMax = PositiveRound(If(useZiehl,
            GetEcCatalogSingle(ecData.Nom_Value_Ziehl_FanCurrent_EC_Max, index, 0),
            GetEcCatalogSingle(ecData.Nom_Value_EBM_Papst_FanCurrent_EC_Max, index, 0)), 2)

        Dim catalogFlow = If(useZiehl,
            GetEcCatalogFlow(ecData.EC_Curve1_FlowRate_Ziehl, unit),
            GetEcCatalogFlow(ecData.EC_Curve1_FlowRate_EBMPapst, unit))
        Dim dpAir = If(useZiehl,
            GetEcCatalogDouble(ecData.EC_Curve1_DpAir_Ziehl, index, 0),
            GetEcCatalogDouble(ecData.EC_Curve1_DpAir_EBMPapst, index, 0))
        Dim flowPerFan = If(fanCount > 0, catalogFlow / fanCount, catalogFlow)

        Dim rpmWp = rpmMax
        Dim powerWp = powerMax
        Dim currentWp = currentMax
        If Not String.IsNullOrWhiteSpace(fanName) AndAlso flowPerFan > 0 Then
            Try
                Dim wpEngine As New EcFans_EquationsForFanPropertiesAtWorkingPoint()
                rpmWp = CoalescePositive(PositiveRound(wpEngine.RadialSpeed(fanName, flowPerFan, dpAir), 0), rpmMax)
                powerWp = CoalescePositive(PositiveRound(wpEngine.ElectricPower(fanName, flowPerFan, dpAir), 0), powerMax)
                currentWp = CoalescePositive(PositiveRound(wpEngine.ElectricCurrent(fanName, flowPerFan, dpAir), 2), currentMax)
            Catch
            End Try
        End If

        Return New VentilationResult With {
            .FanName = fanName.Trim(),
            .FanType = "EC",
            .Link = linkPrefix & linkSuffix,
            .Diameter = ResolveDiameter(model, fanName),
            .FanRows = fanRows,
            .FansPerRow = fansPerRow,
            .NumberOfFans = fanCount,
            .RpmWp = rpmWp,
            .RpmMax = rpmMax,
            .Voltage = voltage,
            .Frequency = 50,
            .Phases = phases,
            .SinglePowerWp = powerWp,
            .SinglePowerMax = powerMax,
            .SingleCurrentWp = currentWp,
            .SingleCurrentMax = currentMax
        }
    End Function

    Private Function ResolveEcFanName(fanNames As String(), index As Integer, model As String, ecModels As String()) As String
        Dim fanName = GetEcFanName(fanNames, index)
        If IsValidEcName(fanName) Then
            Return fanName
        End If

        Return GetEcFanName(fanNames, FindEcIndex(model, ecModels))
    End Function

    Private Function ResolvePhases(voltage As Integer?) As Integer?
        If Not voltage.HasValue Then
            Return Nothing
        End If

        If voltage.Value = 230 Then
            Return 1
        End If

        If voltage.Value = 400 Then
            Return 3
        End If

        If voltage.Value > 300 Then
            Return 3
        End If

        Return 1
    End Function

    Private Function GetEcCatalogSingle(values As Single(), index As Integer, fallback As Double) As Double
        If values IsNot Nothing AndAlso index >= 0 AndAlso index < values.Length AndAlso values(index) > 0 Then
            Return values(index)
        End If

        Return fallback
    End Function

    Private Function GetEcCatalogDouble(values As Double(), index As Integer, fallback As Double) As Double
        If values IsNot Nothing AndAlso index >= 0 AndAlso index < values.Length AndAlso values(index) > 0 Then
            Return values(index)
        End If

        Return fallback
    End Function

    Private Function PositiveRound(value As Double, digits As Integer) As Double?
        If Double.IsNaN(value) OrElse Double.IsInfinity(value) OrElse value <= 0 Then
            Return Nothing
        End If

        Return Math.Round(value, digits)
    End Function

    Private Function CoalescePositive(primary As Double?, fallback As Double?) As Double?
        If primary.HasValue AndAlso primary.Value > 0 Then
            Return primary
        End If

        Return fallback
    End Function

    Private Structure VentilationResult
        Public FanName As String
        Public FanType As String
        Public Link As String
        Public Diameter As Integer?
        Public FanRows As Integer
        Public FansPerRow As Integer
        Public NumberOfFans As Integer
        Public RpmWp As Double?
        Public RpmMax As Double?
        Public Voltage As Integer?
        Public Frequency As Integer?
        Public Phases As Integer?
        Public SinglePowerWp As Double?
        Public SinglePowerMax As Double?
        Public SingleCurrentWp As Double?
        Public SingleCurrentMax As Double?
    End Structure

    Private Function FormatConnection(unit As Condenser, search As RatingSearch, isInlet As Boolean) As String
        Dim refrigerant = If(search Is Nothing, Nothing, search.RefrigerantType)
        Dim isNh3 = Not String.IsNullOrWhiteSpace(refrigerant) AndAlso (
            refrigerant.IndexOf("NH3", StringComparison.OrdinalIgnoreCase) >= 0 OrElse
            refrigerant.IndexOf("R717", StringComparison.OrdinalIgnoreCase) >= 0)

        Dim count As Double
        Dim diameter As Double
        If isNh3 Then
            If isInlet Then
                count = unit.Num_Of_Condenser_Inlets_NH3
                diameter = unit.Inlet_Diameter_NH3
            Else
                count = unit.Num_Of_Condenser_Outlet_NH3
                diameter = unit.Outlet_Diameter_NH3
            End If
        Else
            If isInlet Then
                count = unit.Number_Of_Inlets
                diameter = unit.Inlet_Diameter
            Else
                count = unit.Num_Of_Condenser_Outlet
                diameter = unit.Outlet_Diameter
            End If
        End If

        If count <= 0 OrElse diameter <= 0 Then
            Return Nothing
        End If

        Return CStr(count) & " x " & CStr(diameter)
    End Function

End Class
