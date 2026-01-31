import { Component } from '@angular/core';
import { UserRole } from '../../models';

/**
 * This component demonstrates various ways to use role-based access control
 * throughout the application.
 */
@Component({
  selector: 'app-role-usage-examples',
  template: `
    <div class="role-examples">
      <h2>Role-Based Access Control Examples</h2>

      <!-- Example 1: Simple button visibility -->
      <div class="example-section">
        <h3>Example 1: Button Visibility</h3>
        <p>Show this button only to admins:</p>
        
        <button *appRole="[UserRole.ADMIN, UserRole.SUPER_ADMIN]" 
                class="admin-btn"
                (click)="handleAdminClick()">
          Admin Only Button
        </button>
      </div>

      <!-- Example 2: Entire sections -->
      <div class="example-section">
        <h3>Example 2: Section Visibility</h3>
        <p>Show this section only to super admins:</p>
        
        <div *appRole="UserRole.SUPER_ADMIN" class="super-admin-section">
          <h4>Super Admin Panel</h4>
          <button (click)="createClinic()">Create Clinic</button>
          <button (click)="systemSettings()">System Settings</button>
        </div>
      </div>

      <!-- Example 3: Multiple roles -->
      <div class="example-section">
        <h3>Example 3: Multiple Roles</h3>
        <p>Show to admins and super admins:</p>
        
        <div *appRole="[UserRole.ADMIN, UserRole.SUPER_ADMIN]" class="management-section">
          <h4>Management Dashboard</h4>
          <ul>
            <li><a href="/doctors">Manage Doctors</a></li>
            <li><a href="/inventory">Manage Inventory</a></li>
            <li><a href="/reports">View Reports</a></li>
          </ul>
        </div>
      </div>

      <!-- Example 4: User-specific content -->
      <div class="example-section">
        <h3>Example 4: Regular User Content</h3>
        <p>Show only to regular users:</p>
        
        <div *appRole="UserRole.USER" class="user-section">
          <h4>User Dashboard</h4>
          <button (click)="viewMyPets()">View My Pets</button>
          <button (click)="myAppointments()">My Appointments</button>
        </div>
      </div>

      <!-- Example 5: Conditional content with ngIf -->
      <div class="example-section">
        <h3>Example 5: Programmatic Role Check</h3>
        <p>Using role checks in component logic:</p>
        
        <div>
          <p *ngIf="canEditSettings()">
            <button (click)="editSettings()">Edit Settings</button>
          </p>
          
          <p *ngIf="isSuperAdmin()">
            <button (click)="accessSuperAdminPanel()">Super Admin Panel</button>
          </p>
        </div>
      </div>

      <!-- Example 6: Role-based styling -->
      <div class="example-section">
        <h3>Example 6: Role-Based Styling</h3>
        <p>Different styles based on user role:</p>
        
        <div [ngClass]="getRoleClass()">
          This content has role-specific styling
        </div>
      </div>
    </div>
  `,
  styles: [`
    .role-examples {
      padding: 20px;
    }
    
    .example-section {
      margin: 20px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .admin-btn {
      background-color: #ff9800;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .super-admin-section {
      background-color: #f44336;
      color: white;
      padding: 15px;
      border-radius: 4px;
    }
    
    .super-admin-section button {
      background-color: white;
      color: #f44336;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
    }
    
    .management-section {
      background-color: #2196f3;
      color: white;
      padding: 15px;
      border-radius: 4px;
    }
    
    .management-section ul {
      list-style: none;
      padding: 0;
    }
    
    .management-section li {
      margin: 10px 0;
    }
    
    .management-section a {
      color: white;
      text-decoration: none;
    }
    
    .user-section {
      background-color: #4caf50;
      color: white;
      padding: 15px;
      border-radius: 4px;
    }
    
    .user-section button {
      background-color: white;
      color: #4caf50;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
    }
    
    .admin-role {
      background-color: #ff9800;
      padding: 10px;
      color: white;
    }
    
    .super-admin-role {
      background-color: #f44336;
      padding: 10px;
      color: white;
    }
    
    .user-role {
      background-color: #4caf50;
      padding: 10px;
      color: white;
    }
  `]
})
export class RoleUsageExamplesComponent {
  
  constructor() {}

  // Example methods demonstrating role-based logic
  
  /**
   * Check if current user can edit settings
   */
  canEditSettings(): boolean {
    // This would typically use AuthService
    // return this.authService.hasRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]);
    return false; // Placeholder
  }

  /**
   * Check if current user is super admin
   */
  isSuperAdmin(): boolean {
    // return this.authService.getCurrentUser()?.role === UserRole.SUPER_ADMIN;
    return false; // Placeholder
  }

  /**
   * Get CSS class based on user role
   */
  getRoleClass(): string {
    // const userRole = this.authService.getCurrentUser()?.role;
    // switch (userRole) {
    //   case UserRole.SUPER_ADMIN:
    //     return 'super-admin-role';
    //   case UserRole.ADMIN:
    //     return 'admin-role';
    //   case UserRole.USER:
    //     return 'user-role';
    //   default:
    //     return '';
    // }
    return ''; // Placeholder
  }

  // Event handlers
  handleAdminClick(): void {
    console.log('Admin button clicked');
  }

  createClinic(): void {
    console.log('Creating new clinic...');
  }

  systemSettings(): void {
    console.log('Opening system settings...');
  }

  viewMyPets(): void {
    console.log('Viewing my pets...');
  }

  myAppointments(): void {
    console.log('Viewing my appointments...');
  }

  editSettings(): void {
    console.log('Editing settings...');
  }

  accessSuperAdminPanel(): void {
    console.log('Accessing super admin panel...');
  }
}