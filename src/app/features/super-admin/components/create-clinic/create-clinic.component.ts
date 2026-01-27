import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClinicService } from '../../../../shared/services/clinic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-clinic',
  template: `
    <div class="create-clinic-container">
      <h2>{{ 'CLINIC.CREATE' | translate }}</h2>
      <form [formGroup]="clinicForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>{{ 'CLINIC.NAME' | translate }}</label>
          <input type="text" formControlName="name" class="form-control" />
        </div>
        
        <div class="form-group">
          <label>{{ 'CLINIC.ADDRESS' | translate }}</label>
          <input type="text" formControlName="address" class="form-control" />
        </div>

        <div class="form-group">
          <label>{{ 'CLINIC.PHONE' | translate }}</label>
          <input type="text" formControlName="phoneNumber" class="form-control" />
        </div>

        <div class="form-group">
          <label>{{ 'CLINIC.EMAIL' | translate }}</label>
          <input type="email" formControlName="email" class="form-control" />
        </div>

        <div class="form-group">
          <label>{{ 'CLINIC.DESCRIPTION' | translate }}</label>
          <textarea formControlName="description" class="form-control"></textarea>
        </div>

        <button type="submit" [disabled]="!clinicForm.valid" class="btn-submit">
          {{ 'CLINIC.SUBMIT' | translate }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .create-clinic-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
    }
    .btn-submit {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    .btn-submit:disabled {
      background-color: #ccc;
    }
  `]
})
export class CreateClinicComponent implements OnInit {
  clinicForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private router: Router
  ) {
    this.clinicForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.clinicForm.valid) {
      const clinicData = {
        ...this.clinicForm.value,
        isActive: true
      };

      this.clinicService.create(clinicData).subscribe({
        next: (response) => {
          if (response.success) {
            alert(response.message[0] || 'Clinic created successfully');
            // Navigate back or reset form
            // this.router.navigate(['/super-admin']);
          } else {
             alert();
          }
        },
        error: (err) => {
          console.error('Error creating clinic', err);
        }
      });
    }
  }
}
