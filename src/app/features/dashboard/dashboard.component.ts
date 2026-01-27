import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../../shared/models';
import { AuthService } from '../../core/services/auth.service';
import { BaseComponent } from '../../shared/components/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
  currentUser: User | null = null;
  userRole = UserRole;
  stats = {
    totalPets: 156,
    appointmentsToday: 12,
    vaccinations: 8,
    activeUsers: 45
  };
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
