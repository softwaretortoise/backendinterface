'use strict'

const express = require('express')
const passport = require('passport')
const router = express.Router()
const response = require('../../../network/response')
const controller = require('./controller')()
const messages = require('../../../utils/functions/messages')
const { errorsMessage, errorsDescription } = require('../../../utils/functions/messages')

require('../../../network/jwt.authentication')

const requestDelivery = async (req, res) => {
  try {
    req.body.user = req.user
    const result = await controller.requestDelivery(req.body, req.user)
    response.success(req, res, result, messages.dataMessages[0], 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, errorsDescription[e.message], 400, errorsMessage[e.message])
  }
}

const requestInformation = async (req, res) => {
  try {
    const result = await controller.requestInformation(req.body)
    let message = messages.dataMessages[2]
    if (result.STATE === 'Cancel Delivery') message = messages.dataMessages[4]
    if (result.STATE === 'Standby delivery') message = messages.dataMessages[9]
    if (result.STATE === 'Close Delivery') message = messages.dataMessages[10]

    response.success(req, res, result, message, 200)
  } catch (e) {
    response.error(req, res, errorsDescription[e.message], 400, errorsMessage[e.message])
  }
}

const requestCancel = async (req, res) => {
  try {
    const result = await controller.requestCancel(req.body)
    response.success(req, res, result, messages.dataMessages[4], 200)
  } catch (e) {
    response.error(req, res, errorsDescription[e.message], 400, errorsMessage[e.message])
  }
}

const addUrl = async (req, res) => {
  try {
    const result = await controller.addUrl(req.body, req.user)
    response.success(req, res, result, 'ok', 200)
  } catch (e) {
    response.error(req, res, errorsDescription[e.message], 400, errorsMessage[e.message])
  }
}

router.post('/', passport.authenticate('jwt', { session: false }), requestDelivery)
router.post('/information', passport.authenticate('jwt', { session: false }), requestInformation)
router.post('/cancel', passport.authenticate('jwt', { session: false }), requestCancel)
router.post('/add-url', passport.authenticate('jwt', { session: false }), addUrl)

module.exports = router
