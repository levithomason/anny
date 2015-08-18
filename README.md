<p align="center">
  <a href="http://dev-coop.github.io/anny/">
    <img height="150" width="150" src="https://raw.githubusercontent.com/dev-coop/anny/master/logo.png">
  </a>
</p>

<h1 align="center">
  <a href="http://dev-coop.github.io/anny">Anny</a>
</h1>

<p align="center">
  <img src="https://img.shields.io/codeship/e6501e60-0902-0133-c93c-7e3d949a1704/master.svg?style=flat-square" alt="Codeship"/>
  <a href="https://codeclimate.com/github/dev-coop/anny/coverage">
    <img src="https://img.shields.io/codeclimate/coverage/github/dev-coop/anny.svg?style=flat-square" alt="Test Coverage"/>
  </a>
  <a href="https://codeclimate.com/github/dev-coop/anny">
    <img src="https://img.shields.io/codeclimate/github/dev-coop/anny.svg?style=flat-square" alt="Code Climate"/>
  </a>
</p>

<p align="center">
  Anny is an artificial neural network, yo!
  <br/>
  Try the <a href="http://dev-coop.github.io/anny"><b>Demo</b></a>.
</p>


## Setup
1. Install [node.js](https://nodejs.org/).
1. `git clone git@github.com:dev-coop/anny.git`
1. `cd anny`
1. `npm start`

Once you're all setup, you can use the commands in Hacking below.

## Hacking
Run `gulp` then open your browser to [http://localhost:8000](http://localhost:8000).
Make changes to the Anny library in `/lib` or the demo app in `/app`.
The project is automatically rebuilt and the browser refreshed.


```
gulp                      build, serve, and watch
gulp help                 list gulp commands and help

npm start                 install dependencies, build, serve, and watch
npm test                  run tests and generate coverage
npm run test-watch        run tests and watch for changes
npm run check-coverage    check test coverage thresholds
npm run report-coverage   submit coverage info, requires CODECLIMATE_REPO_TOKEN
```

## Project Structure
This repo contains two projects.  Anny, the neural net library and AngularJS
web app for demoing and testing purposes.

Anny lives `/lib`.  The AngularJS demo web app lives in `/app`.`

## Why Anny?
I wanted to understand machine learning.

>What I cannot create, I do not understand.
>Know how to solve every problem that has been solved.
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

[My Google Doc notes](https://docs.google.com/document/d/1h-G9qqp-xC_ykq-weEIjtk0IvXdmij3tCDRfP75BJUg) from [neuralnetworksanddeeplearning.com](http://neuralnetworksanddeeplearning.com/)  
[Good Weight Initializations](https://plus.google.com/+SoumithChintala/posts/RZfdrRQWL6u)  
[Backpropagation](http://page.mi.fu-berlin.de/rojas/neural/chapter/K7.pdf)  
[Efficient Backpropagation](http://yann.lecun.com/exdb/publis/pdf/lecun-98b.pdf) Equation references in the source code point to this doc.  
[Convolution Networks](http://andrew.gibiansky.com/blog/machine-learning/convolutional-neural-networks/)  
