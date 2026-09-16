export interface PefMachine {
  id: string
  modelCode: string
  fanCode: string
  coilCode?: string | null
  series?: string | null
  fanType?: string | null
  fanNumber?: string | number | null
  rows?: string | number | null
  length?: string | number | null
  width?: string | number | null
  height?: string | number | null
  quantity?: number
  fanQuantity?: number
}

export interface ResultDataProps {
  selectedMachine: PefMachine | null
}
