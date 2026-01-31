import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, User, UserRole, SignInCommand, AuthResult, ApiResponse, JwtPayload } from '../../shared/models';
import { HttpClient } from '@angular/common/http';
import { AppEnvironment } from '../../env/app-env.interface';
import { APP_ENV } from '../../env/app-env.token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly TOKEN_KEY = 'vet_clinic_token';
  private readonly USER_KEY = 'vet_clinic_user';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  
  // Mock users for demonstration
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'superadmin@vetclinic.com',
      username: 'superadmin',
      firstName: 'Super',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: '2',
      email: 'admin@vetclinic.com',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      clinicId: 'clinic-1',
      isActive: true,
      createdAt: new Date()
    },
    {
      id: '3',
      email: 'user@vetclinic.com',
      username: 'user',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.USER,
      clinicId: 'clinic-1',
      isActive: true,
      createdAt: new Date()
    }
  ];

  apiUrl: string;

constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private env: AppEnvironment
  ) {
    this.apiUrl = `${this.env.apiUrl}`;
  }


  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
    .post<ApiResponse<LoginResponse>>(`${this.apiUrl}/signin`, loginRequest)
    .pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message || 'Login failed');
      }),
      tap(response => {
        if (response.token) {
          // Save token and expiry to localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('expiresAt', response.expiresAt);
          
          // Also update the legacy keys if needed for compatibility
          localStorage.setItem(this.TOKEN_KEY, response.token);
          if (response.user) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
        }
      })
    );
  }

  logout(): void {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    
    // Check if token is expired
    if (this.isTokenExpired()) {
      this.logout(); // Clear expired token
      return false;
    }
    
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem('token') || 
           localStorage.getItem(this.TOKEN_KEY) || 
           sessionStorage.getItem(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem('expiresAt');
    if (!expiresAt) {
      return true; // If no expiry, consider it expired
    }
    
    // Parse the expiry date and compare with current time
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    
    return now >= expiryDate;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  // Decode JWT token and extract payload
  decodeToken(token?: string): JwtPayload | null {
    try {
      const tokenToUse = token || this.getToken();
      if (!tokenToUse) {
        return null;
      }
      return jwtDecode<JwtPayload>(tokenToUse);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Get user name from token
  getUserNameFromToken(): string | null {
    const payload = this.decodeToken();
    if (!payload) {
      return null;
    }
    
    // Try different claim formats
    return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 
           payload.name || 
           payload.given_name || 
           payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']?.split('@')[0] ||
           payload.email?.split('@')[0] || 
           'User';
  }

  // Get user role from token
  getUserRoleFromToken(): UserRole | null {
    const payload = this.decodeToken();
    if (!payload) return null;

    const roleClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role;
    return this.mapToUserRole(roleClaim);
  }

  // Get full user info from token
  getUserInfoFromToken(): { name: string; role: UserRole } | null {
    const payload = this.decodeToken();
    if (!payload) {
      return null;
    }

    const name = this.getUserNameFromToken() || 'User';
    const role = this.getUserRoleFromToken() || UserRole.USER;

    return { name, role };
  }

  private mapToUserRole(role: string | undefined): UserRole | null {
    if (!role) return null;
    
    // Normalize role string to match enum
    const normalizedRole = role.toUpperCase();
    
    if (normalizedRole === 'SUPERADMIN' || normalizedRole === 'SUPER_ADMIN') {
      return UserRole.SUPER_ADMIN;
    }
    if (normalizedRole === 'ADMIN') {
      return UserRole.ADMIN;
    }
    if (normalizedRole === 'USER') {
      return UserRole.USER;
    }
    
    return UserRole.USER; // Default fallback
  }

  private setSession(authResult: LoginResponse, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, authResult.token);
    storage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
    this.currentUserSubject.next(authResult.user);
  }
  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  private generateMockToken(): string {
    return 'mock_jwt_token_' + Math.random().toString(36).substring(2);
  }
}
