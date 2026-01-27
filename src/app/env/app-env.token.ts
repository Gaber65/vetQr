import { InjectionToken } from '@angular/core';
import { AppEnvironment } from './app-env.interface';

export const APP_ENV = new InjectionToken<AppEnvironment>('APP_ENV');
