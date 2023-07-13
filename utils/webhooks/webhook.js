/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
const request = require('request');
const controllerDeliveries = require('../../api/components/deliveries/controller')()
const { callGetAllPayloads } = require('../../api/mysql/get.petitions')
const dateNow = require('../functions/functions')
const messages = require('../functions/messages')

module.exports = () => {
  const payLoadFn = async (delivery) => {
    return await controllerDeliveries.requestInformation({ DeliveryID: delivery })
  }

  const requestInformation = async (url, delivery, client) => {
    let message = messages.dataMessages[2]
    if (delivery.STATE === 'Cancel Delivery') message = messages.dataMessages[4]
    if (delivery.STATE === 'Standby delivery') message = messages.dataMessages[9]
    if (delivery.STATE === 'Close Delivery') message = messages.dataMessages[10]
    const jsonData = {
      STATUS: 'Success',
      DESCRIPTION: message,
      DATA: delivery,
      TIMESTAMP: dateNow.getDateNow()
    }
    const options = {
      uri: url,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      json: jsonData
    }

    request.post(url, options).on('response', response => {
      if (response) console.log(`Sending information to ${client}, payload: ${delivery.DELIVERY_ID}, Host: ${url}`)
    }).on('error', error => {
      console.log(error)
    })
  }

  const payloadDelivery = async () => {
    console.log('Sending information')
    const uidPayloads = await callGetAllPayloads()
    uidPayloads.forEach(async (array) => {
      const delivery = await payLoadFn(array.UID_PAYLOAD)
      if (array.URL_WEBHOOK) {
        await requestInformation(array.URL_WEBHOOK, delivery, array.NOMBRE_OPERADOR)
      }
    })
  }

  return {
    requestInformation,
    payloadDelivery,
    payLoadFn
  }
}
