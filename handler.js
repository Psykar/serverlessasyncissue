

const serverless   = require('serverless-http')
const express      = require('express')

// This is the line that was breaking things
// mongoose.connect(config.DB_URI)

// This loopforever function does something similar to mongoose.connect
// which adds stuff to the node event loop (but doesn't process anything generally)
// We do this outside of the handler so it can be re-used between lambda calls
// This works fine if we don't use serverless-enterprise
// Serverless-enterprise however wraps the async function this module contains
// with a callback based module, which expects the eventloop to be cleared before
// it will return
const loopforever = async () => {
  console.log('In loop function')
  // Just run it again in 1 second
  setTimeout(loopforever, 1000)
}
loopforever()

const app = express()

// Add a route
app.get('/testsomething', async (req, res) => {
  res.json({ test: 'hi' })
})

module.exports.handler = serverless(app)
