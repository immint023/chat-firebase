require('dotenv').config();
const firebase = require('firebase');
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PJ_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER,
};

firebase.initializeApp(config);

module.exports = {
  firebaseDb: firebase.database(),
  firebaseAuth: firebase.auth(),
};
