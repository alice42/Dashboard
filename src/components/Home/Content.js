import React from 'react'
import { Grid } from '@material-ui/core'
import { StyledPaper, StyledIcon } from './styles/StyledContent'
import BandwidthChart from '../Charts/BandwidthChart'
import AudienceChart from '../Charts/AudienceChart'
import EfficiencyChart from '../Charts/EfficiencyChart'
import CountriesChart from '../Charts/CountriesChart'
import PlatformsChart from '../Charts/PlatformsChart'
import TimeSerieChart from '../Charts/TimeSerieChart'

const Content = ({ fetching, bandwidth, audience, countries, platforms }) => {
  const url = window.location.href
  const alternativeView = url.substring(url.lastIndexOf('/') + 1, url.length)
  const views = {
    alternativeView: (
      <Grid item xs={12}>
        <StyledPaper>
          {audience && bandwidth && bandwidth.data && (
            <TimeSerieChart bandwidth={bandwidth} viewers={audience.data} />
          )}
        </StyledPaper>
      </Grid>
    )
  }
  if (fetching) return <StyledIcon />
  else if (views[alternativeView]) return views[alternativeView]
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StyledPaper>
          {bandwidth && bandwidth.data && bandwidth.max && (
            <BandwidthChart bandwidth={bandwidth} />
          )}
        </StyledPaper>
      </Grid>
      <Grid item xs={12}>
        <StyledPaper>
          {audience && <AudienceChart viewers={audience.data} />}
        </StyledPaper>
      </Grid>
      <Grid item xs={12}>
        <StyledPaper>
          {bandwidth && bandwidth.data && audience && (
            <EfficiencyChart
              bandwidth={bandwidth.data}
              viewers={audience.data}
            />
          )}
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <StyledPaper>
          {countries && <CountriesChart countries={countries.data} />}
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <StyledPaper>
          {platforms && <PlatformsChart platforms={platforms.data} />}
        </StyledPaper>
      </Grid>
    </Grid>
  )
}

export default Content
