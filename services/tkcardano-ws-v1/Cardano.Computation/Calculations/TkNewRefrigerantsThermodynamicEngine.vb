Imports System.Math

Public Class TkNewRefrigerantsThermodynamicEngine

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
    'GEOMETRIC DATA
    Dim Number_Of_Ports As Integer = 0

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
    'Global Variables

    Dim Global_Ds_Area As Double = 0

    Dim Global_Cond_Area As Double = 0

    Dim Global_Sc_Area As Double = 0

    Dim Global_Ds_length As Double = 0

    Dim Global_Sc_length As Double = 0

    Dim Global_Cond_length As Double = 0

    Dim Global_this_Ds_Percent As Double = 0

    Dim Global_this_Sc_Percent As Double = 0

    Dim Global_this_Cond_Percent As Double = 0

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
    'NUMBER OF PORTS GLOBAL VARIABLE
    Dim NumberOfPorts As Int16 = 13
    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
    Const pi As Double = 3.14159265359
    Const e As Double = 2.71828182846
    Const gravity As Double = 9.80665

    'Aluminium Linear Heat Conduction Coefficient [W/(°K*m)]
    Public Const AlHeatConductionCoeff As Double = 237
    'Height of the Fins [mm]
    Const TubeHeight As Double = 2.3
    'Length of the Fins [mm]
    Const FinHeight As Double = 9.2
    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
    'Variables to calculate Dp Refrigerant
    'Dp Refrigerant in the Desuperheating region - [kPa]
    'OK - Checked by C. Gnesutta on June 22nd, 2018.
    Dim Tk_DS_RefrDp As Double = 0

    'Dp Refrigerant in the condensing region - [kPa]
    'OK - Checked by C. Gnesutta on June 22nd, 2018.
    Dim Tk_Cond_RefrDp As Double = 0

    'Dp Refrigerant in the subcooling region - [kPa]
    'OK - Checked by C. Gnesutta on June 22nd, 2018.
    Dim Tk_Sc_RefrDp As Double = 0

    'Total amount of the Pressure Drops [kPa] 
    'OK - Checked by C. Gnesutta on June 22nd, 2018.
    Dim Tk_Global_RefrDp As Double = 0

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
    'Vector of the widths of each condensing region (i.e. pass) of the condenser core.
    'C. Gnesutta, December 14th, 2017.
    'GEOMETRY OF THE MICROCHANNEL CORE
    Dim thisTotalNumberOfTubes As Integer = 0
    Dim this_NumberOfPasses As Integer = 0
    Dim PassTubes() As String
    Dim thisPasswidth() As String
    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

    Dim TkRefrigerantCalculator As New TkCardano_DpRefrigerant_NewRefrigerants
    Dim HeatTransferEquations As New FundamentalHeatExchangeEquations
    Dim thisRefrigerantProperties As New TkRefrigerantProperties

    Dim TkCondenserStartingPointCapacities As New StartingPointCondenserCapacities

    'Dim Tk_DpRefrigerantCalculation As New TkCardano_DpRefrigerant_NewRefrigerants

