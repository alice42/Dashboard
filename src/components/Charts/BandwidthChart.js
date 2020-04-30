import React from 'react'
import Chart from 'react-apexcharts'
import theme from '../../theme'

class BandwidthChart extends React.Component {
  state = {
    options: {
      chart: {
        height: 300,
        type: 'line',
        fontFamily: theme.typography
      },
      colors: [
        theme.palette.reds.HotPink.backgroundColor,
        theme.palette.blues.Azure.backgroundColor
      ],
      title: {
        text: 'CAPACITY OFFLOAD',
        align: 'left',
        style: {
          fontFamily: theme.typography.h3.fontFamily
        }
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
        tooltip: {
          x: {
            show: true,
            format: 'dd MMM y, hh:mm:ss'
          },
          y: {
            formatter: value => {
              return `${value} Gbps`
            },
            title: {
              formatter: seriesName => seriesName
            }
          }
        },
        annotations: {
          yaxis: [
            {
              y: (max.p2p / 1000000000).toFixed(2),
              borderColor: theme.palette.blues.Azure.backgroundColor,
              label: {
                borderColor: theme.palette.blues.Azure.backgroundColor,
                style: {
                  color: '#fff',
                  background: theme.palette.blues.Azure.backgroundColor
                },
                text: `Maximum throughput: ${(max.p2p / 1000000000).toFixed(
                  2
                )} Gbps`
              }
            },
            {
              y: (max.cdn / 1000000000).toFixed(2),
              borderColor: theme.palette.reds.HotPink.backgroundColor,
              label: {
                borderColor: theme.palette.reds.HotPink.backgroundColor,
                style: {
                  color: '#fff',
                  background: theme.palette.reds.HotPink.backgroundColor
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
