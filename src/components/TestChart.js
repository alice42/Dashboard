import React from 'react'
import FusionCharts from 'fusioncharts'
import TimeSeries from 'fusioncharts/fusioncharts.timeseries'
import ReactFC from 'react-fusioncharts'

ReactFC.fcRoot(FusionCharts, TimeSeries)

class TestChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeseriesDs: {
        type: 'timeseries',
        renderAt: 'container',
        width: '100%',
        height: '450',
        dataSource: {
          chart: {},
          caption: {
            text: 'Total Rainfall of Assam and Tripura'
          },
          subcaption: {
            text: 'For over a century (1901-2015)'
          },
          series: 'Type',
          yaxis: [
            {
              plot: [
                {
                  value: 'value',
                  type: 'area',
                  style: {
                    plot: {
                      'fill-opacity': '0.8'
                    }
                  }
                }
              ],
              title: 'Gbps',
              referenceline: [
                {
                  label: 'Controlled NMHC',
                  value: '150',
                  style: {
                    marker: {
                      fill: 'red',
                      stroke: 'red'
                    }
                  }
                },
                {
                  label: 'Controlled NO₂',
                  value: '80',
                  style: {
                    opacity: 1,
                    marker: {
                      fill: 'green',
                      stroke: 'red',
                      'stroke-dasharray': [4, 3],
                      'stroke-width': 10
                    }
                  }
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

    if (this.props.bandwidth) {
      for (const dataType in this.props.bandwidth) {
        this.props.bandwidth[dataType].forEach(value => {
          data.push([
            dataType,
            new Date(value[0]).toLocaleString(),
            (value[1] / 1000000000).toFixed(2)
          ])
        })
      }
    }
    const schema = [
      {
        name: 'Type',
        type: 'string',
        index: 0
      },
      {
        name: 'date',
        type: 'date',
        format: '%d/%m/%Y, %H:%M:%S',
        column: 'date',
        index: 1
      },
      {
        name: 'value',
        type: 'number',
        column: 'value',
        index: 2
      },
      { name: '_row_id', type: 'string' }
    ]
    console.log(data)
    console.log(schema)
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      schema
    )
    console.log(fusionTable)
    const timeseriesDs = Object.assign({}, this.state.timeseriesDs)
    timeseriesDs.dataSource.data = fusionTable
    // this.onFetchData()
  }

  render() {
    return (
      <div>
        <ReactFC {...this.state.timeseriesDs} />
      </div>
    )
  }
}
export default TestChart
