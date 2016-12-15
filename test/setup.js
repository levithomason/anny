import sinon from 'sinon'
import chai from 'chai'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'

global.sinon = sinon
global.chai = chai
global.expect = chai.expect
global.should = chai.should()

chai.use(dirtyChai)
chai.use(sinonChai)
