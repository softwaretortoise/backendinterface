'use strict'
require('express-session')
const bcrypt = require('bcryptjs')

const config = require('../../../config/config')
const { callGetCredentialsByClientId } = require('../../mysql/get.petitions')
const jwt = require('jsonwebtoken')

async function requestAuthToken (body) {
  const result = await callGetCredentialsByClientId(body.ClientId)
  const secretKey = config.secret
  const hashChecker = await bcrypt.compare(body.ClientSecret, result.Client_secret)
  if (hashChecker) {
    const payload = {
      id: result.id,
      client: result.client,
      client_id: result.client_id,
      timestamp: result.timestamp
    }
    const token = jwt.sign(payload, secretKey, {
      expiresIn: '12h'
    })
    const res = {
      token: token
    }
    return res
  }
  throw new Error('Bad credentials')
}

module.exports = () => {
  return {
    requestAuthToken
  }
}
