Imports Cardano.Domain.Entities
Imports Cardano.Domain.Interfaces
Imports Cardano.Domain.Models

Imports InstinctCodeII.Units

Public Class AdjustmentCapacity

    Private ReadOnly _unitConverter As IUnitTypeConverterRepository

    Public Sub New(unitConverter As IUnitTypeConverterRepository)
        _unitConverter = unitConverter
    End Sub

    Dim thisC3 As Double = 0

    Dim EC_FansFlowRate As New NEW_EcFansData
    Dim convertValue As New ConvertValue
    'Dim CondenserHelper As New CtlThermokeyCondensersWorkbookIICustomer

    Dim DefaultSubcooling As Double = CondenserDefaultTempCalc.DefaultSubcooling
    Dim DefaultDesuperheat As Double = CondenserDefaultTempCalc.DefaultDesuperheat
    Dim DefaultSubcooling_NH3 As Double = CondenserDefaultTempCalc.DefaultSubcooling_NH3
    Dim DefaultDesuperheat_NH3 As Double = CondenserDefaultTempCalc.DefaultDesuperheat_NH3
    Dim CardanoSecondThermodynamicEngine As New CardanoAdditionalCalculationEngine
    Dim TkMicro32_NH3 As New CalculationEngineNH3_TkMicro32
    Dim TkMicro25_NH3 As New CalculationEngineNH3_TkMicro25
    Dim SecondThermodynamicEngine_NH3 As New CardanoAdditionalCalculationEngine_NH3

    Dim condensers As New List(Of Condenser)()

    Private Function ComputeCapacityAdjustment(newCondeser As List(Of Condenser), conderserId As Int32, condenserModel As String, refRigerantType As String, unitsType As String, condensing As Double, PercentAdjustment As Int32, compressor As Double, subCooling As Double, dryBulb As Double, atmPressureInMetric As Double) As List(Of AdjustCapacityResult)

        condensers = newCondeser

        Dim detailsList As New List(Of AdjustCapacityResult)
        Dim detail As New AdjustCapacityResult()

        Try

            Dim Id As Int16 = conderserId
            Dim sigma As String = refRigerantType
            Dim thisCorrectedCapacities As Double = 0
            Dim _metricCondTemper As Double = Me.convertValue.DegCfromDegF(condensing)

            Dim ThermokeyCondenserCapacities As New ThermokeyCondenserCapacities
            Dim CondenserNameForFanFlowAdjustment As String = condenserModel

            Dim airFlowEnglish As Double = 0
            Dim airFlowMetric As Double = 0

            If (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 3) = "-B1" Or Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 3) = "-B2") Then

                Select Case True

                        'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[1]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[2]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[3]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[4]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[5]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[6]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[1]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[2]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[3]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[4]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[5]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[6]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[1]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[2]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021..
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[3]-V-B2")

                        'C. Gnesutta on March 10th, 2021.1.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[4]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                            ' Modified again by C. Gnesutta on March 4th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[5]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[6]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[1]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[2]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[3]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021..
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[4]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[5]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 13) = "(EC)-[6]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[1]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[2]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[3]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[4]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[5]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[6]-V-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[1]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve1_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[2]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve2_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[3]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve3_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[4]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve4_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[5]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve5_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[6]-H-B1")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve6_FlowRate_EBMPapst(Id)

                            'C. Gnesutta on March 10th, 2021..
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[1]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[2]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[3]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[4]-V-B2")

                        'C. Gnesutta on March 10th, 2021..
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[5]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021..
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[6]-V-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[1]-H-B2")

                        'C. Gnesutta on March 10th, 2021..
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve1_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[2]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve2_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[3]-H-B2")

                        'C. Gnesutta on March 10th, 2021..
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve3_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[4]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve4_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[5]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve5_FlowRate_Ziehl(Id)

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 17) = "(EC-1Ph)-[6]-H-B2")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)
                        airFlowMetric = Me.EC_FansFlowRate.EC_Curve6_FlowRate_Ziehl(Id)

                    Case Else
                End Select
            Else

                Select Case True

                        'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "DV")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Delta_Fans_Flow
                        airFlowMetric = condensers(Id).Delta_Fans_Flow

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "DH")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Delta_Fans_Flow
                        airFlowMetric = condensers(Id).Delta_Fans_Flow

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "YV")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Star_Fans_Flow
                        airFlowMetric = condensers(Id).Star_Fans_Flow

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "YH")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Star_Fans_Flow
                        airFlowMetric = condensers(Id).Star_Fans_Flow

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "MV")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Delta_Fans_Flow
                        airFlowMetric = condensers(Id).Delta_Fans_Flow

                            'C. Gnesutta on March 10th, 2021.
                    Case (Microsoft.VisualBasic.Right(CondenserNameForFanFlowAdjustment, 2) = "MH")

                        'C. Gnesutta on March 10th, 2021.
                        airFlowEnglish = (ConvertValue.CubicFeetFromCubicMeter / 60) * condensers(Id).Delta_Fans_Flow
                        airFlowMetric = condensers(Id).Delta_Fans_Flow

                    Case Else
                End Select

            End If

            'If(unitsType = "imp", Math.Round(airFlowEnglish, 0), Math.Round(airFlowMetric, 0))
            Dim NewAirFlow = airFlowMetric
            detail.FanModel = condensers(Id).Fan_Model

            Dim ThermalCapacityCorrections As Single = condensers(Id).Correction_Delta

            Select Case True

                    'Caso nuovi refrigeranti -  C. Gnesutta on March 10th, 2021.
                Case ((sigma = "R-32") Or (sigma = "R-245fa") Or (sigma = "R-407F") Or (sigma = "R-449a") Or (sigma = "R-513a") Or (sigma = "R-600") Or
                      (sigma = "R-600a") Or (sigma = "R-1234yf") Or (sigma = "R-1234ze"))

                    'Me.TubeWidthCalculation(Id + 1)

                    '��������������������������������������������������������������������������������������������
                    'Refrigerant  correction factors (C3) according to RS 7/C/008 - 2018, Published on June 2018
                    'C. Gnesutta, 10 Marzo 2021.

                    thisC3 = ThermokeyCondenserCapacities.ChangeRefrgerantTypeAdjustment(sigma)
                    '��������������������������������������������������������������������������������������������

                    '���������������������������������������������������������������������������������������������������������������������������������
                    '���������������������������������������������������������������������������������������������������������������������������������
                    '���������������������������������������������������������������������������������������������������������������������������������

                    'OK - Controllato da C. Gnesutta il 30 Marzo 2021.
                    If (_unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor) <> DefaultDesuperheat Or _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling) <> DefaultSubcooling) Then

                        'C. Gnesutta on March 10th, 2021.
                        'OK - Controllato da C. Gnesutta il 30 Marzo 2021.
                        thisCorrectedCapacities = ThermokeyCondenserCapacities.CoilStandardCapacity(condensers(Id).Coil_Type, condensers(Id).Coil_Length, "R-404A", (NewAirFlow / 60) / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        'C. Gnesutta on March 10th, 2021.
                        'OK - Controllato da C. Gnesutta il 30 Marzo 2021.
                        thisCorrectedCapacities = thisCorrectedCapacities + CardanoSecondThermodynamicEngine.CapacityDeSuperheating(condensers(Id).Coil_Type, condensers(Id).Coil_Length, "R-404A", NewAirFlow / condensers(Id).Number_Coils, 5 / 9 * _unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor), atmPressureInMetric)

                        'C. Gnesutta on March 10th, 2021.
                        'OK - Controllato da C. Gnesutta il 30 Marzo 2021.
                        thisCorrectedCapacities = thisCorrectedCapacities + CardanoSecondThermodynamicEngine.CapacitySubCooling(condensers(Id).Coil_Type, condensers(Id).Coil_Length, "R-404A", NewAirFlow / condensers(Id).Number_Coils, 5 / 9 * _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling), atmPressureInMetric)

                        '������������������������������������������������������������������������
                        'C. Gnesutta on March 10th, 2021.
                        thisCorrectedCapacities = ThermalCapacityCorrections * thisCorrectedCapacities * condensers(Id).Number_Coils
                        '������������������������������������������������������������������������
                    Else

                        'C. Gnesutta on March 10th, 2021.
                        'OK - Controllato da C. Gnesutta il 30 Marzo 2021.
                        thisCorrectedCapacities = ThermokeyCondenserCapacities.CoilStandardCapacity(condensers(Id).Coil_Type, condensers(Id).Coil_Length, "R-404A", (NewAirFlow / 60) / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        '������������������������������������������������������������������������

                        'C. Gnesutta on March 10th, 2021.
                        thisCorrectedCapacities = ThermalCapacityCorrections * thisCorrectedCapacities * condensers(Id).Number_Coils
                        '������������������������������������������������������������������������

                    End If

                    '�������������������������������������������������������������������������������������
                    'C. Gnesutta on March 10th, 2021.
                    thisCorrectedCapacities = thisC3 * thisCorrectedCapacities
                        '�������������������������������������������������������������������������������������

                        '�������������������������������������������������������������������������
                        '�������������������������������������������������������������������������

                Case (sigma = "R717-(NH3)")

                    If (condensers(Id).Series = "MC") Then

                        'C. Gnesutta on March 10th, 2021.
                        thisCorrectedCapacities = TkMicro25_NH3.CoilCapacity_NH3_TkMicro25(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, NewAirFlow / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        If (_unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor) <> DefaultDesuperheat_NH3 Or _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling) <> DefaultSubcooling_NH3) Then

                            'C. Gnesutta on March 10th, 2021.
                            thisCorrectedCapacities = thisCorrectedCapacities + SecondThermodynamicEngine_NH3.CapacityDeSuperheating_TkMicro25_NH3(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, NewAirFlow / condensers(Id).Number_Coils, (5 / 9) * _unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor), atmPressureInMetric)

                            'C. Gnesutta on March 10th, 2021.
                            thisCorrectedCapacities = thisCorrectedCapacities + SecondThermodynamicEngine_NH3.CapacitySubCooling_TkMicro25_NH3(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, NewAirFlow / condensers(Id).Number_Coils, (5 / 9) * _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling), atmPressureInMetric)
                        Else

                        End If

                        '����������������������������������������������������������������������������
                        'C. Gnesutta on March 10th, 2021.

                        thisCorrectedCapacities = ThermalCapacityCorrections * thisCorrectedCapacities

                        thisCorrectedCapacities = thisCorrectedCapacities * condensers(Id).Number_Coils
                        '����������������������������������������������������������������������������
                    Else

                        'C. Gnesutta on March 10th, 2021
                        'OK - Controllato da C. Gnesutta il 30 Marzo 2021.
                        thisCorrectedCapacities = TkMicro32_NH3.CoilCapacity_NH3_TkMicro32(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, (NewAirFlow / 60) / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        If (_unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor) <> DefaultDesuperheat_NH3 Or _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling) <> DefaultSubcooling_NH3) Then

                            'C. Gnesutta on March 10th, 2021.
                            thisCorrectedCapacities = thisCorrectedCapacities + SecondThermodynamicEngine_NH3.CapacityDeSuperheating_TkMicro32_NH3(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, NewAirFlow / condensers(Id).Number_Coils, (5 / 9) * _unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor), atmPressureInMetric)

                            'C. Gnesutta on March 10th, 2021.
                            thisCorrectedCapacities = thisCorrectedCapacities + SecondThermodynamicEngine_NH3.CapacitySubCooling_TkMicro32_NH3(condensers(Id).Coil_Type_NH3, condensers(Id).Coil_Length, NewAirFlow / condensers(Id).Number_Coils, (5 / 9) * _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling), atmPressureInMetric)
                        Else

                        End If

                    End If

                    '�������������������������������������������������������������������������
                    'C. Gnesutta on March 10th, 2021.
                    thisCorrectedCapacities = ThermalCapacityCorrections * thisCorrectedCapacities * condensers(Id).Number_Coils
                    '�������������������������������������������������������������������������

                    'Caso refrigeranti tradizionali
                Case Else

                    If (_unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor) <> DefaultDesuperheat Or _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling) <> DefaultSubcooling) Then

                        'C. Gnesutta on March 10th, 2021.
                        thisCorrectedCapacities = ThermokeyCondenserCapacities.CoilStandardCapacity(condensers(Id).Coil_Type, condensers(Id).Coil_Length, refRigerantType, (NewAirFlow / 60) / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        'C. Gnesutta on March 10th, 2021.
                        thisCorrectedCapacities = thisCorrectedCapacities + CardanoSecondThermodynamicEngine.CapacityDeSuperheating(condensers(Id).Coil_Type, condensers(Id).Coil_Length, refRigerantType, NewAirFlow / condensers(Id).Number_Coils, 5 / 9 * _unitConverter.CondenserDeSuperHeatDegrees(unitsType, compressor), atmPressureInMetric)
                        'C. Gnesutta on March 10th, 2021.
                        thisCorrectedCapacities = thisCorrectedCapacities + CardanoSecondThermodynamicEngine.CapacitySubCooling(condensers(Id).Coil_Type, condensers(Id).Coil_Length, refRigerantType, NewAirFlow / condensers(Id).Number_Coils, 5 / 9 * _unitConverter.CondenserSubCoolDegrees(unitsType, subCooling), atmPressureInMetric)

                        '�������������������������������������������������������������������������������
                        'C. Gnesutta on March 10th, 2021.
                        thisCorrectedCapacities = ThermalCapacityCorrections * thisCorrectedCapacities * condensers(Id).Number_Coils

                        '�������������������������������������������������������������������������������
                    Else

                        'C. Gnesutta on March 10th, 2021.
                        thisCorrectedCapacities = ThermokeyCondenserCapacities.CoilStandardCapacity(condensers(Id).Coil_Type, condensers(Id).Coil_Length, refRigerantType, (NewAirFlow / 60) / condensers(Id).Number_Coils, (5 / 9) * (_unitConverter.CondensingTemperature(unitsType, condensing) - dryBulb), atmPressureInMetric)

                        '�������������������������������������������������������������������������������
                        'OK - Checked by C. Gnesutta on July 31st, 2019. - NH3
                        thisCorrectedCapacities = ThermalCapacityCorrections * thisCorrectedCapacities * condensers(Id).Number_Coils
                        '�������������������������������������������������������������������������������

                    End If

            End Select

            If unitsType = "imp" Then

                detail.NewCapacity = Math.Round(thisCorrectedCapacities * ConvertValue.BtuPerHrFromKW * (100 + PercentAdjustment) / 100, 0)
            Else

                detail.NewCapacity = Math.Round(thisCorrectedCapacities * (100 + PercentAdjustment) / 100, 1)

            End If

            detail.NewAirFlow = If(unitsType = "imp", Math.Round(airFlowEnglish, 0), Math.Round(airFlowMetric, 0))

            detailsList.Add(detail)
        Catch ex As Exception

        End Try

        Return detailsList

    End Function

    Public Function GetCapacityAdjustment(newCondeser As List(Of Condenser), Query As AdjustQuery) As List(Of AdjustCapacityResult)

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

            Dim resullt = ComputeCapacityAdjustment(newCondeser, conderserId, condenserModel, refRigerantType, unitsType, condensing, PercentAdjustment, compressor, subCooling, dryBulb, atmPressureInMetric)

            Return resullt
        Catch ex As Exception

            Return New List(Of AdjustCapacityResult)()

        End Try

    End Function

End Class