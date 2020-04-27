import React from 'react'
import Chart from 'react-apexcharts'

class CountriesChart extends React.Component {
  state = {
    options: {
      chart: {
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
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
        },
        {
          name: 'EFFICENTY',
          data: parsedData.percentage.slice(0, 5)
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
