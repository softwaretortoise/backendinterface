/* eslint-env mocha */
const supertest = require('supertest')
const { app, server } = require('../index')

const api = supertest(app)

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  server.close()
  done()
})

describe('auth', () => {
  it('oauth/token return json', async () => {
    await api
      .post('/oauth/token')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deliveries', () => {
  it('delivery return json', async () => {
    await api
      .post('/delivery')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('delivery/information return json', async () => {
    await api
      .post('/delivery/information')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('delivery/cancel return json', async () => {
    await api
      .post('/delivery/cancel')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('status', () => {
  it('status/assign return json', async () => {
    await api
      .post('/status/assign')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('status/start return json', async () => {
    await api
      .post('/status/start')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('status/checkin return json', async () => {
    await api
      .post('/status/checkin')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('status/checkout return json', async () => {
    await api
      .post('/status/checkout')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('status/location return json', async () => {
    await api
      .post('/status/location')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})
