import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { User, UserRole } from '../../models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { APP_ENV } from '../../../env/app-env.token';
import { AppEnvironment } from '../../../env/app-env.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;
  currentLang: string;
  isMenuOpen = false;
  isDropdownOpen = false;
  appVersion: string;
  
  // User info from token
  userName: string = '';
  userRole: string = '';
  userInitials: string = '';

  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    @Inject(APP_ENV) private env: AppEnvironment
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.currentLang = localStorage.getItem('lang') || this.translate.currentLang || 'en';
    this.appVersion = this.env.version;
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    debugger
    const userInfo = this.authService.getUserInfoFromToken();
    if (userInfo) {
      this.userName = userInfo.name;
      this.userRole = this.formatRole(userInfo.role);
      this.userInitials = this.getInitials(userInfo.name);
    }
  }

  formatRole(role: UserRole): string {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return 'Super Admin';
      case UserRole.ADMIN:
        return 'Admin';
      case UserRole.USER:
        return 'User';
      default:
        return 'User';
    }
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  navigateToProfile(): void {
    this.closeDropdown();
    this.router.navigate(['/profile']);
  }

  navigateToSettings(): void {
    this.closeDropdown();
    this.router.navigate(['/settings']);
  }

  logout(): void {
    this.closeDropdown();
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    const userInfo = this.authService.getUserInfoFromToken();
    return userInfo?.role === UserRole.ADMIN;
  }

  get isSuperAdmin(): boolean {
    const userInfo = this.authService.getUserInfoFromToken();
    return userInfo?.role === UserRole.SUPER_ADMIN;
  }

  get isUser(): boolean {
    const userInfo = this.authService.getUserInfoFromToken();
    return userInfo?.role === UserRole.USER;
  }
}
