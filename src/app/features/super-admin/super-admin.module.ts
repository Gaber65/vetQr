import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SuperAdminComponent } from './super-admin.component';
import { CreateClinicComponent } from './components/create-clinic/create-clinic.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: SuperAdminComponent },
  { path: 'create-clinic', component: CreateClinicComponent }
];

@NgModule({
  declarations: [
    SuperAdminComponent,
    CreateClinicComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SuperAdminModule { }
