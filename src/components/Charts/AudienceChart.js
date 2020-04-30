import React from 'react'
import Chart from 'react-apexcharts'
import theme from '../../theme'

class AudienceChart extends React.Component {
  state = {
    options: {
      colors: [theme.palette.yellows.BurntYellow.backgroundColor],
      chart: {
        height: 300,
        type: 'line',
        fontFamily: theme.typography
      },
      title: {
        text: 'CONCURRENT VIEWERS',
        align: 'left',
        style: {
          fontFamily: theme.typography.h3.fontFamily
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type: 'solid'
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
      tooltip: {
        x: {
          show: true,
          format: 'dd MMM y, hh:mm:ss'
        },
        y: {
          formatter: value => {
            return `${value}`
          },
          title: {
            formatter: seriesName => seriesName
          }
        }
      }
    },
    series: []
  }

  componentDidMount() {
    const data = []
    if (this.props.viewers) {
      this.props.viewers.audience.forEach(value => {
        data.push([new Date(value[0]), value[1]])
      })
    }
    this.setState({
      ...this.state,
      series: [
        {
          name: 'Viewers',
          data
        }
      ]
    })
  }

  render() {
    return (
      <div>
        <Chart
          id="AudienceChart"
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={250}
        />
      </div>
    )
  }
}

export default AudienceChart
