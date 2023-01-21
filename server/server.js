const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const fileupload = require("express-fileupload");
const mongoSanitize = require('express-mongo-sanitize');
const serverConfig = require('./config');

const config = {
  db: `mongodb://${serverConfig().mongoServerAndPort}`,
  opts: {
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return mongoose.connect(config.db, config.opts);
};

mongoose
  .connect(config.db, config.opts)
  .catch(() => setTimeout(connectWithRetry, 5000));

mongoose.Promise = global.Promise;
// @TODO: Need to auto set data
mongoose.connection
  .on('connected', () => {
    console.log(
      `Mongoose connection open on mongodb://${serverConfig().mongoServerAndPort}/tasks`,
    );
  })
  .on('error', err => {
    console.log(`Connection error: ${err.message}`);
  });


app.listen(serverConfig().serverPort, () => {
  console.debug(`Backend has started on port ${serverConfig().serverPort}`);
});

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', '*');

  next();
});

app.use(express.json({
  extended: true,
  inflate: true,
  limit: '100kb',
  parameterLimit: 1000,
  type: 'application/x-www-form-urlencoded',
  verify: undefined
}));

app.use(fileupload());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(mongoSanitize());

require('./routes')(app);