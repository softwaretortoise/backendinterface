/* global __dirname */
require('colors')
const path = require('path')
const fs = require('fs')
const https = require('https')
const crypto = require('crypto')
const config = require('../config/config.js')
const helmet = require('helmet')

/**
 * @typedef {Object} Servers
 * @property {Server} httpsServer - Secure server
 * @property {Server} httpServer - Insecure server
 */

/**
 * Creates https server with recommended settings
 * @param {Express} app Express app
 * @param {number} port Port for https
 * @param {number} [insecurePort] Port for http
 * @returns {Servers} Servers
 */
function ServerConfig (app, port, insecurePort) {
  const sslpath = config.SSL_PATH ? config.SSL_PATH : path.join(__dirname, '..', 'utils', 'ssl')

  const privateKey = fs.readFileSync(path.join(sslpath, 'privkey.pem'), 'utf8')
  const certificate = fs.readFileSync(path.join(sslpath, 'cert.pem'), 'utf8')
  const chainBundle = fs.readFileSync(path.join(sslpath, 'chain.pem'), 'utf8')

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: chainBundle,
    secureOptions: crypto.SSL_OP_NO_TLSv1 | crypto.SSL_OP_NO_TLSv1_1,
    ciphers: [
      'ECDHE-RSA-AES256-SHA384',
      'DHE-RSA-AES256-SHA384',
      'ECDHE-RSA-AES256-SHA256',
      'DHE-RSA-AES256-SHA256',
      'ECDHE-RSA-AES128-SHA256',
      'DHE-RSA-AES128-SHA256',
      'HIGH',
      '!aNULL',
      '!eNULL',
      '!EXPORT',
      '!DES',
      '!RC4',
      '!MD5',
      '!PSK',
      '!SRP',
      '!CAMELLIA'
    ].join(':')
  }
  const ONE_YEAR = 31536000000
  app.use(helmet.hsts({
    maxAge: ONE_YEAR,
    includeSubDomains: true,
    force: true
  }))
  const httpsServer = https.createServer(credentials, app)
  let httpServer = null
  if (port) {
    httpsServer.listen(port)
    console.log('HTTPS listening on '.green + port)
  }
  if (insecurePort) {
    httpServer = require('http').Server(app)
    httpServer.listen(insecurePort)
    console.log('HTTP listening on '.yellow + insecurePort)
  }
  return { httpsServer, httpServer }
}

module.exports = ServerConfig
