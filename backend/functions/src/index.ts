import * as functions from "firebase-functions";
// import * as allSMS from "./sms"
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
require('dotenv').config()
const accountSid = 'AC543c381c5688cda47bf5a20ba6748ace';
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const client = require('twilio')(accountSid, authToken);
const twilioNumber = `${process.env.TWILIO_PHONE_NUMBER}`;


interface User {
  phoneNumber: string;
}

async function sendSMS(user: User, message_body: string) {
  // if (process.env.DATABASE === "staging") {
  //   return;
  // }
  const userPhone = user.phoneNumber;
  if (userPhone === "Dummy number" || userPhone === undefined)
    return;
  try {
    await client.messages
      .create({
        from: twilioNumber,
        to: userPhone,
        body: message_body,
      });
  } catch (error) {
    console.log(error);
  }
}

function sendExampleText() {
  const example_user: User = { phoneNumber: "+17036384616" };
  sendSMS(example_user, "OKB Test Message 3");
}

export const SMSHTTP = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  sendExampleText();
  response.send("Hello from Firebase!");
});





