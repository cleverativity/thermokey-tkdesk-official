Imports System.Math
Imports Cardano.Domain.Entities
Imports Cardano.Domain.Models


Public Class EAnalysis



    Dim thisTkFansEcDataAtWP As New EcFans_EquationsForFanPropertiesAtWorkingPoint
    Dim TkCondenserCapacities As New ThermokeyCondenserCapacities
    Dim TkSecondThermodynamicEngine As New CardanoAdditionalCalculationEngine
    Dim ThkMicro25_NH3 As New CalculationEngineNH3_TkMicro25
    Dim ThkMicro32_NH3 As New CalculationEngineNH3_TkMicro32
    Dim TkSecondThermodynamicEngine_NH3 As New CardanoAdditionalCalculationEngine_NH3
    Dim TkFanNoiseMachine As New FanNoiseMachine
    Dim TkEC_FansFlowRate As New NEW_EcFansData
    Dim thisTkDpAir As Double = 0
    Dim VariationDeltaTemperature As Boolean = False
    Dim VariationCapacity As Boolean = False

    'Dim dbService As New DatabaseService()
    'Dim allCondensers = dbService.GetAllCondenser()

    Dim condensers As New List(Of Condenser)()

    Private Function CalculateEnergyAnalysis(newCondeser As List(Of Condenser), conderserId As Int32, condenserModel As String, isCalculateCapacity As Boolean, isCalculateAirFlow As Boolean, isSingleCaculation As Boolean, IntEACurrentFixCapacity As Double, IntEANewFixCapacity As Double, intEAStartingAir As Double, intEAInletAirTemp As Double, intEAFinalAir As Double, intEAStep As Double, intEADistance As Double, intEACondensingTemp As Double, distance As Double, flowDirection As String,
          refRigerantType As String, _airflowRate As Double, _rpm As Double, _numberOfFans As Double, _power As Double, _currentFan As Double, _tubeVolume As Double, _weight As Double, _diameterInlet As String, _diameterOutlet As String, _price As Double, subCooling As Double, compressor As Double, atmPressureInMetric As Double, deltaTemperature As Double, condensing As Double) As List(Of EAResult)

        condensers = newCondeser


        Dim detailsList As New List(Of EAResult)

        Dim thisCalculatedAirFlowRate As Double = 0
        Dim thisDeltaTemperature As Double = 0
        Dim thisAirTemperature As Double = 0

        Try




            If isCalculateCapacity Then

                For thisRow = Int(intEAStep) + 1 To 2 Step -1

                    Dim detail As New EAResult()
                    thisAirTemperature = intEAStartingAir + (thisRow - 2) * (intEAFinalAir - intEAStartingAir) / intEAStep
                    thisDeltaTemperature = Val(intEACondensingTemp) - thisAirTemperature
                    '''Computation
                    'If deltaTemperature = 15 Then
                    '    thisCalculatedAirFlowRate = _airflowRate * CoefficientForAirFlowRate(thisDeltaTemperature / 15, refRigerantType)
                    'Else
                    '    thisCalculatedAirFlowRate = _airflowRate / CoefficientForAirFlowRate(deltaTemperature / 15, refRigerantType)
                    '    thisCalculatedAirFlowRate = thisCalculatedAirFlowRate * CoefficientForAirFlowRate(thisDeltaTemperature / 15, refRigerantType)

                    'End If


                    detail.AirTempInlet = thisAirTemperature
                    detail.Capacity = TkCoilCapacity(newCondeser, conderserId, thisDeltaTemperature, _airflowRate, refRigerantType, compressor, subCooling, atmPressureInMetric)
                    detail.AirFlow = _airflowRate
                    thisTkDpAir = TkCondenserCapacities.CoilStandardAirPressureDrop(condensers(conderserId - 1).Coil_Type, condensers(conderserId - 1).Coil_Length, refRigerantType, (thisCalculatedAirFlowRate / 60) / condensers(conderserId - 1).Number_Coils, atmPressureInMetric)
                    detail.DpAir = 1.45 * thisTkDpAir
                    detail.Spl = TkFanNoise(conderserId, condenserModel, flowDirection, distance)
                    detail.Rpm = _rpm
                    detail.Power = _numberOfFans * _power
                    detail.CurrentFans = _numberOfFans * _currentFan
                    detail.TubeVolume = _tubeVolume
                    detail.Weight = _weight
                    detail.ConnectDiamInlet = _diameterInlet
                    detail.ConnectDiamOutlet = _diameterOutlet
                    detail.Price = _price

                    'If TkEC_Fans_SoundPressureLevelCheck(conderserId, condenserModel, flowDirection) = False Then
                    '    detail.AirTempInlet = 0
                    '    detail.Capacity = 0
                    '    detail.AirFlow = 0
                    '    detail.DpAir = 0
                    '    detail.Spl = 0
                    '    detail.Rpm = 0
                    '    detail.Power = 0
                    '    detail.CurrentFans = 0
                    '    detail.TubeVolume = 0
                    '    detail.Weight = 0
                    '    detail.ConnectDiamInlet = ""
                    '    detail.ConnectDiamOutlet = ""
                    '    detail.Price = 0
                    'End If

                    'If TkEC_Fans_AirPressureDropCheck(conderserId, condenserModel) = False Then
                    '    detail.AirTempInlet = 0
                    '    detail.Capacity = 0
                    '    detail.AirFlow = 0
                    '    detail.DpAir = 0
                    '    detail.Spl = 0
                    '    detail.Rpm = 0
                    '    detail.Power = 0
                    '    detail.CurrentFans = 0
                    '    detail.TubeVolume = 0
                    '    detail.Weight = 0
                    '    detail.ConnectDiamInlet = ""
                    '    detail.ConnectDiamOutlet = ""
                    '    detail.Price = 0
                    'End If

                    'If TkNewEC_Fans_RefrigerantPressureDropCheck(conderserId, thisDeltaTemperature, refRigerantType, condensing, condenserModel, compressor, subCooling, atmPressureInMetric) = False Then
                    '    detail.AirTempInlet = 0
                    '    detail.Capacity = 0
                    '    detail.AirFlow = 0
                    '    detail.DpAir = 0
                    '    detail.Spl = 0
                    '    detail.Rpm = 0
                    '    detail.Power = 0
                    '    detail.CurrentFans = 0
                    '    detail.TubeVolume = 0
                    '    detail.Weight = 0
                    '    detail.ConnectDiamInlet = ""
                    '    detail.ConnectDiamOutlet = ""
                    '    detail.Price = 0
                    'End If


                    detailsList.Add(detail)
                Next

            ElseIf isCalculateAirFlow Then


                For thisRow = Int(intEAStep) + 1 To 2 Step -1

                    Dim detail As New EAResult()
                    thisAirTemperature = intEAStartingAir + (thisRow - 2) * (intEAFinalAir - intEAStartingAir) / intEAStep
                    detail.Capacity = Val(IntEACurrentFixCapacity)

                    detail.AirTempInlet = thisAirTemperature
                    thisDeltaTemperature = Val(intEACondensingTemp) - thisAirTemperature

                    ''Computation
                    If deltaTemperature = 15 Then
                        thisCalculatedAirFlowRate = _airflowRate * CoefficientForAirFlowRate(thisDeltaTemperature / 15, refRigerantType)
                    Else
                        thisCalculatedAirFlowRate = _airflowRate / CoefficientForAirFlowRate(deltaTemperature / 15, refRigerantType)
                        thisCalculatedAirFlowRate = thisCalculatedAirFlowRate * CoefficientForAirFlowRate(thisDeltaTemperature / 15, refRigerantType)

                    End If



                    thisTkDpAir = TkCondenserCapacities.CoilStandardAirPressureDrop(condensers(conderserId - 1).Coil_Type, condensers(conderserId - 1).Coil_Length, refRigerantType, (thisCalculatedAirFlowRate / 60) / condensers(conderserId - 1).Number_Coils, atmPressureInMetric)
                    thisTkDpAir = 1.45 * thisTkDpAir
                    detail.AirFlow = thisCalculatedAirFlowRate
                    detail.DpAir = thisTkDpAir

                    'SPL
                    detail.Spl = TkFanNoise(conderserId, condenserModel, flowDirection, distance)


                    Select Case True

                        Case Microsoft.VisualBasic.Right(condenserModel, 2) = "B1"

                            detail.Rpm = _numberOfFans * Me.thisTkFansEcDataAtWP.RadialSpeed(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                            'Power
                            detail.Power = _numberOfFans * Me.thisTkFansEcDataAtWP.ElectricPower(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                            'Current
                            detail.CurrentFans = _numberOfFans * Me.thisTkFansEcDataAtWP.ElectricCurrent(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)



                        Case Microsoft.VisualBasic.Right(condenserModel, 2) = "B2"

                            detail.Rpm = _numberOfFans * Me.thisTkFansEcDataAtWP.RadialSpeed(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                            'Power
                            detail.Power = _numberOfFans * Me.thisTkFansEcDataAtWP.ElectricPower(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                            'Current
                            detail.CurrentFans = _numberOfFans * Me.thisTkFansEcDataAtWP.ElectricCurrent(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                        Case Else
                    End Select

                    detail.TubeVolume = _tubeVolume
                    detail.Weight = _weight
                    detail.ConnectDiamInlet = _diameterInlet
                    detail.ConnectDiamOutlet = _diameterOutlet
                    detail.Price = _price


                    'If TkEC_Fans_SoundPressureLevelCheck(conderserId, condenserModel, flowDirection) = False Then
                    '    detail.AirTempInlet = 0
                    '    detail.Capacity = 0
                    '    detail.AirFlow = 0
                    '    detail.DpAir = 0
                    '    detail.Spl = 0
                    '    detail.Rpm = 0
                    '    detail.Power = 0
                    '    detail.CurrentFans = 0
                    '    detail.TubeVolume = 0
                    '    detail.Weight = 0
                    '    detail.ConnectDiamInlet = ""
                    '    detail.ConnectDiamOutlet = ""
                    '    detail.Price = 0
                    'End If

                    'If TkEC_Fans_AirPressureDropCheck(conderserId, condenserModel) = False Then
                    '    detail.AirTempInlet = 0
                    '    detail.Capacity = 0
                    '    detail.AirFlow = 0
                    '    detail.DpAir = 0
                    '    detail.Spl = 0
                    '    detail.Rpm = 0
                    '    detail.Power = 0
                    '    detail.CurrentFans = 0
                    '    detail.TubeVolume = 0
                    '    detail.Weight = 0
                    '    detail.ConnectDiamInlet = ""
                    '    detail.ConnectDiamOutlet = ""
                    '    detail.Price = 0
                    'End If

                    'If TkNewEC_Fans_RefrigerantPressureDropCheck(conderserId, thisDeltaTemperature, refRigerantType, condensing, condenserModel, compressor, subCooling, atmPressureInMetric) = False Then
                    '    detail.AirTempInlet = 0
                    '    detail.Capacity = 0
                    '    detail.AirFlow = 0
                    '    detail.DpAir = 0
                    '    detail.Spl = 0
                    '    detail.Rpm = 0
                    '    detail.Power = 0
                    '    detail.CurrentFans = 0
                    '    detail.TubeVolume = 0
                    '    detail.Weight = 0
                    '    detail.ConnectDiamInlet = ""
                    '    detail.ConnectDiamOutlet = ""
                    '    detail.Price = 0
                    'End If

                    detailsList.Add(detail)

                Next



            ElseIf isSingleCaculation Then

                Dim detail As New EAResult()
                detail.TubeVolume = _tubeVolume
                detail.Weight = _weight
                detail.ConnectDiamInlet = _diameterInlet
                detail.ConnectDiamOutlet = _diameterOutlet
                detail.Price = _price

                If IntEANewFixCapacity <> 0 Then

                    detail.AirTempInlet = Val(intEAInletAirTemp)
                    detail.Capacity = If(IntEACurrentFixCapacity <> IntEANewFixCapacity, IntEANewFixCapacity, Val(IntEACurrentFixCapacity))
                    thisDeltaTemperature = Val(intEACondensingTemp) - Val(intEAInletAirTemp)

                    ''Computation
                    If deltaTemperature = 15 Then
                        thisCalculatedAirFlowRate = _airflowRate * CoefficientForAirFlowRate(thisDeltaTemperature / 15, refRigerantType)
                    Else
                        thisCalculatedAirFlowRate = _airflowRate / CoefficientForAirFlowRate(deltaTemperature / 15, refRigerantType)
                        thisCalculatedAirFlowRate = thisCalculatedAirFlowRate * CoefficientForAirFlowRate(thisDeltaTemperature / 15, refRigerantType)

                    End If

                End If


                detail.AirFlow = thisCalculatedAirFlowRate
                thisTkDpAir = TkCondenserCapacities.CoilStandardAirPressureDrop(condensers(conderserId - 1).Coil_Type, condensers(conderserId - 1).Coil_Length, refRigerantType, (thisCalculatedAirFlowRate / 60) / condensers(conderserId - 1).Number_Coils, atmPressureInMetric)

                If IntEANewFixCapacity <> 0 Then
                    detail.DpAir = thisTkDpAir
                Else
                    detail.DpAir = 1.45 * thisTkDpAir
                End If

                detail.Spl = TkFanNoise(conderserId, condenserModel, flowDirection, distance)



                Select Case True

                    Case Microsoft.VisualBasic.Right(condenserModel, 2) = "B1"

                        detail.Rpm = _numberOfFans * Me.thisTkFansEcDataAtWP.RadialSpeed(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                        'Power
                        detail.Power = _numberOfFans * Me.thisTkFansEcDataAtWP.ElectricPower(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                        'Current
                        detail.CurrentFans = _numberOfFans * Me.thisTkFansEcDataAtWP.ElectricCurrent(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)



                    Case Microsoft.VisualBasic.Right(condenserModel, 2) = "B2"

                        detail.Rpm = _numberOfFans * Me.thisTkFansEcDataAtWP.RadialSpeed(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                        'Power
                        detail.Power = _numberOfFans * Me.thisTkFansEcDataAtWP.ElectricPower(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                        'Current
                        detail.CurrentFans = _numberOfFans * Me.thisTkFansEcDataAtWP.ElectricCurrent(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(conderserId - 1), thisCalculatedAirFlowRate, thisTkDpAir)

                    Case Else
                End Select


                'If TkEC_Fans_SoundPressureLevelCheck(conderserId, condenserModel, flowDirection) = False Then
                '    detail.AirTempInlet = 0
                '    detail.Capacity = 0
                '    detail.AirFlow = 0
                '    detail.DpAir = 0
                '    detail.Spl = 0
                '    detail.Rpm = 0
                '    detail.Power = 0
                '    detail.CurrentFans = 0
                '    detail.TubeVolume = 0
                '    detail.Weight = 0
                '    detail.ConnectDiamInlet = ""
                '    detail.ConnectDiamOutlet = ""
                '    detail.Price = 0
                'End If

                'If TkEC_Fans_AirPressureDropCheck(conderserId, condenserModel) = False Then
                '    detail.AirTempInlet = 0
                '    detail.Capacity = 0
                '    detail.AirFlow = 0
                '    detail.DpAir = 0
                '    detail.Spl = 0
                '    detail.Rpm = 0
                '    detail.Power = 0
                '    detail.CurrentFans = 0
                '    detail.TubeVolume = 0
                '    detail.Weight = 0
                '    detail.ConnectDiamInlet = ""
                '    detail.ConnectDiamOutlet = ""
                '    detail.Price = 0
                'End If

                'If TkNewEC_Fans_RefrigerantPressureDropCheck(conderserId, thisDeltaTemperature, refRigerantType, condensing, condenserModel, compressor, subCooling, atmPressureInMetric) = False Then
                '    detail.AirTempInlet = 0
                '    detail.Capacity = 0
                '    detail.AirFlow = 0
                '    detail.DpAir = 0
                '    detail.Spl = 0
                '    detail.Rpm = 0
                '    detail.Power = 0
                '    detail.CurrentFans = 0
                '    detail.TubeVolume = 0
                '    detail.Weight = 0
                '    detail.ConnectDiamInlet = ""
                '    detail.ConnectDiamOutlet = ""
                '    detail.Price = 0
                'End If

                detailsList.Add(detail)

            End If


        Catch ex As Exception

            Return New List(Of EAResult)()

        End Try

        Return detailsList

    End Function

    Private Function TkNewEC_Fans_RefrigerantPressureDropCheck(newCondeser As List(Of Condenser), ByVal found_EC_IdCM As Int16, ByVal _thisTkAirTemperature As Double, refRigerantType As String, condensing As Double, condenserName As String, compressor As Double, subCooling As Double, atmPressureInMetric As Double) As Boolean

        condensers = newCondeser

        Dim TK_NewRefrsEngine As New TkNewRefrigerantsThermodynamicEngine


        Dim thisTK_MoistAirProperties As New InstinctCodeII.Fluids.Properties.Air.MoistAirProperties


        Dim this_TK_DpRefr As Double = 0


        Dim this_TK_NewEC_RefrigerantPressureDropCheck As Boolean = True

        Dim this_TK_NewEC_FansFlow As Single = 0

        'Selected refrigerant type. C. Gnesutta, 17 Diembre 2020.
        Dim this_TK_NewEC_RefType As String = refRigerantType

        Dim this_TK_Max_NewEC_DpRefr As Double = 140 'Maximum Refrigerant Pressure Drops (140 kPa)

        Dim this_TK_Min_NewEC_DpRefr As Double = 5 'Minimum Refrigerant Pressure Drops (5 kPa)


        Dim thisEC_CondTemp As Double = condensing



        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'GLOBAL Inlet Air Density [kg/m^3]
        Dim thisTk_DensityAirStd As Double = 16.0185 * thisTK_MoistAirProperties.MoistDensity

        'GLOBAL Inlet Air Viscosity [Pa*s]
        Dim thisTk_ViscosityAirStd As Double = 0.413 * 0.001 * thisTK_MoistAirProperties.Viscosity

        'GLOBAL Inlet Air Specific Heat[Pa*s]
        Dim thisTk_Tk_SpecificHeatAirStd As Double = 4186.8 * thisTK_MoistAirProperties.HeatCapacity

        'GLOBAL Inlet ThermalConductivity[Pa*s]
        Dim this_Tk_ThermalConductivityAirStd As Double = 1.7295772056 * thisTK_MoistAirProperties.Conductivity

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        Dim thisTkCondensatoreScelto = Microsoft.VisualBasic.Right(condenserName, 13)


        'EC Fans - EBM-Papst


        Select Case True

            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "V" & "-B1")

                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "V" & "-B1")

                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "V" & "-B1")

                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "V" & "-B1")

                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "V" & "-B1")
                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "V" & "-B1")
                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(found_EC_IdCM - 1)

            Case Else
        End Select



        Select Case True

            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "V" & "-B2")

                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "V" & "-B2")

                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(found_EC_IdCM - 1)


            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "V" & "-B2")

                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "V" & "-B2")

                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "V" & "-B2")
                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "V" & "-B2")
                this_TK_NewEC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(found_EC_IdCM - 1)

            Case Else
        End Select



        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'C. Gnesutta, 17 Dicembre 2020.
        Dim this_NewEC_CoilType As String = condensers(found_EC_IdCM - 1).Coil_Type 'Me.TkCondenserSystemII1.CoilType(found_EC_IdCM - 1)

        Dim this_NewEC_CoilTypeNH3 As String = condensers(found_EC_IdCM - 1).Coil_Type_NH3 'Me.TkCondenserSystemII1.CoilType_NH3(found_EC_IdCM - 1)

        Dim this_NewEC_CoilLength As Double = condensers(found_EC_IdCM - 1).Coil_Length 'Me.TkCondenserSystemII1.CoilLength(found_EC_IdCM - 1)

        Dim this_NewEC_NumberOfCoils As Double = condensers(found_EC_IdCM - 1).Number_Coils 'Me.TkCondenserSystemII1.NumberOfCoils(found_EC_IdCM - 1)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'In questa equazione vengo calcolati i flussi d'aria su ogni batteria ed espressi in [m^3/min]
        'C. Gnesutta 17 Dicembre 2020.
        this_TK_NewEC_FansFlow = (this_TK_NewEC_FansFlow / this_NewEC_NumberOfCoils) / 60
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Select Case True

            Case ((refRigerantType = "R-32") Or (refRigerantType = "R-245fa") Or (refRigerantType = "R-407F") Or (refRigerantType = "R-449a") Or (refRigerantType = "R-513a") Or (refRigerantType = "R-600") Or (refRigerantType = "R-600a") Or (refRigerantType = "R-1234yf") Or (refRigerantType = "R-1234ze"))



                this_TK_DpRefr = TK_NewRefrsEngine.FinalCalculationRefrigerantSidePressureDrop("32", this_NewEC_CoilType, this_NewEC_CoilLength, refRigerantType, (60 * this_TK_NewEC_FansFlow), (thisEC_CondTemp - _thisTkAirTemperature), thisEC_CondTemp, compressor, subCooling, thisTk_ViscosityAirStd, thisTk_Tk_SpecificHeatAirStd, this_Tk_ThermalConductivityAirStd, thisTk_DensityAirStd, atmPressureInMetric)



            Case (refRigerantType = "R717-(NH3)")

                If (condensers(found_EC_IdCM - 1).Series = "MC") Then


                Else
                    this_TK_DpRefr = ThkMicro32_NH3.RefrigerantPressureDrop_NH3_TkMicro32(this_NewEC_CoilTypeNH3, this_NewEC_CoilLength, (60 * this_TK_NewEC_FansFlow), (thisEC_CondTemp - _thisTkAirTemperature), atmPressureInMetric)
                End If

            Case Else

                this_TK_DpRefr = TkCondenserCapacities.CoilStandardRefrigerantPressureDrop(this_NewEC_CoilType, this_NewEC_CoilLength, refRigerantType, this_TK_NewEC_FansFlow, (thisEC_CondTemp - _thisTkAirTemperature), atmPressureInMetric)


        End Select


        ' C. Gnesutta, 17 Dicembre 2020.
        If (this_TK_DpRefr >= this_TK_Max_NewEC_DpRefr Or this_TK_DpRefr <= this_TK_Min_NewEC_DpRefr) Then

            this_TK_NewEC_RefrigerantPressureDropCheck = True
        Else

            this_TK_NewEC_RefrigerantPressureDropCheck = False
        End If


        Return this_TK_NewEC_RefrigerantPressureDropCheck
    End Function

    Private Function TkEC_Fans_SoundPressureLevelCheck(ByVal found_EC_IdCM As Int16, condenserName As String, flowDirection As String) As Boolean

        Dim this_Tk_EC_FansFlow As Single = 0
        Dim this_NewEC_DpAir As Single = 0
        Dim this_TkEC_FanName As String = ""

        Dim this_TkEC_NoiseMin As Double = 30


        Dim this_NewEC_SoundPressureLevelCheck As Boolean = True

        Dim EC_Noise_At_WorkingPoint As New EcFans_EquationsForFanPropertiesAtWorkingPoint

        Dim this_NewEC_ThermokeyNoise As Double = 0

        Dim _thisTkStdFanDistance As Double = 10

        'C. Gnesutta, 26 marzo 2021 - Baco Corretto su indicazione di S. Ortolano
        Dim this_NewEC_NumberOfCoils As Double = condensers(found_EC_IdCM - 1).Number_Coils
        Dim thisTkCondensatoreScelto = Microsoft.VisualBasic.Right(condenserName, 13)

        Dim thisSoundPressureLevelCheck As Boolean = False

        'EC Fans - EBM-Papst


        Select Case True

            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "V" & "-B1")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve1_DpAir_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "V" & "-B1")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve2_DpAir_EBMPapst(found_EC_IdCM - 1)


            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "V" & "-B1")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve3_DpAir_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "V" & "-B1")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve4_DpAir_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "V" & "-B1")
                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve5_DpAir_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "V" & "-B1")
                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve6_DpAir_EBMPapst(found_EC_IdCM - 1)
            Case Else
        End Select


        'EC Fans - Ziehl-Abegg
        ' C. Gnesutta, 17 Dicembre 2020.


        Select Case True

            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "V" & "-B2")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve1_DpAir_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "V" & "-B2")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve2_DpAir_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "V" & "-B2")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve3_DpAir_Ziehl(found_EC_IdCM - 1)


            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "V" & "-B2")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(found_EC_IdCM - 1)

                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve4_DpAir_Ziehl(found_EC_IdCM - 1)


            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "V" & "-B2")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(found_EC_IdCM - 1)
                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve5_DpAir_Ziehl(found_EC_IdCM - 1)


            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "V" & "-B2")

                this_Tk_EC_FansFlow = Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(found_EC_IdCM - 1)
                this_NewEC_DpAir = Me.TkEC_FansFlowRate.EC_Curve6_DpAir_Ziehl(found_EC_IdCM - 1)
            Case Else
        End Select




        ' NOISE OF THE MACHINE. C. Gnesutta, 17 Dicembre 2020 - Questa parte non muta
        Select Case flowDirection
            Case "Vertical"
                TkFanNoiseMachine.MachineHeight = condensers(found_EC_IdCM - 1).Vertical_Machine_Height / 1000 'Me.TkCondenserSystemII1.VerticalMachineHeight(found_EC_IdCM - 1) / 1000

                TkFanNoiseMachine.DistanceFromMachine = _thisTkStdFanDistance

                TkFanNoiseMachine.MachineLength = condensers(found_EC_IdCM - 1).Vertical_Machine_Length / 1000 'Me.TkCondenserSystemII1.VerticalMachineLength(found_EC_IdCM - 1) / 1000

                TkFanNoiseMachine.MachineWidth = condensers(found_EC_IdCM - 1).Vertical_Machine_Width / 1000 'Me.TkCondenserSystemII1.VerticalMachineWidth(found_EC_IdCM - 1) / 1000

            Case "Horizontal"
                ' Struttura decisionale, per risolvere problematiche legate alla tipologia di condensatore remoto: queste macchine sono soltanto a Flusso d'arua verticale.
                'C. Gnesutta, 17 dicembre 2020
                If (Microsoft.VisualBasic.Left(condensers(found_EC_IdCM - 1).Model, 3) = "JMC" Or Microsoft.VisualBasic.Left(condensers(found_EC_IdCM - 1).Model, 3) = "JMK" Or Microsoft.VisualBasic.Left(condensers(found_EC_IdCM - 1).Model, 3) = "TMC") Then

                    TkFanNoiseMachine.MachineHeight = condensers(found_EC_IdCM - 1).Vertical_Machine_Height / 1000

                    TkFanNoiseMachine.DistanceFromMachine = _thisTkStdFanDistance

                    TkFanNoiseMachine.MachineLength = condensers(found_EC_IdCM - 1).Vertical_Machine_Length / 1000
                    TkFanNoiseMachine.MachineWidth = condensers(found_EC_IdCM - 1).Vertical_Machine_Width / 1000

                Else
                    TkFanNoiseMachine.MachineHeight = condensers(found_EC_IdCM - 1).Horizontal_Machine_Height / 1000

                    TkFanNoiseMachine.DistanceFromMachine = _thisTkStdFanDistance

                    TkFanNoiseMachine.MachineLength = condensers(found_EC_IdCM - 1).Horizontal_Machine_Length 'Me.TkCondenserSystemII1.HorizontalMachineLength(found_EC_IdCM - 1) / 1000

                    TkFanNoiseMachine.MachineWidth = condensers(found_EC_IdCM - 1).Horizontal_Machine_Width 'Me.TkCondenserSystemII1.HorizontalMachineWidth(found_EC_IdCM - 1) / 1000

                End If

            Case Else
        End Select


        TkFanNoiseMachine.FanRowsNumber = condensers(found_EC_IdCM - 1).Num_Of_Fan_Rows  ''Me.TkCondenserSystemII1.NumberOfFanRows(found_EC_IdCM - 1)
        TkFanNoiseMachine.FanNumberPerEachRow = condensers(found_EC_IdCM - 1).Num_Of_Fan_Per_Row  'Me.TkCondenserSystemII1.NumberOfFansPerRow(found_EC_IdCM - 1)


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'EC Fans - Qui viene acquisito il nome del ventilatore EC.
        'C. Gnesutta, 18 Dicembre 2020.
        If (Microsoft.VisualBasic.Right(condenserName, 2) = "B1") Then
            this_TkEC_FanName = Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(found_EC_IdCM - 1)
        Else
            this_TkEC_FanName = Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(found_EC_IdCM - 1)
        End If
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Qui viene acquisita l'emissione sonora del ventilatore EC
        'C. Gnesutta, 18 Dicembre 2020.

        'C. Gnesutta, 26 marzo 2021 - Baco Corretto su indicazione di S. Ortolano
        TkFanNoiseMachine.TotalLWA = EC_Noise_At_WorkingPoint.RadiatedNoise(this_TkEC_FanName, this_Tk_EC_FansFlow / (condensers(found_EC_IdCM - 1).Num_Of_Fan_Rows * condensers(found_EC_IdCM - 1).Num_Of_Fan_Per_Row), this_NewEC_DpAir)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Final calculation of the MCHX Radiated Noise @Working Conditions
        'C. Gnesutta, 18 Dicembre 2020.
        this_NewEC_ThermokeyNoise = TkFanNoiseMachine.MachineFanNoise
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        'Serve ad evitare calcoli con pressioni sonore troppo basse

        If (this_TkEC_NoiseMin > this_NewEC_ThermokeyNoise) Then

            thisSoundPressureLevelCheck = False

        Else
            thisSoundPressureLevelCheck = True

        End If


        Return thisSoundPressureLevelCheck

    End Function

    Public Function TkCoilCapacity(newCondeser As List(Of Condenser), ByVal _thisIdCondenser As Int16, ByVal _deltaTemperature As Double, ByVal _thisAirFlowRate As Double, ByVal _thisRefType As String, ByVal _thisCondenserDeSuperHeatDegrees As Double, ByVal _thisCondenserSubCoolDegrees As Double, ByVal _thisAtmosphericPressure As Double) As Double

        condensers = newCondeser

        Dim thisC3 As Double = 0

        Dim _thisCapacity As Double = 0


        Select Case True

            Case ((_thisRefType = "R-32") Or (_thisRefType = "R-245fa") Or (_thisRefType = "R-407F") Or (_thisRefType = "R-449a") Or (_thisRefType = "R-513a") Or (_thisRefType = "R-600") Or (_thisRefType = "R-600a") Or (_thisRefType = "R-1234yf") Or (_thisRefType = "R-1234ze"))


                thisC3 = TkCondenserCapacities.ChangeRefrgerantTypeAdjustment(_thisRefType)



                If (_thisCondenserDeSuperHeatDegrees <> 25 Or _thisCondenserSubCoolDegrees <> 3) Then

                    _thisCapacity = TkCondenserCapacities.CoilStandardCapacity(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, "R-404A", (_thisAirFlowRate / 60) / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _deltaTemperature, _thisAtmosphericPressure)


                Else

                    _thisCapacity = TkCondenserCapacities.CoilStandardCapacity(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, "R-404A", (_thisAirFlowRate / 60) / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _deltaTemperature, _thisAtmosphericPressure)


                    _thisCapacity = _thisCapacity + TkSecondThermodynamicEngine.CapacityDeSuperheating(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, "R-404A", _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, 5 / 9 * _thisCondenserDeSuperHeatDegrees, _thisAtmosphericPressure)


                    _thisCapacity = _thisCapacity + TkSecondThermodynamicEngine.CapacitySubCooling(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, "R-404A", _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, 5 / 9 * _thisCondenserSubCoolDegrees, _thisAtmosphericPressure)
                End If



                _thisCapacity = thisC3 * _thisCapacity * condensers(_thisIdCondenser - 1).Number_Coils


            Case (_thisRefType = "R717-(NH3)")

                If (condensers(_thisIdCondenser - 1).Series = "MC") Then


                    If (_thisCondenserDeSuperHeatDegrees <> 60 Or _thisCondenserSubCoolDegrees <> 3) Then

                        _thisCapacity = ThkMicro25_NH3.CoilCapacity_NH3_TkMicro25(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _deltaTemperature, _thisAtmosphericPressure)

                    Else

                        _thisCapacity = ThkMicro25_NH3.CoilCapacity_NH3_TkMicro25(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _deltaTemperature, _thisAtmosphericPressure)

                        _thisCapacity = _thisCapacity + TkSecondThermodynamicEngine_NH3.CapacityDeSuperheating_TkMicro25_NH3(condensers(_thisIdCondenser - 1).Coil_Type_NH3, condensers(_thisIdCondenser - 1).Coil_Length, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _thisCondenserDeSuperHeatDegrees, _thisAtmosphericPressure)

                        _thisCapacity = _thisCapacity + TkSecondThermodynamicEngine_NH3.CapacitySubCooling_TkMicro25_NH3(condensers(_thisIdCondenser - 1).Coil_Type_NH3, condensers(_thisIdCondenser - 1).Coil_Length, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _thisCondenserSubCoolDegrees, _thisAtmosphericPressure)
                    End If


                Else




                    If (_thisCondenserDeSuperHeatDegrees <> 60 Or _thisCondenserSubCoolDegrees <> 3) Then

                        _thisCapacity = ThkMicro32_NH3.CoilCapacity_NH3_TkMicro32(condensers(_thisIdCondenser - 1).Coil_Type_NH3, condensers(_thisIdCondenser - 1).Coil_Length, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _deltaTemperature, _thisAtmosphericPressure)

                    Else

                        _thisCapacity = ThkMicro32_NH3.CoilCapacity_NH3_TkMicro32(condensers(_thisIdCondenser - 1).Coil_Type_NH3, condensers(_thisIdCondenser - 1).Coil_Length, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _deltaTemperature, _thisAtmosphericPressure)

                        _thisCapacity = _thisCapacity + TkSecondThermodynamicEngine_NH3.CapacityDeSuperheating_TkMicro25_NH3(condensers(_thisIdCondenser - 1).Coil_Type_NH3, condensers(_thisIdCondenser - 1).Coil_Length, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _thisCondenserDeSuperHeatDegrees, _thisAtmosphericPressure)

                        _thisCapacity = _thisCapacity + TkSecondThermodynamicEngine_NH3.CapacitySubCooling_TkMicro25_NH3(condensers(_thisIdCondenser - 1).Coil_Type_NH3, condensers(_thisIdCondenser - 1).Coil_Length, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _thisCondenserSubCoolDegrees, _thisAtmosphericPressure)
                    End If


                End If


                _thisCapacity = _thisCapacity * condensers(_thisIdCondenser - 1).Number_Coils



            Case Else




                If (_thisCondenserDeSuperHeatDegrees <> 25 Or _thisCondenserSubCoolDegrees <> 3) Then

                    _thisCapacity = TkCondenserCapacities.CoilStandardCapacity(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, _thisRefType, (_thisAirFlowRate / 60) / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _deltaTemperature, _thisAtmosphericPressure)

                    _thisCapacity = _thisCapacity + TkSecondThermodynamicEngine.CapacityDeSuperheating(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, _thisRefType, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, 5 / 9 * _thisCondenserDeSuperHeatDegrees, _thisAtmosphericPressure)

                    _thisCapacity = _thisCapacity + TkSecondThermodynamicEngine.CapacitySubCooling(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, _thisRefType, _thisAirFlowRate / condensers(_thisIdCondenser - 1).Number_Coils, 5 / 9 * _thisCondenserSubCoolDegrees, _thisAtmosphericPressure)
                Else

                    _thisCapacity = TkCondenserCapacities.CoilStandardCapacity(condensers(_thisIdCondenser - 1).Coil_Type, condensers(_thisIdCondenser - 1).Coil_Length, _thisRefType, (_thisAirFlowRate / 60) / condensers(_thisIdCondenser - 1).Number_Coils, (5 / 9) * _deltaTemperature, _thisAtmosphericPressure)



                End If



                _thisCapacity = _thisCapacity * condensers(_thisIdCondenser - 1).Number_Coils

        End Select



        Return _thisCapacity
    End Function

    Private Function TkEC_Fans_AirPressureDropCheck(ByVal found_EC_IdCM As Int16, condenserName As String) As Boolean


        Dim this_TK_EC_Fans_AirPressureDropCheck As Boolean = True

        Dim this_TK_EC_DpAir As Single = 0

        Dim this_TK_Max_EC_DpAir As Double = 150

        Dim this_TK_Min_EC_DpAir As Double = 10


        Dim this_TK_AirPressureDropCheck As Boolean = False

        Dim thisTkCondensatoreScelto = Microsoft.VisualBasic.Right(condenserName, 13)
        'EC Fans - EBM-Papst


        Select Case True

            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "V" & "-B1")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve1_DpAir_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "V" & "-B1")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve2_DpAir_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "V" & "-B1")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve3_DpAir_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "V" & "-B1")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve4_DpAir_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "V" & "-B1")
                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve5_DpAir_EBMPapst(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "V" & "-B1")
                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve6_DpAir_EBMPapst(found_EC_IdCM - 1)



            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "V" & "-B2")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve1_DpAir_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "V" & "-B2")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve2_DpAir_Ziehl(found_EC_IdCM - 1)


            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "V" & "-B2")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve3_DpAir_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "V" & "-B2")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve4_DpAir_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "V" & "-B2")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve5_DpAir_Ziehl(found_EC_IdCM - 1)

            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "V" & "-B2")

                this_TK_EC_DpAir = Me.TkEC_FansFlowRate.EC_Curve6_DpAir_Ziehl(found_EC_IdCM - 1)

            Case Else
        End Select



        'Viene tolta la correzione sperimentale alle perdite di carico lato aria, in modo tale da riportare il confronto alle condizioni decise da Norm Costello

        this_TK_EC_DpAir = this_TK_EC_DpAir / 1.45


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Vengono accettate Perdite di Pressione Lato Aria non superiori a 150 Pa e non inferiori a 10 Pa
        'C. Gnesutta, 17 Dicembre 2020

        If (this_TK_EC_DpAir >= this_TK_Max_EC_DpAir Or this_TK_EC_DpAir <= this_TK_Min_EC_DpAir) Then
            this_TK_EC_Fans_AirPressureDropCheck = False
        Else
            this_TK_EC_Fans_AirPressureDropCheck = True
        End If
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Baco Corretto da C. Gnesutta il 27 Gennaio 2021.
        Return this_TK_EC_Fans_AirPressureDropCheck
    End Function


    Private Function CoefficientForAirFlowRate(ByVal _RatiodeltaTemp As Double, ByVal _refr As String) As Double


        Dim AlphaAir As Double = 1

        Dim x As Double = _RatiodeltaTemp

        Select Case True

            Case _refr = "407A"
                AlphaAir = +-142.615561412993 * 1 + 666.546419357682 * Sqrt(x) + -1169.22293368639 * x + 949.45867786961 * x ^ 1.5 + -319.695686541857 * x * x + 16.5232874651517 * x ^ 3

            Case _refr = "407C"
                AlphaAir = +39.3587766534602 * 1 + -121.009006252359 * Sqrt(x) + 145.740548994363 * x + -79.5063739883611 * x ^ 1.5 + 16.4019837345159 * x * x

            Case _refr = "417A"

                AlphaAir = +39.3587766534602 * 1 + -121.009006252359 * Sqrt(x) + 145.740548994363 * x + -79.5063739883611 * x ^ 1.5 + 16.4019837345159 * x * x

            Case _refr = "422A"

                AlphaAir = 1378.11007996592 * 1 + -7372.78089412237 * Sqrt(x) + 15615.7018886801 * x + -15977.1996491215 * x ^ 1.5 + 7111.77462103134 * x * x + -829.317903281545 * x ^ 3 + 74.7158188200835 * x ^ 4

            Case _refr = "422D"

                AlphaAir = +5315.79782625918 * 1 + -33881.6424235814 * Sqrt(x) + 87555.1164283619 * x + -112621.793500282 * x ^ 1.5 + 65425.3477533468 * x * x + -15276.8416240691 * x ^ 3 + 4195.09086818093 * x ^ 4 + -777.191643583487 * x ^ 5 + 67.1068570043288 * x ^ 6

            Case _refr = "427A"

                AlphaAir = +-262.08658201086 * 1 + 1371.01117418658 * Sqrt(x) + -2780.32983299658 * x + 2702.52383607134 * x ^ 1.5 + -1139.82761478123 * x * x + 119.448591346983 * x ^ 3 + -9.74324799258113 * x ^ 4

            Case _refr = "502"

                AlphaAir = +447.627991035725 * 1 + -2890.22480784006 * Sqrt(_RatiodeltaTemp) + 7718.81180755342 * _RatiodeltaTemp + -10341.1812916353 * _RatiodeltaTemp ^ 1.5 + 6268.85321424461 * _RatiodeltaTemp * _RatiodeltaTemp + -1584.16298215804 * _RatiodeltaTemp ^ 3 + 462.529238338659 * _RatiodeltaTemp ^ 4 + -89.0374573138122 * _RatiodeltaTemp ^ 5 + 7.78839550979791 * _RatiodeltaTemp ^ 6


            Case Else

                AlphaAir = +447.627991035725 * 1 + -2890.22480784006 * Sqrt(_RatiodeltaTemp) + 7718.81180755342 * _RatiodeltaTemp + -10341.1812916353 * _RatiodeltaTemp ^ 1.5 + 6268.85321424461 * _RatiodeltaTemp * _RatiodeltaTemp + -1584.16298215804 * _RatiodeltaTemp ^ 3 + 462.529238338659 * _RatiodeltaTemp ^ 4 + -89.0374573138122 * _RatiodeltaTemp ^ 5 + 7.78839550979791 * _RatiodeltaTemp ^ 6


        End Select




        Return AlphaAir
    End Function


    Public Function TkFanNoise(ByVal _thisIdCondenser As Int16, condenserModel As String, ByVal _AirDirection As String, ByVal _distance As Int32) As Double

        Dim _thisTkFanNoise As Double = 0
        Dim thisTkCondensatoreScelto = Microsoft.VisualBasic.Right(condenserModel, 13)


        Select Case _AirDirection

            Case "Vertical"


                TkFanNoiseMachine.MachineHeight = condensers(_thisIdCondenser - 1).Vertical_Machine_Height / 1000
                TkFanNoiseMachine.DistanceFromMachine = _distance
                TkFanNoiseMachine.MachineLength = condensers(_thisIdCondenser - 1).Vertical_Machine_Length / 1000
                TkFanNoiseMachine.MachineWidth = condensers(_thisIdCondenser - 1).Vertical_Machine_Width / 1000

            Case "Horizontal"

                TkFanNoiseMachine.MachineHeight = condensers(_thisIdCondenser - 1).Horizontal_Machine_Height / 1000
                TkFanNoiseMachine.DistanceFromMachine = _distance
                TkFanNoiseMachine.MachineLength = condensers(_thisIdCondenser - 1).Horizontal_Machine_Length / 1000
                TkFanNoiseMachine.MachineWidth = condensers(_thisIdCondenser - 1).Horizontal_Machine_Width / 1000
            Case Else
        End Select


        Select Case True

            Case Else

        End Select



        Select Case True

            '�����������������������������������������������������������������������
            'EBM - PAPST - 3 Phases
            '��������������������������������������������������������������������

            'EBM-Papst - Curve 1 - C. Gnesutta, November 18th, 2020 - OK
            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "V" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve1_DpAir_EBMPapst(_thisIdCondenser - 1))


                'EBM-Papst - Curve 2 - C. Gnesutta, November 18th, 2020 - OK
            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "V" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve2_DpAir_EBMPapst(_thisIdCondenser - 1))


                'EBM-Papst - Curve 3 - C. Gnesutta, November 18th, 2020 - OK
            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "V" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve3_DpAir_EBMPapst(_thisIdCondenser - 1))


                'EBM-Papst - Curve 4 - C. Gnesutta, November 18th, 2020 - OK
            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "V" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve4_DpAir_EBMPapst(_thisIdCondenser - 1))

                'EBM-Papst - Curve 5 - C. Gnesutta, November 18th, 2020 - OK
            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "V" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve5_DpAir_EBMPapst(_thisIdCondenser - 1))

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020 - OK
            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "V" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve6_DpAir_EBMPapst(_thisIdCondenser - 1))




                'EBM-Papst - Curve 1 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "H" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve1_DpAir_EBMPapst(_thisIdCondenser - 1))


                'EBM-Papst - Curve 2 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "H" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve2_DpAir_EBMPapst(_thisIdCondenser - 1))



                'EBM-Papst - Curve 3 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "H" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve3_DpAir_EBMPapst(_thisIdCondenser - 1))


                'EBM-Papst - Curve 4 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "H" & "-B1")
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve4_DpAir_EBMPapst(_thisIdCondenser - 1))

                'EBM-Papst - Curve 5 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "H" & "-B1")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve5_DpAir_EBMPapst(_thisIdCondenser - 1))

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "H" & "-B1")
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve6_DpAir_EBMPapst(_thisIdCondenser - 1))


                '�����������������������������������������������������������������������
                'EBM - PAPST - MonoFase
                '��������������������������������������������������������������������



            Case thisTkCondensatoreScelto = "(EC-1Ph)-[1]-" & "V" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve1_DpAir_EBMPapst(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[2]-" & "V" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve2_DpAir_EBMPapst(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[3]-" & "V" & "-B1"


                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve3_DpAir_EBMPapst(_thisIdCondenser - 1))



            Case thisTkCondensatoreScelto = "(EC-1Ph)-[4]-" & "V" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve4_DpAir_EBMPapst(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[5]-" & "V" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve5_DpAir_EBMPapst(_thisIdCondenser - 1))



            Case thisTkCondensatoreScelto = "(EC-1Ph)-[6]-" & "V" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve6_DpAir_EBMPapst(_thisIdCondenser - 1))





            Case thisTkCondensatoreScelto = "(EC-1Ph)-[1]-" & "H" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve1_DpAir_EBMPapst(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[2]-" & "H" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve2_DpAir_EBMPapst(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[3]-" & "H" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve3_DpAir_EBMPapst(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[4]-" & "H" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve4_DpAir_EBMPapst(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[5]-" & "H" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve5_DpAir_EBMPapst(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[6]-" & "H" & "-B1"

                'EBM-Papst - Curve 6 - C. Gnesutta, November 18th, 2020 - OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesEbmPapst(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve6_DpAir_EBMPapst(_thisIdCondenser - 1))


                '����������������������������������������������������������������������
                'ZIEHL - ABEGG - 3 Phases
                '����������������������������������������������������������������������

                'Ziehl Abegg - Curve 1 - C. Gnesutta, November 18th, 2020 - OK
            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "V" & "-B2")



                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve1_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 2 - C. Gnesutta, November 18th, 2020 - OK
            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "V" & "-B2")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve2_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 3 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "V" & "-B2")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve3_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 4 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "V" & "-B2")
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve4_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 5 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "V" & "-B2")
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve5_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "V" & "-B2")
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve6_DpAir_Ziehl(_thisIdCondenser - 1))




                'Ziehl Abegg - Curve 1 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[1]-" & "H" & "-B2")
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve1_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 2 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[2]-" & "H" & "-B2")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve2_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 3 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[3]-" & "H" & "-B2")

                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve3_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 4 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[4]-" & "H" & "-B2")
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve4_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 5 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[5]-" & "H" & "-B2")
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve5_DpAir_Ziehl(_thisIdCondenser - 1))

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
            Case (thisTkCondensatoreScelto = "(EC)-[6]-" & "H" & "-B2")
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve6_DpAir_Ziehl(_thisIdCondenser - 1))




                '����������������������������������������������������������������������
                'ZIEHL - ABEGG - MonoFase
                '����������������������������������������������������������������������



            Case thisTkCondensatoreScelto = "(EC-1Ph)-[1]-" & "V" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve1_DpAir_Ziehl(_thisIdCondenser - 1))

            Case thisTkCondensatoreScelto = "(EC-1Ph)-[2]-" & "V" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve2_DpAir_Ziehl(_thisIdCondenser - 1))



            Case thisTkCondensatoreScelto = "(EC-1Ph)-[3]-" & "V" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve3_DpAir_Ziehl(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[4]-" & "V" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve4_DpAir_Ziehl(_thisIdCondenser - 1))

            Case thisTkCondensatoreScelto = "(EC-1Ph)-[5]-" & "V" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve5_DpAir_Ziehl(_thisIdCondenser - 1))

            Case thisTkCondensatoreScelto = "(EC-1Ph)-[6]-" & "V" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve6_DpAir_Ziehl(_thisIdCondenser - 1))




            Case thisTkCondensatoreScelto = "(EC-1Ph)-[1]-" & "H" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve1_DpAir_Ziehl(_thisIdCondenser - 1))

            Case thisTkCondensatoreScelto = "(EC-1Ph)-[2]-" & "H" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve2_DpAir_Ziehl(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[3]-" & "H" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve3_DpAir_Ziehl(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[4]-" & "H" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve4_DpAir_Ziehl(_thisIdCondenser - 1))

            Case thisTkCondensatoreScelto = "(EC-1Ph)-[5]-" & "H" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve5_DpAir_Ziehl(_thisIdCondenser - 1))


            Case thisTkCondensatoreScelto = "(EC-1Ph)-[6]-" & "H" & "-B2"

                'Ziehl Abegg  - Curve 6 - C. Gnesutta, November 18th, 2020- OK
                TkFanNoiseMachine.TotalLWA = Me.thisTkFansEcDataAtWP.RadiatedNoise(Me.TkEC_FansFlowRate.EC_New_FanSeriesZiehl(_thisIdCondenser - 1), Me.TkEC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(_thisIdCondenser - 1) / (condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row * condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row), Me.TkEC_FansFlowRate.EC_Curve6_DpAir_Ziehl(_thisIdCondenser - 1))


            Case Else

        End Select


        TkFanNoiseMachine.FanRowsNumber = condensers(_thisIdCondenser - 1).Num_Of_Fan_Rows
        TkFanNoiseMachine.FanNumberPerEachRow = condensers(_thisIdCondenser - 1).Num_Of_Fan_Per_Row

        _thisTkFanNoise = TkFanNoiseMachine.MachineFanNoise


        Return _thisTkFanNoise

    End Function

    'Query As EAnalysisQuery
    Public Function GetCalculateEnergyAnalysis(newCondeser As List(Of Condenser), Query As EAQuery) As List(Of EAResult)

        Try


            Dim CondenserId = Query.CondenserId
            Dim CondenserModel = Query.CondenserModel
            Dim IsCalculateCapacity = Query.IsCalculateCapacity
            Dim IsCalculateAirFlow = Query.IsCalculateAirFlow
            Dim IsSingleCaculation = Query.IsSingleCaculation
            Dim IntEACurrentFixCapacity = Query.IntEACurrentFixCapacity
            Dim IntEANewFixCapacity = Query.IntEANewFixCapacity
            Dim IntEAStartingAir = Query.IntEAStartingAir
            Dim IntEAInletAirTemp = Query.IntEAInletAirTemp
            Dim IntEAFinalAir = Query.IntEAFinalAir
            Dim IntEAStep = Query.IntEAStep
            Dim IntEADistance = Query.IntEADistance
            Dim IntEACondensingTemp = Query.IntEACondensingTemp
            Dim Distance = Query.Distance
            Dim FlowDirection = Query.FlowDirection
            Dim RefRigerantType = Query.refRigerantType
            Dim AirflowRate = Query.AirflowRate
            Dim Rpm = Query.Rpm
            Dim NoOfFans = Query.NoOfFans
            Dim Power = Query.Power
            Dim CurrentFan = Query.CurrentFan
            Dim TubeVolume = Query.TubeVolume
            Dim Weight = Query.Weight
            Dim DiameterInlet = Query.DiameterInlet
            Dim DiameterOutlet = Query.DiameterOutlet
            Dim Price = Query.Price
            Dim SubCooling = Query.SubCooling
            Dim Compressor = Query.Compressor
            Dim AtmPressureInMetric = Query.AtmPressureInMetric
            Dim Condensing = Query.Condensing
            Dim DryBulb = Query.DryBulb
            Dim DeltaTemperature = Condensing - DryBulb


            Dim resullt = CalculateEnergyAnalysis(newCondeser, CondenserId, CondenserModel, IsCalculateCapacity, IsCalculateAirFlow, IsSingleCaculation, IntEACurrentFixCapacity, IntEANewFixCapacity,
             IntEAStartingAir, IntEAInletAirTemp, IntEAFinalAir, IntEAStep, IntEADistance, IntEACondensingTemp, Distance, FlowDirection, RefRigerantType, AirflowRate,
             Rpm, NoOfFans, Power, CurrentFan, TubeVolume, Weight, DiameterInlet, DiameterOutlet, Price, SubCooling, Compressor, AtmPressureInMetric, DeltaTemperature, Condensing)

            Return resullt

        Catch ex As Exception

            Return New List(Of EAResult)()

        End Try

    End Function

End Class
