Imports System.Math

Public Class FundamentalHeatExchangeEquations


    Const pi As Double = 3.14159265359
    Const e As Double = 2.71828182846
    Const gravity As Double = 9.80665

    Dim thisTkRefrigerantProperties As New TkRefrigerantProperties


    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
#Region "Geometric Properties"

    'GEOMETRIC PROPERTIES -  Hydraulic diameter- OK - C. Gnesutta, March 13th, 2018.- OK - GEOMETRIC PROPERTIES
    Public Function CalculateHydraulicDiameterOfThePort(ByVal _microchannelTubeWidth As String) As Double

        Dim thisHydraulicDiameter As Double = 0
        Dim thisPortArea As Double = 0
        Dim thisPortPerimeter As Double = 0
        Dim thisPortInternalHeigth As Double = 0
        Dim thisPortInternalWidth As Double = 0

        Select Case True

            'TkMicro25 - Geometry according to Technical Drawing SAPA n. M5010004, released on December 2nd 2014.
            Case _microchannelTubeWidth = "25"

                'Internal height of the microchannel port [mm] - TkMicro25
                thisPortInternalHeigth = 1.3

                'Internal width of the microchannel port [mm]- TkMicro25
                thisPortInternalWidth = 2.09

                'TkMicro32 - Geometry according to Technical Drawing Thermokey N. M5010004, released on June 22nd 2017.
            Case _microchannelTubeWidth = "32"

                'Internal height of the microchannel port [mm] - TkMicro32
                thisPortInternalHeigth = 1.3

                'Internal width of the microchannel port [mm]- TkMicro32
                thisPortInternalWidth = 1.8

            Case Else
                MsgBox("Please select a depth for the coils !")
        End Select

        'Surface area of the microchannel port [m^2]
        thisPortArea = (thisPortInternalHeigth / 1000) * (thisPortInternalWidth / 1000)

        'Perimeter of the microchannel port [m]
        thisPortPerimeter = (2 / 1000) * (thisPortInternalHeigth + thisPortInternalWidth)

        'Diameter of the microchannel port [m]
        thisHydraulicDiameter = 4 * (thisPortArea / thisPortPerimeter)

        Return thisHydraulicDiameter
    End Function


    'GEOMETRIC PROPERTIES - FIN EFFICIENCY - OK - C. Gnesutta, October 22nd, 2018.- OK - GEOMETRIC PROPERTIES
    Public Function CalculateFinEfficiency(ByVal h_air As Double) As Double

        Dim thisFinEfficiency As Double = 0

        'Aluminium Thermal Conductivity [W/(°k*m)] 
        Dim K As Double = 214

        'Thickness of the microchannel fins [mm]
        Dim delta As Double = 0.1 / 1000

        'Fin height [mm] (in realtà dovrebbe essere la 
        Dim L As Double = 9.2 / 1000

        Dim m As Double = ((h_air * 2) / (K * delta)) ^ 0.5

        'Calculation of the fin efficiency (Simplified equation)
        ' R.K. Shah and D.P. Sekulic, <<Fundamental of Heat Exchanger Design>>, John Wiley 2003
        ' Equation 4.147, pag.280
        thisFinEfficiency = (Tanh(m * (L / 2))) / (m * (L / 2))

        Return thisFinEfficiency
    End Function


    'GEOMETRIC PROPERTIES - FIN EFFICIENCY - OK - C. Gnesutta, October 22nd, 2018.- OK - GEOMETRIC PROPERTIES
    Public Function CalculatePrimeSurface(ByVal _microchannelTubeWidth As String, ByVal TubeLength As Double, ByVal _thisNumberOfTubes As Int16) As Double

        Dim thisPrimeArea As Double = 0

        Dim DepthOfThetube As Double = 0

        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 
        '[mm] -------> [m]
        TubeLength = (TubeLength / 1000)
        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 

        Select Case _microchannelTubeWidth

            Case "25"

                DepthOfThetube = (25 / 1000)


            Case "32"

                DepthOfThetube = (32 / 1000)

            Case Else

                DepthOfThetube = 0
        End Select

        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 
        thisPrimeArea = 2 * (DepthOfThetube) * TubeLength * _thisNumberOfTubes
        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 

        ' Prime surface in [m^2]
        Return thisPrimeArea
    End Function


    'GEOMETRIC PROPERTIES - TUBE SURFACE - Global Internal Surface of the ports (A_tube) - C. Gnesutta, March 13th, 2018.- OK - GEOMETRIC PROPERTIES
    Public Function CalculateInternalSufaceOfPort(ByVal _microchannelTubeWidth As String, ByVal TubeLength As Double, ByVal _thisNumberOfTubes As Int16) As Double

        Dim numberOfPortsOfMcTubes As Int16 = 0
        Dim internal_SurfaceOfthePort As Double = 0
        Dim internal_WidthOfThePort As Double = 0
        Dim internal_HeightOfThePort As Double = 0
        Dim external_HeightOfThePort As Double = 0


        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 
        '[mm] -------> [m]
        TubeLength = (TubeLength / 1000)
        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 


        Select Case _microchannelTubeWidth

            'TkMicro25 - Geometry according to Technical Drawing SAPA n. M5010004, released on December 2nd 2014.
            Case "25"
                'External height of the microchannel port [m] - TkMicro25
                external_HeightOfThePort = 2.3 / 1000

                'Internal width of the microchannel port [m]- TkMicro25
                internal_WidthOfThePort = 2.09 / 1000

                'Internal height of the microchannel port [m] - TkMicro25
                internal_HeightOfThePort = external_HeightOfThePort - 2 * (0.5 / 1000)

                numberOfPortsOfMcTubes = 9

                'TkMicro32 - Geometry according to Technical Drawing Thermokey n.M5010004, released on June 22nd 2017.
            Case "32"

                'External height of the microchannel port [m] - TkMicro32
                external_HeightOfThePort = 2.3 / 1000

                'Internal width of the microchannel port [m]- TkMicro32
                internal_WidthOfThePort = 1.8 / 1000

                'Internal height of the microchannel port [m] - TkMicro32
                internal_HeightOfThePort = external_HeightOfThePort - 2 * (0.5 / 1000)

                numberOfPortsOfMcTubes = 13

            Case Else

                external_HeightOfThePort = 0
                internal_WidthOfThePort = 0
                internal_HeightOfThePort = 0
        End Select


        'Internal Surface of a single port [m^2]
        internal_SurfaceOfthePort = 2 * TubeLength * (internal_WidthOfThePort + internal_HeightOfThePort)

        internal_SurfaceOfthePort = numberOfPortsOfMcTubes * internal_SurfaceOfthePort * _thisNumberOfTubes

        Return internal_SurfaceOfthePort

    End Function

    'GEOMETRIC PROPERTIES -FIN SURFACE - Secondary Linear Surface (FIN surface)- C. Gnesutta, March 13th, 2018. - OK - GEOMETRIC PROPERTIES
    Public Function CalculateLinearSecondarySurface(ByVal _microchannelTubeWidth As String, ByVal _thisCoilLength As Double, ByVal _thisNumberOfTubes As Int16) As Double

        Dim thisLinearSecondaryArea As Double = 0
        Dim DepthOfTheLouvering As Double = 0
        Dim HeightOfTubes As Double = 0
        Dim DistanceOfTubes As Double = 0
        Dim FinPitch As Double = 0
        Dim DepthOfFinFillet As Double = 0
        Dim NumberOfFinsPerTube As Integer = 0
        Dim Diagonal As Double = 0

        Select Case True

            'TKMicro25 
            'Technical Drawing GEFIT (Livernois Engineering USA) n. F1416 - August 21st, 2017
            Case _microchannelTubeWidth = "25"
                DistanceOfTubes = 9.2
                HeightOfTubes = 2.3

                '2 x microchannel fin pitch 
                FinPitch = 2.54

                'Tube width - TkMicro25
                DepthOfTheLouvering = 25
                DepthOfFinFillet = 0.38

                'TKMicro32 
                'Technical Drawing GEFIT (Livernois Engineering USA) n. F1416 - August 21st, 2017
                'Please see also: Technical Drawing Thermokey- name: Thermokey 32mm StackUp - issue date: March 26th, 2009
            Case _microchannelTubeWidth = "32"
                DistanceOfTubes = 9.2
                HeightOfTubes = 2.3

                '2 x microchannel fin pitch 
                FinPitch = 2.54

                'Tube width - TkMicro32
                DepthOfTheLouvering = 32

                ' Fillet 
                DepthOfFinFillet = 0.38

            Case Else
                DistanceOfTubes = 9.2
                HeightOfTubes = 2.3
                FinPitch = 2.54
                DepthOfTheLouvering = 0
                DepthOfFinFillet = 0.38
        End Select

        'Number of fins /microchannel tube ('[mm]/[mm])
        NumberOfFinsPerTube = Int(_thisCoilLength / FinPitch)


        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 
        ' Calculation of the whole Secondary (Fin) Surface Area - Ok Checked by C. Gnesutta, December 7th 2017.

        Diagonal = (((FinPitch / 2000) - (DepthOfFinFillet / 1000)) ^ 2 + (DistanceOfTubes / 1000) ^ 2) ^ 0.5

        thisLinearSecondaryArea = 4 * Diagonal * (DepthOfTheLouvering / 1000) * (_thisNumberOfTubes + 1)

        ' This Funcion calculates the external surface of the fins (Linear Secondary Surface) [m^2]
        thisLinearSecondaryArea = (thisLinearSecondaryArea * NumberOfFinsPerTube)

        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 
        Return thisLinearSecondaryArea
    End Function

