import { useIntl } from 'react-intl'
import { Line } from 'react-chartjs-2'
import { Chart, ChartOptions, registerables } from 'chart.js'
import _ from 'lodash'
import styled from 'styled-components'

import * as UF from 'Modules/FanModels/Polynomials/functions'
import colors from 'styles/colors.module.scss'

Chart.register(...registerables)

interface LineChartProps {
  pressure_fin: [number, number][]
  polynomials: any
  rpm: number
}

const LineChart = ({ pressure_fin, polynomials, rpm }: LineChartProps) => {
  const intl = useIntl()

  const labels: any = _.map(pressure_fin, (pair) => _.round(pair[0], 2))
  const data = _.map(pressure_fin, (pair) => pair[1])

  const result: any = UF.calculateMinMaxValues(polynomials, rpm, labels)

  const { variableNames, valueRanges, dataPoints } = result

  const [xVar, ...otherVars] = variableNames

  const xValuesPoly = valueRanges[xVar]

  const groupByKeys = (point: any) =>
    _.map(otherVars, (v: any) => `${v}=${point[v]}`).join(', ')

  const grouped = _.groupBy(dataPoints, groupByKeys)

  const values = _.map(grouped, (points, label) => {
    const data = _.map(xValuesPoly, (x) => {
      const point = _.find(points, (p: any) => p[xVar] === x)
      return point ? point.y : null
    })

    return {
      label:
        label ||
        intl.formatMessage({
          id: 'data.fan_models.modal.fan',
        }),
      data,
      borderColor: colors.primary,
      backgroundColor: colors.primary,
      pointRadius: 0,
    }
  })

  const chartData = {
    labels,
    datasets: [
      {
        label: intl.formatMessage({
          id: 'data.fan_models.modal.pressure_fin',
        }),
        data,
        borderColor: colors.danger,
        backgroundColor: colors.danger,
        pointRadius: 0,
      },
      ...values,
    ],
  }

  const options: ChartOptions<'line'> = {
    plugins: {
      tooltip: {
        mode: 'nearest',
        intersect: false,
        position: 'nearest',
        displayColors: false,
        callbacks: {
          title: function (tooltipItem: any) {
            return `x = ${tooltipItem[0].label}`
          },
          label: function (tooltipItem: any) {
            const y: any = tooltipItem.raw // value of y
            return `y = ${y.toFixed(2)}`
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: intl.formatMessage({
            id: 'data.fan_models.modal.flow_rate',
          }),
        },
      },
      y: {
        title: {
          display: true,
          text: intl.formatMessage({
            id: 'data.fan_models.modal.pressure',
          }),
        },
      },
    },
  }

  return (
    <StyledChartContainer>
      <Line data={chartData} options={options} />
    </StyledChartContainer>
  )
}

const StyledChartContainer = styled.div`
  position: relative;
  height: 45vh;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  justify-content: center;
`

export default LineChart
