import { Line } from 'react-chartjs-2'
import { Chart, ChartOptions, registerables } from 'chart.js'
import styled from 'styled-components'
import { Card } from 'antd'
import * as UF from './functions'
import colors from 'styles/colors.module.scss'
import _ from 'lodash'
import { useIntl } from 'react-intl'

Chart.register(...registerables)

const Graph = ({ polynomials }: { polynomials: Polynomials[] }) => {
  const polynomial_type = _.get(polynomials[0], 'polynomial_type', '')

  const intl = useIntl()

  const result: any = UF.calculateMinMaxValues(polynomials)

  const { variableNames, valueRanges, dataPoints } = result

  const [xVar, ...otherVars] = variableNames

  const xValues = valueRanges[xVar]

  const groupByKeys = (point: any) =>
    _.map(otherVars, (v: any) => `${v}=${point[v]}`).join(', ')

  const grouped = _.groupBy(dataPoints, groupByKeys)

  const datasets = _.map(grouped, (points, label) => {
    const data = _.map(xValues, (x) => {
      const point = _.find(points, (p: any) => p[xVar] === x)
      return point ? point.y : null
    })

    return {
      label: label || undefined,
      data,
      borderColor: colors.primary,
      backgroundColor: colors.primary,
      pointRadius: 0,
    }
  })

  const chartData = { labels: xValues, datasets }

  const options: ChartOptions<'line'> = {
    plugins: {
      legend: {
        display: otherVars.length > 0,
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
        position: 'nearest',
        displayColors: false,
        callbacks: {
          title: (tooltipItem) =>
            otherVars.length > 0 ? tooltipItem[0].dataset.label || '' : '',
          label: (tooltipItem) => {
            const x = tooltipItem.label
            const y: any = tooltipItem.raw
            return `${xVar} = ${x}  y = ${y?.toFixed(2) ?? 'N/A'}`
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text:
            intl.formatMessage({
              id: 'data.fan_models.modal.flow_rate',
            }) + ' (m³/h)',
        },
      },
      y: {
        title: {
          display: true,
          text:
            intl.formatMessage({
              id: `select.polynomialType.${polynomial_type}`,
            }) +
            ' (' +
            intl.formatMessage({
              id: `select.fan_models.unit_of_measurement.${polynomial_type}`,
            }) +
            ')',
        },
      },
    },
  }

  return (
    <Card style={{ marginTop: 20 }}>
      <StyledChartContainer>
        <Line data={chartData} options={options} />
      </StyledChartContainer>
    </Card>
  )
}

const StyledChartContainer = styled.div`
  position: relative;
  height: 55vh;
  display: flex;
  margin: 0 auto;
  justify-content: center;
`

export default Graph