#End Region



    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
#Region "Air Side Heat Exchange"

    'Calculation of the air-side heat exchange coefficient. C. Gnesutta, December 7th 2017.
    'YU-JUEI CHANG and CHI-CHUAN WANG - A generalized heat transfer correlation for louver fin geometry
    'lnt. J. Heat Mass Transfer. Vol. 40, No. 3, pp. 53~544, 1997
    Public Function CalculateAirSideHeatTransferCoefficient(ByVal _microchannelTubeWidth As String, ByVal Mu_Air As Double, ByVal CP_Air As Double, ByVal Lambda_Air As Double, ByVal Rho_Air As Double, ByVal Vfr As Double) As Double

        'Air-Side heat exchange coefficient [W/(°K*kg)]
        Dim h_air As Double = 0

        'Colburn number
        Dim J As Double = 0

        'Reynolds Number based on the louver pitch
        Dim Rel As Double = 0

        'Experimental correction coefficient
        Dim Alpha As Double = 0

        'Louvered Angle  (8,4° < Theta < 35°) 
        Dim Theta As Double = 0

        'Fin Pitch (0,51 mm < Fp < 3,33 mm) 
        Dim Fp As Double = 0

        'Louver Pitch (0,5 mm < Lp < 3 mm) 
        Dim Lp As Double = 0

        'Fin Height (2,84 mm < Fl < 20 mm) 
        Dim Fl As Double = 0

        'Width of the Microchannel Tube (15,6 mm < Td < 57,4 mm) 
        Dim Wt As Double = 0

        'Louver cut length (2,13 mm <  Ll < 18,5 mm) 
        Dim Ll As Double = 0

        'Tube pitch (7,51 mm < Tp < 25,0 mm) 
        Dim Tp As Double = 0

        'Fin thickness (0,0254 mm < Delta_f  < 0,16 mm) 
        Dim Delta_f As Double = 0

        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 
        Select Case True

            Case _microchannelTubeWidth = "25"

                'Louvered Angle  (8,4° < Theta < 35°) - TkMicro25
                Theta = 28

                'Fin Pitch (0,51 mm < Fp < 3,33 mm) - TkMicro25
                Fp = 1.27

                'Louver Pitch (0,5 mm < Lp < 3 mm) - TkMicro25
                Lp = 1.143

                'Fin Height (2,84 mm < Fl < 20 mm) - TkMicro25
                Fl = 9.2

                'Width of the Microchannel Tube (15,6 mm < Td < 57,4 mm) - TkMicro25
                Wt = 25

                'Louver cut length (2,13 mm <  Ll < 18,5 mm)  - TkMicro25 
                Ll = 8.2

                'Tube pitch (7,51 mm < Tp < 25,0 mm) - TkMicro25
                Tp = 11.5

                'Fin thickness (0,0254 mm < Delta_f  < 0,16 mm) - TkMicro25
                Delta_f = 0.1

            Case _microchannelTubeWidth = "32"

                'Louvered Angle  (8,4° < Theta < 35°) - TkMicro32 
                Theta = 21

                'Fin Pitch (0,51 mm < Fp < 3,33 mm) - TkMicro32 
                Fp = 1.27

                'Louver Pitch (0,5 mm < Lp < 3 mm) - TkMicro32 
                Lp = 1.143

                'Fin Height (2,84 mm < Fl < 20 mm) - TkMicro32 
                Fl = 9.2

                'Width of the Microchannel Tube (15,6 mm < Td < 57,4 mm) - TkMicro32 
                Wt = 32

                'Louver cut length  (2,13 mm <  Ll < 18,5 mm) - TkMicro32 
                Ll = 8.2

                'Tube pitch (7,51 mm < Tp < 25,0 mm) - TkMicro32 
                Tp = 11.5

                'Fin thickness (0,0254 mm < Delta_f  < 0,16 mm)  - TkMicro32 
                Delta_f = 0.1

            Case Else
                MsgBox("Please select a depth for the coils !")
        End Select
        ' €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 

        ' Correction Coefficients based on Thermokey experimental measurements for the Air Side Heat Exchange Coefficient 
        Select Case True

            'Experimental correction coefficients for TkMicro25 geometry
            Case (_microchannelTubeWidth = "25")
                Alpha = +6.23204829599295 * 1 + -26.4066547473779 * Sqrt(Vfr) + 48.7760400826505 * Vfr + -41.08628476331 * Vfr ^ 1.5 + 14.4082777183558 * Vfr * Vfr + -0.943715750926501 * Vfr ^ 3 + 0.043389585584448 * Vfr ^ 4

                'Experimental correction coefficients for TkMicro32 geometry
            Case _microchannelTubeWidth = "32"
                Alpha = +38.6817327244535 * 1 + -174.347527685318 * Sqrt(Vfr) + 315.923049987587 * Vfr + -275.835407614269 * Vfr ^ 1.5 + 105.411497892624 * Vfr * Vfr + -9.64930967085515 * Vfr ^ 3 + 0.879122409240612 * Vfr ^ 4 + -0.0390181610757612 * Vfr ^ 5
            Case Else

        End Select

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 
        ' Calculation of the Reynolds Number based on Louver Pitch 
        ' The average speed of the air must be measured at about 20 cm - 30 cm distance from  the surface of the microchannel coil
        'Please see <<Scaling of Heat Transfer Coefficients along Louvered Fins>>, A.C. Lyman, R.A. Stephan
        'and K.A. Thole, Virginia State University - L.W. Zhang and S.B. Memory, Modine -  Manufacturing(Company)
        Rel = (Vfr * (Lp / 1000) * Rho_Air) / (Mu_Air)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ 

        ' Calculation of the Coulburn Number - R.K. Shah and D.P. Sekulic, <<Fundamental of Heat Exchanger Design>>, John Wiley
        J = (Rel ^ (-0.49)) * ((Theta / 90) ^ (0.27)) * ((Fp / Lp) ^ (-0.14)) * ((Fl / Lp) ^ (-0.29)) * ((Wt / Lp) ^ (-0.23)) * ((Ll / Lp) ^ (0.68)) * ((Tp / Lp) ^ (-0.28)) * ((Delta_f / Lp) ^ -0.05)

        ' Calculation of the Prandtl Number 
        Dim Pr_air As Double = (Mu_Air * CP_Air) / Lambda_Air

        ' Determination of the Air Side Heat transfer Coefficient [W/(°K*m^2)]
        h_air = Alpha * (J * CP_Air * Rho_Air * Vfr) / (Pr_air ^ (2 / 3))

        Return h_air

    End Function



