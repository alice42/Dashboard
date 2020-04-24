// Step 1 - Include react
import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import TimeSeries from 'fusioncharts/fusioncharts.timeseries'
import ReactFC from 'react-fusioncharts'

ReactFC.fcRoot(FusionCharts, TimeSeries)

const dataSource = {
  chart: {},
  subcaption: {
    text: 'CDN & P2P'
  },
  series: 'Type',
  yaxis: [
    {
      plot: {
        value: 'Type',
        type: 'area'
      },
      title: 'Type'
    }
  ]
}

class Test2Chart extends React.Component {
  state = {
    timeseriesDs: {
      type: 'timeseries',
      renderAt: 'container',
      width: '100%',
      height: '100%',
      dataSource
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
      }
    ]
    console.log(data)
    console.log(schema)
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      schema
    )
    console.log(fusionTable)
    // const timeseriesDs = Object.assign({}, this.state.timeseriesDs)
    // timeseriesDs.dataSource.data = fusionTable
    this.setState({
      ...this.state,
      timeseriesDs: {
        ...this.state.timeseriesDs,
        dataSource: {
          chart: {},
          caption: {
            text: 'Sales Performance'
          },
          yaxis: [
            {
              plot: {
                value: 'Sale Amount',
                type: 'area'
              },
              title: 'Sale Amount',
              format: {
                prefix: '$'
              }
            },
            {
              plot: {
                value: 'Units Sold',
                type: 'column'
              },
              title: 'Units Sold'
            }
          ],
          data: fusionTable
        }
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          'loading'
        )}
      </div>
    )
  }
}

export default Test2Chart
