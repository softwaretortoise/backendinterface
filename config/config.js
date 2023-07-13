'use strict'
require('dotenv').config()
const path = require('path')
const CONFIG_PATH = path.join(__dirname, '..', '..', 'teleopsconfig')
const LOCAL_PATH = path.join(CONFIG_PATH, 'local.json')
const MANAGED_PATH = (process.env.NODE_ENV === 'development') ? path.join(CONFIG_PATH, 'managed_local.json') : path.join(CONFIG_PATH, 'managed.json')
// const MANAGED_PATH = path.join(CONFIG_PATH, 'managed.json')
const fs = require('fs')

require('colors')

module.exports = function config () {
  const config = {
    enviroment: process.env.NODE_ENV,
    configuration_path: CONFIG_PATH,
    port: process.env.PORT,
    maps_key: process.env.GOOGLE_MAPS,
    secret: process.env.SECRET_KEY,
    authTwilio: process.env.AUTH_TOKEN,
    sidTwilio: process.env.ACCOUNT_SID
  }
  if (fs.existsSync(CONFIG_PATH)) {
    if (fs.existsSync(LOCAL_PATH)) {
      Object.assign(config, JSON.parse(fs.readFileSync(LOCAL_PATH, 'utf8')))
    }
    if (fs.existsSync(MANAGED_PATH)) {
      Object.assign(config, JSON.parse(fs.readFileSync(MANAGED_PATH, 'utf8')))
    }
  }
  console.debug('Configuration:'.green, config)
  module.exports = config

  return config
}
