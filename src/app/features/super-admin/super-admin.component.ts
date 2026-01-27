import { Component } from '@angular/core';

@Component({
  selector: 'app-super-admin',
  template: `
    <div class="super-admin-container">
      <h1>Super Admin Dashboard</h1>
      <p>Manage all clinics and system-wide settings</p>
      <div class="admin-grid">
        <div class="admin-card">
          <span class="material-icons">business</span>
          <h3>Manage Clinics</h3>
          <p>Add, edit, or remove clinics</p>
        </div>
        <div class="admin-card">
          <span class="material-icons">people</span>
          <h3>All Users</h3>
          <p>View and manage all system users</p>
        </div>
        <div class="admin-card">
          <span class="material-icons">settings</span>
          <h3>System Settings</h3>
          <p>Configure system-wide preferences</p>
        </div>
        <div class="admin-card">
          <span class="material-icons">analytics</span>
          <h3>Reports</h3>
          <p>View system analytics and reports</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .super-admin-container {
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;

      h1 {
        font-size: 32px;
        color: #1f2937;
        margin-bottom: 8px;
      }

      p {
        color: #6b7280;
        margin-bottom: 32px;
      }

      .admin-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 24px;

        .admin-card {
          background: white;
          padding: 32px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          cursor: pointer;

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
          }

          .material-icons {
            font-size: 48px;
            color: #f59e0b;
            margin-bottom: 16px;
          }

          h3 {
            font-size: 18px;
            color: #1f2937;
            margin-bottom: 8px;
          }

          p {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
          }
        }
      }
    }
  `]
})
export class SuperAdminComponent { }
