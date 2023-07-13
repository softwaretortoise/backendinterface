/*
 */

let socket_teleopRequest, notifications
const connectionMySQL = require('./Database.js')
/** @type {Array<teleopRequest>} */
const teleopRequests = {}

// Inicializar

connectionMySQL.query('CALL TELEOPREQUEST_LIST()', (err, response) => {
  if (err) {
    console.log('TeleopRequests lists'.red, 'Error', err)
    return
  }

  for (const row of response[0]) {
    const teleopRequest = new TeleopRequest(
      row.UID_RUTA,
      row.ID_ESTATUS_SOLICITUD,
      row.ID_RIDE_REQUEST_EXT,
      { lat: row.GPS_LAT_FINAL, lon: row.GPS_LON_FINAL },
      row.FECHA_INICIO,
      row.UID_OPERADOR,
      row.UID_PHYSICAL,
      row.UID_VEHICULO,
      row.UID_TELEOPERADOR,
      row.UID_PAYLOAD
    )
    teleopRequests[row.UID_RUTA] = teleopRequest
  }
})

class TeleopRequest {
  constructor(uid, status, externalId, targetLocation, requestTime, operatorId, IMEI, vehicleId, teleoperator, payload) {
    this.uid = uid
    this.status = Number(status)
    this.externalID = externalId
    this.requestTime = requestTime
    this.targetLocation = targetLocation
    this.operatorId = operatorId
    this.IMEI = IMEI
    this.vehicleId = vehicleId
    this.teleoperator = teleoperator
    this.payload = payload
  }

  set status(val) {
    this._status = val
    switch (val) {
      case 14:
        //      notifications.notifyAll('Nueva solicitud de teleoperación: ' + this.uid);
        break
      case 15:
        //     notifications.notifyUser(this.teleoperator, 'Solicitud de teleoperación iniciada ' + this.uid);
        break
    }
  }

  get status() {
    return this._status
  }

  exportData() {
    return {
      uid: this.uid,
      status: this.status,
      externalId: this.externalID,
      requestTime: this.requestTime,
      targetLocation: this.targetLocation,
      operatorId: this.operatorId,
      IMEI: this.IMEI,
      teleoperator: this.teleoperator,
      vehicleId: this.vehicleId,
      payload: this.payload
    }
  }
}

/**
 * 
 * @param {Number} uid_ruta 
 * @param {Number} uid_vehiculo 
 * @param {Number} uid_teleoperador 
 * @returns {Object}
 */
async function TeleopRequestStart(uid_ruta, uid_vehiculo, uid_teleoperador) {
  const result = await connectionMySQL.call('TELEOPREQUEST_START', uid_ruta, uid_vehiculo, uid_teleoperador)
  return result[0]
}

/**
 * 
 * @param {Number} uid_ruta 
 * @returns {Object}
 */
async function TeleopRequestEnd(uid_ruta) {
  const result = await connectionMySQL.call('TELEOPREQUEST_END',uid_ruta)
  return result[0]
}
/**
 * Add new teleoperation request
 * @param {Number} lat 
 * @param {Number} lng 
 * @param {Number*} uid_operador 
 * @param {Number} idRideRequest 
 * @returns 
 */
async function TeleopRequestAdd(lat, lng, uid_operador, idRideRequest) {
  data = await connectionMySQL.call('TELEOPREQUEST_ADD', lat, lng, uid_operador, idRideRequest)
  const response = data[0];
  console.log(response)
  const uid = response.UID_RUTA
  const requestTime = response.FECHA_INICIO
  const teleopRequest = new TeleopRequest(
    uid,
    14,
    idRideRequest,
    { lat: Number(lat), lon: Number(lng) },
    requestTime,
    uid_operador
  )
  teleopRequests[uid] = teleopRequest
  socket_teleopRequest.emit('update', teleopRequest.exportData())
  console.log(teleopRequest)
  return response
}


// Esto es necesario para sincronizar las solicitudes entre todos servidores :(
setInterval(refresh, 1000)
function refresh() {
  connectionMySQL.query('CALL TELEOPREQUEST_LIST()', (err, response) => {
    if (err) {
      console.log('TeleopRequests lists'.red, 'Error', err)
      return
    }
    let teleopRequest
    let isnew = false
    const availableList = []
    for (const row of response[0]) {
      if (!teleopRequests[row.UID_RUTA]) { // Si no existe lo crea
        isnew = true
        teleopRequest = new TeleopRequest(
          row.UID_RUTA,
          row.ID_ESTATUS_SOLICITUD,
          row.ID_RIDE_REQUEST_EXT,
          { lat: row.GPS_LAT_FINAL, lon: row.GPS_LON_FINAL },
          row.FECHA_INICIO,
          row.UID_OPERADOR,
          row.UID_PHYSICAL,
          row.UID_VEHICULO,
          row.UID_TELEOPERADOR,
          row.UID_PAYLOAD
        )
        teleopRequests[row.UID_RUTA] = teleopRequest
      }
      teleopRequest = teleopRequests[row.UID_RUTA] // Aquí existe sea nueva o antiuga

      if (teleopRequest.status !== Number(row.ID_ESTATUS_SOLICITUD) || isnew) { // Si hay cambio de estatus o es nuevo
        if (!isnew) {
          teleopRequest.status = row.ID_ESTATUS_SOLICITUD
        }
        teleopRequest.IMEI = row.UID_PHYSICAL
        teleopRequest.teleoperator = row.UID_TELEOPERADOR
        teleopRequest.vehicleId = row.UID_VEHICULO
        socket_teleopRequest.emit('update', teleopRequest.exportData())
      }

      if (teleopRequest.status === 14 || teleopRequest.status === 15) {
        availableList.push(row.UID_RUTA.toString()) // Los que dejen de estar aquí serán eliminados
      }
    }

    for (const uid in teleopRequests) {
      if (availableList.indexOf(uid.toString()) < 0) {
        teleopRequests[uid].status = 16 // se marca como finalizada para avisar al frontend
        socket_teleopRequest.emit('update', teleopRequests[uid].exportData())
        delete teleopRequests[uid]
      }
    }
  })
}

const setup = function (socketIo, app) {
  const middlewares = require('../network/middlewares.js')
  socket_teleopRequest = socketIo.of('/teleopRequests')
  socket_teleopRequest.use(function (socket, next) {
    middlewares.sessionMiddleware(socket.request, socket.request.res || {}, next)
  })
  socket_teleopRequest.on('connection', function (socket) {
    if (!socket.request.session.user) {
      socket.request.session.user = {};
    }
    const userId = socket.request.session.user.id
    if (!userId) {
      socket.disconnect()
    }
    const teleopRequests_list = []
    for (const uid in teleopRequests) {
      const teleopRequest = teleopRequests[uid]
      if (teleopRequest.status === 14 || Number(teleopRequest.teleoperator) === Number(socket.request.session.teleopId)) {
        teleopRequests_list.push(teleopRequest.exportData())
      }
    }
    socket.emit('list', teleopRequests_list)
    socket.on('disconnect', () => {
    })
  })
}

module.exports = {
  setup,
  teleopRequests,
  TeleopRequestAdd,
  TeleopRequestStart,
  TeleopRequestEnd
}
