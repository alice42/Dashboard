import React from 'react'
import FusionCharts from 'fusioncharts'
import TimeSeries from 'fusioncharts/fusioncharts.timeseries'
import ReactFC from 'react-fusioncharts'

ReactFC.fcRoot(FusionCharts, TimeSeries)

class TimeSerieChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeseriesDs: {
        type: 'timeseries',
        renderAt: 'container',
        width: '100%',
        dataSource: {
          chart: {},
          caption: {
            text: 'Total Rainfall of Assam and Tripura'
          },
          subcaption: {
            text: 'For over a century (1901-2015)'
          },
          yaxis: [
            {
              plot: [
                {
                  value: 'CDN',
                  type: 'area',
                  format: {
                    suffix: 'Gbps '
                  }
                },
                {
                  value: 'P2P',
                  type: 'area',
                  format: {
                    suffix: 'Gbps '
                  }
                }
              ]
            },
            {
              plot: [
                {
                  value: 'Viewers',
                  type: 'line'
                }
              ]
            }
          ]
        }
      }
    }
  }

  componentDidMount() {
    const data = []

    if (this.props.bandwidth && this.props.viewers) {
      for (let i = 0; i < this.props.bandwidth.cdn.length; i++) {
        var a = this.props.bandwidth.cdn[i]
        var b = this.props.bandwidth.p2p[i]
        var b1 = this.props.viewers.audience[i]
        var c = a.concat(b).concat(b1)
        var d = c.filter((item, pos) => c.indexOf(item) === pos)
        d[0] = new Date(d[0]).toLocaleString()
        d[1] = (d[1] / 1000000000).toFixed(2)
        d[2] = (d[2] / 1000000000).toFixed(2)
        data.push(d)
      }
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
      { name: 'Viewers', type: 'number', column: 'Viewers', index: 2 },
      { name: '_row_id', type: 'string' }
    ]
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      schema
    )
    const timeseriesDs = Object.assign({}, this.state.timeseriesDs)
    timeseriesDs.dataSource.data = fusionTable
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
