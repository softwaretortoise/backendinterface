'use strict'
const request = require('request')
const {
  callGetPayloadStatus,
  callGetInformationByPayload,
  callGetPayloadInformation,
  callGetCancelPayload,
  callGetAllVehicles,
  callGetWebhookByUser,
  callGetDistanceByStore,
  callGetGMTHourStore,
  callGetDinamicContainers
} = require('../../mysql/get.petitions')
// const { postDeliverRequestRoute, postDeliverRequestRouteAdd } = require('../../mysql/post.petitions')
const {
  postDeliveryAddPayload,
  postWebHookUrl,
  postMedicineAlcohol,
  postWindowDelivery
} = require('../../mysql/post.petitions')
const { reverse, costPerMilles, timeEstimated } = require('../../../utils/functions/address.geoCoder')
const {
  getDistance,
  getDateNow,
  getLatLonByAddress
} = require('../../../utils/functions/functions')
const dateNow = require('../../../utils/functions/functions')
const messages = require('../../../utils/functions/messages')

const regNumbers = /[0-9]/g
const regName = /[A-Za-z]/g
const speedWagon = 1.5

const submitInformation = async (url, delivery, client) => {
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

module.exports = () => {
  const requestInformation = async (body) => {
    if (!body.DeliveryID) throw new Error(1)
    let result = await callGetInformationByPayload(body.DeliveryID)
    if (!result) {
      result = await callGetPayloadInformation(body.DeliveryID)
    }
    if (result === undefined) throw new Error(9)
    if (!result.UBICACION_GPS_LAT) result.UBICACION_GPS_LAT = result.GPS_LAT_INICIO
    if (!result.UBICACION_GPS_LON) result.UBICACION_GPS_LON = result.GPS_LON_INICIO
    if (result.TYPE === 'RETURN TRIP') {
      const latTemp = result.GPS_LAT_INICIO
      const lonTemp = result.GPS_LON_INICIO
      result.GPS_LAT_INICIO = result.GPS_LAT_FINAL
      result.GPS_LON_INICIO = result.GPS_LON_FINAL
      result.GPS_LAT_FINAL = latTemp
      result.GPS_LON_FINAL = lonTemp
    }
    result = {
      DELIVERY_ID: result.UID_PAYLOAD,
      STATE: result.STATUS,
      STATUS: result.TYPE,
      TOTAL_ETA: result.ETA,
      COST: result.COST,
      ON_GOING: {
        LATITUDE: parseFloat((result.UBICACION_GPS_LAT).toFixed(4)),
        LONGITUDE: parseFloat((result.UBICACION_GPS_LON).toFixed(4)),
        DATETIME: getDateNow()
      },
      PICKUP_LOCATION: {
        LATITUDE: parseFloat((result.GPS_LAT_INICIO).toFixed(4)),
        LONGITUDE: parseFloat((result.GPS_LON_INICIO).toFixed(4)),
        DATETIME: getDateNow(result.FECHA_INICIO)
      },
      DELIVERY_LOCATION: {
        LATITUDE: parseFloat((result.GPS_LAT_FINAL).toFixed(4)),
        LONGITUDE: parseFloat((result.GPS_LON_FINAL).toFixed(4)),
        DATETIME: getDateNow(result.FECHA_FIN)
      }
    }
    return result
  }

  const requestDelivery = async (body, user) => {
    if (!body.LatitudeCostumer || !body.LongitudeCostumer) {
      const coorCosTemp = await getLatLonByAddress(body.AddressCostumer)
      body.LatitudeCostumer = coorCosTemp.lat
      body.LongitudeCostumer = coorCosTemp.lon
    }
    if (!body.LatitudePickUp || !body.LongitudePickUp) {
      const coorPickTemp = await getLatLonByAddress(body.AddressPickUp)
      body.LatitudePickUp = coorPickTemp.lat
      body.LongitudePickUp = coorPickTemp.lon
    }
    if (
      !body.LatitudeCostumer ||
      !body.LongitudeCostumer ||
      !body.LatitudePickUp ||
      !body.LongitudePickUp ||
      !body.Cellphone ||
      !body.Name) throw new Error(1)

    const array = []
    const allVehicles = await callGetAllVehicles(user.client)
    allVehicles.forEach(element => {
      array.push(element.UID_VEHICULO)
    })
    const include = array.includes(body.Vehicle)
    if (!include) throw new Error(13)

    body.Cellphone = (body.Cellphone).replace('+', '')
    body.Cellphone = (body.Cellphone).toString().split(' ').join('')

    let numberCel = (body.Cellphone).toString().match(regNumbers)
    if (numberCel === null) throw new Error(6)

    numberCel = (body.Cellphone).toString().match(regNumbers).join('')
    if (numberCel !== body.Cellphone) throw new Error(6)

    const cellMatrix = body.Cellphone.split('')
    if (cellMatrix.length < 11 && cellMatrix.length > 12) throw new Error(6)
    const nameComparison = (body.Name).toString().split(' ').join('')
    const name = (body.Name).toString().match(regName).join('')
    if (name !== nameComparison) throw new Error(7)

    let addressPick
    let addressClient
    if (body.LatitudeCostumer && body.LongitudeCostumer) {
      addressClient = await reverse(body.LatitudeCostumer, body.LongitudeCostumer)
      body.AddressCostumer = addressClient.formattedAddress
    }
    if (body.LatitudePickUp && body.LongitudePickUp) {
      addressPick = await reverse(body.LatitudePickUp, body.LongitudePickUp)
      body.AddressPickUp = addressPick.formattedAddress
    }
    const deliveryPickUp = {
      lat: body.LatitudePickUp,
      lng: body.LongitudePickUp
    }

    const deliveryClient = {
      lat: body.LatitudeCostumer,
      lng: body.LongitudeCostumer
    }

    const distanceMaps = await getDistance(deliveryPickUp, deliveryClient)
    console.log(distanceMaps)
    let kmPermission = await callGetDistanceByStore(user.client)
    const miles = 1.60934
    kmPermission = kmPermission ? (kmPermission.miles * miles) : (3 * miles)
    if (distanceMaps === null) throw new Error(10)
    if (distanceMaps > kmPermission) throw new Error(10)

    const cost = costPerMilles(distanceMaps)
    const time = timeEstimated(distanceMaps, speedWagon)
    const box = await callGetDinamicContainers(body.user.client)
    console.log(box)
    if (box.dinamic_containers === 0) body.Box = 0
    console.log(body.Box)
    const data = {
      phone: body.Cellphone,
      eta: time,
      uidRuta: '',
      latClient: body.LatitudeCostumer,
      lngClient: body.LongitudeCostumer,
      latPickUp: body.LatitudePickUp,
      lngPickUp: body.LongitudePickUp,
      client: body.user.client,
      cost: cost.toString(),
      distance: distanceMaps,
      name: body.Name,
      address: body.AddressCostumer,
      vehicle: body.Vehicle,
      box: body.Box
    }
    const payload = await postDeliveryAddPayload(data)
    const requestPayload = await requestInformation({ DeliveryID: payload.UID_PAYLOAD })
    const webhookArray = await callGetWebhookByUser(body.user.client)
    if (webhookArray) {
      if (webhookArray.URL_WEBHOOK) {
        await submitInformation(webhookArray.URL_WEBHOOK, requestPayload, body.user.client)
      }
    }
    const alcohol = body.alcohol ? 1 : 0
    const medicine = body.medicine ? 1 : 0
    const hours = await callGetGMTHourStore(user.client)
    const pickup = body.PickupWindow ? dateNow.getDateNow(body.PickupWindow, hours.GMT) : 0
    const dropoff = body.DropoffWindow ? dateNow.getDateNow(body.DropoffWindow, hours.GMT) : 0
    await postMedicineAlcohol(alcohol, medicine, payload.UID_PAYLOAD)
    await postWindowDelivery(pickup, dropoff, payload.UID_PAYLOAD)
    return {
      DELIVERY_ID: payload.UID_PAYLOAD
    }
  }

  const requestCancel = async (body) => {
    if (!body.DeliveryID) throw new Error(1)
    let result = await callGetPayloadStatus(body.DeliveryID)
    console.log('res', result)
    if (!result) throw new Error(11)
    if (result.STATUS === 'Standby delivery') {
      try {
        const cancellation = await callGetCancelPayload(body.DeliveryID)
        console.log(cancellation)
      } catch (e) {
        console.log(e)
      }
      result = {
        DELIVERY_ID: body.DeliveryID
      }
      console.log('result', result)
      return result
    }
    if (result.STATUS === 'Cancel Delivery') throw new Error(12)
    throw new Error(4)
  }

  const addUrl = async (body, user) => {
    const url = body.url || body.URL
    console.log(url)
    if (!url) throw new Error(1)
    const result = await postWebHookUrl(url, user.client_id)
    return result
  }

  return {
    requestDelivery,
    requestInformation,
    requestCancel,
    addUrl
  }
}
