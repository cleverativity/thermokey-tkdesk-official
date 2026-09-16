Imports System.Math

Public Class TkRefrigerantProperties


#Region "MonoPhase Refrigerant Properties - Superheated Gas"

    'Superheated gas density [kg/m^3] - SUPERHEATED GAS
    Public Function CalculationOfGasDensity(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim thisGasDensity As Double = 0

        ' Trasformazione della pressione del vapore da Pascal in Bar 
        _refrPressure = _refrPressure / 100000

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
            ' Density of the Superheated Vapor [kg/m^3] -"R32"
            ' SUPERHEATED  VAPOR - DENSITY - OK - Ricontrollato

            Case "R-32"
                thisGasDensity = +2.99703612914129 * 1 + -0.207552865561904 * _refrTemperature + -0.00358452887856728 * _refrTemperature ^ 2 + 0.0000576158737666155 * _refrTemperature ^ 3 + 1.98035492826173 * _refrPressure + 0.0511270765436583 * _refrTemperature * _refrPressure + -0.000179496988707153 * _refrTemperature ^ 2 * _refrPressure + -0.00000426411462054804 * _refrTemperature ^ 3 * _refrPressure + -0.00378045239305598 * _refrTemperature * _refrPressure ^ 2 + 0.0000458379230701309 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000000462850846832886 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.00493452963100323 * _refrPressure ^ 3 + -0.0000511025565991022 * _refrTemperature * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'DENSITA' DEL VAPORE SURRISCALDATO - R134A - Desurriscaldamento - Ok ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-134a"
                thisGasDensity = +0.276304562929434 * 1 + 0.00548987054132591 * _refrTemperature + -0.00123394715567553 * _refrTemperature ^ 2 + 0.0000109244188209837 * _refrTemperature ^ 3 + 4.23636193221317 * _refrPressure + 0.000179049095237208 * _refrTemperature ^ 2 * _refrPressure + -0.00000269769358468408 * _refrTemperature ^ 3 * _refrPressure + 0.135938485383845 * _refrPressure ^ 2 + -0.00586398748162938 * _refrTemperature * _refrPressure ^ 2 + 0.0000520959558839767 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000000423591009654795 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0129909010834947 * _refrPressure ^ 3 + -0.00012358756081851 * _refrTemperature * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
                ' Density of the Superheated Vapor [kg/m^3] -"R-245fa
                ' SUPERHEATED  VAPOR - DENSITY -R-245fa - OK- Ricontrollato.

            Case "R-245fa"
                thisGasDensity = +-0.183186756951695 * 1 + 0.00364789876110036 * _refrTemperature + 0.000073681927258598 * _refrTemperature ^ 2 + -0.000000775452288330337 * _refrTemperature ^ 3 + 6.18542029831141 * _refrPressure + -0.0338681843208707 * _refrTemperature * _refrPressure + 0.000141342295731664 * _refrTemperature ^ 2 * _refrPressure + 0.316350434287403 * _refrPressure ^ 2 + -0.00223640791086328 * _refrTemperature * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'DENSITA' DEL VAPORE SURRISCALDATO - R404A - Desurriscaldamento - OK ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-404A"
                thisGasDensity = +-15.4594044135213 * 1 + -0.431249591723851 * _refrTemperature + 0.00775637132109047 * _refrTemperature ^ 2 + -0.0000247300414626048 * _refrTemperature ^ 3 + 9.59688433349872 * _refrPressure + 0.0385392260192134 * _refrTemperature * _refrPressure + -0.00149200884465874 * _refrTemperature ^ 2 * _refrPressure + 0.00000498916168281079 * _refrTemperature ^ 3 * _refrPressure + -0.531258121451011 * _refrPressure ^ 2 + 0.00010694740020862 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000005230580518779 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0323305268354837 * _refrPressure ^ 3 + -0.000523439060877152 * _refrTemperature * _refrPressure ^ 3 + 0.00000204989910960854 * _refrTemperature ^ 2 * _refrPressure ^ 3

                'DENSITA' DEL VAPORE SURRISCALDATO - R407C - Desurriscaldamento - OK ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-407C"
                thisGasDensity = +1.83280513938467 * 1 + -0.0708284267838399 * _refrTemperature + -0.00202663072322195 * _refrTemperature ^ 2 + 0.0000260776834396445 * _refrTemperature ^ 3 + 3.32284868416695 * _refrPressure + 0.0273691005494981 * _refrTemperature * _refrPressure + -0.00000354195370611261 * _refrTemperature ^ 3 * _refrPressure + 0.0725449170202418 * _refrPressure ^ 2 + -0.00555626055188662 * _refrTemperature * _refrPressure ^ 2 + 0.0000579757782515014 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.000000060416262352786 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.00930626214215335 * _refrPressure ^ 3 + -0.0000929807300780457 * _refrTemperature * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
                ' Density of the Superheated Vapor [kg/m^3] -R407 F
                ' SUPERHEATED  VAPOR - DENSITY- R407 F - OK - Ricontrollato

            Case "R-407F"
                thisGasDensity = +1.85647528128739 * 1 + -0.0782170535329672 * _refrTemperature + -0.00297438422117367 * _refrTemperature ^ 2 + 0.0000369269725201946 * _refrTemperature ^ 3 + 3.1637963468551 * _refrPressure + 0.0342876172534696 * _refrTemperature * _refrPressure + -0.00000433028560272314 * _refrTemperature ^ 3 * _refrPressure + 0.0536017033082171 * _refrPressure ^ 2 + -0.00555026427208315 * _refrTemperature * _refrPressure ^ 2 + 0.0000598483017410824 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000000577354885365968 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0088994851715022 * _refrPressure ^ 3 + -0.0000898870324037666 * _refrTemperature * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'DENSITA' DEL VAPORE SURRISCALDATO - R410A - Desurriscaldamento -  OK - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-410A"

                thisGasDensity = +-18.0238072637614 * 1 + -0.439314283521589 * _refrTemperature + 0.00923159925110102 * _refrTemperature ^ 2 + -0.0000379526782924107 * _refrTemperature ^ 3 + 7.69237849452335 * _refrPressure + 0.0239755183864442 * _refrTemperature * _refrPressure + -0.00121456589909322 * _refrTemperature ^ 2 * _refrPressure + 0.00000483835206842077 * _refrTemperature ^ 3 * _refrPressure + -0.329219538419727 * _refrPressure ^ 2 + 0.000335311647577735 * _refrTemperature * _refrPressure ^ 2 + 0.0000638157577129484 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.000000338647473492733 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0148405064036316 * _refrPressure ^ 3 + -0.000246474140711728 * _refrTemperature * _refrPressure ^ 3 + 0.00000100621036169382 * _refrTemperature ^ 2 * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'DENSITA' DEL VAPORE SURRISCALDATO [kg/m^3] - R449A - Desurriscaldamento -  OK - Equazione inserita da Cristiano Gnesutta il 20 Aprile 2018. 
            Case "R-449a"
                thisGasDensity = +0.288890651014764 * 1 + 0.0124752726135069 * _refrTemperature + 0.000104296074595393 * _refrTemperature ^ 2 + -0.0000066895674150899 * _refrTemperature ^ 3 + 3.71405636228497 * _refrPressure + -0.0238322985719909 * _refrTemperature * _refrPressure + 0.000316376137230971 * _refrTemperature ^ 2 * _refrPressure + -0.000000669921910379588 * _refrTemperature ^ 3 * _refrPressure + 0.17635343218421 * _refrPressure ^ 2 + -0.00303859256443182 * _refrTemperature * _refrPressure ^ 2 + 0.00000761026492567812 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.00236380424833846 * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Added by C. Gnesutta, December 11th 2017 - OK
            Case "R-513a"
                thisGasDensity = +1.40467475690562 * 1 + -0.0530787689089091 * _refrTemperature + -0.000838548562958853 * _refrTemperature ^ 2 + 0.0000119424503970172 * _refrTemperature ^ 3 + 4.27575453743268 * _refrPressure + 0.0186827518278353 * _refrTemperature * _refrPressure + -0.00000269302026524718 * _refrTemperature ^ 3 * _refrPressure + 0.13611693328166 * _refrPressure ^ 2 + -0.00758946052902737 * _refrTemperature * _refrPressure ^ 2 + 0.0000747206982736426 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000000850831211445407 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0178663960449365 * _refrPressure ^ 3 + -0.000172919997130559 * _refrTemperature * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                ' Density of the Superheated Vapor [kg/m^3] -R600 
                ' SUPERHEATED  VAPOR - DENSITY - R600 - OK- Ricontrollato

            Case "R-600"
                thisGasDensity = +-0.0436484117784197 * 1 + 0.00252837522046293 * _refrTemperature + 0.00000626411582963484 * _refrTemperature ^ 2 + 2.57589136222628 * _refrPressure + -0.0119325876279528 * _refrTemperature * _refrPressure + 0.0000316324997327209 * _refrTemperature ^ 2 * _refrPressure + 0.0000000504163404710496 * _refrTemperature ^ 3 * _refrPressure + 0.110177419857028 * _refrPressure ^ 2 + -0.000666367748605715 * _refrTemperature * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                ' Density of the Superheated Vapor [kg/m^3] -R600a 
                ' SUPERHEATED  VAPOR - DENSITY - R600a - OK - Ricontrollato.

            Case "R-600a"
                thisGasDensity = +0.0744791353807761 * 1 + 0.00266636587479587 * _refrTemperature + 0.00000508375211327377 * _refrTemperature ^ 2 + -0.00000121965833214146 * _refrTemperature ^ 3 + 2.47095313955444 * _refrPressure + -0.0118978791883441 * _refrTemperature * _refrPressure + 0.000114719417964275 * _refrTemperature ^ 2 * _refrPressure + -0.000000200795554878901 * _refrTemperature ^ 3 * _refrPressure + 0.130257431509191 * _refrPressure ^ 2 + -0.00203230524001273 * _refrTemperature * _refrPressure ^ 2 + 0.00000451812361952909 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.00312322375355936 * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
                ' Density of the Superheated Vapor [kg/m^3] -"R-1234yf"
                ' SUPERHEATED  VAPOR - DENSITY - OK, ricontrollata.
            Case "R-1234yf"
                thisGasDensity = +1.39456358829502 * 1 + -0.0577267684035323 * _refrTemperature + -0.00121813113229698 * _refrTemperature ^ 2 + 0.0000161644852070901 * _refrTemperature ^ 3 + 4.53548431572387 * _refrPressure + 0.0253153988843163 * _refrTemperature * _refrPressure + -0.00000345157512049429 * _refrTemperature ^ 3 * _refrPressure + 0.122743200846471 * _refrPressure ^ 2 + -0.00872118696747092 * _refrTemperature * _refrPressure ^ 2 + 0.0000884041200651115 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000000896109352884852 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0227270066614766 * _refrPressure ^ 3 + -0.000220917701136386 * _refrTemperature * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'DENSITA' DEL VAPORE SURRISCALDATO - R41234ze - Desurriscaldamento - OK - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016  - OK
            Case "R-1234ze"
                thisGasDensity = +0.603211308920185 * 1 + 0.0106514837195737 * _refrTemperature + 0.0000659746839264992 * _refrTemperature ^ 2 + -0.00000751740967526093 * _refrTemperature ^ 3 + 4.59306121862612 * _refrPressure + -0.0264392641249432 * _refrTemperature * _refrPressure + 0.0003966533976814 * _refrTemperature ^ 2 * _refrPressure + -0.000000728641538559612 * _refrTemperature ^ 3 * _refrPressure + 0.2864579261385 * _refrPressure ^ 2 + -0.00514218506468304 * _refrTemperature * _refrPressure ^ 2 + 0.0000119061299053466 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.00569069047949994 * _refrPressure ^ 3


            Case Else
        End Select

        Return thisGasDensity
    End Function


    'Superheated gas viscosity [Pa*s] - SUPERHEATED GAS
    Public Function CalculationOfGasViscosity(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double

        Dim thisGasViscosity As Double = 0

        ' Trasformazione della pressione del vapore da Pascal in Bar 
        _refrPressure = _refrPressure / 100000

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
            'Viscosity of the Superheated Vapor [microPa*s] - "R-32"
            ' SUPERHEATED  VAPOR  -  VISCOSITY - OK - Ricontrollato.

            Case "R-32"

                thisGasViscosity = +11.5152143985389 * 1 + 0.0380219441356819 * _refrTemperature + -0.000121295269183253 * _refrTemperature ^ 2 + 0.00000179542104405406 * _refrTemperature ^ 3 + 0.00197803864120978 * _refrTemperature * _refrPressure + -0.00000936818065023636 * _refrTemperature ^ 2 * _refrPressure + -0.000000116539938504967 * _refrTemperature ^ 3 * _refrPressure + -0.00174193774612415 * _refrPressure ^ 2 + -0.0000828387001716246 * _refrTemperature * _refrPressure ^ 2 + 0.00000119895109960479 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.000000000933725608777861 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.000159006707874322 * _refrPressure ^ 3 + -0.00000162828006872159 * _refrTemperature * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'VISCOSITA' DEL VAPORE SURRISCALDATO - R134A - Desurriscaldamento - OK ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-134a"

                thisGasViscosity = +10.9205131517707 * 1 + 0.0384252910255018 * _refrTemperature + 0.0000024432471633746 * _refrTemperature ^ 2 + -0.000000322172045199032 * _refrTemperature ^ 3 + -0.0697095063306934 * _refrPressure + 0.00112314343826737 * _refrTemperature * _refrPressure + 0.0000000176173053224138 * _refrTemperature ^ 3 * _refrPressure + 0.00267873452650591 * _refrPressure ^ 2 + -0.0000509850988054152 * _refrTemperature * _refrPressure ^ 2 + -0.000000124755349374134 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.00000000051448763348319 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.000122866176857391 * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale

                'Viscosity of the Superheated Vapor [microPa*s] - R-245fa
                ' SUPERHEATED  VAPOR  -  VISCOSITY - R-245fa- OK- Ricontrollato.

            Case "R-245fa"

                thisGasViscosity = +9.62648440669997 * 1 + 0.034930779175113 * _refrTemperature + -0.00000603806769667193 * _refrTemperature ^ 2 + -0.0974584103357437 * _refrPressure + 0.00206581997667332 * _refrTemperature * _refrPressure + -0.0000178226622935497 * _refrTemperature ^ 2 * _refrPressure + 0.0000000520939553369396 * _refrTemperature ^ 3 * _refrPressure + 0.00483585248627563 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'VISCOSITA' DEL VAPORE SURRISCALDATO - R404A - Desurriscaldamento -  OK    ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-404A"

                thisGasViscosity = +13.5137450012247 * 1 + -0.128676858625646 * _refrTemperature + 0.00369770283618968 * _refrTemperature ^ 2 + -0.0000359993593124276 * _refrTemperature ^ 3 + -0.499164922762013 * _refrPressure + 0.0339392816182644 * _refrTemperature * _refrPressure + -0.000708989127866263 * _refrTemperature ^ 2 * _refrPressure + 0.00000556896071369021 * _refrTemperature ^ 3 * _refrPressure + 0.0256254161165499 * _refrPressure ^ 2 + -0.00208299181562581 * _refrTemperature * _refrPressure ^ 2 + 0.0000512104275887743 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.000000421163976466349 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0000162731385666778 * _refrTemperature * _refrPressure ^ 3 + -0.00000079802561275205 * _refrTemperature ^ 2 * _refrPressure ^ 3 + 0.00000000782385772179007 * _refrTemperature ^ 3 * _refrPressure ^ 3 + 0.000000176500602831845 * _refrTemperature ^ 4 + -0.0000000205705797052 * _refrTemperature ^ 4 * _refrPressure + 0.00000000134688093395653 * _refrTemperature ^ 4 * _refrPressure ^ 2 + -0.0000000000259802114190679 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.0000118633625536644 * _refrPressure ^ 4

                'VISCOSITA' DEL VAPORE SURRISCALDATO - R407C - Desurriscaldamento -  OK  ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-407C"

                thisGasViscosity = +14.4092188424251 * 1 + -0.122704249297556 * _refrTemperature + 0.00263126600296146 * _refrTemperature ^ 2 + -0.0000139175093107965 * _refrTemperature ^ 3 + -0.511239753665923 * _refrPressure + 0.0265467310131836 * _refrTemperature * _refrPressure + -0.000417908617900958 * _refrTemperature ^ 2 * _refrPressure + 0.00000215702851761973 * _refrTemperature ^ 3 * _refrPressure + 0.0206001315419173 * _refrPressure ^ 2 + -0.00123424037259168 * _refrTemperature * _refrPressure ^ 2 + 0.0000205084773171508 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.000000107104261759966 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0000133078693786762 * _refrTemperature * _refrPressure ^ 3 + -0.000000283719069320469 * _refrTemperature ^ 2 * _refrPressure ^ 3 + 0.00000000160894750103697 * _refrTemperature ^ 3 * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
                'Viscosity of the Superheated Vapor [microPa*s] - R-407F
                ' SUPERHEATED  VAPOR  -  VISCOSITY - R-407F - OK- Ricontrollato.

            Case "R-407F"

                thisGasViscosity = +11.9784796576219 * 1 + 0.00885598880389105 * _refrTemperature + 0.000434944863438279 * _refrTemperature ^ 2 + -0.00000184734312705562 * _refrTemperature ^ 3 + -0.0787124488783504 * _refrPressure + 0.00491157897354713 * _refrTemperature * _refrPressure + -0.0000547861979938659 * _refrTemperature ^ 2 * _refrPressure + 0.000000156150649635626 * _refrTemperature ^ 3 * _refrPressure + -0.000171373752991176 * _refrTemperature * _refrPressure ^ 2 + 0.00000237581665924924 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.00000000617994361768477 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.000278156978715427 * _refrPressure ^ 3 + -0.00000267946788395016 * _refrTemperature * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'VISCOSITA' DEL VAPORE SURRISCALDATO - R410A - Desurriscaldamento - OK - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-410A"
                thisGasViscosity = +12.3263450857626 * 1 + 0.0278878742843971 * _refrTemperature + -0.000150731622623516 * _refrTemperature ^ 2 + 0.00000331381769708935 * _refrTemperature ^ 3 + 0.00438027496608587 * _refrTemperature * _refrPressure + -0.0000271599130977746 * _refrTemperature ^ 2 * _refrPressure + -0.00000020182265451169 * _refrTemperature ^ 3 * _refrPressure + -0.00422510341183301 * _refrPressure ^ 2 + -0.000169428360757752 * _refrTemperature * _refrPressure ^ 2 + 0.0000025905436571254 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.00000000255876911630187 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.000329878331626395 * _refrPressure ^ 3 + -0.00000342630014737841 * _refrTemperature * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'VISCOSITA' DEL VAPORE SURRISCALDATO - R449A - Desurriscaldamento - OK - Inserita da Cristiano Gnesutta il 20 Aprile 2018. 
            Case "R-449a"
                thisGasViscosity = +8.06888202554086 * 1 + 0.158358482113118 * _refrTemperature + -0.00173956182326915 * _refrTemperature ^ 2 + 0.00000831658086075906 * _refrTemperature ^ 3 + 0.983546251642362 * _refrPressure + -0.0413167076141608 * _refrTemperature * _refrPressure + 0.000570959415579396 * _refrTemperature ^ 2 * _refrPressure + -0.00000259711973594659 * _refrTemperature ^ 3 * _refrPressure + -0.110622201646364 * _refrPressure ^ 2 + 0.00436372891308658 * _refrTemperature * _refrPressure ^ 2 + -0.0000569317307372662 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.000000247408428593144 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.00383418058117166 * _refrPressure ^ 3 + -0.000141203783059276 * _refrTemperature * _refrPressure ^ 3 + 0.0000017627458609023 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.00000000739255385593229 * _refrTemperature ^ 3 * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'Added by C. Gnesutta, December 11th 2017
                ' Superheated Gas Viscosity [microPa*s] - "R-513a" - OK
            Case "R-513a"
                thisGasViscosity = +7.78716431220225 * 1 + 0.271278269645768 * _refrTemperature + -0.00662498399543088 * _refrTemperature ^ 2 + 0.0000779305716120854 * _refrTemperature ^ 3 + 0.436766281899177 * _refrPressure + -0.0399864350169639 * _refrTemperature * _refrPressure + 0.0011733578474809 * _refrTemperature ^ 2 * _refrPressure + -0.0000140806151945946 * _refrTemperature ^ 3 * _refrPressure + 0.000597480738860016 * _refrTemperature * _refrPressure ^ 2 + -0.0000307346036585129 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.000000491398886649968 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.000979648578088847 * _refrPressure ^ 3 + 0.0000664570369848913 * _refrTemperature * _refrPressure ^ 3 + -0.00000113897011091821 * _refrTemperature ^ 2 * _refrPressure ^ 3 + 0.00000000605331868805529 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.00000033074505112153 * _refrTemperature ^ 4 + 0.0000000608417302846936 * _refrTemperature ^ 4 * _refrPressure + -0.00000000254769361763234 * _refrTemperature ^ 4 * _refrPressure ^ 2


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                'Viscosity of the Superheated Vapor [microPa*s] - R-600
                ' SUPERHEATED  VAPOR  -  VISCOSITY - R-600 - OK- Ricontrollato

            Case "R-600"

                thisGasViscosity = +6.78514970437041 * 1 + 0.0260707648671173 * _refrTemperature + -0.0000308178033282687 * _refrTemperature ^ 2 + 0.000000210783999141871 * _refrTemperature ^ 3 + -0.0405589255924583 * _refrPressure + 0.000848661195212368 * _refrTemperature * _refrPressure + -0.00000565799484649192 * _refrTemperature ^ 2 * _refrPressure + 0.00367759715066828 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                'Viscosity of the Superheated Vapor [microPa*s] - R-600a
                ' SUPERHEATED  VAPOR  -  VISCOSITY - R-600a - OK- Ricontrollato

            Case "R-600a"

                thisGasViscosity = +6.89702833680128 * 1 + 0.0251260364794383 * _refrTemperature + -0.00000729444020551627 * _refrTemperature ^ 2 + -0.0349938080152084 * _refrPressure + 0.000243656989823551 * _refrTemperature * _refrPressure + -0.0000016111275170374 * _refrTemperature ^ 2 * _refrPressure + 0.0000000132320014427209 * _refrTemperature ^ 3 * _refrPressure + 0.00759957059714778 * _refrPressure ^ 2 + -0.0000445149827457297 * _refrTemperature * _refrPressure ^ 2
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
                'Viscosity of the Superheated Vapor [microPa*s] - "R-1234yf"
                ' SUPERHEATED  VAPOR  -  VISCOSITY - OK, ricontrollata.
            Case "R-1234yf"

                thisGasViscosity = +10.2363921710402 * 1 + 0.0384820996405744 * _refrTemperature + -0.0000836268565290984 * _refrTemperature ^ 2 + 0.000000736627336314502 * _refrTemperature ^ 3 + -0.0603414707848011 * _refrPressure + 0.00254734611481979 * _refrTemperature * _refrPressure + -0.00000796926612761756 * _refrTemperature ^ 2 * _refrPressure + -0.000000102889593998046 * _refrTemperature ^ 3 * _refrPressure + -0.00252130967481135 * _refrPressure ^ 2 + -0.000149192036453136 * _refrTemperature * _refrPressure ^ 2 + 0.00000190901419495626 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.000838221098779113 * _refrPressure ^ 3 + -0.00000792908164661124 * _refrTemperature * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'VISCOSITA' DEL VAPORE SURRISCALDATO - R1234ze - Desurriscaldamento  - OK - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 - OK
            Case "R-1234ze"
                thisGasViscosity = +11.3255248468986 * 1 + 0.0461084500611893 * _refrTemperature + -0.0000859366658005425 * _refrTemperature ^ 2 + 0.000000598689034378097 * _refrTemperature ^ 3 + -0.0890104997650021 * _refrPressure + 0.00148491490207634 * _refrTemperature * _refrPressure + -0.00000900123244006049 * _refrTemperature ^ 2 * _refrPressure + 0.00336093990660349 * _refrPressure ^ 2


            Case Else
        End Select

        ' Trasforma i microPascal in Pascal
        'OK - Ricontrollata
        thisGasViscosity = (thisGasViscosity / 1000000)

        Return thisGasViscosity
    End Function


    'Superheated gas thermal conductivity [W/(m*°K)]  - SUPERHEATED GAS
    Public Function CalculationOfGasThermalConductivity(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double

        Dim thisGasThermalConductivity As Double = 0

        ' Trasformazione della pressione del vapore da Pascal in Bar 
        _refrPressure = _refrPressure / 100000

        Select Case RefType


            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
            'Thermal Conductivity of the Superheated Vapor [(mW)/(m*°K)] - R32
            ' SUPERHEATED  VAPOR  -  Thermal Conductivity  - R32 - OK - Ricontrollato.
            Case "R-32"
                thisGasThermalConductivity = +6.07538630273648 * 1 + 0.339529041836621 * _refrTemperature + -0.00563079179892672 * _refrTemperature ^ 2 + 0.0000883599761582664 * _refrTemperature ^ 3 + 0.777669566924322 * _refrPressure + -0.04068747889134 * _refrTemperature * _refrPressure + 0.000464758374489282 * _refrTemperature ^ 2 * _refrPressure + -0.000005469387196854 * _refrTemperature ^ 3 * _refrPressure + -0.0380187380628367 * _refrPressure ^ 2 + 0.00290550309214944 * _refrTemperature * _refrPressure ^ 2 + -0.0000230602562213359 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.000570627765723095 * _refrPressure ^ 3 + -0.000114323094611863 * _refrTemperature * _refrPressure ^ 3 + 0.00000167186851661962 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.00000000621236408388371 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.000000590688954818624 * _refrTemperature ^ 4 + 0.0000000504695906528045 * _refrTemperature ^ 4 * _refrPressure + -0.000000000722360205017805 * _refrTemperature ^ 4 * _refrPressure ^ 2 + 0.0000000000157253424131603 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.000065454305403953 * _refrPressure ^ 4 + -0.000000751941855387683 * _refrTemperature * _refrPressure ^ 4
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'CONDUCIBILITA' TERMICA DEL VAPORE SURRISCALDATO - R134A - Desurriscaldamento -    OK -  ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-134a"
                thisGasThermalConductivity = +11.4668005782685 * 1 + 0.0769207141948934 * _refrTemperature + -0.000127749058332748 * _refrTemperature ^ 2 + 0.00000147526350197439 * _refrTemperature ^ 3 + -0.0173133696256778 * _refrPressure + 0.00333352146236538 * _refrTemperature * _refrPressure + -0.000000305731613547856 * _refrTemperature ^ 3 * _refrPressure + 0.00569622183813118 * _refrPressure ^ 2 + -0.00067476810535356 * _refrTemperature * _refrPressure ^ 2 + 0.00000720580784959194 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000000075804960427582 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.00171219205506315 * _refrPressure ^ 3 + -0.0000170800727700915 * _refrTemperature * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                'Thermal Conductivity of the Superheated Vapor [(mW)/(m*°K)] -R-245fa 
                ' SUPERHEATED  VAPOR  -  Thermal Conductivity  - R-245fa - OK - Ricontrollato.

            Case "R-245fa"
                thisGasThermalConductivity = +11.3065888592429 * 1 + 0.0574201047646945 * _refrTemperature + 0.000281550827441914 * _refrTemperature ^ 2 + -0.000000504629049246375 * _refrTemperature ^ 3 + -0.00519557256291425 * _refrPressure + -0.0000032084879913718 * _refrTemperature ^ 2 * _refrPressure + 0.00000000956782155131419 * _refrTemperature ^ 3 * _refrPressure + 0.00379185095266966 * _refrPressure ^ 2
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'CONDUCIBILITA' TERMICA DEL VAPORE SURRISCALDATO - R404A - Desurriscaldamento -     OK  -    ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-404A"
                thisGasThermalConductivity = +7.74278301799755 * 1 + 0.312918006630372 * _refrTemperature + -0.00434956303540966 * _refrTemperature ^ 2 + 0.0000689761509689015 * _refrTemperature ^ 3 + 1.08736226836512 * _refrPressure + -0.0481375094750683 * _refrTemperature * _refrPressure + 0.000484326388195705 * _refrTemperature ^ 2 * _refrPressure + -0.00000557156537394516 * _refrTemperature ^ 3 * _refrPressure + -0.0854351243472564 * _refrPressure ^ 2 + 0.00503417470961192 * _refrTemperature * _refrPressure ^ 2 + -0.0000384042544393429 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.00174293643985875 * _refrPressure ^ 3 + -0.000254073951008836 * _refrTemperature * _refrPressure ^ 3 + 0.00000362257268070518 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.000000013661023292290099 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.00000047032892067629 * _refrTemperature ^ 4 + 0.0000000540257021971004 * _refrTemperature ^ 4 * _refrPressure + -0.00000000103450788993944 * _refrTemperature ^ 4 * _refrPressure ^ 2 + 0.0000000000335653483511323 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.00018033368639344 * _refrPressure ^ 4 + -0.0000020515020964944 * _refrTemperature * _refrPressure ^ 4

                'CONDUCIBILITA' TERMICA DEL VAPORE SURRISCALDATO - R407C - Desurriscaldamento -    OK     -    ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-407C"
                thisGasThermalConductivity = +11.9312667972003 * 1 + 0.0670519317703092 * _refrTemperature + -0.000346333695002625 * _refrTemperature ^ 2 + 0.00000495214895820315 * _refrTemperature ^ 3 + -0.0329782761046689 * _refrPressure + 0.00605168145407423 * _refrTemperature * _refrPressure + -0.000000617478545365858 * _refrTemperature ^ 3 * _refrPressure + 0.00205178917167101 * _refrPressure ^ 2 + -0.000747060293194357 * _refrTemperature * _refrPressure ^ 2 + 0.00000851745066698011 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.00000000729244481398598 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.00144916174838985 * _refrPressure ^ 3 + -0.0000148554861146378 * _refrTemperature * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
                'Thermal Conductivity of the Superheated Vapor [(mW)/(m*°K)] -R407F
                ' SUPERHEATED  VAPOR  -  Thermal Conductivity  - R407F - Ok- Ricontrollato.

            Case "R-407F"
                thisGasThermalConductivity = +10.8710184079048 * 1 + 0.0430612564255546 * _refrTemperature + 0.000678878735938259 * _refrTemperature ^ 2 + -0.00000265151096783991 * _refrTemperature ^ 3 + 0.342430991243792 * _refrPressure + 0.00320625855287122 * _refrTemperature * _refrPressure + -0.000104354384685896 * _refrTemperature ^ 2 * _refrPressure + 0.000000446310889613355 * _refrTemperature ^ 3 * _refrPressure + -0.0347127928418122 * _refrPressure ^ 2 + 0.00000749370146984686 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000000408356930788075 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.00232477466209038 * _refrPressure ^ 3 + -0.0000390406350152749 * _refrTemperature * _refrPressure ^ 3 + 0.000000163917752678893 * _refrTemperature ^ 2 * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'CONDUCIBILITA' TERMICA DEL VAPORE SURRISCALDATO - R410A - Desurriscaldamento -    OK    -    ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-410A"
                thisGasThermalConductivity = +4.195613636111 * 1 + 0.431921933328399 * _refrTemperature + -0.00686721761150343 * _refrTemperature ^ 2 + 0.000105392106568344 * _refrTemperature ^ 3 + 1.23758918484377 * _refrPressure + -0.0573706889501484 * _refrTemperature * _refrPressure + 0.000591175473974143 * _refrTemperature ^ 2 * _refrPressure + -0.000006291392973057 * _refrTemperature ^ 3 * _refrPressure + -0.0712189068160369 * _refrPressure ^ 2 + 0.00440079993873848 * _refrTemperature * _refrPressure ^ 2 + -0.0000352514933680931 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.00115006268823206 * _refrPressure ^ 3 + -0.000166850020569594 * _refrTemperature * _refrPressure ^ 3 + 0.00000242000617530285 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.00000000919117255316797 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.000000722247841466872 * _refrTemperature ^ 4 + 0.0000000612491268034077 * _refrTemperature ^ 4 * _refrPressure + -0.000000000851834548489023 * _refrTemperature ^ 4 * _refrPressure ^ 2 + 0.0000000000220426854532423 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.0000880770857248253 * _refrPressure ^ 4 + -0.00000101985378170428 * _refrTemperature * _refrPressure ^ 4



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'CONDUCIBILITA' TERMICA DEL VAPORE SURRISCALDATO - R449A - Desurriscaldamento -    OK    -  Inserita da Cristiano Gnesutta il 18 Aprile 2018. 
            Case "R-449a"

                thisGasThermalConductivity = +11.3844140036965 * 1 + 0.0845720816400454 * _refrTemperature + -0.0000607822342309082 * _refrTemperature ^ 2 + 0.0524635127792532 * _refrPressure + -0.00427783832082099 * _refrTemperature * _refrPressure + 0.000080397417730397 * _refrTemperature ^ 2 * _refrPressure + -0.000000275276404671823 * _refrTemperature ^ 3 * _refrPressure + 0.0150040824729573 * _refrPressure ^ 2 + -0.000227534081392684 * _refrTemperature * _refrPressure ^ 2 + -0.00000100326198577963 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.00000000833914872265613 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.00034271952151673 * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Added by C. Gnesutta, December 11th 2017
                'Superheated Gas Thermal Conductivity [mW/(m*°K)]  -"R-513a"- OK
            Case "R-513a"
                thisGasThermalConductivity = +10.5492809430408 * 1 + 0.132508680784685 * _refrTemperature + -0.00101024951653852 * _refrTemperature ^ 2 + 0.00000637093461615038 * _refrTemperature ^ 3 + 0.260476752794058 * _refrPressure + -0.00829964071947947 * _refrTemperature * _refrPressure + 0.000174064106636455 * _refrTemperature ^ 2 * _refrPressure + -0.00000121950453133885 * _refrTemperature ^ 3 * _refrPressure + -0.0160342997643623 * _refrPressure ^ 2 + -0.0000710087344927084 * _refrTemperature * _refrPressure ^ 2 + 0.0000000299234769853977 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.00222498458183466 * _refrPressure ^ 3 + -0.0000230182778954355 * _refrTemperature * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                'Thermal Conductivity of the Superheated Vapor [(mW)/(m*°K)] -R-600
                ' SUPERHEATED  VAPOR  -  Thermal Conductivity  - R-600 - OK - Ricontrollato.

            Case "R-600"
                thisGasThermalConductivity = +14.1855408075505 * 1 + 0.091790682786355 * _refrTemperature + 0.000116463543792904 * _refrTemperature ^ 2 + 0.000000409790616919061 * _refrTemperature ^ 3 + -0.0383473747403555 * _refrPressure + 0.00139697405978129 * _refrTemperature * _refrPressure + -0.00000984126210544381 * _refrTemperature ^ 2 * _refrPressure + 0.00893186218609331 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                'Thermal Conductivity of the Superheated Vapor [(mW)/(m*°K)] -R-600a
                ' SUPERHEATED  VAPOR  -  Thermal Conductivity  - R-600a -OK - Ricontrollato.
            Case "R-600a"
                thisGasThermalConductivity = +14.3801430679188 * 1 + 0.101286776855828 * _refrTemperature + 0.0000302877509280324 * _refrTemperature ^ 2 + 0.000000965418714828867 * _refrTemperature ^ 3 + -0.11550189669471 * _refrPressure + 0.00199360496242264 * _refrTemperature * _refrPressure + -0.0000159519155548598 * _refrTemperature ^ 2 * _refrPressure + 0.010683170871391 * _refrPressure ^ 2
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
                'Thermal Conductivity of the Superheated Vapor [(mW)/(m*°K)] - "R-1234yf"
                ' SUPERHEATED  VAPOR  -  Thermal Conductivity - OK, ricontrollata.

            Case "R-1234yf"
                thisGasThermalConductivity = +11.8395617643459 * 1 + 0.0818901090193514 * _refrTemperature + -0.000243342322344988 * _refrTemperature ^ 2 + 0.00000258516840142082 * _refrTemperature ^ 3 + -0.102593588158317 * _refrPressure + 0.00562148725930261 * _refrTemperature * _refrPressure + -0.000000462478682855029 * _refrTemperature ^ 3 * _refrPressure + -0.00225755981062786 * _refrPressure ^ 2 + -0.000732336916169529 * _refrTemperature * _refrPressure ^ 2 + 0.00000844647177497423 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.00000000466061748847162 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0025109869277072 * _refrPressure ^ 3 + -0.0000253129897391057 * _refrTemperature * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'CONDUCIBILITA' TERMICA DEL VAPORE SURRISCALDATO - R1234ze - Desurriscaldamento -    OK    -    ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 - OK
            Case "R-1234ze"
                thisGasThermalConductivity = +11.872489955712 * 1 + 0.0826894573299433 * _refrTemperature + 0.00000355057940973867 * _refrTemperature ^ 2 + -0.000000714734854388224 * _refrTemperature ^ 3 + -0.159689656650332 * _refrPressure + 0.000927622271576792 * _refrTemperature * _refrPressure + 0.000026391398835681 * _refrTemperature ^ 2 * _refrPressure + -0.0000000441112923177721 * _refrTemperature ^ 3 * _refrPressure + 0.0157318291035676 * _refrPressure ^ 2 + -0.000312576800045554 * _refrTemperature * _refrPressure ^ 2 + 0.00000000255440686431824 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.000572285119517116 * _refrPressure ^ 3

            Case Else
        End Select

        'Trasformazione da [(mW)/(m*°K)] in [(W)/(m*°K)]
        'OK - Ricontrollata
        thisGasThermalConductivity = thisGasThermalConductivity / 1000

        Return thisGasThermalConductivity
    End Function


    'Superheated gas specific heat [kJ/(kg*°k)]  - SUPERHEATED GAS
    Public Function CalculationOfGasSpecificHeat(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim thisGasSpecificHeat As Double = 0

        ' Trasformazione della pressione del vapore da Pascal in Bar 
        _refrPressure = _refrPressure / 100000

        Select Case RefType


            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
            ' Isobaric Specific Heat (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - "R-32"     
            ' SUPERHEATED  VAPOR  -  Isobaric Specific Heat (Cp) - VAPOR - OK-Ricontrollato.

            Case "R-32"
                thisGasSpecificHeat = +0.464313636771256 * 1 + 0.058565962607824 * _refrTemperature + -0.000916795327985779 * _refrTemperature ^ 2 + 0.00000183114631718069 * _refrTemperature ^ 3 + 0.0230222879191843 * _refrPressure + -0.0104256967207585 * _refrTemperature * _refrPressure + 0.000205068511961655 * _refrTemperature ^ 2 * _refrPressure + -0.00000107361077046275 * _refrTemperature ^ 3 * _refrPressure + 0.0108710715698516 * _refrPressure ^ 2 + 0.000394888524229081 * _refrTemperature * _refrPressure ^ 2 + -0.0000104699739079382 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.0000000512432240000911 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.000649621029734126 * _refrPressure ^ 3 + -0.0000073486585852645 * _refrTemperature * _refrPressure ^ 3 + 0.000000379418059933943 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.00000000281031972680033 * _refrTemperature ^ 3 * _refrPressure ^ 3 + 0.0000000257435281392214 * _refrTemperature ^ 4 + 0.0000000000459059212292269 * _refrTemperature ^ 4 * _refrPressure ^ 2 + 0.00000000000385111861962087 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.000024338305109202 * _refrPressure ^ 4 + -0.000000489195821471155 * _refrTemperature * _refrPressure ^ 4 + 0.00000000246669825883542 * _refrTemperature ^ 2 * _refrPressure ^ 4
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL VAPORE SURRISCALDATO - R134A - Desurriscaldamento -  OK  ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-134a"
                thisGasSpecificHeat = +0.825611958589784 * 1 + -0.00106844594310757 * _refrTemperature + 0.0000643156660818044 * _refrTemperature ^ 2 + -0.000000981357925368597 * _refrTemperature ^ 3 + 0.011003769814334 * _refrPressure + 0.000602181548153436 * _refrTemperature * _refrPressure + -0.00000452355270570649 * _refrTemperature ^ 2 * _refrPressure + -0.000000116756306490898 * _refrTemperature ^ 3 * _refrPressure + 0.00438171290315102 * _refrPressure ^ 2 + -0.000365092325712677 * _refrTemperature * _refrPressure ^ 2 + 0.00000771551512747084 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000000493369502325552 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.000577042016197817 * _refrPressure ^ 3 + -0.0000130814670355877 * _refrTemperature * _refrPressure ^ 3 + 0.000000000673802184659884 * _refrTemperature ^ 3 * _refrPressure ^ 3 + 0.0000000087894807036012 * _refrTemperature ^ 4 + 0.000000000190644267816588 * _refrTemperature ^ 4 * _refrPressure + 0.000000000121875713323303 * _refrTemperature ^ 4 * _refrPressure ^ 2 + -0.00000000000283887208458143 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.00000590299991363415 * _refrPressure ^ 4


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                ' Isobaric Specific Heat (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - "R-245fa"     
                ' SUPERHEATED  VAPOR  -  Isobaric Specific Heat (Cp) - VAPOR - R-245fa - OK-Ricontrollato.

            Case "R-245fa"
                thisGasSpecificHeat = +0.816376307390493 * 1 + 0.00141696343457123 * _refrTemperature + 0.0000228119690781121 * _refrTemperature ^ 2 + -0.000000419441738050719 * _refrTemperature ^ 3 + 0.100197235422249 * _refrPressure + -0.00291463006671961 * _refrTemperature * _refrPressure + 0.000039991646633578 * _refrTemperature ^ 2 * _refrPressure + -0.000000203442751565302 * _refrTemperature ^ 3 * _refrPressure + 0.0189797939552123 * _refrPressure ^ 2 + -0.000441669289740453 * _refrTemperature * _refrPressure ^ 2 + 0.00000199820949910385 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.00000000752276904067118 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.000135045505046515 * _refrPressure ^ 3 + 0.0000172209966343404 * _refrTemperature * _refrPressure ^ 3 + -0.000000170181786173124 * _refrTemperature ^ 2 * _refrPressure ^ 3 + 0.00000000235594447793397 * _refrTemperature ^ 4
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL VAPORE SURRISCALDATO - R134A - Desurriscaldamento - OK  ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-404A"

                thisGasSpecificHeat = +4.8531367880387 * 1 + -0.240278163700069 * _refrTemperature + 0.00543552107751911 * _refrTemperature ^ 2 + -0.0000523775305901816 * _refrTemperature ^ 3 + -1.06143734359169 * _refrPressure + 0.0639903994782428 * _refrTemperature * _refrPressure + -0.00147798582922806 * _refrTemperature ^ 2 * _refrPressure + 0.0000141183436527327 * _refrTemperature ^ 3 * _refrPressure + 0.108561502088776 * _refrPressure ^ 2 + -0.00620266301528094 * _refrTemperature * _refrPressure ^ 2 + 0.000152068959192926 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.00000181614930867143 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.00491602533188367 * _refrPressure ^ 3 + 0.000232744357003568 * _refrTemperature * _refrPressure ^ 3 + -0.00000482136603188852 * _refrTemperature ^ 2 * _refrPressure ^ 3 + 0.0000000591565347476864 * _refrTemperature ^ 3 * _refrPressure ^ 3 + 0.000000236397445842766 * _refrTemperature ^ 4 + -0.0000000332819744460997 * _refrTemperature ^ 4 * _refrPressure + 0.00000000821124297685982 * _refrTemperature ^ 4 * _refrPressure ^ 2 + -0.000000000308125075828693 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.000141054986043868 * _refrPressure ^ 4 + -0.00000664126864961225 * _refrTemperature * _refrPressure ^ 4 + 0.000000110081142115854 * _refrTemperature ^ 2 * _refrPressure ^ 4 + -0.00000000108486451048851 * _refrTemperature ^ 3 * _refrPressure ^ 4 + 0.00000000000531921783782002 * _refrTemperature ^ 4 * _refrPressure ^ 4 + -0.00000000126228728863057 * _refrTemperature ^ 5 + -0.000000000011448121229506 * _refrTemperature ^ 5 * _refrPressure ^ 2 + 0.000000000000528442407669939 * _refrTemperature ^ 5 * _refrPressure ^ 3 + -0.00000000000000955602777502935 * _refrTemperature ^ 5 * _refrPressure ^ 4 + 0.000000532866698433197 * _refrPressure ^ 5


                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL VAPORE SURRISCALDATO - R407C- Desurriscaldamento -  OK ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-407C"
                thisGasSpecificHeat = +0.545927960029671 * 1 + 0.0147306783155268 * _refrTemperature + -0.000289018919614045 * _refrTemperature ^ 2 + 0.00000356848717099564 * _refrTemperature ^ 3 + 0.0815037890957942 * _refrPressure + -0.00335274661431099 * _refrTemperature * _refrPressure + 0.0000590322479529632 * _refrTemperature ^ 2 * _refrPressure + -0.000000735453786932623 * _refrTemperature ^ 3 * _refrPressure + -0.0032686369265426 * _refrPressure ^ 2 + 0.000162086266106503 * _refrTemperature * _refrPressure ^ 2 + -0.000000582672938559223 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.000337851311224302 * _refrPressure ^ 3 + -0.0000212786918569574 * _refrTemperature * _refrPressure ^ 3 + 0.000000269573176892854 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.00000000114147577050331 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.0000000167883581234817 * _refrTemperature ^ 4 + 0.00000000407031290180429 * _refrTemperature ^ 4 * _refrPressure + -0.0000000000815401137981647 * _refrTemperature ^ 4 * _refrPressure ^ 2 + 0.00000000000297535827997045 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.0000124796090886499 * _refrPressure ^ 4 + -0.000000133687887384108 * _refrTemperature * _refrPressure ^ 4


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
                ' Isobaric Specific Heat (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - R-407F  
                ' SUPERHEATED  VAPOR  -  Isobaric Specific Heat (Cp) - VAPOR - R-407F  - OK -Ricontrollato.

            Case "R-407F"

                thisGasSpecificHeat = +0.438627150882184 * 1 + 0.0204637171731233 * _refrTemperature + -0.000418019485458886 * _refrTemperature ^ 2 + 0.00000549301510507137 * _refrTemperature ^ 3 + 0.099849559946454 * _refrPressure + -0.00419237462059093 * _refrTemperature * _refrPressure + 0.0000688793424699041 * _refrTemperature ^ 2 * _refrPressure + -0.000000866069982425269 * _refrTemperature ^ 3 * _refrPressure + -0.00461584750438787 * _refrPressure ^ 2 + 0.000236778406749197 * _refrTemperature * _refrPressure ^ 2 + -0.00000119144773414554 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.000318987454012323 * _refrPressure ^ 3 + -0.0000224864204836118 * _refrTemperature * _refrPressure ^ 3 + 0.000000293773102218922 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.00000000122682325011403 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.000000028605463464552 * _refrTemperature ^ 4 + 0.00000000524288163162734 * _refrTemperature ^ 4 * _refrPressure + -0.0000000000959625774722442 * _refrTemperature ^ 4 * _refrPressure ^ 2 + 0.00000000000317858964049247 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.0000125388806830795 * _refrPressure ^ 4 + -0.000000137534830058828 * _refrTemperature * _refrPressure ^ 4

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL VAPORE SURRISCALDATO - R410A- Desurriscaldamento - OK - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-410A"
                thisGasSpecificHeat = +0.192781103466267 * 1 + 0.0816800838048812 * _refrTemperature + -0.00114198714259885 * _refrTemperature ^ 2 + 0.0446859466542882 * _refrPressure + -0.0155145715137176 * _refrTemperature * _refrPressure + 0.000284655923692632 * _refrTemperature ^ 2 * _refrPressure + -0.00000116519429800274 * _refrTemperature ^ 3 * _refrPressure + 0.0125193905920781 * _refrPressure ^ 2 + 0.000747496832716155 * _refrTemperature * _refrPressure ^ 2 + -0.0000182084988440869 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.0000000886697680197169 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.00101685179735793 * _refrPressure ^ 3 + -0.0000102832015356656 * _refrTemperature * _refrPressure ^ 3 + 0.000000584856243111303 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.00000000441954979231365 * _refrTemperature ^ 3 * _refrPressure ^ 3 + 0.0000000463441675749131 * _refrTemperature ^ 4 + -0.00000000221262191486324 * _refrTemperature ^ 4 * _refrPressure + 0.0000000000763285125025636 * _refrTemperature ^ 4 * _refrPressure ^ 2 + 0.00000000000602473059192267 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.0000370063587774758 * _refrPressure ^ 4 + -0.000000758263718775877 * _refrTemperature * _refrPressure ^ 4 + 0.00000000388797042021386 * _refrTemperature ^ 2 * _refrPressure ^ 4


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL VAPORE SURRISCALDATO - R449A- Desurriscaldamento - OK - Inserita da Cristiano Gnesutta il 20 Aprile 2018 
                'OK - Checked by C. Gnesutta on Friday, 20th april 2018.
            Case "R-449a"

                thisGasSpecificHeat = +0.807158521740655 * 1 + 0.00195390381807063 * _refrTemperature + -0.00000537815060900124 * _refrTemperature ^ 2 + 0.0320046417584232 * _refrPressure + -0.000685196109461243 * _refrTemperature * _refrPressure + 0.0000102491871995657 * _refrTemperature ^ 2 * _refrPressure + -0.0000000536840095683783 * _refrTemperature ^ 3 * _refrPressure + 0.00283035386322551 * _refrPressure ^ 2 + -0.0000943660207700681 * _refrTemperature * _refrPressure ^ 2 + 0.000000713532924866385 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.000000000683339711919326 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.000132654403663534 * _refrPressure ^ 3 + -0.00000123593846272535 * _refrTemperature * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'OK
            Case "R-513a"
                thisGasSpecificHeat = +0.698588841946601 * 1 + 0.00788861168362703 * _refrTemperature + -0.000123628375488258 * _refrTemperature ^ 2 + 0.0000015206248175628 * _refrTemperature ^ 3 + 0.0696272784068618 * _refrPressure + -0.00246897262929417 * _refrTemperature * _refrPressure + 0.0000374334362814938 * _refrTemperature ^ 2 * _refrPressure + -0.000000442336819396488 * _refrTemperature ^ 3 * _refrPressure + -0.00503579094813732 * _refrPressure ^ 2 + 0.000225645209408826 * _refrTemperature * _refrPressure ^ 2 + -0.00000109638500713815 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.000663650317342652 * _refrPressure ^ 3 + -0.0000382345609806951 * _refrTemperature * _refrPressure ^ 3 + 0.000000480986606353243 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.00000000208222590139888 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.00000000744931340656885 * _refrTemperature ^ 4 + 0.0000000025212545424339 * _refrTemperature ^ 4 * _refrPressure + -0.000000000073476484254659 * _refrTemperature ^ 4 * _refrPressure ^ 2 + 0.00000000000509486263744895 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.0000301563312505094 * _refrPressure ^ 4 + -0.000000317219556687888 * _refrTemperature * _refrPressure ^ 4


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale

                ' Isobaric Specific Heat (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - R-600
                ' SUPERHEATED  VAPOR  -  Isobaric Specific Heat (Cp) - VAPOR - R-600  - OK -Ricontrollato.

            Case "R-600"
                thisGasSpecificHeat = +1.58800863042501 * 1 + 0.00420875027720804 * _refrTemperature + 0.00000714628840786094 * _refrTemperature ^ 2 + -0.0000000756737353002703 * _refrTemperature ^ 3 + 0.0469837255827149 * _refrPressure + -0.000865393266971611 * _refrTemperature * _refrPressure + 0.00000878238131901294 * _refrTemperature ^ 2 * _refrPressure + -0.0000000207245696703288 * _refrTemperature ^ 3 * _refrPressure + 0.00723132151041942 * _refrPressure ^ 2 + -0.000128330921442116 * _refrTemperature * _refrPressure ^ 2 + 0.00000037223128879324 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.000177989041212924 * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale

                ' Isobaric Specific Heat (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - R-600a
                ' SUPERHEATED  VAPOR  -  Isobaric Specific Heat (Cp) - VAPOR - R-600a  -OK -Ricontrollato.

            Case "R-600a"
                thisGasSpecificHeat = +1.56145845679592 * 1 + 0.00416327370792999 * _refrTemperature + 0.00000272348492720738 * _refrTemperature ^ 2 + 0.0260305300764703 * _refrPressure + -0.000108847351169117 * _refrTemperature * _refrPressure + 0.00000269689970575001 * _refrTemperature ^ 2 * _refrPressure + -0.0000000262359308497709 * _refrTemperature ^ 3 * _refrPressure + 0.00633464084157976 * _refrPressure ^ 2 + -0.000216250883302583 * _refrTemperature * _refrPressure ^ 2 + 0.00000188720438266696 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.00000000364084600173925 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.000483486576511247 * _refrPressure ^ 3 + -0.0000043893843310504 * _refrTemperature * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
                ' Isobaric Specific Heat (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - "R-1234yf"     
                ' SUPERHEATED  VAPOR  -  Thermal Conductivity. - VAPOR - OK - Ricontrollata
            Case "R-1234yf"
                thisGasSpecificHeat = +0.698871744796214 * 1 + 0.00810705168902254 * _refrTemperature + -0.000112941545954525 * _refrTemperature ^ 2 + 0.00000175118438423913 * _refrTemperature ^ 3 + 0.0856294614805891 * _refrPressure + -0.00277597744374829 * _refrTemperature * _refrPressure + 0.0000252556570859161 * _refrTemperature ^ 2 * _refrPressure + -0.000000275191105595463 * _refrTemperature ^ 3 * _refrPressure + -0.0100410416338325 * _refrPressure ^ 2 + 0.000477506900288282 * _refrTemperature * _refrPressure ^ 2 + -0.00000338643366373328 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.000727661619294621 * _refrPressure ^ 3 + -0.0000516532166089465 * _refrTemperature * _refrPressure ^ 3 + 0.000000691024148912978 * _refrTemperature ^ 2 * _refrPressure ^ 3 + -0.0000000029179722523517 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.0000000116710569423517 * _refrTemperature ^ 4 + 0.00000000248437421847904 * _refrTemperature ^ 4 * _refrPressure + -0.0000000000772373529977 * _refrTemperature ^ 4 * _refrPressure ^ 2 + 0.0000000000067713463458085 * _refrTemperature ^ 4 * _refrPressure ^ 3 + 0.000045116151663161 * _refrPressure ^ 4 + -0.000000494991026807964 * _refrTemperature * _refrPressure ^ 4
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL VAPORE SURRISCALDATO - R1234ze- Desurriscaldamento -  OK - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
                'OK

            Case "R-1234ze"
                thisGasSpecificHeat = +0.823136974828497 * 1 + 0.00125816162834652 * _refrTemperature + 0.00000449692749686178 * _refrTemperature ^ 2 + -0.0000000222255177445411 * _refrTemperature ^ 3 + 0.0281406436622346 * _refrPressure + -0.000108376814876637 * _refrTemperature * _refrPressure + -0.000000742397950053241 * _refrTemperature ^ 2 * _refrPressure + -0.00106285586918257 * _refrPressure ^ 2 + -0.0000447884268592819 * _refrTemperature * _refrPressure ^ 2 + 0.000000872271530600822 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000000033372260458281 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.000448619669999762 * _refrPressure ^ 3 + -0.0000069686512104254 * _refrTemperature * _refrPressure ^ 3 + 0.0000000265620590393073 * _refrTemperature ^ 2 * _refrPressure ^ 3

            Case Else
        End Select


        'OK - Ricontrollata. Trasformazione da [kJ/(kg*°k) -----> [J/(kg*°k)
        thisGasSpecificHeat = thisGasSpecificHeat * 1000

        Return thisGasSpecificHeat
    End Function


    'Superheated gas specific enthalpy [kJ/(kg)]  - SUPERHEATED GAS
    Public Function CalculationOfGasSpecificEnthalpy(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim thisGasSpecificEnthalpy As Double = 0

        ' Trasformazione della pressione del vapore da Pascal in Bar 
        _refrPressure = _refrPressure / 100000

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
            ' Specific Isobaric Specific Enthalpy (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - R32    
            ' SUPERHEATED  VAPOR  -  VAPOR Specific Enthalpy - R32 - OK- Ricontrollato.

            Case "R-32"
                thisGasSpecificEnthalpy = +537.997526901618 * 1 + 0.950327237666698 * _refrTemperature + 0.0000980035513847843 * _refrTemperature ^ 2 + -2.27577353610386 * _refrPressure + 0.00855934767802369 * _refrTemperature * _refrPressure + -0.000233266714889692 * _refrTemperature ^ 2 * _refrPressure + 0.00000228101924823247 * _refrTemperature ^ 3 * _refrPressure + -0.0569094656788848 * _refrPressure ^ 2 + 0.00270726591272259 * _refrTemperature * _refrPressure ^ 2 + -0.0000247970571647232 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.0000000354180736635143 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.00190610154838284 * _refrPressure ^ 3 + 0.000018524556800386 * _refrTemperature * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'ENTALPIA DEL VAPORE SURRISCALDATO - R134A - Desurriscaldamento -  OK-  ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-134a"

                thisGasSpecificEnthalpy = +406.34572298348 * 1 + 0.790515708605696 * _refrTemperature + 0.0000523008605234354 * _refrTemperature ^ 2 + 0.00000771893736825949 * _refrTemperature ^ 3 + -2.44964446042017 * _refrPressure + 0.0380950227866297 * _refrTemperature * _refrPressure + -0.000243784885939055 * _refrTemperature ^ 2 * _refrPressure + 0.000000138668290040702 * _refrTemperature ^ 3 * _refrPressure + -0.0839940683583516 * _refrPressure ^ 2 + 0.000734658318905619 * _refrTemperature * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - R245fa    
                ' SUPERHEATED  VAPOR  -  VAPOR Specific Enthalpy -  R-245fa - OK- Ricontrollato.

            Case "R-245fa"
                thisGasSpecificEnthalpy = +407.091235787386 * 1 + 0.834436285271019 * _refrTemperature + 0.000655477957837658 * _refrTemperature ^ 2 + -5.14295817222757 * _refrPressure + 0.0680595055246069 * _refrTemperature * _refrPressure + -0.000336889466999585 * _refrTemperature ^ 2 * _refrPressure + 0.000000693876337802958 * _refrTemperature ^ 3 * _refrPressure + -0.0714617169037765 * _refrPressure ^ 2
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'ENTALPIA DEL VAPORE SURRISCALDATO - R404A - Desurriscaldamento -  OK- ricontrollata da Cristiano Gnesutta il 04 febbraio 2016 
            Case "R-404A"

                thisGasSpecificEnthalpy = +375.847289484325 * 1 + 0.933624825822424 * _refrTemperature + 0.00172658937220294 * _refrTemperature ^ 2 + -0.0000172623307636212 * _refrTemperature ^ 3 + -1.30334099193567 * _refrPressure + -0.0165933400534422 * _refrTemperature * _refrPressure + 0.0000023608951202997 * _refrTemperature ^ 3 * _refrPressure + -0.0416139381917624 * _refrPressure ^ 2 + 0.00351176531352389 * _refrTemperature * _refrPressure ^ 2 + -0.0000380438732399109 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.0000000512939411199629 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.0042401875809006 * _refrPressure ^ 3 + 0.0000444926504300127 * _refrTemperature * _refrPressure ^ 3



                'ENTALPIA DEL VAPORE SURRISCALDATO - R407C - Desurriscaldamento -  OK-  ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-407C"
                thisGasSpecificEnthalpy = +420.590645274412 * 1 + 0.743864424957048 * _refrTemperature + 0.000973469845368997 * _refrTemperature ^ 2 + 0.00000928333009287308 * _refrTemperature ^ 3 + -1.96224555433248 * _refrPressure + 0.034551646836501 * _refrTemperature * _refrPressure + -0.00047499784598894 * _refrTemperature ^ 2 * _refrPressure + 0.00000138746993117111 * _refrTemperature ^ 3 * _refrPressure + -0.0923127239705361 * _refrPressure ^ 2 + 0.00194337759906249 * _refrTemperature * _refrPressure ^ 2 + -0.00000620055899352902 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.000749566897755397 * _refrPressure ^ 3



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 30 agosto 2016 su richiesta Direzione aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - R-407F    
                ' SUPERHEATED  VAPOR  -  VAPOR Specific Enthalpy -  R-407F- OK- Ricontrollato

            Case "R-407F"
                thisGasSpecificEnthalpy = +426.565227790326 * 1 + 0.730946250555172 * _refrTemperature + 0.0011576741298097 * _refrTemperature ^ 2 + 0.0000105839209702457 * _refrTemperature ^ 3 + -1.87146891593778 * _refrPressure + 0.034680390293454 * _refrTemperature * _refrPressure + -0.000517704509734726 * _refrTemperature ^ 2 * _refrPressure + 0.00000157097650845187 * _refrTemperature ^ 3 * _refrPressure + -0.0925293840604402 * _refrPressure ^ 2 + 0.00199655842161112 * _refrTemperature * _refrPressure ^ 2 + -0.00000650734826986558 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.000696613658677353 * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'ENTALPIA DEL VAPORE SURRISCALDATO - R410A - Desurriscaldamento -OK -  ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-410A"
                thisGasSpecificEnthalpy = +438.954362587452 * 1 + 0.848285627468384 * _refrTemperature + 0.00230047642493658 * _refrTemperature ^ 2 + -0.0000182612372287443 * _refrTemperature ^ 3 + -1.65547852538432 * _refrPressure + -0.000221819169088411 * _refrTemperature ^ 2 * _refrPressure + 0.00000297382261290603 * _refrTemperature ^ 3 * _refrPressure + -0.0462651733512538 * _refrPressure ^ 2 + 0.00276886709402772 * _refrTemperature * _refrPressure ^ 2 + -0.0000269878945528754 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.0000000316563046994601 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.00226790010819052 * _refrPressure ^ 3 + 0.0000231704528407654 * _refrTemperature * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            Case "R-449a"
                'ENTALPIA DEL VAPORE SURRISCALDATO - R449A - Desurriscaldamento -OK -  Inserita da Cristiano Gnesutta il 20 Aprile 2018 
                thisGasSpecificEnthalpy = +426.041298782864 * 1 + 0.847490555752522 * _refrTemperature + -0.000166749492073182 * _refrTemperature ^ 2 + 0.0000068624524522656 * _refrTemperature ^ 3 + -2.66627651657057 * _refrPressure + 0.0339332837155921 * _refrTemperature * _refrPressure + -0.00017343610390556 * _refrTemperature ^ 2 * _refrPressure + -0.0620913462927364 * _refrPressure ^ 2 + 0.000522641755690334 * _refrTemperature * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'OK
            Case "R-513a"
                thisGasSpecificEnthalpy = +385.79440146737 * 1 + 0.822870046549845 * _refrTemperature + 0.000146949651301048 * _refrTemperature ^ 2 + 0.00000691479802740111 * _refrTemperature ^ 3 + -2.20222324189912 * _refrPressure + 0.0333364363482256 * _refrTemperature * _refrPressure + -0.000200620788609903 * _refrTemperature ^ 2 * _refrPressure + -0.0897641635281259 * _refrPressure ^ 2 + 0.000771117359918888 * _refrTemperature * _refrPressure ^ 2



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 31 agosto 2016 su richiesta Direzione aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - R-600   
                ' SUPERHEATED  VAPOR  -  VAPOR Specific Enthalpy  - R-600  - OK- Ricontrollato

            Case "R-600"
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                thisGasSpecificEnthalpy = +591.009777221232 * 1 + 1.58966740212089 * _refrTemperature + 0.00221249913292415 * _refrTemperature ^ 2 + -0.00000223014235138045 * _refrTemperature ^ 3 + -5.31610412626425 * _refrPressure + 0.0400545636133978 * _refrTemperature * _refrPressure + -0.0000545843433830198 * _refrTemperature ^ 2 * _refrPressure + -0.089385929136214 * _refrPressure ^ 2


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - R-600a   
                ' SUPERHEATED  VAPOR  -  VAPOR Specific Enthalpy  - R-600a  - OK- Ricontrollato

            Case "R-600a"
                thisGasSpecificEnthalpy = +561.920383412239 * 1 + 1.55017748302955 * _refrTemperature + 0.0023985039538722 * _refrTemperature ^ 2 + -0.00000394540734744223 * _refrTemperature ^ 3 + -4.56407774072069 * _refrPressure + 0.032859308702614 * _refrTemperature * _refrPressure + -0.000000106885580018743 * _refrTemperature ^ 3 * _refrPressure + -0.0805655294108071 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the Superheated Vapor [kJ/(kg*°k)]   - "R-1234yf"     
                ' SUPERHEATED  VAPOR  -  VAPOR Enthalpy - Vapor  Cp -  OK - Ricontrollata
            Case "R-1234yf"
                thisGasSpecificEnthalpy = +370.467138312208 * 1 + 0.833031273219667 * _refrTemperature + 0.000418413272336271 * _refrTemperature ^ 2 + 0.00000559005890709272 * _refrTemperature ^ 3 + -2.01607685103399 * _refrPressure + 0.0314712892308891 * _refrTemperature * _refrPressure + -0.000195774180013703 * _refrTemperature ^ 2 * _refrPressure + -0.0970001036674599 * _refrPressure ^ 2 + 0.00082823410202372 * _refrTemperature * _refrPressure ^ 2
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'ENTALPIA DEL VAPORE SURRISCALDATO - R1234ze - Desurriscaldamento  - OK -  ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 -OK
            Case "R-1234ze"
                thisGasSpecificEnthalpy = +389.211681037806 * 1 + 0.831336362732815 * _refrTemperature + 0.000515097736618453 * _refrTemperature ^ 2 + 0.00000246588819655829 * _refrTemperature ^ 3 + -2.16601512175887 * _refrPressure + 0.0260541673326219 * _refrTemperature * _refrPressure + -0.000134746096769219 * _refrTemperature ^ 2 * _refrPressure + -0.0843484990279375 * _refrPressure ^ 2 + 0.000686531970348292 * _refrTemperature * _refrPressure ^ 2

            Case Else
        End Select


        ' Trasformazione da [kJ/kg] -----> [J/kg]
        thisGasSpecificEnthalpy = thisGasSpecificEnthalpy * 1000

        Return thisGasSpecificEnthalpy
    End Function
#End Region

#Region "SATURATION"

    'General properties @ saturation conditions
#Region "Saturation properties"

    'Saturation temperature [°C] - OK
    Public Function CalculationOfSaturationTemperature(ByVal RefType As String, ByVal _refrPressure As Double) As Double
        Dim thisSaturationTemperature As Double = 0

        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
        'Pressure from Pascal ----> Bar 
        _refrPressure = (_refrPressure / 100000)
        '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale -R32
            ' Temperatura Saturazione R-32,  Cristiano Gnesutta il 07 Settembre 2016 - OK - Ricontrollato.
            'OK. Ricontrollato da C. Gnesutta, 17 Gennaio 2018. -OK
            Case "R-32"
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                thisSaturationTemperature = +-72.858698162963 * 1 + 30.6865007482816 * Sqrt(_refrPressure) + -1.97595319194485 * _refrPressure + 0.0734912094578956 * _refrPressure ^ 1.5

                'OK
                'OK. Ricontrollato da C. Gnesutta, 17 Gennaio 2018. -OK
            Case "R-134a"

                ' Temperatura Saturazione R134A -  OK  - Ricontrollato da Cristiano Gnesutta il 12 Febbraio 2016 - R134A 
                thisSaturationTemperature = +-73.7515140616545 * 1 + 58.6370174355424 * Sqrt(_refrPressure) + -12.072334790282 * _refrPressure + 2.04674730950608 * _refrPressure ^ 1.5 + -0.169209074861458 * _refrPressure * _refrPressure + 0.000632944994188167 * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R-245fa.
                ' Temperatura Saturazione R-245fa,  Cristiano Gnesutta il 08 Settembre 2016 -OK - Ricontrollato.
                'OK
                'OK. Ricontrollato da C. Gnesutta, 17 Gennaio 2018. -OK

            Case "R-245fa"
                thisSaturationTemperature = +-57.5997005357942 * 1 + 107.137772351378 * Sqrt(_refrPressure) + -49.4753892508397 * _refrPressure + 17.8002411034053 * _refrPressure ^ 1.5 + -3.09535778451031 * _refrPressure * _refrPressure + 0.0522658963318874 * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Temperatura Saturazione R404A -  OK   - Ricontrollato da Cristiano Gnesutta il 12 Febbraio 2016 
                'Cambiate equazioni da C. Gnesutta il 17 Gennaio 2017, per riportarle al MidPoint
                'OK. Ricontrollato da C. Gnesutta, 17 Gennaio 2018.
            Case "R-404A"

                thisSaturationTemperature = +-81.3041356503929 * 1 + 43.67047161063 * Sqrt(_refrPressure) + -5.50654294039965 * _refrPressure + 0.572456786824699 * _refrPressure ^ 1.5 + -0.0274925760386589 * _refrPressure * _refrPressure



                ' Temperatura Saturazione R407C -   OK    - Ricontrollato da Cristiano Gnesutta il 15 Febbraio 2016 

                'OK. Ricontrollato da C. Gnesutta, 17 Gennaio 2018. -OK
            Case "R-407C"

                thisSaturationTemperature = +-75.5375605095167 * 1 + 47.2657843756821 * Sqrt(_refrPressure) + -7.35270753382101 * _refrPressure + 0.92870973716515 * _refrPressure ^ 1.5 + -0.0548990072781306 * _refrPressure * _refrPressure + 0.000025977258352728 * _refrPressure ^ 3 + 0.000000916041079271484 * _refrPressure ^ 4

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R-407F
                ' Temperatura Saturazione R-407F - OK - Ricontrollato
                'OK. Ricontrollato da C. Gnesutta, 17 Gennaio 2018.-OK


            Case "R-407F"

                thisSaturationTemperature = +-81.284813395733 * 1 + 50.430900021482 * Sqrt(_refrPressure) + -9.02960336014871 * _refrPressure + 1.31157708075499 * _refrPressure ^ 1.5 + -0.0922745772650999 * _refrPressure * _refrPressure + 0.000235449439418148 * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Temperatura Saturazione R410A -  OK  - Ricontrollato da Cristiano Gnesutta il 15 Febbraio 2016 
                'OK. Ricontrollato da C. Gnesutta, 17 Gennaio 2018..-OK
            Case "R-410A"
                thisSaturationTemperature = +-81.024088195753 * 1 + 37.5871099999489 * Sqrt(_refrPressure) + -4.01157465755899 * _refrPressure + 0.344815827567388 * _refrPressure ^ 1.5 + -0.0132200062545338 * _refrPressure * _refrPressure + -0.00000601636402576262 * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'OK. Ricontrollato da C. Gnesutta, 19 Aprile 2018.  _refrPressure
                'Ok- Checked by C. Gnesutta on April 19th 2018. -OK
            Case "R-449a"
                thisSaturationTemperature = +-62.0972472534329 * 1 + 54.2876809566796 * Sqrt(_refrPressure) + -11.2930813558111 * _refrPressure + 1.949922376901 * _refrPressure ^ 1.5 + -0.164989409325872 * _refrPressure * _refrPressure + 0.000627024376998969 * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'C. Gnesutta, December 6th 2017
                'OK. Ricontrollato da C. Gnesutta, 17 Gennaio 2018.-OK -OK
            Case "R-513a"
                thisSaturationTemperature = +-73.6151560607277 * 1 + 54.991639809215 * Sqrt(_refrPressure) + -9.28221744243964 * _refrPressure + 1.23526366429188 * _refrPressure ^ 1.5 + -0.0723348477401664 * _refrPressure * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale -R-600
                ' Temperatura Saturazione R-600 - OK, Ricontrollata.
                'OK. Ricontrollato da C. Gnesutta, 17 Gennaio 2018.-OK

            Case "R-600"
                thisSaturationTemperature = +-72.9191476419524 * 1 + 100.364254848764 * Sqrt(_refrPressure) + -38.1547113601001 * _refrPressure + 11.5814558292855 * _refrPressure ^ 1.5 + -1.69598879338666 * _refrPressure * _refrPressure + 0.0201116824431826 * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembre 2016 su richiesta Direzione aziendale
                ' Temperatura Saturazione R-600 -OK, ricontrollato.-OK
            Case "R-600a"
                thisSaturationTemperature = +-75.6376669466199 * 1 + 82.4593918908998 * Sqrt(_refrPressure) + -23.5740700268718 * _refrPressure + 5.56320402895475 * _refrPressure ^ 1.5 + -0.637807306849181 * _refrPressure * _refrPressure + 0.00466233288956289 * _refrPressure ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Temperatura Saturazione R-1234yf,  Cristiano Gnesutta il 07 Settembre 2016 -OK, ricontrollato.
                ' Temperatura Saturazione R-600 -OK, ricontrollato.-OK
            Case "R-1234yf"

                thisSaturationTemperature = +-75.4513937450685 * 1 + 55.2876932024882 * Sqrt(_refrPressure) + -9.09268770151569 * _refrPressure + 1.19595911120314 * _refrPressure ^ 1.5 + -0.0699277214435804 * _refrPressure * _refrPressure

                'Temperatura Saturazione R1234ze -   OK - Ricontrollato da Cristiano Gnesutta il 15 Febbraio 2016 
                ' Temperatura Saturazione R-600 -OK, ricontrollato.-OK
            Case "R-1234ze"

                thisSaturationTemperature = +-70.3379981225637 * 1 + 63.0876788715558 * Sqrt(_refrPressure) + -13.2422541406272 * _refrPressure + 2.22553672657247 * _refrPressure ^ 1.5 + -0.174203424865691 * _refrPressure * _refrPressure + 0.000412131007528054 * _refrPressure ^ 3


            Case Else
        End Select

        Return thisSaturationTemperature
    End Function

    'Saturation pressure [Pa]. C. Gnesutta, 12th March 2018.- OK
    Public Function CalculationOfSaturationPressure(ByVal RefType As String, ByVal _refrTemperature As Double) As Double

        Dim thisSaturationPressure As Double = 0

        Dim T_sat As Double = _refrTemperature
        Select Case RefType


            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale - R-32 
            Case "R-32"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R-32 -  OK, Ricontrollato.
                    'OK - C. Gnesutta, 17 Gennaio 2018.
                    thisSaturationPressure = +4.04555673952911 * 1 + 3.65509404724785 * Sqrt(_refrTemperature) + -1.0170321560699 * _refrTemperature + 0.212393610400019 * _refrTemperature ^ 1.5 + -0.0118667273876731 * _refrTemperature * _refrTemperature + 0.0000555774181371196 * _refrTemperature ^ 3

                End If

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Fluido puro - Temperatura Critica da non superare Tc = 101.06 °C 
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-134a"
                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R134A -  OK  - Ricontrollato da Cristiano Gnesutta il 12 Febbraio 2016 - R134A 
                    thisSaturationPressure = +4.15462490068249 * 1 + -1.47514368304977 * Sqrt(T_sat) + 0.779087646377264 * T_sat + -0.142997379531115 * T_sat ^ 1.5 + 0.0142932201163123 * T_sat * T_sat + -0.0000472140877747002 * T_sat ^ 3 + 0.000000196708926705758 * T_sat ^ 4

                End If


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R-245fa
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-245fa"
                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R-245fa - OK, Ricontrollato.
                    thisSaturationPressure = +0.461001054055066 * 1 + 0.0779138321899321 * Sqrt(_refrTemperature) + -0.0103716083457062 * _refrTemperature + 0.00733200877353445 * _refrTemperature ^ 1.5 + -0.000223309095176422 * _refrTemperature * _refrTemperature + 0.0000073147005342039 * _refrTemperature ^ 3

                End If
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Mistura - Temperatura Critica da non superare Tc = 72.12 °C 
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-404A"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione -  OK  - Ricontrollato da Cristiano Gnesutta il 12 Febbraio 2016 - R404A 
                    thisSaturationPressure = +7.45428659257059 * 1 + -1.91023099543186 * Sqrt(T_sat) + 1.15632587358413 * T_sat + -0.229323873758593 * T_sat ^ 1.5 + 0.0254677503854617 * T_sat * T_sat + -0.000120452122467436 * T_sat ^ 3 + 0.000000585289862998801 * T_sat ^ 4

                End If


                ' Mistura - Temperatura Critica da non superare Tc =  86.195 °C 
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-407C"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - OK   - Ricontrollato da Cristiano Gnesutta il 15 Febbraio 2016 - R407C 
                    thisSaturationPressure = +6.61982095024855 * 1 + -2.56294745693757 * Sqrt(T_sat) + 1.40860206175877 * T_sat + -0.284559238863927 * T_sat ^ 1.5 + 0.0296893208660288 * T_sat * T_sat + -0.000130225391492877 * T_sat ^ 3 + 0.000000578493347342741 * T_sat ^ 4

                End If


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale -R407F
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-407F"
                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - R407F- OK, Ricontrollato.

                    thisSaturationPressure = +0.115130629802697 * 1 + 4.5395050234091 * Sqrt(T_sat) + -1.39420676320631 * T_sat + 0.259214760277175 * T_sat ^ 1.5 + -0.0157421762662645 * T_sat * T_sat + 0.0000585374973685338 * T_sat ^ 3

                End If

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Mistura - Temperatura Critica da non superare Tc =  71.344 °C 
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-410A"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - OK   - Ricontrollato da Cristiano Gnesutta il 15 Febbraio 2016 - R410A 
                    thisSaturationPressure = +9.01682842286773 * 1 + -1.38257627517577 * Sqrt(T_sat) + 0.963831077479812 * T_sat + -0.171597871903694 * T_sat ^ 1.5 + 0.0207630478039335 * T_sat * T_sat + -0.0000900323373733644 * T_sat ^ 3 + 0.000000513703002595427 * T_sat ^ 4

                End If


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da Cristiano Gnesutta il 19 Aprile 2018 - R449A 
                'Ok- Checked again by C. Gnesutta on April 19th 2018. -OK
            Case "R-449a"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione [Bar] - OK   -Aggiunto da Cristiano Gnesutta il 19 Aprile 2018 - R449A -OK
                    thisSaturationPressure = +-0.609175446870079 * 1 + 2.52969082776616 * Sqrt(T_sat) + -0.767404978918001 * T_sat + 0.140134941549492 * T_sat ^ 1.5 + -0.00817655174533548 * T_sat * T_sat + 0.0000350894772577355 * T_sat ^ 3

                End If
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


            Case "R-513a"


                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - OK   - Ricontrollato da Cristiano Gnesutta il 18 Gennaio 2018 - R410A 
                    thisSaturationPressure = +3.43564312484251 * 1 + -0.226439838432907 * Sqrt(T_sat) + 0.146730755053346 * T_sat + 0.000934588864655787 * T_sat * T_sat + 0.0000127916267922255 * T_sat ^ 3


                End If

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione Aziendale - R-600
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-600"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - R-600 - OK   - Ricontrollato.
                    thisSaturationPressure = +0.920588174451212 * 1 + 0.109163319829954 * Sqrt(_refrTemperature) + -0.00265466722900623 * _refrTemperature + 0.0076340786511330996 * _refrTemperature ^ 1.5 + -0.0000279860095089824 * _refrTemperature * _refrTemperature + 0.0000061494089685148 * _refrTemperature ^ 3

                End If


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembre 2016, su richiesta Direzione aziendale - R-600a
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-600a"
                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R-600a -  OK - Ricontrollata. - OK.
                    thisSaturationPressure = +1.27071332161076 * 1 + 0.259778906972921 * Sqrt(_refrTemperature) + -0.0329036907231133 * _refrTemperature + 0.0144491455975898 * _refrTemperature ^ 1.5 + -0.000259873803956906 * _refrTemperature * _refrTemperature + 0.00000742156637905181 * _refrTemperature ^ 3

                End If
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Aggiunto da C. Gnesutta il 07 Settembre 2016, su richiesta Direzione aziendale -R-1234yf
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-1234yf"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R-1234yf -  OK, Ricontrollato.
                    thisSaturationPressure = +6.49250451868535 * 1 + -2.63529146785377 * Sqrt(_refrTemperature) + 0.905339949167726 * _refrTemperature + -0.111949459807399 * _refrTemperature ^ 1.5 + 0.00779116054539737 * _refrTemperature * _refrTemperature

                End If

                ' Fluido puro - Temperatura Critica da non superare Tc = 109.36 °C 
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-1234ze"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - OK   - Ricontrollato da Cristiano Gnesutta il 15 Febbraio 2016  - R1234ze 
                    thisSaturationPressure = +2.56541040430092 * 1 + -0.48386710899125 * Sqrt(T_sat) + 0.302012749414536 * T_sat + -0.04759008703705 * T_sat ^ 1.5 + 0.00543399605343782 * T_sat * T_sat + -0.0000120704849922763 * T_sat ^ 3 + 0.0000000764801113027884 * T_sat ^ 4

                End If

            Case Else
        End Select

        'C. Gnesutta, March 12th, 2018.
        'Saturation Pressure from [bar]-----> [Pa]
        thisSaturationPressure = thisSaturationPressure * 100000

        Return thisSaturationPressure
    End Function



    'Saturation pressure @ the Bubble point [Pa]. C. Gnesutta, 12th March 2018.- OK
    Public Function CalculationOfSaturationPressureBubblePoint(ByVal RefType As String, ByVal _refrTemperature As Double) As Double

        Dim thisSaturationPressureBubblePoint As Double = 0

        Dim T_sat As Double = _refrTemperature
        Select Case RefType


            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale - R-32 
            Case "R-32"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R-32 -  OK, Ricontrollato.
                    'OK - C. Gnesutta, 17 Gennaio 2018.
                    thisSaturationPressureBubblePoint = +4.04555673952911 * 1 + 3.65509404724785 * Sqrt(_refrTemperature) + -1.0170321560699 * _refrTemperature + 0.212393610400019 * _refrTemperature ^ 1.5 + -0.0118667273876731 * _refrTemperature * _refrTemperature + 0.0000555774181371196 * _refrTemperature ^ 3

                End If

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Fluido puro - Temperatura Critica da non superare Tc = 101.06 °C 
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-134a"
                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R134A -  OK  - Ricontrollato da Cristiano Gnesutta il 12 Febbraio 2016 - R134A 
                    thisSaturationPressureBubblePoint = +4.15462490068249 * 1 + -1.47514368304977 * Sqrt(T_sat) + 0.779087646377264 * T_sat + -0.142997379531115 * T_sat ^ 1.5 + 0.0142932201163123 * T_sat * T_sat + -0.0000472140877747002 * T_sat ^ 3 + 0.000000196708926705758 * T_sat ^ 4


                End If


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R-245fa
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-245fa"
                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R-245fa - OK, Ricontrollato.
                    thisSaturationPressureBubblePoint = +0.461001054055066 * 1 + 0.0779138321899321 * Sqrt(_refrTemperature) + -0.0103716083457062 * _refrTemperature + 0.00733200877353445 * _refrTemperature ^ 1.5 + -0.000223309095176422 * _refrTemperature * _refrTemperature + 0.0000073147005342039 * _refrTemperature ^ 3

                End If
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Mistura - Temperatura Critica da non superare Tc = 72.12 °C 
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-404A"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione -  OK  - Ricontrollato da Cristiano Gnesutta il 12 Febbraio 2016 - R404A 
                    thisSaturationPressureBubblePoint = +7.45428659257059 * 1 + -1.91023099543186 * Sqrt(T_sat) + 1.15632587358413 * T_sat + -0.229323873758593 * T_sat ^ 1.5 + 0.0254677503854617 * T_sat * T_sat + -0.000120452122467436 * T_sat ^ 3 + 0.000000585289862998801 * T_sat ^ 4

                End If


                ' Mistura - Temperatura Critica da non superare Tc =  86.195 °C 
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-407C"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - OK   - Ricontrollato da Cristiano Gnesutta il 15 Febbraio 2016 - R407C 
                    thisSaturationPressureBubblePoint = +6.61982095024855 * 1 + -2.56294745693757 * Sqrt(T_sat) + 1.40860206175877 * T_sat + -0.284559238863927 * T_sat ^ 1.5 + 0.0296893208660288 * T_sat * T_sat + -0.000130225391492877 * T_sat ^ 3 + 0.000000578493347342741 * T_sat ^ 4

                End If


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il , 24 Aprile 2018, su richiesta Direzione aziendale -R407F
                'Pressione di saturazione del liquido al punto di bolla
                'OK, Ricontrollato - C. Gnesutta, 24 Aprile 2018.
            Case "R-407F"
                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - R407F- OK, Ricontrollato.

                    thisSaturationPressureBubblePoint = +11.5203013572944 * 1 + -4.11930974182463 * Sqrt(T_sat) + 1.44849624666925 * T_sat + -0.174808973943549 * T_sat ^ 1.5 + 0.012518714536543 * T_sat * T_sat

                End If

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Mistura - Temperatura Critica da non superare Tc =  71.344 °C 
                ' OK - ricontrollato nuovamente da Cristiano Gnesutta il 17 Marzo 2016
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-410A"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - OK   - Ricontrollato da Cristiano Gnesutta il 15 Febbraio 2016 - R410A 
                    thisSaturationPressureBubblePoint = +9.01682842286773 * 1 + -1.38257627517577 * Sqrt(T_sat) + 0.963831077479812 * T_sat + -0.171597871903694 * T_sat ^ 1.5 + 0.0207630478039335 * T_sat * T_sat + -0.0000900323373733644 * T_sat ^ 3 + 0.000000513703002595427 * T_sat ^ 4

                End If


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da Cristiano Gnesutta il 24 Aprile 2018 - R449A 
                'Ok- Checked again by C. Gnesutta on April 24th 2018. -OK
            Case "R-449a"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione [Bar] - OK   -Aggiunto da Cristiano Gnesutta il 19 Aprile 2018 - R449A -OK
                    thisSaturationPressureBubblePoint = +6.83001277946606 * 1 + -1.85195981920096 * Sqrt(T_sat) + 0.73588120981673 * T_sat + -0.0876061061903647 * T_sat ^ 1.5 + 0.0072463268688262 * T_sat * T_sat

                End If
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Aggiunto da C. Gnesutta il , 24 Aprile 2018, su richiesta Direzione aziendale -R-513a
                'Pressione di saturazione del liquido al punto di bolla
                'OK, Ricontrollato - C. Gnesutta, 24 Aprile 2018.

            Case "R-513a"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione del liquido @bubble point - OK   - Ricontrollato da Cristiano Gnesutta il 24 Aprile 2018 - R513A 
                    thisSaturationPressureBubblePoint = +2.06153481687131 * 1 + 0.890706509798783 * Sqrt(_refrTemperature) + -0.204493571227706 * _refrTemperature + 0.0518366614662584 * _refrTemperature ^ 1.5 + -0.00226234639458735 * _refrTemperature * _refrTemperature + 0.0000184014522668634 * _refrTemperature ^ 3

                End If

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione Aziendale - R-600
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-600"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - R-600 - OK   - Ricontrollato.
                    thisSaturationPressureBubblePoint = +0.920588174451212 * 1 + 0.109163319829954 * Sqrt(_refrTemperature) + -0.00265466722900623 * _refrTemperature + 0.0076340786511330996 * _refrTemperature ^ 1.5 + -0.0000279860095089824 * _refrTemperature * _refrTemperature + 0.0000061494089685148 * _refrTemperature ^ 3

                End If


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembre 2016, su richiesta Direzione aziendale - R-600a
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-600a"
                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R-600a -  OK - Ricontrollata. - OK.
                    thisSaturationPressureBubblePoint = +1.27071332161076 * 1 + 0.259778906972921 * Sqrt(_refrTemperature) + -0.0329036907231133 * _refrTemperature + 0.0144491455975898 * _refrTemperature ^ 1.5 + -0.000259873803956906 * _refrTemperature * _refrTemperature + 0.00000742156637905181 * _refrTemperature ^ 3

                End If
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Aggiunto da C. Gnesutta il 07 Settembre 2016, su richiesta Direzione aziendale -R-1234yf
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-1234yf"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione R-1234yf -  OK, Ricontrollato.
                    thisSaturationPressureBubblePoint = +6.49250451868535 * 1 + -2.63529146785377 * Sqrt(_refrTemperature) + 0.905339949167726 * _refrTemperature + -0.111949459807399 * _refrTemperature ^ 1.5 + 0.00779116054539737 * _refrTemperature * _refrTemperature


                End If

                ' Fluido puro - Temperatura Critica da non superare Tc = 109.36 °C 
                'OK - C. Gnesutta, 17 Gennaio 2018.
            Case "R-1234ze"

                If (_refrTemperature < 20) Or (_refrTemperature > 60) Then
                    MsgBox("Condensing temperature outside the range")
                Else

                    'Pressione Saturazione - OK   - Ricontrollato da Cristiano Gnesutta il 15 Febbraio 2016  - R1234ze 
                    thisSaturationPressureBubblePoint = +2.56541040430092 * 1 + -0.48386710899125 * Sqrt(T_sat) + 0.302012749414536 * T_sat + -0.04759008703705 * T_sat ^ 1.5 + 0.00543399605343782 * T_sat * T_sat + -0.0000120704849922763 * T_sat ^ 3 + 0.0000000764801113027884 * T_sat ^ 4


                End If

            Case Else
        End Select

        'C. Gnesutta, March 12th, 2018.
        'Saturation Pressure from [bar]-----> [Pa]
        thisSaturationPressureBubblePoint = thisSaturationPressureBubblePoint * 100000

        Return thisSaturationPressureBubblePoint
    End Function


#End Region


#Region "Saturated Vapor Physical Properties"

    'OK- Controllata da C. Gnesutta il 13 Marzo 2018.
    'Densità del vapore saturo [kg/m^3] - SATURATED VAPOR.- OK
    Public Function CalculationOfSaturatedVaporDensity(ByVal RefType As String, ByVal _refrCondensingTemperature As Double) As Double

        Dim thisSaturatedVaporDensity As Double = 0

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            Case "R-32"
                'Aggiunto da C. Gnesutta il 07 agosto 2016, su richiesta Direzione aziendale -R-32
                ' Densità Vapore Saturo - R-32 - OK - Ricontrollato.

                thisSaturatedVaporDensity = +-547.193784882892 * 1 + 493.63110991636 * Sqrt(_refrCondensingTemperature) + -165.982260011061 * _refrCondensingTemperature + 26.6417921598852 * _refrCondensingTemperature ^ 1.5 + -1.78770625858095 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00403444242250793 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 2 Marzo 2016 - Saturated Vapor 
                '
            Case "R-134a"

                thisSaturatedVaporDensity = +-64.523512930945 * 1 + 69.5400660892416 * Sqrt(_refrCondensingTemperature) + -23.4234537538985 * _refrCondensingTemperature + 3.91286417854549 * _refrCondensingTemperature ^ 1.5 + -0.264645975736016 * _refrCondensingTemperature * _refrCondensingTemperature + 0.000707613962224154 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R-245fa
                ' Densità Vapore Saturo -R-245fa - OK - Ricontrollato.
            Case "R-245fa"
                thisSaturatedVaporDensity = +-3.66398084486061 * 1 + 6.05845357765224 * Sqrt(_refrCondensingTemperature) + -1.94637628711682 * _refrCondensingTemperature + 0.342874260165954 * _refrCondensingTemperature ^ 1.5 + -0.0217327989086752 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000837106606900924 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 2 Marzo 2016 - Saturated liquid 
            Case "R-404A"
                thisSaturatedVaporDensity = +-1590.33556745423 * 1 + 1395.38076792517 * Sqrt(_refrCondensingTemperature) + -466.266547865853 * _refrCondensingTemperature + 73.9279217470151 * _refrCondensingTemperature ^ 1.5 + -4.91279297659649 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0105544745473385 * _refrCondensingTemperature ^ 3


                ' Aggiunta da Cristiano Gnesutta il 2 Marzo 2016 - Saturated liquid 
                ' OK - Ricontrollata da Cristiano Gnesutta il 15 Febbraio 2016 - Densità Liquido Saturato - R407C 

            Case "R-407C"
                thisSaturatedVaporDensity = +-237.141326360135 * 1 + 224.48345595979399 * Sqrt(_refrCondensingTemperature) + -75.8424576084817 * _refrCondensingTemperature + 12.3663236373856 * _refrCondensingTemperature ^ 1.5 + -0.83630825292832 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0020135970344476 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale -R-407F
                ' Densità Vapore Saturo -R-407F - OK - Ricontrollata.

            Case "R-407F"

                thisSaturatedVaporDensity = +-367.906716624062 * 1 + 338.585973506228 * Sqrt(_refrCondensingTemperature) + -114.0012967603 * _refrCondensingTemperature + 18.4153714798675 * _refrCondensingTemperature ^ 1.5 + -1.2390177161778 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00287998746488138 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 2 Marzo 2016 - Saturated liquid 
            Case "R-410A"

                thisSaturatedVaporDensity = +-1824.35137637773 * 1 + 1596.34579343832 * Sqrt(_refrCondensingTemperature) + -533.295999152728 * _refrCondensingTemperature + 84.4830843350831 * _refrCondensingTemperature ^ 1.5 + -5.61112560266855 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0120068895648757 * _refrCondensingTemperature ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                ' Aggiunta da Cristiano Gnesutta il 19 Aprile 2018 - Saturated liquid - Densità Vapore Saturo [kg/m^3] - OK
                'Ok- Checked again by C. Gnesutta on April 19th 2018. - OK
            Case "R-449a"
                thisSaturatedVaporDensity = +85.6713588504308 * 1 + -57.7434609722164 * Sqrt(_refrCondensingTemperature) + 16.9342628522861 * _refrCondensingTemperature + -2.14419427321072 * _refrCondensingTemperature ^ 1.5 + 0.114254107090345 * _refrCondensingTemperature * _refrCondensingTemperature
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


            Case "R-513a"
                ' Aggiunta da Cristiano Gnesutta il 17 Gennaio 2017 - Saturated liquid. R513a
                thisSaturatedVaporDensity = +-80.4149884555314 * 1 + 84.987258670295 * Sqrt(_refrCondensingTemperature) + -28.6705215173777 * _refrCondensingTemperature + 4.77074953543959 * _refrCondensingTemperature ^ 1.5 + -0.323142245757674 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00084445399034032 * _refrCondensingTemperature ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R600
                ' Densità Vapore Saturo - R600 - OK - Ricontrollata.
            Case "R-600"
                thisSaturatedVaporDensity = +1.24205653284982 * 1 + 1.42397027287226 * Sqrt(_refrCondensingTemperature) + -0.427991548243793 * _refrCondensingTemperature + 0.0927105392926561 * _refrCondensingTemperature ^ 1.5 + -0.00567237303101914 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000298562681168983 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembre 2016, su richiesta Direzione aziendale -R-600a
                'Densità Vapore Saturo -R-600a- OK - Ricontrollata. -OK.
            Case "R-600a"
                thisSaturatedVaporDensity = +-1.91500025039003 * 1 + 5.43086622241734 * Sqrt(_refrCondensingTemperature) + -1.7284504752285 * _refrCondensingTemperature + 0.306863592637115 * _refrCondensingTemperature ^ 1.5 + -0.0196472076130316 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000652468281603417 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            Case "R-1234yf"

                'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale
                ' Densità Vapore Saturo - R-1234yf - OK- Ricontrollato.
                thisSaturatedVaporDensity = +140.567378233024 * 1 + -92.7126632798476 * Sqrt(_refrCondensingTemperature) + 26.9378128888192 * _refrCondensingTemperature + -3.37459188767059 * _refrCondensingTemperature ^ 1.5 + 0.174839127510727 * _refrCondensingTemperature * _refrCondensingTemperature

                ' Aggiunta da Cristiano Gnesutta il 2 Marzo 2016 - Saturated liquid 
            Case "R-1234ze"
                thisSaturatedVaporDensity = +-32.6324773978707 * 1 + 39.090128990512 * Sqrt(_refrCondensingTemperature) + -13.0601881905489 * _refrCondensingTemperature + 2.20944621209241 * _refrCondensingTemperature ^ 1.5 + -0.148397262379336 * _refrCondensingTemperature * _refrCondensingTemperature + 0.000420847058107104 * _refrCondensingTemperature ^ 3


            Case Else
        End Select

        Return thisSaturatedVaporDensity
    End Function


    'OK- Controllata da C. Gnesutta il 13 Marzo 2018.
    'Viscosity of the Saturated Vapor - [Pa*s] - SATURATED VAPOR.- OK
    Public Function CalculationOfSaturated_Vapor_Viscosity(ByVal RefType As String, ByVal T_sat As Double) As Double

        Dim thisSaturated_Vapor_Viscosity As Double = 0

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            ' Aggiunta da Cristiano Gnesutta il 07 Settembre 2016 - Saturated Vapor -R-32
            ' Viscosità del Vapore Saturo-R-32- OK, Ricontrollato.
            Case "R-32"
                thisSaturated_Vapor_Viscosity = +-12.2444827462651 * 1 + 20.5688963173457 * Sqrt(T_sat) + -6.88712588806883 * T_sat + 1.10613081670232 * T_sat ^ 1.5 + -0.0743057358602219 * T_sat * T_sat + 0.000164497049771868 * T_sat ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 19 Febbraio 2016 - Saturated Vapor - R134A 
                ' OK - Ricontrollata da Cristiano Gnesutta il 19 Febbraio 2016 
            Case "R-134a"
                thisSaturated_Vapor_Viscosity = +9.37378861707508 * 1 + 1.39120910563067 * Sqrt(T_sat) + -0.51265775834998 * T_sat + 0.101447601973403 * T_sat ^ 1.5 + -0.00779467163718919 * T_sat * T_sat + 0.0000236583471332094 * T_sat ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale -R-245fa
                'Viscosità del Vapore Saturo - R245fa  - OK, Ricontrollato.
            Case "R-245fa"
                thisSaturated_Vapor_Viscosity = +7.50515567365237 * 1 + 1.69116052827795 * Sqrt(T_sat) + -0.504343938231766 * T_sat + 0.0810081535745777 * T_sat ^ 1.5 + -0.00514494659948333 * T_sat * T_sat + 0.0000102520504365959 * T_sat ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 19 Febbraio 2016 - Saturated Vapor - R404A 
                ' OK - Ricontrollata da Cristiano Gnesutta il 19 Febbraio 2016 
            Case "R-404A"
                thisSaturated_Vapor_Viscosity = +-185.008113460815 * 1 + 164.257871617265 * Sqrt(T_sat) + -53.4004728193264 * T_sat + 8.19320729935163 * T_sat ^ 1.5 + -0.526922157311905 * T_sat * T_sat + 0.00102837421104579 * T_sat ^ 3


                ' Aggiunta da Cristiano Gnesutta il 19 Febbraio 2016 - Saturated Vapor - R407C 
                ' OK - Ricontrollata da Cristiano Gnesutta il 19 Febbraio 2016 
            Case "R-407C"
                thisSaturated_Vapor_Viscosity = +-50.9779829150759 * 1 + 51.4366294190551 * Sqrt(T_sat) + -16.3569463391262 * T_sat + 2.44876814508786 * T_sat ^ 1.5 + -0.152760568356141 * T_sat * T_sat + 0.000281094342635613 * T_sat ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale
                'Viscosità del Vapore Saturo - R-407F  - OK, Ricontrollata.
            Case "R-407F"

                thisSaturated_Vapor_Viscosity = +-23.8322217792002 * 1 + 30.9339823313684 * Sqrt(T_sat) + -10.4085052847641 * T_sat + 1.6506037435991 * T_sat ^ 1.5 + -0.108694674022961 * T_sat * T_sat + 0.000223639011319589 * T_sat ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 19 Febbraio 2016 - Saturated Vapor - R410A 
                ' OK - Ricontrollata da Cristiano Gnesutta il 19 Febbraio 2016 

            Case "R-410A"

                thisSaturated_Vapor_Viscosity = +-190.936851934604 * 1 + 170.240098140524 * Sqrt(T_sat) + -55.2795682487248 * T_sat + 8.47052048585178 * T_sat ^ 1.5 + -0.543839709148275 * T_sat * T_sat + 0.00105632470292833 * T_sat ^ 3

                ' Aggiunta da Cristiano Gnesutta il 19 Aprile 2018 - Saturated Vapor - R449A - OK
                'Viscosità del vapore in [microPa*s] - OK
                'Ok- Checked again by C. Gnesutta on April 19th, 2018.- OK
            Case "R-449a"
                thisSaturated_Vapor_Viscosity = +66.8482929119712 * 1 + -45.7627942263942 * Sqrt(T_sat) + 14.433289313326 * T_sat + -2.11610833465872 * T_sat ^ 1.5 + 0.129191443721989 * T_sat * T_sat + -0.000215275816998297 * T_sat ^ 3


                ' Aggiunta da Cristiano Gnesutta il 18 Gennaio 2018 - Saturated Vapor - R-513a
            Case "R-513a"
                thisSaturated_Vapor_Viscosity = +37.5080440927088 * 1 + -24.1999059987237 * Sqrt(T_sat) + 8.36323914442653 * T_sat + -1.33032791589373 * T_sat ^ 1.5 + 0.0875746837722646 * T_sat * T_sat + -0.000163865554055556 * T_sat ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione Aziendale -R-600
                ' Viscosità del Vapore Saturo  -R600 - OK, Ricontrollata. - OK.

            Case "R-600"

                thisSaturated_Vapor_Viscosity = +6.49024217386351 * 1 + 0.242276806550846 * Sqrt(T_sat) + -0.0582078905757704 * T_sat + 0.013377699635746 * T_sat ^ 1.5 + -0.000914241028133193 * T_sat * T_sat + 0.0000026599114005856 * T_sat ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembre 2016, su richiesta Direzione aziendale - R-600a
                ' Viscosità del Vapore Saturo  -R600a - OK, Ricontrollata. - OK.
            Case "R-600a"
                thisSaturated_Vapor_Viscosity = +6.43466543191489 * 1 + 0.374566546486069 * Sqrt(T_sat) + -0.103790581613901 * T_sat + 0.0209974313420692 * T_sat ^ 1.5 + -0.00145100555208316 * T_sat * T_sat + 0.00000422121127380581 * T_sat ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            Case "R-1234yf"
                ' Aggiunta da Cristiano Gnesutta il 07 Settembre 2016 - Saturated Vapor - R-1234yf
                ' Viscosità del Vapore Saturo-R-1234yf-OK-Ricontrollato.
                thisSaturated_Vapor_Viscosity = +2.61383838641999 * 1 + 6.46615917600073 * Sqrt(T_sat) + -2.15241650621917 * T_sat + 0.35223025015127 * T_sat ^ 1.5 + -0.0239283059188876 * T_sat * T_sat + 0.0000572293109697104 * T_sat ^ 3

                ' Aggiunta da Cristiano Gnesutta il 19 Febbraio 2016 - Saturated Vapor - R1234ze 
                ' OK - Ricontrollata da Cristiano Gnesutta il 19 Febbraio 2016 

            Case "R-1234ze"
                thisSaturated_Vapor_Viscosity = +8.4875061729975 * 1 + 2.35381598060628 * Sqrt(T_sat) + -0.758722519800133 * T_sat + 0.128883466743645 * T_sat ^ 1.5 + -0.00879874188229474 * T_sat * T_sat + 0.0000215203487633481 * T_sat ^ 3

            Case Else
        End Select

        thisSaturated_Vapor_Viscosity = thisSaturated_Vapor_Viscosity / 1000000

        Return thisSaturated_Vapor_Viscosity
    End Function


    'Thermal Conductivity of the Saturated vapor (NOT necessary- NON presente, perché NON necessaria

    'Specific enthalpy of the saturated vapor from [kJ/(kg)] -------> to [J/(kg)]  - SATURATED VAPOR.- OK
    Public Function SpecificEnthalpySaturatedVapor(ByVal RefType As String, ByVal _refrCondensingTemperature As Double) As Double

        Dim EnthalpySaturatedVapor As Double = 0

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 29 agosto 2016, su richiesta Direzione aziendale -R-32
            'Entalpia specifica del Vapore Saturo -R-32-OK, Ricontrollato.
            Case "R-32"
                EnthalpySaturatedVapor = +690.304391916181 * 1 + -151.652642732374 * Sqrt(_refrCondensingTemperature) + 51.3863754755458 * _refrCondensingTemperature + -8.18567953535299 * _refrCondensingTemperature ^ 1.5 + 0.548082091800886 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00125038553875201 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del vapore saturo - R-134a
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2014 (Pomeriggio)
            Case "R-134a"

                EnthalpySaturatedVapor = +405.786787598734 * 1 + -6.87129053376361 * Sqrt(_refrCondensingTemperature) + 3.13414644709749 * _refrCondensingTemperature + -0.44721295593974 * _refrCondensingTemperature ^ 1.5 + 0.0319887645675014 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0000986032273972005 * _refrCondensingTemperature ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R-245fa
                'Entalpia specifica del Vapore Saturo -R-245fa - OK, Ricontrollato.
            Case "R-245fa"
                EnthalpySaturatedVapor = +403.45073004027 * 1 + 0.650203181052063 * Sqrt(_refrCondensingTemperature) + 0.597538936981294 * _refrCondensingTemperature + 0.00674567443680196 * _refrCondensingTemperature ^ 1.5 + 0.000699381678265776 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00000903937538680754 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€



                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del vapore saturo - R-404a
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2014 (Pomeriggio)
            Case "R-404A"
                EnthalpySaturatedVapor = +619.555233338744 * 1 + -229.865425615782 * Sqrt(_refrCondensingTemperature) + 80.8851676982604 * _refrCondensingTemperature + -13.1849771809951 * _refrCondensingTemperature ^ 1.5 + 0.90187906591486 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00200358511505781 * _refrCondensingTemperature ^ 3


                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del vapore saturo - R-407C
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2014 (Pomeriggio)
            Case "R-407C"
                EnthalpySaturatedVapor = +452.504603417552 * 1 + -39.2514486072346 * Sqrt(_refrCondensingTemperature) + 14.3545686966493 * _refrCondensingTemperature + -2.30764325876254 * _refrCondensingTemperature ^ 1.5 + 0.159430282795697 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000394430586421986 * _refrCondensingTemperature ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R-407F
                'Entalpia specifica del Vapore Saturo - R-407F -OK, Ricontrollato.

            Case "R-407F"
                EnthalpySaturatedVapor = +487.993066329637 * 1 + -63.808522135591 * Sqrt(_refrCondensingTemperature) + 21.9351934949279 * _refrCondensingTemperature + -3.4290856773529 * _refrCondensingTemperature ^ 1.5 + 0.229174953617753 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000532453283891281 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del vapore saturo - R-410A
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2014 (Pomeriggio)
            Case "R-410A"
                EnthalpySaturatedVapor = +796.961679231104 * 1 + -340.658175519814 * Sqrt(_refrCondensingTemperature) + 119.533394288337 * _refrCondensingTemperature + -19.5674190203143 * _refrCondensingTemperature ^ 1.5 + 1.33855523003208 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00297006860172924 * _refrCondensingTemperature ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                ' Aggiunta da Cristiano Gnesutta il 19 Aprile 2018 - Entalpia specifica del vapore saturo - [kJ/kg] - R-449A- OK- OK
                'ok - Checked again by C. Gnesutta on April 19th 2018.- OK- OK
            Case "R-449a"
                EnthalpySaturatedVapor = +439.991537061807 * 1 + -17.8009954023361 * Sqrt(_refrCondensingTemperature) + 6.77658715280751 * _refrCondensingTemperature + -1.00628668200747 * _refrCondensingTemperature ^ 1.5 + 0.0677635315739349 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000166897084425326 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            Case "R-513a"
                EnthalpySaturatedVapor = +399.751793018707 * 1 + -18.2434632991701 * Sqrt(_refrCondensingTemperature) + 6.72111180356261 * _refrCondensingTemperature + -0.967954606396354 * _refrCondensingTemperature ^ 1.5 + 0.0641431373835367 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000155955049814885 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R600
                'Entalpia specifica del Vapore Saturo -R600 - OK, ricontrollata.
            Case "R-600"
                EnthalpySaturatedVapor = +565.210170222028 * 1 + 16.0584840024261 * Sqrt(_refrCondensingTemperature) + -3.53745161134185 * _refrCondensingTemperature + 0.716862325508046 * _refrCondensingTemperature ^ 1.5 + -0.0427412135964682 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000626804220373663 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembre 2016, su richiesta Direzione aziendale - R-600a
                'Entalpia specifica del Vapore Saturo -R600a - OK, ricontrollato.
            Case "R-600a"
                EnthalpySaturatedVapor = +569.049309362817 * 1 + -11.999787463052 * Sqrt(_refrCondensingTemperature) + 5.14627093512647 * _refrCondensingTemperature + -0.569725947825724 * _refrCondensingTemperature ^ 1.5 + 0.0362115705978454 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000078345715720927 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


            Case "R-1234yf"
                ' Aggiunta da Cristiano Gnesutta il 07 Settembre 2016 - Saturated Vapor -R-1234yf
                'Entalpia specifica del Vapore Saturo -R-1234yf- OK, ricontrollato.

                EnthalpySaturatedVapor = +364.837630174682 * 1 + -2.43240539829395 * Sqrt(_refrCondensingTemperature) + 1.85862789793885 * _refrCondensingTemperature + -0.258297050037054 * _refrCondensingTemperature ^ 1.5 + 0.0213578753372894 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0000853087935337375 * _refrCondensingTemperature ^ 3


                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del vapore saturo - R-1234ze
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2014 (Pomeriggio)
            Case "R-1234ze"
                EnthalpySaturatedVapor = +384.393078461578 * 1 + -0.618125770229142 * Sqrt(_refrCondensingTemperature) + 1.06809212910279 * _refrCondensingTemperature + -0.0933025918434502 * _refrCondensingTemperature ^ 1.5 + 0.00804999229522241 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0000418829816224067 * _refrCondensingTemperature ^ 3

            Case Else
        End Select

        'Vapor Specific Enthalpy  from [kJ/kg] ------> to [J/kg]
        Return (EnthalpySaturatedVapor * 1000)
    End Function


#End Region

    ' Ok. Cristiano Gnesutta, 13 Marzo 2018.

#Region "Saturated Liquid Physical Properties"

    'Saturated liquid density [kg/m^3] - SATURATED LIQUID - - OK
    Public Function CalculationOfSaturatedLiquidDensity(ByVal RefType As String, ByVal _refrCondensingTemperature As Double) As Double

        Dim thisSaturatedLiquidDensity As Double = 0

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 07 Settembre 2016, su richiesta Direzione aziendale -R32
            ' Densità Liquido Saturo - R-32 - OK- Ricontrollato
            Case "R-32"
                thisSaturatedLiquidDensity = +1666.36216284609 * 1 + -530.713685941167 * Sqrt(_refrCondensingTemperature) + 176.04523329242 * _refrCondensingTemperature + -28.7323010610185 * _refrCondensingTemperature ^ 1.5 + 1.93083860729092 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00436259807913006 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - Ricontrollata da Cristiano Gnesutta il 12 Febbraio 2016 - Densità Liquido Saturato - R134A 
            Case "R-134a"

                thisSaturatedLiquidDensity = +-101685.086506073 * 1 + 104356.637682759 * Sqrt(_refrCondensingTemperature) + -42605.3962366023 * _refrCondensingTemperature + 8612.30009018894 * _refrCondensingTemperature ^ 1.5 + -782.792712698232 * _refrCondensingTemperature * _refrCondensingTemperature + 4.42272602608935 * _refrCondensingTemperature ^ 3 + -0.0290058777541399 * _refrCondensingTemperature ^ 4 + 0.000126966463712948 * _refrCondensingTemperature ^ 5 + -0.000000256865926695807 * _refrCondensingTemperature ^ 6

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale  - R245fa
                ' Densità Liquido Saturo - R-245fa - OK- Ricontrollato
            Case "R-245fa"
                thisSaturatedLiquidDensity = +1613.05097243096 * 1 + -170.153737469331 * Sqrt(_refrCondensingTemperature) + 50.9886121993939 * _refrCondensingTemperature + -7.90074947522055 * _refrCondensingTemperature ^ 1.5 + 0.484577227464537 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000880118669558045 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - Ricontrollata da Cristiano Gnesutta il 12 Febbraio 2016 - Densità Liquido Saturato - R404A 
            Case "R-404A"
                thisSaturatedLiquidDensity = +75172.6186455135 * 1 + -75356.7509876685 * Sqrt(_refrCondensingTemperature) + 30764.912396745 * _refrCondensingTemperature + -6182.84988197153 * _refrCondensingTemperature ^ 1.5 + 553.811797367387 * _refrCondensingTemperature * _refrCondensingTemperature + -2.91770341731876 * _refrCondensingTemperature ^ 3 + 0.0160935352314057 * _refrCondensingTemperature ^ 4 + -0.0000451172426057757 * _refrCondensingTemperature ^ 5


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - Ricontrollata da Cristiano Gnesutta il 15 Febbraio 2016 - Densità Liquido Saturato - R407C 

            Case "R-407C"
                thisSaturatedLiquidDensity = +2109.95055338922 * 1 + -706.742263533413 * Sqrt(_refrCondensingTemperature) + 225.207708695467 * _refrCondensingTemperature + -34.9577739346952 * _refrCondensingTemperature ^ 1.5 + 2.235396019768 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00449816276979305 * _refrCondensingTemperature ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 settembre 2016, su richiesta Direzione aziendale - R-407F
                ' Densità Liquido Saturo - R-407F - OK- Ricontrollato
            Case "R-407F"
                thisSaturatedLiquidDensity = +1867.51687078639 * 1 + -525.080706315574 * Sqrt(_refrCondensingTemperature) + 169.379306094943 * _refrCondensingTemperature + -27.0139264239008 * _refrCondensingTemperature ^ 1.5 + 1.7676786534465 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00381787874673122 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 4 Febbraio 2016 - Saturated liquid 
            Case "R-410A"

                'Temperature        (Density) 
                '20                        1089,5 
                '25                        1064,7 
                '30                        1038,3 
                '35                        1010,1 
                '40                        979,83 
                '45                        946,76 
                '50                     910,01 
                '55                        867,87 
                '60                        816,96 
                '65                        748,6 
                '70                        618,12 

                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' Ok - Ricontrollata da Cristiano Gnesutta il  15 Febbraio 2016 - Densità Liquido Saturato - R410A 

                thisSaturatedLiquidDensity = +-62200.0140823015 * 1 + 58483.8697244879 * Sqrt(_refrCondensingTemperature) + -21351.4166373646 * _refrCondensingTemperature + 3769.73454229875 * _refrCondensingTemperature ^ 1.5 + -290.331256455565 * _refrCondensingTemperature * _refrCondensingTemperature + 1.0222853446922 * _refrCondensingTemperature ^ 3 + -0.00281984350249343 * _refrCondensingTemperature ^ 4

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                ' Aggiunta da Cristiano Gnesutta il 19 Aprile 2019 - Saturated liquid - OK
                ' Ok - Densità Liquido Saturato [kg/m^3] - R449A  - OK
                'Ok- Checked by C. Gnesutta on April 19th 2018.- OK
            Case "R-449a"
                thisSaturatedLiquidDensity = +1224.27932261868 * 1 + -15.9880564877519 * Sqrt(_refrCondensingTemperature) + 4.4901438586038 * _refrCondensingTemperature + -1.60633176425598 * _refrCondensingTemperature ^ 1.5 + 0.127918021759275 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000483983655461624 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'OK- Checked by C. Gnesutta, January 18th, 2018. - Densità Liquido Saturato - R4513a 
            Case "R-513a"

                thisSaturatedLiquidDensity = +1320.34227129691 * 1 + -83.7646468342175 * Sqrt(_refrCondensingTemperature) + 25.905364283473 * _refrCondensingTemperature + -4.79304396529483 * _refrCondensingTemperature ^ 1.5 + 0.326159501001503 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000850168414058863 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08  Settembre 2016, su richiesta Direzione aziendale - R-600
                ' Densità Liquido Saturato - R-600 - OK, Ricontrollata.
            Case "R-600"
                thisSaturatedLiquidDensity = +624.405232796414 * 1 + -19.2278558658841 * Sqrt(_refrCondensingTemperature) + 4.97494416824688 * _refrCondensingTemperature + -0.896996773293107 * _refrCondensingTemperature ^ 1.5 + 0.0544955591902829 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000111625870774042 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembree 2016, su richiesta Direzione aziendale - R-600a.
                ' Densità Liquido Saturato - R-600a- R-600 - OK, Ricontrollata. -OK.
            Case "R-600a"
                thisSaturatedLiquidDensity = +600.514993900516 * 1 + -16.5089530463484 * Sqrt(_refrCondensingTemperature) + 4.17031858140112 * _refrCondensingTemperature + -0.810546415351293 * _refrCondensingTemperature ^ 1.5 + 0.0505051557531537 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000116928003633108 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale
                ' Densità Liquido Saturo - R-1234yf - Ok- Ricontrollato.
            Case "R-1234yf"

                thisSaturatedLiquidDensity = +1535.97353161559 * 1 + -300.33706194113 * Sqrt(_refrCondensingTemperature) + 94.412477097211 * _refrCondensingTemperature + -14.9796299063203 * _refrCondensingTemperature ^ 1.5 + 0.961739187378219 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00200619127660176 * _refrCondensingTemperature ^ 3


                ' Aggiunta da Cristiano Gnesutta il 4 Febbraio 2016 - Saturated liquid 
            Case "R-1234ze"

                'Temperature    (Density) 
                '20                 1179,3 
                '25                 1163,1 
                '30                    1146,4 
                '35                    1129,3 
                '40                    1111,5 
                '45                    1093,1 
                '50                    1073,8 
                '55                    1053,7 
                '60                 1032,5 
                '65                    1010,1 
                '70             986,22 
                '75                    960,56 
                '80                 932,66 
                '85                 901,89 
                '90                 867,22 
                '95                    826,88 
                '100                777,25 


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' Ok - Ricontrollata da Cristiano Gnesutta il  15 Febbraio 2016 - Densità Liquido Saturato - R1234ze 

                thisSaturatedLiquidDensity = +-1042.40347107415 * 1 + 1958.97185741717 * Sqrt(_refrCondensingTemperature) + -664.551456535896 * _refrCondensingTemperature + 107.591862870214 * _refrCondensingTemperature ^ 1.5 + -7.60269139413105 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0222275426130123 * _refrCondensingTemperature ^ 3 + -0.0000510715791605893 * _refrCondensingTemperature ^ 4


            Case Else
        End Select


        Return thisSaturatedLiquidDensity
    End Function

    ' Viscosity of the Saturated Liquid [Pa*s] - SATURATED LIQUID- OK
    Public Function CalculationOfSaturatedLiquidViscosity(ByVal RefType As String, ByVal _refrCondensingTemperature As Double) As Double

        Dim thisSaturatedLiquidViscosity As Double = 0

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 07 Settembre 2016, su richiesta Direzione aziendale - R-32
            ' Viscosità del liquido Saturo- R-32 -OK - Ricontrollato.
            Case "R-32"
                thisSaturatedLiquidViscosity = +110.56197573893 * 1 + 29.9838175834 * Sqrt(_refrCondensingTemperature) + -10.2200358373297 * _refrCondensingTemperature + 1.11371764530582 * _refrCondensingTemperature ^ 1.5 + -0.0488467978014436 * _refrCondensingTemperature * _refrCondensingTemperature
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - Ricontrollata da Cristiano Gnesutta il 12 Febbraio 2016 - Viscosità Liquido Saturato 
            Case "R-134a"
                thisSaturatedLiquidViscosity = +16842.9320633787 * 1 + -18054.6839232875 * Sqrt(_refrCondensingTemperature) + 7976.9853049129 * _refrCondensingTemperature + -1761.38505735704 * _refrCondensingTemperature ^ 1.5 + 176.502519287839 * _refrCondensingTemperature * _refrCondensingTemperature + -1.25630484020518 * _refrCondensingTemperature ^ 3 + 0.0111158285689089 * _refrCondensingTemperature ^ 4 + -0.0000740896772140245 * _refrCondensingTemperature ^ 5 + 0.000000304933492360087 * _refrCondensingTemperature ^ 6 + -0.000000000569020547472344 * _refrCondensingTemperature ^ 7


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016 su richiesta Direzione aziendale -R-245fa
                'Viscosità del liquido Saturo- R-245fa - OK - Ricontrollato.
            Case "R-245fa"
                thisSaturatedLiquidViscosity = +559.731378415749 * 1 + 13.4489744442704 * Sqrt(_refrCondensingTemperature) + -14.4163077982999 * _refrCondensingTemperature + 1.22763388732846 * _refrCondensingTemperature ^ 1.5 + -0.0304392252561496 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0000222689011285951 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - Ricontrollata da Cristiano Gnesutta il 12 Febbraio 2016 - Viscosità Liquido Saturato - R404A 
            Case "R-404A"
                thisSaturatedLiquidViscosity = +6859.62284153141 * 1 + -6796.07958212295 * Sqrt(_refrCondensingTemperature) + 2771.33734671514 * _refrCondensingTemperature + -557.132858061964 * _refrCondensingTemperature ^ 1.5 + 49.8988047685563 * _refrCondensingTemperature * _refrCondensingTemperature + -0.262685819459119 * _refrCondensingTemperature ^ 3 + 0.00144769198157465 * _refrCondensingTemperature ^ 4 + -0.0000040548789717524 * _refrCondensingTemperature ^ 5

                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - Ricontrollata da Cristiano Gnesutta il   15  Febbraio 2016 - Viscosità Liquido Saturato - R407C 
            Case "R-407C"
                thisSaturatedLiquidViscosity = +108.90334442461 * 1 + 115.836935641577 * Sqrt(_refrCondensingTemperature) + -45.9643817471018 * _refrCondensingTemperature + 7.70659884602238 * _refrCondensingTemperature ^ 1.5 + -0.584230620818478 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00210819967525813 * _refrCondensingTemperature ^ 3 + -0.0000062934348460562 * _refrCondensingTemperature ^ 4


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - "R-407F"
                ' Viscosità del liquido Saturo- R-407F  - OK - Ricontrollata.
            Case "R-407F"
                thisSaturatedLiquidViscosity = +233.106768680583 * 1 + -11.9837180410175 * Sqrt(_refrCondensingTemperature) + 1.30161245503356 * _refrCondensingTemperature + -0.684358196422295 * _refrCondensingTemperature ^ 1.5 + 0.065172347927402 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000193037679762822 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 4 Febbraio 2016 - Saturated liquid 
            Case "R-410A"

                'Temperature    (Viscosity) 
                '20                 126,68 
                '25                    118,65 
                '30                    110,92 
                '35                    103,44 
                '40                    96,166 
                '45                    89,02 
                '50                    81,904 
                '55                    74,659 
                '60                    66,979 
                '65                    58,14 
                '70                    45,308 

                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - Ricontrollata da Cristiano Gnesutta il   15  Febbraio 2016 - Viscosità Liquido Saturato  - R410A 

                thisSaturatedLiquidViscosity = +1718.71941319788 * 1 + -1273.19110041135 * Sqrt(_refrCondensingTemperature) + 401.09951660555 * _refrCondensingTemperature + -59.9458720922393 * _refrCondensingTemperature ^ 1.5 + 3.7387015078491 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00673349080381379 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                ' Aggiunta da Cristiano Gnesutta il 19 Aprile 2018 - Viscosity of the Saturated liquid [microPa*s]-OK -OK
                'Liquid viscosity -OK
            Case "R-449a"
                thisSaturatedLiquidViscosity = +236.2879859421 * 1 + -6.95215965582841 * Sqrt(_refrCondensingTemperature) + -0.932255056379546 * _refrCondensingTemperature + -0.204967867586591 * _refrCondensingTemperature ^ 1.5 + 0.0260712967527098 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0000771633092674985 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 18 Gennaio 2018 - Saturated liquid  - "R-513a"
            Case "R-513a"

                thisSaturatedLiquidViscosity = +250.815930068126 * 1 + -10.5594907402803 * Sqrt(_refrCondensingTemperature) + -1.15401150762879 * _refrCondensingTemperature + 0.0026295676113753 * _refrCondensingTemperature * _refrCondensingTemperature


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 ASettembre 2016, su richiesta Direzione aziendale -R-600
                ' Viscosità Liquido Saturo  - R600 -OK, Ricontrollata. - OK
            Case "R-600"
                thisSaturatedLiquidViscosity = +199.622462776504 * 1 + 3.04605970038077 * Sqrt(_refrCondensingTemperature) + -3.32187134681307 * _refrCondensingTemperature + 0.247125532569089 * _refrCondensingTemperature ^ 1.5 + -0.00695581190087635 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00000265045628115737 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 settembre 2016, su richiesta Direzione aziendale -R-600a
                ' Viscosità Liquido Saturo  - R-600a - OK - Ricontrollata.- OK.
            Case "R-600a"
                thisSaturatedLiquidViscosity = +188.76286273702 * 1 + 8.17690051146363 * Sqrt(_refrCondensingTemperature) + -4.96945020824331 * _refrCondensingTemperature + 0.438628114497418 * _refrCondensingTemperature ^ 1.5 + -0.0146238632605109 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00000192624493081887 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale
                ' Viscosità del liquido Saturo- R-1234yf - OK- Ricontrollato.
            Case "R-1234yf"
                thisSaturatedLiquidViscosity = +237.552381885665 * 1 + -24.0781414735832 * Sqrt(_refrCondensingTemperature) + 5.05226710630005 * _refrCondensingTemperature + -1.10953715198367 * _refrCondensingTemperature ^ 1.5 + 0.083963436611598 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000191550010475924 * _refrCondensingTemperature ^ 3


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
            Case "R-1234ze"
                'Temperature    Viscosity 
                '20                    211,49 
                '25                    199,38 
                '30                    187,98 
                '35                 177,21 
                '40                 167 
                '45                    157,3 
                '50                    148,03 
                '55                 139,15 
                '60                 130,61 
                '65                 122,37 
                '70                    114,36 

                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - Ricontrollata da Cristiano Gnesutta il   15 Febbraio 2016 - Viscosità Liquido Saturato  - R1234ze 
                ' Ok - Checked again by C. Gnesutta on April 19th 2018.
                thisSaturatedLiquidViscosity = +268.966888306334 * 1 + 0.716869491862013 * Sqrt(_refrCondensingTemperature) + -3.89566300391274 * _refrCondensingTemperature + 0.174595690413346 * _refrCondensingTemperature ^ 1.5 + 0.00484671498854516 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0000405529900952252 * _refrCondensingTemperature ^ 3

            Case Else
        End Select


        'Liquid viscosity from [microPa*s] -----> to [Pa*s]
        thisSaturatedLiquidViscosity = thisSaturatedLiquidViscosity / 1000000

        Return thisSaturatedLiquidViscosity
    End Function


    ' Thermal Conductivity of the Saturated liquid [W/(m*°K)] - SATURATED LIQUID- OK
    Public Function CalculationOfSaturatedLiquidThermalConductivity(ByVal RefType As String, ByVal _refrCondensingTemperature As Double) As Double

        Dim thisSaturatedLiquidThermalConductivity As Double = 0

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 07 Settembre 2016, su richiesta Direzione aziendale-  R-32
            'Conducibilità termica del liquido saturo -  R-32 - OK, Ricontrollato.

            Case "R-32"
                thisSaturatedLiquidThermalConductivity = +143.32863345819 * 1 + 1.91537024777358 * Sqrt(_refrCondensingTemperature) + -1.479082917948 * _refrCondensingTemperature + 0.107378420357847 * _refrCondensingTemperature ^ 1.5 + -0.00554117811988308 * _refrCondensingTemperature * _refrCondensingTemperature


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - ricontrollata da Cristiano Gnesutta il 12 Febbraio 2016 - Conducibilità Liquido alla Saturazione - R134A 
            Case "R-134a"
                thisSaturatedLiquidThermalConductivity = +-2010.06605230106 * 1 + 1432.2489625491 * Sqrt(_refrCondensingTemperature) + -294.581236706452 * _refrCondensingTemperature + 5.43323669286296 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0917670465487634 * _refrCondensingTemperature ^ 3 + 0.000991739254763184 * _refrCondensingTemperature ^ 4 + -0.00000596863455268905 * _refrCondensingTemperature ^ 5 + 0.0000000151515717546293 * _refrCondensingTemperature ^ 6


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale -R-245fa
                'Conducibilità termica del liquido saturo - R-245fa - OK, Ricontrollato.
            Case "R-245fa"
                thisSaturatedLiquidThermalConductivity = +96.0079064541242 * 1 + -0.0813054834712972 * Sqrt(_refrCondensingTemperature) + -0.29529036160697 * _refrCondensingTemperature + 0.00130436849255222 * _refrCondensingTemperature ^ 1.5 + -0.000496241012652027 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00000216946968927386 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - ricontrollata da Cristiano Gnesutta il 12 Febbraio 2016 - Conducibilità Liquido alla Saturazione - R404A 
            Case "R-404A"
                thisSaturatedLiquidThermalConductivity = +25762.8372592227 * 1 + -28381.5101959719 * Sqrt(_refrCondensingTemperature) + 12693.8573153128 * _refrCondensingTemperature + -2825.31834987798 * _refrCondensingTemperature ^ 1.5 + 284.074162814614 * _refrCondensingTemperature * _refrCondensingTemperature + -1.99128259156848 * _refrCondensingTemperature ^ 3 + 0.0164827563166154 * _refrCondensingTemperature ^ 4 + -0.0000924944157481556 * _refrCondensingTemperature ^ 5 + 0.000000243167918916768 * _refrCondensingTemperature ^ 6


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - ricontrollata da Cristiano Gnesutta il  15 Febbraio 2016 - Conducibilità Liquido alla Saturazione - R407C 
            Case "R-407C"
                thisSaturatedLiquidThermalConductivity = +78.7813597121191 * 1 + 12.3082907489454 * Sqrt(_refrCondensingTemperature) + -4.3556941550252 * _refrCondensingTemperature + 0.578182934380994 * _refrCondensingTemperature ^ 1.5 + -0.0355014434941549 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000608944476610481 * _refrCondensingTemperature ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale -R-407F
                'Conducibilità termica del liquido saturo - R-407F-  OK- Ricontrollato.

            Case "R-407F"
                thisSaturatedLiquidThermalConductivity = +91.7455152247289 * 1 + 2.91074609685035 * Sqrt(_refrCondensingTemperature) + -1.4390386827106 * _refrCondensingTemperature + 0.151879839690953 * _refrCondensingTemperature ^ 1.5 + -0.0096671820943478 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000182901969444645 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 4 Febbraio 2016 - Saturated liquid 
            Case "R-410A"

                'Temperature        Thermal Conductivity 
                '20                    89,873 
                '25                    87,223 
                '30                 84,607 
                '35                    82,027 
                '40                    79,484 
                '45                    76,984 
                '50                    74,535 
                '55                    72,169 
                '60                    70,01 
                '65                    68,801 
                '70                    76,175 

                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' Ok - ricontrollata da Cristiano Gnesutta il  15 Febbraio 2016 - Conducibilità Liquido alla Saturazione - R410A 
                thisSaturatedLiquidThermalConductivity = +-32103.9413518738 * 1 + 32682.1548490851 * Sqrt(_refrCondensingTemperature) + -13299.1751566177 * _refrCondensingTemperature + 2662.34265994943 * _refrCondensingTemperature ^ 1.5 + -237.510166735745 * _refrCondensingTemperature * _refrCondensingTemperature + 1.23965193595622 * _refrCondensingTemperature ^ 3 + -0.00676127113847024 * _refrCondensingTemperature ^ 4 + 0.0000186756598395545 * _refrCondensingTemperature ^ 5


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                ' Aggiunta da C. Gnesutta il 19 Aprile 2018 - Saturated liquid Thermal Conductivity [mW/(m*°k)] - OK- OK
                ' Ok - Checked by C. Gnesutta on April 19th 2018.- OK
            Case "R-449a"
                thisSaturatedLiquidThermalConductivity = +100.63273935531 * 1 + -0.756337896686333 * Sqrt(_refrCondensingTemperature) + -0.20820848472205 * _refrCondensingTemperature + -0.0449805788693087 * _refrCondensingTemperature ^ 1.5 + 0.00362263063027704 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00000712519146333626 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da C. Gnesutta il 18 Gennaio 2018 - Saturated liquid Thermal Conductivity

            Case "R-513a"
                thisSaturatedLiquidThermalConductivity = +77.3572232271947 * 1 + 1.91306041742621 * Sqrt(_refrCondensingTemperature) + -0.915825668273831 * _refrCondensingTemperature + 0.0682286248753381 * _refrCondensingTemperature ^ 1.5 + -0.00292737643842895 * _refrCondensingTemperature * _refrCondensingTemperature


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R600
                ' Conducibilità Liquido saturo -  R600  OK- Ricontrollato. - OK.
            Case "R-600"
                thisSaturatedLiquidThermalConductivity = +106.307324238571 * 1 + 7.2413593461975 * Sqrt(_refrCondensingTemperature) + -2.68442180948329 * _refrCondensingTemperature + 0.325323809537578 * _refrCondensingTemperature ^ 1.5 + -0.0190597932460808 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000341119777536449 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembre 2016, su richiesta Direzione aziendale -R-600a
                ' Conducibilità Liquido saturo -  R-600a  OK- Ricontrollato. - OK.
            Case "R-600a"
                thisSaturatedLiquidThermalConductivity = +100.486822248432 * 1 + -1.48620726003405 * Sqrt(_refrCondensingTemperature) + 0.0727022518405036 * _refrCondensingTemperature + -0.0683374894060713 * _refrCondensingTemperature ^ 1.5 + 0.00485488815018081 * _refrCondensingTemperature * _refrCondensingTemperature + -0.00000662516717171496 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


            Case "R-1234yf"
                'Aggiunto da C. Gnesutta il 07 Settembre 2016, su richiesta Direzione aziendale - R-1234yf
                'Conducibilità termica del liquido saturo -  R-1234yf - Ok- Ricontrollato.
                thisSaturatedLiquidThermalConductivity = +73.8241804597947 * 1 + -2.21548791769649 * Sqrt(_refrCondensingTemperature) + 0.481253955195388 * _refrCondensingTemperature + -0.139889266744385 * _refrCondensingTemperature ^ 1.5 + 0.0106303247815965 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0000256655479155586 * _refrCondensingTemperature ^ 3


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
            Case "R-1234ze"

                'Temperature        Thermal Conductivity 
                '20                    75,925 
                '25                    74,204 
                '30                    72,508 
                '35                    70,836 
                '40                 69,187 
                '45                 67,561 
                '50                 65,956 
                '55                    64,371 
                '60                    62,806 
                '65                    61,259 
                '70                    59,73 

                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - ricontrollata da Cristiano Gnesutta il  15 Febbraio 2016 - Conducibilità Liquido alla Saturazione - R1234ze 


                thisSaturatedLiquidThermalConductivity = +84.1944453797551 * 1 + -1.04467502142343 * Sqrt(_refrCondensingTemperature) + 0.0160892038653735 * _refrCondensingTemperature + -0.0683736713189864 * _refrCondensingTemperature ^ 1.5 + 0.00586149331225067 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0000195193847882182 * _refrCondensingTemperature ^ 3 + 0.0000000486208289237381 * _refrCondensingTemperature ^ 4

            Case Else
        End Select


        'From [mW/(m*°K)] -----> to  [W/(m*°K)]
        thisSaturatedLiquidThermalConductivity = thisSaturatedLiquidThermalConductivity / 1000

        Return thisSaturatedLiquidThermalConductivity
    End Function

    'Specific heat of the saturated liquid  [J/(kg*°K)] - SATURATED LIQUID- OK
    Public Function CalculationOfSaturatedLiquidSpecificHeat(ByVal RefType As String, ByVal _refrCondensingTemperature As Double) As Double

        Dim thisSaturatedLiquidSpecificHeat As Double = 0

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 07 Settembre 2016, su richiesta Direzione aziendale -R32.
            'Calore Specifico del Liquido Saturo -R32- OK, Ricontrollato.

            Case "R-32"
                thisSaturatedLiquidSpecificHeat = +-35.0705393651467 * 1 + 31.6062107929212 * Sqrt(_refrCondensingTemperature) + -10.5417601109061 * _refrCondensingTemperature + 1.66162059434639 * _refrCondensingTemperature ^ 1.5 + -0.110034314958324 * _refrCondensingTemperature * _refrCondensingTemperature + 0.000229758217603765 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                'OK - Ricontrollato da Cristiano Gnesutta il 12 Febbraio 2016 - Calore Specifico Liquido Saturato - R134A 
            Case "R-134a"

                thisSaturatedLiquidSpecificHeat = +305.51500351893 * 1 + -317.03319024623 * Sqrt(_refrCondensingTemperature) + 133.372167521923 * _refrCondensingTemperature + -27.8365490346706 * _refrCondensingTemperature ^ 1.5 + 2.61723550449939 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0159133229942774 * _refrCondensingTemperature ^ 3 + 0.000113158989558762 * _refrCondensingTemperature ^ 4 + -0.00000054106897627226 * _refrCondensingTemperature ^ 5 + 0.00000000120512047935436 * _refrCondensingTemperature ^ 6


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale -R-245fa
                'Calore Specifico del Liquido Saturo -R-245fa -OK, Ricontrollato.
            Case "R-245fa"
                thisSaturatedLiquidSpecificHeat = +1.14724021869891 * 1 + 0.109835013727549 * Sqrt(_refrCondensingTemperature) + -0.0351357977395579 * _refrCondensingTemperature + 0.00581363291729089 * _refrCondensingTemperature ^ 1.5 + -0.000376693821290301 * _refrCondensingTemperature * _refrCondensingTemperature + 0.000000820783210865678 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                'OK - Ricontrollato da Cristiano Gnesutta il 12 Febbraio 2016 - Calore Specifico Liquido Saturato - R404A 
            Case "R-404A"
                thisSaturatedLiquidSpecificHeat = +-1285.20895773656 * 1 + 1331.83480958864 * Sqrt(_refrCondensingTemperature) + -553.520164295137 * _refrCondensingTemperature + 113.337556877019 * _refrCondensingTemperature ^ 1.5 + -10.3555815694319 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0569436074118082 * _refrCondensingTemperature ^ 3 + -0.000329218126250176 * _refrCondensingTemperature ^ 4 + 0.000000970928023072253 * _refrCondensingTemperature ^ 5


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                'OK - Ricontrollato da Cristiano Gnesutta il  15  Febbraio 2016 - Calore Specifico Liquido Saturato - R407C 
            Case "R-407C"
                thisSaturatedLiquidSpecificHeat = +42.8945587231442 * 1 + -38.6951090488398 * Sqrt(_refrCondensingTemperature) + 14.2862434003899 * _refrCondensingTemperature + -2.5538878421351 * _refrCondensingTemperature ^ 1.5 + 0.199481159946217 * _refrCondensingTemperature * _refrCondensingTemperature + -0.000726170282941799 * _refrCondensingTemperature ^ 3 + 0.00000209995930575673 * _refrCondensingTemperature ^ 4

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R-407F
                'Calore Specifico del Liquido Saturo -"R-407F" -OK, Ricontrollata.

            Case "R-407F"
                thisSaturatedLiquidSpecificHeat = +-8.81623646588098 * 1 + 8.78412493497902 * Sqrt(_refrCondensingTemperature) + -2.93372566957334 * _refrCondensingTemperature + 0.464027946912736 * _refrCondensingTemperature ^ 1.5 + -0.030823654164121 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000653808794730491 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
            Case "R-410A"

                'Temperature    (CP) 
                '20                    1,6443 
                '25                    1,6948 
                '30                    1,7555 
                '35                 1,8304 
                '40                    1,9266 
                '45                    2,0567 
                '50                    2,2467 
                '55                    2,5566 
                '60                    3,1598 
                '65                    4,8323 

                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                ' OK - Ricontrollato da Cristiano Gnesutta il   15 Febbraio 2016 - Calore Specifico Liquido Saturato - R410A 

                thisSaturatedLiquidSpecificHeat = +62518.9905410713 * 1 + -68440.1582072701 * Sqrt(_refrCondensingTemperature) + 30325.4388190448 * _refrCondensingTemperature + -6685.14512848542 * _refrCondensingTemperature ^ 1.5 + 665.661338032105 * _refrCondensingTemperature * _refrCondensingTemperature + -4.57488866727949 * _refrCondensingTemperature ^ 3 + 0.037121980205742 * _refrCondensingTemperature ^ 4 + -0.000204222425921527 * _refrCondensingTemperature ^ 5 + 0.000000526520388609411 * _refrCondensingTemperature ^ 6

                'Aggiunto da C. Gnesutta il 19 Aprile 2018, Calore Specifico Liquido Saturato - Liquid Specific Heat  [(kJ)/(kg*°K)] -Ok
                'Ok - Checked again by C. Gnesutta on April 19th 2018. -Ok
            Case "R-449a"
                thisSaturatedLiquidSpecificHeat = +0.0253350249258615 * 1 + 1.20082169060069 * Sqrt(_refrCondensingTemperature) + -0.40604802814017 * _refrCondensingTemperature + 0.0660854647098412 * _refrCondensingTemperature ^ 1.5 + -0.00448884334309004 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000104198971425566 * _refrCondensingTemperature ^ 3


                'Aggiunto da C. Gnesutta il 18 Gennaio 2016, Calore Specifico Liquido Saturato 
            Case "R-513a"
                thisSaturatedLiquidSpecificHeat = +1.72325271385247 * 1 + -0.243638699157676 * Sqrt(_refrCondensingTemperature) + 0.0452958033797735 * _refrCondensingTemperature + -0.000457454381926209 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00000347056942461307 * _refrCondensingTemperature ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R600
                'Calore Specifico Liquido Saturato - R600  - OK, Ricontrollata.
            Case "R-600"

                thisSaturatedLiquidSpecificHeat = +2.09351171361275 * 1 + 0.18286944821925 * Sqrt(_refrCondensingTemperature) + -0.05488484333085 * _refrCondensingTemperature + 0.00917651933308654 * _refrCondensingTemperature ^ 1.5 + -0.00057939791655393 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00000128168994866148 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembre 2016, su richiesta Direzione aziendale - R-600a
                'Calore Specifico Liquido Saturato - R-600a -OK, ricontrollato.
            Case "R-600a"
                thisSaturatedLiquidSpecificHeat = +2.16115268732724 * 1 + 0.112230063281651 * Sqrt(_refrCondensingTemperature) + -0.0349466937240472 * _refrCondensingTemperature + 0.00685755782577441 * _refrCondensingTemperature ^ 1.5 + -0.000475798067335065 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00000137910264974643 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

            Case "R-1234yf"
                ' Aggiunta da Cristiano Gnesutta il 07 Settembre 2016 - Saturated liquid -R-1234yf
                'Calore Specifico del Liquido Saturo -R-1234yf- Ok, Ricontrollato.
                thisSaturatedLiquidSpecificHeat = +-0.0315407494471175 * 1 + 1.17391816989693 * Sqrt(_refrCondensingTemperature) + -0.403935229451376 * _refrCondensingTemperature + 0.0672227918868348 * _refrCondensingTemperature ^ 1.5 + -0.0046845479781885 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000113562714157782 * _refrCondensingTemperature ^ 3

                ' Aggiunta da Cristiano Gnesutta il 4 Febbraio 2016 - Saturated liquid 
            Case "R-1234ze"

                'Temperature        (CP) 
                '20                        1,3698 
                '25                     1,3856 
                '30                     1,4029 
                '35                     1,422 
                '40                     1,4431 
                '45                     1,4667 
                '50                     1,4932 
                '55                     1,5234 
                '60                        1,5583 
                '65                        1,5995 
                '70                        1,6493 


                ' Aggiunta da Cristiano Gnesutta il 2 Febbraio 2016 - Saturated liquid 
                '  Ok - Ricontrollato da Cristiano Gnesutta il 15  Febbraio 2016 - Calore Specifico Liquido Saturato - R1234ze 

                thisSaturatedLiquidSpecificHeat = +2.65309605919185 * 1 + -1.26670417619888 * Sqrt(_refrCondensingTemperature) + 0.479155510181628 * _refrCondensingTemperature + -0.0871877970535187 * _refrCondensingTemperature ^ 1.5 + 0.00699456848749469 * _refrCondensingTemperature * _refrCondensingTemperature + -0.0000268359667794017 * _refrCondensingTemperature ^ 3 + 0.0000000852667139673186 * _refrCondensingTemperature ^ 4


            Case Else
        End Select


        'From [kJ/(K*kg)] -------> to [J/(K*kg)]
        thisSaturatedLiquidSpecificHeat = thisSaturatedLiquidSpecificHeat * 1000

        Return thisSaturatedLiquidSpecificHeat
    End Function

    'Specific enthalpy of the saturated liquid from [kJ/(kg)] -------> to [J/(kg)]  - SATURATED LIQUID- OK
    Public Function SpecificEnthalpyLiquidCondensingConditions(ByVal RefType As String, ByVal _refrCondensingTemperature As Double) As Double

        Dim EnthalpyLiquidCondensingConditions As Double = 0

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale
            ' Entalpia Specifica del Liquido Saturo -R-32 -OK, Ricontrollato.
            Case "R-32"
                EnthalpyLiquidCondensingConditions = +85.1236524053423 * 1 + 99.7367185837839 * Sqrt(_refrCondensingTemperature) + -31.9864630162485 * _refrCondensingTemperature + 5.40210362441867 * _refrCondensingTemperature ^ 1.5 + -0.362777396756094 * _refrCondensingTemperature * _refrCondensingTemperature + 0.000827605997087702 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del liquido condensato - R-134a
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2016 (Pomeriggio)
            Case "R-134a"

                EnthalpyLiquidCondensingConditions = +192.775262533161 * 1 + 6.60609296940837 * Sqrt(_refrCondensingTemperature) + -1.00429178657679 * _refrCondensingTemperature + 0.394800542009003 * _refrCondensingTemperature ^ 1.5 + -0.026710259024607 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000763208786276684 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale- R245fa 
                ' Entalpia Specifica del Liquido Saturo - R245fa  -OK, Ricontrollato.
            Case "R-245fa"
                EnthalpyLiquidCondensingConditions = +178.352390982746 * 1 + 17.5617237471208 * Sqrt(_refrCondensingTemperature) + -4.24687381162244 * _refrCondensingTemperature + 0.81682327945372 * _refrCondensingTemperature ^ 1.5 + -0.049749841901453797 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000934807036184024 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del liquido condensato - R-404a
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2014 (Pomeriggio)
            Case "R-404A"
                EnthalpyLiquidCondensingConditions = +46.8951944448549 * 1 + 138.91372390961 * Sqrt(_refrCondensingTemperature) + -47.2440413003934 * _refrCondensingTemperature + 7.98696284560539 * _refrCondensingTemperature ^ 1.5 + -0.546323715248285 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00122094809902133 * _refrCondensingTemperature ^ 3

                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del liquido condensato - R-407C
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2014 (Pomeriggio)
            Case "R-407C"
                EnthalpyLiquidCondensingConditions = +174.838115090211 * 1 + 22.9909061275355 * Sqrt(_refrCondensingTemperature) + -6.83232855010116 * _refrCondensingTemperature + 1.38306751117558 * _refrCondensingTemperature ^ 1.5 + -0.0961141358764969 * _refrCondensingTemperature * _refrCondensingTemperature + 0.000245651030496798 * _refrCondensingTemperature ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale - R-407F
                'Entalpia Specifica del Liquido Saturo - R-407F-OK, Ricontrollato.

            Case "R-407F"
                EnthalpyLiquidCondensingConditions = +152.807113810656 * 1 + 40.7330039325027 * Sqrt(_refrCondensingTemperature) + -12.3581406568828 * _refrCondensingTemperature + 2.20408393606111 * _refrCondensingTemperature ^ 1.5 + -0.147395607117278 * _refrCondensingTemperature * _refrCondensingTemperature + 0.000346404154681653 * _refrCondensingTemperature ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del liquido condensato - R-410a
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2014 (Pomeriggio)
            Case "R-410A"
                EnthalpyLiquidCondensingConditions = +-101.012861681629 * 1 + 272.581567851176 * Sqrt(_refrCondensingTemperature) + -93.7371298084627 * _refrCondensingTemperature + 15.5975085900973 * _refrCondensingTemperature ^ 1.5 + -1.06425898762096 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00233415145107359 * _refrCondensingTemperature ^ 3


                ' Aggiunta da Cristiano Gnesutta il 18 Aprile 2018 - Entalpia specifica del liquido condensato [kJ/kg] - R-449a - OK
                'Ok - Checked again by C. Gnesutta on April 19th 2018.  - OK
            Case "R-449a"

                EnthalpyLiquidCondensingConditions = +193.967493224443 * 1 + 5.23016715188953 * Sqrt(_refrCondensingTemperature) + -0.395739328560204 * _refrCondensingTemperature + 0.297990917528217 * _refrCondensingTemperature ^ 1.5 + -0.0196679354932128 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000626647743696537 * _refrCondensingTemperature ^ 3


            Case "R-513a"
                EnthalpyLiquidCondensingConditions = +210.072492735514 * 1 + -7.66578931242768 * Sqrt(_refrCondensingTemperature) + 3.51155445769456 * _refrCondensingTemperature + -0.283704313430507 * _refrCondensingTemperature ^ 1.5 + 0.0157875866809625 * _refrCondensingTemperature * _refrCondensingTemperature


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 08 Settembre 2016, su richiesta Direzione aziendale -R600
                'Entalpia Specifica del Liquido Saturo - R600 - OK, ricontrollata.

            Case "R-600"

                EnthalpyLiquidCondensingConditions = +192.432341961355 * 1 + 6.37859643673212 * Sqrt(_refrCondensingTemperature) + 0.226932678999333 * _refrCondensingTemperature + 0.322403431299209 * _refrCondensingTemperature ^ 1.5 + -0.0185440939459539 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000480232182233655 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 12 Settembre 2016, su richiesta Direzione aziendale -R-600a
                'Entalpia Specifica del Liquido Saturo -R-600a - OK, ricontrollato.
            Case "R-600a"
                EnthalpyLiquidCondensingConditions = +192.689108337704 * 1 + 6.07973615713561 * Sqrt(_refrCondensingTemperature) + 0.316624284631025 * _refrCondensingTemperature + 0.302862804451892 * _refrCondensingTemperature ^ 1.5 + -0.0170081069220687 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000479221958719026 * _refrCondensingTemperature ^ 3
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


            Case "R-1234yf"
                ' Aggiunta da Cristiano Gnesutta il 07 Settembre 2016 - Saturated Vapor -R-1234yf
                ' Entalpia Specifica del Liquido Saturo -R-1234yf- OK, ricontrollato.

                EnthalpyLiquidCondensingConditions = +166.520048884512 * 1 + 28.4014983545902 * Sqrt(_refrCondensingTemperature) + -8.06691638786918 * _refrCondensingTemperature + 1.45605373725803 * _refrCondensingTemperature ^ 1.5 + -0.0935752635609374 * _refrCondensingTemperature * _refrCondensingTemperature + 0.00019993481462657 * _refrCondensingTemperature ^ 3

                ' Aggiunta da Cristiano Gnesutta il 18 Marzo 2016 - Entalpia specifica del liquido condensato - R-1234ze
                ' Ok - Ricontrollata da Cristiano Gnesutta il 18 Marzo 2014 (Pomeriggio)
            Case "R-1234ze"
                EnthalpyLiquidCondensingConditions = +196.603399664966 * 1 + 3.20375974727114 * Sqrt(_refrCondensingTemperature) + 0.152688224647356 * _refrCondensingTemperature + 0.20041305101301 * _refrCondensingTemperature ^ 1.5 + -0.0133730288199855 * _refrCondensingTemperature * _refrCondensingTemperature + 0.0000425919323303277 * _refrCondensingTemperature ^ 3

            Case Else
        End Select


        'From [kJ/(kg)] -------> to [J/(kg)] 
        Return EnthalpyLiquidCondensingConditions * 1000

    End Function


#End Region

#End Region

#Region "MonoPhase Refrigerant Properties - Subcooled Liquid"

    'SubCooled liquid density [kg/m^3] - SubCooled LIQUID
    Public Function CalculationOfLiquidDensity(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim thisLiquidDensity As Double = 0

        _refrPressure = _refrPressure / 100000

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
            ' Density of the SubCooled liquid [kg/m^3] - R-32
            ' SubCooled LIQUID - SubCooled LIQUID DENSITY - R-32 - OK - Ricontrollato.

            Case "R-32"
                thisLiquidDensity = +1039.24208115067 * 1 + -2.77606733111794 * _refrTemperature + -0.0338440743223083 * _refrTemperature ^ 2 + -0.000350791401041758 * _refrTemperature ^ 3 + 1.5665557415881 * _refrPressure + -0.0651062620491532 * _refrTemperature * _refrPressure + 0.00275868188225586 * _refrTemperature ^ 2 * _refrPressure + -0.0000201208898805862 * _refrTemperature ^ 3 * _refrPressure + -0.0175639133098706 * _refrPressure ^ 2



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'DENSITA' DEL LIQUIDO SOTTORAFREDDATO - R134A - Sottoraffreddamento - Ok - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-134a"
                thisLiquidDensity = +1296.03618110716 * 1 + -3.492255159976 * _refrTemperature + -0.00413563885344548 * _refrTemperature ^ 2 + -0.000184818800487319 * _refrTemperature ^ 3 + 0.021576124595967 * _refrTemperature * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
                ' Density of the SubCooled liquid [kg/m^3] - R-245fa
                ' SubCooled LIQUID - SubCooled LIQUID DENSITY - R-245fa - OK - Ricontrollato.

            Case "R-245fa"
                thisLiquidDensity = +1403.17054266988 * 1 + -2.479138358371 * _refrTemperature + -0.00539846498667229 * _refrTemperature ^ 2 + 0.471060109635062 * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'DENSITA' DEL LIQUIDO SOTTORAFREDDATO - R404A - Sottoraffreddamento - OK - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-404A"
                thisLiquidDensity = +1121.77282158013 * 1 + -1.58276312947794 * _refrTemperature + -0.0810297670488505 * _refrTemperature ^ 2 + 2.83316736027616 * _refrPressure + -0.219793001485534 * _refrTemperature * _refrPressure + 0.00746932208101603 * _refrTemperature ^ 2 * _refrPressure + -0.0000630682576145459 * _refrTemperature ^ 3 * _refrPressure

                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - SubCooling 
                'DENSITA' DEL LIQUIDO SOTTORAFREDDATO - R407C - Sottoraffreddamento - OK - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
            Case "R-407C"
                thisLiquidDensity = +1370.74001479344 * 1 + 32.1322445518738 * _refrTemperature + 0.649796552728569 * _refrTemperature ^ 2 + -0.00179063577999609 * _refrTemperature ^ 3 + -88.3537818634677 * _refrPressure + -9.19135034293381 * _refrTemperature * _refrPressure + 0.00130234453394604 * _refrTemperature ^ 3 * _refrPressure + 15.2346094413216 * _refrPressure ^ 2 + 0.475397145230848 * _refrTemperature * _refrPressure ^ 2 + -0.0105284724872763 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.0000143178168610664 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.780389107830438 * _refrPressure ^ 3 + 0.0120511182167318 * _refrTemperature * _refrPressure ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 23 Aprile 2018 su richiesta della Direzione aziendale
                ' Density of the SubCooled liquid [kg/m^3] - R-407F
                ' SubCooled LIQUID - SubCooled LIQUID DENSITY - R-407F - OK - Ricontrollato.

            Case "R-407F"
                thisLiquidDensity = +1205.22226577393 * 1 + -3.23528076839298 * _refrTemperature + -0.0289769710367935 * _refrTemperature ^ 2 + -0.000338434518555634 * _refrTemperature ^ 3 + 1.66675029715485 * _refrPressure + -0.0634027807729085 * _refrTemperature * _refrPressure + 0.0028039840828096 * _refrTemperature ^ 2 * _refrPressure + -0.0000200511013546665 * _refrTemperature ^ 3 * _refrPressure + -0.0231901096299749 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - SubCooling 
                'DENSITA' DEL LIQUIDO SOTTORAFREDDATO - R410A - Sottoraffreddamento - OK  - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
            Case "R-410A"
                thisLiquidDensity = +1136.37852999086 * 1 + -1.38979782101102 * _refrTemperature + -0.0906508634469265 * _refrTemperature ^ 2 + 2.57310509815353 * _refrPressure + -0.19918348046704 * _refrTemperature * _refrPressure + 0.00656943015082009 * _refrTemperature ^ 2 * _refrPressure + -0.0000543922536551263 * _refrTemperature ^ 3 * _refrPressure


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                ' Aggiunta da Cristiano Gnesutta il 23 Aprile 2018 - SubCooling 
                'DENSITA' DEL LIQUIDO SOTTORAFFREDDATO - R-449A - Sottoraffreddamento - OK  - Ricontrollata da Cristiano Gnesutta il 23 Aprile 2018 

            Case "R-449a"

                thisLiquidDensity = +1209.05025169989 * 1 + -3.10624265870045 * _refrTemperature + -0.0121496916321924 * _refrTemperature ^ 2 + -0.000147764167580203 * _refrTemperature ^ 3 + 0.79184264460423 * _refrPressure + -0.0222925350525021 * _refrTemperature * _refrPressure + 0.00108004104190812 * _refrTemperature ^ 2 * _refrPressure + -0.00000772466642855662 * _refrTemperature ^ 3 * _refrPressure + -0.00890357016363996 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' OK
            Case "R-513a"
                thisLiquidDensity = +1227.94676863326 * 1 + -3.42301865788005 * _refrTemperature + -0.00455213471188465 * _refrTemperature ^ 2 + -0.000191883702698223 * _refrTemperature ^ 3 + 0.0248326608448669 * _refrTemperature * _refrPressure


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 05 Settembre 2016 su richiesta della Direzione aziendale
                ' Density of the SubCooled liquid [kg/m^3] - R-600
                ' SubCooled LIQUID - SubCooled LIQUID DENSITY - R-600 - Ok- Ricontrollato.
            Case "R-600"
                thisLiquidDensity = +600.488402953295 * 1 + -1.08854169341119 * _refrTemperature + -0.0012018440470063 * _refrTemperature ^ 2 + -0.0000136210376214772 * _refrTemperature ^ 3 + 0.205305648789121 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
                ' Density of the SubCooled liquid [kg/m^3] -R-600a
                ' SubCooled LIQUID - SubCooled LIQUID DENSITY - R-600a - OK- Ricontrollato.

            Case "R-600a"

                thisLiquidDensity = +580.487216412903 * 1 + -1.17129759947293 * _refrTemperature + -0.00148323868206585 * _refrTemperature ^ 2 + -0.0000239216768232655 * _refrTemperature ^ 3 + 0.113938758497 * _refrPressure + 0.00397233009350817 * _refrTemperature * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 01 Settembre 2016 su richiesta Direzione aziendale
                ' Density of the SubCooled liquid [kg/m^3] -R-1234yf
                ' SubCooled LIQUID - SubCooled LIQUID DENSITY - R-1234yf - OK- Ricontrollato.

            Case "R-1234yf"
                thisLiquidDensity = +1177.87113055023 * 1 + -3.38612955134838 * _refrTemperature + -0.00431160975535594 * _refrTemperature ^ 2 + -0.000202888049009226 * _refrTemperature ^ 3 + 0.0273502221128364 * _refrTemperature * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - SubCooling 
                'DENSITA' DEL LIQUIDO SOTTORAFREDDATO - R1234ze - Sottoraffreddamento -OK - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016  - OK
            Case "R-1234ze"

                thisLiquidDensity = +1240.97377814847 * 1 + -3.0353307394127 * _refrTemperature + -0.00339053264741995 * _refrTemperature ^ 2 + -0.000128014273147417 * _refrTemperature ^ 3 + 0.0180269942116904 * _refrTemperature * _refrPressure

            Case Else
        End Select

        Return thisLiquidDensity
    End Function

    'SubCooled liquid viscosity [Pa*s]  - SubCooled LIQUID
    Public Function CalculationOfLiquidViscosity(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim thisLiquidViscosity As Double = 0

        ' Trasformazione della pressione del vapore da Pascal in Bar 
        _refrPressure = _refrPressure / 100000

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale

            'Viscosity of the SubCooled  LIQUID  [microPa*s] - R-32
            'SubCooled  LIQUID  -  SubCooled LIQUID VISCOSITY -R-32 -  OK - ricontrollata
            Case "R-32"
                thisLiquidViscosity = +148.002842677661 * 1 + -1.65028149964262 * _refrTemperature + 0.00689081039725717 * _refrTemperature ^ 2 + -0.0000855540844509311 * _refrTemperature ^ 3 + 0.272887304626742 * _refrPressure + -0.00533367557771169 * _refrTemperature * _refrPressure + 0.000242188298228748 * _refrTemperature ^ 2 * _refrPressure + -0.00000153385392639185 * _refrTemperature ^ 3 * _refrPressure + -0.00202183214858331 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'VISCOSITA' DEL LIQUIDO SOTTORAFREDDATO - R134A -Sottorafreddamento - Ok - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
                ' OK. Ricontrollata nuovamente da Cristiano Gnesutta il 31 Marzo 2016
            Case "R-134a"
                thisLiquidViscosity = +265.155726186437 * 1 + -3.40233677312882 * _refrTemperature + 0.0222008163209214 * _refrTemperature ^ 2 + -0.000110111235020645 * _refrTemperature ^ 3 + 0.387238929803651 * _refrPressure


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
                'Viscosity of the SubCooled  LIQUID  [microPa*s] - R-245fa
                'SubCooled  LIQUID  -  SubCooled LIQUID VISCOSITY - R-245fa - OK - Ricontrollato.

            Case "R-245fa"
                thisLiquidViscosity = +571.608602928586 * 1 + -8.47389324892645 * _refrTemperature + 0.072488503532889 * _refrTemperature ^ 2 + -0.000332793512963486 * _refrTemperature ^ 3 + 0.5109657631521 * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'VISCOSITA' DEL LIQUIDO SOTTORAFREDDATO - R404A -Sottorafreddamento - Ok  - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
                ' OK. Ricontrollata nuovamente da Cristiano Gnesutta il 01 Aprile 2016
            Case "R-404A"
                thisLiquidViscosity = +177.746766801178 * 1 + -2.4556711165892 * _refrTemperature + 0.0152253002537056 * _refrTemperature ^ 2 + -0.000174822866844354 * _refrTemperature ^ 3 + 0.330912567582081 * _refrPressure + 0.000132141774850596 * _refrTemperature ^ 2 * _refrPressure


                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - SubCooling 
                'VISCOSITA' DEL LIQUIDO SOTTORAFREDDATO - R407C -Sottorafreddamento -  OK - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
                ' OK. Ricontrollata nuovamente da Cristiano Gnesutta il 31 Marzo 2016
            Case "R-407C"
                thisLiquidViscosity = +86.9352956154028 * 1 + 27.276891488552 * _refrTemperature + 1.22270634771329 * _refrTemperature ^ 2 + -0.016590458882669 * _refrTemperature ^ 3 + -10.0961508745117 * _refrTemperature * _refrPressure + -0.0779835787759966 * _refrTemperature ^ 2 * _refrPressure + 0.00703421237154186 * _refrTemperature ^ 3 * _refrPressure + 6.21330967995548 * _refrPressure ^ 2 + 0.785836866368159 * _refrTemperature * _refrPressure ^ 2 + -0.0180338105559092 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.0000772531999037265 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.544416879992848 * _refrPressure ^ 3 + 0.0056628101680414 * _refrTemperature * _refrPressure ^ 3 + 0.000131749506639746 * _refrTemperature ^ 2 * _refrPressure ^ 3 + 0.000000685202677513485 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.000550808099677704 * _refrTemperature ^ 4

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 23 Febbraio 2018 su richiesta Direzione aziendale
                'Viscosity of the SubCooled  LIQUID  [microPa*s] - - R-407F
                'SubCooled  LIQUID  -  SubCooled LIQUID VISCOSITY -R-407F - OK - Ricontrollato.

            Case "R-407F"
                thisLiquidViscosity = +194.878535674829 * 1 + -2.45725770943752 * _refrTemperature + 0.0132226772152867 * _refrTemperature ^ 2 + -0.000119536681273153 * _refrTemperature ^ 3 + 0.401692357793266 * _refrPressure + -0.00504435768895894 * _refrTemperature * _refrPressure + 0.00023284828092127 * _refrTemperature ^ 2 * _refrPressure + -0.00000114401381794477 * _refrTemperature ^ 3 * _refrPressure + -0.00280292440573843 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - SubCooling 
                'VISCOSITA' DEL LIQUIDO SOTTORAFREDDATO - R410A -Sottorafreddamento - OK   - Ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
                ' OK. Ricontrollata nuovamente da Cristiano Gnesutta il 31 Marzo 2016
            Case "R-410A"
                thisLiquidViscosity = +160.109068334507 * 1 + -2.08414118266916 * _refrTemperature + 0.0126018040281907 * _refrTemperature ^ 2 + -0.000156775410550074 * _refrTemperature ^ 3 + 0.218096939081619 * _refrPressure + 0.0000954013934859263 * _refrTemperature ^ 2 * _refrPressure


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                ' Aggiunta da cristiano Gnesutta il 23 Aprile 2018 - SubCooling 
                'VISCOSITA' DEL LIQUIDO SOTTORAFREDDATO - R449A -Sottorafreddamento - OK  - Ricontrollata da Cristiano Gnesutta il 23 Aprile 2018.
            Case "R-449a"
                thisLiquidViscosity = +225.262120497111 * 1 + -2.82739818323789 * _refrTemperature + 0.0189816651407386 * _refrTemperature ^ 2 + -0.000116287046265796 * _refrTemperature ^ 3 + 0.321069785342434 * _refrPressure + 0.00000211498492963536 * _refrTemperature * _refrPressure + -0.00000149323533547852 * _refrTemperature ^ 2 * _refrPressure + 0.000000661795977099661 * _refrTemperature ^ 3 * _refrPressure + -0.000992531652041218 * _refrPressure ^ 2
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'OK
            Case "R-513a"
                thisLiquidViscosity = +230.73430126483 * 1 + -2.91585969950297 * _refrTemperature + 0.0187818738271769 * _refrTemperature ^ 2 + -0.0000958160762798733 * _refrTemperature ^ 3 + 0.399034409188708 * _refrPressure


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 05 Settembre 2016 su richiesta della Direzione Aziendale
                'Viscosity of the SubCooled  LIQUID  [microPa*s] - - R-600
                'SubCooled  LIQUID  -  SubCooled LIQUID VISCOSITY - R-600 -OK - Ricontrollato.

            Case "R-600"
                thisLiquidViscosity = +202.169531400504 * 1 + -2.05128325801374 * _refrTemperature + 0.0124080050026262 * _refrTemperature ^ 2 + -0.0000505651651801576 * _refrTemperature ^ 3 + 0.220446244204513 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
                'Viscosity of the SubCooled  LIQUID  [microPa*s] - - R-600a
                'SubCooled  LIQUID  -  SubCooled LIQUID VISCOSITY - R-600a-OK - Ricontrollato.
            Case "R-600a"
                thisLiquidViscosity = +198.219119819509 * 1 + -2.28220461979419 * _refrTemperature + 0.0165326618859922 * _refrTemperature ^ 2 + -0.000083652047961237 * _refrTemperature ^ 3 + 0.234792709338919 * _refrPressure + 0.00496963785951809 * _refrTemperature * _refrPressure + -0.000212921260826116 * _refrTemperature ^ 2 * _refrPressure + 0.00000258219560951589 * _refrTemperature ^ 3 * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 01 Settembre 2016 su richiesta Direzione aziendale
                'Viscosity of the SubCooled  LIQUID  [microPa*s] - - "R-1234yf"
                'SubCooled  LIQUID  -  SubCooled LIQUID VISCOSITY - R-1234yf - OK - Ricontrollato.

            Case "R-1234yf"
                thisLiquidViscosity = +206.863783393661 * 1 + -2.5746276340057 * _refrTemperature + 0.0164192060896543 * _refrTemperature ^ 2 + -0.000086282909036622 * _refrTemperature ^ 3 + 0.408002705642527 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling) 
                'VISCOSITA' DEL LIQUIDO SOTTORAFREDDATO - R1234ze - Sottoraffreddamento -  OK - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
                ' OK. Ricontrollata nuovamente da Cristiano Gnesutta il 31 Marzo 2016 -OK
            Case "R-1234ze"

                thisLiquidViscosity = +267.881701741784 * 1 + -3.29555048244817 * _refrTemperature + 0.0215841719713454 * _refrTemperature ^ 2 + -0.000103325596524243 * _refrTemperature ^ 3 + 0.396575117725849 * _refrPressure

            Case Else
        End Select

        thisLiquidViscosity = thisLiquidViscosity / 1000000

        Return thisLiquidViscosity
    End Function

    'SubCooled liquid thermal conductivity [W/(m*°K)]  - SubCooled LIQUID
    Public Function CalculationOfLiquidThermalConductivity(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim thisLiquidThermalConductivity As Double = 0

        _refrPressure = _refrPressure / 100000

        Select Case RefType


            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
            'Thermal Conductivity of the SubCooled LIQUID [(mW)/(m*°K)] - R-32
            'SubCooled LIQUID  - SubCooled LIQUID  Thermal Conductivity - R-32 - OK  -  ricontrollata.

            Case "R-32"
                thisLiquidThermalConductivity = +144.469809061122 * 1 + -0.838922909799023 * _refrTemperature + 0.00139809038015973 * _refrTemperature ^ 2 + -0.0000420476056881463 * _refrTemperature ^ 3 + 0.107307611651835 * _refrPressure + 0.0000368425388546194 * _refrTemperature ^ 2 * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'CONDUCIBILITA' TERMICA DEL LIQUIDO SOTTORAFREDDATO - R134A - Sottorafreddamento-    OK -  ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-134a"

                thisLiquidThermalConductivity = +91.5572913875239 * 1 + -0.440780742450994 * _refrTemperature + -0.000157648064761651 * _refrTemperature ^ 2 + 0.100689658963429 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale
                'Thermal Conductivity of the SubCooled LIQUID [(mW)/(m*°K)] - R-245fa
                'SubCooled LIQUID  - SubCooled LIQUID  Thermal Conductivity - R-245fa- OK -  ricontrollato.

            Case "R-245fa"
                thisLiquidThermalConductivity = +95.8422430106089 * 1 + -0.309220986215664 * _refrTemperature + -0.000183708314527159 * _refrTemperature ^ 2 + -0.000000266469397532196 * _refrTemperature ^ 3 + 0.0712673018321155 * _refrPressure + 0.000169321801347433 * _refrTemperature * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling) 
                'CONDUCIBILITA' TERMICA DEL LIQUIDO SOTTORAFREDDATO - R404A - Sottorafreddamento - OK  -  ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
            Case "R-404A"
                thisLiquidThermalConductivity = +72.4248385127339 * 1 + -0.403699790987747 * _refrTemperature + 0.0000623515204412478 * _refrTemperature ^ 2 + -0.0000255749988250871 * _refrTemperature ^ 3 + 0.112033369825674 * _refrPressure + -0.000157488977831188 * _refrTemperature * _refrPressure + 0.0000673898664399174 * _refrTemperature ^ 2 * _refrPressure + -0.000000208937345081269 * _refrTemperature ^ 3 * _refrPressure + -0.00121351995327448 * _refrPressure ^ 2


                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling) 
                'CONDUCIBILITA' TERMICA DEL LIQUIDO SOTTORAFREDDATO - R407C - Sottorafreddamento - OK -  ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
            Case "R-407C"

                thisLiquidThermalConductivity = +84.5493150191811 * 1 + -1.97352041232147 * _refrTemperature + -0.0332510606762595 * _refrTemperature ^ 2 + 0.000271701460202323 * _refrTemperature ^ 3 + 5.15510102942239 * _refrPressure + 0.358135351319204 * _refrTemperature * _refrPressure + -0.0000599244366436975 * _refrTemperature ^ 3 * _refrPressure + -0.72023197954132 * _refrPressure ^ 2 + -0.0156671053664416 * _refrTemperature * _refrPressure ^ 2 + 0.000374099992524459 * _refrTemperature ^ 2 * _refrPressure ^ 2 + -0.000000204200530710311 * _refrTemperature ^ 3 * _refrPressure ^ 2 + 0.0318152987311548 * _refrPressure ^ 3 + -0.000485393049204877 * _refrTemperature * _refrPressure ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 23 Aprile 2018 su richiesta Direzione aziendale
                'Thermal Conductivity of the SubCooled LIQUID [(mW)/(m*°K)] - R-407F
                'SubCooled LIQUID  - SubCooled LIQUID  Thermal Conductivity - R-407F-OK - Ricontrollato.

            Case "R-407F"

                thisLiquidThermalConductivity = +97.2612940347793 * 1 + -0.531389466055827 * _refrTemperature + -0.0000697226056210684 * _refrTemperature ^ 2 + 0.125875995299236 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling) 
                'CONDUCIBILITA' TERMICA DEL LIQUIDO SOTTORAFREDDATO - R410A - Sottorafreddamento - OK -  Ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
            Case "R-410A"

                thisLiquidThermalConductivity = +102.277222150806 * 1 + -0.597552279584701 * _refrTemperature + -0.000801621648378506 * _refrTemperature ^ 2 + 0.087712240003053693 * _refrPressure + 0.00171982158773498 * _refrTemperature * _refrPressure


                ' Aggiunta da Cristiano Gnesutta il 23 Aprile 2018 - Liquido Sottoraffeddato (SubCooling) 
                'CONDUCIBILITA' TERMICA DEL LIQUIDO SOTTORAFREDDATO - R449A - Ricontrollata da Cristiano Gnesutta il 23 Aprile 2018.
            Case "R-449a"
                thisLiquidThermalConductivity = +99.3685606117491 * 1 + -0.484602415820762 * _refrTemperature + 0.0000734067970809826 * _refrTemperature ^ 2 + -0.00000392652472975944 * _refrTemperature ^ 3 + 0.0892545886360985 * _refrPressure + -0.000225580356295496 * _refrTemperature * _refrPressure + 0.0000354618001111029 * _refrTemperature ^ 2 * _refrPressure + -0.00000023066471007091 * _refrTemperature ^ 3 * _refrPressure + -0.000411561521556497 * _refrPressure ^ 2


                'OK
            Case "R-513a"
                thisLiquidThermalConductivity = +79.8041926744019 * 1 + -0.391086078791451 * _refrTemperature + 0.000387793043055272 * _refrTemperature ^ 2 + -0.00000667045775044005 * _refrTemperature ^ 3 + 0.0504528889480493 * _refrPressure + 0.00130160957292741 * _refrTemperature * _refrPressure


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 05 Settembre 2016 su richiesta Direzione aziendale
                'Thermal Conductivity of the SubCooled LIQUID [(mW)/(m*°K)] - R-600
                'SubCooled LIQUID  - SubCooled LIQUID  Thermal Conductivity -R-600- OK -Ricontrollato.
            Case "R-600"
                thisLiquidThermalConductivity = +115.227256675868 * 1 + -0.445728451069948 * _refrTemperature + 0.000633098663950671 * _refrTemperature ^ 2 + 0.0824132197353933 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
                'Thermal Conductivity of the SubCooled LIQUID [(mW)/(m*°K)] - R-600a
                'SubCooled LIQUID  - SubCooled LIQUID  Thermal Conductivity -R-600a-  OK -Ricontrollato.

            Case "R-600a"
                thisLiquidThermalConductivity = +98.4952448665511 * 1 + -0.396631215662643 * _refrTemperature + 0.000615522432322116 * _refrTemperature ^ 2 + 0.0831527761822848 * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 01 Settembre 2016 su richiesta Direzione aziendale
                'Thermal Conductivity of the SubCooled LIQUID [(mW)/(m*°K)] - R-1234yf
                'SubCooled LIQUID  - SubCooled LIQUID  Thermal Conductivity - R-1234yf- OK - Ricontrollato.

            Case "R-1234yf"
                thisLiquidThermalConductivity = +71.0359359977203 * 1 + -0.33343870415066 * _refrTemperature + 0.000187145463938436 * _refrTemperature ^ 2 + 0.101720719897892 * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling)  -OK
                'Conducibilità Termica  DEL LIQUIDO SOTTORAFREDDATO - R1234ze - Sottoraffreddamento - OK - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
            Case "R-1234ze"

                thisLiquidThermalConductivity = +82.8095855890275 * 1 + -0.370015712271519 * _refrTemperature + 0.000319460246085854 * _refrTemperature ^ 2 + 0.0866436618353887 * _refrPressure

            Case Else
        End Select

        thisLiquidThermalConductivity = thisLiquidThermalConductivity / 1000

        Return thisLiquidThermalConductivity
    End Function

    'SubCooled liquid specific heat [J/(kg*°K) - SubCooled LIQUID
    Public Function CalculationOfLiquidSpecificHeat(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim thisLiquidSpecificHeat As Double = 0

        ' Trasformazione della pressione del vapore da Pascal in Bar 
        _refrPressure = _refrPressure / 100000

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
            ' Isobaric Specific Heat (Cp) of the SubCooled LIQUID [kJ/(kg*°k)]   - R-32
            ' SubCooled LIQUID  -  SubCooled LIQUID Specific Heat - SubCooled LIQUID  - R-32  - Ok- Ricontrollato.

            Case "R-32"
                thisLiquidSpecificHeat = +1.02235433654302 * 1 + 0.0399923321867952 * _refrTemperature + -0.000127380027381038 * _refrTemperature ^ 2 + 0.00000310879968118234 * _refrTemperature ^ 3 + 0.101210989035452 * _refrPressure + -0.00577911017835042 * _refrTemperature * _refrPressure + 0.0000649096806621289 * _refrTemperature ^ 2 * _refrPressure + -0.00362539103308459 * _refrPressure ^ 2 + 0.000248023392457323 * _refrTemperature * _refrPressure ^ 2 + -0.0000048680647860917 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.0000000283367006965362 * _refrTemperature ^ 3 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL LIQUIDO SOTTORAFREDDATO - R134A - Sottorafreddamento -  OK  ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
            Case "R-134a"
                thisLiquidSpecificHeat = +1.36113214038915 * 1 + 0.000893424403557025 * _refrTemperature + 0.0000772685591437256 * _refrTemperature ^ 2 + -0.00363089274236392 * _refrPressure + 0.000317281154483227 * _refrTemperature * _refrPressure + -0.0000112757503005954 * _refrTemperature ^ 2 * _refrPressure + 0.000000106743534690342 * _refrTemperature ^ 3 * _refrPressure


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale
                ' Isobaric Specific Heat (Cp) of the SubCooled LIQUID [kJ/(kg*°k)]   - R-245fa
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Heat - SubCooled LIQUID  - R-245fa  -OK -  ricontrollato.

            Case "R-245fa"
                thisLiquidSpecificHeat = +1.27347110801011 * 1 + 0.00178043854142911 * _refrTemperature + 0.00000566064998657584 * _refrTemperature ^ 2 + 0.0000000720406033237956 * _refrTemperature ^ 3 + -0.0000630462576147739 * _refrPressure + -0.0000113952746202545 * _refrTemperature * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling) 

                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL LIQUIDO SOTTORAFREDDATO - R404A - Sottorafreddamento - OK -  ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
            Case "R-404A"
                thisLiquidSpecificHeat = +3.31779472329567 * 1 + 0.0080314930354844 * _refrTemperature + -0.00197447051098506 * _refrTemperature ^ 2 + 0.0000610390563708631 * _refrTemperature ^ 3 + -0.550792856742528 * _refrPressure + 0.00789094085564944 * _refrTemperature * _refrPressure + 0.000228185108677023 * _refrTemperature ^ 2 * _refrPressure + -0.00000733425459230357 * _refrTemperature ^ 3 * _refrPressure + 0.0524153556835225 * _refrPressure ^ 2 + -0.00146930836235951 * _refrTemperature * _refrPressure ^ 2 + 0.000000323788141840874 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.00168561255063743 * _refrPressure ^ 3 + 0.0000710099920385136 * _refrTemperature * _refrPressure ^ 3 + -0.0000008500086280833 * _refrTemperature ^ 2 * _refrPressure ^ 3


                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling) 
                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL LIQUIDO SOTTORAFREDDATO - R407C - Sottorafreddamento - OK -  ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
            Case "R-407C"
                thisLiquidSpecificHeat = +11.7377749379235 * 1 + -0.333413736086442 * _refrTemperature + -0.0221552562729308 * _refrTemperature ^ 2 + -0.000251504838768811 * _refrTemperature ^ 3 + -3.16263550197799 * _refrPressure + 0.175261828322148 * _refrTemperature * _refrPressure + 0.00566676968769447 * _refrTemperature ^ 2 * _refrPressure + 0.00000269070454190714 * _refrTemperature ^ 3 * _refrPressure + 0.296554529642541 * _refrPressure ^ 2 + -0.0283493734259707 * _refrTemperature * _refrPressure ^ 2 + -0.000250440407271558 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.00000510851693529373 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.00441976762028348 * _refrPressure ^ 3 + 0.00147626374522381 * _refrTemperature * _refrPressure ^ 3 + -0.0000161905316759483 * _refrTemperature ^ 2 * _refrPressure ^ 3 + 0.0000000613263049652384 * _refrTemperature ^ 3 * _refrPressure ^ 3 + -0.00000234228995301285 * _refrTemperature ^ 4 + -0.000000223118643512264 * _refrTemperature ^ 4 * _refrPressure + -0.000000019737717955422 * _refrTemperature ^ 4 * _refrPressure ^ 2 + -0.000412823401167367 * _refrPressure ^ 4


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 23 Aprile 2018 su richiesta Direzione aziendale
                ' Isobaric Specific Heat (Cp) of the SubCooled LIQUID [kJ/(kg*°k)]   - R-407F
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Heat - SubCooled LIQUID  -R-407F  - Ok- Ricontrollato.

            Case "R-407F"

                thisLiquidSpecificHeat = +1.1462056976937 * 1 + 0.018462967829988 * _refrTemperature + -0.0000384919999200971 * _refrTemperature ^ 2 + 0.00000160244770980493 * _refrTemperature ^ 3 + 0.0529244263906495 * _refrPressure + -0.00307775042644705 * _refrTemperature * _refrPressure + 0.0000344426919133193 * _refrTemperature ^ 2 * _refrPressure + -0.00243207967223463 * _refrPressure ^ 2 + 0.000167806097925296 * _refrTemperature * _refrPressure ^ 2 + -0.00000330999210897569 * _refrTemperature ^ 2 * _refrPressure ^ 2 + 0.0000000193219274132478 * _refrTemperature ^ 3 * _refrPressure ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling) 
                'CALORE SPECIFICO A PRESSIONE COSTANTE (CP) DEL LIQUIDO SOTTORAFREDDATO - R410A - Sottorafreddamento -OK -  Ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
            Case "R-410A"
                thisLiquidSpecificHeat = +5.55792867009873 * 1 + 0.00867493010254042 * _refrTemperature + -0.00389286218330178 * _refrTemperature ^ 2 + 0.000105889783249658 * _refrTemperature ^ 3 + -0.859386831671798 * _refrPressure + 0.0125582380487006 * _refrTemperature * _refrPressure + 0.000363136843823968 * _refrTemperature ^ 2 * _refrPressure + -0.0000103891266349031 * _refrTemperature ^ 3 * _refrPressure + 0.0608806958094472 * _refrPressure ^ 2 + -0.00171942276919995 * _refrTemperature * _refrPressure ^ 2 + 0.000000346845820602844 * _refrTemperature ^ 3 * _refrPressure ^ 2 + -0.00144587062213859 * _refrPressure ^ 3 + 0.0000603252913778162 * _refrTemperature * _refrPressure ^ 3 + -0.000000702046895245937 * _refrTemperature ^ 2 * _refrPressure ^ 3


                'Aggiunta da Cristiano Gnesutta il 23 Aprile 2018 - Liquido Sottoraffeddato (SubCooling) 
                'CALORE SPECIFICO DEL LIQUIDO SOTTORAFREDDATO - R-449A -OK - Ricontrollata da Cristiano Gnesutta il 23 Aprile 2018.  
            Case "R-449a"
                thisLiquidSpecificHeat = +1.42915336159084 * 1 + 0.00054747369969374 * _refrTemperature + 0.00010329168309269 * _refrTemperature ^ 2 + -0.00381513591025359 * _refrPressure + 0.00032730919812528 * _refrTemperature * _refrPressure + -0.0000115155557186748 * _refrTemperature ^ 2 * _refrPressure + 0.000000103962885976084 * _refrTemperature ^ 3 * _refrPressure



                'OK
            Case "R-513a"
                thisLiquidSpecificHeat = +1.336715879029 * 1 + 0.000962495837165664 * _refrTemperature + 0.0000844653600274143 * _refrTemperature ^ 2 + -0.00467650566072733 * _refrPressure + 0.000419516594135177 * _refrTemperature * _refrPressure + -0.0000144987020579174 * _refrTemperature ^ 2 * _refrPressure + 0.000000133892386583004 * _refrTemperature ^ 3 * _refrPressure



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'Aggiunto da C. Gnesutta il 05 Settembre 2016 su richiesta Direzione aziendale
                ' Isobaric Specific Heat (Cp) of the SubCooled LIQUID [kJ/(kg*°k)]   - "R-600"
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Heat - SubCooled LIQUID  -"R-600" -  Ok- Ricontrollato.

            Case "R-600"
                thisLiquidSpecificHeat = +2.31100467228743 * 1 + 0.00481049121161792 * _refrTemperature + 0.0000139927309782146 * _refrTemperature ^ 2 + 0.000000159962494788863 * _refrTemperature ^ 3 + -0.0000318231300507682 * _refrTemperature * _refrPressure


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
                ' Isobaric Specific Heat (Cp) of the SubCooled LIQUID [kJ/(kg*°k)]   - R-600a
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Heat - SubCooled LIQUID  -R-600a -   Ok- Ricontrollato.
            Case "R-600a"
                thisLiquidSpecificHeat = +2.28714045658905 * 1 + 0.00516388783775271 * _refrTemperature + 0.0000244971088384071 * _refrTemperature ^ 2 + 0.000000215770282350668 * _refrTemperature ^ 3 + -0.00205269274179476 * _refrPressure + 0.000103691211845454 * _refrTemperature * _refrPressure + -0.00000427070077099463 * _refrTemperature ^ 2 * _refrPressure + 0.0000000358721105818953 * _refrTemperature ^ 3 * _refrPressure + 0.0000476634780577564 * _refrPressure ^ 2
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 01 Settembre 2016 su richiesta Direzione aziendale
                ' Isobaric Specific Heat (Cp) of the SubCooled LIQUID [kJ/(kg*°k)]   - R-1234yf     
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Heat - SubCooled LIQUID  -  R-1234yf   - Ok- Ricontrollato.

            Case "R-1234yf"
                thisLiquidSpecificHeat = +1.31928555802852 * 1 + 0.00129878052625322 * _refrTemperature + 0.0000648509343634631 * _refrTemperature ^ 2 + 0.000000426791558712472 * _refrTemperature ^ 3 + -0.00574510563355049 * _refrPressure + 0.000514526313898808 * _refrTemperature * _refrPressure + -0.0000167371936679751 * _refrTemperature ^ 2 * _refrPressure + 0.000000142380262329189 * _refrTemperature ^ 3 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling) 
                'CALORE SPECIFICO DEL LIQUIDO SOTTORAFREDDATO - R1234ze - Sottoraffreddamento - OK - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 -OK
            Case "R-1234ze"

                thisLiquidSpecificHeat = +1.31610648104789 * 1 + 0.00264235565897267 * _refrTemperature + 0.00000189665117302819 * _refrTemperature ^ 2 + 0.000000493157231392359 * _refrTemperature ^ 3 + -0.0000426223619658829 * _refrTemperature * _refrPressure
            Case Else
        End Select

        ' Trasformazione da [kJ/(kg*°k)] ------> [J/(kg*°k)]
        thisLiquidSpecificHeat = thisLiquidSpecificHeat * 1000

        Return thisLiquidSpecificHeat
    End Function

    'SubCooled liquid specific enthalpy [J/(kg)  - SubCooled LIQUID
    Public Function CalculationOfLiquidSpecificEnthalpy(ByVal RefType As String, ByVal _refrPressure As Double, ByVal _refrTemperature As Double) As Double
        Dim thisLiquidSpecificEnthalpy As Double = 0

        ' Trasformazione della pressione del vapore da Pascal in Bar 
        _refrPressure = _refrPressure / 100000

        Select Case RefType


            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
            ' Specific Isobaric Specific Enthalpy (Cp) of the SubCooled LIQUID [kJ/(kg*°k)] - R-32
            ' SubCooled LIQUID  -  SubCooled LIQUID Specific Enthalpy - R-32 - OK- Ricontrollata.

            Case "R-32"
                thisLiquidSpecificEnthalpy = +202.346387714263 * 1 + 1.59693812022543 * _refrTemperature + 0.00676293505354553 * _refrTemperature ^ 2 + 0.0000647468103651893 * _refrTemperature ^ 3 + -0.212068607812725 * _refrPressure + 0.0123649027444759 * _refrTemperature * _refrPressure + -0.000518737603452411 * _refrTemperature ^ 2 * _refrPressure + 0.00000384234542976739 * _refrTemperature ^ 3 * _refrPressure + 0.00322975764420276 * _refrPressure ^ 2
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'ENTALPIA SPECIFICA A PRESSIONE COSTANTE (CP) DEL LIQUIDO SOTTORAFREDDATO - R134A - Sottorafreddamento -  OK  - ricontrollata da Cristiano Gnesutta il 05 febbraio 2016 
                ' OK- Ricontrollato nuovamente da Cristiano Gnesutta il 31 Marzo 2016
            Case "R-134a"

                thisLiquidSpecificEnthalpy = +200.25795462080399 * 1 + 1.31421598254705 * _refrTemperature + 0.00223274104927051 * _refrTemperature ^ 2


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 07 Settembre 2016 su richiesta Direzione aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the SubCooled LIQUID [kJ/(kg*°k)] - R-245fa
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Enthalpy - R-245fa - OK - Ricontrollato.

            Case "R-245fa"
                thisLiquidSpecificEnthalpy = +199.988243084482 * 1 + 1.2751678659854 * _refrTemperature + 0.000804416541497988 * _refrTemperature ^ 2 + 0.00000358736417391693 * _refrTemperature ^ 3 + 0.0231334777577601 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' Aggiunta da Cristiano Gnesutta il 27 Gennaio 2016 
                'ENTALPIA SPECIFICA A PRESSIONE COSTANTE (CP) DEL LIQUIDO SOTTORAFREDDATO - R404A - Sottorafreddamento - OK  - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
                ' OK- Ricontrollato nuovamente da Cristiano Gnesutta il 31 Marzo 2016
            Case "R-404A"
                thisLiquidSpecificEnthalpy = +199.613018023218 * 1 + 1.482001795198 * _refrTemperature + -0.000475239058710719 * _refrTemperature ^ 2 + 0.0000695276172609158 * _refrTemperature ^ 3 + -0.00327108335078254 * _refrTemperature * _refrPressure


                ' Aggiunta da Cristiano Gnesutta il 27 Gennaio 2016 
                'ENTALPIA SPECIFICA A PRESSIONE COSTANTE (CP) DEL LIQUIDO SOTTORAFREDDATO - R404A - Sottorafreddamento -  Ok - Ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
                ' OK- Ricontrollato nuovamente da Cristiano Gnesutta il 31 Marzo 2016
            Case "R-407C"
                thisLiquidSpecificEnthalpy = +197.62966925521 * 1 + 1.24861142385782 * _refrTemperature + -0.0021888750867684 * _refrTemperature ^ 2 + -0.0000717307185363436 * _refrTemperature ^ 3 + 0.709377717527509 * _refrPressure + 0.0237351603724663 * _refrTemperature * _refrPressure + 0.000265376544736136 * _refrTemperature ^ 2 * _refrPressure + -0.0000000850149821976487 * _refrTemperature ^ 3 * _refrPressure + -0.0516291348055405 * _refrPressure ^ 2


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 23 Aprile 2018 su richiesta Direzione Aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the SubCooled LIQUID [kJ/(kg*°k)] - R-407F
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Enthalpy - R-407F -OK- Ricontrollata.

            Case "R-407F"
                thisLiquidSpecificEnthalpy = +199.900695490914 * 1 + 1.48813499010894 * _refrTemperature + 0.000696236703109587 * _refrTemperature ^ 2 + 0.0000426035195426732 * _refrTemperature ^ 3 + -0.00188065191112832 * _refrTemperature * _refrPressure


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 27 Gennaio 2016 
                'ENTALPIA SPECIFICA A PRESSIONE COSTANTE (CP) DEL LIQUIDO SOTTORAFREDDATO - R410A - Sottorafreddamento -  OK - Ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
                ' OK- Ricontrollato nuovamente da Cristiano Gnesutta il 31 Marzo 2016
            Case "R-410A"
                thisLiquidSpecificEnthalpy = +199.653264441265 * 1 + 1.62841728929655 * _refrTemperature + -0.000344377362752057 * _refrTemperature ^ 2 + 0.0000881679314037988 * _refrTemperature ^ 3 + -0.0036082584832833 * _refrTemperature * _refrPressure


                ' Aggiunta da Cristiano Gnesutta il 27 Gennaio 2016 
                'ENTALPIA SPECIFICA A PRESSIONE COSTANTE (CP) DEL LIQUIDO SOTTORAFREDDATO - Ricontrollato nuovamente da Cristiano Gnesutta il 23 Aprile 2016
            Case "R-449a"

                thisLiquidSpecificEnthalpy = +200.346119512883 * 1 + 1.36666016800473 * _refrTemperature + 0.00255161161441472 * _refrTemperature ^ 2



                'OK
            Case "R-513a"
                thisLiquidSpecificEnthalpy = +200.238903262296 * 1 + 1.28708427601823 * _refrTemperature + 0.00236864143920398 * _refrTemperature ^ 2

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 05 Settembre 2016 su richiesta Direzione aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the SubCooled LIQUID [kJ/(kg*°k)] - R-600
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Enthalpy - R-600 - OK - Ricontrollato.

            Case "R-600"

                thisLiquidSpecificEnthalpy = +199.961404482134 * 1 + 2.31403795241577 * _refrTemperature + 0.00225466028575583 * _refrTemperature ^ 2 + 0.00000745021492833294 * _refrTemperature ^ 3 + 0.0546219978336069 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 06 Settembre 2016 su richiesta Direzione aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the SubCooled LIQUID [kJ/(kg*°k)] - R-600a
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Enthalpy - R-600a -  OK - Ricontrollato.

            Case "R-600a"
                thisLiquidSpecificEnthalpy = +199.960373722162 * 1 + 2.28846724699605 * _refrTemperature + 0.00245541718976994 * _refrTemperature ^ 2 + 0.0000100121615316763 * _refrTemperature ^ 3 + 0.0384007941885542 * _refrPressure

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 01 Settembre 2016 su richiesta Direzione aziendale
                ' Specific Isobaric Specific Enthalpy (Cp) of the SubCooled LIQUID [kJ/(kg*°k)]   - R-1234yf     
                ' SubCooled LIQUID  -  SubCooled LIQUID Specific Enthalpy - R-1234yf  - OK- Ricontrollata.
            Case "R-1234yf"

                thisLiquidSpecificEnthalpy = +199.694096439921 * 1 + 1.30872737512115 * _refrTemperature + 0.00131105570457146 * _refrTemperature ^ 2 + 0.0000176872938507378 * _refrTemperature ^ 3 + 0.0550344495691029 * _refrPressure + -0.00226638211363916 * _refrTemperature * _refrPressure
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' Aggiunta da Cristiano Gnesutta il 27 Gennaio 2016 - Liquido Sottoraffeddato (SubCooling) 
                'ENTALPIA  DEL LIQUIDO SOTTORAFREDDATO - R1234ze - Sottoraffreddamento - OK - ricontrollata da Cristiano Gnesutta il 12 febbraio 2016 
                ' OK- Ricontrollato nuovamente da Cristiano Gnesutta il 31 Marzo 2016

                'OK
            Case "R-1234ze"
                thisLiquidSpecificEnthalpy = +200.19319731739 * 1 + 1.29941604718803 * _refrTemperature + 0.00178228021978127 * _refrTemperature ^ 2
            Case Else
        End Select


        ' From [kJ/kg] -------> to [J/kg]
        thisLiquidSpecificEnthalpy = thisLiquidSpecificEnthalpy * 1000
        Return thisLiquidSpecificEnthalpy
    End Function


