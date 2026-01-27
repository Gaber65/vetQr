export interface AppEnvironment {
  production: boolean;
  stage: 'dev' | 'pre' | 'prod';
  apiUrl: string;
  appName: string;
  version: string;
}
