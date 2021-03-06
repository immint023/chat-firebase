require('dotenv').config();
const port = 3001;
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const routes = require('./routes');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(cors());

app.use('/api', routes);
app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

io.on('connection', function(socket) {
  console.log('connected');
  socket.on('send', function(data) {
    socket.broadcast.emit('send', data);
  });
});

const admin = require('firebase-admin');

const serviceAccount = require('./credential.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chat-realtime-c0649.firebaseio.com',
});

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || err,
    stack: err.stack || err,
  });
});

server.listen(port, () => console.log('Server is running on ' + port));
