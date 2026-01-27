import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    // Handle 401 - redirect to login
    if (error.status === 401) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // Only show errors from backend response
    const errorBody = error.error;
    if (!errorBody) {
      return;
    }

    const errorMessages = this.extractErrorMessages(errorBody);
    
    if (errorMessages.length === 0) {
      return;
    }

    // Display errors from backend
    if (errorMessages.length === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessages[0],
        confirmButtonColor: '#3085d6'
      });
    } else {
      // Multiple errors - show as list
      const errorHtml = '<ul style="text-align: left; margin: 0; padding-left: 20px;">' + 
        errorMessages.map(msg => `<li>${msg}</li>`).join('') + 
        '</ul>';
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: errorHtml,
        confirmButtonColor: '#3085d6'
      });
    }

    console.error('HTTP Error:', error);
  }

  private extractErrorMessages(errorBody: any): string[] {
    const errorMessages: string[] = [];

    if (typeof errorBody === 'string') {
      errorMessages.push(errorBody);
      return errorMessages;
    }

    // Check for message field
    if (errorBody.message) {
      errorMessages.push(errorBody.message);
    }

    // Check for errors object (FluentValidation / ASP.NET Core format)
    if (errorBody.errors) {
      if (typeof errorBody.errors === 'object' && !Array.isArray(errorBody.errors)) {
        for (const field in errorBody.errors) {
          if (Array.isArray(errorBody.errors[field])) {
            errorMessages.push(...errorBody.errors[field]);
          } else if (typeof errorBody.errors[field] === 'string') {
            errorMessages.push(errorBody.errors[field]);
          }
        }
      } else if (Array.isArray(errorBody.errors)) {
        errorBody.errors.forEach((err: any) => {
          if (typeof err === 'string') {
            errorMessages.push(err);
          } else if (err.message) {
            errorMessages.push(err.message);
          } else if (err.errorMessage) {
            errorMessages.push(err.errorMessage);
          }
        });
      }
    }

    // Check for title (ASP.NET Core ProblemDetails)
    if (errorBody.title && errorMessages.length === 0) {
      errorMessages.push(errorBody.title);
    }

    // Check for validationErrors array
    if (errorBody.validationErrors && Array.isArray(errorBody.validationErrors)) {
      errorBody.validationErrors.forEach((err: any) => {
        if (typeof err === 'string') {
          errorMessages.push(err);
        } else if (err.message) {
          errorMessages.push(err.message);
        }
      });
    }

    // Remove duplicates
    return [...new Set(errorMessages)];
  }
}
