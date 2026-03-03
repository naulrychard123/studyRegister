const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const express = require('express')
const router = require('./router')

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(express.json())

app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use(router)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})
