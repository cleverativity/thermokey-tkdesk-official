Imports System.Math
Public Class FanNoiseMachine
    Dim _MachineFanNoise As Double
    Dim _FanTotalNoisePowerLevel As Double

    Public Property MachineFanNoise() As Double
        Get

            Me._MachineFanNoise = FanTotalNoisePowerLevel - 10 * Math.Log10((MachineLength + 2 * DistanceFromMachine) * 2 * (MachineHeight + DistanceFromMachine) + (MachineLength + 2 * DistanceFromMachine) * (MachineWidth + 2 * DistanceFromMachine) + (MachineWidth + 2 * DistanceFromMachine) * 2 * (MachineHeight + DistanceFromMachine))

            Return _MachineFanNoise
        End Get
        Set(ByVal Value As Double)
            _MachineFanNoise = Value
        End Set
    End Property

    Dim _TotalLWA As Double
    Dim _MachineLength As Double
    Dim _MachineHeight As Double
    Dim _MachineWidth As Double
    Dim _DistanceFromMachine As Double
    Dim _FanRowsNumber As Int16

    Dim _FanNumberPerEachRow As Int16


    Public Property FanRowsNumber() As Double
        Get
            Return _FanRowsNumber
        End Get
        Set(ByVal Value As Double)
            _FanRowsNumber = Value
        End Set
    End Property

    Public Property FanNumberPerEachRow() As Double
        Get
            Return _FanNumberPerEachRow
        End Get
        Set(ByVal Value As Double)
            _FanNumberPerEachRow = Value
        End Set
    End Property

    Public Property TotalLWA() As Double
        Get
            Return _TotalLWA
        End Get
        Set(ByVal Value As Double)
            _TotalLWA = Value
        End Set
    End Property

    Public Property FanTotalNoisePowerLevel() As Double
        Get
            Me._FanTotalNoisePowerLevel = TotalLWA + 10 * Math.Log10(FanRowsNumber * FanNumberPerEachRow)
            Return _FanTotalNoisePowerLevel
        End Get
        Set(ByVal value As Double)
            _FanTotalNoisePowerLevel = value
        End Set

    End Property

    Public Property MachineLength() As Double
        Get
            Return _MachineLength
        End Get
        Set(ByVal Value As Double)
            _MachineLength = Value
        End Set
    End Property

    Public Property MachineHeight() As Double
        Get
            Return _MachineHeight
        End Get
        Set(ByVal Value As Double)
            _MachineHeight = Value
        End Set
    End Property

    Public Property MachineWidth() As Double
        Get
            Return _MachineWidth
        End Get
        Set(ByVal Value As Double)
            _MachineWidth = Value
        End Set
    End Property

    Public Property DistanceFromMachine() As Double
        Get
            Return _DistanceFromMachine
        End Get
        Set(ByVal Value As Double)
            _DistanceFromMachine = Value
        End Set
    End Property

End Class

