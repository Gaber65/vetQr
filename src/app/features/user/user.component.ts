import { Component, OnInit } from '@angular/core';

interface PetData {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  nextVaccination: string;
  lastVisit: string;
  vaccinations: number;
  appointments: number;
  avatar: string;
}

@Component({
  selector: 'app-user',
  template: `
    <app-app-layout>
      <div class="user-dashboard">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card primary">
            <div class="stat-icon">
              <span class="material-icons">pets</span>
            </div>
            <div class="stat-content">
              <h3>{{ pets.length }}</h3>
              <p>Total Pets</p>
            </div>
          </div>
          <div class="stat-card success">
            <div class="stat-icon">
              <span class="material-icons">event</span>
            </div>
            <div class="stat-content">
              <h3>2</h3>
              <p>Upcoming Appointments</p>
            </div>
          </div>
          <div class="stat-card warning">
            <div class="stat-icon">
              <span class="material-icons">vaccines</span>
            </div>
            <div class="stat-content">
              <h3>1</h3>
              <p>Vaccination Due</p>
            </div>
          </div>
          <div class="stat-card info">
            <div class="stat-icon">
              <span class="material-icons">history</span>
            </div>
            <div class="stat-content">
              <h3>12</h3>
              <p>Total Visits</p>
            </div>
          </div>
        </div>

        <!-- My Pets Section -->
        <div class="section-header">
          <div class="section-title">
            <h2>My Pets</h2>
            <p>Manage your pet health records and schedules</p>
          </div>
          <button class="btn-primary">
            <span class="material-icons">add</span>
            Add New Pet
          </button>
        </div>

        <div class="pets-grid">
          <div class="pet-card" *ngFor="let pet of pets">
            <div class="pet-header">
              <div class="pet-avatar">
                <span class="material-icons">{{ pet.avatar }}</span>
              </div>
              <div class="pet-info">
                <div class="pet-name-group">
                  <h3>{{ pet.name }}</h3>
                  <span class="pet-badge">{{ pet.species }}</span>
                </div>
                <p>{{ pet.breed }}</p>
              </div>
              <div class="pet-actions">
                <button class="icon-btn">
                  <span class="material-icons">more_vert</span>
                </button>
              </div>
            </div>
            
            <div class="pet-stats">
              <div class="stat-item">
                <span class="material-icons">cake</span>
                <div>
                  <span class="stat-label">Age</span>
                  <span class="stat-value">{{ pet.age }} years</span>
                </div>
              </div>
              <div class="stat-item">
                <span class="material-icons">vaccines</span>
                <div>
                  <span class="stat-label">Vaccinations</span>
                  <span class="stat-value">{{ pet.vaccinations }}</span>
                </div>
              </div>
              <div class="stat-item">
                <span class="material-icons">event_available</span>
                <div>
                  <span class="stat-label">Last Visit</span>
                  <span class="stat-value">{{ pet.lastVisit }}</span>
                </div>
              </div>
            </div>

            <div class="pet-vaccination">
              <div class="vaccination-alert" [class.urgent]="isVaccinationUrgent(pet.nextVaccination)">
                <span class="material-icons">notifications_active</span>
                <div class="vaccination-info">
                  <span class="vaccination-label">Next Vaccination</span>
                  <span class="vaccination-date">{{ pet.nextVaccination }}</span>
                </div>
              </div>
            </div>

            <div class="pet-footer">
              <button class="btn-action">
                <span class="material-icons">description</span>
                View Records
              </button>
              <button class="btn-action secondary">
                <span class="material-icons">calendar_today</span>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-app-layout>
  `,
  styles: [`
    .user-dashboard {
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }

      &.primary .stat-icon {
        background: linear-gradient(135deg, #4f46e5, #6366f1);
      }

      &.success .stat-icon {
        background: linear-gradient(135deg, #10b981, #34d399);
      }

      &.warning .stat-icon {
        background: linear-gradient(135deg, #f59e0b, #fbbf24);
      }

      &.info .stat-icon {
        background: linear-gradient(135deg, #06b6d4, #22d3ee);
      }

      .stat-icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;

        .material-icons {
          font-size: 28px;
          color: white;
        }
      }

      .stat-content {
        h3 {
          font-size: 28px;
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
      padding-bottom: 16px;
      border-bottom: 2px solid #e2e8f0;

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

    .pets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 24px;
    }

    .pet-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      transition: all 0.3s;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
      }
    }

    .pet-header {
      padding: 24px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      border-bottom: 1px solid #f1f5f9;

      .pet-avatar {
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #06b6d4, #10b981);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .material-icons {
          font-size: 36px;
          color: white;
        }
      }

      .pet-info {
        flex: 1;

        .pet-name-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;

          h3 {
            font-size: 20px;
            font-weight: 700;
            color: #1e293b;
            margin: 0;
          }

          .pet-badge {
            background: linear-gradient(135deg, #06b6d4, #10b981);
            color: white;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 12px;
            text-transform: uppercase;
          }
        }

        p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }
      }

      .pet-actions {
        .icon-btn {
          background: #f1f5f9;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background: #e2e8f0;
            transform: scale(1.05);
          }

          .material-icons {
            font-size: 20px;
            color: #64748b;
          }
        }
      }
    }

    .pet-stats {
      padding: 20px 24px;
      display: flex;
      gap: 24px;
      border-bottom: 1px solid #f1f5f9;
      background: #f8fafc;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;

        .material-icons {
          font-size: 20px;
          color: #64748b;
        }

        > div {
          display: flex;
          flex-direction: column;

          .stat-label {
            font-size: 11px;
            font-weight: 600;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .stat-value {
            font-size: 13px;
            font-weight: 600;
            color: #1e293b;
          }
        }
      }
    }

    .pet-vaccination {
      padding: 16px 24px;
      background: white;

      .vaccination-alert {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: linear-gradient(135deg, #fef3c7, #fde68a);
        border-radius: 12px;
        border-left: 4px solid #f59e0b;

        &.urgent {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          border-left-color: #ef4444;
        }

        .material-icons {
          font-size: 24px;
          color: #f59e0b;
        }

        .vaccination-info {
          display: flex;
          flex-direction: column;
          flex: 1;

          .vaccination-label {
            font-size: 11px;
            font-weight: 600;
            color: #92400e;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .vaccination-date {
            font-size: 14px;
            font-weight: 700;
            color: #78350f;
          }
        }
      }
    }

    .pet-footer {
      padding: 16px 24px;
      display: flex;
      gap: 12px;
      background: white;

      .btn-action {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
        }

        &.secondary {
          background: #f1f5f9;
          color: #4f46e5;

          &:hover {
            background: #e2e8f0;
            box-shadow: none;
          }
        }

        .material-icons {
          font-size: 18px;
        }
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }

      .pets-grid {
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
export class UserComponent implements OnInit {
  pets: PetData[] = [];

  ngOnInit(): void {
    // Mock pet data
    this.pets = [
      { 
        id: 1, 
        name: 'Max', 
        species: 'Dog', 
        breed: 'Golden Retriever', 
        age: 3, 
        nextVaccination: 'March 15, 2026', 
        lastVisit: 'Jan 10, 2025',
        vaccinations: 8,
        appointments: 12,
        avatar: 'pets'
      },
      { 
        id: 2, 
        name: 'Luna', 
        species: 'Cat', 
        breed: 'Persian', 
        age: 2, 
        nextVaccination: 'February 28, 2026', 
        lastVisit: 'Dec 22, 2024',
        vaccinations: 6,
        appointments: 8,
        avatar: 'pets'
      },
      { 
        id: 3, 
        name: 'Charlie', 
        species: 'Dog', 
        breed: 'Labrador', 
        age: 4, 
        nextVaccination: 'April 10, 2026', 
        lastVisit: 'Feb 5, 2025',
        vaccinations: 10,
        appointments: 15,
        avatar: 'pets'
      }
    ];
  }

  isVaccinationUrgent(date: string): boolean {
    // Check if vaccination is within next 30 days
    const vaccinationDate = new Date(date);
    const today = new Date();
    const daysUntil = Math.ceil((vaccinationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30;
  }
}