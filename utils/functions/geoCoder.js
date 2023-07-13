/* eslint-disable camelcase */
const NodeGeocoder = require('node-geocoder')
const config = require('../../config/config')

const options = {
  provider: 'google',
  apiKey: config.maps_key,
  formatter: null
}

const geocoder = NodeGeocoder(options)

module.exports = { geocoder }
