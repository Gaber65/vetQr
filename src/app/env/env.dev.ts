import { AppEnvironment } from './app-env.interface';

export const DevEnvironment: AppEnvironment = {
  production: false,
  stage: 'dev',
  apiUrl: 'https://squeakapi.veticareapp.com:8001/v1/api',
  appName: 'QuadIsnight.QR',
  version: '1.0.0'
};
