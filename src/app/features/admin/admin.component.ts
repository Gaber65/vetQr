import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <div class="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Manage clinic operations and staff</p>
      <div class="admin-grid">
        <div class="admin-card">
          <span class="material-icons">medical_services</span>
          <h3>Doctors</h3>
          <p>Manage veterinarians and staff</p>
        </div>
        <div class="admin-card">
          <span class="material-icons">pets</span>
          <h3>Pets</h3>
          <p>View and manage all pet records</p>
        </div>
        <div class="admin-card">
          <span class="material-icons">calendar_month</span>
          <h3>Appointments</h3>
          <p>Manage clinic schedule</p>
        </div>
        <div class="admin-card">
          <span class="material-icons">inventory</span>
          <h3>Inventory</h3>
          <p>Manage medical supplies</p>
        </div>
        <div class="admin-card">
          <span class="material-icons">analytics</span>
          <h3>Reports</h3>
          <p>View clinic performance</p>
        </div>
        <div class="admin-card">
          <span class="material-icons">settings</span>
          <h3>Settings</h3>
          <p>Configure clinic preferences</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
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
            color: #4f46e5;
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
export class AdminComponent { }
