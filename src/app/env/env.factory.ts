import { DevEnvironment } from './env.dev';
import { PreEnvironment } from './env.pre';
import { ProdEnvironment } from './env.prod';
import { AppEnvironment } from './app-env.interface';

export function envFactory(): AppEnvironment {
  const stage = (window as any).__env || 'dev';

  switch (stage) {
    case 'pre':
      return PreEnvironment;
    case 'prod':
      return ProdEnvironment;
    default:
      return DevEnvironment;
  }
}