#Region "Refrigerant Side Pressure Drops [kPa]"

    'Ok - Argomenti della funzione controllati. - C. Gnesutta, 31st May 2018.
    ' OK Checked by C. Gnesutta on June 22nd 2018.
    Public Function FinalCalculationRefrigerantSidePressureDrop(ByVal _microchannelTubeWidth As String, ByVal _thisCoilType As String, ByVal _thisCoilLength As Double, ByVal RefType As String, ByVal _thisAirFlow As Double, ByVal _thisDeltaTemperature As Double, ByVal _CondensingTemperature As Double, ByVal _Dt_DeSuperHeating As Double, ByVal _Dt_SubCooling As Double, ByVal _thisMu_Air As Double, ByVal _thisCP_Air As Double, ByVal _thisLambda_Air As Double, ByVal _thisRho_Air As Double, ByVal _this_AirPressure As Double) As Double


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'GLOBAL VARIABLES
        Global_Ds_Area = 0

        Global_Cond_Area = 0

        Global_Sc_Area = 0

        Global_Ds_length = 0

        Global_Sc_length = 0

        Global_Cond_length = 0

        Global_this_Ds_Percent = 0

        Global_this_Sc_Percent = 0

        Global_this_Cond_Percent = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Dim Qdot As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Dim _thisAlphaAir As Double = 0

        Dim thisDsHeatPower As Double = 0

        Dim thisScHeatPower As Double = 0

        Dim CondensingPressure As Double = 0

        Dim thisVfr As Double = 0

        Dim TUBE_Int_Surf As Double = 0

        'Refrigerant Mass Rate along the DeSuperheating region [kg/s]
        Dim RefrMassFlowRate_Ds As Double = 0

        'Refrigerant Mass Rate along the SubCooling region [kg/s]
        Dim RefrMassFlowRate_Sc As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Average DeSuperheating temperature [°C]
        Dim AverageDsTemp As Double = 0

        'Average SubCooling temperature [°C]
        Dim AverageScTemp As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '###################################################
        'GEOMETRIC PROPERTIES FOR THERMODYNAMICS

        'Calculation of the fin efficiency.
        'C.Gnesutta, January 11th, 2018.
        Dim FinEfficiency As Double = 0

        'Calculation of the Prime Surface of the microchannel tube [m^2].
        'C.Gnesutta, January 11th, 2018.
        Dim this_Prime_Surface As Double = 0

        'Calculation of the GLOBAL internal surface of the ports 
        'C.Gnesutta, January 11th, 2018.
        Dim this_TUBE_Internal_Surface As Double = 0

        ' This Funcion calculates the external surface of the fins (Linear Secondary Surface) [m^2]
        'C.Gnesutta, January 11th, 2018.
        Dim this_External_Fin_Surface As Double = 0

        'Calculation of the Overall Fin Efficiency. 
        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger
        ' with Louvered Fins using Thermal Resistance Concept>> - Eqs. n.26 and n2.7
        Dim this_Overall_Fin_Efficiency As Double = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Refrigerant Side Pressure Drops [kPa] - VARIABLES
        Dim DeltaPressure As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Modified by C. Gnesutta, on October 22nd, 2018.
        'FIRST STARTING-POINT PREDICTION OF THE REFRIGERANT ENTHALPY GAPS [W],
        'DURING MONOPHASE FLOW THROUGH THE MICROCHANNEL CONDENSER. 

        'DeSuperheating Enthalpy Gap.
        Dim Delta_h_DS_Refr As Double = 0

        'Subcooling  Enthalpy Gap.
        Dim Delta_h_Sc_Refr As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Variables related to the condenser thermodynamics with R404a refrigerant, for the initial-point strategy to calculate
        'the refrigerant mass-flow rate of the microchannel condenser. C. Gnesutta, December 14th, 2017.

        Dim Refr_MassFlowRate As Double = 0

        Dim Refr_MassFlowRate_PerPort As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Dim thisTubeThickness As Double = 0

        'Global length of the path of the refrigerant across the Microchannel core. [mm]  
        Dim LengthOfThePathOfTheRefr As Double = 0

        'Global length of the DeSuperheating across the Microchannel core. [mm]  
        Dim LengthOfTheDSRefr As Double = 0

        'Global length of the DeSuperheating across the Microchannel core. [mm]  
        Dim LengthOfTheScRefr As Double = 0

        'Length of the condensing path [mm]  
        Dim CondensingLength As Double = 0

        'Width of the condenser core [mm] 
        Dim thisCoilWidth As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Calculation of the number of tubes. October 22nd 2018.
        NumberOfTubesOfTheMicrochannelCoil(_thisCoilType)

        'Calculation of the internal surface of the tubes. October 22nd 2018.
        TUBE_Int_Surf = HeatTransferEquations.CalculateInternalSufaceOfPort(_microchannelTubeWidth, _thisCoilLength, thisTotalNumberOfTubes)

        Select Case True

            'TkMicro25 - Geometry according to Technical Drawing SAPA n. M5010004, released on December 2nd 2014.
            Case _microchannelTubeWidth = "25"

                Number_Of_Ports = 9
                thisTubeThickness = (0.5 / 1000)

                thisCoilWidth = ((2.3 + 9.2) * thisTotalNumberOfTubes) + 9.2

            Case _microchannelTubeWidth = "32"

                Number_Of_Ports = 13

                thisTubeThickness = (0.5 / 1000)

                thisCoilWidth = ((2.3 + 9.2) * thisTotalNumberOfTubes) + 9.2

            Case Else

                Number_Of_Ports = 13
                thisTubeThickness = (0.5 / 1000)

                thisCoilWidth = ((2.3 + 9.2) * thisTotalNumberOfTubes) + 9.2
        End Select


        '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        'Calculation of the average velocity of the inlet air into the coil surface (just some millimeters before the coil surface).
        '(the effect of the tubes is always inside the correlation formula for the air-side heat transfer)

        thisVfr = (_thisAirFlow / 3600)

        _thisCoilLength = (_thisCoilLength / 1000)

        'Width of the condenser core [mm] -----> [m]
        thisCoilWidth = (thisCoilWidth / 1000)

        'Air Speed into the core [m/s] 
        thisVfr = thisVfr / (_thisCoilLength * thisCoilWidth)

        '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        _thisCoilLength = (_thisCoilLength * 1000)
        '#######################################################################################################################################


        'Calculation of the Prime Surface of the microchannel tube [m^2].
        'C.Gnesutta, May 16th, 2018.
        this_Prime_Surface = HeatTransferEquations.CalculatePrimeSurface(_microchannelTubeWidth, _thisCoilLength, thisTotalNumberOfTubes)

        'Calculation of the GLOBAL internal surface of the ports 
        'C.Gnesutta, May 16th, 2018.
        this_TUBE_Internal_Surface = HeatTransferEquations.CalculateInternalSufaceOfPort(_microchannelTubeWidth, _thisCoilLength, thisTotalNumberOfTubes)

        ' This Funcion calculates the external surface of the fins (Linear Secondary Surface) [m^2]
        'C.Gnesutta, May 16th, 2018.
        this_External_Fin_Surface = HeatTransferEquations.CalculateLinearSecondarySurface(_microchannelTubeWidth, _thisCoilLength, thisTotalNumberOfTubes)

        '#######################################################################################################################################

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the Refrigerant Mass flow Rate [kg/s]
        'C. Gnesutta, May 16th, 2018.
        _thisAlphaAir = HeatTransferEquations.CalculateAirSideHeatTransferCoefficient(_microchannelTubeWidth, _thisMu_Air, _thisCP_Air, _thisLambda_Air, _thisRho_Air, thisVfr)

        'GEOMETRIC PROPERTIES FOR THERMODYNAMICS

        'Calculation of the fin efficiency.
        'C.Gnesutta, May 16th, 2018.
        FinEfficiency = HeatTransferEquations.CalculateFinEfficiency(_thisAlphaAir)

        'Calculation of the Overall Fin Efficiency. 
        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger
        'with Louvered Fins using Thermal Resistance Concept>> - Eqs. n.26 and n2.7
        'C.Gnesutta, May 16th, 2018.
        this_Overall_Fin_Efficiency = HeatTransferEquations.CalculateOverallFinEfficiency(FinEfficiency, this_Prime_Surface, this_External_Fin_Surface)

        Qdot = CoilThermalCapacity(_microchannelTubeWidth, _thisCoilType, _thisCoilLength, RefType, _thisAirFlow, _thisDeltaTemperature, _CondensingTemperature, _Dt_DeSuperHeating, _Dt_SubCooling, _thisMu_Air, _thisCP_Air, _thisLambda_Air, _thisRho_Air, _this_AirPressure)


        Refr_MassFlowRate = CalculationOfTheRefrigerantMassFlowRate(RefType, Qdot, _CondensingTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Condensing pressure [Bar]
        'C. Gnesutta, May 16th, 2018.
        CondensingPressure = thisRefrigerantProperties.CalculationOfSaturationPressure(RefType, _CondensingTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'PREDICTION OF THE REFRIGERANT ENTHALPY GAPS [W], DURING MONOPHASE FLOW THROUGH THE MICROCHANNEL CONDENSER. 

        'Average DeSuperheating temperature [°C]
        AverageDsTemp = _CondensingTemperature + (_Dt_DeSuperHeating / 2)

        'Average SubCooling temperature [°C]
        AverageScTemp = _CondensingTemperature + (_Dt_SubCooling / 2)

        'DeSuperheating Enthalpy Gap [W]
        Delta_h_DS_Refr = thisRefrigerantProperties.CalculationOfGasSpecificEnthalpy(RefType, CondensingPressure, _CondensingTemperature + AverageDsTemp + 0.5)
        Delta_h_DS_Refr = Delta_h_DS_Refr - thisRefrigerantProperties.CalculationOfGasSpecificEnthalpy(RefType, CondensingPressure, _CondensingTemperature + 0.5)

        'Subcooling Enthalpy Gap [W]
        Delta_h_Sc_Refr = thisRefrigerantProperties.CalculationOfLiquidSpecificHeat(RefType, CondensingPressure, _CondensingTemperature - 0.5)
        Delta_h_Sc_Refr = Delta_h_Sc_Refr - thisRefrigerantProperties.CalculationOfLiquidSpecificHeat(RefType, CondensingPressure, _CondensingTemperature - AverageScTemp - 0.5)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'DeSuperheating Enthalpy Gap [W] - Starting Point Estimation
        thisDsHeatPower = (Delta_h_DS_Refr * Refr_MassFlowRate)

        'From [W] -----> to [kW] -  C. Gnesutta, May 16th, 2018.
        thisDsHeatPower = (thisDsHeatPower / 1000)

        'Subcooling  Enthalpy Gap [W] - Starting Point Estimation
        thisScHeatPower = (Delta_h_Sc_Refr * Refr_MassFlowRate)

        'From [W] -----> to [kW] -  C. Gnesutta, May 16th, 2018.
        thisScHeatPower = (thisScHeatPower / 1000)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        If (this_NumberOfPasses = 1) Then

            LengthOfThePathOfTheRefr = _thisCoilLength

            'Refrigerant Mass flow Rate per Port [kg/s]
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            Refr_MassFlowRate_PerPort = (Refr_MassFlowRate / (thisTotalNumberOfTubes * Number_Of_Ports))

            '#############################################################################################################################
            '#############################################################################################################################                           
            ' Refrigerant Side Pressure Drops [kPa] - Monopass Condenser Coil - Condensing region [kPa] 
            'C.Gnesutta, January 11th, 2018. - OK - Checked again by C. Gnesutta on May 18th 2018.
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            Tk_Cond_RefrDp = TkRefrigerantCalculator.Calculate_TwoPhase_RefrigerantSidePressureDrop(RefType, _microchannelTubeWidth, Refr_MassFlowRate_PerPort, _CondensingTemperature, Global_Cond_length, _thisCoilLength, Global_Ds_length, Global_Sc_length, 0)

            ' Refrigerant Side Pressure Drops [kPa] - Monopass Condenser Coil - DeSuperheating region [kPa] 
            'C.Gnesutta, January 11th, 2018.  - OK - Checked again by C. Gnesutta on May 18th 2018.
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            Tk_DS_RefrDp = TkRefrigerantCalculator.CalculateMonoPhase_DpRefr(RefType, _microchannelTubeWidth, Refr_MassFlowRate_PerPort, "Gas", _CondensingTemperature, _Dt_DeSuperHeating, _Dt_SubCooling, Global_Ds_length)

            ' Refrigerant Side Pressure Drops [kPa] - Monopass Condenser Coil - SubCooling region [kPa] 
            'C.Gnesutta, January 11th, 2018. - OK - Checked again by C. Gnesutta on May 18th 2018.
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            Tk_Sc_RefrDp = TkRefrigerantCalculator.CalculateMonoPhase_DpRefr(RefType, _microchannelTubeWidth, Refr_MassFlowRate_PerPort, "Liquid", _CondensingTemperature, _Dt_DeSuperHeating, _Dt_SubCooling, Global_Sc_length)

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Experimental Corrections

            If _microchannelTubeWidth = "32" Then

                'OK - Checked again - C. Gnesutta, June 22nd 2018.
                Tk_Cond_RefrDp = Tk_Cond_RefrDp / 1.4

            Else

                'OK - Checked again - C. Gnesutta, June 22nd 2018.
                Tk_Cond_RefrDp = Tk_Cond_RefrDp / 1.4

            End If

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            'Global Refrigerant Side Pressure Drops [kPa] - Monopass Condenser Coil
            'C.Gnesutta, January 11th, 2018.
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            Tk_Global_RefrDp = (Tk_Cond_RefrDp + Tk_DS_RefrDp + Tk_Sc_RefrDp)

        Else

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Refrigerant Side Pressure Drops for the Multi-Pass Condenser Core. [kPa]
            'C. Gnesutta, January 11th, 2018.
            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            'Calculation of the total length of the gas path through the microchannel core condenser [mm] 

            'Refrigerant Mass Flow Rate per port in the Desuperheating region [kg/s]
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            RefrMassFlowRate_Ds = Refr_MassFlowRate / (Number_Of_Ports * PassTubes(0))

            'Refrigerant Mass Flow Rate per port in the SubCooling region [kg/s]
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            RefrMassFlowRate_Sc = Refr_MassFlowRate / (Number_Of_Ports * PassTubes(this_NumberOfPasses - 1))


            ' Refrigerant Side Pressure Drops [kPa] - Multi-Pass Condenser Coil - DeSuperheating region [kPa] 
            'C.Gnesutta, January 11th, 2018.
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            Tk_DS_RefrDp = TkRefrigerantCalculator.CalculateMonoPhase_DpRefr(RefType, _microchannelTubeWidth, RefrMassFlowRate_Ds, "Gas", _CondensingTemperature, _Dt_DeSuperHeating, _Dt_SubCooling, Global_Ds_length)

            'Fattore correttivo per la multipassi

            ' Refrigerant Side Pressure Drops [kPa] -  Multi-Pass Condenser Coil - SubCooling region [kPa] 
            'C.Gnesutta, January 11th, 2018.
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            Tk_Sc_RefrDp = TkRefrigerantCalculator.CalculateMonoPhase_DpRefr(RefType, _microchannelTubeWidth, RefrMassFlowRate_Sc, "Liquid", _CondensingTemperature, _Dt_DeSuperHeating, _Dt_SubCooling, Global_Sc_length)

            'Fattore correttivo per la multipassi

            'Contributo bifase - C. Gnesutta, 18 Maggio 2018.
            Tk_Cond_RefrDp = 0
            For s = 0 To (this_NumberOfPasses - 1)

                Select Case True

                    Case (s = 0)

                        'Flow rate /port [kg/s] -  First Pass - C. Gnesutta, May 18th 2018.
                        'OK - Checked again - C. Gnesutta, June 22nd 2018.
                        Refr_MassFlowRate_PerPort = Refr_MassFlowRate / (Number_Of_Ports * PassTubes(0))

                        'OK - Checked again - C. Gnesutta, June 22nd 2018.
                        DeltaPressure = TkRefrigerantCalculator.Calculate_TwoPhase_RefrigerantSidePressureDrop(RefType, _microchannelTubeWidth, Refr_MassFlowRate_PerPort, _CondensingTemperature, Global_Cond_length, _thisCoilLength, Global_Ds_length, Global_Sc_length, s)

                    Case (s = (this_NumberOfPasses - 1))

                        'OK - Checked again - C. Gnesutta, June 22nd 2018.
                        Refr_MassFlowRate_PerPort = Refr_MassFlowRate / (Number_Of_Ports * PassTubes(this_NumberOfPasses - 1))

                        'OK - Checked again - C. Gnesutta, June 22nd 2018.
                        DeltaPressure = TkRefrigerantCalculator.Calculate_TwoPhase_RefrigerantSidePressureDrop(RefType, _microchannelTubeWidth, Refr_MassFlowRate_PerPort, _CondensingTemperature, Global_Cond_length, _thisCoilLength, Global_Ds_length, Global_Sc_length, s)

                    Case Else

                        'Flow rate /port [kg/s] -  Last Pass - C. Gnesutta, May 18th 2018.
                        'OK - Checked again - C. Gnesutta, June 22nd 2018.
                        Refr_MassFlowRate_PerPort = Refr_MassFlowRate / (Number_Of_Ports * PassTubes(s))

                        'OK
                        'OK - Checked again - C. Gnesutta, June 22nd 2018.
                        DeltaPressure = TkRefrigerantCalculator.Calculate_TwoPhase_RefrigerantSidePressureDrop(RefType, _microchannelTubeWidth, Refr_MassFlowRate_PerPort, _CondensingTemperature, Global_Cond_length, _thisCoilLength, Global_Ds_length, Global_Sc_length, s)


                End Select

                'Fattore correttivo per la multipassi
                'DeltaPressure = DeltaPressure
                'OK - Checked again - C. Gnesutta, June 22nd 2018.
                Tk_Cond_RefrDp = Tk_Cond_RefrDp + DeltaPressure


            Next s

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Experimental Corrections
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            If _microchannelTubeWidth = "32" Then

                Tk_Cond_RefrDp = Tk_Cond_RefrDp / 3.2

            Else

                'C. Gnesutta, June 12th 2018. Experimental corrections.
                Tk_Cond_RefrDp = Tk_Cond_RefrDp / 6.0

            End If

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            'Global Refrigerant Side Pressure Drops [kPa] - Monopass Condenser Coil
            'C.Gnesutta, January 11th, 2018.
            'OK - Checked again - C. Gnesutta, June 22nd 2018.
            Tk_Global_RefrDp = (Tk_Cond_RefrDp + Tk_DS_RefrDp + Tk_Sc_RefrDp)

        End If

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'OK - Checked again - C. Gnesutta, June 22nd 2018.
        Tk_Global_RefrDp = Int(100 * Tk_Global_RefrDp) / 100

        Return Tk_Global_RefrDp

    End Function


#End Region


#Region "ThermalCapacity of the Microchannel Coil [kW]"
    Public Function CoilThermalCapacity(ByVal _microchannelTubeWidth As String, ByVal _thisCoilType As String, ByVal _thisCoilLength As Double, ByVal _RefType As String, ByVal _thisAirFlow As Double, ByVal _thisDeltaTemperature As Double, ByVal _CondensingTemperature As Double, ByVal _Dt_DeSuperHeating As Double, ByVal _Dt_SubCooling As Double, ByVal _this_Mu_Air As Double, ByVal _this_CP_Air As Double, ByVal _this_Lambda_Air As Double, ByVal _this_Rho_Air As Double, ByVal _this_AirPressure As Double) As Double


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Ok - Controllato da C. Gnesutta il 22 Giugno 2018

        Dim _CondensingTemperature_temp As Double = _CondensingTemperature
        Dim _thisDeltaTemperature_temp As Double = _thisDeltaTemperature

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'GLOBAL VARIABLES
        Global_Ds_Area = 0

        Global_Cond_Area = 0

        Global_Sc_Area = 0

        Global_Ds_length = 0

        Global_Sc_length = 0

        Global_Cond_length = 0


        Global_this_Ds_Percent = 0

        Global_this_Sc_Percent = 0

        Global_this_Cond_Percent = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'This choice was necessary to eliminate some oscillations in the final solution
        'Added by C. Gnesutta, 20 Giugno 2018.
        If (_thisDeltaTemperature = 15 And _CondensingTemperature = 40) Then

        Else

            _thisDeltaTemperature = 15

            _CondensingTemperature = 40

        End If

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        Dim FinQdot_NEW_cond As Double = 0

        Dim thisOverallAverageREDUCED_Alpha As Double = 0

        thisTotalNumberOfTubes = 0

        this_NumberOfPasses = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        ' IMPORTANT REMARK - C. Gnesutta, January, 8th 2018.
        ' I preferred a direct numerical calculation of the averaged refrigerant-side heat exchange coefficient
        ' because it was not necessarly clear to me how equation n.12 was determined 
        'in M. M. Shah 1979-2009. A general correlation for heat transfer during film condensation in pipes (for circular and non-circular tubes).
        'Int. J. Heat   'Mass Transfer 22:547–56
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        ' OK
        'Calculation of the Overall Fin Efficiency. - Batteria Multipasso
        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger
        ' with Louvered Fins using Thermal Resistance Concept>> - Eqs. n.26 and n2.7

        ''€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        ''Heat flow exchanged inside the monophase region. 
        Dim Heat_h_DS_Refr As Double = 0
        Dim Heat_Sc_Refr As Double = 0
        Dim thisDelta_h_DS_Refr As Double = 0
        Dim thisDelta_h_Sc_Refr As Double = 0
        ''€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Dim this_Overall_Fin_Efficiency_forPass As Double = 0
        Dim REDUCED_Ref_MassFlowRate_PerPort As Double = 0
        Dim DeltaAlpha_REDUCED As Double = 0
        Dim DeltaAlpha As Double = 0
        Dim sigma As Double = 0
        Dim VaporQualitySTART As Double = 1
        Dim VaporQualityEND As Double = 0
        Dim Refr_MassFlowRate_FIN

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'C. Gnesutta, March 16th 2018.
        Dim RefrigerantSideAverageAlpha As Double = 0
        Dim thisOverallAverageHeatTransferCoefficient As Double = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'C. Gnesutta, March 16th 2018.
        Dim Cmin As Double = 0
        Dim Epsilon As Double = 0
        Dim NTU As Double = 0
        Dim Qmax As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        Dim i As Integer = 0
        Dim r As Int16 = 0
        this_NumberOfPasses = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Dim thisMdot_Ds As Double = 0
        Dim thisMdot_Sc As Double = 0

        'Surface Area where the Superheated Gas Desuperheats [m^2]
        Dim this_Ds_Area As Double = 0

        'Surface Area of the Condensing Region [m^2]
        Dim this_Cond_Area As Double = 0

        'Surface Area where the subcooled liquid subcools [m^2]
        Dim this_Sc_Area As Double = 0

        '% Area where the Superheated Gas Desuperheats 
        Dim this_Ds_Percent As Double = 0

        '% Area of the Condensing Region 
        Dim this_Cond_Percent As Double = 0

        '% Area where the subcooled liquid subcools 
        Dim this_Sc_Percent As Double = 0

        'Desuperheating segment of the core [mm] 
        Dim this_Ds_length As Double = 0

        'Condensing segment of the core [mm] 
        Dim this_Cond_length As Double = 0

        'Subcooling segment of the core [mm] 
        Dim this_Sc_length As Double = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Variables related to the condenser thermodynamics with R404a refrigerant, for the initial-point strategy to calculate
        'the refrigerant mass-flow rate of the microchannel condenser. C. Gnesutta, December 14th, 2017.
        Dim Refrigerant_MassFlowRate_OLD As Double = 0
        Dim Refrigerant_MassFlowRate_NEW As Double = 0
        Dim Refrigerant_MassFlowRate_PerPort As Double = 0
        Dim Qdot_NEW_cond As Double = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Dim thisRequestedCapacity_COND_0 As Double = 0
        Dim _HeatPowerExchanged As Double = 0

        'Average DeSuperheating temperature [°C] -OK
        Dim thisAverageDsTemperature As Double = _Dt_DeSuperHeating

        'Average SubCooling temperature [°C]-OK
        Dim thisAverageScTemperature As Double = _Dt_SubCooling

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'FIN EFFICIENCY
        Dim this_Overall_Fin_Efficiency As Double = 0
        Dim FinEfficiency As Double = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'HEAT EXCHANGING SURFACES
        Dim this_Prime_Surface As Double = 0
        Dim this_TUBE_Internal_Surface As Double = 0
        Dim this_External_Fin_Surface As Double
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'GEOMETRY OF THE MICROCHANNEL TUBE
        Dim thisTkTubeThickness As Double = 0
        Dim thisTKCoilWidth As Double = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Dim AirSideHeatExchangeCoefficient As Double = 0
        Dim TotalFinAreaOfTheMicrochannelCore As Double = 0
        Dim thisVfr As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Vapor quality at the beginning and at the end of the condensing process
        'For sake of clarity,  I preferred to use Equation n. 11 instead of eq. 12 (of  M. M. Shah 1979-2009. 
        'A general correlation for heat transfer during film condensation in pipes. Int. J. Heat Mass Transfer 22:547–56). 
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Dim thisSubCoolingPressure As Double = 0

        Dim thisCondensingPressure As Double = 0
        Dim thisRequestedCapacity As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'CALCULATION OF THE CONDENSING PRESSURE [Pa]- OK
        thisCondensingPressure = thisRefrigerantProperties.CalculationOfSaturationPressure(_RefType, _CondensingTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        ' C. Gnesutta, May 10th 2018. - SubCooling pressure.
        thisSubCoolingPressure = thisRefrigerantProperties.CalculationOfSaturationPressureBubblePoint(_RefType, _CondensingTemperature) + (5 * 1000)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'CALCULATION OF THE NUMBER OF TUBES OF THE MICROCHANNEL CORE- OK
        NumberOfTubesOfTheMicrochannelCoil(_thisCoilType)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '############################################################################################################
        'Determination of the geometry of the microchannel coil - OK
        Select Case True

            'TkMicro25 - Geometry according to Technical Drawing SAPA n. M5010004, released on December 2nd 2014. - OK
            Case _microchannelTubeWidth = "25"

                NumberOfPorts = 9
                thisTkTubeThickness = (0.5 / 1000)
                thisTKCoilWidth = ((TubeHeight + FinHeight) * thisTotalNumberOfTubes) + 9.2

                'TkMicro32 - Geometry according to Technical Drawing Thermokey N. M5010004, released on June 22nd 2017.- OK
            Case _microchannelTubeWidth = "32"

                NumberOfPorts = 13
                thisTkTubeThickness = (0.5 / 1000)
                thisTKCoilWidth = ((TubeHeight + FinHeight) * thisTotalNumberOfTubes) + 9.2

            Case Else
                NumberOfPorts = 13
                thisTkTubeThickness = (0.5 / 1000)
        End Select
        '############################################################################################################

        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        'AIR SIDE SUB-SECTION
        'Global fin area surface of the microchannel condenser[m^2]. C. Gnesutta, December 14th, 2017. -OK
        TotalFinAreaOfTheMicrochannelCore = HeatTransferEquations.CalculateLinearSecondarySurface(_microchannelTubeWidth, _thisCoilLength, thisTotalNumberOfTubes)

        '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        'Calculation of the average velocity of the inlet air into the coil surface (just some millimeters before the coil surface).
        '(the effect of the tubes is always inside the correlation formula for the air-side heat transfer) -OK  -OK
        thisVfr = (_thisAirFlow / 3600)
        thisVfr = 1000000 * thisVfr / (_thisCoilLength * thisTKCoilWidth)
        '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        'Air Side Heat Exchange Coeficient [W/(°K*m^2)], calculated according to YU-JUEI CHANG and CHI-CHUAN WANG, <<A generalized heat transfer correlation for
        'louver fin geometry>>, eq.9 (from our Comsol Mutiphycics simulations we are almost always inside the range 100 < ReLp < 3000, except for thisVfr < 0.5 m/s ) - OK
        AirSideHeatExchangeCoefficient = HeatTransferEquations.CalculateAirSideHeatTransferCoefficient(_microchannelTubeWidth, _this_Mu_Air, _this_CP_Air, _this_Lambda_Air, _this_Rho_Air, thisVfr)

        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        '#######################################################################################################################################

        '#######################################################################################################################################
        'GEOMETRIC PROPERTIES FOR THERMODYNAMICS

        'Calculation of the fin efficiency. - Ok. Testata.- Ok- Ok
        'C.Gnesutta, December 20th, 2017.
        FinEfficiency = HeatTransferEquations.CalculateFinEfficiency(AirSideHeatExchangeCoefficient)

        'Calculation of the Prime Surface of the microchannel tube [m^2]. - OK, corretta.- Ok
        this_Prime_Surface = HeatTransferEquations.CalculatePrimeSurface(_microchannelTubeWidth, _thisCoilLength, thisTotalNumberOfTubes)

        'Calculation of the GLOBAL internal surface of the ports   [m^2] - OK
        this_TUBE_Internal_Surface = HeatTransferEquations.CalculateInternalSufaceOfPort(_microchannelTubeWidth, _thisCoilLength, thisTotalNumberOfTubes)

        ' This Function calculates the external surface of the fins (Linear Secondary Surface) [m^2]- OK
        this_External_Fin_Surface = HeatTransferEquations.CalculateLinearSecondarySurface(_microchannelTubeWidth, _thisCoilLength, thisTotalNumberOfTubes)

        'Calculation of the Overall Fin Efficiency.  - OK
        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger
        ' with Louvered Fins using Thermal Resistance Concept>> - Eqs. n.26 and n2.7 - OK
        this_Overall_Fin_Efficiency = HeatTransferEquations.CalculateOverallFinEfficiency(FinEfficiency, this_Prime_Surface, this_External_Fin_Surface)

        '#######################################################################################################################################
        '#######################################################################################################################################

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'REFRIGERANT SPECIFIC ENTHALPY GAPS DURING MONOPHASE FLOW THROUGH THE MICROCHANNEL CONDENSER. 
        'DeSuperheating Specific Enthalpy Gap [J/Kg]
        '( 0.5°C added and removed to be sure about numerical stability of the gas properties)

        'Ok 
        thisDelta_h_DS_Refr = thisRefrigerantProperties.CalculationOfGasSpecificEnthalpy(_RefType, thisCondensingPressure, _CondensingTemperature + thisAverageDsTemperature + 0.5)

        'Ok 
        thisDelta_h_DS_Refr = thisDelta_h_DS_Refr - thisRefrigerantProperties.CalculationOfGasSpecificEnthalpy(_RefType, thisCondensingPressure, _CondensingTemperature + 0.5)


        'Subcooling Specific Enthalpy Gap [J/Kg]-Ok 
        thisDelta_h_Sc_Refr = thisRefrigerantProperties.CalculationOfLiquidSpecificEnthalpy(_RefType, thisSubCoolingPressure, _CondensingTemperature - 0.5)

        'Subcooling Specific Enthalpy Gap [J/Kg]-Ok 
        thisDelta_h_Sc_Refr = thisDelta_h_Sc_Refr - thisRefrigerantProperties.CalculationOfLiquidSpecificEnthalpy(_RefType, thisSubCoolingPressure, _CondensingTemperature - thisAverageScTemperature - 0.5)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'IMPORTANT NOTE FOR THE SOFTWARE USERS
        'General Rule: The first estimation of the Thermodynamics of the microchannel coil has been solved, by using the well-know refrigerant R-404A. Then an iterative
        'method based on the <<Newton–Raphson method>> together with the Epsilon-NTU Method has been implemented to solve the non-linear problem of the determination
        'of the coil thermodynamics.
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Initial-point strategy for iterative calculation of the mass-flow rate of the microchannel condenser [kg/s] -Ok
        'C. Gnesutta, December 14th, 2017.
        'OK - Checked by C. Gnesutta on March 15,  2018 - Ok
        'OK - Checked by C. Gnesutta on April 16th,  2018 - Ok
        Refrigerant_MassFlowRate_OLD = InitialPointPredictionOfTheRefrigerantMassFlowRate(_microchannelTubeWidth, _thisCoilType, _thisCoilLength, thisTotalNumberOfTubes, _RefType, _thisAirFlow, _thisDeltaTemperature, _CondensingTemperature, thisAverageDsTemperature, thisAverageScTemperature)


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'INITIAL PREDICTION OF THE HEAT FLOW RATE.- Ok
        thisRequestedCapacity_COND_0 = TkCondenserStartingPointCapacities.CoilStandardCapacity(_thisCoilType, _thisCoilLength, "R-404A", _thisAirFlow, _thisDeltaTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Inizializzazione delle percentuali di SubCooling e DeSuperheating - Ok
        this_Ds_Percent = 0.1
        this_Sc_Percent = 0.05
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        ' HERE THE NEWTON-RAPHSON ITERATION STARTS to calculate the condenser core capacity 
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        'Here the NEWTON-RAPHSON iteration, to calculate the condenser core capacity, begins 
        For i = 0 To 50

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'FIRST STARTING-POINT PREDICTION OF THE REFRIGERANT ENTHALPY GAPS [W], DURING MONOPHASE FLOW THROUGH THE MICROCHANNEL CONDENSER. 

            'DeSuperheating Enthalpy Gap [W] - Starting Point Estimation -OK
            Heat_h_DS_Refr = thisDelta_h_DS_Refr * Refrigerant_MassFlowRate_OLD

            'From [W] -----> to [kW] -  C. Gnesutta, January 8th, 2018.-OK
            Heat_h_DS_Refr = (Heat_h_DS_Refr / 1000)

            'Subcooling  Enthalpy Gap [W] - Starting Point Estimation-OK
            Heat_Sc_Refr = thisDelta_h_Sc_Refr * Refrigerant_MassFlowRate_OLD

            'From [W] -----> to [kW]  -  C. Gnesutta, January 8th, 2018.-OK
            Heat_Sc_Refr = (Heat_Sc_Refr / 1000)

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            '(Number of passes of the microchannel core =1)
            If (this_NumberOfPasses = 1) Then

                'This (refrigerant mass flow rate/port) - 1 pass microchannel cores. - December 21st, 2018 -OK
                'C. Gnesutta, March 15th, 20188 -OK
                Refrigerant_MassFlowRate_PerPort = (Refrigerant_MassFlowRate_OLD / (NumberOfPorts * thisTotalNumberOfTubes))

                'OK
                ' Calculation of the desuperheating surface area [m^2] -OK -OK
                'OK - C. Gnesutta, March 15th, 2018.
                ' OK - Checked again by C. Gnesutta on April 17th 2018.
                'OK- Checked by C. Gnesutta on April 18th 2018. -OK
                this_Ds_Area = CalculationOfTheMonoPhase_DeSuperHeating_Area(_microchannelTubeWidth, _thisCoilType, _RefType, _CondensingTemperature, _thisDeltaTemperature, _this_CP_Air, _this_Rho_Air, _Dt_DeSuperHeating, AirSideHeatExchangeCoefficient, this_Prime_Surface, this_TUBE_Internal_Surface, this_External_Fin_Surface, this_Overall_Fin_Efficiency, Refrigerant_MassFlowRate_PerPort, NumberOfPorts, Heat_h_DS_Refr, thisTkTubeThickness, this_Ds_Percent)

                'OK
                ' Calculation of the subcooling surface area [m^2] -OK -OK
                'C. Gnesutta, January 8th, 2018.
                'OK - C. Gnesutta, March 15th, 2018.
                ' OK - Checked again by C. Gnesutta on April 17th 2018.
                'OK- Checked by C. Gnesutta on April 18th 2018. -OK
                this_Sc_Area = CalculationOfTheMonoPhase_SubCooling_Area(_microchannelTubeWidth, _thisCoilType, _RefType, _CondensingTemperature, _thisDeltaTemperature, _this_CP_Air, _this_Rho_Air, _Dt_SubCooling, AirSideHeatExchangeCoefficient, this_Prime_Surface, this_TUBE_Internal_Surface, this_External_Fin_Surface, this_Overall_Fin_Efficiency, Refrigerant_MassFlowRate_PerPort, NumberOfPorts, Heat_Sc_Refr, thisTkTubeThickness, this_Sc_Percent)

                'CALCULATION OF THE THERMODYNAMICS OF THE MICROCHANNEL CORE - January 8th, 2018.

                'Calculation of the Core condensing area [m^2]
                'C. Gnesutta, January 8th, 2018. 
                this_Cond_Area = (this_TUBE_Internal_Surface - this_Ds_Area - this_Sc_Area)

                'OK
                'Calculation of the % Area, where the Superheated Gas Desuperheats 
                this_Ds_Percent = Int(100 * (this_Ds_Area / this_TUBE_Internal_Surface)) / 100

                'OK
                'Calculation of the % of the condensing Area  
                this_Cond_Percent = Int(100 * (this_Cond_Area / this_TUBE_Internal_Surface)) / 100

                'OK
                'Calculation of the % Area where the subcooled liquid subcools 
                this_Sc_Percent = Int(100 * (this_Sc_Area / this_TUBE_Internal_Surface)) / 100

                ' OK - controllato. C. Gnesutta, 15 marzo 2018
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                ' ONE PASS CASE 
                'DeSuperheating segment of the core [mm] - ONE PASS CASE
                'OK
                this_Ds_length = Int(_thisCoilLength * this_Ds_Percent)

                'OK
                'Condensing segment of the core [mm]  - ONE PASS CASE
                this_Cond_length = Int(_thisCoilLength * this_Cond_Percent)

                'OK
                'Subcooling segment of the core [mm]  - ONE PASS CASE
                this_Sc_length = Int(_thisCoilLength * this_Sc_Percent)

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'ONE PASS - Struttura di Controllo. 
                'Controls due to our experience
                If this_Ds_length > _thisCoilLength Then
                    'MsgBox("The Desuperheating region is too long")
                    this_Ds_length = 0.95 * _thisCoilLength

                Else

                End If

                If this_Sc_length > _thisCoilLength Then
                    'MsgBox("The Subcooling region is too long")
                    this_Sc_length = 0.95 * _thisCoilLength

                Else

                End If

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                VaporQualitySTART = 1
                VaporQualityEND = 0

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Calculation of the Refrigerant-Side Average Heat Exchange Coefficient -ONE SINGLE PASS
                'C. Gnesutta, January 8th, 2018. 
                'Ok - Checked by C. Gnesutta. March 15th, 2018.
                'OK- Checked by C. Gnesutta on April 18th 2018. 
                RefrigerantSideAverageAlpha = RefrSideAverAlpha(_RefType, _microchannelTubeWidth, Refrigerant_MassFlowRate_PerPort, thisCondensingPressure, _CondensingTemperature, VaporQualitySTART, VaporQualityEND)

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'First estimation of the Overall Heat Transfer coefficient [W/(m^2*°K)]
                'We can calculate the Overall heat transfer over the whole microchannel core, because only the ratio ( this_External_Fin_Surface/A_tube) is important
                'C. Gnesutta, January 8th, 2018.
                ' OK- Checked by C. Gnesutta, March 16th, 2018.
                'OK- Checked by C. Gnesutta on April 18th 2018. 
                thisOverallAverageHeatTransferCoefficient = HeatTransferEquations.CalculateOverallHeatTransferCoefficient(_microchannelTubeWidth, RefrigerantSideAverageAlpha, AirSideHeatExchangeCoefficient, AlHeatConductionCoeff, (this_Cond_Percent * this_Prime_Surface), (this_Cond_Percent * this_TUBE_Internal_Surface), (this_Cond_Percent * this_External_Fin_Surface), thisTkTubeThickness, this_Overall_Fin_Efficiency)

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'CENTRAL PART OF THE ALGORITHM TO SOLVE MICROCHANNEL CORES
                ' The heat capacity is estimated by looking for the values of the
                ' Heat Power released Q_dot that are roots of the following function 
                ' g= e^(-NTU)-1 + (qdot/qdotmax) - (qdot is a solution if g(qdot) =0 )
                'OK

                Cmin = Calculation_Of_Cim(_this_CP_Air, _thisAirFlow * this_Cond_Percent, _this_Rho_Air)

                'OK
                'Calculation of the value of Qmax (a 15% correction factor has been introduced).
                Qmax = Cmin * _thisDeltaTemperature

                'Update the Heat Power released by the Microchannel condenser [kW] - ONLY CONDENSATION
                ' Checked - C. Gnesutta, March 16th 2018. - OK
                Qdot_NEW_cond = Calculation_Qdot(thisRequestedCapacity_COND_0, Refrigerant_MassFlowRate_PerPort, Qmax, _RefType, _microchannelTubeWidth, thisCondensingPressure, _CondensingTemperature, Cmin, this_Cond_Area, thisOverallAverageHeatTransferCoefficient, AirSideHeatExchangeCoefficient, AlHeatConductionCoeff, this_Prime_Surface, this_TUBE_Internal_Surface, this_External_Fin_Surface, thisTkTubeThickness, this_Overall_Fin_Efficiency, VaporQualitySTART, VaporQualityEND, this_Cond_Percent)

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiornamento delle variabili da determinare iterativamente: flusso di massa e resa termica della batteria.
                'Ok - Checked - C. Gnesutta, March 15th 2018.
                'ONLY CONDENSATION


                Refrigerant_MassFlowRate_OLD = CalculationOfTheRefrigerantMassFlowRate(_RefType, Qdot_NEW_cond, _CondensingTemperature)

                'Update the Heat Power released by the Microchannel condenser [kW] - ONLY CONDENSATION
                thisRequestedCapacity_COND_0 = Qdot_NEW_cond

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'Corretta da C. Gnesutta il 7 Febbraio 2018.
                'Refr_MassFlowRate_FIN = Refrigerant_MassFlowRate_OLD

            Else
                'MULTIPASSS MICROCHANNEL CORE

                ' IMPORTANT REMARK: The ITERATION MUST BE CALCULATED OVER AN AVERAGE HEAT EXCHANGE COEFFICIENT, DUE TO THE VARIATION OF THE (MASS-FLOW RATE /PORT)
                ' The number of tubes /pass chanbges and therefore changes the refrigerant mass-flow rate /port. The Newton iteration must be calculated over average
                ' heat exchange coefficient values. C. Gnesutta, March 19th, 2018.
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'PRELIMINARY CALCULATION OF THE SUB-COOLING & DESUPERHEATING REGIONS
                'C. Gnesutta, March 16th, 2018. - MULTIPASS microchannel core 
                'Refrigerant Mass Flow Rate per port in the Desuperheating region [kg/s]- OK
                'Ok- Checked by C. Gnesutta, March 16th 2018
                thisMdot_Ds = Refrigerant_MassFlowRate_OLD / (NumberOfPorts * PassTubes(0))

                'Refrigerant Mass Flow Rate per port in the SubCooling region [kg/s]- OK
                'C. Gnesutta, March 16th, 2018. - MULTIPASS microchannel core 
                'Ok- Checked by C. Gnesutta, March 16th 2018
                thisMdot_Sc = Refrigerant_MassFlowRate_OLD / (NumberOfPorts * PassTubes(this_NumberOfPasses - 1))
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Calculation of the subcooling area surface [m^2] - SubCooling Heat Power Released in [kW] - MULTI-PASS MICROCHANNEL CONDENSER- OK OK
                'C. Gnesutta, January 8th, 2018.
                ' OK- C. Gnesutta, March 19th 2018. - Ok- Checked
                ' OK - Checked again by C. Gnesutta on April 17th 2018.
                this_Ds_Area = CalculationOfTheMonoPhase_DeSuperHeating_Area(_microchannelTubeWidth, _thisCoilType, _RefType, _CondensingTemperature, _thisDeltaTemperature, _this_CP_Air, _this_Rho_Air, _Dt_DeSuperHeating, AirSideHeatExchangeCoefficient, this_Prime_Surface, this_TUBE_Internal_Surface, this_External_Fin_Surface, this_Overall_Fin_Efficiency, thisMdot_Ds, NumberOfPorts, Heat_h_DS_Refr, thisTkTubeThickness, this_Ds_Percent)

                ' Calculation of the subcooling area surface [m^2] - SubCooling Heat Power Released in [kW] - MULTI-PASS MICROCHANNEL CONDENSER - OK OK
                'C. Gnesutta, January 8th, 2018.
                ' OK- C. Gnesutta, March 19th 2018. - Ok- Checked
                ' OK - Checked again by C. Gnesutta on April 17th 2018.
                this_Sc_Area = CalculationOfTheMonoPhase_SubCooling_Area(_microchannelTubeWidth, _thisCoilType, _RefType, _CondensingTemperature, _thisDeltaTemperature, _this_CP_Air, _this_Rho_Air, _Dt_SubCooling, AirSideHeatExchangeCoefficient, this_Prime_Surface, this_TUBE_Internal_Surface, this_External_Fin_Surface, this_Overall_Fin_Efficiency, thisMdot_Sc, NumberOfPorts, Heat_Sc_Refr, thisTkTubeThickness, this_Sc_Percent)

                'Calculation of the Core condensing area [m^2] - MULTI-PASS MICROCHANNEL CONDENSER
                'C. Gnesutta, January 8th, 2018. 
                ' OK- C. Gnesutta, March 16th 2018.. - Ok- Checked- OK OK
                this_Cond_Area = (this_TUBE_Internal_Surface - this_Ds_Area - this_Sc_Area)

                'Calculation of the % Area, where the Superheated Gas Desuperheats - MULTI-PASS MICROCHANNEL CONDENSER
                ' OK- C. Gnesutta, March 16th 2018.. - Ok- Checked
                'Ok- Ricontrollato. C. Gnesutta, 20 Marzo 2018.
                this_Ds_Percent = Int(100 * (this_Ds_Area / this_TUBE_Internal_Surface)) / 100

                'Calculation of the % of the condensing Area  
                ' OK- C. Gnesutta, March 16th 2018.. - Ok- Checked
                'Ok- Ricontrollato. C. Gnesutta, 20 Marzo 2018.
                this_Cond_Percent = Int(100 * (this_Cond_Area / this_TUBE_Internal_Surface)) / 100

                'Calculation of the % Area where the subcooled liquid subcools - MULTI-PASS MICROCHANNEL CONDENSER
                ' OK- C. Gnesutta, March 16th 2018.. - Ok- Checked
                'Ok- Ricontrollato. C. Gnesutta, 20 Marzo 2018.
                this_Sc_Percent = Int(100 * (this_Sc_Area / this_TUBE_Internal_Surface)) / 100

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'MULTI-PASS MICROCHANNEL CONDENSER

                'DeSuperheating segment of the core [mm] - MULTI-PASS PASS CASE
                'Ok - Checked by C. Gnesutta on February, 7th 2018.
                'Ok- Ricontrollato. C. Gnesutta, 20 Marzo 2018. -OK
                this_Ds_length = (_thisCoilLength) * (thisTotalNumberOfTubes / PassTubes(0)) * this_Ds_Percent


                'Subcooling segment of the core [mm]  - MULTI-PASS PASS CASE
                'Ok - Checked by C. Gnesutta on February, 7th 2018.
                'Ok- Ricontrollato. C. Gnesutta, 20 Marzo 2018. -OK
                this_Sc_length = (_thisCoilLength) * (thisTotalNumberOfTubes / PassTubes(this_NumberOfPasses - 1)) * this_Sc_Percent


                'Controls due to our experience (evitare l'allegamento del condensatore o bolle di gas caldo nel collettore in uscita).
                If this_Ds_length > _thisCoilLength Then

                    'MsgBox("The Desuperheating region is too long")
                    this_Ds_length = 0.95 * _thisCoilLength

                Else

                End If

                'Controls due to our experience (evitare l'allegamento del condensatore o bolle di gas caldo nel collettore in uscita).
                If this_Sc_length > _thisCoilLength Then

                    'MsgBox("The Subcooling region is too long")
                    this_Sc_length = 0.95 * _thisCoilLength

                Else

                End If

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Condensing segment of the core [mm]  - MULTI-PASS PASS CASE
                this_Cond_length = (this_NumberOfPasses * _thisCoilLength) - this_Ds_length - this_Sc_length
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Iterative Cycle over the Number of Passes
                'Weighted mean of the refrigerant-side heat exchange coefficient over the number of
                'tubes of the microchannel core.
                'C.Gnesutta, January 10th, 2018.

                DeltaAlpha = 0

                thisOverallAverageHeatTransferCoefficient = 0

                For r = 0 To (this_NumberOfPasses - 1)

                    'Ok- Ricontrollato. C. Gnesutta, 19 marzo 2018.
                    sigma = (PassTubes(r) / thisTotalNumberOfTubes)

                    this_Overall_Fin_Efficiency_forPass = HeatTransferEquations.CalculateOverallFinEfficiency(FinEfficiency, (sigma * this_Prime_Surface), (sigma * this_External_Fin_Surface))

                    VaporQualitySTART = Calculation_Of_TheQualityOfTheGas(r, this_NumberOfPasses, _thisCoilLength, this_Sc_length, this_Ds_length, "START")

                    VaporQualityEND = Calculation_Of_TheQualityOfTheGas(r, this_NumberOfPasses, _thisCoilLength, this_Sc_length, this_Ds_length, "END")

                    Refrigerant_MassFlowRate_PerPort = Refrigerant_MassFlowRate_OLD / (NumberOfPorts * PassTubes(r))

                    'Calculation of the Refrigerant-Side Average Heat Exchange Coefficient -ONE SINGLE PASS
                    'C. Gnesutta, January 10th, 2018.
                    RefrigerantSideAverageAlpha = RefrSideAverAlpha(_RefType, _microchannelTubeWidth, Refrigerant_MassFlowRate_PerPort, thisCondensingPressure, _CondensingTemperature, VaporQualitySTART, VaporQualityEND)

                    'Overall Heat Transfer coefficient [W/(m^2*°K)]
                    'We can calculate the Overall heat transfer over the whole microchannel core, because only the ratio ( this_External_Fin_Surface/A_tube) is important
                    'C. Gnesutta, January 10th, 2018.
                    DeltaAlpha = HeatTransferEquations.CalculateOverallHeatTransferCoefficient(_microchannelTubeWidth, RefrigerantSideAverageAlpha, AirSideHeatExchangeCoefficient, AlHeatConductionCoeff, (sigma * this_Prime_Surface), (sigma * this_TUBE_Internal_Surface), (sigma * this_External_Fin_Surface), thisTkTubeThickness, this_Overall_Fin_Efficiency_forPass)

                    'We preferred to calculate the average value of the Overall Average Heat Transfer Coefficient
                    ' Calcolo della media pesata sul numero di tubi (trascurate aree di subcooling e desuperheating),
                    ' tra i diversi coefficienti di scambio temico globale 
                    'C. Gnesutta, 20 Marzo 2018.
                    thisOverallAverageHeatTransferCoefficient = thisOverallAverageHeatTransferCoefficient + ((PassTubes(r) / thisTotalNumberOfTubes) * DeltaAlpha)

                Next r

                '-------//-------

                'Reduced values for the derivative in the Newton-Raphson  iteration for the multipass microchannel core.
                'C. Gnesutta, 19 Marzo 2018.

                thisOverallAverageREDUCED_Alpha = 0

                For r = 0 To (this_NumberOfPasses - 1)

                    'Fattore correttivo legato alla geometria della batteria microcanale (estensione di ciascun passo)
                    sigma = (PassTubes(r) / thisTotalNumberOfTubes)

                    this_Overall_Fin_Efficiency_forPass = HeatTransferEquations.CalculateOverallFinEfficiency(FinEfficiency, (sigma * this_Prime_Surface), (sigma * this_External_Fin_Surface))

                    VaporQualitySTART = Calculation_Of_TheQualityOfTheGas(r, this_NumberOfPasses, _thisCoilLength, this_Sc_length, this_Ds_length, "START")

                    VaporQualityEND = Calculation_Of_TheQualityOfTheGas(r, this_NumberOfPasses, _thisCoilLength, this_Sc_length, this_Ds_length, "END")

                    REDUCED_Ref_MassFlowRate_PerPort = (0.95 * Refrigerant_MassFlowRate_OLD) / (NumberOfPorts * PassTubes(r))

                    'Calculation of the Refrigerant-Side Average Heat Exchange Coefficient -MULTI PASS
                    'C. Gnesutta, January 10th, 2018.
                    RefrigerantSideAverageAlpha = RefrSideAverAlpha(_RefType, _microchannelTubeWidth, REDUCED_Ref_MassFlowRate_PerPort, thisCondensingPressure, _CondensingTemperature, VaporQualitySTART, VaporQualityEND)

                    'Overall Heat Transfer coefficient [W/(m^2*°K)]
                    'We can calculate the Overall heat transfer over the whole microchannel core, because only the ratio ( this_External_Fin_Surface/A_tube) is important
                    'C. Gnesutta, January 10th, 2018.
                    'Il primo l'ultimo passo è approssimato, perché si trascura l'area dedicata al subcooling e desuperheating.
                    DeltaAlpha_REDUCED = HeatTransferEquations.CalculateOverallHeatTransferCoefficient(_microchannelTubeWidth, RefrigerantSideAverageAlpha, AirSideHeatExchangeCoefficient, AlHeatConductionCoeff, (sigma * this_Prime_Surface), (sigma * this_TUBE_Internal_Surface), (sigma * this_External_Fin_Surface), thisTkTubeThickness, this_Overall_Fin_Efficiency_forPass)

                    ' Calcolo della media pesata sul numero di tubi (trascurate aree di subcooling e desuperheating),
                    ' tra i diversi coefficienti di scambio temico globale 
                    'C. Gnesutta, 20 Marzo 2018.
                    thisOverallAverageREDUCED_Alpha = thisOverallAverageREDUCED_Alpha + ((PassTubes(r) / thisTotalNumberOfTubes) * DeltaAlpha_REDUCED)
                Next r

                'Reduced values for the derivative in the Newton-Raphson  iteration for the multipass microchannel core.
                'C. Gnesutta, 19 Marzo 2018.

                'CENTRAL PART OF THE ALGORITHM TO SOLVE MICROCHANNEL CORES
                ' The heat capacity is estimated by looking for the values of the
                ' Heat Power released Q_dot that are roots of the following function 
                ' g= e^(-NTU)-1 + (qdot/qdotmax) - (qdot is a solution if g(qdot) =0 )
                'C. Gnesutta, January 10th 2018.
                ' CASO MULTIPASSO, CALCOLATO SU VALORI MEDI DEL COEFFICIENTE DI SCAMBIO TERMICO GLOBALE. - 'OK

                'In realtà dovrebbe essere considerata solo la porzione dove c'è condensazione.
                Cmin = Calculation_Of_Cim(_this_CP_Air, this_Cond_Percent * _thisAirFlow, _this_Rho_Air)

                'Calculation of the value of Qmax - OK
                Qmax = Cmin * _thisDeltaTemperature

                'Update the Heat Power released by the Microchannel condenser [kW] - DURING CONDENSATION.
                'Ok - Checked by C. Gnesutta on April 17th 2018.

                Qdot_NEW_cond = MultiPassCalculation_Qdot(thisRequestedCapacity_COND_0, Qmax, _RefType, _microchannelTubeWidth, thisCondensingPressure, _CondensingTemperature, Cmin, this_Cond_Area, thisOverallAverageHeatTransferCoefficient, thisOverallAverageREDUCED_Alpha, this_Cond_Percent)

                'MsgBox(thisCondensingPressure / 100000)
                'Update the Refrigerant Mass Flow Rate [kg/s]
                Refrigerant_MassFlowRate_OLD = CalculationOfTheRefrigerantMassFlowRate(_RefType, Qdot_NEW_cond, _CondensingTemperature)

                'MsgBox(Refrigerant_MassFlowRate_OLD)
                'Heat Released - DURING CONDENSATION [kW].
                thisRequestedCapacity_COND_0 = Qdot_NEW_cond

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                Refr_MassFlowRate_FIN = Refrigerant_MassFlowRate_OLD

            End If

        Next i


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Correzioni sperimentali
        'Aggiunta da C. Gnesutta il 9 Maggio 2018 per allimeare i risultati al caso sperimentale.
        If this_NumberOfPasses = 1 Then

            Qdot_NEW_cond = Qdot_NEW_cond * 1.2
        Else
            'Correzione eliminata. C. Gnesutta, 30 Maggio 2018
            Qdot_NEW_cond = Qdot_NEW_cond * 1.7
        End If

        FinQdot_NEW_cond = Qdot_NEW_cond + Heat_h_DS_Refr + Heat_Sc_Refr

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        Select Case True

            'Commercial increasing of the heat power exchanged, due to a commercial decision 
            'of Mr. Masimo De Marco, March 30th, 2015
            Case _microchannelTubeWidth = "25"


                FinQdot_NEW_cond = FinQdot_NEW_cond * 1.2


            Case _microchannelTubeWidth = "32"

                If this_NumberOfPasses = 1 Then

                    FinQdot_NEW_cond = FinQdot_NEW_cond * 1.05

                Else

                End If

            Case Else

        End Select




        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'This choice was necessary to eliminate some oscillations in the final solution
        'Added by C. Gnesutta, June 20th, 2018.
        If (_thisDeltaTemperature_temp = 15 And _CondensingTemperature_temp = 40) Then

        Else

            FinQdot_NEW_cond = FinQdot_NEW_cond * (_thisDeltaTemperature_temp / 15)

        End If

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'GLOBAL VARIABLES

        'OK - C. Gnesutta, June 21st 2018
        Global_Ds_Area = this_Ds_Area

        'OK - C. Gnesutta, June 21st 2018
        Global_Cond_Area = this_Cond_Area

        'OK - C. Gnesutta, June 21st 2018
        Global_Sc_Area = this_Sc_Area

        'OK - C. Gnesutta, June 21st 2018
        Global_Ds_length = this_Ds_length

        'OK - C. Gnesutta, June 21st 2018
        Global_Sc_length = this_Sc_length

        'OK - C. Gnesutta, June 21st 2018
        Global_Cond_length = this_Cond_length

        'OK - C. Gnesutta, June 21st 2018
        Global_this_Ds_Percent = this_Ds_Percent

        'OK - C. Gnesutta, June 21st 2018
        Global_this_Sc_Percent = this_Sc_Percent

        'OK - C. Gnesutta, June 21st 2018
        Global_this_Cond_Percent = this_Cond_Percent

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Return FinQdot_NEW_cond

    End Function
#End Region

#Region "LMTD Calculation for the Microchannel Condenser Monophase Region"

    'For the theory please see: R.K. Shah 6 D.p Sekulic, <<Fundamentals of Heat Exchager Design>> par.3.7.1  
    'Ok - Veriificato nuovamente da C. Gnesutta il 13 marzo 2018
    ' Correction factor.  R.K. Shah 6 D.p Sekulic, <<Fundamentals of Heat Exchager Design>> , eq. 3.183, pag. 188.
    'OK - Checked by C. Gnesutta on April 16th 2018.
    Public Function F_Correction_Factor(ByVal Tin_air As Double, ByVal Tout_air As Double, ByVal Tin_Refr As Double, ByVal Tout_Refr As Double) As Double


        'OK - Checked again by C. Gnesutta on March 14th, 2018
        'For the theory please see: R.K. Shah 6 D.p Sekulic, <<Fundamentals of Heat Exchager Design>> par.3.7.2  
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        ' Fluid 1 - Unmixed (Refrigerant)
        ' Fluid 2  Mixed (Cooling air)
        ' The 2 flows are axymmetric.
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        'C. Gnesutta, December 20th, 2017.
        'OK - Verificata da C. Gnesutta il 12 Febbraio 2018. 

        Dim this_R As Double = 0

        Dim this_P As Double = 0

        Dim this_Corr_Factor_F As Double = 0

        Dim this_Alpha_F As Double = 0

        Dim this_BETA_F As Double = 0

        Dim this_GAMMA_F As Double = 0


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'OK - CHECKED again by C. Gnesutta on March 14th 2018.

        'R.K. Shah 6 D.p Sekulic, <<Fundamentals of Heat Exchager Design>> par.3.5.1, eq. 3.96  
        'OK - Checked
        this_P = (Tout_Refr - Tin_Refr) / (Tin_air - Tin_Refr)

        'R.K. Shah 6 D.p Sekulic, <<Fundamentals of Heat Exchager Design>> par.3.5.1, eq. 3.105  
        'OK - Checked
        this_R = (Tin_air - Tout_air) / (Tout_Refr - Tin_Refr)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        this_Alpha_F = (1 - this_R * this_P) / (1 - this_P)

        this_GAMMA_F = (1 / this_R) * Log(1 - this_R * this_P)

        'Ok. Checked again carefully by C. Gnesutta on March 14th, 2018. 
        this_Corr_Factor_F = Log(this_Alpha_F) / ((this_R - 1) * Log(1 + this_GAMMA_F))

        Return this_Corr_Factor_F

    End Function


    'OK - Checked by Cristiano Gnesutta on April 16th 2018.
    Public Function OutputAirAverageTemperature(ByVal _thisVolumetricAirFlowRate As Double, ByVal _thisHeatFlowRate As Double, ByVal _thisCP_Air As Double, ByVal _thisRho_Air As Double, ByVal _thisInletAirTemp As Double) As Double

        'OK - Verifica finale di C.  Gnesutta, 12 Febbraio 2018.
        'Ok - Veriificato nuovamente da C. Gnesutta il 13 marzo 2018

        'Average temperature of the cooling air @inlet [C]
        Dim thisInletAirTemp As Double = 0

        'Be careful! The heat flow rate must be turn from [kW] ----->[W]
        thisInletAirTemp = (1000 * _thisHeatFlowRate) / (_thisCP_Air * _thisRho_Air * (_thisVolumetricAirFlowRate / 3600)) + _thisInletAirTemp

        Return thisInletAirTemp

    End Function


    'Checked by Cristiano Gnesutta on October 26th 2018 - OK
    Public Function thisLMTDAverageTemperature(ByVal _thisMonoPhase_Inlet_Temper_Refrig As Double, ByVal _thisMonoPhase_Outlet_Temper_Refrig As Double, ByVal _thisMonoPhase_Inlet_Temper_Air As Double, ByVal _thisMonoPhase_Outlet_Temper_Air As Double) As Double

        Dim thisLMTD_MonoPhaseTemperature As Double = 0

        Dim thisDeltaT_01 As Double = 0

        Dim thisDeltaT_02 As Double = 0

        'For the theory please see: R.K. Shah & D.P. Sekulic, <<Fundamentals of Heat Exchager Design>> par.3.7.2, eq.3.173 
        ' The second term has been changed, with respect to the above-mentioned eq.3.173,  to the cooling air average temperature @inlet
        ' to reproduce the experimental data

        'Checked by Cristiano Gnesutta on October 26th 2018. - OK
        thisDeltaT_01 = _thisMonoPhase_Inlet_Temper_Refrig - _thisMonoPhase_Outlet_Temper_Air

        'For the theory please see: R.K. Shah & D.P. Sekulic, <<Fundamentals of Heat Exchager Design>> par.3.7.2, eq.3.173 
        'Checked by Cristiano Gnesutta on October 26th 2018. - OK
        thisDeltaT_02 = _thisMonoPhase_Outlet_Temper_Refrig - _thisMonoPhase_Inlet_Temper_Air


        'Checked by Cristiano Gnesutta on October 26th 2018. - OK
        thisLMTD_MonoPhaseTemperature = (thisDeltaT_01 - thisDeltaT_02)


        'OK - C. Gnesutta, October 26th 2018.
        If ((thisDeltaT_01 / thisDeltaT_02) = 1 Or (thisDeltaT_01 / thisDeltaT_02) <= 0) Then

        Else
            thisLMTD_MonoPhaseTemperature = thisLMTD_MonoPhaseTemperature / Log(thisDeltaT_01 / thisDeltaT_02)

        End If




        Return thisLMTD_MonoPhaseTemperature
    End Function

#End Region

#Region "Geometry of the Microchannel Coil"

    'Calculation of the number of tubes of the microchannel coil.
    'C. Gnesutta, December 14th, 2017.
    Public Sub NumberOfTubesOfTheMicrochannelCoil(ByVal _thisCoilType As String)

        Dim testLen As Int16 = 0

        Dim this_TotalNumberOfTubes As Integer = 0

        Dim this_CoilNumberOfTubes() As String

        Dim this_TEMP_CoilNumberOfTubes() As String

        Dim kj As Integer = 0

        'Number of characters of the name of the microchannel core.
        testLen = Len(_thisCoilType)

        ReDim this_CoilNumberOfTubes(testLen)

        ReDim PassTubes(testLen)

        ReDim this_TEMP_CoilNumberOfTubes(testLen)

        Dim DistanceOfTubes As Double = FinHeight
        Dim HeightOfTubes As Double = TubeHeight

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Splitting of the name of the microchannel coil for the extraction of useful microchannel data
        'C. Gnesutta, December 14th, 2017.

        'Fist splitting operation
        this_CoilNumberOfTubes = Split(_thisCoilType, "-")

        'Final splitting of the coil name (splitting of the complex first term)
        this_TEMP_CoilNumberOfTubes = Split(this_CoilNumberOfTubes(0), "u")

        'We update the first term of the vector of the numbers of tubes.
        this_CoilNumberOfTubes(0) = this_TEMP_CoilNumberOfTubes(1)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        For Each TubePerPass In this_CoilNumberOfTubes

            If (Val(TubePerPass) > 0 And IsNumeric(TubePerPass)) Then

                'Determination of the total number of tubes of the microchannel core.
                thisTotalNumberOfTubes = thisTotalNumberOfTubes + Int(TubePerPass)

                'Determination of the number of tubes / each pass of the microchannel core.
                PassTubes(this_NumberOfPasses) = CInt(TubePerPass)

                'Calculation of the number of passes. C. Gnesutta, December 14th, 2017.
                this_NumberOfPasses = this_NumberOfPasses + 1

            Else

            End If

        Next

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the width of each region (i.e. pass) of the microchannel condensing core 
        'C. Gnesutta, December 14th, 2017.
        ReDim thisPasswidth(this_NumberOfPasses - 1)

        'Final calculation of the width of each region (i.e. pass) of the microchannel condensing core 
        'C. Gnesutta, December 14th, 2017.
        'Width of each pass [m]

        For kj = 0 To this_NumberOfPasses - 1
            thisPasswidth(kj) = ((DistanceOfTubes + HeightOfTubes) / 1000) * PassTubes(kj) + (DistanceOfTubes / 1000)
        Next

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

    End Sub

#End Region


#Region "CALCULATION OF THE GAS QUALITY"

    'In this section the quality of the refrigerant gas has been considered for multi-pass microchannel condenser cores
    'Fondamental hypothesis: I assumed a linear distribution of the quality of the vapor. 
    'C. Gnesutta, January 9th, 2018.

    'OK - Checked by C. Gnesutta, on February 7th, 2018.
    Public Function Calculation_Of_TheQualityOfTheGas(ByVal _thisPassNumber As Int16, ByVal _NumberofPasses As Int16, ByVal _CoilLength As Double, ByVal _Sc_Length As Double, ByVal _Ds_Length As Double, ByVal _pos As String) As Double


        Dim q As Int16 = _thisPassNumber

        'Number of passes to DeSuperheat
        Dim k As Double = 0

        'Curvilinear Position where condensing proccess starts [mm]
        Dim x As Double = 0

        'Number of passes to Subcool
        Dim j As Double = 0

        Dim _thisCondensingLength As Double = 0

        Dim _thisVQ As Double = 0

        Dim _VaporQualitySTART As Double = 0
        Dim _VaporQualityEND As Double = 0


        '################################################################################
        'Calculation of the condensing length [mm]
        _thisCondensingLength = (_NumberofPasses * _CoilLength) - (_Sc_Length + _Ds_Length)
        '################################################################################

        ' We preferred to adopt this prolix structure of the code to improve its readability.
        'C. Gnesutta, January 10th, 2018

        Select Case True

            Case _NumberofPasses = 1

                _VaporQualitySTART = 1

                _VaporQualityEND = 0


            Case _NumberofPasses = 2

                Select Case True

                    Case q = 0

                        _VaporQualitySTART = 1

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)


                    Case q = 1


                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)


                        _VaporQualityEND = 0
                    Case Else
                End Select

            Case _NumberofPasses = 3

                Select Case True

                    Case q = 0

                        _VaporQualitySTART = 1

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 1

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)


                    Case q = 2

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 0

                    Case Else
                End Select



            Case _NumberofPasses = 4

                Select Case True

                    Case q = 0

                        _VaporQualitySTART = 1

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 1

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 2

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 3

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)


                        _VaporQualityEND = 0

                    Case Else
                End Select


            Case _NumberofPasses = 5

                Select Case True

                    Case q = 0

                        _VaporQualitySTART = 1

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 1

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 2

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 3

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 4

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 0

                    Case Else
                End Select


            Case _NumberofPasses = 6

                Select Case True

                    Case q = 0

                        _VaporQualitySTART = 1

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 1

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 2

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 3

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 4

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 1 - (((q + 1) * _CoilLength - _Ds_Length) / _thisCondensingLength)

                    Case q = 5

                        _VaporQualitySTART = 1 - ((q * _CoilLength - _Ds_Length) / _thisCondensingLength)

                        _VaporQualityEND = 0
                    Case Else
                End Select


            Case Else

                _VaporQualitySTART = 1

                _VaporQualityEND = 0

        End Select


        If (_pos = "START") Then
            _thisVQ = _VaporQualitySTART

        Else
            _thisVQ = _VaporQualityEND

        End If

        Return _thisVQ
    End Function

