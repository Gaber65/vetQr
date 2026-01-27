import { Component, OnInit } from '@angular/core';

interface PetData {
  id: number;
  name: string;
  species: string;
  nextVaccination: string;
}

@Component({
  selector: 'app-user',
  template: `
    <div class="user-container">
      <h1>My Pets</h1>
      <p>View your pet's health records and vaccination schedule</p>
      
      <div class="pets-grid">
        <div class="pet-card" *ngFor="let pet of pets">
          <div class="pet-header">
            <div class="pet-avatar">
              <span class="material-icons">pets</span>
            </div>
            <div class="pet-info">
              <h3>{{ pet.name }}</h3>
              <p>{{ pet.species }}</p>
            </div>
          </div>
          <div class="pet-details">
            <div class="detail-item">
              <span class="material-icons">vaccines</span>
              <div>
                <strong>Next Vaccination</strong>
                <p>{{ pet.nextVaccination }}</p>
              </div>
            </div>
            <div class="actions">
              <button class="btn-action">View Records</button>
              <button class="btn-action secondary">Book Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-container {
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;

      h1 {
        font-size: 32px;
        color: #1f2937;
        margin-bottom: 8px;
      }

      > p {
        color: #6b7280;
        margin-bottom: 32px;
      }

      .pets-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 24px;

        .pet-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
          }

          .pet-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;

            .pet-avatar {
              width: 64px;
              height: 64px;
              background: linear-gradient(135deg, #06b6d4, #10b981);
              border-radius: 16px;
              display: flex;
              align-items: center;
              justify-content: center;

              .material-icons {
                font-size: 36px;
                color: white;
              }
            }

            .pet-info {
              h3 {
                font-size: 20px;
                color: #1f2937;
                margin: 0 0 4px 0;
              }

              p {
                color: #6b7280;
                margin: 0;
                font-size: 14px;
              }
            }
          }

          .pet-details {
            .detail-item {
              display: flex;
              gap: 12px;
              padding: 16px;
              background: #f9fafb;
              border-radius: 12px;
              margin-bottom: 16px;

              .material-icons {
                color: #4f46e5;
                font-size: 24px;
              }

              strong {
                display: block;
                color: #1f2937;
                font-size: 14px;
                margin-bottom: 4px;
              }

              p {
                color: #6b7280;
                font-size: 13px;
                margin: 0;
              }
            }

            .actions {
              display: flex;
              gap: 12px;

              .btn-action {
                flex: 1;
                padding: 12px;
                background: linear-gradient(135deg, #4f46e5, #06b6d4);
                color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.3s;

                &:hover {
                  transform: scale(1.02);
                  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
                }

                &.secondary {
                  background: #f3f4f6;
                  color: #4f46e5;

                  &:hover {
                    background: #e5e7eb;
                    box-shadow: none;
                  }
                }
              }
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .pets-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `]
})
export class UserComponent implements OnInit {
  pets: PetData[] = [];

  ngOnInit(): void {
    // Mock pet data
    this.pets = [
      { id: 1, name: 'Max', species: 'Dog (Golden Retriever)', nextVaccination: 'March 15, 2026' },
      { id: 2, name: 'Luna', species: 'Cat (Persian)', nextVaccination: 'February 28, 2026' },
      { id: 3, name: 'Charlie', species: 'Dog (Labrador)', nextVaccination: 'April 10, 2026' }
    ];
  }
}
