import { AppEnvironment } from './app-env.interface';

export const DevEnvironment: AppEnvironment = {
  production: false,
  stage: 'dev',
  apiUrl: 'http://localhost:5273/v1/api',
  appName: 'QuadIsnight.QR',
  version: '1.0.0'
};
