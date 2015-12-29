/* eslint-disable no-console */
import _ from 'lodash'
import Network from './src/Network'
import Data from './src/Data'
import Trainer from './src/Trainer'

const network = new Network([2, 1])

const trainer = new Trainer({
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

trainer.train(network, Data.ORGate)
