const config = require('../config/config')
// const q = require('q')
const accountSid = config.sidTwilio
const authToken = config.authTwilio
const client = require('twilio')(accountSid, authToken)

exports.sendMessage = async (number, message) => {
  // const areaCode = '52'
  const numberFrom = process.env.SMS_NUMBER
  console.log(number)
  const result = await client.messages
    .create({
      body: message,
      from: numberFrom,
      to: `+${number}`
    })
    .then(message => {
      console.log(message)
      return message
    })
    .catch(err => {
      console.error(err)
      return err
    })
  return result
}
