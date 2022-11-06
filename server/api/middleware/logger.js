import { createLogger, format, transports } from 'winston';
import expressWinston from 'express-winston';
import 'winston-mongodb';
import { config } from 'dotenv';
import { join } from 'path';
import { fileURLToPath } from 'url';

config();

const __dirname = join(fileURLToPath(import.meta.url), '../../..');

const Transports = [
  new transports.File({
    filename: join(__dirname, 'logs', 'warning.log'),
    level: 'warn'
  }),
  new transports.File({
    filename: join(__dirname, 'logs', 'error.log'),
    level: 'error'
  })
  //   new transports.MongoDB({
  //     db: process.env.MONGO_URI,
  //     collection: 'logs'
  //   })
];

const InternalTransports = [
  new transports.Console(),
  new transports.File({
    filename: join(__dirname, 'logs', 'internal-error.log'),
    level: 'error'
  })
];

const defaultFormat = format.combine(
  format.json(),
  format.timestamp(),
  format.prettyPrint(),
  format.printf(
    ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
  )
);
const requestFormat = format.combine(
  format.json(),
  format.timestamp(),
  format.metadata(),
  format.prettyPrint()
);

const Logger = createLogger({
  format: defaultFormat,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: join(__dirname, 'logs', 'info.log'),
      level: 'info'
    })
  ]
});
export default Logger;

export const RequestLogger = expressWinston.logger({
  transports: Transports,
  format: requestFormat,
  statusLevels: true
});

export const ErrorLogger = expressWinston.errorLogger({
  transports: InternalTransports,
  format: defaultFormat,
  statusLevels: true
});
