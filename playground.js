import Network from './src/Network'
import Data from './src/Data'

const network = new Network([2, 5, 1])

network.train(Data.ORGate, {
  frequency: 1,
  onSuccess: (error, epoch) => {
    console.log(`Successfully trained to ${error} error after ${epoch} epochs`)
  },
  onFail: (error, epoch) => {
    console.log(`Fail to train, error is ${error} after ${epoch} epochs`)
  },
  onUpdate: (error, epoch) => {
    console.log(`${epoch} ${error}`)
    // exit training
    return false
  },
})
