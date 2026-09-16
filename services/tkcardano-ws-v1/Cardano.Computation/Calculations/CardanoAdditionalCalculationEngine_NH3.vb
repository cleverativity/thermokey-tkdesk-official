Public Class CardanoAdditionalCalculationEngine_NH3

#Region "Thermodynamics"

    'NH3 engine for TkMicro25/NH3 coils (non-standard DeSuperheat and non-standard SubCooling).
    Dim TkMicro25_NH3_AdditionalEngine As New Extended_CalculationEngineNH3_TkMicro25


    'NH3 engine for TkMicro32/NH3 coils (non-standard DeSuperheat and non-standard SubCooling).
    Dim TkMicro32_NH3_AdditionalEngine As New Extended_CalculationEngineNH3_TkMicro32


    ' OK. Aggiunta da C. Gnesutta il 23 Luglio 2019.
    Public Function DerivativeDeSuperheating_TkMicro25_NH3(ByVal CoilType As String, ByVal CoilLength As Double, ByVal AirFlow As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedDeSuperheatingDerivativeTkMicro25_NH3 As Double = 0


        Dim FirstTermTkMicro25_NH3 As Double = TkMicro25_NH3_AdditionalEngine.TkMicro25_CoilCapacityDS_65_SubCooling3(CoilType, CoilLength, AirFlow, AirPressure)
        Dim SecondTermTkMicro25_NH3 As Double = TkMicro25_NH3_AdditionalEngine.TkMicro25_CoilCapacityDS_55_SubCooling3(CoilType, CoilLength, AirFlow, AirPressure)

        'OK - Checked by C. Gnesutta on July 23rd, 2019.
        thisRequestedDeSuperheatingDerivativeTkMicro25_NH3 = (FirstTermTkMicro25_NH3 - SecondTermTkMicro25_NH3) / 10


        Return thisRequestedDeSuperheatingDerivativeTkMicro25_NH3

    End Function


    ' OK. Aggiunta da C. Gnesutta il 23 Luglio 2019.
    Public Function DerivativeDeSuperheating_TkMicro32_NH3(ByVal CoilType As String, ByVal CoilLength As Double, ByVal AirFlow As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedDeSuperheatingDerivativeTkMicro32_NH3 As Double = 0


        Dim FirstTermTkMicro32_NH3 As Double = TkMicro32_NH3_AdditionalEngine.TkMicro32_CoilCapacityDS_65_SubCooling3(CoilType, CoilLength, AirFlow, AirPressure)


        Dim SecondTermTkMicro32_NH3 As Double = TkMicro32_NH3_AdditionalEngine.TkMicro32_CoilCapacityDS_55_SubCooling3(CoilType, CoilLength, AirFlow, AirPressure)


        'OK . Added by C. Gnesutta on July 23rd, 2019.
        thisRequestedDeSuperheatingDerivativeTkMicro32_NH3 = (FirstTermTkMicro32_NH3 - SecondTermTkMicro32_NH3) / 10



        'OK - Checked by C. Gnesutta on July 23rd, 2019.
        Return thisRequestedDeSuperheatingDerivativeTkMicro32_NH3
    End Function



    ' OK. Aggiunta da C. Gnesutta il 23 Luglio 2019.
    Public Function DerivativeSubCooling_TkMicro25_NH3(ByVal CoilType As String, ByVal CoilLength As Double, ByVal AirFlow As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedSubCoolingDerivativeTkMicro25_NH3 As Double = 0


        Dim FirstTermTkMicro25_NH3 As Double = TkMicro25_NH3_AdditionalEngine.TkMicro25_CoilCapacityDS_65_SubCooling8(CoilType, CoilLength, AirFlow, AirPressure)

        Dim SecondTermTkMicro25_NH3 As Double = TkMicro25_NH3_AdditionalEngine.TkMicro25_CoilCapacityDS_65_SubCooling3(CoilType, CoilLength, AirFlow, AirPressure)


        'OK - Checked by C. Gnesutta on July 23rd, 2019.
        thisRequestedSubCoolingDerivativeTkMicro25_NH3 = (FirstTermTkMicro25_NH3 - SecondTermTkMicro25_NH3) / 5


        Return thisRequestedSubCoolingDerivativeTkMicro25_NH3
    End Function



    ' OK. Aggiunta da C. Gnesutta il 23 Luglio 2019.
    Public Function DerivativeSubCooling_TkMicro32_NH3(ByVal CoilType As String, ByVal CoilLength As Double, ByVal AirFlow As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedSubCoolingDerivative As Double = 0

        Dim FirstTermTkMicro32_NH3 As Double = TkMicro32_NH3_AdditionalEngine.TkMicro32_CoilCapacityDS_65_SubCooling8(CoilType, CoilLength, AirFlow, AirPressure)


        Dim SecondTermTkMicro32_NH3 As Double = TkMicro32_NH3_AdditionalEngine.TkMicro32_CoilCapacityDS_65_SubCooling3(CoilType, CoilLength, AirFlow, AirPressure)



        'OK - Checked by C. Gnesutta on July 23rd, 2019.
        thisRequestedSubCoolingDerivative = (FirstTermTkMicro32_NH3 - SecondTermTkMicro32_NH3) / 5

        Return thisRequestedSubCoolingDerivative
    End Function


    ' OK. Aggiunta da C. Gnesutta il 23 Luglio 2019.
    Public Function CapacityDeSuperheating_TkMicro25_NH3(ByVal CoilType As String, ByVal CoilLength As Double, ByVal AirFlow As Double, ByVal DeltaTemperatureDeSuperheating As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedDeSuperheatingCapacity_TkMicro25_NH3 As Double = 0

        Dim thisDerivative_TkMicro25_NH3 As Double = Me.DerivativeDeSuperheating_TkMicro25_NH3(CoilType, CoilLength, AirFlow, AirPressure)

        ' Punto linearizzazione

        thisRequestedDeSuperheatingCapacity_TkMicro25_NH3 = (DeltaTemperatureDeSuperheating - 25) * thisDerivative_TkMicro25_NH3

        Return thisRequestedDeSuperheatingCapacity_TkMicro25_NH3
    End Function


    ' OK. Aggiunta da C. Gnesutta il 23 Luglio 2019.
    Public Function CapacitySubCooling_TkMicro25_NH3(ByVal CoilType As String, ByVal CoilLength As Double, ByVal AirFlow As Double, ByVal DeltaTemperatureSubCooling_TkMicro25_NH3 As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedSubCoolingCapacity_TkMicro25_NH3 As Double = 0

        Dim thisDerivative_TkMicro25_NH3 As Double = Me.DerivativeSubCooling_TkMicro25_NH3(CoilType, CoilLength, AirFlow, AirPressure)

        ' Punto linearizzazione

        thisRequestedSubCoolingCapacity_TkMicro25_NH3 = (DeltaTemperatureSubCooling_TkMicro25_NH3 - 3) * thisDerivative_TkMicro25_NH3

        Return thisRequestedSubCoolingCapacity_TkMicro25_NH3
    End Function


    ' OK. Aggiunta da C. Gnesutta il 23 Luglio 2019.
    Public Function CapacityDeSuperheating_TkMicro32_NH3(ByVal CoilType As String, ByVal CoilLength As Double, ByVal AirFlow As Double, ByVal DeltaTemperatureDeSuperheating_TkMicro32_NH3 As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedDeSuperheatingCapacity_TkMicro32_NH3 As Double = 0

        Dim thisDerivative_TkMicro32_NH3 As Double = Me.DerivativeDeSuperheating_TkMicro32_NH3(CoilType, CoilLength, AirFlow, AirPressure)

        ' Punto linearizzazione

        thisRequestedDeSuperheatingCapacity_TkMicro32_NH3 = (DeltaTemperatureDeSuperheating_TkMicro32_NH3 - 60) * thisDerivative_TkMicro32_NH3

        Return thisRequestedDeSuperheatingCapacity_TkMicro32_NH3
    End Function



    ' OK. Added by C. Gnesutta on July 23rd,  2019.
    Public Function CapacitySubCooling_TkMicro32_NH3(ByVal CoilType As String, ByVal CoilLength As Double, ByVal AirFlow As Double, ByVal DeltaTemperatureSubCooling_TkMicro32_NH3 As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedSubCoolingCapacity_TkMicro32_NH3 As Double = 0

        Dim thisDerivative_TkMicro32_NH3 As Double = Me.DerivativeSubCooling_TkMicro32_NH3(CoilType, CoilLength, AirFlow, AirPressure)


        ' Linearization point. C. Gnesutta, July 23rd, 2019.
        thisRequestedSubCoolingCapacity_TkMicro32_NH3 = (DeltaTemperatureSubCooling_TkMicro32_NH3 - 3) * thisDerivative_TkMicro32_NH3

        Return thisRequestedSubCoolingCapacity_TkMicro32_NH3
    End Function



#End Region

End Class
