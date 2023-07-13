/*
 */

let socket_payloadRequest, notifications
const connectionMySQL = require('./Database.js')
/** @type {Array<teleopRequest>} */
const payloadRequests = {}

// Inicializar

connectionMySQL.query('CALL DELIVERY_GET_UNASIGNED()', (err, response) => {
  if (err) {
    console.log('PayloadRequests lists'.red, 'Error', err)
    return
  }

  for (const row of response[0]) {
    const payloadRequest = new PayloadRequest(
      row.UID_PAYLOAD,
      row.STATUS,
      row.TYPE,
      row.STORE,
      row.ADDRESS,
      row.REQUESTED_DATETIME,
      row.UID_OPERADOR,
      row.UID_VEHICULO,
      {lat: row.REQUESTED_LATITUDE, lng: row.REQUESTED_LONGITUDE},
      {lat: row.START_LATITUDE, lng: row.START_LONGITUDE}
    )
    payloadRequests[row.UID_PAYLOAD] = payloadRequest
  }
})

class PayloadRequest {
  constructor(uid, status, payloadType, store, address, requestTime, operatorId, vehicleId, destination, origin) {
    this.uid = uid
    this.status = status
    this.type = payloadType
    this.store = store
    this.requestTime = requestTime
    this.address = address
    this.operatorId = operatorId
    this.vehicleId = vehicleId
    this.origin = origin
    this.destination = destination
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
      'type': this.type,
      requestTime: this.requestTime,
      address: this.address,
      operatorId: this.operatorId,
      vehicleId: this.vehicleId,
      origin: this.origin,
      destination: this.destination
    }
  }
}


// Esto es necesario para sincronizar las solicitudes entre todos servidores :(
setInterval(refresh, 1000)
function refresh() {
  connectionMySQL.query('CALL DELIVERY_GET_UNASIGNED()', (err, response) => {
    if (err) {
      console.log('PayloadRequests lists'.red, 'Error', err)
      return
    }
    let payloadRequest
    let isnew = false
    const availableList = []
    for (const row of response[0]) {
      if (!payloadRequests[row.UID_PAYLOAD]) { // Si no existe lo crea
        isnew = true
        payloadRequest = new PayloadRequest(
          row.UID_PAYLOAD,
          row.STATUS,
          row.TYPE,
          row.STORE,
          row.ADDRESS,
          row.REQUESTED_DATETIME,
          row.UID_OPERADOR,
          row.UID_VEHICULO,
          {lat: row.REQUESTED_LATITUDE, lng: row.REQUESTED_LONGITUDE},
          {lat: row.START_LATITUDE, lng: row.START_LONGITUDE}
        )
        payloadRequests[row.UID_PAYLOAD] = payloadRequest
      }
      payloadRequest = payloadRequests[row.UID_PAYLOAD] // Aquí existe sea nueva o antiuga

      if (payloadRequest.status !== row.STATUS || isnew) { // Si hay cambio de estatus o es nuevo
        if (!isnew) {
          payloadRequest.status = row.STATUS
        }
        socket_payloadRequest.emit('update', payloadRequest.exportData())
      }
      availableList.push(row.UID_PAYLOAD.toString()) // Los que dejen de estar aquí serán eliminados
    }

    for (const uid in payloadRequests) {
      if (availableList.indexOf(uid.toString()) < 0) {
        payloadRequests[uid].status = 'Closed' // se marca como finalizada para avisar al frontend
        socket_payloadRequest.emit('update', payloadRequests[uid].exportData())
        delete payloadRequests[uid]
      }
    }
  })
}

const setup = function (socketIo, app) {
  const middlewares = require('../network/middlewares.js')
  socket_payloadRequest = socketIo.of('/payloadRequests')
  socket_payloadRequest.use(function (socket, next) {
    middlewares.sessionMiddleware(socket.request, socket.request.res || {}, next)
  })
  socket_payloadRequest.on('connection', function (socket) {
    if (!socket.request.session.user) {
      socket.request.session.user = {};
    }
    const userId = socket.request.session.user.id
    if (!userId) {
      socket.disconnect()
    }
    const payloadRequests_list = []
    for (const uid in payloadRequests) {
      const payloadRequest = payloadRequests[uid]
      payloadRequests_list.push(payloadRequest.exportData())
    }
    socket.emit('list', payloadRequests_list)
    socket.on('disconnect', () => {
    })
  })
}

module.exports = {
  setup,
  payloadRequests
}
