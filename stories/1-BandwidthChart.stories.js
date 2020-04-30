import React from 'react'

import { action } from '@storybook/addon-actions'
import BandwidthChart from '../src/components/Charts/BandwidthChart'

export default {
  title: 'BandwidthChart',
  component: BandwidthChart
}
let bandwidth
bandwidth = {
  data: { cdn: [], p2p: [] },
  max: { cdn: null, p2p: null }
}

export const NoData = () => <BandwidthChart bandwidth={bandwidth} />

bandwidth = {
  data: {
    cdn: [
      [1509490800000, 30888004756.053333],
      [1509494400000, 18573004048.213333],
      [1509498000000, 11153433981.013334]
    ],
    p2p: [
      [1509490800000, 40888004756.053333],
      [1509494400000, 48573004048.213333],
      [1509498000000, 41153433981.013334]
    ]
  },
  max: { cdn: 97692076468.24, p2p: 363470694030.9867 }
}

export const Data = () => <BandwidthChart bandwidth={bandwidth} />
