// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import axios from 'axios';
// admin.initializeApp();

import * as functions from "firebase-functions";
import axios from "axios";

const CLIENT_ID = "21GhUOzi7KHTsg2dmSCheBBaqNQUYg_KZyMqARo-n6o";
const CLIENT_SECRET = "qfnBvrqATUs9PFPo6eBXYEMLygcxJSPXl0oV3km-2WQ";
const REDIRECT_URI = "http://localhost:3000/calendlyCallback";

/**
 * Fetch Access Token
 * @param {string} authorizationCode
 * @return {Promise} access token
 */
async function fetchAccessToken(authorizationCode: string): Promise<string> {
  const response = await axios.post("https://auth.calendly.com/oauth/token", {
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: authorizationCode,
    redirect_uri: REDIRECT_URI,
  });

  return response.data.access_token;
}

/**
 * Fetch User Availabilities
 * @param {string} accessToken
 * @param {string} availabilityUuid
 * @return {Promise} availabilities
 */
async function fetchUserAvailabilities(accessToken: string, availabilityUuid: string): Promise<string> {
  const response = await axios.get(`https://api.calendly.com/user_availability_schedules/${availabilityUuid}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export const getAvailabilities = functions.https.onCall(async (data) => {
  if (!data.authorizationCode || !data.availabilityUuid) {
    throw new functions.https.HttpsError("invalid-argument", "Authorization " +
      "code and availabilityUuid are required.");
  }

  try {
    const accessToken = await fetchAccessToken(data.authorizationCode);
    const availabilities =
      await fetchUserAvailabilities(accessToken, data.availabilityUuid);

    return availabilities;
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError("unknown", "Could not fetch user " +
      "availabilities.");
  }
});


// Start writing some basic functions

// https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// A basic HTTP function that takes a name and returns a greeting.
// Test it in the browser by running `firebase serve --only functions \
// --port=5002` and navigating to http://localhost:5002/your-project-id/ \
// us-central1/basicHTTP?name=your-name when inside the functions folder!

// export const basicHTTP = functions.https.onRequest((request, response) => {
//     const name = request.query.name;
//     if (!name) {
//       response.status(400).send('ERROR you must supply a name :(');
//     }
//     response.send(`hello ${name}`);
//   });

// calendly auth
// const clientId = "21GhUOzi7KHTsg2dmSCheBBaqNQUYg_KZyMqARo-n6o";
// const clientSecret = "qfnBvrqATUs9PFPo6eBXYEMLygcxJSPXl0oV3km-2WQ";
// const redirectUri = 'https://localhost:3000/calendlyCallback';

// export const calendlyAuth = functions.https.onRequest
// (async (req: any, res: any) => {
//   const authUrl = `https://auth.calendly.com/oauth/authorize?client_id \
// =${clientId}&response_type=code&redirect_uri=${redirectUri}`;
//   res.redirect(authUrl);
// });

// // calendly callback function to get access token and save it to db
// export const calendlyCallback = functions.https.onRequest \
// (async (req, res) => {
//   const code = req.query.code as string;

//   try {
//     const response = await axios.post('https://auth.calendly.com/oauth/token', null, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + Buffer.from(`${clientId}: \
// ${clientSecret}`).toString('base64'),
//       },
//       params: {
//         grant_type: 'authorization_code',
//         code: code,
//         redirect_uri: redirectUri,
//       },
//     });

//     // Get the access token from the response data
//     const accessToken = response.data.access_token;

//     // Save the access token to your database for future use \
// (e.g., Firestore)
//     // ...

//     const currentUserResponse = await axios.get \
// ('https://api.calendly.com/v2/users/me', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });

//     const currentUserData = currentUserResponse.data;

//     // Do something with the current user data
//     // ...

//     res.send('Calendly authenticated successfully.');
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Error during Calendly authentication.');
//   }
// });
