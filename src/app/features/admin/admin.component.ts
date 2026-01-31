import { Component } from '@angular/core';

interface AdminStat {
  icon: string;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: string;
}

interface AdminCard {
  icon: string;
  title: string;
  description: string;
  count?: number;
  color: string;
}

@Component({
  selector: 'app-admin',
  template: `
    <app-app-layout>
      <div class="admin-dashboard">
        <!-- Stats Overview -->
        <div class="stats-section">
          <h2>Clinic Overview</h2>
          <div class="stats-grid">
            <div class="stat-card" *ngFor="let stat of stats">
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

        <!-- Quick Actions -->
        <div class="section-header">
          <div class="section-title">
            <h2>Quick Actions</h2>
            <p>Manage clinic operations and staff</p>
          </div>
          <div class="section-actions">
            <button class="btn-primary">
              <span class="material-icons">add</span>
              New Appointment
            </button>
          </div>
        </div>

        <div class="admin-grid">
          <div class="admin-card" *ngFor="let card of adminCards" (click)="handleCardClick(card.title)">
            <div class="card-icon" [style.background]="card.color">
              <span class="material-icons">{{ card.icon }}</span>
            </div>
            <div class="card-content">
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
              <div class="card-badge" *ngIf="card.count">
                <span>{{ card.count }} items</span>
              </div>
            </div>
            <div class="card-arrow">
              <span class="material-icons">arrow_forward</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity & Upcoming -->
        <div class="dashboard-bottom">
          <div class="activity-section">
            <div class="section-header-inline">
              <h3>Recent Activity</h3>
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

          <div class="appointments-section">
            <div class="section-header-inline">
              <h3>Today's Appointments</h3>
              <a href="#" class="view-all">View All</a>
            </div>
            <div class="appointment-list">
              <div class="appointment-item" *ngFor="let appointment of appointments">
                <div class="appointment-time">
                  <span class="time">{{ appointment.time }}</span>
                  <span class="duration">{{ appointment.duration }}</span>
                </div>
                <div class="appointment-info">
                  <span class="pet-name">{{ appointment.pet }}</span>
                  <span class="owner-name">{{ appointment.owner }}</span>
                </div>
                <div class="appointment-status" [class.confirmed]="appointment.status === 'confirmed'">
                  {{ appointment.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-app-layout>
  `,
  styles: [`
    .admin-dashboard {
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
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
        }

        .material-icons {
          font-size: 20px;
        }
      }
    }

    .admin-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .admin-card {
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
    }

    .activity-section,
    .appointments-section {
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
        color: #4f46e5;
        font-weight: 600;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: #6366f1;
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

    .appointment-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .appointment-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px;
      background: #f8fafc;
      border-radius: 12px;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background: #f1f5f9;
        transform: translateX(4px);
      }

      .appointment-time {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 70px;

        .time {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
        }

        .duration {
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
        }
      }

      .appointment-info {
        flex: 1;
        display: flex;
        flex-direction: column;

        .pet-name {
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .owner-name {
          font-size: 12px;
          color: #64748b;
        }
      }

      .appointment-status {
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        background: #fef3c7;
        color: #92400e;

        &.confirmed {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #166534;
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

      .admin-grid {
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
export class AdminComponent {
  stats: AdminStat[] = [
    { icon: 'pets', label: 'Total Pets', value: '248', trend: '+12%', trendUp: true, color: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
    { icon: 'event', label: 'Today\'s Appointments', value: '18', trend: '+5%', trendUp: true, color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
    { icon: 'medical_services', label: 'Active Doctors', value: '8', trend: '0%', trendUp: false, color: 'linear-gradient(135deg, #10b981, #34d399)' },
    { icon: 'trending_up', label: 'Revenue (MTD)', value: '$12.5k', trend: '+18%', trendUp: true, color: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }
  ];

  adminCards: AdminCard[] = [
    { icon: 'medical_services', title: 'Doctors', description: 'Manage veterinarians and staff', count: 8, color: 'linear-gradient(135deg, #4f46e5, #6366f1)' },
    { icon: 'pets', title: 'Pets', description: 'View and manage all pet records', count: 248, color: 'linear-gradient(135deg, #06b6d4, #10b981)' },
    { icon: 'calendar_month', title: 'Appointments', description: 'Manage clinic schedule', count: 18, color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
    { icon: 'inventory', title: 'Inventory', description: 'Manage medical supplies', count: 156, color: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
    { icon: 'analytics', title: 'Reports', description: 'View clinic performance', color: 'linear-gradient(135deg, #ec4899, #f472b6)' },
    { icon: 'settings', title: 'Settings', description: 'Configure clinic preferences', color: 'linear-gradient(135deg, #64748b, #94a3b8)' }
  ];

  activities = [
    { icon: 'add_circle', title: 'New pet registered: Rocky', time: '2 mins ago', color: 'linear-gradient(135deg, #10b981, #34d399)' },
    { icon: 'event', title: 'Appointment scheduled for Max', time: '15 mins ago', color: 'linear-gradient(135deg, #4f46e5, #6366f1)' },
    { icon: 'vaccines', title: 'Vaccination completed for Luna', time: '1 hour ago', color: 'linear-gradient(135deg, #06b6d4, #10b981)' },
    { icon: 'person', title: 'New staff member joined', time: '3 hours ago', color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }
  ];

  appointments = [
    { time: '09:00', duration: '30m', pet: 'Max', owner: 'John Doe', status: 'confirmed' },
    { time: '10:30', duration: '45m', pet: 'Luna', owner: 'Jane Smith', status: 'confirmed' },
    { time: '14:00', duration: '30m', pet: 'Rocky', owner: 'Mike Johnson', status: 'pending' }
  ];

  handleCardClick(title: string): void {
    console.log(`Navigating to ${title}`);
  }
}