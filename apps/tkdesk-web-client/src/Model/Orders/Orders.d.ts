interface OrderFront {
  id?: number
  status?: string
  created_at?: string
  calculation: CalculationFront
}

interface OrderBack {
  id?: number
  status?: string
  created_at?: string
  calculation: CalculationBack
}
