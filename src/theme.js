import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

import AlternateGothic from './assets/fonts/AlternateGothic.woff2'
import SourceSansPro from './assets/fonts/SourceSansPro.woff2'

const headerFont = {
  fontFamily: 'AlternateGothic',
  fontStyle: 'normal',
  src: `
    url(${AlternateGothic}) format('woff2')
  `
}
const bodyFont = {
  fontFamily: 'SourceSansPro',
  fontStyle: 'normal',
  src: `
    url(${SourceSansPro}) format('woff2')
  `
}

let theme = createMuiTheme({
  palette: {
    reds: {
      LightPink: { backgroundColor: '#FFE0E9' },
      HotPink: { backgroundColor: '#C42151' }, // <-- Primary red color (CDN)
      Rouge: { backgroundColor: '#9A193E' },
      Velvet: { backgroundColor: '#570D22' }
    },
    blues: {
      LightBlue: { backgroundColor: '#C6ECFF' },
      Azure: { backgroundColor: '#12A5ED' }, // <-- Primary blue color (P2P)
      PeacockBlue: { backgroundColor: '#005D9F' },
      Twilight: { backgroundColor: '#0A3758' }, // <-- Background color
      TwilightLight: { backgroundColor: '#506A84' }
    },
    greens: {
      LightGreen: { backgroundColor: '#C9EDD9' },
      Green: { backgroundColor: '#3FCB7E' }, // <-- Primay green (Efficiency)
      Viridian: { backgroundColor: '#1D874D' }
    },
    yellows: {
      LightYellow: { backgroundColor: '#FCE4A3' },
      Sunflower: { backgroundColor: '#FFBF10' },
      BurntYellow: { backgroundColor: '#DDA02A' } // <-- Primary yellow color (Audience)
    },
    grayscale: {
      White: { backgroundColor: 'white' },
      OffWhite: { backgroundColor: '#F5F8FA' },
      LightGray: { backgroundColor: '#E1E8ED' },
      Gray: { backgroundColor: '#A1AEB8' },
      Black: { backgroundColor: '#333' }
    }
  },
  status: {
    danger: 'orange'
  },
  typography: {
    h3: {
      fontFamily: 'AlternateGothic'
    },
    h5: {
      fontFamily: 'AlternateGothic'
    },
    body: {
      fontFamily: 'SourceSansPro'
    },
    body1: {
      fontFamily: 'SourceSansPro'
    },
    body2: {
      fontFamily: 'SourceSansPro'
    },
    button: {
      fontFamily: 'SourceSansPro'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [headerFont, bodyFont]
      }
    }
  }
})
theme = responsiveFontSizes(theme)

export default theme
