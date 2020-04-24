import React from 'react'
import Chart from 'react-apexcharts'

class AudienceChart extends React.Component {
  state = {
    options: {
      colors: ['#FEB019'],
      chart: {
        height: 350,
        type: 'line'
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
          name: 'VIEWERS',
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
