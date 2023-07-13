'use strict'
const dateNow = require('../utils/functions/functions')
const { errorsDescription, errorsMessage } = require('../utils/functions/messages')
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {any} message
 * @param {String} desc
 * @param {Number} status
 */
exports.success = (req, res, message, desc, status) => {
  const statusCode = status || 200
  const statusData = message || ''
  const statusDesc = desc || 'ok'
  res.status(statusCode).send({
    STATUS: 'Success',
    DESCRIPTION: statusDesc,
    DATA: statusData,
    TIMESTAMP: dateNow.getDateNow()
  })
}
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {any} message
 * @param {String} status
 * @param {Number} error
 */
exports.error = (req, res, message, status, error) => {
  const statusError = error || errorsMessage[2]
  const statusCode = status || 500
  const statusMessage = message || errorsDescription[2]
  res.status(statusCode).send({
    CODE: statusError,
    DESCRIPTION: statusMessage,
    DATA: null,
    TIMESTAMP: dateNow.getDateNow()
  })
}

exports.errorToken = (req, res, status) => {
  const statusCode = status || 500
  res.status(statusCode).send({
    ERROR: 'Success',
    DESCRIPTION: 'Bad credentials'
  })
}
