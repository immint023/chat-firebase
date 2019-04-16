require('dotenv').config();
const port = 3001;
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const path = require('path');
// const passport = require('passport');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const routes = require('./routes');
// const strategies = require('./config/passport');

app.use(express.static('public'));
// app.use(passport.initialize());
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

// passport.use(strategies.login);

io.on('connection', function(socket) {
  console.log('connected');
  socket.on('send', function(data) {
    socket.broadcast.emit('send', data);
  });
});

app.use((err, req, res, next) => {
  res.json({
    status: 400,
    message: err.message || err,
    stack: err.stack || err,
  });
});

server.listen(port, () => console.log('Server is running on ' + port));
