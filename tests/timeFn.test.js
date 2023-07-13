const { getHoursMinSec, getRandomIntInclusive } = require('../utils/functions/functions')

describe('calculate time', () => {
  it('Calculate the time for 48 minutes', () => {
    const time = 2880
    const result = '48 min 00 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })

  it('Calculate the time for 12 minutes 30 sec', () => {
    const time = 750
    const result = '12 min 30 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })

  it('Calculate the time for 1 hour 59 minutes 59 sec', () => {
    const time = 7199
    const result = '1 hrs 59 min 59 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })

  it('Calculate the time for 3 hours 0 minutes 0 sec', () => {
    const time = 10800
    const result = '3 hrs 00 min 00 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })

  it('Calculate the time for 30 sec', () => {
    const time = 30
    const result = '00 min 30 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })

  it('Calculate the time for null', () => {
    const time = null
    const result = '0 hrs 00 min 00 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })

  it('Calculate the time for undefined', () => {
    const time = undefined
    const result = '0 hrs 00 min 00 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })

  it('Calculate the time for string', () => {
    const time = 'string'
    const result = '0 hrs 00 min 00 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })

  it('Calculate the time for object []', () => {
    const time = []
    const result = '0 hrs 00 min 00 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })

  it('Calculate the time for object {}', () => {
    const time = {}
    const result = '0 hrs 00 min 00 sec'
    expect(getHoursMinSec(time)).toEqual(result)
  })
})

describe('calculate time', () => {
  it('Calculate random', () => {
    const min = 10200
    const max = 99999
    const result = '48 min 00 sec'
    expect(getRandomIntInclusive(min, max)).toEqual(result)
  })
})
