Public Class TkCardano_DpRefrigerant_NewRefrigerants


    Const pi As Double = 3.14159265359
    Dim thisRefrPropertiesFor_DP As New TkRefrigerantProperties

    ' Monophase region (SubCooling /DeSuperheating) - C. Gnesutta, 21 Giugno 2018.
#Region "MonoPhase Pressure Drops"

    ' Calculation of the Pressure Drops during condensed liquid subcooling and Gas Desuperheating [kPa]
    'C. Gnesutta, June 20th 2018.
    'OK - Checked again by C. Gnesutta on June 21st, 2018.
    Public Function CalculateMonoPhase_DpRefr(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _stateOfFluid As String, ByVal _refrCondensingTemperature As Double, ByVal _refrDeSuperheat_DT As Double, ByVal _refrSubcooling_DT As Double, ByVal _lengthOfTheMonoPhaseSegment As Double) As Double

        Dim thisMonoPhaseDpRefr As Double = 0

        Dim thisPort_HydraulicDiameter As Double = 0

        Dim thisRho As Double = 0
        Dim thisMu As Double = 0

        Dim refrTemperatureDeSuperheating As Double = 0

        Dim refrTemperatureSubCooling As Double = 0

        Dim thisRefrCondensingPressure As Double = 0

        Dim thisRefrSubCooolingPressure As Double = 0

        Dim thisRefrDeSuperHeatingPressure As Double = 0

        Dim thisFrictionDarcyNumber As Double = 0

        Dim thisPortArea As Double = 0

        Dim thisG_refr As Double = 0

        'Vapor Pressure @ condensing conditions [Pa]  - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisRefrCondensingPressure = thisRefrPropertiesFor_DP.CalculationOfSaturationPressure(_RefType, _refrCondensingTemperature)

        '5 [kPa] has been added to be sure about the subcooling conditions
        'Changed by C. Gnesutta on May 17th 2018 -OK.
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisRefrSubCooolingPressure = thisRefrPropertiesFor_DP.CalculationOfSaturationPressureBubblePoint(_RefType, _refrCondensingTemperature) + 5000

        'To be sure about the superheating conditions, the condensing pressure has been used even during the desuperheating process (small differences) - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisRefrDeSuperHeatingPressure = thisRefrCondensingPressure

        ' Length of the MonoPhase segment from [mm] -------> to [m]- OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        _lengthOfTheMonoPhaseSegment = (_lengthOfTheMonoPhaseSegment / 1000)

        ' Calculation of the equivalent hydraulic diameter of the microchannel port [m] - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisPort_HydraulicDiameter = Dp_Calculate_this_HydraulicDiameterOfThePort(_microchannelTubeWidth)

        'We had to calculate the wetted area according to this formula, to have results in agreement with our old calculation code. - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisPortArea = (pi / 4) * (thisPort_HydraulicDiameter ^ 2)

        'Refrigerant monophase fluid mass velocity [kg/(s*m^2)] - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisG_refr = (_thisMassFlowRatePerPort / thisPortArea)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of average Desuperheating and Subcooling temperatures (small approximation errors) [°C] - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        refrTemperatureDeSuperheating = _refrCondensingTemperature + (_refrDeSuperheat_DT / 2)

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        refrTemperatureSubCooling = _refrCondensingTemperature - (_refrSubcooling_DT / 2)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Calculation of the friction factor.  - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisFrictionDarcyNumber = Calculate_MonoPhase_DarcyNumber(_RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, _stateOfFluid, _refrCondensingTemperature, _refrDeSuperheat_DT, _refrSubcooling_DT)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Gas DeSuperheating
        If _stateOfFluid = "Gas" Then

            'Density of the Superheated Gas [kg/m^3]
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            thisRho = thisRefrPropertiesFor_DP.CalculationOfGasDensity(_RefType, thisRefrDeSuperHeatingPressure, refrTemperatureDeSuperheating)

            'Viscosity of the Superheated Gas [Pa*s]
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            thisMu = thisRefrPropertiesFor_DP.CalculationOfGasViscosity(_RefType, thisRefrDeSuperHeatingPressure, refrTemperatureDeSuperheating)

            'SubCooling of the condensed liquid
        Else

            'Density of the SubCooled Liquid [kg/m^3]
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            thisRho = thisRefrPropertiesFor_DP.CalculationOfLiquidDensity(_RefType, thisRefrSubCooolingPressure, refrTemperatureSubCooling)

            'Viscosity of the SubCooled Liquid [Pa*s]
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            thisMu = thisRefrPropertiesFor_DP.CalculationOfLiquidViscosity(_RefType, thisRefrSubCooolingPressure, refrTemperatureSubCooling)

        End If

        'OK- Checked by C. Gnesutta on May 17th 2018.
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisMonoPhaseDpRefr = (2 * thisFrictionDarcyNumber) * (_lengthOfTheMonoPhaseSegment / thisPort_HydraulicDiameter)

        'OK- Checked by C. Gnesutta on May 17th 2018.
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisMonoPhaseDpRefr = thisMonoPhaseDpRefr * ((thisG_refr ^ 2) / thisRho)

        '[Pa]------->[kPa] - OK- Checked by C. Gnesutta on May 17th 2018.
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisMonoPhaseDpRefr = (thisMonoPhaseDpRefr / 1000)

        Return thisMonoPhaseDpRefr

    End Function

    'C. Gnesutta, June 20th 2018.
    'OK - Checked again by C. Gnesutta on June 21st, 2018.
    Private Function Calculate_MonoPhase_DarcyNumber(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _stateOfFluid As String, ByVal _refrCondensingTemperature As Double, ByVal _refrDeSuperheat_DT As Double, ByVal _refrSubcooling_DT As Double) As Double

        Dim _thisDarcyNumber As Double = 0

        Dim _thisMonoPhase_Refrigerant_ReynoldsNumber As Double = 0

        'Calculation of the Reynolds Number for the monophase flow. - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        _thisMonoPhase_Refrigerant_ReynoldsNumber = Dp_CalculateRefrigerantReynoldsNumber_MonophaseFlow(_RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, _stateOfFluid, _refrCondensingTemperature, _refrDeSuperheat_DT, _refrSubcooling_DT)


        If _thisMonoPhase_Refrigerant_ReynoldsNumber < 2100 Then

            'C. Gnesutta, June 20th, 2018.- OK
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            _thisDarcyNumber = (14.227 / _thisMonoPhase_Refrigerant_ReynoldsNumber)
        Else

            'C. Gnesutta,June 20th, 2018.- OK
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            _thisDarcyNumber = (0.079) * (_thisMonoPhase_Refrigerant_ReynoldsNumber ^ (-0.25))
        End If


        'Ok - checked again by C. Gnesutta on June 21st 2018
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Return _thisDarcyNumber / 2
    End Function

