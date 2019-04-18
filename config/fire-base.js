const firebase = require('firebase');
const config = {
  apiKey: 'AIzaSyCFniyDwgulaMD0lXT9Qv9eUQhSxwTd4-U',
  authDomain: 'chat-realtime-c0649.firebaseapp.com',
  databaseURL: 'https://chat-realtime-c0649.firebaseio.com',
  projectId: 'chat-realtime-c0649',
  storageBucket: 'chat-realtime-c0649.appspot.com',
  messagingSenderId: '1023331643779',
};

firebase.initializeApp(config);

module.exports = {
  firebaseDb: firebase.database(),
  firebaseAuth: firebase.auth(),
};
