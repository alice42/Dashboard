import React from 'react'
import Chart from 'react-apexcharts'
import theme from '../../theme'

class EfficiencyChart extends React.Component {
  state = {
    options: {
      colors: [theme.palette.greens.Green.backgroundColor],
      chart: {
        height: 300,
        type: 'line',
        fontFamily: theme.typography
      },
      title: {
        text: 'EFFICIENCY',
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
      }
    },
    series: []
  }

  componentDidMount() {
    const data = []
    if (this.props.bandwidth) {
      this.props.bandwidth.cdn.forEach(item => {
        const p2p = this.props.bandwidth.p2p.find(
          data => data[0] === item[0]
        )[1]
        const cdn = item[1]
        const results = p2p + cdn
        if (p2p > 0) {
          const percentage = ((p2p / results) * 100).toFixed(0)
          data.push([new Date(item[0]), Number(percentage)])
        } else {
          data.push([new Date(item[0]), 0])
        }
      })
    }
    this.setState({
      ...this.state,
      series: [
        {
          name: 'percent',
          data
        }
      ]
    })
  }

  render() {
    return (
      <div>
        <Chart
          id="EfficiencyChart"
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={250}
        />
      </div>
    )
  }
}

export default EfficiencyChart
