import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
      HotPink: { backgroundColor: '#C42151' },
      Rouge: { backgroundColor: '#9A193E' },
      Velvet: { backgroundColor: '#570D22' }
    },
    blues: {
      LightBlue: { backgroundColor: '#C6ECFF' },
      Azure: { backgroundColor: '#12A5ED' },
      PeacockBlue: { backgroundColor: '#005D9F' },
      Twilight: { backgroundColor: '#0A3758​' },
      TwilightLight: { backgroundColor: '#506A84' }
    },
    greens: {
      LightGreen: '#C9EDD9',
      Green: '#3FCB7E',
      Viridian: '#1D874D'
    },
    yellows: {
      LightYellow: { backgroundColor: '#FCE4A3' },
      Sunflower: { backgroundColor: '#FFBF10' },
      BurntYellow: { backgroundColor: '#DDA02A' }
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
    body2: {
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
