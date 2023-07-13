'use strict'

const xss = require('xss-clean')
// const morgan = require('morgan')
const cron = require('node-cron')
const cors = require('cors')
const express = require('express')
require('./config/config')()
const bodyParser = require('body-parser')
// const httpStatus = require('http-status')
const compression = require('compression')
require('colors')
const Versions = require('./modules/Versions')
const ServerConfig = require('./modules/ServerConfig')
const cookieParser = require('cookie-parser')
const path = require('path')
const { publicHtmlPath } = require('./config/config')
const { payloadDelivery } = require('./utils/webhooks/webhook')()

const routes = require('./routes/routes');

(async function () {
  const backendVersion = await Versions.backendVersion
  const labelLines = backendVersion.label.match(/(.{1,19}\S)(?:\s+|$)|(.{20})", @"$1$2\r\n/g)
  console.info('********************************'.red.bgGreen)
  console.info('***'.red.bgGreen, '   Tortoise backend     '.green, '***'.red.bgGreen)
  console.info('***'.red.bgGreen, '                 __     ', '***'.red.bgGreen)
  console.info('***'.red.bgGreen, "      .,-;-;-,. /'_\\    ", '***'.red.bgGreen)
  console.info('***'.red.bgGreen, '    _/_/_/_|_\\_\\) /     ', '***'.red.bgGreen)
  console.info('***'.red.bgGreen, "  '-<_><_><_><_>=/\\     ", '***'.red.bgGreen)
  console.info('***'.red.bgGreen, "     `/_/====/_/-'\_\\    ", '***'.red.bgGreen)
  console.info('***'.red.bgGreen, '      ""     ""   ""    ', '***'.red.bgGreen)
  console.info('***'.red.bgGreen, '          2021          '.green, '***'.red.bgGreen)
  console.info('***'.red.bgGreen, ''.green, backendVersion.name.padEnd(23, ' ').gray, '***'.red.bgGreen)
  console.info('***'.red.bgGreen, ''.green, backendVersion.commit.padEnd(23, ' ').gray.underline, '***'.red.bgGreen)
  for (const line of labelLines) {
    console.info('***'.red.bgGreen, ''.green, line.padEnd(23, ' ').gray, '***'.red.bgGreen)
  }

  console.info('********************************'.red.bgGreen)
})()

console.log('Starting express...'.cyan)
const app = express()
app.use(cookieParser())
app.use(xss())
app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

routes(app)
// app.use(morgan('combined'));

console.log('Initializing HTTP(s) server...'.cyan)
const { httpsServer, httpServer } = ServerConfig(app, 443, 80)

cron.schedule('*/2 * * * *', () => {
  console.time('time cron')
  payloadDelivery()
  console.timeEnd('time cron')
})

module.exports = {
  app,
  httpsServer,
  httpServer
}
