## Setup

If you plan to submit your changes back to Anny, use the [Contributing](#Contributing) instructions.

1. Install [node.js](https://nodejs.org/)
1. `git clone https://github.com/dev-coop/anny.git`
1. `cd anny`
1. `npm install`
1. `npm start`

## Contributing

Use these instructions if you plan on submitting your changes to Anny.

1. [Fork](https://github.com/dev-coop/anny/fork) Anny to your account
1. `git clone <your fork>`
1. `cd anny`
1. `git checkout -b <new branch>`
1. `npm install`
1. `npm start`
1. Make changes, commit and push
1. Open a [Pull Request](https://github.com/dev-coop/anny/compare/integration...) with base: `integration` and compare: `<your branch>`.

We'll review your PR and help you get it merged into the `integration` branch.

## Dev Process

Once you have Anny running locally, you can use the commands below.

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
