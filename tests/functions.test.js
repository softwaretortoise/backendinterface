/* eslint-env mocha */
// const dateNow = require('../utils/functions/functions')
const {
  errorsDescription,
  errorsMessage,
  dataMessages,
  statusMessages
} = require('../utils/functions/messages')

const { reverse, kmDistance, costPerMilles, timeEstimated } = require('../utils/functions/address.geoCoder')

describe('error messages', () => {
  it('Should return message fejR79NT', () => {
    const result = 'fejR79NT'
    expect(errorsMessage[0]).toEqual(result)
  })

  it('Should return message b2KI7NOE', () => {
    const result = 'b2KI7NOE'
    expect(errorsMessage[1]).toEqual(result)
  })

  it('Should return message 0vugE5lQ', () => {
    const result = '0vugE5lQ'
    expect(errorsMessage[2]).toEqual(result)
  })

  it('Should return message 01e7yDrM', () => {
    const result = '01e7yDrM'
    expect(errorsMessage[3]).toEqual(result)
  })

  it('Should return message pX7kvIYy', () => {
    const result = 'pX7kvIYy'
    expect(errorsMessage[4]).toEqual(result)
  })

  it('Should return message mR9S1Hyg', () => {
    const result = 'mR9S1Hyg'
    expect(errorsMessage[5]).toEqual(result)
  })

  it('Should return message HetaWdLz', () => {
    const result = 'HetaWdLz'
    expect(errorsMessage[6]).toEqual(result)
  })

  it('Should return message qTYv9cr4', () => {
    const result = 'qTYv9cr4'
    expect(errorsMessage[7]).toEqual(result)
  })

  it('Should return message M8iZYmDj', () => {
    const result = 'M8iZYmDj'
    expect(errorsMessage[8]).toEqual(result)
  })

  it('Should return message HVAr3W2n', () => {
    const result = 'HVAr3W2n'
    expect(errorsMessage[9]).toEqual(result)
  })

  it('Should return message eUXONdb5', () => {
    const result = 'eUXONdb5'
    expect(errorsMessage[10]).toEqual(result)
  })

  it('Should return message zHQCmXwV', () => {
    const result = 'zHQCmXwV'
    expect(errorsMessage[11]).toEqual(result)
  })

  it('Should return message IqJBFRSK', () => {
    const result = 'IqJBFRSK'
    expect(errorsMessage[12]).toEqual(result)
  })

  it('Should return message N0j6tzPV', () => {
    const result = 'N0j6tzPV'
    expect(errorsMessage[13]).toEqual(result)
  })

})

describe('error description', () => {
  it('Should return message Authentication failed!', () => {
    const result = 'Authentication failed!'
    expect(errorsDescription[0]).toEqual(result)
  })

  it('Should return message Missing POST parameters!', () => {
    const result = 'Missing POST parameters!'
    expect(errorsDescription[1]).toEqual(result)
  })

  it('Should return message Server error!', () => {
    const result = 'Server error!'
    expect(errorsDescription[2]).toEqual(result)
  })

  it('Should return message Set timeout!', () => {
    const result = 'Set timeout!'
    expect(errorsDescription[3]).toEqual(result)
  })

  it('Should return message Delivery on going!', () => {
    const result = 'Delivery on going!'
    expect(errorsDescription[4]).toEqual(result)
  })

  it('Should return message Client not found!', () => {
    const result = 'Client not found!'
    expect(errorsDescription[5]).toEqual(result)
  })

  it('Should return message Invalid cell phone!', () => {
    const result = 'Invalid cell phone!'
    expect(errorsDescription[6]).toEqual(result)
  })

  it('Should return message Invalid name!', () => {
    const result = 'Invalid name!'
    expect(errorsDescription[7]).toEqual(result)
  })

  it('Should return message Error in the request! If this error persists please contact support!', () => {
    const result = 'Error in the request! If this error persists please contact support!'
    expect(errorsDescription[8]).toEqual(result)
  })

  it('Should return message Delivery run not found!', () => {
    const result = 'Delivery run not found!'
    expect(errorsDescription[9]).toEqual(result)
  })

  it('Should return message Location delivery is out of range!', () => {
    const result = 'Location delivery is out of range!'
    expect(errorsDescription[10]).toEqual(result)
  })

  it('Should return message Pickup not found!', () => {
    const result = 'Pickup not found!'
    expect(errorsDescription[11]).toEqual(result)
  })

  it('Should return message Delivery already cancel', () => {
    const result = 'Delivery already cancel'
    expect(errorsDescription[12]).toEqual(result)
  })

  it('Should return message Vehicle not found!', () => {
    const result = 'Vehicle not found!'
    expect(errorsDescription[13]).toEqual(result)
  })
})

