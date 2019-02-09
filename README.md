# tconv

token conversion based game framework

# Usage

```js
const TConv = require('tconv')
const userStore = require('../userStore') // for example

let conv = new TConv()
conv.use(async (ctx, next) => {
  console.log('event', ctx.params.event, ctx.params.nonce)
  await next()
  console.log('asset operations', JSON.stringify(ctx))
  for (let i in ctx.t.in) {
    let { uid, tid, num } = ctx.t.in[i]
    ctx.assert(num && num > 0, 'token-in error, invalid num')
    await userStore.incToken(uid, { tid, num: -num })
  }
  for (let i in ctx.t.out) {
    let { uid, tid, num } = ctx.t.out[i]
    ctx.assert(num && num > 0, 'token-out error, invalid num')
    await userStore.incToken(uid, { tid, num: num })
  }
})

conv.init()
conv.apply({ event: 'gather', uid: '0000001' })
```