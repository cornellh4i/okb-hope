import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as admin from "firebase-admin";
admin.initializeApp();

export const basicHTTP = functions.https.onRequest((request, response) => {
    const name = request.query.name;
  
    if (!name) {
      response.status(400).send('ERROR you must supply a name :(');
    }
  
    response.send(`hello ${name}`);
  });