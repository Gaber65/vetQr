import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AppLayoutComponent
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
    TranslateModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
