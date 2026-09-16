interface SelectionBack {
  id?: number | string
  status?: 'created' | 'use_case_selected' | 'solved' | 'detailed' | 'completed'
  input_data?: any
  output_data?: any
  detail_data?: any
  macro_serie?: string
  user?: User
}
