const compose = require('./compose')

class TConv {
  constructor () {
    this.middleware = []
    this.handler = null
  }

  use (cb) {
    this.middleware.push(cb)
    return this
  }

  init () {
    this.handler = compose(this.middleware)
    return this
  }

  apply (params, nonce = 0) {
    let ctx = {
      params,
      nonce,
      t: { // token
        in: [],
        out: []
      },
      n: { // nft
        in: [],
        out: []
      }
    }
    this.handler(ctx)
  }
}

module.exports = TConv
