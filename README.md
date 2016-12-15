<p align="center">
  <a href="http://levithomason.github.io/anny/">
    <img height="150" width="150" src="https://raw.githubusercontent.com/levithomason/anny/master/logo.png">
  </a>
</p>

<h1 align="center">
  <a href="http://levithomason.github.io/anny">Anny</a>
</h1>

<p align="center">
  <a href="https://circleci.com/gh/levithomason/anny">
    <img src="https://img.shields.io/circleci/project/levithomason/anny/master.svg?style=flat-square" alt="CircleCI"/>
  </a>
  <a href="https://codecov.io/gh/levithomason/anny">
    <img src="https://img.shields.io/codecov/c/github/levithomason/anny/master.svg?style=flat-square" alt="Test Coverage"/>
  </a>
</p>

<p align="center">
  Anny is an artificial neural network, yo!
</p>


```
npm install anny --save
```

## Get Started

Read the [documentation](http://levithomason.github.io/anny/docs)
or try the [demo](http://levithomason.github.io/anny).

Train a multilayer perceptron to approximate an OR logic gate:

```js
const {
  Network,
  Layer,
  Trainer,
  DATA,
} = require('anny')

const network = new Network([new Layer(2), new Layer(1)])
const trainer = new Trainer()

trainer.train(network, DATA.ORGate)

network.activate([0, 0]) // => 0.000836743108
network.activate([0, 1]) // => 0.998253857294
```

## Why Anny?

I wanted to understand machine learning.

>What I cannot create, I do not understand. Know how to solve every problem that has been solved.
>&mdash; Richard Feynman

## Inspirations

1. [Watching](https://www.youtube.com/watch?v=EfGD2qveGdQ) DeepMind's DQN teach 
itself to play Atari.
2. [Playing](http://cs.stanford.edu/people/karpathy/reinforcejs/waterworld.html) 
with WaterWorld, a DQN implementation in JavaScript (REINFORCEjs).
3. Realizing DeepMind's work was public, and this can be done in a browser.

**Libraries**

- [Synaptic.js](https://github.com/cazala/synaptic)
- [Brain.js](https://github.com/cazala/synaptic)
- [ConvNetJS](https://github.com/karpathy/convnetjs)
- [REINFORCEjs](https://github.com/karpathy/reinforcejs)

## Notes

>[My Google Doc notes](https://docs.google.com/document/d/1h-G9qqp-xC_ykq-weEIjtk0IvXdmij3tCDRfP75BJUg) from [neuralnetworksanddeeplearning.com](http://neuralnetworksanddeeplearning.com/)  
>[Good Weight Initializations](https://plus.google.com/+SoumithChintala/posts/RZfdrRQWL6u)  
>[Backpropagation](http://page.mi.fu-berlin.de/rojas/neural/chapter/K7.pdf)  
>[Efficient Backpropagation](http://yann.lecun.com/exdb/publis/pdf/lecun-98b.pdf) Equation references in the source code point to this doc.  
>[Convolution Networks](http://andrew.gibiansky.com/blog/machine-learning/convolutional-neural-networks/)  
