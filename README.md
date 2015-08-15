<p align="center">
  <a href="http://dev-coop.github.io/anny/">
    <img height="150" width="150" src="https://raw.githubusercontent.com/dev-coop/anny/master/logo.png">
  </a>
</p>

Anny
====
![Codeship](https://img.shields.io/codeship/e6501e60-0902-0133-c93c-7e3d949a1704/master.svg?style=flat-square)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/levithomason/anny.svg?style=flat-square)](https://codeclimate.com/github/dev-coop/anny/coverage)
[![Code Climate](https://img.shields.io/codeclimate/github/levithomason/anny.svg?style=flat-square)](https://codeclimate.com/github/dev-coop/anny)

Anny is an artificial neural network, yo!
>She is a work in progress.  Not ready for the limelight.

[**Demo**](http://dev-coop.github.io/anny/)

## Hacking

```terminal
gulp help                 list gulp commands and help

npm start                 install dependencies, build, serve, and watch
npm test                  run tests and generate coverage
npm run test-watch        run tests and watch for changes
npm run check-coverage    check test coverage thresholds
npm run report-coverage   submit coverage info, requires CODECLIMATE_REPO_TOKEN
```

## Inspirations

1. [Watching](https://www.youtube.com/watch?v=EfGD2qveGdQ) DeepMind's DQN teach itself to play Atari.
2. [Playing](http://cs.stanford.edu/people/karpathy/reinforcejs/waterworld.html) with WaterWorld, a DQN implementation in JavaScript (REINFORCEjs).
3. Realizing DeepMind's work was public, and this can be done in a browser.

**Libraries**

- [Synaptic.js](https://github.com/cazala/synaptic)
- [Brain.js](https://github.com/cazala/synaptic)
- [ConvNetJS](https://github.com/karpathy/convnetjs)
- [REINFORCEjs](https://github.com/karpathy/reinforcejs)

## Notes

[**Google Doc notes**](https://docs.google.com/document/d/1h-G9qqp-xC_ykq-weEIjtk0IvXdmij3tCDRfP75BJUg) from [neuralnetworksanddeeplearning.com](http://neuralnetworksanddeeplearning.com/)

[Good Weight Initializations](https://plus.google.com/+SoumithChintala/posts/RZfdrRQWL6u)

[Backpropagation](http://page.mi.fu-berlin.de/rojas/neural/chapter/K7.pdf)

[Efficient Backpropagation](http://yann.lecun.com/exdb/publis/pdf/lecun-98b.pdf) Equation references in the source code point to this doc.

[Convolution Networks](http://andrew.gibiansky.com/blog/machine-learning/convolutional-neural-networks/)
