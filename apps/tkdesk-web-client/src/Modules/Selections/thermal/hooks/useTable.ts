
import { ConsoleLogger } from 'aws-amplify/utils'
import { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import * as APISettings from 'Api/Thermal/api/endpoints'

interface CondenserProps {
  params?: SearchParameters
  onUpdateParams?: any
  getComputationResult?: (payload: any, parameters?: SearchParameters) => Promise<{ data: any; error?: any; pagination?: any }>
}

function useTable(props: CondenserProps) {

  const { filters, pagination, query } = props.params || {}
  const computationResultApi = props.getComputationResult || APISettings.getComputationResult

  const log = new ConsoleLogger('Modules/Selections/Thermal/hooks/useTable')
  const [getDataTable, setGetDataTable] = useState<any>([])
  const [tableResults, setTableResults] = useState<any>([])
  const [tableLoading, setTableLoading] = useState<boolean>(false)

  const setDataTable = useCallback((payload: any) => {
    const hasRequestBody =
      payload &&
      typeof payload === 'object' &&
      !Array.isArray(payload) &&
      Object.keys(payload).length > 0
    if (hasRequestBody) {
      setTableLoading(true)
    }
    setGetDataTable(payload)
  }, [])
  const [tablePagination, setTablePagination] = useState<any>(
    pagination || {
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} of ${total} items`,
    },
  )
  const [searchQuery, setSearchQuery] = useState<string>(query || '')

  useEffect(() => {
    const fetchData = async () => {
      setTableLoading(true)
      try {
        const { data, pagination: apiPagination } =
          await computationResultApi(getDataTable, {
            pagination: tablePagination,
            filters,
            orders: [],
            query: searchQuery,
          })

        log.info('handleSubmitValues', {
          pagination: apiPagination,
          data,
          tablePagination,
        })

        // Extract results from the API response
        if (data && data.results && Array.isArray(data.results)) {
          setTableResults(data.results)
          // Update pagination with API response
          if (apiPagination) {
            setTablePagination({
              ...tablePagination,
              pageSize: apiPagination.pageSize || tablePagination.pageSize,
              total: apiPagination.total || data.results.length,
            })
          }
          log.info('handleTableChange: with Results word in json', data)
        } else if (data && !data.results) {
          setTableResults(data)
          if (apiPagination) {
            setTablePagination({
              ...tablePagination,
              pageSize: apiPagination.pageSize || tablePagination.pageSize,
              total: apiPagination.total || (Array.isArray(data) ? data.length : 0)
            })
          }
          log.info('handleTableChange: No Results word in json', data)
        } else {
          log.warn('No results found in API response')
          setTableResults([])
          setTablePagination({
            ...tablePagination,
            total: 0,
          })
        }
      } catch (error) {
        log.error('Error fetching computation result:', error)
        setTableResults([])
      } finally {
        setTableLoading(false)
      }
    }

    if (getDataTable && Object.keys(getDataTable).length > 0) {
      fetchData()
    }
  }, [getDataTable, searchQuery])


  const handleTableChange = (
    newPagination: any,
    filters: string[],
    orders: string[],
  ) => {
    // Update local pagination state
    setTablePagination(newPagination)

    // Refetch data with new pagination if we have initial data
    if (getDataTable && Object.keys(getDataTable).length > 0) {
      const fetchPaginatedData = async () => {
        setTableLoading(true)
        try {
          const { data, pagination: apiPagination } =
            await computationResultApi(getDataTable, {
              pagination: newPagination,
              filters,
              orders: [],
              query: searchQuery,
            })

          if (data && data.results && Array.isArray(data.results)) {
            setTableResults(data.results)
            // Update total if API provides it, but don't trigger infinite loop
            if (apiPagination && apiPagination.total !== newPagination.total) {
              setTablePagination({
                ...newPagination,
                total: apiPagination.total,
              })
            }
            log.info('handleTableChange: with Results word in json', data)
          } else if (data && !data.results) {

            if (Array.isArray(data)) {
              setTableResults(data)
              // Update total if API provides it, but don't trigger infinite loop
              if (apiPagination && apiPagination.total !== newPagination.total) {
                setTablePagination({
                  ...newPagination,
                  total: apiPagination.total,
                })
              }
              log.info('handleTableChange: No Results word in json', data)
            } else {
              setTableResults([])
            }

          }
          else {
            setTableResults([])
          }
        } catch (error) {
          log.error('Error fetching paginated data:', error)
          setTableResults([])
        } finally {
          setTableLoading(false)
        }
      }
      fetchPaginatedData()
    }

    // Update parent component if callback provided
    const { onUpdateParams, params: parameters } = props
    if (!_.isNil(onUpdateParams)) {
      onUpdateParams({
        ...parameters,
        filters,
        orders,
        pagination: newPagination,
      })
    }

    log.info('Table changed:', { newPagination, filters, orders })
  }


  const handleQueryChange = useCallback(
    _.debounce((newQuery: string) => {
      setSearchQuery(newQuery)

      // Reset pagination to first page when searching
      const resetPagination = {
        ...tablePagination,
        current: 1,
      }
      setTablePagination(resetPagination)

      // Refetch data with new query if we have initial data
      if (getDataTable && Object.keys(getDataTable).length > 0) {
        const fetchFilteredData = async () => {
          setTableLoading(true)
          try {
            const { data, pagination: apiPagination } =
              await computationResultApi(getDataTable, {
                pagination: resetPagination,
                filters,
                orders: [],
                query: newQuery,
              })

            if (data && data.results && Array.isArray(data.results)) {
              setTableResults(data.results)
              if (apiPagination) {
                setTablePagination({
                  ...resetPagination,
                  total: apiPagination.total,
                })
              }
            } else if (data && !data.results) {
              if (Array.isArray(data)) {
                setTableResults(data)
                if (apiPagination) {
                  setTablePagination({
                    ...resetPagination,
                    total: apiPagination.total,
                  })
                }
              } else {
                setTableResults([])
              }
            }

            else {
              setTableResults([])
              setTablePagination({
                ...resetPagination,
                total: 0,
              })
            }
          } catch (error) {
            log.error('Error fetching filtered data:', error)
            setTableResults([])
          } finally {
            setTableLoading(false)
          }
        }
        fetchFilteredData()
      }

      // Update parent component
      const { onUpdateParams, params: parameters } = props
      if (!_.isNil(onUpdateParams)) {
        onUpdateParams({
          ...parameters,
          query: newQuery,
          pagination: resetPagination,
        })
      }

      log.info('handleQueryChange created', {
        getDataTable,
        newQuery,
        tableResults,
      })
    }, 500),

    [getDataTable, filters, computationResultApi, tablePagination],
  )


  return { searchQuery, setDataTable, handleTableChange, handleQueryChange, tableResults, tableLoading, tablePagination }
}

export default useTable
