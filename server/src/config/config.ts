import convict from 'convict';
import dotenv from 'dotenv';
dotenv.config();

const configObject = convict({
  server: {
    port: {
      doc: 'port of the server',
      format: Number,
      default: 1338,
      env: 'BACKEND_PORT',
    },
  },
  bcryptSalt: {
    doc: 'salt string to hash data',
    format: String,
    default: '',
    env: 'SALT',
  },
  cookie: {
    sessiontokenKey: {
      doc: 'token key',
      format: String,
      default: '',
      env: 'TOKEN_KEY',
    },
    sessiontokenExp: {
      doc: 'token exp',
      format: String,
      default: '1d',
      env: 'TOKEN_EXP',
    },
    confirmationExp: {
      doc: 'registered user confirmation token expiration duration',
      format: String,
      default: '1h',
      env: 'TOKEN_CONF_EXP',
    },
  },
});

export const config = configObject.getProperties();
export type Config = typeof config;
