import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { RoleDirective } from './directive/role.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AppLayoutComponent,
    RoleDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    AppLayoutComponent,
    RoleDirective,
    TranslateModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