#End Region


#Region "Determination of the Refrigerant Mass Flow Rate [kg/s]"

    'Initial determination of the mass flow rate

    'INITIAL REFRIGERANT MASS-FLOW RATE - OK, Checked
    'C. Gnesutta, 16 Aprile 2018.
    Public Function InitialPointPredictionOfTheRefrigerantMassFlowRate(ByVal _microchannelTubeWidth As String, ByVal _thisCoilType As String, ByVal _thisCoilLength As Double, ByVal _thisNumberOfTubes As Integer, ByVal _RefType As String, ByVal _thisAirFlow As Double, ByVal _thisDeltaTemperature As Double, ByVal _CondensingTemperature As Double, ByVal _Dt_DeSuperHeating As Double, ByVal _Dt_SubCooling As Double) As Double

        'Initial-point strategy for the iterative calculation of the mass-flow rate of the microchannel condenser
        'We preferred to use different a function for the determination of the Refrigerant Mass Flow Rate for sake of clarity.
        'C. Gnesutta, December 14th, 2017.
        'INITIAL POINT: Standard s=25°K, Sc=3°K

        'OK- FINAL CHECK - C. Gnesutta, January 12th, 2018.
        'OK
        Dim thisRefrSubCoolingPressure As Double = 0

        'OK
        Dim R404A_HeatFlowRate As Double = 0

        'OK
        Dim InitialPointMassFlowRate As Double = 0

        'OK
        Dim CondensingRefrigerantPressure As Double = 0

        'OK
        Dim thisInitialPointPredictionHeatPowerReleased_R404A As Double

        'OK
        Dim thisInitialPointRefrigerantFlowRate As Double

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Condensing specific latent heat [J/kg]
        Dim thisSpecificLatentHeat_Refrigerant As Double = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Enthalpy Specific Gap [J/kg], during condensed liquid sub-cooling and superheated gas de-superheating
        Dim Delta_h_DS_Refrigerant As Double = 0
        Dim Delta_h_SbCooling__Refrigerant As Double = 0
        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'A 0.5 °C desuperheating temperature shift is necessary for the numerical stability of the code
        Dim SuperheatedGasTemperature_Start As Double = _CondensingTemperature + _Dt_DeSuperHeating + 0.5
        Dim SuperheatedGasTemperature_End As Double = _CondensingTemperature + 0.5
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'A 0.5 °C subcooling temperature shift is necessary for the numerical stability of the code
        Dim SubCoolingTemperature_Start As Double = _CondensingTemperature - 0.5
        Dim SubCoolingTemperature_End As Double = _CondensingTemperature - _Dt_SubCooling - 0.5
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the condensing pressure @ condensing midpoint. With the assumption of linearity across the condensing process this assumption 
        'produces a sufficient accuracy - Pressure in [Pa]
        CondensingRefrigerantPressure = thisRefrigerantProperties.CalculationOfSaturationPressure(_RefType, _CondensingTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'The pressure of the subcooled liquid has been slightly increased for numerical stability reasons.
        ' C. Gnesutta, May 10th, 2018.
        thisRefrSubCoolingPressure = thisRefrigerantProperties.CalculationOfSaturationPressureBubblePoint(_RefType, _CondensingTemperature) + (5 * 1000)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Specific Enthalpy [J/kg] gap during the DeSuperheating process
        'C. Gnesutta, December 18th, 2017. 

        'OK
        Delta_h_DS_Refrigerant = thisRefrigerantProperties.CalculationOfGasSpecificEnthalpy(_RefType, CondensingRefrigerantPressure, SuperheatedGasTemperature_Start)

        'OK
        Delta_h_DS_Refrigerant = Delta_h_DS_Refrigerant - thisRefrigerantProperties.CalculationOfGasSpecificEnthalpy(_RefType, CondensingRefrigerantPressure, SuperheatedGasTemperature_End)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Specific Enthalpy  gap [J/kg] during the condensing process
        'C. Gnesutta, December 18th, 2017.

        'OK
        thisSpecificLatentHeat_Refrigerant = thisRefrigerantProperties.SpecificEnthalpySaturatedVapor(_RefType, _CondensingTemperature)

        'OK
        thisSpecificLatentHeat_Refrigerant = thisSpecificLatentHeat_Refrigerant - thisRefrigerantProperties.SpecificEnthalpyLiquidCondensingConditions(_RefType, _CondensingTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Specific Enthalpy  gap [J/kg] during the subcooling process
        'C. Gnesutta, December 18th, 2017.
        'OK
        Delta_h_SbCooling__Refrigerant = thisRefrigerantProperties.CalculationOfLiquidSpecificEnthalpy(_RefType, thisRefrSubCoolingPressure, SubCoolingTemperature_Start)

        'OK
        Delta_h_SbCooling__Refrigerant = Delta_h_SbCooling__Refrigerant - thisRefrigerantProperties.CalculationOfLiquidSpecificEnthalpy(_RefType, thisRefrSubCoolingPressure, SubCoolingTemperature_End)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the first initial-point prediction of the heat power exchanged by the microchannel coil, by using R404a
        'C. Gnesutta, December 18th, 2017.
        'OK- Checked by C. Gnesutta on April 16th 2018.
        thisInitialPointPredictionHeatPowerReleased_R404A = TkCondenserStartingPointCapacities.CoilStandardCapacity(_thisCoilType, _thisCoilLength, "R-404A", _thisAirFlow, _thisDeltaTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Initial-point prediction of the heat power exchanged [kW] -------> [W]
        thisInitialPointPredictionHeatPowerReleased_R404A = (thisInitialPointPredictionHeatPowerReleased_R404A * 1000)

        'Initial-point prediction of the refrigerant flow rate [kg/s] 
        'Ok - Ricontrollato da C. Gnesutta il 7 Febbraio 2018.
        'OK
        thisInitialPointRefrigerantFlowRate = thisInitialPointPredictionHeatPowerReleased_R404A / (Delta_h_DS_Refrigerant + thisSpecificLatentHeat_Refrigerant + Delta_h_SbCooling__Refrigerant)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Initial point refrigerant flow rate in [kg/s]. c. Gnesutta, 14 Marzo 2018.
        Return thisInitialPointRefrigerantFlowRate
    End Function

    'REFRIGERANT MASS-FLOW RATE - OK Checked (here the heat power flow is only due to the condensing phase).
    'C. Gnesutta, 16 Aprile 2018.
    'Ok- Checked by C. Gnesutta on April 16th 2018.
    Public Function CalculationOfTheRefrigerantMassFlowRate(ByVal _RefType As String, ByVal _thisQdot As Double, ByVal _CondensingTemperature As Double) As Double

        Dim CondensingRefrigerantPressure As Double = 0
        Dim thisRefrigerantFlowRate As Double

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Condensing specific latent heat [J/kg]
        Dim thisSpecificLatentHeat_Refrigerant As Double = 0
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the condensing pressure @ condensing midpoint. With the assumption of linearity across the condensing process this assumption 
        'produces a sufficient accuracy - Pressure in [Pa]
        CondensingRefrigerantPressure = thisRefrigerantProperties.CalculationOfSaturationPressure(_RefType, _CondensingTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Specific Enthalpy  gap [J/kg] during the condensing process
        'C. Gnesutta, December 18th, 2017.

        thisSpecificLatentHeat_Refrigerant = thisRefrigerantProperties.SpecificEnthalpySaturatedVapor(_RefType, _CondensingTemperature)

        thisSpecificLatentHeat_Refrigerant = thisSpecificLatentHeat_Refrigerant - thisRefrigerantProperties.SpecificEnthalpyLiquidCondensingConditions(_RefType, _CondensingTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Specific Enthalpy  gap [J/kg] during the subcooling process
        'C. Gnesutta, December 18th, 2017.


        '[kW]----->[W] - C. Gnesutta, January 9th, 2018.
        _thisQdot = (_thisQdot * 1000)

        'Calculation of the refrigerant flow rate [kg/s] 
        'OK - Ricontrollata da C. Gnesutta il 7 Febbraio 2018.
        thisRefrigerantFlowRate = (_thisQdot / thisSpecificLatentHeat_Refrigerant)


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        ' Refrigerant flow rate in [kg/s]
        Return thisRefrigerantFlowRate
    End Function


#End Region

    ' OK- Ricontrollato da C. Gnesuta il 14 marzo 2018.
#Region "AVERAGE HEAT TRANSFER COEFFICIENT FOR MICROCHANNEL CONDENSERS"

    Public Function RefrSideAverAlpha(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _Refrigerant_MassFlowRate_PerPort As Double, ByVal _thisCondensingPressure As Double, ByVal _CondensingTemperature As Double, ByVal _VaporQualitySTART As Double, ByVal _VaporQualityEND As Double) As Double

        'Final Calculation of the AVERAGE Refrigerant Side Heat Transfer Coefficient
        'C. Gnesutta, January 9th, 2018.
        'OK - Checked by C. Gnesutta on February, 7th, 2018.

        Dim thisAverageAlphaRefr As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the Refrigerant-Side Average Heat Exchange Coefficient.
        'C. Gnesutta, January 8th, 2018.

        'Refrigerant-side heat exchange coefficient @ the end of the condensing process- C. Gnesutta, January 8th, 2018.
        thisAverageAlphaRefr = HeatTransferEquations.CalculateRefrigerantCondensingHeatTransferCoefficient_Shah_AVERAGED(_RefType, _microchannelTubeWidth, _Refrigerant_MassFlowRate_PerPort, _thisCondensingPressure, _CondensingTemperature, _VaporQualityEND)

        'Refrigerant-side heat exchange coefficient @ the beginning of the condensing process- C. Gnesutta, January 8th, 2018.
        thisAverageAlphaRefr = thisAverageAlphaRefr - HeatTransferEquations.CalculateRefrigerantCondensingHeatTransferCoefficient_Shah_AVERAGED(_RefType, _microchannelTubeWidth, _Refrigerant_MassFlowRate_PerPort, _thisCondensingPressure, _CondensingTemperature, _VaporQualitySTART)

        thisAverageAlphaRefr = (1 / (_VaporQualityEND - _VaporQualitySTART)) * thisAverageAlphaRefr

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Return thisAverageAlphaRefr
    End Function

#End Region


#Region "EPSILON-NTU METHOD FOR CONDENSERS"

    'OK - Checked by C. Gnesutta. April 16th 2018.
    Public Function Calculation_Of_Cim(ByVal _thisTKCP_Air As Double, ByVal _thisAirFlow As Double, ByVal _thisTKRho_Air As Double) As Double

        'Calculation of Air Heat Capacity Flow [Watt/(kg*°K)] for the Microchannel condensers
        'OK - Ricontrollata da C. Gnesutta il 7 Febbraio 2018. - Ok Testata.
        ' OK- Checked by C. Gnesutta, March 16th, 2018.

        Dim _this_CIM As Double = 0

        'From [m^3/h] -----> [m^3/s]
        _thisAirFlow = (_thisAirFlow / 3600)

        'Percentage of the air flow rate used to condenser.
        'C. Gnesutta, January 8th, 2018.

        'Final calculation of Cmin - OK, C. Gnesutta - January 8th, 2018.
        _this_CIM = (_thisTKCP_Air * _thisTKRho_Air * _thisAirFlow)

        Return _this_CIM

    End Function

    'OK - Checked by C. Gnesutta. April 16th 2018.
    Public Function Calculation_Of_NTU(ByVal _thisOverallHeatTransferCoefficient As Double, ByVal _thisCmin As Double, ByVal _thisCondensingArea As Double) As Double

        ' CALCULATION OF NTU - C. Gnesutta, January 8th 2018. - OK
        ' OK- Ricontrollato da c. Gnesutta il 7 Febbraio 2018.
        'OK- Checked - C. Gnesutta, March 16th, 2018.
        Dim _thisNTU As Double = 0

        ' Calculation of the Number of Transfer Units for the condensing area (Cmax ---> +infinity)
        _thisNTU = (_thisOverallHeatTransferCoefficient * _thisCondensingArea) / _thisCmin

        Return _thisNTU
    End Function

#End Region


#Region "NEWTON-RAPHSON METHOD TO SOLVE THE MICROCHANNEL CORE CONDENSER - PASSO SINGOLO"

    'OK - Checked by C. Gnesutta on April 17th 2018.
    Public Function Calculation_Qdot(ByVal _thisQdot As Double, ByVal _thisMassFlowRatePerPort As Double, ByVal _QdotMAX As Double, ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisCondensingPressure As Double, ByVal _CondensingTemperature As Double, ByVal _thisCmin As Double, ByVal _thisCondensingArea As Double, ByVal _thisOverallHeatTransferCoefficient As Double, ByVal _AirSideHeatExchangeCoefficient As Double, ByVal _AlHeatConductionCoeff As Double, ByVal _this_Prime_Surface As Double, ByVal _thisTUBE_Internal_Surface As Double, ByVal _thisExternalFinSurface As Double, ByVal _thisTkTubeThickness As Double, ByVal _this_Overall_Fin_Efficiency As Double, ByVal _VaporQualitySTART As Double, ByVal _VaporQualityEND As Double, ByVal _thisCondensingPercentage As Double) As Double

        '##############################################################################################################################
        ' This function calculates Qdot as a root of the function: g= e^(-NTU)-1 + (qdot/qdotmax), by using the Newton_Raphson Method
        'Qdot_(i+1)=Qdot_(i) - g(Qdot_(i))/[(dg/dQdot)(Qdot_(i))]
        'The derivative (dg/dQdot)(Qdot_(i)) will be approximated by means of Finite Difference Method (Backward Difference Scheme - BDS)
        ' C. Gnesutta, January 9th, 2018.
        '##############################################################################################################################

        '[kW] ->[W]
        _thisQdot = 1000 * _thisQdot

        Dim thisQdotNew As Double = 0

        Dim thisG_function As Double = 0

        Dim thisG_Deriv As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'C. Gnesutta, 15 febbraio 2018.
        _this_Prime_Surface = _this_Prime_Surface * _thisCondensingPercentage
        _thisTUBE_Internal_Surface = _thisTUBE_Internal_Surface * _thisCondensingPercentage
        _thisExternalFinSurface = _thisExternalFinSurface * _thisCondensingPercentage
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Calculation of the <<g- function>>
        'OK - Ricontrollata da C. Gnesutta il 7 Febbraio 2018.
        thisG_function = G_Funct(_thisQdot, _QdotMAX, _thisCondensingArea, _thisOverallHeatTransferCoefficient, _thisCmin)

        'Calculation of the derivative of the <<g function>> with respect to the the heat power exchanged by the microchannel core.
        thisG_Deriv = G_DERIV(_RefType, _microchannelTubeWidth, _thisCondensingPressure, _CondensingTemperature, _thisQdot, _QdotMAX, _thisCmin, _thisCondensingArea, _thisOverallHeatTransferCoefficient, _AirSideHeatExchangeCoefficient, _AlHeatConductionCoeff, _this_Prime_Surface, _thisTUBE_Internal_Surface, _thisExternalFinSurface, _thisTkTubeThickness, _this_Overall_Fin_Efficiency, _thisMassFlowRatePerPort, _VaporQualitySTART, _VaporQualityEND)

        'Calculation of the heat power released by the microchannel condenser.
        'C. Gnesutta, January 8th, 2018.
        'OK - Ricontrollata da C. Gnesutta il 7 Febbraio 2018.
        thisQdotNew = _thisQdot - (thisG_function / thisG_Deriv)

        'MsgBox(thisG_function)
        thisQdotNew = (thisQdotNew / 1000)

        Return thisQdotNew

    End Function


    'OK - Checked by C. Gnesutta on April 17th 2018.
    Public Function G_DERIV(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisCondensingPressure As Double, ByVal _CondensingTemperature As Double, ByVal _thisQdot As Double, ByVal _QdotMAX As Double, ByVal _thisCmin As Double, ByVal _thisCondensingArea As Double, ByVal _thisOverallHeatTransferCoefficient As Double, ByVal _AirSideHeatExchangeCoefficient As Double, ByVal _AlHeatConductionCoeff As Double, ByVal _this_Prime_Surface As Double, ByVal _thisTUBE_Internal_Surface As Double, ByVal _thisExternalFinSurface As Double, ByVal _thisTkTubeThickness As Double, ByVal _this_Overall_Fin_Efficiency As Double, ByVal _thisMassFlowRatePerPort As Double, ByVal _VaporQualitySTART As Double, ByVal _VaporQualityEND As Double) As Double

        '##############################################################################################################################
        'Calculation of the derivative by means of a BDS Method. SINGLE PASS
        'C. Gnesutta, January9th, 2018.
        '##############################################################################################################################

        Dim _thisMassFlowRatePerPort_RED As Double = 0

        Dim RefrSideAlpha_RED As Double = 0

        Dim thisOverallHeatTransferCoefficient_RED As Double = 0

        Dim thisG_DERIV As Double = 0

        Dim thisQdot_RED As Double = 0

        thisQdot_RED = 0.95 * _thisQdot

        ' Proporzionalità tra flusso di massa e rese termodinamiche della batteria.
        _thisMassFlowRatePerPort_RED = (0.95 * _thisMassFlowRatePerPort)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of this reduced overall  heat transfer coefficient 
        'C.Gnesutta, January 8th, 2018.
        RefrSideAlpha_RED = RefrSideAverAlpha(_RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort_RED, _thisCondensingPressure, _CondensingTemperature, _VaporQualitySTART, _VaporQualityEND)

        thisOverallHeatTransferCoefficient_RED = HeatTransferEquations.CalculateOverallHeatTransferCoefficient(_microchannelTubeWidth, RefrSideAlpha_RED, _AirSideHeatExchangeCoefficient, AlHeatConductionCoeff, _this_Prime_Surface, _thisTUBE_Internal_Surface, _thisExternalFinSurface, _thisTkTubeThickness, _this_Overall_Fin_Efficiency)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'OK- Ricontrollata da C. Gnesutta il 7 Febbraio 2018.
        'OK - Ricontrollata da C, Gnesutta il 17 aprile 2018.
        thisG_DERIV = (G_Funct(_thisQdot, _QdotMAX, _thisCondensingArea, _thisOverallHeatTransferCoefficient, _thisCmin) - G_Funct(thisQdot_RED, _QdotMAX, _thisCondensingArea, thisOverallHeatTransferCoefficient_RED, _thisCmin)) / (0.05 * _thisQdot)

        Return thisG_DERIV
    End Function

    'We have to find the root oof this function g=g(Qdot)
    'C. Gnesutta, January 9th, 2018.
    'OK - Ricontrollata da C. Gnesutta il 7 Febbraio 2018.
    Public Function G_Funct(ByVal _Qdot As Double, ByVal _QdotMAX As Double, ByVal _thisCondensingArea As Double, ByVal _thisOverallHeatTransferCoefficient As Double, ByVal _thisCmin As Double) As Double
        Dim thisG As Double = 0
        Dim thisNTU As Double = 0

        thisNTU = Calculation_Of_NTU(_thisOverallHeatTransferCoefficient, _thisCmin, _thisCondensingArea)

        'Definition of the function g. - OK
        thisG = e ^ (-thisNTU) - 1 + (_Qdot / _QdotMAX)

        Return thisG
    End Function

#End Region


#Region "CALCULATION OF THE SURFACE AREAS OF THE MICROCHANNEL CORES, THROUGH THE REGIONS DOMINATED BY MONOPHASE REFRIGERANT FLOW"

    'Ok - Checked by C. Gnesutta on April 13th 2018. -OK
    Private Function CalculationOfTheMonoPhase_DeSuperHeating_Area(ByVal _microchannelTubeWidth As String, ByVal _thisCoilType As String, ByVal _RefType As String, ByVal _CondensingTemperature As Double, ByVal _thisDeltaTemperature As Double, ByVal _thisCP_Air As Double, ByVal _thisRho_Air As Double, ByVal _delta_Temp_DS As Double, ByVal _thisAlphaAir As Double, ByVal _this_Prime_Surface As Double, ByVal _this_TUBE_Internal_Surface As Double, ByVal _this_External_Fin_Surface As Double, ByVal _this_Overall_Fin_Efficiency As Double, ByVal _refr_MassFlowRate_PerPort As Double, ByVal _thisNumberOfPorts As Double, ByVal _HeatPowerExchanged As Double, ByVal _this_MicrochannelTubeThick As Double, ByVal this_Ds_Percent As Double) As Double

        'Calculation of the Area of the desuperheating segment [m^2] 
        'of the microchannel core condenser
        'Please see: Yildiz Bayazitoglu, M. Necati Ozisik, <<Elements of Heat transfer>>, pagg. 238-239, example 8-8, Chap.8
        'C. Gnesutta, December 20th, 2017.
        ' OK - Verificata da Cristiano Gnesutta il 12 Febbraio 2018.

        'LMTD Desuperheating temperature - [°C]

        Dim thisDS_LMTD_temp As Double = 0

        Dim thisAverage_DS_Temp As Double = 0

        Dim this_DS_Area As Double = 0

        Dim this_F As Double = 0

        Dim refrCondensingPressure As Double = 0

        'Calculation of the Refrigerant-side AVERAGE heat transfer coefficient across the Desuperheating Surface of the microchannel core [W/(°k*m^2)]
        Dim this_DS_Refr_HeatTransferCoeff As Double = 0

        'Global AVERAGE heat transfer coefficient across the Desuperheating Surface of the microchannel core [W/(°k*m^2)]
        Dim _thisAverage_Overall_DeSuperHeat_HeatTransferCoefficient As Double = 0

        Dim thisT_AirOutput_GLOBAL As Double = 0

        'Average temperature of the cooling air @inlet [°C] -OK
        Dim airInletTemperature As Double = 0

        'AVERAGE desuperheating temperature [°C] - OK
        thisAverage_DS_Temp = _delta_Temp_DS / 2

        'Refrigerant condensing pressure [Pa] -OK
        refrCondensingPressure = thisRefrigerantProperties.CalculationOfSaturationPressure(_RefType, _CondensingTemperature)

        'Calculation of the refrigerant-side AVERAGE heat transfer coefficient across the Desuperheating Surface of the microchannel core [W/(°k*m^2)]
        'OK- Checked by C. Gnesutta, March 15th, 2018. -OK
        this_DS_Refr_HeatTransferCoeff = HeatTransferEquations.CalculateRefrigerantDeSuperheatingHeatTransferCoefficient(_RefType, _microchannelTubeWidth, _refr_MassFlowRate_PerPort, refrCondensingPressure, thisAverage_DS_Temp + _CondensingTemperature)

        '#####################################################################################################################################
        'Rough prediction of the cooling air AVERAGE temperature [°C] @ output for the calculation of the <<F>> Log-Mean Temperature Difference
        'Correction Coefficient. C. Gnesutta, December 20th, 2017. - OK
        airInletTemperature = (_CondensingTemperature - _thisDeltaTemperature)

        'AVERAGE temperature of the cooling air @outlet (considering even the subcoolig and condensing contributions) [°C] - Ok (approximation) -OK
        'thisT_AirOutput_GLOBAL = OutputAirAverageTemperature(_thisAirFlow, _HeatPowerExchanged, _thisCP_Air, _thisRho_Air, airInletTemperature) 
        thisT_AirOutput_GLOBAL = 0.9 * _CondensingTemperature

        '#####################################################################################################################################
        If ((_delta_Temp_DS > 0) And (_thisDeltaTemperature > 0)) Then
            thisDS_LMTD_temp = thisLMTDAverageTemperature(_CondensingTemperature + _delta_Temp_DS, _CondensingTemperature, airInletTemperature, thisT_AirOutput_GLOBAL)

        Else
            thisDS_LMTD_temp = _CondensingTemperature
        End If

        '####################################################################################################################################
        ' We assume, ONLY FOR THE CALCULATION OF THE AVERAGE HEAT EXCHANGE COEFFICIENT that more or less 10% of the condenser 
        ' Overall Heat Transfer Coefficient
        ' PROVE FATTE. I valori sono - OK
        _this_Prime_Surface = this_Ds_Percent * _this_Prime_Surface
        _this_TUBE_Internal_Surface = this_Ds_Percent * _this_TUBE_Internal_Surface
        _this_External_Fin_Surface = this_Ds_Percent * _this_External_Fin_Surface
        '####################################################################################################################################

        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger with Louvered Fins using Thermal Resistance Concept>> - Equat. n.19
        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger with Louvered Fins using Thermal Resistance Concept>> - Equat. n.27
        ' Please also see: R.K. Shah and D.P. Sekulic, <<Fundamental of Heat Exchanger Design>>, John Wiley 2003
        ' Equation 4.163, pag.290
        'OVERALL Average heat exchange coeffcient across the DeSuperheating region - OK
        'OK- Checked by C. Gnesutta, March 15th, 2018.
        _thisAverage_Overall_DeSuperHeat_HeatTransferCoefficient = HeatTransferEquations.CalculateOverallHeatTransferCoefficient(_microchannelTubeWidth, this_DS_Refr_HeatTransferCoeff, _thisAlphaAir, AlHeatConductionCoeff, _this_Prime_Surface, _this_TUBE_Internal_Surface, _this_External_Fin_Surface, _this_MicrochannelTubeThick, _this_Overall_Fin_Efficiency)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Calculation of the Correction Factor for microchannel heat exchangers (LMTD Method)
        'C.Gnesutta, December 20th, 2017.
        'OK- Checked by C. Gnesutta, March 15th, 2018. - OK
        this_F = F_Correction_Factor(airInletTemperature, thisT_AirOutput_GLOBAL, (_CondensingTemperature + _delta_Temp_DS), _CondensingTemperature)

        If this_F > 1 Then
            this_F = 1
        Else
        End If

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the Desuperheating Surface Area [m^2]
        'R.K. Shah & D.P. Sekulic, <<Fundamentals of Heat Exchager Design>> par.3.7.2, eq.3.184. 
        'IMPORTANT REMARK - THE DESUPERHEATING SURFACE AREA IS THE INNER AREA SURFACE OF THE MICROCHANNEL TUBES.
        'The tube surface area (At) is selected as the characteristic area.
        'OK- Checked by C. Gnesutta, March 15th, 2018. - OK

        this_DS_Area = (1000 * _HeatPowerExchanged) / (this_F * _thisAverage_Overall_DeSuperHeat_HeatTransferCoefficient * thisDS_LMTD_temp)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Return this_DS_Area

    End Function

    ' Checked by C. Gnesutta on April 13th 2018. - OK
    Private Function CalculationOfTheMonoPhase_SubCooling_Area(ByVal _microchannelTubeWidth As String, ByVal _thisCoilType As String, ByVal _RefType As String, ByVal _CondensingTemperature As Double, ByVal _thisDeltaTemperature As Double, ByVal _thisCP_Air As Double, ByVal _thisRho_Air As Double, ByVal _delta_Temp_Sc As Double, ByVal _thisAlphaAir As Double, ByVal _this_Prime_Surface As Double, ByVal _this_TUBE_Internal_Surface As Double, ByVal _this_External_Fin_Surface As Double, ByVal _this_Overall_Fin_Efficiency As Double, ByVal _refr_MassFlowRate_PerPort As Double, ByVal _thisNumberOfPorts As Double, ByVal _HeatPowerExchanged As Double, ByVal _this_MicrochannelTubeThick As Double, ByVal _thisScPercentage As Double) As Double

        'Calculation of the length of the subcooling segment [m] 
        'of the microchannel core condenser
        'Please see: Yildiz Bayazitoglu, M. Necati Ozisik, <<Elements of Heat transfer>>, pagg. 238-239, example 8-8, Chap.8
        'C. Gnesutta, December 20th, 2017.

        'LMTD SubCooling temperature - [°C]
        Dim thisSc_LMTD_temp As Double = 0

        Dim thisAverage_Sc_Temp As Double = 0

        Dim this_Sc_Area As Double = 0

        Dim this_F As Double = 0

        Dim refrCondensingPressure As Double = 0

        'Calculation of the Refrigerant-side AVERAGE heat transfer coefficient across the SuCooling Surface of the microchannel core [W/(°k*m^2)]
        Dim this_Sc_Refr_HeatTransferCoeff As Double = 0


        'Global AVERAGE heat transfer coefficient across the  SuCooling Surface of the microchannel core [W/(°k*m^2)]
        Dim _thisAverage_Overall_SuCooling_HeatTransferCoefficient As Double = 0

        Dim thisT_AirOutput_GLOBAL As Double = 0

        'Average temperature of the cooling air @inlet [°C]
        Dim airInletTemperature As Double = 0

        'AVERAGE SubCooling temperature [°C]
        thisAverage_Sc_Temp = _delta_Temp_Sc / 2

        Dim thisT_AirOutput_subCooling As Double = 0

        Dim thisAverage_Overall_Sc_HeatTransferCoeff As Double = 0

        'Refrigerant condensing pressure [Pa] - Checked by C. Gnesutta on April 12th 2018.-OK
        refrCondensingPressure = thisRefrigerantProperties.CalculationOfSaturationPressure(_RefType, _CondensingTemperature)


        'Calculation of the refrigerant-side AVERAGE heat transfer coefficient across the Desuperheating Surface of the microchannel core [W/(°k*m^2)]
        'C.Gnesutta, March 15th, 2018.-OK
        this_Sc_Refr_HeatTransferCoeff = HeatTransferEquations.CalculateRefrigerantSubCoolingHeatTransferCoefficient(_RefType, _microchannelTubeWidth, _refr_MassFlowRate_PerPort, refrCondensingPressure, _CondensingTemperature - thisAverage_Sc_Temp)


        '#####################################################################################################################################
        'Rough prediction of the cooling air AVERAGE temperature [°C] @ output for the calculation of the <<F>> Log-Mean Temperature Difference
        'Correction Coefficient. C. Gnesutta, December 20th, 2017. -OK
        airInletTemperature = (_CondensingTemperature - _thisDeltaTemperature)

        'AVERAGE temperature of the cooling air @outlet (considering even the subcoolig and condensing contributions) [°C]
        'thisT_AirOutput_GLOBAL = OutputAirAverageTemperature(_thisAirFlow, _HeatPowerExchanged, _thisCP_Air, _thisRho_Air, airInletTemperature)

        thisT_AirOutput_GLOBAL = 0.9 * airInletTemperature

        '#####################################################################################################################################

        If ((_delta_Temp_Sc > 0) And (_thisDeltaTemperature > 0)) Then

            thisSc_LMTD_temp = thisLMTDAverageTemperature(_CondensingTemperature, _CondensingTemperature - _delta_Temp_Sc, airInletTemperature, thisT_AirOutput_GLOBAL)

        Else
            thisSc_LMTD_temp = _CondensingTemperature
        End If


        '####################################################################################################################################
        ' We assume, ONLY FOR THE CALCULATION OF THE AVERAGE HEAT EXCHANGE COEFFICIENT that more or less 4% of the condenser 
        'ONLY THE RATIO OF THE AREAS SURFACES IS IMPORTANT for the calculation of the Overall Heat Transfer Coefficient
        'C.Gnesutta, October 26th, 2018
        _this_Prime_Surface = _thisScPercentage * _this_Prime_Surface
        _this_TUBE_Internal_Surface = _thisScPercentage * _this_TUBE_Internal_Surface
        _this_External_Fin_Surface = _thisScPercentage * _this_External_Fin_Surface
        '####################################################################################################################################


        'C.Gnesutta, October 26th, 2018
        thisAverage_Overall_Sc_HeatTransferCoeff = HeatTransferEquations.CalculateOverallHeatTransferCoefficient(_microchannelTubeWidth, this_Sc_Refr_HeatTransferCoeff, _thisAlphaAir, AlHeatConductionCoeff, _this_Prime_Surface, _this_TUBE_Internal_Surface, _this_External_Fin_Surface, _this_MicrochannelTubeThick, _this_Overall_Fin_Efficiency)


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the Correction Factor for microchannel heat exchangers (LMTD Method)
        'C.Gnesutta, October 26th, 2018
        this_F = F_Correction_Factor(airInletTemperature, thisT_AirOutput_GLOBAL, _CondensingTemperature, _CondensingTemperature - _delta_Temp_Sc)

        If this_F > 1 Then
            this_F = 1
        Else
        End If

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€



        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the Desuperheating Surface Area [m^2]
        'R.K. Shah & D.P. Sekulic, <<Fundamentals of Heat Exchager Design>> par.3.7.2, eq.3.184. 
        'IMPORTANT REMARK - THE SUBCOOLING SURFACE AREA IS THE INNER AREA SURFACE OF THE MICROCHANNEL TUBES.
        'The tube surface area (At) is selected as the characteristic area.
        'C.Gnesutta, October 26th, 2018
        this_Sc_Area = (1000 * _HeatPowerExchanged) / (this_F * thisAverage_Overall_Sc_HeatTransferCoeff * thisSc_LMTD_temp)


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


        If (this_Sc_Area > 0) Then
        Else

            this_Sc_Area = 0
        End If


        Return this_Sc_Area

    End Function

#End Region


#Region "NEWTON-RAPHSON METHOD TO SOLVE THE MICROCHANNEL CORE CONDENSER - BATTERIA MUTIPASSO"

    'OK - Checked by C. Gnesutta, April 16th 2018. -'OK
    Public Function MultiPassCalculation_Qdot(ByVal _thisQdot_Av As Double, ByVal _MultiPassQdotMAX As Double, ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisCondensingPressure As Double, ByVal _CondensingTemperature As Double, ByVal _thisMultiPassCmin As Double, ByVal _thisMultiPassCondensingArea As Double, ByVal _thisOverallHeatTransferCoefficient_Av As Double, ByVal _thisOverallAverageAlpha_RED As Double, ByVal _thisCondensingPercentage As Double) As Double

        'C. Gnesutta, 19 marzo 2018. - Newton-Raphson iteration done with an AVERAGE global heat exchange coefficient.

        '[kW] ->[W]
        _thisQdot_Av = 1000 * _thisQdot_Av

        Dim thisQdotNew_Av As Double = 0

        Dim thisG_function_Av As Double = 0

        Dim thisG_Deriv_Av As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'PASSO MULTIPLO  C. Gnesutta, 19 Marzo 2018.
        ' This function calculates Qdot as a root of the function: g= e^(-NTU)-1 + (qdot/qdotmax), by using the Newton_Raphson Method
        'Qdot_(i+1)=Qdot_(i) - g(Qdot_(i))/[(dg/dQdot)(Qdot_(i))]
        'The derivative (dg/dQdot)(Qdot_(i)) will be approximated by means of Finite Difference Method (Backward Difference Scheme - BDS)
        ' C. Gnesutta, January 9th, 2018.
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        ' C. Gnesutta, 19 marzo 2018- OK Controllata.
        thisG_function_Av = G_Funct(_thisQdot_Av, _MultiPassQdotMAX, _thisMultiPassCondensingArea, _thisOverallHeatTransferCoefficient_Av, _thisMultiPassCmin)

        'Calculation of the derivative of the <<g function>> with respect to the the heat power exchanged by the microchannel core.
        thisG_Deriv_Av = MultiPassG_DERIV(_RefType, _microchannelTubeWidth, _thisCondensingPressure, _CondensingTemperature, _thisQdot_Av, _MultiPassQdotMAX, _thisMultiPassCmin, _thisMultiPassCondensingArea, _thisOverallHeatTransferCoefficient_Av, _thisOverallAverageAlpha_RED)


        'Calculation of the heat power released by the microchannel condenser.
        'C. Gnesutta, January 8th, 2018.
        'OK - Ricontrollata da C. Gnesutta il 7 Febbraio 2018.
        thisQdotNew_Av = _thisQdot_Av - (thisG_function_Av / thisG_Deriv_Av)

        'OK
        thisQdotNew_Av = (thisQdotNew_Av / 1000)

        Return thisQdotNew_Av
    End Function

    'OK - Checked by C. Gnesutta, April 16th 2018.
    Public Function MultiPassG_DERIV(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisCondensingPressure As Double, ByVal _CondensingTemperature As Double, ByVal _this_Average_Qdot As Double, ByVal _AverageQdotMAX As Double, ByVal _thisAverageCmin As Double, ByVal _thisMultiPassCondensingArea As Double, ByVal _thisAverageOverallAlpha As Double, ByVal _thisOverallAverageAlpha_RED As Double) As Double

        'C. Gnesutta, 19 marzo 2018. - Newton-Raphson iteration done with an AVERAGE global heat exchange coefficient.
        ' OK Controllata da C. Gnesutta il 19 Marzo 2018.

        Dim _thisMassFlowRatePerPort_RED As Double = 0

        Dim thisMultiPassG_DERIV As Double = 0

        Dim thisG_DERIV As Double = 0

        Dim thisAverageQdot_RED As Double = 0

        thisAverageQdot_RED = (0.95 * _this_Average_Qdot)

        'OK- Ricontrollata da C. Gnesutta il 7 Febbraio 2018.
        'OK- Checked by C. Gnesutta, March 19th, 2018.
        'Corretto da C. Gnesutta il 17 aprile 2018.
        thisMultiPassG_DERIV = (G_Funct(_this_Average_Qdot, _AverageQdotMAX, _thisMultiPassCondensingArea, _thisAverageOverallAlpha, _thisAverageCmin) - G_Funct(thisAverageQdot_RED, _AverageQdotMAX, _thisMultiPassCondensingArea, _thisOverallAverageAlpha_RED, _thisAverageCmin)) / (0.05 * _this_Average_Qdot)


        Return thisMultiPassG_DERIV
    End Function

#End Region


End Class
