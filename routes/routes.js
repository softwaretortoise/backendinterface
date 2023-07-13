'use strict'

const deliveries = require('../api/components/deliveries/network')
const auth = require('../api/components/auth/network')

const routes = (app) => {
  const routeDeliveries = app.use('/delivery', deliveries)
  const routeAuth = app.use('/oauth', auth)

  return {
    routeDeliveries,
    routeAuth
  }
}

module.exports = routes
