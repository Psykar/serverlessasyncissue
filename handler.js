

const serverless   = require('serverless-http')
const express      = require('express')

const app = express()

app.get('/testsomething', async (req, res) => {
  res.json({ test: 'hi' })
})

module.exports.handler = serverless(app)
