<p align="center">
  <a href="http://dev-coop.github.io/anny/">
    <img height="150" width="150" src="https://raw.githubusercontent.com/dev-coop/anny/master/logo.png">
  </a>
</p>

<h1 align="center">
  <a href="http://dev-coop.github.io/anny">Anny</a>
</h1>

<p align="center">
  <a href="https://app.wercker.com/#applications/561dd8ec7b474cd811009e00">
    <img src="https://img.shields.io/wercker/ci/dev-coop/anny.svg?style=flat-square" alt="Wercker"/>
  </a>
  <a href="https://codeclimate.com/github/dev-coop/anny/coverage">
    <img src="https://img.shields.io/codeclimate/coverage/github/dev-coop/anny.svg?style=flat-square" alt="Test Coverage"/>
  </a>
  <a href="https://codeclimate.com/github/dev-coop/anny">
    <img src="https://img.shields.io/codeclimate/github/dev-coop/anny.svg?style=flat-square" alt="Code Climate"/>
  </a>
</p>

<p align="center">
  Anny is an artificial neural network, yo!
</p>

## Get Started
Read the [documentation](http://dev-coop.github.io/anny/docs/dist/0.1.0)
or try the [demo](http://dev-coop.github.io/anny).

## Hacking

### Setup

1. Install [node.js](https://nodejs.org/).
1. `git clone git@github.com:dev-coop/anny.git`
1. `cd anny`
1. `npm install`
1. `npm start`

Once you're all setup, you can use the commands below.

### Dev Process

Run `gulp` then open your browser to [http://localhost:8000](http://localhost:8000).
Make changes to Anny in `/lib`, the demo app in `/app`, or the doc site in `/docs/src`.
The project is automatically rebuilt and the browser refreshed.

```
gulp                      # build, serve, and watch
gulp help                 # list gulp commands and help

npm start                 # install dependencies, build, serve, and watch
npm test                  # run tests and generate coverage
npm run                   # list npm commands
```

## Project Structure

This repo contains two projects.

**`/lib`**
Anny, the neural net library.  

**`/app`**
An AngularJS web app for demoing and testing purposes

**`/docs`**
The doc site src and builds, powered by [JSDoc](http://usejsdoc.org/).

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
