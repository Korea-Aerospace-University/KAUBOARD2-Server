const express = require('./config/express');
const {logger} = require('./config/winston');

const port = 3001;
//var server = express().listen(port);
express()

logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);