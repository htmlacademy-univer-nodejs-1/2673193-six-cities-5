import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export interface RestSchema {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  MONGO_RETRY_COUNT: number;
  MONGO_RETRY_TIMEOUT: number;
  UPLOAD_DIRECTORY: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incomnig connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the Database server',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_USER: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities',
  },
  MONGO_RETRY_COUNT: {
    doc: 'Number of retry attempts for MongoDB connection',
    format: Number,
    env: 'MONGO_RETRY_COUNT',
    default: 5
  },
  MONGO_RETRY_TIMEOUT: {
    doc: 'Delay (ms) between retry attempts for MongoDB connection',
    format: Number,
    env: 'MONGO_RETRY_TIMEOUT',
    default: 1000
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: 'null'
  },
});
