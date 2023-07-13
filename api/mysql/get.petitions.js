const connectionMySQL = require('../../modules/Database')

exports.callGetCredentialsByClientId = async (clientId) => {
  const result = await connectionMySQL.call('DELIVERY_GET_CREDENTIALS_BY_CLIENT_ID', clientId)
  if (result) return result[0]
  return result
}

exports.callGetAllDeliveriesOnGoing = async (store) => {
  const result = await connectionMySQL.call('DELIVERY_GET_DELIVERIES', store)
  if (result) return result
  return result
}

exports.callGetContainers = async (uid) => {
  const result = await connectionMySQL.call('GET_UID_STORAGE', uid)
  if (result) return result
  return result
}

exports.callGetVehicleLocation = async (uid) => {
  const result = await connectionMySQL.call('DELIVERY_GET_UBICATION_VEHICLE', uid)
  if (result) return result
  return result
}

exports.callGetIMEIByMac = async (macAddress) => {
  const result = await connectionMySQL.call('DELIVERY_GET_IMEI_BY_MAC', macAddress)
  if (result) return result[0]
  return result
}

exports.callGetGMTHourStore = async (store) => {
  const result = await connectionMySQL.call('DELIVERY_GET_GMT_STORE', store)
  if (result) return result[0]
  return result
}

exports.callGetInformationByPayload = async (payload) => {
  const result = await connectionMySQL.call('DELIVERY_GET_INFORMATION', payload)
  return result[0]
}

exports.callGetPayloadStatus = async (payload) => {
  const result = await connectionMySQL.call('DELIVERY_GET_STATUS_PAYLOAD', payload)
  return result[0]
}

exports.callGetCancelPayload = async (payload) => {
  const result = await connectionMySQL.call('DELIVERY_CANCEL_DELIVERY', payload)
  return result
}

exports.callGetPayloadInformation = async (payload) => {
  const result = await connectionMySQL.call('GET_PAYLOAD_INFORMATION', payload)
  return result[0]
}

exports.callGetAllPayloads = async () => {
  const result = await connectionMySQL.call('GET_ALL_DELIVERIES')
  return result
}

exports.callGetAllVehicles = async (name) => {
  const result = await connectionMySQL.call('GET_ALL_VEHICLES_NUMBERS', name)
  return result
}

exports.callGetWebhookByUser = async (name) => {
  const result = await connectionMySQL.call('GET_URL_WEBHOOK', name)
  if (result) return result[0]
  return result
}

exports.callGetDistanceByStore = async (name) => {
  const result = await connectionMySQL.call('GET_MILES_PER_STORE', name)
  if (result) return result[0]
  return result
}

exports.callGetDinamicContainers = async (name) => {
  const result = await connectionMySQL.call('GET_DINAMIC_CONTAINER', name)
  if (result) return result[0]
  return result
}