#End Region

    'Two-Phase Condensing Region - C. Gnesutta, 21 Giugno 2018.
    'OK - Checked again by C. Gnesutta on June 21st, 2018.
#Region "Condensing Region Pressure Drops"

    'Calculation of the Refrigerant Side Pressure Drop (in [kPa]), across the condensing region - OK

    '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    'IMPORTANT REMARK: We received the code to predict the refrigerant side pressure drops across the condensing region by courtesy of our external supplier
    ' The experimental coefficients of the following equations are the result of 40 years of experimental measuruments of our external supplier.
    ' We have no idea about some of physical assumptions behind them.
    '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    'C. Gnesutta, October 23rd, 2018. - OK

    'OK - Checked again by C. Gnesutta on June 21st, 2018.
    Public Function Calculate_TwoPhase_RefrigerantSidePressureDrop(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrCondensingTemperature As Double, ByVal _thisGlobalCondensingSegment As Double, ByVal _this_CoilLength As Double, ByVal _this_DSLength As Double, ByVal _this_ScLength As Double, ByVal _thisPassNumber As Int16) As Double

        'Ok- Checked by C. Gnesutta on June 11th 2018.
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        _thisPassNumber = _thisPassNumber + 1

        'Length of the discretisation element [mm]
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Const thisElementSize As Double = 2.54

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim pos_x As Double = 0

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim End_pos_x As Double = 0

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim FirstElement As Integer = 0

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim LastElement As Integer = 0

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim z As Double = 0

        'Number of elements for each single pass.  - Ok
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim numberOfElements As Integer = 0

        'Pressure drop along the condensing region [kPa]
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim thisTwoPhaseCondensingDpRefr As Double = 0

        'Two-Phase correction coefficient.
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim _thisPhiSquared As Double = 0

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim thisLocalVaporQuality As Double = 0

        'Vapor quality in the middle of the condensing segment (we assumed a linear distribution for sake of simplicity)
        'If the number of discretisation elements is Q, this vapor quality is calculated @ the element number: Q/2 -  OK . C. Gnesutta, May 17th 2018.
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim thisVaporQualityMiddle As Double = 0.5

        'Vapor quality @ the (Q/2+1) element - Foward Difference Scheme  -  OK . C. Gnesutta, May 17th 2018. - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim thisVaporQualityForward As Double = ((-1 / _thisGlobalCondensingSegment) * ((thisElementSize / 2) + (_thisGlobalCondensingSegment / 2))) + 1

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Dim _thisLengthOfTheCondensingSegment As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Calculation of the TOTAL number of elements  -  OK . C. Gnesutta, May 17th 2018.
        '_thisPassNumber = _thisPassNumber

        ' Calculation of the condensing length. C. Gnesutta, May 17th 2018. -  OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        _thisLengthOfTheCondensingSegment = _thisGlobalCondensingSegment

        'Number of the condensing elements -  OK
        'C. Gnesutta, May 17th 2018.
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        numberOfElements = Int(_thisLengthOfTheCondensingSegment / thisElementSize)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Ok- Checked by C. Gnesutta on May 17th, 2018
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        If (_thisPassNumber = 1) Then

            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            FirstElement = 0

            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            LastElement = numberOfElements

            'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Else

            'It is written in this redundant form just to improve readability - OK
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            pos_x = (_this_CoilLength - _this_DSLength) + (_thisPassNumber - 2) * _this_CoilLength


            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            'Corrected by C. Gnesutta on October 29th, 2018.
            End_pos_x = (_this_CoilLength - _this_DSLength) + (_thisPassNumber - 1) * _this_CoilLength
            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€



            'Where the calculation starts - C. Gnesutta, May 17th 2018.   
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            FirstElement = Int(pos_x / thisElementSize)

            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            LastElement = Int(End_pos_x / thisElementSize)

        End If
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        'We used a cumulative approach for the calculation of the Dp_refr, corrected by a global correction coefficient, according to the method used by our external supplier. - OK

        thisTwoPhaseCondensingDpRefr = 0

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        For i = FirstElement To (LastElement - 1)

            'Coordinate where the local vapor quality is calculated. - OK
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            z = thisElementSize * i + (thisElementSize / 2)

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            ' We assumed - for sake of simplicity - a linear distribution of the vapor quality, across the condensing region, - OK
            ' for the calculation of the Dp refrigerant.
            'C. Gnesutta, May 17th 2018.
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            thisLocalVaporQuality = ((-1 / _thisLengthOfTheCondensingSegment) * z) + 1
            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            ' We assumed a cumulative behaviour of the Dp_refrigerant - OK
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
            thisTwoPhaseCondensingDpRefr = thisTwoPhaseCondensingDpRefr + ((thisElementSize / 1000) * Calculate_TwoPhase_DELTA_DpRefr(_RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, _refrCondensingTemperature, thisLocalVaporQuality))

        Next
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        ' GLOBAL Correction coefficient, calculated according to the Foward Difference Scheme of our External supplier.
        ' The conceptual theoretical framework is unknown. C. Gnesutta, December 13th, 2017.

        'WE ROUGHLY ASSUMED A LINEAR BEHAVIOUR OF THE VAPOR QUALITY; ACCROSS THE CONDENSIG PATH.
        'THIS MEANS THAT THE RATIO (THERMAL POWER EXCHANGED/CONDENSING LENGTH) IS CONSTANT ALONG THE CONDENSING PATH.

        'OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        _thisPhiSquared = CalculateTwoPhasePhiSquared(_refrCondensingTemperature, _RefType, thisVaporQualityMiddle, thisVaporQualityForward)

        'OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.


        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        If (_thisPassNumber = 1) Then

            If _thisPhiSquared < 1 Then

                _thisPhiSquared = _thisPhiSquared ^ (1 / 4)
            Else

            End If
        Else
            _thisPhiSquared = _thisPhiSquared ^ (1 / 3)
        End If

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisTwoPhaseCondensingDpRefr = (thisTwoPhaseCondensingDpRefr * _thisPhiSquared)

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Return thisTwoPhaseCondensingDpRefr

    End Function

    'Calculation of the contribution for the Total Dp_Refr of each single element of the discretisation.
    'C. Gnesutta, June 20th 2018. - OK
    'OK - Checked again by C. Gnesutta on June 21st, 2018.
    Public Function Calculate_TwoPhase_DELTA_DpRefr(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrCondensingTemperature As Double, ByVal _thisLocalVaporQuality As Double) As Double

        Dim DELTA_TwoPhaseCondensingDpRefr As Double = 0

        Dim thisDarcyFrictionFactor As Double = 0

        Dim this_Wetted_Area As Double = 0

        Dim thisHydraulicDiameter As Double = 0

        Dim thisG_Refr As Double = 0

        Dim thisRhoRefrigerant_Averaged As Double = 0

        thisRhoRefrigerant_Averaged = CalculateTwoPhaseRefrigerantAverageDensity(_refrCondensingTemperature, _RefType, _thisLocalVaporQuality)

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisHydraulicDiameter = Dp_Calculate_this_HydraulicDiameterOfThePort(_microchannelTubeWidth)

        '####################################################################################################################################
        'The wetted area has been calculated according to this formula to reach values in agreement with our internal experience.
        'C. Gnesutta, December 13th, 2017.

        'If _microchannelTubeWidth = "32" Then
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        this_Wetted_Area = 3.1415 * ((thisHydraulicDiameter / 2) ^ 2)


        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisG_Refr = (_thisMassFlowRatePerPort / this_Wetted_Area)

        '####################################################################################################################################

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisDarcyFrictionFactor = Calculate_TwoPhase_FanningNumber(_RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, _refrCondensingTemperature, _thisLocalVaporQuality)


        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        DELTA_TwoPhaseCondensingDpRefr = 2 * thisDarcyFrictionFactor * (thisG_Refr ^ 2)


        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        'The lenght (Dimension of the finite element) is in the above-function as a multiplication term.
        DELTA_TwoPhaseCondensingDpRefr = DELTA_TwoPhaseCondensingDpRefr / (thisRhoRefrigerant_Averaged * thisHydraulicDiameter)


        ' Increment (DELTA) Refrigerant Side pressure Drops from [Pa] -------> to [kPa]
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        DELTA_TwoPhaseCondensingDpRefr = (DELTA_TwoPhaseCondensingDpRefr / 1000)


        Return DELTA_TwoPhaseCondensingDpRefr

    End Function


    'OK - Checked again by C. Gnesutta on June 21st, 2018.
    Public Function Calculate_TwoPhase_FanningNumber(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrCondensingTemperature As Double, ByVal _thisLocalVaporQuality As String) As Double

        Dim thisFanningNumber As Double = 0

        Dim thisTwoPhase_Refr_ReynoldsNumber As Double = 0

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisTwoPhase_Refr_ReynoldsNumber = CalculateRefrigerantReynoldsNumber_TwoPhaseFlow(_RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, _refrCondensingTemperature, _thisLocalVaporQuality)

        'Laminar two-phase flow
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        If thisTwoPhase_Refr_ReynoldsNumber < 2100 Then


            thisFanningNumber = (20 / thisTwoPhase_Refr_ReynoldsNumber)

            'Turbulent two-phase flow (Blasius)
            'OK - Checked again by C. Gnesutta on June 21st, 2018.
        Else

            thisFanningNumber = (0.079) * (thisTwoPhase_Refr_ReynoldsNumber ^ (-0.25))

        End If

        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        ' Experimental correction to get the same results as Instinct Code by Norm Costello.
        Return thisFanningNumber / 2

    End Function

    'OK - Checked again by C. Gnesutta on June 21st, 2018.
    Function CalculateTwoPhasePhiSquared(ByVal _RefTemperature As Double, ByVal _RefType As String, ByVal _thisVaporQualityMiddle As Double, ByVal _thisVaporQualityForward As Double) As Double

        Dim thisPcrit As Double = 0

        Dim thisPsat As Double = 0

        Dim phi_squared As Double

        'Critical pressure of the refrigerant [Bar] - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisPcrit = thisRefrPropertiesFor_DP.CriticalPressure(_RefType)

        'Critical Pressure of the Refrigerant. From [Bar] -------> [Pa] - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisPcrit = 100000 * thisPcrit

        'Saturation pressure of the refrigerant [°C]
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        thisPsat = thisRefrPropertiesFor_DP.CalculationOfSaturationPressure(_RefType, _RefTemperature)

        ' Experimental correlation for the Two-phase friction factor multiplier (wet vapor) - OK
        'OK - Checked again by C. Gnesutta on June 21st, 2018.
        phi_squared = (_thisVaporQualityMiddle - _thisVaporQualityForward) ^ 2 + 2.87 * _thisVaporQualityForward ^ 2 * (thisPsat / thisPcrit) ^ (-1) + 1.68 * _thisVaporQualityForward ^ 2 * (_thisVaporQualityMiddle - _thisVaporQualityForward) ^ 0.25 * (thisPsat / thisPcrit) ^ (-1.64)

        Return phi_squared

    End Function

    'Modificato da C. Gnesutta il 21 Giugno 2018.
    Public Function CalculateRefrigerantReynoldsNumber_TwoPhaseFlow(ByVal _refType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrCondensingTemperature As Double, ByVal _thisLocalVaporQuality As String) As Double

        Dim thisRefrigerantReynoldsNumber As Double = 0

        Dim thisMuVapor As Double = 0

        Dim thisMuLiquid As Double = 0

        Dim thisMuAveraged As Double = 0

        Dim thisPort_HydraulicDiameter As Double = 0

        Dim thisRefrCondensingPressure As Double = 0

        'Viscosity of the saturated liquid [Pa*s]
        'Modificato da C. Gnesutta il 21 Giugno 2018.
        thisMuLiquid = thisRefrPropertiesFor_DP.CalculationOfSaturatedLiquidViscosity(_refType, _refrCondensingTemperature)

        'Viscosity of the saturated vapor [Pa*s]
        'Modificato da C. Gnesutta il 21 Giugno 2018.
        thisMuVapor = thisRefrPropertiesFor_DP.CalculationOfSaturated_Vapor_Viscosity(_refType, _refrCondensingTemperature)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'A. Cicchitti, C. Lombaradi, M. Silversti, G. Soldaini, R. Zavattarlli, Two-phase cooling experiments –
        ' Pressure drop heat transfer burnout measurements, Energia Nucleare 7 (6) (1960) 407–425
        ' Viscosity of the homogenous two-phase fluid [Pa*s]. c. Gnesutta, December 13th, 2017.
        'Modificato da C. Gnesutta il 21 Giugno 2018.
        thisMuAveraged = thisMuLiquid * (1 - _thisLocalVaporQuality) + thisMuVapor * _thisLocalVaporQuality
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Modificato da C. Gnesutta il 21 Giugno 2018.
        thisPort_HydraulicDiameter = Dp_Calculate_this_HydraulicDiameterOfThePort(_microchannelTubeWidth)

        'Modificato da C. Gnesutta il 21 Giugno 2018.
        thisRefrigerantReynoldsNumber = (_thisMassFlowRatePerPort / (thisPort_HydraulicDiameter * thisMuAveraged)) * (4 / pi)

        Return thisRefrigerantReynoldsNumber
    End Function


    'OK - Checked again by C. Gnesutta on June 21st, 2018.
    'Modificato da C. Gnesutta il 21 Giugno 2018.
    Function CalculateTwoPhaseRefrigerantAverageDensity(ByVal _refrCondensingTemperature As Double, ByVal _RefType As String, ByVal _thisLocalVaporQuality As Double) As Double

        Dim thisRhoLiquid As Double = 0

        Dim thisRhoVapor As Double = 0

        Dim thisRho_Average_MistFlow As Double = 0

        'Density of the refrigerant liquid phase [kg/m^3] @ the saturation contitions (midpoint)
        'Modificato da C. Gnesutta il 21 Giugno 2018.
        thisRhoLiquid = thisRefrPropertiesFor_DP.CalculationOfSaturatedLiquidDensity(_RefType, _refrCondensingTemperature)

        'Density of the refrigerant vapor phase [kg/m^3]  @ the saturation contitions (midpoint)
        thisRhoVapor = thisRefrPropertiesFor_DP.CalculationOfSaturatedVaporDensity(_RefType, _refrCondensingTemperature)
        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'M.M. Awad , Y.S. Muzychka - Effective property models for homogeneous two-phase flows -  Exp. Therm. Fluid Sci. (2008)
        ' NASA/CR-2006/214085 - Two Phase Flow Modeling. pag. 27
        'Modificato da C. Gnesutta il 21 Giugno 2018.
        thisRho_Average_MistFlow = (_thisLocalVaporQuality / thisRhoVapor) + ((1 - _thisLocalVaporQuality) / thisRhoLiquid)

        'Modificato da C. Gnesutta il 21 Giugno 2018.
        thisRho_Average_MistFlow = (thisRho_Average_MistFlow) ^ (-1)
        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Modificato da C. Gnesutta il 21 Giugno 2018.
        Return thisRho_Average_MistFlow

    End Function

