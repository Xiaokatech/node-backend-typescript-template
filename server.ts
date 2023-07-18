/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import 'dotenv/config';
import './crontab';

import http, { Server } from 'http';

import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import loggerMorgan from 'morgan';
import cors from 'cors';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import indexRouter from './src/endpoint/1_routes/index';

import handleErrors from './src/middleware/hanldeErrors';

const env = process.env.APP_ENV;
export const isProd = env === 'Prod';

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const portFunc = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(portFunc)) {
    // named pipe
    return val;
  }

  if (portFunc >= 0) {
    // port number
    return portFunc;
  }

  return false;
}

const prefix = '/node';
const prefix0 = `${prefix}/v0.0`;
const prefix1 = `${prefix}/v1.0`;
const prefix2 = `${prefix}/v2.0`;
const prefix_version2_v0 = `${prefix}/version2/v0.0`;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'APIs Follow Paris',
      description: 'API Follow Paris informations',
      version: '1.0.0',
    },
    servers: [{ url: prefix }],
  },
  apis: ['./src/endpoint/1_routes/**/*.ts', './src/config/swagger.stg.yaml'], // files containing annotations as above
};

const app = express();

app.use(cors());

// Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(`${prefix}/api-docs`, swaggerUi.serve);
app.use(`${prefix}/api-docs`, swaggerUi.setup(swaggerDocs));

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'jade');

app.use(loggerMorgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(`${prefix}`, indexRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use(handleErrors);
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const debug = require('debug')('follow-paris-backend-node-js:server');

/**
 * Get port from environment and store in Express.
 */

// eslint-disable-next-line no-use-before-define
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */
let server: Server;
if (isProd) {
  server = http.createServer(app); // @PROD
} else {
  server = app as any; // @DEV
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.keepAliveTimeout = 65000; // Ensure all inactive connections are terminated by the ALB, by setting this a few seconds higher than the ALB idle timeout
server.headersTimeout = 66000; // Ensure the headersTimeout is set higher than the keepAliveTimeout due to this nodejs regression bug: https://github.com/nodejs/node/issues/27363
// eslint-disable-next-line no-use-before-define
server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
// eslint-disable-next-line no-use-before-define
server.on('listening', () => {
  if (isProd) {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }

  console.log(`ENV : ${env}`);
  console.log(`Server is listenning on ${port}`);
});
