Imports Cardano.Domain.Entities
Imports Cardano.Domain.Interfaces
Imports Cardano.Domain.Models
Imports Cardano.Domain.ValueObjects
Imports InstinctCodeII.Units

Public Class AdjustmentFan

    Private ReadOnly _unitConverter As IUnitTypeConverterRepository

    Public Sub New(unitConverter As IUnitTypeConverterRepository)
        _unitConverter = unitConverter
    End Sub

    Dim convertValue As New ConvertValue
    Dim EC_FansFlowRate As New NEW_EcFansData
    Dim CardanoSecondThermodynamicEngine As New CardanoAdditionalCalculationEngine
    Dim SecondThermodynamicEngine_NH3 As New CardanoAdditionalCalculationEngine_NH3
    Dim TkMicro32_NH3 As New CalculationEngineNH3_TkMicro32
    Dim TkMicro25_NH3 As New CalculationEngineNH3_TkMicro25

    Dim condensers As New List(Of Condenser)()

    Private Function ComputeFanFlowAdjustment(newCondeser As List(Of Condenser), conderserId As Int32, condenserModel As String, refRigerantType As String, unitsType As String, condensing As Double, fansAdjustment As Int32, compressor As Double, subCooling As Double, dryBulb As Double, atmPressureInMetric As Double) As List(Of AdjustFanResult)

        condensers = newCondeser

        Dim DefaultSubcooling As Double = CondenserDefaultTempCalc.DefaultSubcooling
        Dim DefaultDesuperheat As Double = CondenserDefaultTempCalc.DefaultDesuperheat
        Dim DefaultSubcooling_NH3 As Double = CondenserDefaultTempCalc.DefaultSubcooling_NH3
        Dim DefaultDesuperheat_NH3 As Double = CondenserDefaultTempCalc.DefaultDesuperheat_NH3

        Dim detailsList As New List(Of AdjustFanResult)
        Dim detail As New AdjustFanResult()

        Dim sigma As String = refRigerantType
        Dim CorrectedCapacities As Double = 0
        Dim ThermokeyCondenserCapacities As New ThermokeyCondenserCapacities

        Dim _metricCondTemper As Double = Me.convertValue.DegCfromDegF(_unitConverter.CondensingTemperature(unitsType, condensing))

        ' Modified again by C. Gnesutta on March 4th, 2021.
        Dim Id As Int16 = conderserId

        Dim ThermalCapacityExperimentalCorrection As Int16 = 0
        Dim CondenserNameForFanFlowAdjustment As String = ""

        Dim thisC3 As Double = 0

        CondenserNameForFanFlowAdjustment = condenserModel

        Dim theseFans As Int16 = condensers(Id).Num_Of_Fan_Rows * condensers(Id).Num_Of_Fan_Per_Row

        Dim metricDefaultCalcFansFlow = 0

        Try

            If (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 3) = "-B1" Or Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 3) = "-B2") Then

                Select Case True

                        ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[1]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                        Else
                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[2]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[3]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[4]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[5]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[6]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[1]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[2]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                            'Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[3]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[4]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[5]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                            'Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[6]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[1]-V-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                        Else
                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[2]-V-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)
                        Else
                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[3]-V-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)
                        Else
                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[4]-V-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)
                        Else
                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[5]-V-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[6]-V-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[1]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[2]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[3]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[4]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[5]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[6]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[1]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[2]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                            'Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[3]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[4]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[5]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)
                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[6]-V-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[1]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[2]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[3]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)
                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[4]-H-B1")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[5]-H-B1")

                        If (unitsType = "imp") Then
                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[6]-H-B1")

                        If (unitsType = "imp") Then
                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[1]-V-B2")

                        If (unitsType = "imp") Then
                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[2]-V-B2")

                        If (unitsType = "imp") Then
                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[3]-V-B2")

                        If (unitsType = "imp") Then
                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[4]-V-B2")

                        If (unitsType = "imp") Then
                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[5]-V-B2")

                        If (unitsType = "imp") Then
                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[6]-V-B2")

                        If (unitsType = "imp") Then
                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[1]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[2]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[3]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[4]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[5]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[6]-H-B2")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                        Else

                            detail.MaxFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                            detail.MinFansFlow = theseFans * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                            detail.CalculFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                        End If

                        metricDefaultCalcFansFlow = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                    Case Else
                End Select
            Else

                Select Case True'

                        ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "DV")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Delta_Fans_Flow
                        Else
                            detail.MaxFansFlow = theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = condensers(Id).Delta_Fans_Flow

                        End If

                        metricDefaultCalcFansFlow = condensers(Id).Delta_Fans_Flow

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "DH")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Delta_Fans_Flow
                        Else
                            detail.MaxFansFlow = theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = condensers(Id).Delta_Fans_Flow

                        End If

                        metricDefaultCalcFansFlow = condensers(Id).Delta_Fans_Flow

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "YV")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Max_Star
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Min_Star
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Star_Fans_Flow
                        Else
                            detail.MaxFansFlow = theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = condensers(Id).Star_Fans_Flow

                        End If

                        metricDefaultCalcFansFlow = condensers(Id).Star_Fans_Flow

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "YH")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Max_Star
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Min_Star
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Star_Fans_Flow
                        Else

                            detail.MaxFansFlow = theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = condensers(Id).Star_Fans_Flow

                        End If

                        metricDefaultCalcFansFlow = condensers(Id).Star_Fans_Flow

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "MV")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Delta_Fans_Flow
                        Else

                            detail.MaxFansFlow = theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = condensers(Id).Delta_Fans_Flow

                        End If

                        metricDefaultCalcFansFlow = condensers(Id).Delta_Fans_Flow

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "MH")

                        If (unitsType = "imp") Then

                            detail.MaxFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Delta_Fans_Flow
                        Else

                            detail.MaxFansFlow = theseFans * condensers(Id).Fan_Flow_Max_Delta
                            detail.MinFansFlow = theseFans * condensers(Id).Fan_Flow_Min_Delta
                            detail.CalculFansFlow = condensers(Id).Delta_Fans_Flow

                        End If

                        metricDefaultCalcFansFlow = condensers(Id).Delta_Fans_Flow

                    Case Else

                End Select

            End If

            'Round off after computation
            detail.MaxFansFlow = Math.Round(detail.MaxFansFlow)
            detail.MinFansFlow = Math.Round(detail.MinFansFlow)
            detail.CalculFansFlow = Math.Round(detail.CalculFansFlow)

            detail.Fans = theseFans
            detail.FanModel = condensers(Id).Fan_Model

            'Computation
            Dim thisMultiplyer As Double = (100 + fansAdjustment) / 100
            detail.AdjustedFansFlow = Math.Round(detail.CalculFansFlow * thisMultiplyer, 0)
            detail.AdjustedMinFansFlow = Math.Round(detail.MinFansFlow * thisMultiplyer, 0)
            detail.AdjustedMaxFansFlow = Math.Round(detail.MaxFansFlow * thisMultiplyer, 0)

            'Metric Units - C. Gnesutta, March 8th, 2021.
            Dim ReducedAirFlowMetric As Double = detail.CalculFansFlow * thisMultiplyer

            'English Imperial Units - C. Gnesutta, March 8th, 2021.
            Dim ReducedAirFlowEnglish As Double = detail.CalculFansFlow * (1 + fansAdjustment / 100) * ConvertValue.CubicFeetFromCubicMeter

            'Si è volutamente imposto che le correzioni sulla poetenza termica scambiata siano uguali nei casi STAR e DELTA
            Dim ThermalCapacityCorrections As Single = condensers(Id).Correction_Delta

            Select Case True

                    'Ramo che riguarada i nuovi refrigeranti - C. Gnesutta, 19 luglio 2019.
                    'OK - C. Gnesutta, March 8th, 2021.
                Case ((sigma = "R-32") Or (sigma = "R-245fa") Or (sigma = "R-407F") Or (sigma = "R-449a") Or (sigma = "R-513a") Or (sigma = "R-600") Or
                          (sigma = "R-600a") Or (sigma = "R-1234yf") Or (sigma = "R-1234ze"))

                    'Me.TubeWidthCalculation(psi_0 + 1)

                    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                    'Refrigerant  correction factors (C3) according to RS 7/C/008 - 2018, Published on June 2018
                    ' C. Gnesutta, July 19th, 2018 - NEW REFRIGERANTS
                    'OK - CHECKED by C. Gnesutta on July 20th 2018.
                    thisC3 = ThermokeyCondenserCapacities.ChangeRefrgerantTypeAdjustment(sigma)
                    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                    'OK - Controllato da C. Gnesutta il 30 Marzo 2021.
                    If (_unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor) <> DefaultDesuperheat Or _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling) <> DefaultSubcooling) Then

                        CorrectedCapacities = ThermokeyCondenserCapacities.CoilStandardCapacity(condensers(Id).Coil_Type, condensers(Id).Coil_Length, "R-404A", (ReducedAirFlowMetric / 60) / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        CorrectedCapacities = CorrectedCapacities + CardanoSecondThermodynamicEngine.CapacityDeSuperheating(condensers(Id).Coil_Type, condensers(Id).Coil_Length, "R-404A", ReducedAirFlowMetric / condensers(Id).Number_Coils, 5 / 9 * _unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor), atmPressureInMetric)

                        CorrectedCapacities = CorrectedCapacities + CardanoSecondThermodynamicEngine.CapacitySubCooling(condensers(Id).Coil_Type, condensers(Id).Coil_Length, "R-404A", ReducedAirFlowMetric / condensers(Id).Number_Coils, 5 / 9 * _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling), atmPressureInMetric)

                        CorrectedCapacities = ThermalCapacityCorrections * CorrectedCapacities * thisC3 * condensers(Id).Number_Coils

                        'Added by C. Gnesutta on July 19th 2018
                    Else

                        CorrectedCapacities = ThermokeyCondenserCapacities.CoilStandardCapacity(condensers(Id).Coil_Type, condensers(Id).Coil_Length, "R-404A", (ReducedAirFlowMetric / 60) / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        'OK - Checked by C. Gnesutta on July 31st, 2019. - NH3
                        CorrectedCapacities = ThermalCapacityCorrections * CorrectedCapacities * condensers(Id).Number_Coils

                    End If

                    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                    'Funzione per calcolare le rese termiche per nuovi refrigeranti -   'Added by C. Gnesutta, July 19th, 2018
                    'NEW REFRIGERANTS - C. Gnesutta, July 19th 2018.

                    'OK - CHECKED by C. Gnesutta on July 20th 2018.
                    CorrectedCapacities = (thisC3 * CorrectedCapacities)
                        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                        'Ramo che riguarda l'ammoniaca (NH3) - C. Gnesutta, July 23rd. 2019.
                        'Ok - ricontrollato da C. Gnesutta il 28 Agosto 2019.
                Case (sigma = "R717-(NH3)")

                    'NH3/TkMicro25  - C. Gnesutta, July 23rd. 2019. - TkMicro25/NH3
                    If (condensers(Id).Series = "MC") Then

                        'OK -  Checked  by C. Gnesutta on July 31st 2019. - TkMicro25/NH3
                        'OK -  Controllo finale 07 Agosto 2019. C. Gnesutta
                        CorrectedCapacities = TkMicro25_NH3.CoilCapacity_NH3_TkMicro25(condensers(Id).Coil_Type_NH3,
                     condensers(Id).Coil_Length, ReducedAirFlowMetric / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        'DeSuperheating e SubCooling NON standard - 19 Luglio 2019.- TkMicro25/NH3
                        'OK -  Controllo finale 07 Agosto 2019. C. Gnesutta
                        If (_unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor) <> DefaultDesuperheat_NH3 Or _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling) <> DefaultSubcooling_NH3) Then

                            'DesuperHeating added - C. Gnesutta, July 23rd, 2019.
                            'OK -  Checked  by C. Gnesutta on July 31st 2019.- TkMicro25/NH3
                            'OK -  Controllo finale 07 Agosto 2019. C. Gnesutta
                            CorrectedCapacities = CorrectedCapacities + SecondThermodynamicEngine_NH3.CapacityDeSuperheating_TkMicro25_NH3(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, ReducedAirFlowMetric / condensers(Id).Number_Coils, (5 / 9) * _unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor), atmPressureInMetric)

                            'Subcooling added - C. Gnesutta, July 23rd, 2019.
                            'OK -  Checked  by C. Gnesutta on July 31st 2019.- TkMicro25/NH3
                            'OK -  Controllo finale 06 Agosto 2019. C. Gnesutta
                            CorrectedCapacities = CorrectedCapacities + SecondThermodynamicEngine_NH3.CapacitySubCooling_TkMicro25_NH3(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, ReducedAirFlowMetric / condensers(Id).Number_Coils, (5 / 9) * _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling), atmPressureInMetric)
                        Else

                        End If

                        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                        'OK -  Checked  by C. Gnesutta on July 31st 2019.- TkMicro25/NH3
                        CorrectedCapacities = ThermalCapacityCorrections * CorrectedCapacities * condensers(Id).Number_Coils
                        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                        ' HN3 - MC GEOMETRY 32mm

                        'NH3/TkMicro32  - C. Gnesutta, July 23rd. 2019.
                        'OK -  Checked  by C. Gnesutta on July 31st 2019.
                    Else

                        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                        CorrectedCapacities = TkMicro32_NH3.CoilCapacity_NH3_TkMicro32(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, ReducedAirFlowMetric / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        'DeSuperheating e SubCooling NON standard -24 Luglio 2019.- TkMicro32/NH3
                        If (_unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor) <> DefaultDesuperheat_NH3 Or _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling) <> DefaultSubcooling_NH3) Then

                            CorrectedCapacities = CorrectedCapacities + SecondThermodynamicEngine_NH3.CapacityDeSuperheating_TkMicro32_NH3(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, ReducedAirFlowMetric / condensers(Id).Number_Coils, (5 / 9) * _unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor), atmPressureInMetric)

                            CorrectedCapacities = CorrectedCapacities + SecondThermodynamicEngine_NH3.CapacitySubCooling_TkMicro32_NH3(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, ReducedAirFlowMetric / condensers(Id).Number_Coils, (5 / 9) * _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling), atmPressureInMetric)

                        End If

                    End If

                    CorrectedCapacities = ThermalCapacityCorrections * CorrectedCapacities * condensers(Id).Number_Coils

                    ' Ramo che riguarda i vecchi tradizionali refrigeranti
                Case Else

                    'OK - Controllato da C. Gnesutta il 30 Marzo 2021.
                    If (_unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor) <> DefaultDesuperheat Or _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling) <> DefaultSubcooling) Then

                        CorrectedCapacities = ThermokeyCondenserCapacities.CoilStandardCapacity(condensers(Id).Coil_Type, condensers(Id).Coil_Length, refRigerantType, (ReducedAirFlowMetric / 60) / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric) * condensers(Id).Number_Coils

                        CorrectedCapacities = CorrectedCapacities + CardanoSecondThermodynamicEngine.CapacityDeSuperheating(condensers(Id).Coil_Type, condensers(Id).Coil_Length, refRigerantType, ReducedAirFlowMetric / condensers(Id).Number_Coils, 5 / 9 * _unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor), atmPressureInMetric)

                        CorrectedCapacities = CorrectedCapacities + CardanoSecondThermodynamicEngine.CapacitySubCooling(condensers(Id).Coil_Type, condensers(Id).Coil_Length, refRigerantType, ReducedAirFlowMetric / condensers(Id).Number_Coils, 5 / 9 * _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling), atmPressureInMetric)

                        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                        CorrectedCapacities = ThermalCapacityCorrections * CorrectedCapacities * condensers(Id).Number_Coils
                        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                    Else

                        CorrectedCapacities = ThermokeyCondenserCapacities.CoilStandardCapacity(condensers(Id).Coil_Type, condensers(Id).Coil_Length, refRigerantType, (ReducedAirFlowMetric / 60) / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                        CorrectedCapacities = ThermalCapacityCorrections * CorrectedCapacities * condensers(Id).Number_Coils
                        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                    End If

            End Select

            If unitsType = "imp" Then

                detail.NewCapacity = Math.Round(CorrectedCapacities * ConvertValue.BtuPerHrFromKW, 1)
                detail.NewAirFlow = Math.Round(metricDefaultCalcFansFlow * (1 + fansAdjustment / 6000) * ConvertValue.CubicFeetFromCubicMeter, 0)
            Else

                detail.NewCapacity = Math.Round(CorrectedCapacities, 1)
                detail.NewAirFlow = Math.Round(detail.CalculFansFlow * (1 + fansAdjustment / 100))
            End If

            detailsList.Add(detail)
        Catch ex As Exception
        End Try

        Return detailsList

    End Function

    Public Function GetFanFlowAdjustment(newCondeser As List(Of Condenser), Query As AdjustQuery) As List(Of AdjustFanResult)

        Try

            Dim conderserId = Query.ModelId
            Dim condenserModel = Query.RemoteModel
            Dim unitsType = Query.UnitsType
            Dim condensing = Me.convertValue.DegFfromDegC(Query.Condensing)
            Dim refRigerantType = Query.RefrigerantType
            Dim atmPressureInMetric = Query.AtmosphericPress
            Dim subCooling = Query.SubCooling
            Dim compressor = Query.Compressor
            Dim dryBulb = convertValue.DegFfromDegC(Query.DryBulb)
            Dim PercentAdjustment = Query.PercentAdjustment

            Dim resullt = ComputeFanFlowAdjustment(newCondeser, conderserId, condenserModel, refRigerantType, unitsType, condensing, PercentAdjustment, compressor, subCooling, dryBulb, atmPressureInMetric)

            Return resullt
        Catch ex As Exception

            Return New List(Of AdjustFanResult)()

        End Try

    End Function

End Class