describe('data messages', () => {
  it('Should return message Delivery run created correctly', () => {
    const result = 'Delivery run created correctly'
    expect(dataMessages[0]).toEqual(result)
  })

  it('Should return message Delivery time created correctly', () => {
    const result = 'Delivery time created correctly'
    expect(dataMessages[1]).toEqual(result)
  })

  it('Should return message Delivery on going!', () => {
    const result = 'Delivery on going!'
    expect(dataMessages[2]).toEqual(result)
  })

  it('Should return message Delivery assigned', () => {
    const result = 'Delivery assigned'
    expect(dataMessages[3]).toEqual(result)
  })

  it('Should return message Delivery was cancelled', () => {
    const result = 'Delivery was cancelled'
    expect(dataMessages[4]).toEqual(result)
  })

  it('Should return message Delivery run created correctly', () => {
    const result = 'Delivery run created correctly'
    expect(dataMessages[5]).toEqual(result)
  })

  it('Should return message Picked up in', () => {
    const result = 'Picked up in'
    expect(dataMessages[6]).toEqual(result)
  })

  it('Should return message Delivery status sent correctly', () => {
    const result = 'Delivery status sent correctly'
    expect(dataMessages[7]).toEqual(result)
  })

  it('Should return message Delivered in', () => {
    const result = 'Delivered in'
    expect(dataMessages[8]).toEqual(result)
  })

  it('Should return message Delivery is waiting to be assigned', () => {
    const result = 'Delivery is waiting to be assigned'
    expect(dataMessages[9]).toEqual(result)
  })

  it('Should return message Delivery is closed', () => {
    const result = 'Delivery is closed'
    expect(dataMessages[10]).toEqual(result)
  })
})

describe('status messages', () => {
  it('Should return message Standby delivery', () => {
    const result = 'Standby delivery'
    expect(statusMessages[0]).toEqual(result)
  })

  it('Should return message Delivery in progress', () => {
    const result = 'Delivery in progress'
    expect(statusMessages[1]).toEqual(result)
  })

  it('Should return message Delivery finished', () => {
    const result = 'Delivery finished'
    expect(statusMessages[2]).toEqual(result)
  })

  it('Should return message Canceled delivery by user', () => {
    const result = 'Canceled delivery by user'
    expect(statusMessages[3]).toEqual(result)
  })

  it('Should return message Canceled delivery by store', () => {
    const result = 'Canceled delivery by store'
    expect(statusMessages[4]).toEqual(result)
  })

  it('Should return message Canceled delivery by teleoperation', () => {
    const result = 'Canceled delivery by teleoperation'
    expect(statusMessages[5]).toEqual(result)
  })
})

describe('lat y long to address', () => {
  it('change direction lat: 45.767 long: 4.833', async () => {
    const lat = 45.767
    const lng = 4.833
    const result = {
      administrativeLevels: {
        level1long: 'Auvergne-Rhône-Alpes',
        level1short: 'Auvergne-Rhône-Alpes',
        level2long: 'Rhône',
        level2short: 'Rhône'
      },
      city: 'Lyon',
      country: 'France',
      countryCode: 'FR',
      extra: {
        confidence: 1,
        establishment: null,
        googlePlaceId: 'ChIJnbwS9_7q9EcR_QROzI0Rzrc',
        neighborhood: 'Lyon',
        premise: null,
        subpremise: null
      },
      formattedAddress: '3 Rue Paul Chenavard, 69001 Lyon, France',
      latitude: 45.76700930000001,
      longitude: 4.832957599999999,
      provider: 'google',
      streetName: 'Rue Paul Chenavard',
      streetNumber: '3',
      zipcode: '69001'
    }
    expect(await reverse(lat, lng)).toEqual(result)
  })

  it('should be russia as country with lat: 45 and lng: 45', async () => {
    const lat = 45
    const lng = 45
    const expected = await reverse(lat, lng)
    console.log(expected)
    expect(expected.country).toEqual('Russia')
  })

  it('return should be and object', async () => {
    const lat = 45
    const lng = 45
    const expected = await reverse(lat, lng)
    expect(typeof expected).toEqual('object')
  })

  it('city should be an string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.city).toEqual('string')
  })

  it('administrativeLevels should be and object', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.administrativeLevels).toEqual('object')
  })

  it('administrativeLevels.level1long should be and string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.administrativeLevels.level1long).toEqual('string')
  })

  it('administrativeLevels.level1short should be and string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.administrativeLevels.level1long).toEqual('string')
  })

  it('administrativeLevels.level2long should be and string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.administrativeLevels.level1long).toEqual('string')
  })

  it('administrativeLevels.level2short should be and string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.administrativeLevels.level1long).toEqual('string')
  })

  it('country should be and string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.country).toEqual('string')
  })

  it('countryCode should be and string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.countryCode).toEqual('string')
  })

  it('extra should be and object', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.extra).toEqual('object')
  })

  it('formattedAddress should be and string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.formattedAddress).toEqual('string')
  })

  it('latitude should be and string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.latitude).toEqual('number')
  })

  it('longitude should be and string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.longitude).toEqual('number')
  })

  it(`Function should return ${'lat should be a number!'} with lat as string`, async () => {
    const lat = '45.767'
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lat should be a number!')
  })

  it(`Function should return ${'lat should be get a content!'} with lat as null`, async () => {
    const lat = null
    const lng = 4.833
    console.log(typeof lat)
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lat should be get a content!')
  })

  it(`Function should return ${'lat should be get a content!'} with lat as undefined`, async () => {
    const lat = undefined
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lat should be get a content!')
  })

  it(`Function should return ${'lat should not be an object!'} with lat as object`, async () => {
    const lat = []
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lat should not be an object!')
  })

  it(`Function should return ${'lat should not be an object!'} with lat as object`, async () => {
    const lat = {}
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lat should not be an object!')
  })

  it(`Function should return ${'lng should be a number!'} with lat as string`, async () => {
    const lat = 45.767
    const lng = '4.833'
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lng should be a number!')
  })

  it(`Function should return ${'lng should be get a content!'} with lat as null`, async () => {
    const lat = 45.767
    const lng = null
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lng should be get a content!')
  })

  it(`Function should return ${'lng should be get a content!'} with lat as undefined`, async () => {
    const lat = 45.767
    const lng = undefined
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lng should be get a content!')
  })

  it(`Function should return ${'lng should not be an object!'} with lat as object`, async () => {
    const lat = 45.767
    const lng = []
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lng should not be an object!')
  })

  it(`Function should return ${'lng should not be an object!'} with lat as object`, async () => {
    const lat = 45.767
    const lng = {}
    const expected = await reverse(lat, lng)
    expect(expected).toEqual('lng should not be an object!')
  })

  it('Function should return Error reverse geocoding! with lat as string', async () => {
    const lat = 45.767
    const lng = 4.833
    const expected = await reverse(lat, lng)
    expect(typeof expected.longitude).toEqual('number')
  })
})

