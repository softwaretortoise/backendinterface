const connectionMySQL = require('../../modules/Database')

exports.postDeliverRequestRoute = async (lat, lng, idPhysical, idRideRequest, cost, time, distanceMaps, status) => {
  const result = await connectionMySQL.call('DELIVER_ADD_REQUEST_ROUTE', lat, lng, idPhysical.toString(), idRideRequest, cost, time, distanceMaps, status)
  return result[0].UID_RUTA
}

exports.postDeliverRequestRouteAdd = async (store, client, idRideRequest, payload) => {
  const result = await connectionMySQL.call('DELIVERY_ADD_REQUEST_RUTA', store.lat, store.lng, client.lat, client.lng, idRideRequest, 'walmart', payload)
  return result[0].UID
}

exports.postAddClientExternal = async (data, clientSecretHash) => {
  const result = await connectionMySQL.call('DELIVERY_ADD_CREDENTIALS', data.id, data.client, data.client_id, clientSecretHash)
  if (result === undefined) return result
  return result[0]
}

exports.postAddOperatorWithProfile = async (email, nameOperator, pass, apiKey, profile) => {
  const result = await connectionMySQL.call('USERS_ADD_OPERADOR', email, nameOperator, pass, apiKey, profile)
  if (result === undefined) return result

  return result[0]
}

exports.postDeliveryAddPayload = async (data) => {
  const result = await connectionMySQL.call('DELIVERY_ADD_PAYLOAD', data.phone, data.eta, data.latClient, data.lngClient, data.latPickUp, data.lngPickUp, data.name, data.address, data.client, data.vehicle, data.cost, data.distance, data.box)
  if (result === undefined) return result
  return result[0]
}

exports.postWebHookUrl = async (url, client) => {
  console.log(url)
  const result = await connectionMySQL.call('UPDATE_WEBHOOK_URL', url, client)
  return result
}

exports.postMedicineAlcohol = async (alcohol, medicine, uid) => {
  const result = await connectionMySQL.call('ADD_ALC_MED_PAYLOAD', alcohol, medicine, uid)
  return result
}

exports.postWindowDelivery = async (pickup, dropoff, uid) => {
  const result = await connectionMySQL.call('ADD_WINDOW_DELIVERY', pickup, dropoff, uid)
  return result
}
