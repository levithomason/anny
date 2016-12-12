import * as factory from './factory'
import * as graph from './graph'
import * as toolbar from './toolbar'

// Init
// ----------------------------------------
graph.init(factory.network, document.querySelector('.vis-network'))

// Export
// ----------------------------------------
const annyApp = {
  factory,
  toolbar,
  graph,
}

module.exports = annyApp
export default annyApp
