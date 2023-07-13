const { geocoder } = require('./geoCoder')
// const { log } = require('../util/general')

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

const checkTypeString = (data) => {
  if (typeof data === 'string') return 1
  return -1
}

const checkTypeObject = (data) => {
  if (typeof data === 'object') return 1
  return -1
}

const checkTypeNull = (data) => {
  if (data === null) return 1
  return -1
}

const checkTypeUndefined = (data) => {
  if (!data) return 1
  return -1
}

const getCeros = (number) => {
  const cost = parseInt(number)
  number = parseInt((number.toFixed(2) - cost) * 100)
  number = number < 10 ? `0${number}` : number
  return `${cost}.${number}`
}

module.exports = {
  reverse: async (lat, lon) => {
    if (checkTypeString(lat) === 1) return 'lat should be a number!'
    if (checkTypeNull(lat) === 1) return 'lat should be get a content!'
    if (checkTypeObject(lat) === 1) return 'lat should not be an object!'
    if (checkTypeUndefined(lat) === 1) return 'lat should be get a content!'
    if (checkTypeString(lon) === 1) return 'lng should be a number!'
    if (checkTypeNull(lon) === 1) return 'lng should be get a content!'
    if (checkTypeObject(lon) === 1) return 'lng should not be an object!'
    if (checkTypeUndefined(lon) === 1) return 'lng should be get a content!'
    const res = await geocoder.reverse({ lat, lon }).catch((error) => {
      console.error({ STATUS: 'error', DESCRIPTION: 'Error reverse geocoding!', STACK: error })
      return 'Error reverse geocoding!'
    })
    return res[0]
  },

  kmDistance: (coordenadasOrigin, coordenadasEnd) => {
    if (checkTypeString(coordenadasOrigin.lat) === 1) return 'coordenadasOrigin lat should be a number!'
    if (checkTypeNull(coordenadasOrigin.lat) === 1) return 'coordenadasOrigin lat should be get a content!'
    if (checkTypeObject(coordenadasOrigin.lat) === 1) return 'coordenadasOrigin lat should not be an object!'
    if (checkTypeUndefined(coordenadasOrigin.lat) === 1) return 'coordenadasOrigin lat should be get a content!'

    if (checkTypeString(coordenadasOrigin.lng) === 1) return 'coordenadasOrigin lng should be a number!'
    if (checkTypeNull(coordenadasOrigin.lng) === 1) return 'coordenadasOrigin lng should be get a content!'
    if (checkTypeObject(coordenadasOrigin.lng) === 1) return 'coordenadasOrigin lng should not be an object!'
    if (checkTypeUndefined(coordenadasOrigin.lng) === 1) return 'coordenadasOrigin lng should be get a content!'

    if (checkTypeString(coordenadasEnd.lat) === 1) return 'coordenadasEnd lat should be a number!'
    if (checkTypeNull(coordenadasEnd.lat) === 1) return 'coordenadasEnd lat should be get a content!'
    if (checkTypeObject(coordenadasEnd.lat) === 1) return 'coordenadasEnd lat should not be an object!'
    if (checkTypeUndefined(coordenadasEnd.lat) === 1) return 'coordenadasEnd lat should be get a content!'

    if (checkTypeString(coordenadasEnd.lng) === 1) return 'coordenadasEnd lng should be a number!'
    if (checkTypeNull(coordenadasEnd.lng) === 1) return 'coordenadasEnd lng should be get a content!'
    if (checkTypeObject(coordenadasEnd.lng) === 1) return 'coordenadasEnd lng should not be an object!'
    if (checkTypeUndefined(coordenadasEnd.lng) === 1) return 'coordenadasEnd lng should be get a content!'

    const earthRadius = 6371
    const radiansLatOrigin = degreesToRadians(90 - coordenadasOrigin.lat)
    const radiansLatEnd = degreesToRadians(90 - coordenadasEnd.lat)
    const radiansLonEndAndOrigin = degreesToRadians(coordenadasOrigin.lng - coordenadasEnd.lng)

    const cosLatOrigin = Math.cos(radiansLatOrigin)
    const cosLatEnd = Math.cos(radiansLatEnd)
    const senLatOrigin = Math.sin(radiansLatOrigin)
    const senLatEnd = Math.sin(radiansLatEnd)
    const cosLonEndAndOrigin = Math.cos(radiansLonEndAndOrigin)
    const result = (cosLatOrigin * cosLatEnd) + (senLatOrigin * senLatEnd * cosLonEndAndOrigin)
    const aCosResult = Math.acos(result)
    const returnResult = parseFloat((earthRadius * aCosResult).toFixed(4))
    return returnResult
  },

  costPerMilles: (kilometers) => {
    if (kilometers < 0) return 'kilometers should be more than 0'
    if (kilometers === 0) return '0.00'
    if (checkTypeString(kilometers) === 1) return 'kilometers should be a number!'
    if (checkTypeNull(kilometers) === 1) return 'kilometers should be get a content!'
    if (checkTypeObject(kilometers) === 1) return 'kilometers should not be an object!'
    if (checkTypeUndefined(kilometers) === 1) return 'kilometers should be get a content!'
    const milesToKilometers = 1.60934
    const costPerMile = 1
    const miles = kilometers / milesToKilometers
    const result = parseFloat((costPerMile * miles).toFixed(2))
    return getCeros(result)
  },

  getCerosFn: (cost) => {
    return getCeros(cost)
  },

  timeEstimated: (kilometers, speedWagon) => {
    if (kilometers < 0) return 'kilometers should be more than 0'
    if (kilometers === 0) return 0
    if (checkTypeString(kilometers) === 1) return 'kilometers should be a number!'
    if (checkTypeNull(kilometers) === 1) return 'kilometers should be get a content!'
    if (checkTypeObject(kilometers) === 1) return 'kilometers should not be an object!'
    if (checkTypeUndefined(kilometers) === 1) return 'kilometers should be get a content!'
    const metersToKm = 1000
    const kmConverterToMeter = metersToKm * kilometers
    const result = parseInt(kmConverterToMeter / speedWagon)
    return result
  }
}
