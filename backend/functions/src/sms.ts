//Created Twilio Number, authToken, accountSid; Currently on free trial.
require('dotenv').config()
// import { Twilio } from "twilio";
// const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// admin.initializeApp();
// const db = admin.firestore();


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
      });
  } catch (error) {
    console.log(error);
  }
}

function sendExample() {
  const example_user: User = { phoneNumber: "+17036384616" };
  sendSMS(example_user, "OKB Test Message 3");
}

sendExample();
// export default sendSMS;