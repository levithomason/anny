/* eslint-disable no-console */
import _ from 'lodash'
import Network from './src/Network'
import Data from './src/Data'

const network = new Network([2, 1])

network.train(Data.ORGate, {
  frequency: 1000,
  onSuccess: (error, epoch) => {
    console.log(`Successfully trained to ${error} error after ${epoch} epochs`)
  },
  onFail: (error, epoch) => {
    console.log(`Fail to train, error is ${error} after ${epoch} epochs`)
  },
  onProgress: (error, epoch) => {
    console.log(`${_.pad(epoch, 5)} ${error}`)
  },
})
