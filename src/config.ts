import {
  cleanEnv,
  str,
  port,
  url,
  makeValidator,
  CleanedEnvAccessors,
  email,
} from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const strHex64 = makeValidator<string>((x) => {
  if (/^[0-9a-f]{64}$/.test(x)) {
    return x;
  }
  throw new Error('Expected a hex-character string of length 64');
});

type Environment = {
  NODE_ENV: string;
  REACT_APP_PORT: number;
  REACT_APP_SERVER_URL: string;
  REACT_APP_DEVELOPMENT_SERVER_URL: string;
  REACT_APP_PRODUCTION_SERVER_URL: string;
  REACT_APP_LOCAL_SERVER_URL: string;
  REACT_APP_LOG_LEVEL: string;
  REACT_APP_SECRET_HEX: string;
  REACT_APP_GMAIL_USER: string;
  REACT_APP_GMAIL_PASSWORD: string;
};

export type Env = Readonly<Environment & CleanedEnvAccessors>;

const env: Env = cleanEnv<Environment>(process.env, {
  NODE_ENV: str({
    choices: ['production', 'test', 'development'],
    default: 'development',
  }),
  REACT_APP_PORT: port({ default: 3333 }),
  REACT_APP_SERVER_URL: url(),
  REACT_APP_DEVELOPMENT_SERVER_URL: url(),
  REACT_APP_PRODUCTION_SERVER_URL: url(),
  REACT_APP_LOCAL_SERVER_URL: url(),
  REACT_APP_LOG_LEVEL: str({
    default: 'error',
    choices: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'],
  }),
  REACT_APP_SECRET_HEX: strHex64(),
  REACT_APP_GMAIL_USER: email(),
  REACT_APP_GMAIL_PASSWORD: str(),
});

export default env;
