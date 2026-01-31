import { Component } from '@angular/core';

interface SystemStat {
  icon: string;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: string;
}

interface SystemCard {
  icon: string;
  title: string;
  description: string;
  count?: number;
  color: string;
}

interface ClinicData {
  name: string;
  location: string;
  doctors: number;
  pets: number;
  status: string;
  revenue: string;
}

@Component({
  selector: 'app-super-admin',
  template: `
    <app-app-layout>
      <div class="super-admin-dashboard">
        <!-- System Stats -->
        <div class="stats-section">
          <h2>System Overview</h2>
          <div class="stats-grid">
            <div class="stat-card" *ngFor="let stat of systemStats">
              <div class="stat-header">
                <div class="stat-icon" [style.background]="stat.color">
                  <span class="material-icons">{{ stat.icon }}</span>
                </div>
                <div class="stat-trend" [class.positive]="stat.trendUp">
                  <span class="material-icons">{{ stat.trendUp ? 'trending_up' : 'trending_down' }}</span>
                  <span>{{ stat.trend }}</span>
                </div>
              </div>
              <div class="stat-content">
                <h3>{{ stat.value }}</h3>
                <p>{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- System Management -->
        <div class="section-header">
          <div class="section-title">
            <h2>System Management</h2>
            <p>Manage all clinics and system-wide settings</p>
          </div>
          <div class="section-actions">
            <button class="btn-primary">
              <span class="material-icons">add_business</span>
              Add New Clinic
            </button>
          </div>
        </div>

        <div class="system-grid">
          <div class="system-card" *ngFor="let card of systemCards" (click)="handleCardClick(card.title)">
            <div class="card-icon" [style.background]="card.color">
              <span class="material-icons">{{ card.icon }}</span>
            </div>
            <div class="card-content">
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
              <div class="card-badge" *ngIf="card.count">
                <span>{{ card.count }} {{ card.title.toLowerCase() }}</span>
              </div>
            </div>
            <div class="card-arrow">
              <span class="material-icons">arrow_forward</span>
            </div>
          </div>
        </div>

        <!-- Clinics Overview & System Activity -->
        <div class="dashboard-bottom">
          <div class="clinics-section">
            <div class="section-header-inline">
              <h3>Clinics Overview</h3>
              <a href="#" class="view-all">View All</a>
            </div>
            <div class="clinics-list">
              <div class="clinic-item" *ngFor="let clinic of clinics">
                <div class="clinic-header">
                  <div class="clinic-icon">
                    <span class="material-icons">business</span>
                  </div>
                  <div class="clinic-info">
                    <span class="clinic-name">{{ clinic.name }}</span>
                    <span class="clinic-location">{{ clinic.location }}</span>
                  </div>
                  <div class="clinic-status" [class.active]="clinic.status === 'active'">
                    {{ clinic.status }}
                  </div>
                </div>
                <div class="clinic-stats">
                  <div class="clinic-stat">
                    <span class="material-icons">medical_services</span>
                    <span>{{ clinic.doctors }} doctors</span>
                  </div>
                  <div class="clinic-stat">
                    <span class="material-icons">pets</span>
                    <span>{{ clinic.pets }} pets</span>
                  </div>
                  <div class="clinic-stat">
                    <span class="material-icons">payments</span>
                    <span>{{ clinic.revenue }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="activity-section">
            <div class="section-header-inline">
              <h3>System Activity</h3>
              <a href="#" class="view-all">View All</a>
            </div>
            <div class="activity-list">
              <div class="activity-item" *ngFor="let activity of activities">
                <div class="activity-icon" [style.background]="activity.color">
                  <span class="material-icons">{{ activity.icon }}</span>
                </div>
                <div class="activity-content">
                  <span class="activity-title">{{ activity.title }}</span>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent System Alerts -->
        <div class="alerts-section">
          <div class="section-header-inline">
            <h3>System Alerts</h3>
            <span class="alert-count">3 active</span>
          </div>
          <div class="alerts-grid">
            <div class="alert-item warning">
              <div class="alert-icon">
                <span class="material-icons">warning</span>
              </div>
              <div class="alert-content">
                <span class="alert-title">High Server Load</span>
                <span class="alert-message">Server CPU usage at 85%</span>
                <span class="alert-time">10 mins ago</span>
              </div>
              <button class="alert-action">Investigate</button>
            </div>
            <div class="alert-item info">
              <div class="alert-icon">
                <span class="material-icons">info</span>
              </div>
              <div class="alert-content">
                <span class="alert-title">Database Backup</span>
                <span class="alert-message">Scheduled backup completed successfully</span>
                <span class="alert-time">1 hour ago</span>
              </div>
              <button class="alert-action">View</button>
            </div>
            <div class="alert-item success">
              <div class="alert-icon">
                <span class="material-icons">check_circle</span>
              </div>
              <div class="alert-content">
                <span class="alert-title">New Clinic Onboarded</span>
                <span class="alert-message">PetCare Clinic successfully registered</span>
                <span class="alert-time">3 hours ago</span>
              </div>
              <button class="alert-action">Review</button>
            </div>
          </div>
        </div>
      </div>
    </app-app-layout>
  `,
  styles: [`
    .super-admin-dashboard {
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .stats-section {
      margin-bottom: 32px;

      h2 {
        font-size: 20px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 20px 0;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
      }
    }

    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }

      .stat-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 16px;

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;

          .material-icons {
            font-size: 24px;
            color: white;
          }
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #64748b;

          &.positive {
            background: linear-gradient(135deg, #dcfce7, #bbf7d0);
            color: #166534;
          }

          .material-icons {
            font-size: 16px;
          }
        }
      }

      .stat-content {
        h3 {
          font-size: 32px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }
      }
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;

      .section-title {
        h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }
      }

      .btn-primary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: linear-gradient(135deg, #f59e0b, #fbbf24);
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
        }

        .material-icons {
          font-size: 20px;
        }
      }
    }

    .system-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .system-card {
      background: white;
      padding: 28px;
      border-radius: 16px;
      display: flex;
      align-items: flex-start;
      gap: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);

        .card-arrow {
          transform: translateX(4px);
        }
      }

      .card-icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .material-icons {
          font-size: 28px;
          color: white;
        }
      }

      .card-content {
        flex: 1;

        h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 8px 0;
        }

        p {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 12px 0;
          line-height: 1.5;
        }

        .card-badge {
          display: inline-block;
          background: #f1f5f9;
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 8px;
        }
      }

      .card-arrow {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
        transition: transform 0.3s;

        .material-icons {
          font-size: 24px;
        }
      }
    }

    .dashboard-bottom {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }

    .clinics-section,
    .activity-section {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .section-header-inline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 2px solid #f1f5f9;

      h3 {
        font-size: 18px;
        font-weight: 700;
        color: #1e293b;
        margin: 0;
      }

      .view-all {
        font-size: 14px;
        color: #f59e0b;
        font-weight: 600;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: #fbbf24;
        }
      }

      .alert-count {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        background: linear-gradient(135deg, #fef3c7, #fde68a);
        color: #92400e;
        border-radius: 8px;
      }
    }

    .clinics-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .clinic-item {
      padding: 16px;
      background: #f8fafc;
      border-radius: 12px;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background: #f1f5f9;
        transform: translateX(4px);
      }

      .clinic-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;

        .clinic-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          .material-icons {
            font-size: 22px;
            color: white;
          }
        }

        .clinic-info {
          flex: 1;
          display: flex;
          flex-direction: column;

          .clinic-name {
            font-size: 14px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 2px;
          }

          .clinic-location {
            font-size: 12px;
            color: #64748b;
          }
        }

        .clinic-status {
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          background: #fef3c7;
          color: #92400e;

          &.active {
            background: linear-gradient(135deg, #dcfce7, #bbf7d0);
            color: #166534;
          }
        }
      }

      .clinic-stats {
        display: flex;
        gap: 20px;

        .clinic-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;

          .material-icons {
            font-size: 16px;
            color: #f59e0b;
          }
        }
      }
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      border-radius: 12px;
      transition: background 0.3s;
      cursor: pointer;

      &:hover {
        background: #f8fafc;
      }

      .activity-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .material-icons {
          font-size: 22px;
          color: white;
        }
      }

      .activity-content {
        flex: 1;
        display: flex;
        flex-direction: column;

        .activity-title {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .activity-time {
          font-size: 12px;
          color: #94a3b8;
        }
      }
    }

    .alerts-section {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .alerts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }

    .alert-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      border-radius: 12px;
      border-left: 4px solid;

      &.warning {
        background: linear-gradient(135deg, #fef3c7, #fde68a);
        border-left-color: #f59e0b;
      }

      &.info {
        background: linear-gradient(135deg, #e0f2fe, #bae6fd);
        border-left-color: #0ea5e9;
      }

      &.success {
        background: linear-gradient(135deg, #dcfce7, #bbf7d0);
        border-left-color: #10b981;
      }

      .alert-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .material-icons {
          font-size: 22px;
        }
      }

      .alert-content {
        flex: 1;
        display: flex;
        flex-direction: column;

        .alert-title {
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .alert-message {
          font-size: 13px;
          color: #475569;
          margin-bottom: 4px;
        }

        .alert-time {
          font-size: 11px;
          color: #64748b;
        }
      }

      .alert-action {
        padding: 8px 16px;
        background: white;
        border: none;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        color: #f59e0b;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: #fef3c7;
          transform: scale(1.05);
        }
      }
    }

    @media (max-width: 1024px) {
      .dashboard-bottom {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }

      .system-grid {
        grid-template-columns: 1fr !important;
      }

      .alerts-grid {
        grid-template-columns: 1fr !important;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  `]
})
export class SuperAdminComponent {
  systemStats: SystemStat[] = [
    { icon: 'business', label: 'Total Clinics', value: '24', trend: '+3', trendUp: true, color: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
    { icon: 'people', label: 'Total Users', value: '1,847', trend: '+18%', trendUp: true, color: 'linear-gradient(135deg, #4f46e5, #6366f1)' },
    { icon: 'pets', label: 'Total Pets', value: '4,521', trend: '+22%', trendUp: true, color: 'linear-gradient(135deg, #06b6d4, #10b981)' },
    { icon: 'payments', label: 'System Revenue', value: '$145.2k', trend: '+15%', trendUp: true, color: 'linear-gradient(135deg, #ec4899, #f472b6)' }
  ];

  systemCards: SystemCard[] = [
    { icon: 'business', title: 'Manage Clinics', description: 'Add, edit, or remove clinics', count: 24, color: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
    { icon: 'people', title: 'All Users', description: 'View and manage all system users', count: 1847, color: 'linear-gradient(135deg, #4f46e5, #6366f1)' },
    { icon: 'settings', title: 'System Settings', description: 'Configure system-wide preferences', color: 'linear-gradient(135deg, #64748b, #94a3b8)' },
    { icon: 'analytics', title: 'Reports', description: 'View system analytics and reports', color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }
  ];

  clinics: ClinicData[] = [
    { name: 'VetCare Clinic', location: 'New York, NY', doctors: 8, pets: 248, status: 'active', revenue: '$12.5k' },
    { name: 'PetHealth Center', location: 'Los Angeles, CA', doctors: 6, pets: 186, status: 'active', revenue: '$9.8k' },
    { name: 'Animal Wellness', location: 'Chicago, IL', doctors: 5, pets: 142, status: 'active', revenue: '$7.2k' }
  ];

  activities = [
    { icon: 'add_business', title: 'New clinic registered: VetCare', time: '5 mins ago', color: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
    { icon: 'person_add', title: 'New super admin added', time: '30 mins ago', color: 'linear-gradient(135deg, #4f46e5, #6366f1)' },
    { icon: 'upgrade', title: 'System upgrade completed', time: '2 hours ago', color: 'linear-gradient(135deg, #10b981, #34d399)' },
    { icon: 'security', title: 'Security audit passed', time: '5 hours ago', color: 'linear-gradient(135deg, #06b6d4, #10b981)' }
  ];

  handleCardClick(title: string): void {
    console.log(`Navigating to ${title}`);
  }
}