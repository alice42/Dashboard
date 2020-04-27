import React from 'react'
import Chart from 'react-apexcharts'

class BandwidthChart extends React.Component {
  state = {
    options: {
      chart: {
        height: 350,
        type: 'line'
      },
      title: {
        text: 'CAPACITY OFFLOAD',
        align: 'left'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        dashArray: [0, 0, 6, 6]
      },
      fill: {
        type: 'solid',
        opacity: [0.35, 0.35, 1, 1]
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        title: {
          text: 'Gbps'
        }
      },
      legend: {
        offsetY: 5,
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            ' - ' +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ''
          )
        }
      }
    },
    series: []
  }

  componentDidMount() {
    const parsedData = {
      cdn: [],
      p2p: []
    }
    let max
    if (this.props.bandwidth) {
      max = this.props.bandwidth.max
      for (const dataType in this.props.bandwidth.data) {
        this.props.bandwidth.data[dataType].forEach(value => {
          parsedData[dataType].push([
            new Date(value[0]),
            (value[1] / 1000000000).toFixed(2)
          ])
        })
      }
    }
    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        annotations: {
          yaxis: [
            {
              y: (max.p2p / 1000000000).toFixed(2),
              borderColor: '#775DD0',
              label: {
                borderColor: '#775DD0',
                style: {
                  color: '#fff',
                  background: '#775DD0'
                },
                text: `Maximum throughput: ${(max.p2p / 1000000000).toFixed(
                  2
                )} Gbps`
              }
            },
            {
              y: (max.cdn / 1000000000).toFixed(2),
              borderColor: '#FF4560',
              label: {
                borderColor: '#FF4560',
                style: {
                  color: '#fff',
                  background: '#FF4560'
                },
                text: `Maximum CDN contribution: ${(
                  max.cdn / 1000000000
                ).toFixed(2)} Gbps`
              }
            }
          ]
        }
      },
      series: [
        {
          type: 'area',
          name: 'CDN',
          data: parsedData.cdn
        },
        {
          type: 'area',
          name: 'P2P',
          data: parsedData.p2p
        }
      ]
    })
  }

  render() {
    return (
      <div>
        <Chart
          id="BandwidthChart"
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={250}
        />
      </div>
    )
  }
}

export default BandwidthChart