#End Region

#Region "Monophase Fluid Pure Numbers"

    'C. Gnesutta, June 20th, 2018. - OK
    'OK Checked by C. Gnesutta, on June 21st 2018.
    Private Function Dp_CalculateRefrigerantReynoldsNumber_MonophaseFlow(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _stateOfFluid As String, ByVal _refrCondensingTemperature As Double, ByVal _refrDeSuperheat_DT As Double, ByVal _refrSubcooling_DT As Double) As Double

        Dim thisRefrigerantReynoldsNumber As Double = 0
        Dim thisMu As Double = 0
        Dim thisPort_HydraulicDiameter As Double = 0

        Dim thisRefrCondensingPressure As Double = 0
        Dim thisRefrSubCoolingPressure As Double = 0
        Dim thisRefrSubCoolingTemperature As Double = 0
        Dim thisRefrDeSuperheatingTemperature As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'The pressure of the subcooled liquid has been slightly increased for numerical stability reasons.
        'C. Gnesutta, May 18th, 2018. - OK
        'OK Checked by C. Gnesutta, on June 21st 2018.
        thisRefrCondensingPressure = thisRefrPropertiesFor_DP.CalculationOfSaturationPressure(_RefType, _refrCondensingTemperature)
        thisRefrSubCoolingPressure = thisRefrPropertiesFor_DP.CalculationOfSaturationPressureBubblePoint(_RefType, _refrCondensingTemperature) + 5000

        thisRefrDeSuperheatingTemperature = _refrCondensingTemperature + (_refrDeSuperheat_DT / 2)
        thisRefrSubCoolingTemperature = _refrCondensingTemperature - (_refrSubcooling_DT / 2)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Select Case True

            'C. Gnesutta, May 18th, 2018. - OK
            'OK Checked by C. Gnesutta, on June 21st 2018.
            Case _stateOfFluid = "Liquid"

                thisMu = thisRefrPropertiesFor_DP.CalculationOfLiquidViscosity(_RefType, thisRefrSubCoolingPressure, thisRefrSubCoolingTemperature)

                'C. Gnesutta, May 18th, 2018. - OK
                'OK Checked by C. Gnesutta, on June 21st 2018.
            Case _stateOfFluid = "Gas"

                thisMu = thisRefrPropertiesFor_DP.CalculationOfGasViscosity(_RefType, thisRefrCondensingPressure, thisRefrDeSuperheatingTemperature)

            Case Else
        End Select

        'C. Gnesutta, May 18th, 2018. - OK
        'OK Checked by C. Gnesutta, on June 21st 2018.
        thisPort_HydraulicDiameter = Dp_Calculate_this_HydraulicDiameterOfThePort(_microchannelTubeWidth)

        'C. Gnesutta, May 18th, 2018. - OK
        'OK Checked by C. Gnesutta, on June 21st 2018.
        thisRefrigerantReynoldsNumber = (_thisMassFlowRatePerPort / (thisPort_HydraulicDiameter * thisMu)) * (4 / pi)


        Return thisRefrigerantReynoldsNumber
    End Function

