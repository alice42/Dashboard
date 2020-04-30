import React from 'react'
import Chart from 'react-apexcharts'
import theme from '../../theme'

class PlatformsChart extends React.Component {
  state = {
    options: {
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: theme.typography
      },
      colors: [
        theme.palette.reds.HotPink.backgroundColor,
        theme.palette.blues.Azure.backgroundColor
      ],
      title: {
        text: 'Platforms',
        align: 'left',
        style: {
          fontFamily: theme.typography.h3.fontFamily
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    },
    series: []
  }

  componentDidMount() {
    const parsedData = {
      platforms: [],
      p2p: [],
      cdn: [],
      upload: [],
      max_viewers: [],
      average_viewers: []
    }
    if (this.props.platforms) {
      this.props.platforms.forEach(platform => {
        parsedData.platforms.push(platform.platform)
        parsedData.cdn.push((platform.cdn / 1000000000).toFixed(2))
        parsedData.p2p.push((platform.p2p / 1000000000).toFixed(2))
        parsedData.upload.push((platform.upload / 1000000000).toFixed(2))
      })
    }
    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        xaxis: {
          categories: parsedData.platforms
        }
      },
      series: [
        {
          name: 'CDN',
          data: parsedData.cdn
        },
        {
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
          id="PlatformsChart"
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={250}
        />
      </div>
    )
  }
}

export default PlatformsChart
