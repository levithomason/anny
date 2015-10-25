global.sinon = require('sinon');
global.chai = require('chai');
global.sinonChai = require('sinon-chai');
global.expect = chai.expect;
global.should = chai.should();
chai.use(sinonChai);

global.math = require('mathjs');
