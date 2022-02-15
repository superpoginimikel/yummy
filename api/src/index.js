require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');

const logger = require('./util/logger')(module);
const errorHandler = require('./middleware/errorHandler');
const healthController = require('./controller/healthController');
const { APP_NAME, PORT, NODE_ENV } = process.env;

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => { logger.info(`${req.method} ${req.originalUrl}`); next(); });

// Rewrite all urls that are not /api, /health, or targeting a static asset file
// app.use(/^\/(?!api\/|health\/|.*?\.).*?$/, (req, res) => res.sendfile('public/index.html'));

app.get('/health', healthController.health);

// Error handler need to be last handler
app.use(errorHandler);

app.listen(PORT, () => logger
  .info(`${APP_NAME} listening on port ${PORT},in ${NODE_ENV}`));
