import { Injectable } from '@angular/core';
import { ClinicSetting } from '../models/clinic-setting.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  clinicSetting: ClinicSetting | null = null;
  properties: any = {};

  constructor() { }
}