describe('Calculate distances', () => {
  it('Calculate distance between 2 points', () => {
    const coordenadasOrigin = {
      lat: 19.346554,
      lng: -99.170048
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual(4.1782)
  })

  it(`Function should return ${'coordenadasOrigin lat should be a number!'} with lat as string`, async () => {
    const coordenadasOrigin = {
      lat: '19.346554',
      lng: -99.170048
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lat should be a number!')
  })

  it(`Function should return ${'coordenadasOrigin lat should be get a content!'} with lat as null`, async () => {
    const coordenadasOrigin = {
      lat: null,
      lng: -99.170048
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lat should be get a content!')
  })

  it(`Function should return ${'coordenadasOrigin lat should be get a content!'} with lat as undefined`, async () => {
    const coordenadasOrigin = {
      lat: undefined,
      lng: -99.170048
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lat should be get a content!')
  })

  it(`Function should return ${'coordenadasOrigin lat should not be an object!'} with lat as object`, async () => {
    const coordenadasOrigin = {
      lat: [],
      lng: -99.170048
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lat should not be an object!')
  })

  it(`Function should return ${'coordenadasOrigin lat should not be an object!'} with lat as object`, async () => {
    const coordenadasOrigin = {
      lat: {},
      lng: -99.170048
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lat should not be an object!')
  })

  it(`Function should return ${'coordenadasOrigin lat should be get a content!'} with lat as object`, async () => {
    const coordenadasOrigin = 0

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lat should be get a content!')
  })

  it(`Function should return ${'coordenadasOrigin lng should be a number!'} with lng as string`, async () => {
    const coordenadasOrigin = {
      lat: 19.346554,
      lng: '-99.170048'
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lng should be a number!')
  })

  it(`Function should return ${'coordenadasOrigin lng should be get a content!'} with lng as null`, async () => {
    const coordenadasOrigin = {
      lat: 19.346554,
      lng: null
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lng should be get a content!')
  })

  it(`Function should return ${'coordenadasOrigin lng should be get a content!'} with lng as undefined`, async () => {
    const coordenadasOrigin = {
      lat: 19.346554,
      lng: undefined
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lng should be get a content!')
  })

  it(`Function should return ${'coordenadasOrigin lng should not be an object!'} with lng as object`, async () => {
    const coordenadasOrigin = {
      lat: 19.346554,
      lng: []
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lng should not be an object!')
  })

  it(`Function should return ${'coordenadasOrigin lng should not be an object!'} with lng as object`, async () => {
    const coordenadasOrigin = {
      lat: 19.346554,
      lng: {}
    }

    const coordenadasEnd = {
      lat: 19.38398,
      lng: -99.173592
    }

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasOrigin lng should not be an object!')
  })

  it(`Function should return ${'coordenadasEnd lat should be get a content!'} with lat as object`, async () => {
    const coordenadasOrigin = {
      lat: 19.346554,
      lng: -99.170048
    }

    const coordenadasEnd = 0

    const result = kmDistance(coordenadasOrigin, coordenadasEnd)
    expect(result).toEqual('coordenadasEnd lat should be get a content!')
  })
})

describe('Calculate cost', () => {
  it('Calculate the cost for 4.8 kilometers', () => {
    const kilometers = 4.8
    const result = '2.98'
    expect(costPerMilles(kilometers)).toEqual(result)
  })

  it('Calculate the cost for 0 kilometers', () => {
    const kilometers = 0
    const result = '0.00'
    expect(costPerMilles(kilometers)).toEqual(result)
  })

  it('Calculate the cost for negative kilometers', () => {
    const kilometers = -10
    const result = 'kilometers should be more than 0'
    expect(costPerMilles(kilometers)).toEqual(result)
  })

  it('Calculate the cost for 75.8 kilometers', () => {
    const kilometers = 75.8
    const result = '47.10'
    expect(costPerMilles(kilometers)).toEqual(result)
  })

  it(`Function should return ${'kilometers should be a number!'} with lat as string`, async () => {
    const kilometers = '4.8'
    const result = 'kilometers should be a number!'
    expect(costPerMilles(kilometers)).toEqual(result)
  })

  it(`Function should return ${'kilometers should be get a content!'} with lat as null`, async () => {
    const kilometers = null
    const result = 'kilometers should be get a content!'
    expect(costPerMilles(kilometers)).toEqual(result)
  })

  it(`Function should return ${'kilometers should be get a content!'} with lat as undefined`, async () => {
    const kilometers = undefined
    const result = 'kilometers should be get a content!'
    expect(costPerMilles(kilometers)).toEqual(result)
  })

  it(`Function should return ${'kilometers should not be an object!'} with lat as object`, async () => {
    const kilometers = []
    const result = 'kilometers should not be an object!'
    expect(costPerMilles(kilometers)).toEqual(result)
  })

  it(`Function should return ${'kilometers should not be an object!'} with lat as object`, async () => {
    const kilometers = {}
    const result = 'kilometers should not be an object!'
    expect(costPerMilles(kilometers)).toEqual(result)
  })
})

describe('Calculate time delivery', () => {
  it('Calculate the time for 4.8 kilometers', () => {
    const kilometers = 4.8
    const speedWagon = 1.5
    const result = 3200
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it('Calculate the time for 4 kilometers', () => {
    const kilometers = 4
    const speedWagon = 1.5
    const result = 2666
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it('Calculate the time for 21 kilometers', () => {
    const kilometers = 21
    const speedWagon = 1.5
    const result = 14000
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it('Calculate the time for 12 kilometers', () => {
    const kilometers = 12
    const speedWagon = 1.5
    const result = 8000
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it('Calculate the time for 1234.312 kilometers', () => {
    const kilometers = 1234.312
    const speedWagon = 1.5
    const result = 822874
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it('Calculate the time for 543 kilometers', () => {
    const kilometers = 543
    const speedWagon = 1.5
    const result = 362000
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it('Calculate the time for 1 kilometers', () => {
    const kilometers = 1
    const speedWagon = 1.5
    const result = 666
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it('Calculate the time for 0 kilometers', () => {
    const kilometers = 0
    const speedWagon = 1.5
    const result = 0
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it('Calculate the time for negative kilometers', () => {
    const kilometers = -10
    const speedWagon = 1.5
    const result = 'kilometers should be more than 0'
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it(`Function should return ${'kilometers should be a number!'} with lat as string`, async () => {
    const kilometers = '4.8'
    const speedWagon = 1.5
    const result = 'kilometers should be a number!'
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it(`Function should return ${'kilometers should be get a content!'} with lat as null`, async () => {
    const kilometers = null
    const speedWagon = 1.5
    const result = 'kilometers should be get a content!'
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it(`Function should return ${'kilometers should be get a content!'} with lat as undefined`, async () => {
    const kilometers = undefined
    const speedWagon = 1.5
    const result = 'kilometers should be get a content!'
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it(`Function should return ${'kilometers should not be an object!'} with lat as object`, async () => {
    const kilometers = []
    const speedWagon = 1.5
    const result = 'kilometers should not be an object!'
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })

  it(`Function should return ${'kilometers should not be an object!'} with lat as object`, async () => {
    const kilometers = {}
    const speedWagon = 1.5
    const result = 'kilometers should not be an object!'
    expect(timeEstimated(kilometers, speedWagon)).toEqual(result)
  })
})
