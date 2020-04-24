import React from 'react'
import Chart from 'react-apexcharts'

class BandwidthChart extends React.Component {
  state = {
    options: {
      chart: {
        height: 350,
        type: 'line'
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
      }
    },
    series: []
  }

  componentDidMount() {
    const data = {
      cdn: [],
      p2p: []
    }
    if (this.props.bandwidth) {
      for (const dataType in this.props.bandwidth) {
        this.props.bandwidth[dataType].forEach(value => {
          data[dataType].push([
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
              y: 370,
              borderColor: '#775DD0',
              label: {
                borderColor: '#775DD0',
                style: {
                  color: '#fff',
                  background: '#775DD0'
                },
                text: 'MAX P2P'
              }
            },
            {
              y: 100,
              borderColor: '#FF4560',
              label: {
                borderColor: '#FF4560',
                style: {
                  color: '#fff',
                  background: '#FF4560'
                },
                text: 'MAX CDN'
              }
            }
          ]
        }
      },
      series: [
        {
          type: 'area',
          name: 'CDN',
          data: data.cdn
        },
        {
          type: 'area',
          name: 'P2P',
          data: data.p2p
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
