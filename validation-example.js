import anny from './src/index'

const network = new anny.Network([2, 1])

network.train([
  {
    input: [0, 1],
    output: [9, 0],
  },
])
