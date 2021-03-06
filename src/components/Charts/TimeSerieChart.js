import React from 'react'
import FusionCharts from 'fusioncharts'
import TimeSeries from 'fusioncharts/fusioncharts.timeseries'
import ReactFC from 'react-fusioncharts'
import theme from '../../theme'

ReactFC.fcRoot(FusionCharts, TimeSeries)

class TimeSerieChart extends React.Component {
  state = {
    timeseriesDs: {
      type: 'timeseries',
      renderAt: 'container',
      width: '100%',
      height: '800',
      caption: {
        text: 'CDN & P2P metrics'
      },
      dataSource: {
        chart: {
          showlegend: 0,
          palettecolors: [
            theme.palette.reds.HotPink.backgroundColor,
            theme.palette.blues.Azure.backgroundColor,
            theme.palette.yellows.BurntYellow.backgroundColor,
            theme.palette.greens.Green.backgroundColor
          ]
        },
        yaxis: [
          {
            title: 'CAPACITY OFFLOAD',
            plot: [
              {
                value: 'CDN',
                type: 'area'
              },
              {
                value: 'P2P',
                type: 'area'
              }
            ],
            referenceLine: [
              {
                label: 'Maximum throughput',
                value: (this.props.bandwidth.max.p2p / 1000000000).toFixed(2)
              },
              {
                label: 'Maximum CDN contribution',
                value: (this.props.bandwidth.max.cdn / 1000000000).toFixed(2)
              }
            ],
            format: {
              suffix: 'Gbps '
            }
          },
          {
            title: 'CONCURRENT VIEWERS',
            plot: [
              {
                value: 'Viewers',
                type: 'smooth-line'
              }
            ]
          },
          {
            title: 'EFFICIENCY',
            plot: [
              {
                value: 'Efficiency',
                type: 'smooth-line'
              }
            ],
            format: {
              suffix: '%'
            }
          }
        ]
      }
    }
  }

  componentDidMount() {
    const data = []
    if (this.props.bandwidth && this.props.viewers) {
      this.props.bandwidth.data.cdn.forEach(item => {
        const p2p = this.props.bandwidth.data.p2p.find(
          data => data[0] === item[0]
        )[1]
        const cdn = item[1]
        const total = p2p + cdn
        let percent
        if (p2p > 0) {
          percent = ((p2p / total) * 100).toFixed(0)
        } else {
          percent = 0
        }
        data.push([
          new Date(item[0]).toLocaleString(),
          (item[1] / 1000000000).toFixed(2),
          (p2p / 1000000000).toFixed(2),
          this.props.viewers.audience.find(data => data[0] === item[0])[1],
          percent
        ])
      })
    }
    const schema = [
      {
        name: 'Time',
        type: 'date',
        format: '%d/%m/%Y, %H:%M:%S',
        column: 'Time',
        index: 0
      },
      { name: 'CDN', type: 'number', column: 'CDN', index: 1 },
      { name: 'P2P', type: 'number', column: 'P2P', index: 2 },
      { name: 'Viewers', type: 'number', column: 'Viewers', index: 3 },
      { name: 'Efficiency', type: 'number', column: 'Efficiency', index: 4 },
      { name: '_row_id', type: 'string' }
    ]
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      schema
    )
    const timeseriesDs = Object.assign({}, this.state.timeseriesDs)
    timeseriesDs.dataSource.data = fusionTable
    this.setState({ timeseriesDs })
  }

  render() {
    return (
      <div>
        <ReactFC {...this.state.timeseriesDs} />
      </div>
    )
  }
}
export default TimeSerieChart