#End Region

    'GEOMETRIC PROPERTIES OF THE MICROCHANNEL COIL.
    'This section has been added to avoid nested class instances. C. Gnesutta, June 18th, 2018.
    'OK Checked by C. Gnesutta, on June 21st 2018.
#Region "Microchannel Geometry"

    ' Calculation of the hydraulic diameter of the microchannel port [m].
    'C. Gnesutta, June 20th, 2018.
    'OK Checked by C. Gnesutta, on June 21st 2018.
    Private Function Dp_Calculate_this_HydraulicDiameterOfThePort(ByVal _microchannelTubeWidth As String) As Double

        Dim thisHydraulicDiameter As Double = 0
        Dim thisPortArea As Double = 0
        Dim thisPortPerimeter As Double = 0
        Dim _thisPortInternalHeigth As Double = 0
        Dim _thisPortInternalWidth As Double = 0

        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'OK Checked by C. Gnesutta, on June 21st 2018.
        Select Case True

            'TkMicro25 - Geometry according to Technical Drawing SAPA n. M5010004, released on December 2nd 2014.
            'OK Checked by C. Gnesutta, on June 21st 2018.
            Case _microchannelTubeWidth = "25"

                _thisPortInternalHeigth = 1.3
                _thisPortInternalWidth = 2.09

                'TkMicro32 - Geometry according to Technical Drawing Thermokey N. M5010004, released on June 22nd 2017.
                'OK Checked by C. Gnesutta, on June 21st 2018.
            Case _microchannelTubeWidth = "32"

                _thisPortInternalHeigth = 1.3
                _thisPortInternalWidth = 1.8

            Case Else
                MsgBox("Please select a depth for the coils !")
        End Select
        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        'Cross-sectional surface area of the microchannel port [m^2]
        'OK Checked by C. Gnesutta, on June 21st 2018.
        thisPortArea = (_thisPortInternalHeigth / 1000) * (_thisPortInternalWidth / 1000)

        'Inner perimeter of the microchannel port [m]
        'OK Checked by C. Gnesutta, on June 21st 2018.
        thisPortPerimeter = (2 / 1000) * (_thisPortInternalHeigth + _thisPortInternalWidth)

        'Hydraulic diameter of the microchannel port [m]
        'OK Checked by C. Gnesutta, on June 21st 2018.
        thisHydraulicDiameter = 4 * (thisPortArea / thisPortPerimeter)

        Return thisHydraulicDiameter

    End Function

#End Region

End Class
