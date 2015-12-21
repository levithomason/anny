/* eslint-disable no-console */
import Network from './src/Network'
import Data from './src/Data'

const network = new Network([4, 5, 3])

network.train(Data.irisFlower, {
  frequency: 1000,
  onSuccess: (error, epoch) => {
    console.log(`Successfully trained to ${error} error after ${epoch} epochs`)
  },
  onFail: (error, epoch) => {
    console.log(`Fail to train, error is ${error} after ${epoch} epochs`)
  },
  onProgress: (error, epoch) => {
    console.log(`${epoch} ${error}`)
  },
})
