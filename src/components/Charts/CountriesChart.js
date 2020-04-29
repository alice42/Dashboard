import React from 'react'
import Chart from 'react-apexcharts'
import theme from '../../theme'

class CountriesChart extends React.Component {
  state = {
    options: {
      colors: [
        theme.palette.reds.HotPink.backgroundColor,
        theme.palette.blues.Azure.backgroundColor
      ],
      chart: {
        fontFamily: theme.typography,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      title: {
        text: 'Top 5 countries',
        align: 'left',
        style: {
          fontFamily: theme.typography.h3.fontFamily
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
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
      countries: [],
      p2p: [],
      cdn: [],
      percentage: []
    }
    if (this.props.countries) {
      this.props.countries.forEach(country => {
        parsedData.countries.push(country.country)
        parsedData.cdn.push((country.cdn / 1000000000).toFixed(2))
        parsedData.p2p.push((country.p2p / 1000000000).toFixed(2))
      })
    }
    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        xaxis: {
          categories: parsedData.countries.slice(0, 5)
        }
      },
      series: [
        {
          name: 'CDN',
          data: parsedData.cdn.slice(0, 5)
        },
        {
          name: 'P2P',
          data: parsedData.p2p.slice(0, 5)
        }
      ]
    })
  }

  render() {
    return (
      <div>
        <Chart
          id="CountriesChart"
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={250}
        />
      </div>
    )
  }
}

export default CountriesChart
