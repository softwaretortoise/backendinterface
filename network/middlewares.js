'use strict'

const session = require('express-session')
const FileStore = require('session-file-store')(session)
const response = require('../network/response')
const sessionFileStore = new FileStore()
const os = require('os')

const sessionMiddleware = session({
  name: 'Tortoise',
  secret: process.env.MIDDLEWARE_SECRET,
  store: sessionFileStore,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    domain: '.tortops.com',
    httpOnly: true,
    expires: true,
    maxAge: 12 * 3600000
  }
}
)

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const checkSession = (req, res, next) => {
  const requestRoute = req.originalUrl.split('/')[2]
  const allowed = ['login', 'logout', 'checkSession', 'subscribe']
  if (allowed.indexOf(requestRoute) < 0 && !req.session.user) {
    console.log('Unauthorized'.red, requestRoute)
    response.error(req, res, 'Unauthorized', 401, 401)
  } else {
    next()
  }
}

module.exports = { sessionMiddleware, checkSession }
