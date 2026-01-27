import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clinic, ApiResponse } from '../models';
import { APP_ENV } from '../../env/app-env.token';
import { AppEnvironment } from '../../env/app-env.interface';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private env: AppEnvironment
  ) {
    this.apiUrl = `${this.env.apiUrl}/clinics`;
  }

  getAll(): Observable<ApiResponse<Clinic[]>> {
    return this.http.get<ApiResponse<Clinic[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<Clinic>> {
    return this.http.get<ApiResponse<Clinic>>(`${this.apiUrl}/${id}`);
  }

  create(clinic: Clinic): Observable<ApiResponse<Clinic>> {
    return this.http.post<ApiResponse<Clinic>>(this.apiUrl, clinic);
  }

  update(clinic: Clinic): Observable<ApiResponse<Clinic>> {
    return this.http.put<ApiResponse<Clinic>>(`${this.apiUrl}/${clinic.id}`, clinic);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