#End Region

#Region "Refrigerant Critical Point"

    ' Temperatura Critica del Refrigerante in Celsius [°C] 
    ' C. Gnesutta, 20 Gennaio 2016 
    Public Function CriticalTemperature(ByVal RefType As String) As Double
        Dim thisCriticalTemperature As Double = 0

        Select Case RefType

            ' OK OK - Ricontrollato da C. Gnesutta 
            ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            ' OK
            Case "R-32"
                thisCriticalTemperature = 78.105
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


            Case "R-134a"
                thisCriticalTemperature = 101.06

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-245fa"
                thisCriticalTemperature = 154.01
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' OK OK- Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-404A"
                thisCriticalTemperature = 72.12

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-407C"

                thisCriticalTemperature = 86.139


                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-407F"
                thisCriticalTemperature = 82.605


                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-410A"

                thisCriticalTemperature = 71.344


                'OK - Added by C. Gnesutta on April 19th 2018.
            Case "R-449a"
                thisCriticalTemperature = 102.82


            Case "R-513a"
                thisCriticalTemperature = 97.512

                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-600"
                thisCriticalTemperature = 151.98


                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-600a"
                thisCriticalTemperature = 134.66


                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-1234yf"
                thisCriticalTemperature = 94.7



                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-1234ze"

                thisCriticalTemperature = 109.36
            Case Else
        End Select

        Return thisCriticalTemperature

    End Function


    ' Pressione Critica del Refrigerante in [Bar] 
    Public Function CriticalPressure(ByVal RefType As String) As Double

        Dim thisCriticalPressure As Double = 0

        Select Case RefType

            'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            ' OK
            Case "R-32"
                thisCriticalPressure = 57.82

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-134a"
                thisCriticalPressure = (40.593)

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-245fa"
                thisCriticalPressure = 36.51
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' OK OK- Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-404A"
                thisCriticalPressure = (37.348)

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-407C"
                thisCriticalPressure = (46.394)


                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-407F"
                thisCriticalPressure = 47.493


                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-410A"
                thisCriticalPressure = (49.012)

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Added by C. Gnesutta on April 19th 2018. Ok- Checked - Pressure in [bar].
            Case "R-449a"
                thisCriticalPressure = 47.56
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


            Case "R-513a"
                thisCriticalPressure = 36.684



                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-600"
                thisCriticalPressure = 37.96

                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-600a"
                thisCriticalPressure = 36.29

                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-1234yf"

                thisCriticalPressure = 33.822


                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-1234ze"
                thisCriticalPressure = (36.349)
            Case Else
        End Select

        Return thisCriticalPressure

    End Function


    ' Densità Critica del Refrigerante in [kg/m^3] 
    Public Function CriticalDensity(ByVal RefType As String) As Double

        Dim thisCriticalDensity As Double = 0

        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            ' OK
            Case "R-32"
                thisCriticalDensity = 424.0
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' OK OK- Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-134a"
                thisCriticalDensity = 511.9

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-245fa"
                thisCriticalDensity = 516.08

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-404A"
                thisCriticalDensity = 486.69

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-407C"
                thisCriticalDensity = 483.93

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-407F"
                thisCriticalDensity = 475.64
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-410A"
                thisCriticalDensity = 459.12


                'Added by C. Gnesutta on April 19th 2018. Ok, Checked.
            Case "R-449a"
                thisCriticalDensity = 466.47

            Case "R-513a"
                thisCriticalDensity = 490.18


                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-600"
                thisCriticalDensity = 228

                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-600a"
                thisCriticalDensity = 225.5


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            Case "R-1234yf"
                thisCriticalDensity = 475.55
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-1234ze"
                thisCriticalDensity = 489.24
            Case Else
        End Select

        Return thisCriticalDensity

    End Function


    'Momento di dipolo della molecola di refrigerante allo stato gassoso alle condizioni NBP
    Public Function GasPhaseDipole_NBP(ByVal RefType As String) As Double

        Dim _thisGasPhaseDipole_NBP As Double = 0

        Select Case RefType
            Case "R-32"

                ' Momento di Dipolo in [Debye]
                _thisGasPhaseDipole_NBP = 1.978
            Case "R-134a"

                ' Momento di Dipolo in [Debye]
                _thisGasPhaseDipole_NBP = 2.058

            Case "R-245fa"
                ' Momento di Dipolo in [Debye]
                _thisGasPhaseDipole_NBP = 1.549

            Case "R-404A"
                ' Momento di dipolo NOn definibile - MISCELA DI REFRIGERANTI

            Case "R-407C"
                'Momento di dipolo NOn definibile - MISCELA DI REFRIGERANTI

            Case "R-407F"
                'Momento di dipolo NOn definibile - MISCELA DI REFRIGERANTI

                'Momento di dipolo NON definibile - MISCELA DI REFRIGERANTI -OK
            Case "R-449a"
                _thisGasPhaseDipole_NBP = 0


            Case "R-513a"
                _thisGasPhaseDipole_NBP = 0


            Case "R-600"
                _thisGasPhaseDipole_NBP = 0.05
                ' Momento di Dipolo in [Debye]
            Case "R-600a"
                _thisGasPhaseDipole_NBP = 0.132
                ' Momento di Dipolo in [Debye]
            Case "R-1234yf"
                _thisGasPhaseDipole_NBP = 2.48

                ' Momento di Dipolo in [Debye]
            Case "R-1234ze"
                _thisGasPhaseDipole_NBP = 1.27
            Case Else

        End Select

        Return _thisGasPhaseDipole_NBP
    End Function


    ' Fattore Acentrico del Refrigerante 
    Public Function CriticalAcentricFactor(ByVal RefType As String) As Double

        Dim thisCriticalAcentricFactor As Double = 0


        Select Case RefType

            '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
            'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            ' OK
            Case "R-32"
                thisCriticalAcentricFactor = 0.2769
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-134a"
                thisCriticalAcentricFactor = 0.32684


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-245fa"
                thisCriticalAcentricFactor = 0.3776

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-404A"
                thisCriticalAcentricFactor = 0.293

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-407C"
                thisCriticalAcentricFactor = 0.363


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-407F"
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'thisCriticalAcentricFactor =

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-410A"
                thisCriticalAcentricFactor = 0.296


                'Added by C. Gnesutta on April 19th 2018 
                'Fattore Acentrico non definibile per miscele di gas. -OK
            Case "R-449a"

                thisCriticalAcentricFactor = 0

            Case "R-513a"
                thisCriticalAcentricFactor = 0

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-600"
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                thisCriticalAcentricFactor = 0.201

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                'Aggiunto da C. Gnesutta il 29 agosto 2016 su richiesta Direzione aziendale
            Case "R-600a"
                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
                thisCriticalAcentricFactor = 0.184

            Case "R-1234yf"
                thisCriticalAcentricFactor = 0.276

                ' OK OK - Ricontrollato da C. Gnesutta 
                ' Ok - Ricontrollato nuovamente da C. Gnesutta il 05 febbraio 2016 
            Case "R-1234ze"
                thisCriticalAcentricFactor = 0.313
            Case Else
        End Select

        Return thisCriticalAcentricFactor


    End Function


#End Region

End Class
