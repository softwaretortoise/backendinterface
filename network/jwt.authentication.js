'use strict'
const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const boom = require('@hapi/boom')
const config = require('../config/config')
const { callGetCredentialsByClientId } = require('../api/mysql/get.petitions')

try {
  passport.use(
    new Strategy({
      secretOrKey: config.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (tokenPayload, cb) => {
      try {
        const user = await callGetCredentialsByClientId(tokenPayload.client_id)
        if (!user) return cb(boom.unauthorized(), false)

        cb(null, { ...user })
      } catch (error) {
        return cb(error)
      }
    }
    )
  )
} catch (e) {
  console.warn(e)
}