#End Region



    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
#Region "Refrigerant Side Heat Exchange Coefficent"

    'OK - Heat Exchange Coefficient - DeSuperheating conditions - Ok. C.Gnesutta, March 13th, 2018.
    'OK - DeSuperheating - Refrigerant Side Heat Exchange coefficient
    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
#Region "Refrigerant DeSuperheating"

    'OK - Checked (C. Gnesutta, March 13th, 2018).
    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
    Public Function CalculateRefrigerantDeSuperheatingHeatTransferCoefficient(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double

        Dim hRefr_Desuperheating As Double = 0
        Dim ReynoldsNumber As Double = 0
        Dim PrandtlNumber As Double = 0

        Dim LambdaSuperheatedGas As Double = 0

        Dim HydraulicDiameter As Double = 0

        'Superheated Gas Thermal Conductivity [W/(m*°K)]. -  C. Gnesutta, December 13th, 2017.
        LambdaSuperheatedGas = thisTkRefrigerantProperties.CalculationOfGasThermalConductivity(_RefType, _refrPressure, _refrTemperature)

        HydraulicDiameter = Me.CalculateHydraulicDiameterOfThePort(_microchannelTubeWidth)


        'Reynolds Number of the Superheated Gas-  C. Gnesutta, December 13th, 2017.
        ReynoldsNumber = Me.CalculateRefrigerantReynoldsNumberMonophase(_RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, "Gas", _refrPressure, _refrTemperature)


        ' Prandt Number of the Superheated Gas-  C. Gnesutta, December 13th, 2017.
        PrandtlNumber = Me.CalculateRefrigerantPrandtlNumberMonophase(_RefType, "Gas", _refrPressure, _refrTemperature)


        'According to the litterature, the Dittus-Bolter equation is accurate enough even for low Reynolds numbers
        'for monophase flows trough the microchannel tube.
        ' J. M. Saiz Jabardo; W. G. Mamani - Modeling and experimental evaluation of parallel flow micro channel condensers
        'J. Braz. Soc. Mech. Sci. & Eng. vol.25 no.2 Rio de Janeiro Apr./June 2003
        'Dittus- BoelterEquation like in M.M. Shah (1979).
        hRefr_Desuperheating = 0.023 * (ReynoldsNumber ^ 0.8) * (PrandtlNumber ^ 0.3) * (LambdaSuperheatedGas / HydraulicDiameter)

        Return hRefr_Desuperheating
    End Function

#End Region


    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
#Region "Refrigerant Condensing"

    'AVERAGE refrigerant-side Heat Exchange Coefficient, between the vapor qualities X_1 and X_2.
    'M. M. Shah 1979-2009. A general correlation for heat transfer during film condensation in pipes (for circular and non-circular tubes).
    'Int. J. Heat   'Mass Transfer 22:547–56, equation n. 11 (with experimental corrections) 
    'OK. CHECKED. C. Gnesutta, December 7th 2017.

    'THIS IS THE AVERAGE REFRIGERANT-SIDE COEFFICIENT  
    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
    'OK - Checked (C. Gnesutta, March 13th, 2018).
    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
    Public Function CalculateRefrigerantCondensingHeatTransferCoefficient_Shah_AVERAGED(ByVal RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrPressure As Double, ByVal _refrTemperature As Double, ByVal _VaporQuality As Double) As Double

        Dim _thisEpsilon_1 As Double = 0

        Dim _thisEpsilon_2 As Double = 0

        Dim hRefr_SaturatedLiquid As Double = 0

        Dim SaturatedLiquidReynoldsNumber As Double = 0
        Dim SaturatedLiquidPrandtlNumber As Double = 0

        Dim thisPort_HydraulicDiameter As Double = 0
        Dim thisSaturatedLiquidThermalConductivity As Double = 0
        Dim LambdaSaturatedLiquid As Double = 0
        Dim hRefr_Saturated_All_Liquid As Double = 0

        Dim hRefr_Shah As Double = 0

        Dim thisSaturatedLiquidViscosity As Double = 0

        Dim thisSaturatedVaporViscosity As Double = 0

        Dim HydraulicDiameter As Double = 0

        'Critical Pressure [Bar]  - Ok checked  by C. Gnesutta, December 7th 2017.
        Dim P_critic As Double = thisTkRefrigerantProperties.CriticalPressure(RefType)

        'Saturation Pressure [Pa] - Ok checked  by C. Gnesutta, December 7th 2017.
        Dim P_saturation As Double = thisTkRefrigerantProperties.CalculationOfSaturationPressure(RefType, _refrTemperature)

        'Viscosity of the saturated liquid @ midpoint [Pa*s] - Ok checked  by C. Gnesutta, December 7th 2017.
        thisSaturatedLiquidViscosity = thisTkRefrigerantProperties.CalculationOfSaturatedLiquidViscosity(RefType, _refrTemperature)

        'Viscosity of the saturated vapor @ midpoint [Pa*s]- Ok checked  by C. Gnesutta, December 7th 2017.
        thisSaturatedVaporViscosity = thisTkRefrigerantProperties.CalculationOfSaturated_Vapor_Viscosity(RefType, _refrTemperature)

        'Calculation of the Reduced Pressure.- Ok checked  by C. Gnesutta, December 7th 2017.
        Dim P_reduced As Double = (P_saturation / P_critic)

        'Calculation of the Hydraulic Diameter [mm].- Ok checked  by C. Gnesutta, December 7th 2017.
        thisPort_HydraulicDiameter = Me.CalculateHydraulicDiameterOfThePort(_microchannelTubeWidth)

        'Thermal Conductivity of the saturated liquid  [W/(m*°K)]. - Ok checked  by C. Gnesutta, December 7th 2017.
        thisSaturatedLiquidThermalConductivity = thisTkRefrigerantProperties.CalculationOfSaturatedLiquidThermalConductivity(RefType, _refrTemperature)

        'Calculation of the Reynolds Number of the liquid at the saturation conditions (all the mass flowing as a liquid) 
        SaturatedLiquidReynoldsNumber = Me.CalculateRefrigerantReynoldsSaturatedLiquid(RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, _refrPressure, _refrTemperature)

        'Calculation of Prandtl Number of the liquid at the saturation conditions. 
        SaturatedLiquidPrandtlNumber = CalculateRefrigerantPrandtlSaturatedliquid(RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, _refrPressure, _refrTemperature)

        ' Calculation of the heat transfer coefficient assuming all mass flowing as a liquid 
        ' Equat. n. 05 -  M. M. Shah 1979-2009. A general correlation for heat transfer during film condensation in pipes. Int. J. Heat Mass Transfer 22:547–56.
        ' Dittus-Boelter Equation. 
        ' Calculation of the heat transfer coefficient assuming all mass flowing as a liquid [W/(°K*m^2)]
        hRefr_Saturated_All_Liquid = 0.024 * (SaturatedLiquidReynoldsNumber ^ 0.8) * (SaturatedLiquidPrandtlNumber ^ 0.4) * (thisSaturatedLiquidThermalConductivity / thisPort_HydraulicDiameter)

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        ' Equat. n. 11 -  M. M. Shah 1979-2009. A general correlation for heat transfer during film condensation in pipes. Int. J. Heat Mass Transfer 22:547–56.
        '[W/(°K*m^2)]
        ' OK- Ricontrollata nuovamente da C. Gnesutta il 7 Febbraio 2018.
        'OK - Controllo definitivo di C. Gnesutta, 14 marzo 2018.
        _thisEpsilon_1 = (-1 / 1.8) * (1 - _VaporQuality) ^ 1.8
        _thisEpsilon_2 = (3.8 / P_reduced ^ 0.38) * ((_VaporQuality ^ 1.76) / 1.76) - (0.04 / 2.76) * (_VaporQuality ^ 2.76)
        hRefr_Shah = 1.0 * hRefr_Saturated_All_Liquid * (_thisEpsilon_1 + _thisEpsilon_2)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Return hRefr_Shah
    End Function

    'TERMINE NON UTILIZZATO.
    ' LOCAL refrigerant-side Heat Exchange Coefficient. C. Gnesutta, December 6th 2017.
    ' The original 1979-Shah Theory has been implemented, because further developments (e.g. please look at M. Mohammed Shah,
    ' An Improved and Extended General Correlationfor Heat Transfer During Condensation in Plain Tubes, 
    'HVAC&R Research, Vol. 15, No. 5, September 2009)
    'appeared to produce numerical results more distant from the experimental reality.

    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
    'OK. CHECKED. C. Gnesutta, December 7th 2017.
    '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
    Public Function CalculateRefrigerantCondensingHeatTransferCoefficient_Shah1979(ByVal RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrPressure As Double, ByVal _refrTemperature As Double, ByVal _VaporQuality As Double) As Double

        Dim hRefr_SaturatedLiquid As Double = 0

        Dim SaturatedLiquidReynoldsNumber As Double = 0
        Dim SaturatedLiquidPrandtlNumber As Double = 0

        Dim thisPort_HydraulicDiameter As Double = 0
        Dim thisSaturatedLiquidThermalConductivity As Double = 0
        Dim LambdaSaturatedLiquid As Double = 0
        Dim hRefr_Saturated_All_Liquid As Double = 0

        Dim hRefr_Shah As Double = 0

        Dim thisSaturatedLiquidViscosity As Double = 0

        Dim thisSaturatedVaporViscosity As Double = 0

        Dim HydraulicDiameter As Double = 0

        'Critical Pressure [Bar]. C. Gnesutta, December 6th 2017
        Dim P_critic As Double = thisTkRefrigerantProperties.CriticalPressure(RefType)

        ' Saturation Pressure  of the saturated vapor @ midpoint [Pa]. C. Gnesutta, December 6th 2017 
        Dim P_saturation As Double = thisTkRefrigerantProperties.CalculationOfSaturationPressure(RefType, _refrTemperature)

        'Viscosity of the saturated liquid @ midpoint [Pa*s]. C. Gnesutta, December 6th 2017 
        thisSaturatedLiquidViscosity = thisTkRefrigerantProperties.CalculationOfSaturatedLiquidViscosity(RefType, _refrTemperature)

        'Viscosity of the saturated liquid @ midpoint [Pa*s]. C. Gnesutta, December 6th 2017 
        thisSaturatedVaporViscosity = thisTkRefrigerantProperties.CalculationOfSaturated_Vapor_Viscosity(RefType, _refrTemperature)

        ' Calculation of the reduced pressure. C. Gnesutta, December 6th 2017.
        Dim P_reduced As Double = (P_saturation / P_critic)

        ' Calculation of the hydraulic diameter of the port of the microchannel tube. C. Gnesutta, December 6th 2017.
        thisPort_HydraulicDiameter = Me.CalculateHydraulicDiameterOfThePort(_microchannelTubeWidth)

        'Thermal Conductivity of the saturated liquid @ midpoint [W/(m*°K)]. C. Gnesutta, December 6th 2017 
        thisSaturatedLiquidThermalConductivity = thisTkRefrigerantProperties.CalculationOfSaturatedLiquidThermalConductivity(RefType, _refrTemperature)

        'Calculation of the Reynolds Number of the liquid at the saturation conditions (assuming all the mass flowing as a liquid) 
        SaturatedLiquidReynoldsNumber = CalculateRefrigerantReynoldsSaturatedLiquid(RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, _refrPressure, _refrTemperature)

        'Calculation of Prandtl Number of the liquid at the saturation conditions. 
        SaturatedLiquidPrandtlNumber = CalculateRefrigerantPrandtlSaturatedliquid(RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, _refrPressure, _refrTemperature)

        ' Calculation of the heat transfer coefficient assuming all mass flowing as a liquid [W/(°K*m^2)]
        hRefr_Saturated_All_Liquid = 0.024 * (SaturatedLiquidReynoldsNumber ^ 0.8) * (SaturatedLiquidPrandtlNumber ^ 0.4) * (thisSaturatedLiquidThermalConductivity / thisPort_HydraulicDiameter)

        ' Equat. n. 08 -  M. M. Shah 1979-2009. A general correlation for heat transfer during film condensation in pipes. Int. J. Heat Mass Transfer 22:547–56.
        ' LOCAL refrigerant side heat transfer coefficient [W/(°k*m^2)]
        hRefr_Shah = hRefr_Saturated_All_Liquid * ((1 - _VaporQuality) ^ 0.8 + ((3.8 / (P_reduced ^ 0.38)) * (_VaporQuality ^ 0.76) * (1 - _VaporQuality) ^ 0.04))

        Return hRefr_Shah
    End Function

#End Region

    'OK - Heat Exchange Coefficient -SubCooling conditions - Ok. C. Gnesutta, March 13th, 2018.
    'OK - SubCooling - Refrigerant Side Heat Exchange coefficient
    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
#Region "Refrigerant SubCooling"

    'OK - Checked (C. Gnesutta, March 13th, 2018).
    Public Function CalculateRefrigerantSubCoolingHeatTransferCoefficient(ByVal _RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double

        Dim hRefr_Subcooling As Double = 0
        Dim ReynoldsNumber As Double = 0
        Dim PrandtlNumber As Double = 0

        Dim SubCooledLiquidThermalConductivity As Double = 0

        Dim HydraulicDiameter As Double = 0

        'SuCooled Liquid Thermal Conductivity -[W/(m*°K)] . C. Gnesutta, December 13th, 2017
        SubCooledLiquidThermalConductivity = thisTkRefrigerantProperties.CalculationOfLiquidThermalConductivity(_RefType, _refrPressure, _refrTemperature)

        HydraulicDiameter = Me.CalculateHydraulicDiameterOfThePort(_microchannelTubeWidth)

        'Reynolds Number of the SubCooled Liquid-  C. Gnesutta, December 13th, 2017.
        ReynoldsNumber = CalculateRefrigerantReynoldsNumberMonophase(_RefType, _microchannelTubeWidth, _thisMassFlowRatePerPort, "Liquid", _refrPressure, _refrTemperature)

        'Prandtl Number of the SubCooled Liquid-  C. Gnesutta, December 13th, 2017.
        PrandtlNumber = CalculateRefrigerantPrandtlNumberMonophase(_RefType, "Liquid", _refrPressure, _refrTemperature)

        'According to the litterature, the Dittus-Bolter equation is accurate enough even for low Reynolds numbers
        'for monophase flows trough the microchannel tube.
        ' J. M. Saiz Jabardo; W. G. Mamani - Modeling and experimental evaluation of parallel flow micro channel condensers
        'J. Braz. Soc. Mech. Sci. & Eng. vol.25 no.2 Rio de Janeiro Apr./June 2003
        'Dittus- BoelterEquation like in M.M. Shah (1979).
        hRefr_Subcooling = 0.023 * (ReynoldsNumber ^ 0.8) * (PrandtlNumber ^ 0.3) * (SubCooledLiquidThermalConductivity / HydraulicDiameter)

        Return hRefr_Subcooling
    End Function


#End Region


#End Region



    'Monophase adimensional numbers. C. Gnesutta, March 13th, 2018.
    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
#Region "Monophase Fluid Pure Numbers"

    'Calculation of the Reynolds Number for monophase flow. -  C. Gnesutta, 30 Gennaio 2018.
    'OK - Checked. C. Gnesutta, March 13th, 2018.
    Public Function CalculateRefrigerantReynoldsNumberMonophase(ByVal RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _stateOfFluid As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim _thisRefrigerantReynoldsNumber As Double = 0

        Dim thisMu As Double = 0
        Dim thisPort_HydraulicDiameter As Double = 0

        Select Case True

            Case _stateOfFluid = "Liquid"
                thisMu = thisTkRefrigerantProperties.CalculationOfLiquidViscosity(RefType, _refrPressure, _refrTemperature)

            Case _stateOfFluid = "Gas"

                thisMu = thisTkRefrigerantProperties.CalculationOfGasViscosity(RefType, _refrPressure, _refrTemperature)

            Case Else
        End Select


        thisPort_HydraulicDiameter = CalculateHydraulicDiameterOfThePort(_microchannelTubeWidth)


        _thisRefrigerantReynoldsNumber = (_thisMassFlowRatePerPort / (thisPort_HydraulicDiameter * thisMu)) * (4 / pi)


        Return _thisRefrigerantReynoldsNumber
    End Function

    'Calculation of the Prandtl Number for monophase flow. -  C. Gnesutta, 30 Gennaio 2018.
    'Prandtl Number - OK- C.Gnesutta, March 13th, 2018.  - OK
    Public Function CalculateRefrigerantPrandtlNumberMonophase(ByVal RefType As String, ByVal _stateOfFluid As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim _thisRefrigerantPrandtlNumber As Double = 0

        Dim thisMu As Double = 0
        Dim thisCp As Double = 0
        Dim thislambda As Double = 0

        Select Case True

            Case _stateOfFluid = "Liquid"

                thisMu = thisTkRefrigerantProperties.CalculationOfLiquidViscosity(RefType, _refrPressure, _refrTemperature)
                thisCp = thisTkRefrigerantProperties.CalculationOfLiquidSpecificHeat(RefType, _refrPressure, _refrTemperature)
                thislambda = thisTkRefrigerantProperties.CalculationOfLiquidThermalConductivity(RefType, _refrPressure, _refrTemperature)

            Case _stateOfFluid = "Gas"

                thisMu = thisTkRefrigerantProperties.CalculationOfGasViscosity(RefType, _refrPressure, _refrTemperature)
                thisCp = thisTkRefrigerantProperties.CalculationOfGasSpecificHeat(RefType, _refrPressure, _refrTemperature)
                thislambda = thisTkRefrigerantProperties.CalculationOfGasThermalConductivity(RefType, _refrPressure, _refrTemperature)

            Case Else
        End Select

        'Prandtl Number.
        _thisRefrigerantPrandtlNumber = (thisCp * thisMu) / thislambda

        Return _thisRefrigerantPrandtlNumber
    End Function


#End Region



#Region "Saturated Liquid Pure Numbers"

    'OK - CONTROLLATO - C. Gnesutta, 13 Marzo 2018. 
    'Calculation of the Reynolds Number of the PURE liquid.
    'Ok Checked. C. Gnesutta, December 7th, 2017.
    'Reynolds Number- Saturated Liquid @ Condensing conditions - SATURATED LIQUID
    Public Function CalculateRefrigerantReynoldsSaturatedLiquid(ByVal RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double

        Dim _thisSaturatedLiquidReynoldsNumber As Double = 0

        Dim _thisPort_HydraulicDiameter As Double = 0

        Dim _thisMuSaturatedliquid As Double = 0

        'Calculation of the liquid viscosity @the saturation conditions [Pa*s]  - C. Gnesutta, December 7th, 2017.
        _thisMuSaturatedliquid = thisTkRefrigerantProperties.CalculationOfSaturatedLiquidViscosity(RefType, _refrTemperature)

        'Calculation of the Hydraulic Diameter [m]. - C. Gnesutta, December 7th, 2017.
        _thisPort_HydraulicDiameter = Me.CalculateHydraulicDiameterOfThePort(_microchannelTubeWidth)

        'Calculation of the Reynolds Number of the PURE liquid @the saturation conditions. - C. Gnesutta, December 7th, 2017.
        'Ok- Checked by C. Gnesutta. March 13th, 2018.
        _thisSaturatedLiquidReynoldsNumber = (_thisMassFlowRatePerPort / (_thisPort_HydraulicDiameter * _thisMuSaturatedliquid)) * (4 / pi)


        Return _thisSaturatedLiquidReynoldsNumber
    End Function

    'Calculation of the liquid Prandtl Number @the saturation conditions.
    ' OK - Checked. C.Gnesutta. December 7th, 2017.
    'OK - Verificato da Cristiano Gnesutta il 12 Febbraio 2018.
    'Prandtl Number- Saturated Liquid @ Condensing conditions - SATURATED LIQUID
    Public Function CalculateRefrigerantPrandtlSaturatedliquid(ByVal RefType As String, ByVal _microchannelTubeWidth As String, ByVal _thisMassFlowRatePerPort As Double, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double

        Dim _thisSaturatedLiquidPrandtlNumber As Double = 0
        Dim _thisCpSaturatedLiquid As Double = 0
        Dim _thisMuSaturatedLiquid As Double = 0
        Dim _thislambdaSaturatedLiquid As Double = 0

        'Calculation of the liquid specific heat @the saturation conditions [J/(kg*°K)].
        _thisCpSaturatedLiquid = thisTkRefrigerantProperties.CalculationOfSaturatedLiquidSpecificHeat(RefType, _refrTemperature)

        'Calculation of the liquid viscosity @the saturation conditions [Pa*s]
        _thisMuSaturatedLiquid = thisTkRefrigerantProperties.CalculationOfSaturatedLiquidViscosity(RefType, _refrTemperature)

        'Calculation of the Thermal Conductivity @the saturation conditions  [W/(m*°K)]
        _thislambdaSaturatedLiquid = thisTkRefrigerantProperties.CalculationOfSaturatedLiquidThermalConductivity(RefType, _refrTemperature)

        'Calculation of Prandtl Number of the liquid at the saturation conditions. C.Gnesutta, December 7th 2017. (c_p*mu)/lambda
        'Ok- Checked by C. Gnesutta. March 13th, 2018.
        _thisSaturatedLiquidPrandtlNumber = (_thisCpSaturatedLiquid * _thisMuSaturatedLiquid) / _thislambdaSaturatedLiquid

        Return _thisSaturatedLiquidPrandtlNumber

    End Function

#End Region



#Region "Calculation of the Overall Heat Transfer Coefficient"

    'Calculation of the Overall Fin Efficiency. 
    ' OK - Checked by C. Gnesutta, March 13th, 2018.
    Public Function CalculateOverallFinEfficiency(ByVal FinEfficiency As Double, ByVal _thisPrimeSurface As Double, ByVal _thisFinSurface As Double) As Double
        'Overall Fin Efficiency - Ok checked. C. Gnesutta, December 7th, 2017.
        Dim _thisOverallFinEfficiency As Double = 0

        Dim A_0 As Double = 0

        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger with Louvered Fins using Thermal Resistance Concept>> - Equat. n.27

        A_0 = _thisFinSurface + _thisPrimeSurface

        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger with Louvered Fins using Thermal Resistance Concept>> - Equat. n.26

        _thisOverallFinEfficiency = 1 - ((1 - FinEfficiency) * (_thisFinSurface / A_0))

        Return _thisOverallFinEfficiency
    End Function


    'OK- Checked. C. Gnesutta, December 7th 2017.
    ' OK - Checked by C. Gnesutta, March 13th, 2018.
    Public Function CalculateOverallHeatTransferCoefficient(ByVal _microchannelTubeWidth As String, ByVal _this_h_refr As Double, ByVal _this_h_air As Double, ByVal Lambda_metal As Double, ByVal A_Prime_Surface_tube As Double, ByVal A_tube As Double, ByVal A_Secondary_Surface_Fin As Double, ByVal Tube_th As Double, ByVal FinEfficiency As Double) As Double

        Dim R_equiv As Double = 0

        Dim U_equiv As Double = 0

        Dim A_0 As Double = 0

        Dim FinOverallEfficiency As Double = 0
        'A_Secondary_Surface_Fin = 178

        A_0 = A_Secondary_Surface_Fin + A_Prime_Surface_tube

        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger with Louvered Fins using Thermal Resistance Concept>> - Equat. n.27
        ' Please also see: R.K. Shah and D.P. Sekulic, <<Fundamental of Heat Exchanger Design>>, John Wiley 2003
        ' Equation 4.160, pag.289
        FinOverallEfficiency = 1 - (1 - FinEfficiency) * (A_Secondary_Surface_Fin / A_0)

        '#######################################################################################################################################################
        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger with Louvered Fins using Thermal Resistance Concept>> - Equat. n.19
        'D.Jung and D. N. Assanis - <<Numerical Modeling of Cross Flow Compact Heat Exchanger with Louvered Fins using Thermal Resistance Concept>> - Equat. n.27
        ' Please also see: R.K. Shah and D.P. Sekulic, <<Fundamental of Heat Exchanger Design>>, John Wiley 2003
        ' Equation 4.163, pag.290
        R_equiv = (1 / _this_h_refr) + (Tube_th / Lambda_metal) + (A_tube / (_this_h_air * A_0 * FinOverallEfficiency))

        'OK - Checked 
        U_equiv = 1 / R_equiv
        '#######################################################################################################################################################

        Return U_equiv

    End Function

#End Region



End Class

'C. Gnesutta, 13th March 2018. Laus Deo Virginique Matri.
