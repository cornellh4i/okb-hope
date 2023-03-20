//Created Twilio Number, authToken, accountSid; Currently on free trial.
require('dotenv').config()
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;


//TESTING WITH STANDALONE FUNCTION
// var numbersToMessage = ["+17036384616"]

// numbersToMessage.forEach(function (number) {
//   var message = client.messages.create({
//     body: 'OKB Testing Message - Pranav',
//     from: twilioNumber,
//     to: number
//   })
//     .then(message => console.log(message.status))
// });


//TESTING WITH INTERFACE AND USER
interface User {
  phoneNumber: string;
}

async function sendSMS(user: User, message_body: string) {
  if (process.env.DATABASE === "staging") {
    return;
  }
  const userPhone = user.phoneNumber;
  if (userPhone === "Dummy number" || userPhone === undefined)
    return;
  try {
    await client.messages
      .create({
        from: twilioNumber,
        to: userPhone,
        body: message_body,
      }).then(message => {
        message => console.log(message.status);
      });
  } catch (error) {
    console.log(error);
  }
}

const example_user: User = { phoneNumber: "+17036384616" };
sendSMS(example_user, "OKB Test Message 3");


//TESTING one message
// client.messages
//   .create({
//     body: 'OKB Testing!',
//     from: '+18885215943',
//     to: '+17036384616'
//   })
//   .then(message => console.log(message.sid));
