'use strict'

const express = require('express')
const router = express.Router()
const response = require('../../../network/response')
const controller = require('./controller')()

const requestAuthToken = async (req, res) => {
  try {
    const result = await controller.requestAuthToken(req.body)
    response.success(req, res, result, 'ok', 200)
  } catch (e) {
    response.errorToken(req, res, 401)
  }
}

router.post('/token', requestAuthToken)

module.exports = router
