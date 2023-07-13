const vehicleBridge = require('../modules/VehicleBridge')

module.exports = function (httpsServer) {
  const socketIo = require('socket.io')(httpsServer)
  this.socketIo = socketIo
  const middlewares = require('./middlewares')
  socketIo.use(function (socket, next) {
    middlewares.sessionMiddleware(socket.request, socket.request.res || {}, next)
  })

  // --------------------------------- Canal para solicitudes de teleoperación --/
  const teleopRequests_data = {}

  const socket_solicitudesTeleoperador = socketIo.of('/solicitudesTeleoperador')
  socket_solicitudesTeleoperador.on('connection', function (socket) {
    const userId = socket.request.session.user.id
    if (!userId) {
      socket.disconnect()
    }
    socket.join(userId)
    getSolicitudes(userId, true)

    // socket.emit('solicitudes', teleopRequests_data[userId]);
    socket.on('disconnect', () => {
    })
  })

  this.refreshSolicitudes = function () {
    for (const uid in socket_solicitudesTeleoperador.adapter.rooms) {
      if (socket_solicitudesTeleoperador.adapter.rooms[uid].length > 0) {
        getSolicitudes(uid)
      }
    }
  }

  const teleopRequests_interval = setInterval(this.refreshSolicitudes, 2000)

  function getSolicitudes (uid_teleoperador, force) {
    let solicitudes
    mysqlJson.query('CALL SOLICITUDES_TELEOPERADOR(' + uid_teleoperador + ');', (err, response) => {
      if (err) {
        return
      }
      solicitudes = response[0]
      if (!force && JSON.stringify(solicitudes) === JSON.stringify(teleopRequests_data[uid_teleoperador])) {
        return
      }
      teleopRequests_data[uid_teleoperador] = solicitudes
      socket_solicitudesTeleoperador.to(uid_teleoperador).volatile.emit('solicitudes', solicitudes)
    })
  }
  return this

  const active_delivery = {}
  const socket_delivery = socketIo.of('/delivery/socket')
  socket_delivery.on('connection', function (socket) {
    const userId = socket.request.session.idTeleoperador
    if (!userId) {
      socket.disconnect()
    }
    socket.emit('active', active_delivery)
    socket.on('disconnect', () => {
    })
  })

  this.refreshDelivery = async function () {
    const result = await mysqlJson.call('DELIVERY_LIST_ACTIVE')
    for (const row of result) {

    }
  }

  //    const teleopRequests_interval = setInterval(this.refreshDelivery, 2000);
}
