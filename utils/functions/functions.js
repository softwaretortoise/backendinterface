const config = require('../../config/config')
const fetch = require('node-fetch')
const nodemailer = require('nodemailer')
const getRandomValues = require('get-random-values')
const GMT = require('node-gmt')
const { geocoder } = require('./geoCoder')

const addCero = (num) => {
  return num < 10 ? `0${num}` : num
}

exports.getLatLonByAddress = async (address) => {
  try {
    const result = await geocoder.geocode(address)
    return {
      lat: result[0].latitude,
      lon: result[0].longitude
    }
  } catch (e) {
    console.log(e)
  }
}

exports.getDateNow = (dateGetThem, gmtHours = 'GMT-05:00') => {
  const gmt = new GMT(gmtHours)
  let currentDate = (!dateGetThem) ? new Date() : new Date(dateGetThem)
  currentDate = gmt.relativeDate(currentDate)
  const date = currentDate.getDate()
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()
  const hour = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()

  const yearMonthDay = `${year}/${addCero(month + 1)}/${addCero(date)} ${addCero(hour)}:${addCero(minutes)}:${addCero(seconds)}`
  return yearMonthDay
}

exports.getTime = (time, timestamp, gmtHr, gmtHours = 'GMT-05:00') => {
  const gmt = gmtHr ? new GMT(gmtHr) : new GMT(gmtHours)
  let currentDate = timestamp ? new Date(timestamp) : new Date()
  currentDate = gmt.relativeDate(currentDate)
  const hour = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()
  const timeGetted = getHoursMinSec(parseInt(hour * 3600) + parseInt(minutes * 60) + parseInt(seconds) + time).split(':').slice(0, 2).join(':')
  return hoursPm(timeGetted)
}

exports.getDistance = async (pickup, client) => {
  try {
    let distanceMaps
    const miles = 1.60934
    const foot = 0.0003048
    const meters = 0.001
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.lat},${pickup.lng}&destination=${client.lat},${client.lng}&mode=bicycling&key=${config.maps_key}`
    distanceMaps = await fetch(url)
      .then(res => res.json())
      .then(json => {
        return json
      })
    if (distanceMaps.routes.length < 1) return null
    distanceMaps = distanceMaps.routes[0].legs[0].distance.text
    console.log(distanceMaps)
    const regex = /[a-zA-z]/g
    const checkDist = distanceMaps.match(regex).join('')
    console.log(distanceMaps)
    distanceMaps = distanceMaps.slice(0, distanceMaps.length - 3)
    distanceMaps = distanceMaps.replace(',', '')
    distanceMaps = parseFloat(distanceMaps)
    const result = {
      mi: (distance) => distance * miles,
      ft: (distance) => distance * foot,
      km: (distance) => distance,
      m: (distance) => distance * meters
    }
    console.log(distanceMaps)
    console.log(checkDist)
    return result[checkDist](distanceMaps)
  } catch (error) {
    console.log(error)
  }
}

exports.getDirections = async (pickup, client) => {
  try {
    let address = [
      [
        pickup.lat,
        pickup.lng
      ]
    ]
    let distanceMaps = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.lat},${pickup.lng}&destination=${client.lat},${client.lng}&mode=bicycling&key=${config.maps_key}`)
      .then(res => res.json())
      .then(json => {
        return json
      })
    if (distanceMaps.routes.length < 1) return null
    distanceMaps = distanceMaps.routes[0].legs[0].steps
    distanceMaps.forEach(element => {
      let latLng = []
      latLng = latLng.concat(element.end_location.lat)
      latLng = latLng.concat(element.end_location.lng)
      address = address.concat([latLng])
    })
    return address
  } catch (error) {
    console.log(error)
  }
}

exports.getRandomString = (length) => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}

exports.sendEmailAfterRegister = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: ''
    }
  })

  let email = ''
  if (config.enviroment === 'production') {
    email = ''
  }
  const mailOptions = {
    from: 'Remitente',
    to: email,
    subject: `Client register: ${data.client}`,
    text: `
    Client ${data.client} has been added succesfully:

      id: ${data.id},
      email: ${data.client_email},
      client: ${data.client},
      client_id: ${data.client_id},
      client_secret: ${data.client_secret}

    Regards.
    Tortoise Inc`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      // res.send(500, err.message)
    } else {
      console.log(info)
      // res.status(200).jsonp(req.body)
    }
  })
}

exports.getRandomIntInclusive = (min, max) => {
  let randomBuffer = new Uint8Array(1)
  randomBuffer = getRandomValues(randomBuffer)
  const randomNumber = `0.${randomBuffer[0].toString()}`
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(randomNumber * (max - min + 1)) + min
}

const getCeros = (number) => {
  const result = number < 10 ? `0${number}` : number
  return result
}

const getHoursMinSec = (time) => {
  if (typeof time !== 'number') return '00:00:00'
  let hours
  let minutes = parseInt(time / 60)
  const seconds = getCeros(parseInt(((time / 60) - minutes) * 60))
  if (minutes > 59) {
    hours = parseInt(minutes / 60)
    minutes = parseInt((minutes / 60 - hours) * 60)
    hours = hours > 23 ? hours - 24 : hours
    return `${getCeros(hours)}:${getCeros(minutes)}:${seconds}`
  }
  return `00:${getCeros(minutes)}:${seconds}`
}

const hoursPm = (time) => {
  const hoursPM = {
    12: '12',
    13: '01',
    14: '02',
    15: '03',
    16: '04',
    17: '05',
    18: '06',
    19: '07',
    20: '08',
    21: '09',
    22: '10',
    23: '11',
    24: '00'
  }
  const hour = time.split(':')
  const PmAm = (hour[0] > 11 && hour[0] < 24) ? 'PM' : 'AM'
  hour[0] = (hour[0] > 11 && hour[0] < 24) ? hoursPM[hour[0]] : hour[0]
  return `${hour.join(':')} ${PmAm}`
}
