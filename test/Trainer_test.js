// TODO use these old Network tests for future Trainer() class tests
// import Network from '../src/Network'
// import DATA from '../src/Data'
//
// describe('Train', () => {
//   it('learns an OR gate', (done) => {
//     network = new Network([2, 1])
//     network.train(DATA.ORGate, {onSuccess: () => done()})
//   })
//
//   it('learns a XOR gate', (done) => {
//     // TODO: this should be possible with 2, 3, 1 but is intermittent.
//     network = new Network([2, 5, 3, 1])
//     network.train(DATA.XORGate, {onSuccess: () => done()})
//   })
//
//   it('learns an AND gate', (done) => {
//     network = new Network([2, 3, 1])
//     network.train(DATA.ANDGate, {onSuccess: () => done()})
//   })
//
//   it('learns a NAND gate', (done) => {
//     network = new Network([2, 3, 1])
//     network.train(DATA.NANDGate, {onSuccess: () => done()})
//   })
// })
