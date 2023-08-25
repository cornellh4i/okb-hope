"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHTTP = void 0;
const functions = require("firebase-functions");
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
admin.initializeApp();
exports.basicHTTP = functions.https.onRequest((request, response) => {
    const name = request.query.name;
    if (!name) {
        response.status(400).send('ERROR you must supply a name :(');
    }
    response.send(`hello ${name}`);
});
//# sourceMappingURL=index.js.map