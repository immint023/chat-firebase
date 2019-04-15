const port = 3001;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const io = require('socket.io')(server);

const messageRoutes = require('./routes/message-route');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());
app.use('/messages', messageRoutes);
app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

io.on('connection', function(socket) {
  console.log('connected');
  socket.on('send', function(data) {
    socket.broadcast.emit('send', data);
  })
});

app.use((err, req, res, next) => {
  res.json({
    status: 400,
    message: err.message || err,
    stack: err.stack || err
  })
});

server.listen(port, () => console.log('App is running on ' + port));
