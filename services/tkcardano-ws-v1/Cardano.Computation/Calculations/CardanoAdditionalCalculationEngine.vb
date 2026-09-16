' Added by  C. Gnesutta on November 13th, 2013 
Public Class CardanoAdditionalCalculationEngine

    ' The purpose of the following equations is to allow the calculation of the thermal capacity for non-standard DeSuperHeating and SubCooling values
    ' Created by  P. Guasti and C. Gnesutta on November 13th, 2013
#Region "Thermodynamics"

    Dim CardanoAdditionalEngine As New CardanoExtendedCalculationFebruary2014

    ' OK. Ricontrollato da Cristiano Gnesutta il 13 Marzo 2015
    Public Function DerivativeDeSuperheating(ByVal CoilType As String, ByVal CoilLength As Double, ByVal RefType As String, ByVal AirFlow As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedDeSuperheatingDerivative As Double = 0

        Dim FirstTerm As Double = CardanoAdditionalEngine.CoilCapacityDS28_SubCooling3(CoilType, CoilLength, RefType, AirFlow, AirPressure)
        Dim SecondTerm As Double = CardanoAdditionalEngine.CoilCapacityDS22_SubCooling3(CoilType, CoilLength, RefType, AirFlow, AirPressure)

        thisRequestedDeSuperheatingDerivative = (FirstTerm - SecondTerm) / 6

        Return thisRequestedDeSuperheatingDerivative
    End Function


    ' OK. Ricontrollato da Cristiano Gnesutta il 13 Marzo 2015
    Public Function DerivativeSubCooling(ByVal CoilType As String, ByVal CoilLength As Double, ByVal RefType As String, ByVal AirFlow As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedSubCoolingDerivative As Double = 0

        Dim FirstTerm As Double = CardanoAdditionalEngine.CoilCapacityDS28_SubCooling8(CoilType, CoilLength, RefType, AirFlow, AirPressure)
        Dim SecondTerm As Double = CardanoAdditionalEngine.CoilCapacityDS28_SubCooling3(CoilType, CoilLength, RefType, AirFlow, AirPressure)

        thisRequestedSubCoolingDerivative = (FirstTerm - SecondTerm) / 5

        Return thisRequestedSubCoolingDerivative
    End Function

    ' OK. Ricontrollato da Cristiano Gnesutta il 13 Marzo 2015
    Public Function CapacityDeSuperheating(ByVal CoilType As String, ByVal CoilLength As Double, ByVal RefType As String, ByVal AirFlow As Double,
                                 ByVal DeltaTemperatureDeSuperheating As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedDeSuperheatingCapacity As Double = 0

        Dim thisDerivative As Double = Me.DerivativeDeSuperheating(CoilType, CoilLength, RefType, AirFlow, AirPressure)

        ' Punto linearizzazione

        thisRequestedDeSuperheatingCapacity = (DeltaTemperatureDeSuperheating - 25) * thisDerivative

        Return thisRequestedDeSuperheatingCapacity
    End Function

    ' OK. Ricontrollato da Cristiano Gnesutta il 13 Marzo 2015
    Public Function CapacitySubCooling(ByVal CoilType As String, ByVal CoilLength As Double, ByVal RefType As String, ByVal AirFlow As Double,
                                ByVal DeltaTemperatureSubCooling As Double, ByVal AirPressure As Double) As Double

        Dim thisRequestedSubCoolingCapacity As Double = 0
        Dim thisDerivative As Double = Me.DerivativeSubCooling(CoilType, CoilLength, RefType, AirFlow, AirPressure)

        ' Punto linearizzazione

        thisRequestedSubCoolingCapacity = (DeltaTemperatureSubCooling - 3) * thisDerivative

        Return thisRequestedSubCoolingCapacity
    End Function

#End Region

#Region "Humidity"

#End Region

End Class


