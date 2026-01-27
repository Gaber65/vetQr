// Shared Models
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  clinicId?: string;
  phoneNumber?: string;
  profileImage?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt:string
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  dateOfBirth: Date;
  ownerId: string;
  ownerName: string;
  gender: 'Male' | 'Female';
  color: string;
  weight: number;
  microchipNumber?: string;
  profileImage?: string;
  isActive: boolean;
}

export interface Vaccination {
  id: string;
  petId: string;
  vaccineName: string;
  vaccinationType: string;
  dateAdministered: Date;
  nextDueDate?: Date;
  veterinarianName: string;
  batchNumber?: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  visitDate: Date;
  diagnosis: string;
  treatment: string;
  veterinarianName: string;
  prescriptions?: string[];
  notes?: string;
  followUpDate?: Date;
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  ownerId: string;
  ownerName: string;
  appointmentDate: Date;
  appointmentTime: string;
  reason: string;
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';
  veterinarianName?: string;
  notes?: string;
}

export * from './clinic-setting.model';
export * from './clinic.model';
export * from './creator/creator.model';
export * from './api-response/api-response.model';

export interface SignInCommand {
  email: string;
  password: string;
}

export interface AuthResult {
  token: string;
  refreshToken: string;
  user: User;
  isSuccess: boolean;
  message?: string;
  errors?: string[];
}

// JWT Token Payload Interface
export interface JwtPayload {
  sub?: string; // User ID
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  role?: UserRole;
  exp?: number; // Expiration time
  iat?: number; // Issued at
  // SOAP Claims
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
  [key: string]: any; // Allow additional claims
}


