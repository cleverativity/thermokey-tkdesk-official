Public Class EcFans_EquationsForFanPropertiesAtWorkingPoint
    'Calculation of the Fan Electrical Power @Working point 
    'C. Gnesutta, March 25th, 2020.
    Public Function ElectricPower(ByVal _FanName As String, ByVal _AirFlow As Double, ByVal _DpAir As Double) As Double

        Dim _ElectricPower As Double = 0


        Select Case True

            '##########################################################################################################################
            'EC FANS - EBM PAPST
            'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G450-AC28-58")

                'Electrical Power [W] - C. Gnesutta, March 25th, 2020. - OK- OK
                'Ok - Checked again by C. Gnesutta on April 23rd, 2020.
                _ElectricPower = +-32.5401438304597 * 1 + 0.0206488848533077 * _AirFlow + -0.0000043736324759242 * _AirFlow ^ 2 + 0.00000000126998052870675 * _AirFlow ^ 3 + 1.49042910358003 * _DpAir + -0.000464845626932681 * _AirFlow * _DpAir + 0.000000172502337635634 * _AirFlow ^ 2 * _DpAir + -0.0000000000123198588197607 * _AirFlow ^ 3 * _DpAir + 0.0054329934798416 * _DpAir ^ 2


                'Electrical Power [W] - C. Gnesutta, March 25th, 2020. - OK - OK
                'Ok - Checked again by C. Gnesutta on April 24th, 2020.
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G500-AN33-03")

                _ElectricPower = +-723.874359137358 * 1 + 0.310609835700469 * _AirFlow + -0.0000408965703517062 * _AirFlow ^ 2 + 0.00000000235871785989749 * _AirFlow ^ 3 + 12.2620979300058 * _DpAir + -0.00383133695634128 * _AirFlow * _DpAir + 0.000000415808437652724 * _AirFlow ^ 2 * _DpAir + -0.0000000000109848536997262 * _AirFlow ^ 3 * _DpAir + -0.0517649209577386 * _DpAir ^ 2 + 0.0000186329708199583 * _AirFlow * _DpAir ^ 2 + -0.00000000165637790522394 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000003150660167149 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00000570191205140427 * _DpAir ^ 3


                'Electrical Power [W] - C. Gnesutta, May 27th, 2020.
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G630-AU23-01")

                _ElectricPower = +128265.654442 * 1 + -46.3355517658251 * _AirFlow + 0.00656631832422017 * _AirFlow ^ 2 + -0.000000456843475384937 * _AirFlow ^ 3 + -3595.64844614089 * _DpAir + 1.2266248914938 * _AirFlow * _DpAir + -0.000167741180038838 * _AirFlow ^ 2 * _DpAir + 0.0000000116024015907968 * _AirFlow ^ 3 * _DpAir + 29.5575811992994 * _DpAir ^ 2 + -0.00833105052545641 * _AirFlow * _DpAir ^ 2 + 0.000000962916653519561 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000620324614703665 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0875940755445788 * _DpAir ^ 3 + 0.00000901085256624786 * _AirFlow * _DpAir ^ 3 + 0.000000000751421796643716 * _AirFlow ^ 2 * _DpAir ^ 3 + -0.0000000000000809551380489161 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.0000000000156544322377287 * _AirFlow ^ 4 + -0.000000000000408059157462357 * _AirFlow ^ 4 * _DpAir + 0.00000000000000237802479025483 * _AirFlow ^ 4 * _DpAir ^ 2 + -1.05405278317686E-18 * _AirFlow ^ 4 * _DpAir ^ 3 + 0.000352028227484388 * _DpAir ^ 4 + -0.0000000668793876794081 * _AirFlow * _DpAir ^ 4 + 0.00000000000664143789513689 * _AirFlow ^ 2 * _DpAir ^ 4 + -0.000000000000000793720111424338 * _AirFlow ^ 3 * _DpAir ^ 4 + 5.93203172748448E-20 * _AirFlow ^ 4 * _DpAir ^ 4 + -0.000000000000000211176634012356 * _AirFlow ^ 5 + 5.82170007837522E-18 * _AirFlow ^ 5 * _DpAir + -4.1122937641909E-20 * _AirFlow ^ 5 * _DpAir ^ 2 + 1.25503401349115E-22 * _AirFlow ^ 5 * _DpAir ^ 3 + -1.43210961573541E-24 * _AirFlow ^ 5 * _DpAir ^ 4 + -0.000000244202036603489 * _DpAir ^ 5 + 0.00000000000000636902477795715 * _AirFlow ^ 2 * _DpAir ^ 5 + -3.95849468819833E-19 * _AirFlow ^ 3 * _DpAir ^ 5


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G630-AC52-58")

                'Electrical Power [W] - C. Gnesutta, April 24th, 2020. - OK - OK

                _ElectricPower = +-12.7332954928678 * 1 + 0.00529794439641627 * _AirFlow + -0.00000073721456323627 * _AirFlow ^ 2 + 0.000000000272440936614153 * _AirFlow ^ 3 + 1.3464079549975 * _DpAir + 0.0000000354498749922129 * _AirFlow ^ 2 * _DpAir + -0.000000000000355794352675458 * _AirFlow ^ 3 * _DpAir + 0.01795630167091 * _DpAir ^ 2

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AT21-01")

                'Electrical Power [W] - C. Gnesutta, April 24th, 2020. - OK- OK
                _ElectricPower = +-409.98175831362 * 1 + 0.0845323871527774 * _AirFlow + -0.00000528077119077388 * _AirFlow ^ 2 + 0.00000000018997151849283 * _AirFlow ^ 3 + 7.62339064925879 * _DpAir + -0.000612916584472639 * _AirFlow * _DpAir + 0.0000000312222701399617 * _AirFlow ^ 2 * _DpAir + 0.0188937538940979 * _DpAir ^ 2

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AO84-03")

                'Electrical Power [W] - C. Gnesutta, April 24th, 2020. - OK- OK
                _ElectricPower = +-746.96851334343 * 1 + 0.179654728808348 * _AirFlow + -0.0000137620222414089 * _AirFlow ^ 2 + 0.000000000418498810205881 * _AirFlow ^ 3 + 30.9592142383232 * _DpAir + -0.0057955733210596 * _AirFlow * _DpAir + 0.000000375390011546848 * _AirFlow ^ 2 * _DpAir + -0.00000000000702114214209278 * _AirFlow ^ 3 * _DpAir + -0.461475122068367 * _DpAir ^ 2 + 0.000106832892570812 * _AirFlow * _DpAir ^ 2 + -0.00000000794457233635166 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.000000000000200646379540652 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0000868634408296717 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-A081-23")

                'Electrical Power [W] - C. Gnesutta, April 24th, 2020. - OK- OK
                _ElectricPower = +-0.855512953328101 * 1 + 0.00389096085876882 * _AirFlow + -0.0000000615827361560975 * _AirFlow ^ 2 + 0.000000000077748109946324 * _AirFlow ^ 3 + 0.919838630311196 * _DpAir + 0.000734444233626622 * _AirFlow * _DpAir + -0.0000000610879842522976 * _AirFlow ^ 2 * _DpAir + 0.00000000000221732014591838 * _AirFlow ^ 3 * _DpAir + 0.0638357654389445 * _DpAir ^ 2 + -0.0000131186375185176 * _AirFlow * _DpAir ^ 2 + 0.00000000111100315529233 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000281418384568526 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000014328845833407 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AN36-94")

                'Electrical Power [W] - C. Gnesutta, April 27th, 2020. - OK- OK
                _ElectricPower = +3.98028225902713 * 1 + 0.00240831929685521 * _AirFlow + -0.000000136077415247321 * _AirFlow ^ 2 + 0.0000000000859536222178324 * _AirFlow ^ 3 + 0.000948587333654175 * _AirFlow * _DpAir + -0.0000000859184037662105 * _AirFlow ^ 2 * _DpAir + 0.00000000000328495824084986 * _AirFlow ^ 3 * _DpAir + 0.132468625075527 * _DpAir ^ 2 + -0.0000372439929932527 * _AirFlow * _DpAir ^ 2 + 0.00000000378307375129652 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000123145704768999 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000129812883276467 * _DpAir ^ 3



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "A3G910-AV02-01")


                'Electrical Power [W] - C. Gnesutta, April 27th, 2020. - OK- OK- OK
                _ElectricPower = +1097.6181584518 * 1 + -0.197910176352495 * _AirFlow + 0.0000133775369006492 * _AirFlow ^ 2 + -0.000000000344009253327252 * _AirFlow ^ 3 + -38.3464977640799 * _DpAir + 0.00657420247468129 * _AirFlow * _DpAir + -0.000000310810719157913 * _AirFlow ^ 2 * _DpAir + 0.00000000000493471813930934 * _AirFlow ^ 3 * _DpAir + 0.686701685146992 * _DpAir ^ 2 + -0.000106656761508812 * _AirFlow * _DpAir ^ 2 + 0.00000000540979010627154 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000874970676312652 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00199900778953861 * _DpAir ^ 3 + 0.000000345727826947777 * _AirFlow * _DpAir ^ 3 + -0.0000000000185408275881095 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.000000000000000310962875399265 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.00000000000000408075281003107 * _AirFlow ^ 4



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AU22-01")

                'Electrical Power [W] - C. Gnesutta, April 27th, 2020. - OK- OK
                _ElectricPower = +502.224796279956 * 1 + -0.0970664989439461 * _AirFlow + 0.00000726440347569056 * _AirFlow ^ 2 + -0.000000000189722545245299 * _AirFlow ^ 3 + -27.9464867706732 * _DpAir + 0.00506584703983479 * _AirFlow * _DpAir + -0.000000242145306066038 * _AirFlow ^ 2 * _DpAir + 0.00000000000402345577847563 * _AirFlow ^ 3 * _DpAir + 0.990754781844154 * _DpAir ^ 2 + -0.000177732474486486 * _AirFlow * _DpAir ^ 2 + 0.0000000113420917264563 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000302006058479706 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00793434023402846 * _DpAir ^ 3 + 0.00000172020981528421 * _AirFlow * _DpAir ^ 3 + -0.00000000013532722856392 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.00000000000000466555738811077 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.00000000000000273873444788869 * _AirFlow ^ 4 + 2.84935868917011E-18 * _AirFlow ^ 4 * _DpAir ^ 2 + -6.04325150195266E-20 * _AirFlow ^ 4 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AS22-01")

                'Electrical Power [W] - C. Gnesutta, April 27th, 2020. - OK- OK
                _ElectricPower = +159.923879264781 * 1 + -0.0482001291185984 * _AirFlow + 0.00000554061433764194 * _AirFlow ^ 2 + -0.00000000021332294682025 * _AirFlow ^ 3 + -15.1872046102527 * _DpAir + 0.00602586623361967 * _AirFlow * _DpAir + -0.000000637363858583241 * _AirFlow ^ 2 * _DpAir + 0.0000000000293741655507706 * _AirFlow ^ 3 * _DpAir + 0.370300281036376 * _DpAir ^ 2 + -0.000147079383792097 * _AirFlow * _DpAir ^ 2 + 0.000000018117772824476 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000872035629411924 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.00476867243699872 * _DpAir ^ 3 + -0.0000000000938389953496562 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.000000000000006622570448927 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.00000000000000419794470219627 * _AirFlow ^ 4 + -0.000000000000000458841370358194 * _AirFlow ^ 4 * _DpAir + 1.32693642245838E-17 * _AirFlow ^ 4 * _DpAir ^ 2 + -1.0317799371E-19 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.0000636653609224767 * _DpAir ^ 4 + 0.00000000975713764084959 * _AirFlow * _DpAir ^ 4 + -0.000000000000383107969377266 * _AirFlow ^ 2 * _DpAir ^ 4


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AO83-03")

                'Electrical Power [W] - C. Gnesutta, April 27th, 2020. - OK- OK
                _ElectricPower = +-33.2483273044293 * 1 + 0.0106299624744852 * _AirFlow + -0.000000609727883205455 * _AirFlow ^ 2 + 0.0000000000581259728716107 * _AirFlow ^ 3 + 4.50453018617279 * _DpAir + -0.00000000989774003128454 * _AirFlow ^ 2 * _DpAir + 0.000000000000831499005344 * _AirFlow ^ 3 * _DpAir + 0.0442043831847658 * _DpAir ^ 2 + -0.0000184061982052511 * _AirFlow * _DpAir ^ 2 + 0.0000000024793128997709 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000804914744727092 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000770120654233754 * _DpAir ^ 3 + -0.0000000817866208006902 * _AirFlow * _DpAir ^ 3




                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G990-AY28-01")

                'Electrical Power [W] - C. Gnesutta, April 27th, 2020. - OK- OK
                _ElectricPower = +-29.0947927882462 * 1 + 0.00313981948445778 * _AirFlow + -0.000000105219101364944 * _AirFlow ^ 2 + 0.0000000000348343679109307 * _AirFlow ^ 3 + 0.804068852025596 * _DpAir + 0.000401198463974233 * _AirFlow * _DpAir + -0.00000000581453255923124 * _AirFlow ^ 2 * _DpAir + 0.000000000000124493126270249 * _AirFlow ^ 3 * _DpAir + 0.0162291822855648 * _DpAir ^ 2



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G990-AZ02-01")

                'Electrical Power [W] - C. Gnesutta, April 28th, 2020. - OK- OK
                _ElectricPower = +787.430204260346 * 1 + -0.148434170712739 * _AirFlow + 0.0000105248941209921 * _AirFlow ^ 2 + -0.000000000287649980438418 * _AirFlow ^ 3 + -37.6473757737671 * _DpAir + 0.00734667539078105 * _AirFlow * _DpAir + -0.000000438947241585714 * _AirFlow ^ 2 * _DpAir + 0.0000000000115886091483015 * _AirFlow ^ 3 * _DpAir + 0.76364445342692 * _DpAir ^ 2 + -0.000135222136071692 * _AirFlow * _DpAir ^ 2 + 0.00000000851202808523535 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000225362563142643 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00286954543815702 * _DpAir ^ 3 + 0.000000569133822582388 * _AirFlow * _DpAir ^ 3 + -0.000000000038853320873006 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.00000000000000110635445072999 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.00000000000000355787084460536 * _AirFlow ^ 4 + -0.000000000000000110055153972665 * _AirFlow ^ 4 * _DpAir + 2.15396159679757E-18 * _AirFlow ^ 4 * _DpAir ^ 2 + -1.13735912861253E-20 * _AirFlow ^ 4 * _DpAir ^ 3 + 0.000000102326526369774 * _DpAir ^ 4





                '##########################################################################################################################
                'EC FANS - ZIEHL ABBEGG
                '##########################################################################################################################



                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020.  - OK - OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN050-ZIS-DC-V7P2")

                _ElectricPower = +-138.103721850145 * 1 + 0.0980559918549175 * _AirFlow + -0.0000209379527364875 * _AirFlow ^ 2 + 0.00000000273794303331682 * _AirFlow ^ 3 + 7.97916767119288 * _DpAir + -0.0041969519420926 * _AirFlow * _DpAir + 0.000000803269288166905 * _AirFlow ^ 2 * _DpAir + -0.0000000000431037074342375 * _AirFlow ^ 3 * _DpAir + -0.101592117953028 * _DpAir ^ 2 + 0.0000712466803903625 * _AirFlow * _DpAir ^ 2 + -0.0000000135641495755127 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.000000000000765947017504717 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000262790719475463 * _DpAir ^ 3 + -0.000000202997575555574 * _AirFlow * _DpAir ^ 3 + 0.0000000000414297766071016 * _AirFlow ^ 2 * _DpAir ^ 3 + -0.00000000000000242613477762776 * _AirFlow ^ 3 * _DpAir ^ 3 + -0.0000000000000697401666477041 * _AirFlow ^ 4



                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020.  - OK- OK FINALE

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN063-ZIS-GL-V7P3")

                _ElectricPower = +23.6142352815795 * 1 + 0.0049021601476792 * _AirFlow + -0.000000303649974017152 * _AirFlow ^ 2 + 0.000000000284914302766102 * _AirFlow ^ 3 + 0.658563019409867 * _DpAir + 0.000351128967216754 * _AirFlow * _DpAir + -0.0000000157051973030637 * _AirFlow ^ 2 * _DpAir + 0.000000000000705454750308013 * _AirFlow ^ 3 * _DpAir + 0.0268648659437942 * _DpAir ^ 2 + -0.00000308707746064655 * _AirFlow * _DpAir ^ 2 + 0.000000000237815490715058 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.00000000000000674533785199657 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00000642473826398412 * _DpAir ^ 3



                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN063-ZIS-DG-V7P2")

                _ElectricPower = +-26.0339298653835 * 1 + 0.0105000247701865 * _AirFlow + -0.000000410831792373772 * _AirFlow ^ 2 + 0.000000000240240311603981 * _AirFlow ^ 3 + 2.27296572982282 * _DpAir + -0.00013076606744313 * _AirFlow * _DpAir + 0.0000000308526778564194 * _AirFlow ^ 2 * _DpAir + -0.000000000000621528718832312 * _AirFlow ^ 3 * _DpAir + -0.00493009130973346 * _DpAir ^ 2 + 0.00000482299888036749 * _AirFlow * _DpAir ^ 2 + -0.000000000539397866675746 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.0000000000000196641816128164 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0000073521400481584 * _DpAir ^ 3



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 18th, 2020.  - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "FN080-ZIS-GG-V7P3")

                _ElectricPower = +40.0796984362278 * 1 + -0.00662411360763536 * _AirFlow + 0.000000657677488669607 * _AirFlow ^ 2 + 0.0000000000783519105380493 * _AirFlow ^ 3 + 0.942704429706715 * _DpAir + 0.000128969952662773 * _AirFlow * _DpAir + 0.0000000189600453770096 * _AirFlow ^ 2 * _DpAir + -0.000000000000445870298377202 * _AirFlow ^ 3 * _DpAir + 0.0470084702127961 * _DpAir ^ 2 + -0.0000036664750607849 * _AirFlow * _DpAir ^ 2 + 0.0000000000182193953939552 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000315455610859171 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0000150508074431613 * _DpAir ^ 3



                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020.  - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN080-ZIS-DG-V5P4")

                _ElectricPower = +-28.3779517890227 * 1 + 0.0126003395493704 * _AirFlow + -0.00000122034186960964 * _AirFlow ^ 2 + 0.000000000147577421028321 * _AirFlow ^ 3 + 5.62667573356638 * _DpAir + -0.00113768633321731 * _AirFlow * _DpAir + 0.000000150773082661695 * _AirFlow ^ 2 * _DpAir + -0.00000000000528921696191011 * _AirFlow ^ 3 * _DpAir + -0.087494327134836 * _DpAir ^ 2 + 0.0000456595395212733 * _AirFlow * _DpAir ^ 2 + -0.00000000503512422976577 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.000000000000178111629293661 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0000572623305702335 * _DpAir ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'Ziehl-Abbegg, 900mm - EC FANS  

                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020. - OK - OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-GL-V5P1")


                _ElectricPower = +324.741315877603 * 1 + -0.0641879139290142 * _AirFlow + 0.00000493812809781067 * _AirFlow ^ 2 + -0.000000000103108106631848 * _AirFlow ^ 3 + -14.1620507065963 * _DpAir + 0.00372952897365025 * _AirFlow * _DpAir + -0.000000280981988852509 * _AirFlow ^ 2 * _DpAir + 0.00000000000954636707512064 * _AirFlow ^ 3 * _DpAir + 0.184735454144755 * _DpAir ^ 2 + -0.0000391903525340412 * _AirFlow * _DpAir ^ 2 + 0.00000000313928320004116 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000101694541512806 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000384643208364174 * _DpAir ^ 3 + -0.0000000774693881311079 * _AirFlow * _DpAir ^ 3 + 0.00000000000619400506804049 * _AirFlow ^ 2 * _DpAir ^ 3 + -0.000000000000000252700469488239 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.00000000000000179918772988875 * _AirFlow ^ 4 + -0.000000000000000112391555156742 * _AirFlow ^ 4 * _DpAir + 1.10761287908465E-18 * _AirFlow ^ 4 * _DpAir ^ 2 + 4.12035419236148E-21 * _AirFlow ^ 4 * _DpAir ^ 3 + 0.0000000631600760448705 * _DpAir ^ 4



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-GG-V5P1")

                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 14th, 2020. - OK - OK FINALE
                _ElectricPower = +-9.81412583453546 * 1 + 0.00459216273904768 * _AirFlow + -0.000000128568297245401 * _AirFlow ^ 2 + 0.0000000000546888611618682 * _AirFlow ^ 3 + -7.01249046254886 * _DpAir + 0.00217134828739792 * _AirFlow * _DpAir + -0.000000150866436710023 * _AirFlow ^ 2 * _DpAir + 0.00000000000401520145769245 * _AirFlow ^ 3 * _DpAir + 0.33065782979977 * _DpAir ^ 2 + -0.0000691327742140024 * _AirFlow * _DpAir ^ 2 + 0.00000000503713926663862 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000122235308313227 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00240390768625444 * _DpAir ^ 3 + 0.000000515706120197917 * _AirFlow * _DpAir ^ 3 + -0.0000000000365752397640735 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.000000000000000855637028587794 * _AirFlow ^ 3 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-DG-V4P3")


                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 19th, 2020. - OK - OK FINALE
                _ElectricPower = +57.1537649223244 * 1 + -0.0112758001723562 * _AirFlow + 0.000000967086880231895 * _AirFlow ^ 2 + 0.000000000028830247771497 * _AirFlow ^ 3 + -4.35946587314957 * _DpAir + 0.00164207114830004 * _AirFlow * _DpAir + -0.000000127540106636565 * _AirFlow ^ 2 * _DpAir + 0.0000000000041177113638059 * _AirFlow ^ 3 * _DpAir + 0.215552364071409 * _DpAir ^ 2 + -0.0000463716704814338 * _AirFlow * _DpAir ^ 2 + 0.00000000427250948965832 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000131515011286368 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000156308992268821 * _DpAir ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN100-ZIS-GL-V5P1")

                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 18th, 2020. - OK FINALE
                _ElectricPower = +209.896253058824 * 1 + -0.0398254243853745 * _AirFlow + 0.00000295314608323694 * _AirFlow ^ 2 + -0.0000000000523983742938532 * _AirFlow ^ 3 + -3.57814565207496 * _DpAir + 0.00121764421671243 * _AirFlow * _DpAir + -0.0000000529383125374406 * _AirFlow ^ 2 * _DpAir + 0.00000000000100115260265336 * _AirFlow ^ 3 * _DpAir + 0.034105618737712 * _DpAir ^ 2 + -0.00000717686062033033 * _AirFlow * _DpAir ^ 2 + 0.000000000556340605465198 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000121683250334911 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000548106346918897 * _DpAir ^ 3 + -0.0000000288349946249079 * _AirFlow * _DpAir ^ 3 + -0.000000000000665365224588865 * _AirFlow ^ 2 * _DpAir ^ 3 + 3.9001671373083E-17 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.000000000000000965084160766332 * _AirFlow ^ 4




                'Electrical Power [W] - Ziehl-Abbegg - C. Gnesutta, May 04th, 2020.  - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN100-ZIS-GG-V5P1")

                _ElectricPower = +-204.060574162503 * 1 + 0.0393629613244401 * _AirFlow + -0.00000214614160061283 * _AirFlow ^ 2 + 0.0000000000735762150140583 * _AirFlow ^ 3 + 13.8634177919614 * _DpAir + -0.00206167671538659 * _AirFlow * _DpAir + 0.000000130841661963005 * _AirFlow ^ 2 * _DpAir + -0.00000000000217604187212871 * _AirFlow ^ 3 * _DpAir + -0.0737380642407304 * _DpAir ^ 2 + 0.0000220167619585517 * _AirFlow * _DpAir ^ 2 + -0.00000000138349178353556 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.0000000000000256388309651223 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0000108724537546619 * _DpAir ^ 3

                '##########################################################################################################################

            Case Else

        End Select



        Return _ElectricPower
    End Function



    'Calculation of the Fan Electrical Current @Working point 
    'C. Gnesutta, March 25th, 2020.
    Public Function ElectricCurrent(ByVal _FanName As String, ByVal _AirFlow As Double, ByVal _DpAir As Double) As Double



        Dim _thisElectricCurrent As Double = 0


        Select Case True

            'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G450-AC28-58")


                'Electrical Current [A] - C. Gnesutta, March 25th, 2020. - OK- OK
                'Ok - Checked again by C. Gnesutta on April 23rd, 2020.
                _thisElectricCurrent = +-0.0254993331032943 * 1 + 0.00000982005961719855 * _AirFlow + -0.000000000889507817663316 * _AirFlow ^ 2 + 0.00000000000615929528899688 * _AirFlow ^ 3 + 0.00347359676214462 * _DpAir + 0.00000133472055520988 * _AirFlow * _DpAir + 0.0000000000826681454475234 * _AirFlow ^ 2 * _DpAir + 0.000034888475404414 * _DpAir ^ 2


                'Electrical Current [A] - C. Gnesutta, March 25th, 2020. - OK- OK
                'Ok - Checked again by C. Gnesutta on April 24th, 2020
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G500-AN33-03")

                _thisElectricCurrent = +-0.938667588562668 * 1 + 0.000397609508779204 * _AirFlow + -0.0000000444036466180222 * _AirFlow ^ 2 + 0.00000000000246210847257397 * _AirFlow ^ 3 + -0.0205729068363631 * _DpAir + 0.0000137022034694523 * _AirFlow * _DpAir + -0.00000000245272395881506 * _AirFlow ^ 2 * _DpAir + 0.000000000000139933230134127 * _AirFlow ^ 3 * _DpAir + 0.000492216296606815 * _DpAir ^ 2 + -0.000000241379102968904 * _AirFlow * _DpAir ^ 2 + 0.000000000038531445505966 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.00000000000000199425086318723 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0000000173387089213559 * _DpAir ^ 3



                'Electrical Current [A] - C. Gnesutta, May 27th, 2020.
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G630-AU23-01")

                _thisElectricCurrent = +2.05066904960694 * 1 + -0.000429697798598149 * _AirFlow + 0.0000000265463474084133 * _AirFlow ^ 2 + -0.12975962142182 * _DpAir + 0.0000341746525705395 * _AirFlow * _DpAir + -0.0000000031191538566399 * _AirFlow ^ 2 * _DpAir + 0.000000000000131920905539909 * _AirFlow ^ 3 * _DpAir + 0.00276904379205937 * _DpAir ^ 2 + -0.00000083273209567895 * _AirFlow * _DpAir ^ 2 + 0.0000000000935675643667369 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.00000000000000474905382254685 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0000129666107827223 * _DpAir ^ 3 + 0.00000000425927180552327 * _AirFlow * _DpAir ^ 3 + -0.000000000000512161185502311 * _AirFlow ^ 2 * _DpAir ^ 3 + 2.73450137594791E-17 * _AirFlow ^ 3 * _DpAir ^ 3 + -5.36362391734367E-18 * _AirFlow ^ 4 + -2.25934276833075E-18 * _AirFlow ^ 4 * _DpAir + 9.23648914643512E-20 * _AirFlow ^ 4 * _DpAir ^ 2 + -5.48091873509412E-22 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.000000000432215430444538 * _DpAir ^ 4


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G630-AC52-58")

                'Electrical Current [A] - C. Gnesutta,April 24th, 2020. - OK- OK
                _thisElectricCurrent = +0.303941485116882 * 1 + -0.000161063126574375 * _AirFlow + 0.0000000276122271996105 * _AirFlow ^ 2 + -0.0188630041015253 * _DpAir + 0.0000149867286069699 * _AirFlow * _DpAir + -0.00000000253722675087892 * _AirFlow ^ 2 * _DpAir + 0.000000000000163775728418328 * _AirFlow ^ 3 * _DpAir + 0.000135618957723573 * _DpAir ^ 2

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AT21-01")

                'Electrical Current [A] - C. Gnesutta,April 24th, 2020. - OK- OK
                _thisElectricCurrent = +-0.163521802475328 * 1 + 0.0000834319080057099 * _AirFlow + -0.00000000641991908796103 * _AirFlow ^ 2 + 0.000000000000266451204048249 * _AirFlow ^ 3 + 0.00463561766160488 * _DpAir + -0.00000000000568672291706898 * _AirFlow ^ 2 * _DpAir + 0.00000000000000110408706354806 * _AirFlow ^ 3 * _DpAir + 0.00003429426405309 * _DpAir ^ 2



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AO84-03")

                'Electrical Current [A] - C. Gnesutta, April 24th, 2020. - OK-OK

                _thisElectricCurrent = +0.270182246634837 * 1 + -0.0000489664115386656 * _AirFlow + 0.00000000476001516267389 * _AirFlow ^ 2 + -0.0000000000000185562442379107 * _AirFlow ^ 3 + 0.000000777573608373994 * _AirFlow * _DpAir + -0.0000000000423912698472627 * _AirFlow ^ 2 * _DpAir + 0.00000000000000153167488936709 * _AirFlow ^ 3 * _DpAir + 0.0000399776166690551 * _DpAir ^ 2


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-A081-23")

                'Electrical Current [A] - C. Gnesutta, April 24th, 2020. - OK-OK

                _thisElectricCurrent = +0.168938328221289 * 1 + -0.0000499802499310356 * _AirFlow + 0.00000000470485860219472 * _AirFlow ^ 2 + 0.000000000000268244891481702 * _AirFlow ^ 3 + -0.0141225089490895 * _DpAir + 0.00000623431310771363 * _AirFlow * _DpAir + -0.000000000445412879160294 * _AirFlow ^ 2 * _DpAir + 0.0000000000000139025489711626 * _AirFlow ^ 3 * _DpAir + 0.000554261291423039 * _DpAir ^ 2 + -0.000000104251384159025 * _AirFlow * _DpAir ^ 2 + 0.0000000000088767691398841 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000000257754656808286 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000000371774275538624 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "A3G800-AN36-94")

                'Electrical Current [A] - C. Gnesutta, April 27th, 2020. - OK-OK
                _thisElectricCurrent = +0.839684472363608 * 1 + -0.000355735674465587 * _AirFlow + 0.0000000542418817518899 * _AirFlow ^ 2 + -0.00000000000317702305239328 * _AirFlow ^ 3 + -0.13576209290961 * _DpAir + 0.0000631599001183022 * _AirFlow * _DpAir + -0.0000000100920589724431 * _AirFlow ^ 2 * _DpAir + 0.000000000000719298632603961 * _AirFlow ^ 3 * _DpAir + 0.00733049208753432 * _DpAir ^ 2 + -0.00000332478981401123 * _AirFlow * _DpAir ^ 2 + 0.000000000566568916966835 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000421013249988526 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0000880171622649553 * _DpAir ^ 3 + 0.0000000431181388867059 * _AirFlow * _DpAir ^ 3 + -0.00000000000768280292014897 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.000000000000000592919266366811 * _AirFlow ^ 3 * _DpAir ^ 3 + 8.60745759445647E-17 * _AirFlow ^ 4 + -1.87642310722265E-17 * _AirFlow ^ 4 * _DpAir + 1.14533716662968E-18 * _AirFlow ^ 4 * _DpAir ^ 2 + -1.67056479700357E-20 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.00000000479834437580861 * _DpAir ^ 4


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AV02-01")

                'Electrical Current [A] - C. Gnesutta, April 27th, 2020. - OK-OK- OK
                _thisElectricCurrent = +-0.0955419583713267 * 1 + 0.000013453870203377 * _AirFlow + -0.00000000057092256292752 * _AirFlow ^ 2 + 0.0000000000000759400251293668 * _AirFlow ^ 3 + 0.000000817726896524293 * _AirFlow * _DpAir + -0.0000000000181862926994269 * _AirFlow ^ 2 * _DpAir + 0.000000000000000316230111896747 * _AirFlow ^ 3 * _DpAir + 0.000195676449874321 * _DpAir ^ 2 + -0.000000026407929582054 * _AirFlow * _DpAir ^ 2 + 0.00000000000136818254875591 * _AirFlow ^ 2 * _DpAir ^ 2 + -2.14989008372192E-17 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000000312937240083023 * _DpAir ^ 3 + -0.0000000000188240159756198 * _AirFlow * _DpAir ^ 3



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AU22-01")

                'Electrical Current [A] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisElectricCurrent = +0.83012731253644 * 1 + -0.000166933568787778 * _AirFlow + 0.0000000122017965672882 * _AirFlow ^ 2 + -0.000000000000314498421650328 * _AirFlow ^ 3 + -0.0463072170321926 * _DpAir + 0.00000805138803824739 * _AirFlow * _DpAir + -0.000000000380173964597106 * _AirFlow ^ 2 * _DpAir + 0.00000000000000631563834231604 * _AirFlow ^ 3 * _DpAir + 0.00155027421938466 * _DpAir ^ 2 + -0.000000271524267790216 * _AirFlow * _DpAir ^ 2 + 0.0000000000169667996593023 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000000438226672704868 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000012525453102623 * _DpAir ^ 3 + 0.00000000269480325728429 * _AirFlow * _DpAir ^ 3 + -0.000000000000211077369685191 * _AirFlow ^ 2 * _DpAir ^ 3 + 7.24324663094937E-18 * _AirFlow ^ 3 * _DpAir ^ 3 + 4.38959742364768E-18 * _AirFlow ^ 4 + 3.89881177028143E-21 * _AirFlow ^ 4 * _DpAir ^ 2 + -9.32212757164646E-23 * _AirFlow ^ 4 * _DpAir ^ 3



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AS22-01")


                'Electrical Current [A] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisElectricCurrent = +0.0857531910316182 * 1 + -0.0000110234737706507 * _AirFlow + 0.000000000366207793023298 * _AirFlow ^ 2 + 0.0000000000000706886137604569 * _AirFlow ^ 3 + -0.00989770315368178 * _DpAir + 0.00000187263684715335 * _AirFlow * _DpAir + -0.0000000000366141366451192 * _AirFlow ^ 2 * _DpAir + 0.000634309653691834 * _DpAir ^ 2 + -0.0000000935061136001674 * _AirFlow * _DpAir ^ 2 + 0.00000000000463882694072887 * _AirFlow ^ 2 * _DpAir ^ 2 + -7.16870849942277E-17 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00000353711933749076 * _DpAir ^ 3 + 0.000000000635764898952476 * _AirFlow * _DpAir ^ 3 + -0.0000000000000352384584408323 * _AirFlow ^ 2 * _DpAir ^ 3 + 5.87700228338335E-19 * _AirFlow ^ 3 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AO83-03")

                'Electrical Current [A] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisElectricCurrent = +-0.0802664699609022 * 1 + 0.0000389054873206639 * _AirFlow + -0.00000000647215743749988 * _AirFlow ^ 2 + 0.000000000000515586745650443 * _AirFlow ^ 3 + 0.00220232936686226 * _DpAir + -0.000000186659149813836 * _AirFlow * _DpAir + 0.000000000125581098476044 * _AirFlow ^ 2 * _DpAir + -0.0000000000000059588607752178 * _AirFlow ^ 3 * _DpAir + 0.0000000418645325510686 * _AirFlow * _DpAir ^ 2 + -0.0000000000068659755821458 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.000000000000000304088899595805 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.00000492325762834107 * _DpAir ^ 3 + -0.00000000170218347741331 * _AirFlow * _DpAir ^ 3 + 0.000000000000193103110838506 * _AirFlow ^ 2 * _DpAir ^ 3 + -7.02924191765273E-18 * _AirFlow ^ 3 * _DpAir ^ 3 + -9.41785704812364E-18 * _AirFlow ^ 4



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G990-AY28-01")

                'Electrical Current [A] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisElectricCurrent = +-0.159478439117093 * 1 + 0.0000227646706585636 * _AirFlow + -0.00000000104473031334597 * _AirFlow ^ 2 + 0.0000000000000670073586944196 * _AirFlow ^ 3 + 0.00304984442996633 * _DpAir + 0.000000342344740587399 * _AirFlow * _DpAir + 0.00000000000401317858136294 * _AirFlow ^ 2 * _DpAir + -1.63231299441691E-17 * _AirFlow ^ 3 * _DpAir + 0.0000252953052855195 * _DpAir ^ 2



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G990-AZ02-01")


                'Electrical Current [A] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisElectricCurrent = +0.663606566644524 * 1 + -0.000129432936780803 * _AirFlow + 0.00000000907504322649943 * _AirFlow ^ 2 + -0.000000000000225177190484056 * _AirFlow ^ 3 + -0.0194277138028325 * _DpAir + 0.00000346366235046042 * _AirFlow * _DpAir + -0.000000000123006159897282 * _AirFlow ^ 2 * _DpAir + 0.00000000000000164088429228362 * _AirFlow ^ 3 * _DpAir + 0.000439502776442772 * _DpAir ^ 2 + -0.0000000615043393885961 * _AirFlow * _DpAir ^ 2 + 0.00000000000275467707395608 * _AirFlow ^ 2 * _DpAir ^ 2 + -3.89490563587721E-17 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000000703853027684461 * _DpAir ^ 3 + 0.000000000145443205939981 * _AirFlow * _DpAir ^ 3 + -0.00000000000000779102042415937 * _AirFlow ^ 2 * _DpAir ^ 3 + 1.24335961393688E-19 * _AirFlow ^ 3 * _DpAir ^ 3 + 3.11258247463448E-18 * _AirFlow ^ 4




                '#####################################################################################################
                'EC FANS - ZIEHL ABBEGG


                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 11th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN050-ZIS-DC-V7P2")

                _thisElectricCurrent = +0.0490002128937055 * 1 + 0.0000521790299608214 * _AirFlow + -0.00000000139687719622395 * _AirFlow ^ 2 + 0.000000000000836664774712156 * _AirFlow ^ 3 + 0.00358211231335997 * _DpAir + -0.000000281017799604621 * _AirFlow * _DpAir + 0.000000000022271380929656 * _AirFlow ^ 2 * _DpAir + 0.00000000000000219333337851479 * _AirFlow ^ 3 * _DpAir + 0.00000727473488365418 * _DpAir ^ 2





                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN063-ZIS-GL-V7P3")

                _thisElectricCurrent = +0.491102197072881 * 1 + -0.0000277173780375038 * _AirFlow + 0.000000000457140097322321 * _AirFlow ^ 2 + 0.000000000000422818597077181 * _AirFlow ^ 3 + -0.00176373009979792 * _DpAir + 0.000000830480191492029 * _AirFlow * _DpAir + -0.0000000000373377189178862 * _AirFlow ^ 2 * _DpAir + 0.00000000000000131853962229188 * _AirFlow ^ 3 * _DpAir + 0.0000423957545043847 * _DpAir ^ 2 + -0.00000000442025766289372 * _AirFlow * _DpAir ^ 2 + 0.000000000000328706319116343 * _AirFlow ^ 2 * _DpAir ^ 2 + -9.34868959198143E-18 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0000000114319374591442 * _DpAir ^ 3



                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN063-ZIS-DG-V7P2")

                _thisElectricCurrent = +-0.199041206844174 * 1 + 0.00010165928081431 * _AirFlow + -0.00000000691233646729935 * _AirFlow ^ 2 + 0.000000000000473905474525833 * _AirFlow ^ 3 + 0.0100658228849414 * _DpAir + -0.00000143046517454644 * _AirFlow * _DpAir + 0.000000000117630620640005 * _AirFlow ^ 2 * _DpAir + -0.00000000000000235448952638212 * _AirFlow ^ 3 * _DpAir + -0.0000383117250473948 * _DpAir ^ 2 + 0.0000000104245686839206 * _AirFlow * _DpAir ^ 2 + -0.000000000000930374606202825 * _AirFlow ^ 2 * _DpAir ^ 2 + 3.1698485837267E-17 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000000021820657134745 * _DpAir ^ 3




                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€



                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "FN080-ZIS-GG-V7P3")
                _thisElectricCurrent = +0.00483406211423591 * 1 + 0.0000326449475059919 * _AirFlow + -0.00000000143498563224544 * _AirFlow ^ 2 + 0.000000000000159171264880092 * _AirFlow ^ 3 + 0.00911397928618609 * _DpAir + -0.0000012806957034809 * _AirFlow * _DpAir + 0.000000000117985261948014 * _AirFlow ^ 2 * _DpAir + -0.00000000000000242386514044566 * _AirFlow ^ 3 * _DpAir + 0.0000257254503745295 * _DpAir ^ 2 + 0.00000000336757259102562 * _AirFlow * _DpAir ^ 2 + -0.000000000000518553203954426 * _AirFlow ^ 2 * _DpAir ^ 2 + 1.54062215058552E-17 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0000000157310112206201 * _DpAir ^ 3



                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020.   - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN080-ZIS-DG-V5P4")
                _thisElectricCurrent = +-0.109553772175612 * 1 + 0.0000684278707643975 * _AirFlow + -0.00000000444238895643127 * _AirFlow ^ 2 + 0.000000000000244825460349433 * _AirFlow ^ 3 + 0.0245482989685785 * _DpAir + -0.00000517172798512476 * _AirFlow * _DpAir + 0.000000000480143929087792 * _AirFlow ^ 2 * _DpAir + -0.0000000000000140843491940736 * _AirFlow ^ 3 * _DpAir + -0.000202550485981131 * _DpAir ^ 2 + 0.0000000699956885294896 * _AirFlow * _DpAir ^ 2 + -0.00000000000682818929464033 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.000000000000000219157326717817 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0000000536154740992825 * _DpAir ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€



                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 04th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
                'Baco corretto, su segnalazione di Demis Cristin ed Emanuele Dose,
                ' da C. Gnesutta il 17 Maggio 2023


            Case (_FanName = "FN091-ZIS-GL-V5P1")

                _thisElectricCurrent = +0.304224190529289 * 1 + -0.000000297904435610383 * _AirFlow + -0.000000000368774692086449 * _AirFlow ^ 2 + 0.0000000000000886389511883331 * _AirFlow ^ 3 + 0.00278700742004337 * _DpAir + 0.0000000000235646493261585 * _AirFlow ^ 2 * _DpAir + -0.000000000000000286120887866652 * _AirFlow ^ 3 * _DpAir + 0.0000304452266043721 * _DpAir ^ 2 + -0.000000000737339752815432 * _AirFlow * _DpAir ^ 2






                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-GG-V5P1")

                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 14th, 2020.- OK FINALE
                _thisElectricCurrent = +-0.242627333304229 * 1 + 0.0000708006108002468 * _AirFlow + -0.00000000311098360268925 * _AirFlow ^ 2 + 0.000000000000122754898752636 * _AirFlow ^ 3 + 0.013578844269694 * _DpAir + -0.00000103588341942499 * _AirFlow * _DpAir + 0.0000000000534263781589892 * _AirFlow ^ 2 * _DpAir + -0.000000000000000604703235925633 * _AirFlow ^ 3 * _DpAir + -0.0000714262437095929 * _DpAir ^ 2 + 0.0000000124265343492242 * _AirFlow * _DpAir ^ 2 + -0.000000000000706575543097947 * _AirFlow ^ 2 * _DpAir ^ 2 + 1.45751128666371E-17 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0000000479478843407531 * _DpAir ^ 3











                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-DG-V4P3")


                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 19th, 2020.- OK FINALE

                _thisElectricCurrent = +0.277134084319399 * 1 + -0.0000521770076421607 * _AirFlow + 0.00000000536725311109437 * _AirFlow ^ 2 + -0.000000000000066828979489535 * _AirFlow ^ 3 + -0.0180282657938927 * _DpAir + 0.00000565595234000953 * _AirFlow * _DpAir + -0.000000000435344995603902 * _AirFlow ^ 2 * _DpAir + 0.0000000000000118863842618509 * _AirFlow ^ 3 * _DpAir + 0.000799037903836002 * _DpAir ^ 2 + -0.000000183639228738866 * _AirFlow * _DpAir ^ 2 + 0.0000000000152504970709289 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000000423735821213015 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000000282887847449241 * _DpAir ^ 3

                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN100-ZIS-GL-V5P1")

                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 14th, 2020.- OK- OK FINALE
                _thisElectricCurrent = +0.167810035955012 * 1 + 0.00000533539044529099 * _AirFlow + 0.0000000000146942784178472 * _AirFlow ^ 2 + 0.0000000000000503490220748021 * _AirFlow ^ 3 + 0.0000010755460295924 * _AirFlow * _DpAir + -0.0000000000542484970934992 * _AirFlow ^ 2 * _DpAir + 0.00000000000000116867734652257 * _AirFlow ^ 3 * _DpAir + 0.0000384990171359608 * _DpAir ^ 2



                'Electrical Current [A] - Ziehl-Abbegg - C. Gnesutta, May 04th, 2020.  - OK- OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN100-ZIS-GG-V5P1")

                _thisElectricCurrent = +-0.384786745785441 * 1 + 0.0000884805418793713 * _AirFlow + -0.00000000430052100511194 * _AirFlow ^ 2 + 0.000000000000122607175606244 * _AirFlow ^ 3 + 0.0304015143459623 * _DpAir + -0.00000416916515572343 * _AirFlow * _DpAir + 0.000000000238132034981134 * _AirFlow ^ 2 * _DpAir + -0.00000000000000383656524403027 * _AirFlow ^ 3 * _DpAir + -0.000183652665741304 * _DpAir ^ 2 + 0.0000000412891447711818 * _AirFlow * _DpAir ^ 2 + -0.00000000000247482640752663 * _AirFlow ^ 2 * _DpAir ^ 2 + 4.60563312035365E-17 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0000000412766759601072 * _DpAir ^ 3



                '##########################################################################################################################

            Case Else

        End Select



        Return _thisElectricCurrent
    End Function



    'Calculation of the Fan Electrical Power @Working point 
    'C. Gnesutta, March 25th, 2020.
    Public Function RadialSpeed(ByVal _FanName As String, ByVal _AirFlow As Double, ByVal _DpAir As Double) As Double

        Dim _thisRadialSpeed As Double = 0


        Select Case True

            'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G450-AC28-58")


                'Radial Speed  [RPM] - C. Gnesutta, March 25th, 2020. - OK- OK
                'Ok - Checked again by C. Gnesutta on April 23rd, 2020.
                _thisRadialSpeed = +159.104455731942 * 1 + 0.104830086107084 * _AirFlow + 0.0000183060630463589 * _AirFlow ^ 2 + -0.00000000113253971215348 * _AirFlow ^ 3 + 13.8106358285028 * _DpAir + -0.0048130694545753 * _AirFlow * _DpAir + 0.000000890082096080427 * _AirFlow ^ 2 * _DpAir + -0.0000000000650200781967801 * _AirFlow ^ 3 * _DpAir + -0.00493463441703256 * _DpAir ^ 2


                'Radial Speed  [RPM] - C. Gnesutta, March 25th, 2020. - OK - OK
                'Ok - Checked again by C. Gnesutta on April 24th, 2020
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G500-AN33-03")

                _thisRadialSpeed = +14.6255627333637 * 1 + 0.148454285652495 * _AirFlow + 0.00000183747313499689 * _AirFlow ^ 2 + -0.000000000138640438622729 * _AirFlow ^ 3 + 10.2018747353068 * _DpAir + -0.00226574459121774 * _AirFlow * _DpAir + 0.00000022414798706259 * _AirFlow ^ 2 * _DpAir + -0.00000000000801279058948179 * _AirFlow ^ 3 * _DpAir + -0.000703356918800549 * _DpAir ^ 2


                'Radial Speed  [RPM] - C. Gnesutta, May 27th, 2020. 
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G630-AU23-01")
                _thisRadialSpeed = +1447.22413325932 * 1 + -0.332216709169358 * _AirFlow + 0.0000403652981812815 * _AirFlow ^ 2 + -0.00000000174052566632047 * _AirFlow ^ 3 + -37.5309863384026 * _DpAir + 0.011736550242912 * _AirFlow * _DpAir + -0.00000122494141849645 * _AirFlow ^ 2 * _DpAir + 0.0000000000556696787656044 * _AirFlow ^ 3 * _DpAir + 0.635377499639971 * _DpAir ^ 2 + -0.000193390834795335 * _AirFlow * _DpAir ^ 2 + 0.0000000215890869108935 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.00000000000107332310747794 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00245669817032343 * _DpAir ^ 3 + 0.000000792563426290963 * _AirFlow * _DpAir ^ 3 + -0.0000000000933886637133981 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.00000000000000487614245787742 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.0000000000000275107853533738 * _AirFlow ^ 4 + -0.000000000000000956668557995822 * _AirFlow ^ 4 * _DpAir + 2.01858807829748E-17 * _AirFlow ^ 4 * _DpAir ^ 2 + -9.54211081728051E-20 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.0000000804054353026841 * _DpAir ^ 4



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G630-AC52-58")

                'Radial Speed  [RPM] - C. Gnesutta, April 24th, 2020. - OK- OK
                _thisRadialSpeed = +42.6764090218428 * 1 + 0.0692093330384901 * _AirFlow + 0.00000310182923496947 * _AirFlow ^ 2 + -0.000000000155987624825378 * _AirFlow ^ 3 + 31.8693621528853 * _DpAir + -0.0130465888628632 * _AirFlow * _DpAir + 0.00000229002981619711 * _AirFlow ^ 2 * _DpAir + -0.00000000014508909531205 * _AirFlow ^ 3 * _DpAir + -0.872632655061524 * _DpAir ^ 2 + 0.000520412997745203 * _AirFlow * _DpAir ^ 2 + -0.000000104665491725819 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000708313856241257 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000250364328347701 * _DpAir ^ 3

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AT21-01")


                'Radial Speed  [RPM] - C. Gnesutta, April 24th, 2020. - OK- OK
                _thisRadialSpeed = +193.609204023547 * 1 + 0.00444720295113296 * _AirFlow + 0.00000199881698665649 * _AirFlow ^ 2 + -0.0000000000383929519363935 * _AirFlow ^ 3 + 4.73600102310269 * _DpAir + -0.000178703177712775 * _AirFlow * _DpAir + 0.00000000235609364776685 * _AirFlow ^ 2 * _DpAir + -0.00325345232129515 * _DpAir ^ 2



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AO84-03")


                'Radial Speed  [RPM] - C. Gnesutta, April 24th, 2020. - OK- OK
                _thisRadialSpeed = +134.996319225481 * 1 + 0.0106387060808482 * _AirFlow + 0.00000209518721453163 * _AirFlow ^ 2 + -0.0000000000494874131679785 * _AirFlow ^ 3 + 7.24492097699075 * _DpAir + -0.000652885522675134 * _AirFlow * _DpAir + 0.000000034784963920686 * _AirFlow ^ 2 * _DpAir + -0.000000000000811303148247433 * _AirFlow ^ 3 * _DpAir + -0.00459631906191836 * _DpAir ^ 2

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-A081-23")

                'Radial Speed  [RPM] - C. Gnesutta, April 24th, 2020. - OK- OK
                _thisRadialSpeed = +100.715334597972 * 1 + 0.013353376874073 * _AirFlow + 0.00000242364897388318 * _AirFlow ^ 2 + -0.0000000000672601053899805 * _AirFlow ^ 3 + 7.95466427223206 * _DpAir + -0.000457984561207059 * _AirFlow * _DpAir + 0.000000000000365500844322713 * _AirFlow ^ 3 * _DpAir + -0.0210663476757174 * _DpAir ^ 2 + 0.00000139978732918145 * _AirFlow * _DpAir ^ 2


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AN36-94")

                'Radial Speed  [RPM] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadialSpeed = +105.195377069131 * 1 + 0.00778134651019517 * _AirFlow + 0.00000316653502938691 * _AirFlow ^ 2 + -0.0000000000965900524476613 * _AirFlow ^ 3 + 7.8655693944946 * _DpAir + -0.0000649087848624834 * _AirFlow * _DpAir + -0.0000000557542211757731 * _AirFlow ^ 2 * _DpAir + 0.00000000000231510531300705 * _AirFlow ^ 3 * _DpAir + 0.0103417749136597 * _DpAir ^ 2 + -0.0000157781192482572 * _AirFlow * _DpAir ^ 2 + 0.00000000196883527818737 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000652120053296188 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000105504329452494 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AV02-01")


                'Radial Speed  [RPM] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadialSpeed = +168.653554000088 * 1 + 0.00502962375545538 * _AirFlow + 0.00000107116405363314 * _AirFlow ^ 2 + -0.000000000015282216623431 * _AirFlow ^ 3 + 0.00069736684263127 * _AirFlow * _DpAir + -0.0000000421619118259783 * _AirFlow ^ 2 * _DpAir + 0.000000000000682399959236852 * _AirFlow ^ 3 * _DpAir + 0.116935733553781 * _DpAir ^ 2 + -0.0000198011218066153 * _AirFlow * _DpAir ^ 2 + 0.000000000999132930292858 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000155759698617235 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000427667990875439 * _DpAir ^ 3 + 0.000000071347493546925 * _AirFlow * _DpAir ^ 3 + -0.00000000000359218917996312 * _AirFlow ^ 2 * _DpAir ^ 3 + 5.55119126043108E-17 * _AirFlow ^ 3 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AU22-01")


                'Radial Speed  [RPM] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadialSpeed = +156.551975836446 * 1 + 0.00116851795228554 * _AirFlow + 0.00000174382620356899 * _AirFlow ^ 2 + -0.0000000000464781069992897 * _AirFlow ^ 3 + 3.14784347517899 * _DpAir + 0.0000000234403302932611 * _AirFlow ^ 2 * _DpAir + -0.00000000000195788710337769 * _AirFlow ^ 3 * _DpAir + 0.235261081347548 * _DpAir ^ 2 + -0.0000456887129450909 * _AirFlow * _DpAir ^ 2 + 0.0000000027510424806299 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000646885653688227 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00218601956613428 * _DpAir ^ 3 + 0.000000489526444819068 * _AirFlow * _DpAir ^ 3 + -0.0000000000368740345823677 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.00000000000000120930719954426 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.000000000000000434260250378762 * _AirFlow ^ 4 + 3.91871843735738E-17 * _AirFlow ^ 4 * _DpAir + 4.69667468167952E-19 * _AirFlow ^ 4 * _DpAir ^ 2 + -1.48060129502397E-20 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.000000499679778288726 * _DpAir ^ 4


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "A3G910-AS22-01")

                'Radial Speed  [RPM] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadialSpeed = +44.6804082344063 * 1 + 0.0215662879834223 * _AirFlow + 0.000000351746307114484 * _AirFlow ^ 2 + -0.00000000000546214930030152 * _AirFlow ^ 3 + 8.55628193076651 * _DpAir + -0.000659254090609349 * _AirFlow * _DpAir + 0.0000000298765683617455 * _AirFlow ^ 2 * _DpAir + -0.000000000000611214986586093 * _AirFlow ^ 3 * _DpAir + 0.0295720289827625 * _DpAir ^ 2 + -0.00000622430298927546 * _AirFlow * _DpAir ^ 2 + 0.000000000235856403536626 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000281707557347142 * _DpAir ^ 3 + 0.0000000484561908048632 * _AirFlow * _DpAir ^ 3 + -0.00000000000179074292678305 * _AirFlow ^ 2 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AO83-03")

                'Radial Speed  [RPM] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadialSpeed = +56.6538249709654 * 1 + 0.0150894889763229 * _AirFlow + 0.00000144383743084017 * _AirFlow ^ 2 + -0.0000000000395217593806851 * _AirFlow ^ 3 + 12.1022386135768 * _DpAir + -0.000820970955333573 * _AirFlow * _DpAir + 0.000000000000751988538347338 * _AirFlow ^ 3 * _DpAir + -0.107918367705961 * _DpAir ^ 2 + 0.00000406733257781776 * _AirFlow * _DpAir ^ 2 + 0.000000000937074843036442 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000401385782944124 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.000856598174950584 * _DpAir ^ 3 + -0.0000000860943675297547 * _AirFlow * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "A3G990-AY28-01")

                'Radial Speed  [RPM] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadialSpeed = +89.2397508386033 * 1 + 0.0144863956462337 * _AirFlow + 0.000000573480457956395 * _AirFlow ^ 2 + -0.00000000000877721407734838 * _AirFlow ^ 3 + 6.72847131836166 * _DpAir + -0.000436656685531526 * _AirFlow * _DpAir + 0.0000000154993694748863 * _AirFlow ^ 2 * _DpAir + -0.000000000000222562662424825 * _AirFlow ^ 3 * _DpAir + -0.00333894612105411 * _DpAir ^ 2


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G990-AZ02-01")


                'Radial Speed  [RPM] - C. Gnesutta, April 28th, 2020. - OK- OK
                _thisRadialSpeed = +286.435488051808 * 1 + -0.0451562762992462 * _AirFlow + 0.00000697632417214387 * _AirFlow ^ 2 + -0.00000000032029634264545 * _AirFlow ^ 3 + -147.813658661359 * _DpAir + 0.0454956669639151 * _AirFlow * _DpAir + -0.0000051624198454432 * _AirFlow ^ 2 * _DpAir + 0.000000000279972816174355 * _AirFlow ^ 3 * _DpAir + 4.34710507910631 * _DpAir ^ 2 + -0.00130354263425999 * _AirFlow * _DpAir ^ 2 + 0.000000147124169799353 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.00000000000791542929975374 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0281869037968071 * _DpAir ^ 3 + 0.00000887395472134698 * _AirFlow * _DpAir ^ 3 + -0.00000000101673744142327 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.0000000000000542159593883965 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.0000000000000070971123925249 * _AirFlow ^ 4 + -0.00000000000000730560889882214 * _AirFlow ^ 4 * _DpAir + 0.000000000000000203770364419779 * _AirFlow ^ 4 * _DpAir ^ 2 + -1.35273170080556E-18 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.00000000398404839802318 * _AirFlow * _DpAir ^ 4 + 0.000000000000620123801131121 * _AirFlow ^ 2 * _DpAir ^ 4 + -3.19414359208992E-17 * _AirFlow ^ 3 * _DpAir ^ 4 + 5.42378119684836E-22 * _AirFlow ^ 4 * _DpAir ^ 4 + -6.10976828495841E-20 * _AirFlow ^ 5 + 7.35064405676552E-20 * _AirFlow ^ 5 * _DpAir + -2.00852546377382E-21 * _AirFlow ^ 5 * _DpAir ^ 2 + 1.25817600680196E-23 * _AirFlow ^ 5 * _DpAir ^ 3



                '##########################################################################################################################
                'EC FANS - ZIEHL ABBEGG


                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 04th, 2020. - OK- OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN050-ZIS-DC-V7P2")

                _thisRadialSpeed = +-39.0930773609655 * 1 + 0.191479262047272 * _AirFlow + -0.00000519241050283122 * _AirFlow ^ 2 + 0.000000000220490767751201 * _AirFlow ^ 3 + 16.1953849169517 * _DpAir + -0.00541736416348772 * _AirFlow * _DpAir + 0.000000721770593753506 * _AirFlow ^ 2 * _DpAir + -0.0000000000320611112392586 * _AirFlow ^ 3 * _DpAir + -0.0357773619803202 * _DpAir ^ 2 + 0.0000144301009768897 * _AirFlow * _DpAir ^ 2 + -0.00000000147798695967607 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.0000000000000237412338658959 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0000147004375549871 * _DpAir ^ 3




                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 04th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN063-ZIS-GL-V7P3")

                _thisRadialSpeed = +36.0616264939731 * 1 + 0.0640355416745314 * _AirFlow + 0.00000064883125930834 * _AirFlow ^ 2 + -0.0000000000143893019116034 * _AirFlow ^ 3 + 9.55049608211993 * _DpAir + -0.00135506394008811 * _AirFlow * _DpAir + 0.0000000722740974390189 * _AirFlow ^ 2 * _DpAir + -0.000000000001304186821993 * _AirFlow ^ 3 * _DpAir + -0.0143837116958657 * _DpAir ^ 2 + 0.00000319505550927404 * _AirFlow * _DpAir ^ 2 + -0.000000000179433751458717 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000293542662020075 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000005599558985671 * _DpAir ^ 3



                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN063-ZIS-DG-V7P2")
                _thisRadialSpeed = +74.9526119392442 * 1 + 0.0238460714886667 * _AirFlow + 0.00000100356018044116 * _AirFlow ^ 2 + -0.0000000000205435353321204 * _AirFlow ^ 3 + 8.23372138656756 * _DpAir + -0.000850178020200391 * _AirFlow * _DpAir + 0.0000000405944761697241 * _AirFlow ^ 2 * _DpAir + -0.000000000000745820189758545 * _AirFlow ^ 3 * _DpAir + -0.0266879322621286 * _DpAir ^ 2 + 0.00000471932803168754 * _AirFlow * _DpAir ^ 2 + -0.000000000307287789621353 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000690733296044343 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.00000147391726913702 * _DpAir ^ 3




                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 04th, 2020.  - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN080-ZIS-GG-V7P3")
                _thisRadialSpeed = +74.9526119392442 * 1 + 0.0238460714886667 * _AirFlow + 0.00000100356018044116 * _AirFlow ^ 2 + -0.0000000000205435353321204 * _AirFlow ^ 3 + 8.23372138656756 * _DpAir + -0.000850178020200391 * _AirFlow * _DpAir + 0.0000000405944761697241 * _AirFlow ^ 2 * _DpAir + -0.000000000000745820189758545 * _AirFlow ^ 3 * _DpAir + -0.0266879322621286 * _DpAir ^ 2 + 0.00000471932803168754 * _AirFlow * _DpAir ^ 2 + -0.000000000307287789621353 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000690733296044343 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.00000147391726913702 * _DpAir ^ 3




                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 18th, 2020.  - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN080-ZIS-DG-V5P4")
                _thisRadialSpeed = +-15.2301618117737 * 1 + 0.0438509493561972 * _AirFlow + -0.000000275774526613068 * _AirFlow ^ 2 + 0.00000000000841207361408837 * _AirFlow ^ 3 + 20.7549640740274 * _DpAir + -0.00374100808694175 * _AirFlow * _DpAir + 0.000000264499294312044 * _AirFlow ^ 2 * _DpAir + -0.00000000000678806255722114 * _AirFlow ^ 3 * _DpAir + -0.319857834927563 * _DpAir ^ 2 + 0.0000848109888024204 * _AirFlow * _DpAir ^ 2 + -0.0000000071650786954835 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000020361569713717 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000145795221021006 * _DpAir ^ 3



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020. - OK -OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-GL-V5P1")
                _thisRadialSpeed = +43.5072188331182 * 1 + 0.0275794682537375 * _AirFlow + 0.00000025474344627991 * _AirFlow ^ 2 + -0.0000000000034669039514665 * _AirFlow ^ 3 + 7.73808232061596 * _DpAir + -0.000621881973976664 * _AirFlow * _DpAir + 0.0000000229829625970367 * _AirFlow ^ 2 * _DpAir + -0.000000000000314412942312474 * _AirFlow ^ 3 * _DpAir + -0.0233820675814485 * _DpAir ^ 2 + 0.0000028604605082729 * _AirFlow * _DpAir ^ 2 + -0.00000000012930571263546 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000199081512209995 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.00000195932320346412 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-GG-V5P1")


                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 14th, 2020. - OK- OK FINALE 

                _thisRadialSpeed = +45.6962749837381 * 1 + 0.0249894095390221 * _AirFlow + 0.000000474832011306418 * _AirFlow ^ 2 + -0.00000000000820139069228857 * _AirFlow ^ 3 + 8.69186704826653 * _DpAir + -0.000751692893277397 * _AirFlow * _DpAir + 0.0000000300153506962039 * _AirFlow ^ 2 * _DpAir + -0.000000000000464925089536537 * _AirFlow ^ 3 * _DpAir + -0.0446585389701007 * _DpAir ^ 2 + 0.00000638284185007904 * _AirFlow * _DpAir ^ 2 + -0.000000000336890410074116 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000617607061936942 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.00000476893224925085 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-DG-V4P3")

                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 19th, 2020. - OK- OK FINALE 
                _thisRadialSpeed = +25.1216861228721 * 1 + 0.0217374442370312 * _AirFlow + 0.000000692458061719562 * _AirFlow ^ 2 + -0.000000000019540401680115 * _AirFlow ^ 3 + 13.7826090514422 * _DpAir + -0.00176438870505254 * _AirFlow * _DpAir + 0.0000000918302527481531 * _AirFlow ^ 2 * _DpAir + -0.00000000000166849113256323 * _AirFlow ^ 3 * _DpAir + -0.188456497933127 * _DpAir ^ 2 + 0.0000396619209108667 * _AirFlow * _DpAir ^ 2 + -0.00000000270310348202367 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.0000000000000609735771801988 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0000784419526696456 * _DpAir ^ 3


                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "FN100-ZIS-GL-V5P1")


                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 14th, 2020. - OK- OK FINALE 
                _thisRadialSpeed = +-5.60912138038445 * 1 + 0.0246258276004747 * _AirFlow + -0.0000000182663548625052 * _AirFlow ^ 2 + 0.000000000000238179496970205 * _AirFlow ^ 3 + 11.2478260484425 * _DpAir + -0.000982755264228653 * _AirFlow * _DpAir + 0.0000000367561065452527 * _AirFlow ^ 2 * _DpAir + -0.000000000000493893535793602 * _AirFlow ^ 3 * _DpAir + -0.0710005782051346 * _DpAir ^ 2 + 0.00000905158564721177 * _AirFlow * _DpAir ^ 2 + -0.000000000401974032777554 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000597126205628542 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.00000472865257678513 * _DpAir ^ 3





                'Radial Speed  [RPM]  - Ziehl-Abbegg - C. Gnesutta, May 04th, 2020. - OK- OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN100-ZIS-GG-V5P1")
                _thisRadialSpeed = +-3.65954068149516 * 1 + 0.0247907560859177 * _AirFlow + -0.0000000582386461895508 * _AirFlow ^ 2 + 0.0000000000012579927180239 * _AirFlow ^ 3 + 12.7453523475134 * _DpAir + -0.0013545224475363 * _AirFlow * _DpAir + 0.0000000612969253808808 * _AirFlow ^ 2 * _DpAir + -0.000000000000967478814787684 * _AirFlow ^ 3 * _DpAir + -0.0770381674219155 * _DpAir ^ 2 + 0.0000116287316430258 * _AirFlow * _DpAir ^ 2 + -0.000000000597913825456945 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.0000000000000100301701707173 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000000980703805873745 * _DpAir ^ 3

                '##########################################################################################################################


            Case Else

        End Select


        Return _thisRadialSpeed
    End Function



    'Calculation of the Fan Radiated Noise @Working point 
    'C. Gnesutta, March 25th, 2020.
    Public Function RadiatedNoise(ByVal _FanName As String, ByVal _AirFlow As Double, ByVal _DpAir As Double) As Double

        Dim _thisRadiatedNoise As Double = 0


        Select Case True

            'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G450-AC28-58")

                'Radiated Noise [dB(A)] - C. Gnesutta, March 25th, 2020. - OK- OK
                'Ok - Checked again by C. Gnesutta on April 23rd, 2020.
                _thisRadiatedNoise = +28.7168822823969 * 1 + 0.0116176958080676 * _AirFlow + -0.000000700060821599974 * _AirFlow ^ 2 + 1.23137886127902 * _DpAir + -0.000836676892456567 * _AirFlow * _DpAir + 0.00000017772637526945 * _AirFlow ^ 2 * _DpAir + -0.0000000000121159520679172 * _AirFlow ^ 3 * _DpAir + 0.00351809925908488 * _DpAir ^ 2 + -0.000000670901713193565 * _AirFlow * _DpAir ^ 2


                'Radiated Noise [dB(A)] - C. Gnesutta, March 25th, 2020. - OK- 
                'Ok - Checked again by C. Gnesutta on April 24th, 2020
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G500-AN33-03")

                _thisRadiatedNoise = +20.2184378117104 * 1 + 0.0158291143469095 * _AirFlow + -0.00000151520373054949 * _AirFlow ^ 2 + 0.0000000000560747228969774 * _AirFlow ^ 3 + 0.160801588534115 * _DpAir + -0.000040000392904272 * _AirFlow * _DpAir + 0.000000000000218124042017284 * _AirFlow ^ 3 * _DpAir + 0.000318543100452713 * _DpAir ^ 2




                'Radiated Noise [dB(A)] - C. Gnesutta, May 27th, 2020. 
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G630-AU23-01")

                _thisRadiatedNoise = +-201.71459291283 * 1 + 0.07227805467748 * _AirFlow + -0.00000711284682038788 * _AirFlow ^ 2 + 0.000000000310282450989138 * _AirFlow ^ 3 + 8.54151743111891 * _DpAir + -0.00245730310910532 * _AirFlow * _DpAir + 0.00000025519237345818 * _AirFlow ^ 2 * _DpAir + -0.0000000000113734028716516 * _AirFlow ^ 3 * _DpAir + -0.0469079504378516 * _DpAir ^ 2 + 0.0000140787883903393 * _AirFlow * _DpAir ^ 2 + -0.00000000145877013729096 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.0000000000000632213206657346 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0000412210359960984 * _DpAir ^ 3 + -0.0000000121224021249432 * _AirFlow * _DpAir ^ 3 + 0.00000000000101708567165528 * _AirFlow ^ 2 * _DpAir ^ 3 + -2.68598600340707E-17 * _AirFlow ^ 3 * _DpAir ^ 3 + -0.00000000000000497594705656731 * _AirFlow ^ 4 + 0.000000000000000184082687730066 * _AirFlow ^ 4 * _DpAir + -9.70201463267789E-19 * _AirFlow ^ 4 * _DpAir ^ 2 + 0.0000000051891545725386 * _DpAir ^ 4




                'Radiated Noise [dB(A)] - C. Gnesutta, April 24th, 2020. - OK- OK
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G630-AC52-58")

                _thisRadiatedNoise = +26.8775532097047 * 1 + 0.00656100869529017 * _AirFlow + -0.000000248551909521101 * _AirFlow ^ 2 + 0.000000000000938782786824881 * _AirFlow ^ 3 + 2.52148928536832 * _DpAir + -0.00110433447478293 * _AirFlow * _DpAir + 0.000000181981370610957 * _AirFlow ^ 2 * _DpAir + -0.0000000000104102604848842 * _AirFlow ^ 3 * _DpAir



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AT21-01")

                'Radiated Noise [dB(A)] - C. Gnesutta, April 24th, 2020. - OK- OK
                _thisRadiatedNoise = +32.8684905435075 * 1 + 0.00277741644041527 * _AirFlow + -0.0000000409018992367931 * _AirFlow ^ 2 + 1.02548998087912 * _DpAir + -0.000149422931850309 * _AirFlow * _DpAir + 0.00000000810257461591508 * _AirFlow ^ 2 * _DpAir + -0.000000000000152604135944 * _AirFlow ^ 3 * _DpAir




                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "A3G800-AO84-03")

                'Radiated Noise [dB(A)] - C. Gnesutta, April 24th, 2020. - OK- OK
                _thisRadiatedNoise = +25.119636332286 * 1 + 0.00405336233737625 * _AirFlow + -0.0000000774191874126662 * _AirFlow ^ 2 + 1.21815600994682 * _DpAir + -0.000264027626573405 * _AirFlow * _DpAir + 0.0000000183395295698373 * _AirFlow ^ 2 * _DpAir + -0.000000000000412313645149625 * _AirFlow ^ 3 * _DpAir + 0.00465509796556564 * _DpAir ^ 2 + -0.000000305640098036137 * _AirFlow * _DpAir ^ 2


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-A081-23")


                'Radiated Noise [dB(A)] - C. Gnesutta, April 24th, 2020. - OK- OK
                _thisRadiatedNoise = +-195.77052304718 * 1 + 0.0984423067404974 * _AirFlow + -0.0000145480000994354 * _AirFlow ^ 2 + 0.000000000965400538282741 * _AirFlow ^ 3 + 19.8044439553784 * _DpAir + -0.00894315137049862 * _AirFlow * _DpAir + 0.00000149805745801143 * _AirFlow ^ 2 * _DpAir + -0.000000000111032560001635 * _AirFlow ^ 3 * _DpAir + 0.172214842081996 * _DpAir ^ 2 + -0.0000000124771957877461 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000184991797288862 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0183501952142997 * _DpAir ^ 3 + 0.00000590125621365527 * _AirFlow * _DpAir ^ 3 + -0.000000000577711933815366 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.0000000000000113583407714607 * _AirFlow ^ 3 * _DpAir ^ 3 + -0.0000000000000237546009467199 * _AirFlow ^ 4 + 0.00000000000000306746921878266 * _AirFlow ^ 4 * _DpAir + -7.65937101445654E-17 * _AirFlow ^ 4 * _DpAir ^ 2 + 5.62667751767365E-19 * _AirFlow ^ 4 * _DpAir ^ 3 + 0.000191037846886194 * _DpAir ^ 4 + -0.0000000659419371121491 * _AirFlow * _DpAir ^ 4 + 0.00000000000747392804554599 * _AirFlow ^ 2 * _DpAir ^ 4 + -0.000000000000000278168354605524 * _AirFlow ^ 3 * _DpAir ^ 4


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G800-AN36-94")


                'Radiated Noise [dB(A)] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadiatedNoise = +-573.613047071917 * 1 + 0.304513505828743 * _AirFlow + -0.000058547670560477 * _AirFlow ^ 2 + 0.00000000555538837455898 * _AirFlow ^ 3 + 72.7707444530833 * _DpAir + -0.0339821341364237 * _AirFlow * _DpAir + 0.0000060615426122866 * _AirFlow ^ 2 * _DpAir + -0.000000000517687582087051 * _AirFlow ^ 3 * _DpAir + -2.57085693541068 * _DpAir ^ 2 + 0.00111324291760706 * _AirFlow * _DpAir ^ 2 + -0.00000017392216956424 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.0000000000117925167728994 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0503003858279912 * _DpAir ^ 3 + -0.0000220067728592194 * _AirFlow * _DpAir ^ 3 + 0.00000000351522329191412 * _AirFlow ^ 2 * _DpAir ^ 3 + -0.000000000000247083979080045 * _AirFlow ^ 3 * _DpAir ^ 3 + -0.000000000000258564896556956 * _AirFlow ^ 4 + 0.0000000000000211070729211703 * _AirFlow ^ 4 * _DpAir + -0.000000000000000296770931497902 * _AirFlow ^ 4 * _DpAir ^ 2 + 6.56072624964189E-18 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.000406317824822225 * _DpAir ^ 4 + 0.000000185943888256077 * _AirFlow * _DpAir ^ 4 + -0.0000000000315859592488309 * _AirFlow ^ 2 * _DpAir ^ 4 + 0.00000000000000239333916499245 * _AirFlow ^ 3 * _DpAir ^ 4 + -6.90606873658444E-20 * _AirFlow ^ 4 * _DpAir ^ 4 + 4.72321582003371E-18 * _AirFlow ^ 5 + -3.24530776978904E-19 * _AirFlow ^ 5 * _DpAir



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AV02-01")

                'Radiated Noise [dB(A)] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadiatedNoise = +475.029630593302 * 1 + -0.115698737672168 * _AirFlow + 0.0000120176924339407 * _AirFlow ^ 2 + -0.000000000583874761151766 * _AirFlow ^ 3 + -16.3980762166434 * _DpAir + 0.00465114588126785 * _AirFlow * _DpAir + -0.000000469353854115589 * _AirFlow ^ 2 * _DpAir + 0.0000000000210871166283171 * _AirFlow ^ 3 * _DpAir + 0.427917509020553 * _DpAir ^ 2 + -0.000127214855160995 * _AirFlow * _DpAir ^ 2 + 0.0000000132726084232206 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000604826202733098 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00407694676105977 * _DpAir ^ 3 + 0.00000144046663416173 * _AirFlow * _DpAir ^ 3 + -0.000000000164049876203987 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.00000000000000788200412074584 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.0000000000000134956014605818 * _AirFlow ^ 4 + -0.000000000000000417679208857933 * _AirFlow ^ 4 * _DpAir + 1.18924623641993E-17 * _AirFlow ^ 4 * _DpAir ^ 2 + -1.61966280168321E-19 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.0000000029384918428149 * _AirFlow * _DpAir ^ 4 + 0.00000000000045821236615274 * _AirFlow ^ 2 * _DpAir ^ 4 + -2.33669575509739E-17 * _AirFlow ^ 3 * _DpAir ^ 4 + 4.45552707361413E-22 * _AirFlow ^ 4 * _DpAir ^ 4 + -1.19619984354954E-19 * _AirFlow ^ 5 + 2.81505653308864E-21 * _AirFlow ^ 5 * _DpAir + -7.71487271295456E-23 * _AirFlow ^ 5 * _DpAir ^ 2 + 1.12591401801238E-24 * _AirFlow ^ 5 * _DpAir ^ 3 + -2.46738055173719E-27 * _AirFlow ^ 5 * _DpAir ^ 4 + 0.0000000532815564046211 * _DpAir ^ 5 + -0.00000000000638589928126147 * _AirFlow * _DpAir ^ 5 + 0.000000000000000179948206810905 * _AirFlow ^ 2 * _DpAir ^ 5


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AU22-01")

                'Radiated Noise [dB(A)] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadiatedNoise = +-365.83236853405 * 1 + 0.105726472976857 * _AirFlow + -0.0000103494576654938 * _AirFlow ^ 2 + 0.000000000500269700928362 * _AirFlow ^ 3 + 17.6678139888588 * _DpAir + -0.00301001085739432 * _AirFlow * _DpAir + 0.000000129109964849646 * _AirFlow ^ 2 * _DpAir + 0.00000000000307097289274041 * _AirFlow ^ 3 * _DpAir + -0.0000799854135193802 * _AirFlow * _DpAir ^ 2 + 0.0000000171334854154397 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.00000000000132305004042947 * _AirFlow ^ 3 * _DpAir ^ 2 + 0.0022172985910358 * _DpAir ^ 3 + 0.000000642821335931288 * _AirFlow * _DpAir ^ 3 + -0.00000000019067001535803 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.0000000000000151889670931881 * _AirFlow ^ 3 * _DpAir ^ 3 + -0.0000000000000117981789194091 * _AirFlow ^ 4 + -0.000000000000000318069997998231 * _AirFlow ^ 4 * _DpAir + 4.36661861385287E-17 * _AirFlow ^ 4 * _DpAir ^ 2 + -4.76161227033602E-19 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.000128287943024569 * _DpAir ^ 4 + 0.0000000306200450196031 * _AirFlow * _DpAir ^ 4 + -0.00000000000305007709268656 * _AirFlow ^ 2 * _DpAir ^ 4 + 0.000000000000000167689096355244 * _AirFlow ^ 3 * _DpAir ^ 4 + -5.22701538378182E-21 * _AirFlow ^ 4 * _DpAir ^ 4 + 1.08506545621404E-19 * _AirFlow ^ 5 + 5.41022136896204E-21 * _AirFlow ^ 5 * _DpAir + -5.18907777587089E-22 * _AirFlow ^ 5 * _DpAir ^ 2 + 4.99232911145705E-24 * _AirFlow ^ 5 * _DpAir ^ 3 + 7.1829705160495E-26 * _AirFlow ^ 5 * _DpAir ^ 4 + 0.000000826577853933914 * _DpAir ^ 5 + -0.000000000237968253251376 * _AirFlow * _DpAir ^ 5 + 0.0000000000000281029657835444 * _AirFlow ^ 2 * _DpAir ^ 5 + -1.71034800358662E-18 * _AirFlow ^ 3 * _DpAir ^ 5 + 5.3527517477406E-23 * _AirFlow ^ 4 * _DpAir ^ 5 + -6.83638905940851E-28 * _AirFlow ^ 5 * _DpAir ^ 5


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AS22-01")

                'Radiated Noise [dB(A)] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadiatedNoise = +-182.820785801408 * 1 + 0.0704617836228374 * _AirFlow + -0.0000084136074707818 * _AirFlow ^ 2 + 0.000000000504686596210917 * _AirFlow ^ 3 + 15.8337975524434 * _DpAir + -0.00449336060264252 * _AirFlow * _DpAir + 0.000000509340748636439 * _AirFlow ^ 2 * _DpAir + -0.0000000000282577167121031 * _AirFlow ^ 3 * _DpAir + -0.0000290011018547247 * _AirFlow * _DpAir ^ 2 + 0.00000000718705274826463 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.000000000000659921954102539 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000880028875715583 * _DpAir ^ 3 + 0.000000957875788578876 * _AirFlow * _DpAir ^ 3 + -0.000000000198978701292254 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.0000000000000168472665925387 * _AirFlow ^ 3 * _DpAir ^ 3 + -0.0000000000000147682220949166 * _AirFlow ^ 4 + 0.000000000000000750502640574184 * _AirFlow ^ 4 * _DpAir + 2.69000835979155E-17 * _AirFlow ^ 4 * _DpAir ^ 2 + -6.47098258662868E-19 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.0000445264975677935 * _DpAir ^ 4 + 0.0000000106887852575262 * _AirFlow * _DpAir ^ 4 + -0.00000000000095273387002084 * _AirFlow ^ 2 * _DpAir ^ 4 + 3.76093281143279E-17 * _AirFlow ^ 3 * _DpAir ^ 4 + -5.55865699145091E-22 * _AirFlow ^ 4 * _DpAir ^ 4 + 1.67470260354727E-19 * _AirFlow ^ 5 + -7.44315876363837E-21 * _AirFlow ^ 5 * _DpAir + -4.10890701311887E-22 * _AirFlow ^ 5 * _DpAir ^ 2 + 9.38372317940391E-24 * _AirFlow ^ 5 * _DpAir ^ 3



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G910-AO83-03")

                'Radiated Noise [dB(A)] - C. Gnesutta, April 27th, 2020. - OK- OK
                _thisRadiatedNoise = +-98.1743329438382 * 1 + 0.0552436547979827 * _AirFlow + -0.00000827144252454448 * _AirFlow ^ 2 + 0.000000000643704048609933 * _AirFlow ^ 3 + 13.6988633611933 * _DpAir + -0.00308698070407624 * _AirFlow * _DpAir + 0.000000000041775167668389 * _AirFlow ^ 3 * _DpAir + 0.235885813590409 * _DpAir ^ 2 + -0.000357254187807069 * _AirFlow * _DpAir ^ 2 + 0.000000111091349605096 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000133854320356418 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0210840034104779 * _DpAir ^ 3 + 0.0000183796417687518 * _AirFlow * _DpAir ^ 3 + -0.00000000487116249061919 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.000000000000544016377651882 * _AirFlow ^ 3 * _DpAir ^ 3 + -0.0000000000000251294119663686 * _AirFlow ^ 4 + -0.00000000000000322250698087929 * _AirFlow ^ 4 * _DpAir + 0.00000000000000069778271204842 * _AirFlow ^ 4 * _DpAir ^ 2 + -2.70488435535572E-17 * _AirFlow ^ 4 * _DpAir ^ 3 + 0.000106892702132537 * _DpAir ^ 4 + -0.000000157042214124086 * _AirFlow * _DpAir ^ 4 + 0.0000000000464803208365277 * _AirFlow ^ 2 * _DpAir ^ 4 + -0.00000000000000528658022939284 * _AirFlow ^ 3 * _DpAir ^ 4 + 2.58026608017745E-19 * _AirFlow ^ 4 * _DpAir ^ 4 + 3.89503719784021E-19 * _AirFlow ^ 5 + 7.29545041002499E-20 * _AirFlow ^ 5 * _DpAir + -1.33230226236876E-20 * _AirFlow ^ 5 * _DpAir ^ 2 + 5.00512489278593E-22 * _AirFlow ^ 5 * _DpAir ^ 3 + -4.68274120075523E-24 * _AirFlow ^ 5 * _DpAir ^ 4 + 0.00000175563416026175 * _DpAir ^ 5 + -0.000000000443658081725351 * _AirFlow * _DpAir ^ 5 + 0.0000000000000263375717546785 * _AirFlow ^ 2 * _DpAir ^ 5



                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G990-AY28-01")

                'Radiated Noise [dB(A)] - C. Gnesutta, April 28th, 2020. - OK- OK
                _thisRadiatedNoise = +33.2517929066518 * 1 + 0.00312229885680352 * _AirFlow + -0.0000000606665820371659 * _AirFlow ^ 2 + 0.000000000000419261474594239 * _AirFlow ^ 3 + 0.835581752911954 * _DpAir + -0.0000871501066505628 * _AirFlow * _DpAir + 0.00000000252497684273394 * _AirFlow ^ 2 * _DpAir + -0.0000000000000182895283730607 * _AirFlow ^ 3 * _DpAir + 0.0116693885594583 * _DpAir ^ 2 + -0.00000149303103624006 * _AirFlow * _DpAir ^ 2 + 0.0000000000756881219390475 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.00000000000000129041488697724 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00000724110899156954 * _DpAir ^ 3


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "A3G990-AZ02-01")

                'Radiated Noise [dB(A)] - C. Gnesutta, April 28th, 2020. - OK- OK
                _thisRadiatedNoise = +-345.154615010995 * 1 + 0.104111538593891 * _AirFlow + -0.0000113162427997911 * _AirFlow ^ 2 + 0.000000000670570403713772 * _AirFlow ^ 3 + -22.2617514930105 * _DpAir + 0.00741341763571643 * _AirFlow * _DpAir + -0.000000882825581559275 * _AirFlow ^ 2 * _DpAir + 0.0000000000507550512178886 * _AirFlow ^ 3 * _DpAir + 1.40485234541214 * _DpAir ^ 2 + -0.000398515948901016 * _AirFlow * _DpAir ^ 2 + 0.0000000402899966045935 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.00000000000181097418905698 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0174830110925059 * _DpAir ^ 3 + 0.00000507855381944882 * _AirFlow * _DpAir ^ 3 + -0.000000000482484201271934 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.0000000000000172037625097859 * _AirFlow ^ 3 * _DpAir ^ 3 + -0.0000000000000223028038635239 * _AirFlow ^ 4 + -0.00000000000000152969398645717 * _AirFlow ^ 4 * _DpAir + 3.33749663412367E-17 * _AirFlow ^ 4 * _DpAir ^ 2 + -5.05701810607432E-20 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.0000262820562359811 * _DpAir ^ 4 + 0.00000000181063864256037 * _AirFlow * _DpAir ^ 4 + -0.00000000000039880580338639 * _AirFlow ^ 2 * _DpAir ^ 4 + 7.26207373784935E-17 * _AirFlow ^ 3 * _DpAir ^ 4 + -4.65467801790864E-21 * _AirFlow ^ 4 * _DpAir ^ 4 + 3.90671283989731E-19 * _AirFlow ^ 5 + 2.33326099383567E-20 * _AirFlow ^ 5 * _DpAir + -4.40007668018237E-23 * _AirFlow ^ 5 * _DpAir ^ 2 + -9.42613357488715E-24 * _AirFlow ^ 5 * _DpAir ^ 3 + 1.19897470035631E-25 * _AirFlow ^ 5 * _DpAir ^ 4 + 0.000000575204551923171 * _DpAir ^ 5 + -0.000000000126479364164412 * _AirFlow * _DpAir ^ 5 + 0.0000000000000119408507201288 * _AirFlow ^ 2 * _DpAir ^ 5 + -6.10968483769042E-19 * _AirFlow ^ 3 * _DpAir ^ 5 + 1.61238678343117E-23 * _AirFlow ^ 4 * _DpAir ^ 5 + -1.52900587711935E-28 * _AirFlow ^ 5 * _DpAir ^ 5 + -2.80085470795775E-24 * _AirFlow ^ 6 + -1.42641019686891E-25 * _AirFlow ^ 6 * _DpAir + -3.79215293721304E-27 * _AirFlow ^ 6 * _DpAir ^ 2 + 1.4294922545685E-28 * _AirFlow ^ 6 * _DpAir ^ 3 + -1.04563653996585E-30 * _AirFlow ^ 6 * _DpAir ^ 4 + -5.90534549998361E-34 * _AirFlow ^ 6 * _DpAir ^ 5 + 0.0000000000171646343970744 * _DpAir ^ 6



                '##########################################################################################################################
                'EC FANS - ZIEHL ABBEGG


                'Radiated Noise [dB(A)] - Ziehl-Abbegg - C. Gnesutta, May 04th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN050-ZIS-DC-V7P2")

                _thisRadiatedNoise = +253.498701919421 * 1 + -0.140411217311682 * _AirFlow + 0.0000365124056164765 * _AirFlow ^ 2 + -0.00000000391319629085366 * _AirFlow ^ 3 + -9.28774736559765 * _DpAir + 0.00633023682552818 * _AirFlow * _DpAir + -0.00000158947615625954 * _AirFlow ^ 2 * _DpAir + 0.000000000180257799928696 * _AirFlow ^ 3 * _DpAir + 0.153432354507981 * _DpAir ^ 2 + -0.0000996737437464771 * _AirFlow * _DpAir ^ 2 + 0.0000000245795078204314 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.00000000000286216716329018 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000989815194806055 * _DpAir ^ 3 + 0.000000666823541400615 * _AirFlow * _DpAir ^ 3 + -0.000000000167495116486375 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.0000000000000196177997576068 * _AirFlow ^ 3 * _DpAir ^ 3 + 0.000000000000151043233909973 * _AirFlow ^ 4 + -0.00000000000000790067553672346 * _AirFlow ^ 4 * _DpAir + 0.000000000000000133187923072882 * _AirFlow ^ 4 * _DpAir ^ 2 + -9.02754882611139E-19 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.000000118265477343911 * _DpAir ^ 4




                'Radiated Noise [dB(A)]- Ziehl-Abbegg - C. Gnesutta, May 04th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "FN063-ZIS-GL-V7P3")
                _thisRadiatedNoise = +33.1669863214463 * 1 + 0.00636127770128771 * _AirFlow + -0.000000284183410592077 * _AirFlow ^ 2 + 0.00000000000524246249940607 * _AirFlow ^ 3 + 0.707498725561803 * _DpAir + -0.000140768839944776 * _AirFlow * _DpAir + 0.00000000910928529788752 * _AirFlow ^ 2 * _DpAir + -0.000000000000191389207482509 * _AirFlow ^ 3 * _DpAir + -0.001223309178974 * _DpAir ^ 2 + 0.000000323335928944895 * _AirFlow * _DpAir ^ 2 + -0.0000000000217190868388456 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.000000000000000442847624421216 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000000466792312742038 * _DpAir ^ 3




                'Radiated Noise [dB(A)] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020.  - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN063-ZIS-DG-V7P2")
                _thisRadiatedNoise = +394.85320998791 * 1 + -0.154291829939098 * _AirFlow + 0.0000255879107332859 * _AirFlow ^ 2 + -0.00000000177773283201585 * _AirFlow ^ 3 + -9.18345951835486 * _DpAir + 0.00334249159804454 * _AirFlow * _DpAir + -0.000000367347702708977 * _AirFlow ^ 2 * _DpAir + 0.0000000000125001330811424 * _AirFlow ^ 3 * _DpAir + 0.0840733969503673 * _DpAir ^ 2 + -0.0000286287338208457 * _AirFlow * _DpAir ^ 2 + 0.00000000285922250612982 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000844249056827644 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000126463599906424 * _DpAir ^ 3 + 0.0000000362559172643469 * _AirFlow * _DpAir ^ 3 + -0.00000000000231559976292771 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.0000000000000444632370200839 * _AirFlow ^ 4





                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€


                'Radiated Noise [dB(A)] - Ziehl-Abbegg - C. Gnesutta, May 18th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN080-ZIS-GG-V7P3")
                _thisRadiatedNoise = +19.0098433229613 * 1 + 0.00619966494823283 * _AirFlow + -0.000000236274737519782 * _AirFlow ^ 2 + 0.00000000000358502527551802 * _AirFlow ^ 3 + 1.4760452407492 * _DpAir + -0.000272494792218287 * _AirFlow * _DpAir + 0.0000000163541500024744 * _AirFlow ^ 2 * _DpAir + -0.000000000000324395062176992 * _AirFlow ^ 3 * _DpAir + -0.00644850540750542 * _DpAir ^ 2 + 0.00000151557884916913 * _AirFlow * _DpAir ^ 2 + -0.000000000101242842754176 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000216911736374821 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00000235042499235987 * _DpAir ^ 3



                'Radiated Noise [dB(A)] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020. - OK- OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021

            Case (_FanName = "FN080-ZIS-DG-V5P4")

                _thisRadiatedNoise = +24.5102957712175 * 1 + 0.0057927646734459 * _AirFlow + -0.000000271752305447718 * _AirFlow ^ 2 + 0.00000000000614377407139796 * _AirFlow ^ 3 + 1.9152378674087 * _DpAir + -0.000447574367431568 * _AirFlow * _DpAir + 0.0000000353667100309583 * _AirFlow ^ 2 * _DpAir + -0.000000000000933165207516939 * _AirFlow ^ 3 * _DpAir + -0.00480658387440416 * _DpAir ^ 2 + 0.00000249697030378853 * _AirFlow * _DpAir ^ 2 + -0.000000000240500566649471 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000699696342683849 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0000181036865442916 * _DpAir ^ 3



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€




                'Radiated Noise [dB(A)] - Ziehl-Abbegg - C. Gnesutta, May 12th, 2020. - OK - OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-GL-V5P1")

                _thisRadiatedNoise = +37.4770463167789 * 1 + 0.00262204613966928 * _AirFlow + -0.0000000489186234071167 * _AirFlow ^ 2 + 0.000000000000493358592148682 * _AirFlow ^ 3 + -3.36322384094763 * _DpAir + 0.000746144993813491 * _AirFlow * _DpAir + -0.0000000555711663183753 * _AirFlow ^ 2 * _DpAir + 0.00000000000171182093605826 * _AirFlow ^ 3 * _DpAir + 0.10807426618969 * _DpAir ^ 2 + -0.0000219859099130242 * _AirFlow * _DpAir ^ 2 + 0.00000000156657178301082 * _AirFlow ^ 2 * _DpAir ^ 2 + -0.0000000000000468555555871884 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.0004774042460717 * _DpAir ^ 3 + 0.000000101035681440907 * _AirFlow * _DpAir ^ 3 + -0.00000000000721042518050723 * _AirFlow ^ 2 * _DpAir ^ 3 + 0.000000000000000211008236171915 * _AirFlow ^ 3 * _DpAir ^ 3 + -1.88505929290513E-17 * _AirFlow ^ 4 * _DpAir + 5.04671198377025E-19 * _AirFlow ^ 4 * _DpAir ^ 2 + -2.20517876039695E-21 * _AirFlow ^ 4 * _DpAir ^ 3 + -0.000000191923012682654 * _DpAir ^ 4 + 0.00000000001019135641675 * _AirFlow * _DpAir ^ 4


                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-GG-V5P1")


                'Radiated Noise [dB(A)] - Ziehl-Abbegg - C. Gnesutta, May 19th, 2020. -OK FINALE
                _thisRadiatedNoise = +4.18651705664014 * 1 + 0.00915473314320394 * _AirFlow + -0.00000046972985765301 * _AirFlow ^ 2 + 0.0000000000092394860893822 * _AirFlow ^ 3 + 2.26036042034284 * _DpAir + -0.00038005998546966 * _AirFlow * _DpAir + 0.0000000216167272408542 * _AirFlow ^ 2 * _DpAir + -0.000000000000405466753652925 * _AirFlow ^ 3 * _DpAir + -0.00908355846089056 * _DpAir ^ 2 + 0.00000180509697212294 * _AirFlow * _DpAir ^ 2 + -0.000000000106549870228027 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000200023764532884 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00000229252796568692 * _DpAir ^ 3

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN091-ZIS-DG-V4P3")

                'Radiated Noise [dB(A)] - Ziehl-Abbegg - C. Gnesutta, May 19th, 2020. -OK FINALE
                _thisRadiatedNoise = +23.6625196235767 * 1 + 0.00452308837673287 * _AirFlow + -0.000000156748849846967 * _AirFlow ^ 2 + 0.000000000002409990613721 * _AirFlow ^ 3 + 1.53126595918158 * _DpAir + -0.00027890795330352 * _AirFlow * _DpAir + 0.0000000170154454780478 * _AirFlow ^ 2 * _DpAir + -0.000000000000348293863873192 * _AirFlow ^ 3 * _DpAir + 0.00139684264858354 * _DpAir ^ 2



                '€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€

                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN100-ZIS-GL-V5P1")

                'Radiated Noise [dB(A)] - Ziehl-Abbegg - C. Gnesutta, May 14th, 2020. -OK FINALE
                _thisRadiatedNoise = +15.1541919157856 * 1 + 0.00552396882510027 * _AirFlow + -0.000000201900610912534 * _AirFlow ^ 2 + 0.00000000000291549938284188 * _AirFlow ^ 3 + 3.76731301760619 * _DpAir + -0.00067501207066166 * _AirFlow * _DpAir + 0.0000000378137421522971 * _AirFlow ^ 2 * _DpAir + -0.000000000000638893541468003 * _AirFlow ^ 3 * _DpAir + -0.0345180486259499 * _DpAir ^ 2 + 0.00000787458948036465 * _AirFlow * _DpAir ^ 2 + -0.000000000482886171860326 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.00000000000000848038384465182 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.000000011390140998205 * _AirFlow * _DpAir ^ 3 + 0.000000000000968678496039762 * _AirFlow ^ 2 * _DpAir ^ 3 + -1.89634895652747E-17 * _AirFlow ^ 3 * _DpAir ^ 3




                'Radiated Noise [dB(A)] - Ziehl-Abbegg - C. Gnesutta, May 04th, 2020. - OK - OK-OK FINALE
                'OK- cambiato da C. Gnesutta il 27 Gennaio 2021
            Case (_FanName = "FN100-ZIS-GG-V5P1")
                _thisRadiatedNoise = +16.8867575296634 * 1 + 0.00504622391095231 * _AirFlow + -0.000000174679129767886 * _AirFlow ^ 2 + 0.00000000000251195528813763 * _AirFlow ^ 3 + 2.26917017259848 * _DpAir + -0.000338182892862192 * _AirFlow * _DpAir + 0.0000000167778442860382 * _AirFlow ^ 2 * _DpAir + -0.00000000000027059962369263 * _AirFlow ^ 3 * _DpAir + -0.00918142885362296 * _DpAir ^ 2 + 0.0000018822982155574 * _AirFlow * _DpAir ^ 2 + -0.000000000103846378347625 * _AirFlow ^ 2 * _DpAir ^ 2 + 0.0000000000000017604799113018 * _AirFlow ^ 3 * _DpAir ^ 2 + -0.00000588811042323577 * _DpAir ^ 3


                '##########################################################################################################################


            Case Else

        End Select


        Return _thisRadiatedNoise
    End Function


End Class
