/* global module */
const response = require('../network/response')
const webPush = require('web-push')
const colors = require('colors')
const uidsafe = require('uid-safe')

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webPush.setVapidDetails('mailto:' + process.env.MAILTO, publicVapidKey, privateVapidKey)
const userSubscription = {}

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const middleware = (req, res) => {
  const subscription = req.body
  if (req.session.user) {
    userSubscription[req.session.user.id] = subscription
  }
  response.success(req, res, {}, 'ok', 201)
}

module.exports = {
  middleware,
  notifyAll,
  notifyUser,
  userSubscription,
  unsubscribe
}

function unsubscribe (userId) {
  delete userSubscription[userId]
}

/**
 * Notify all users
 * @param {String} title
 * @param {String} body
 */
function notifyAll (title, body = '') { // Notificar a todos los usuarios;
  console.log('Global notification:'.yellow, title)
  for (const uid in userSubscription) {
    notifyUser(uid, title, body)
  }
}
/**
 * Send notification to user
 * @param {String} userId
 * @param {String} title
 * @param {String} body
 */
function notifyUser (userId, title, body = '') {
  const subscription = userSubscription[userId]
  if (!subscription) return false
  const payload = JSON.stringify({
    title: title,
    body: body
  })
  webPush.sendNotification(subscription, payload).catch((e) => { console.log('Webpush error'.red, e, subscription) })
  return true
}
