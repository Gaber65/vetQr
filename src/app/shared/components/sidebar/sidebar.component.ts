import { 
  Component, 
  Inject, 
  EventEmitter, 
  Output, 
  Input, 
  HostListener,
  ElementRef,
  ViewChild, 
  AfterViewInit,
  OnDestroy,
  OnInit 
} from '@angular/core';
import { Router } from '@angular/router';
import { APP_ENV } from '../../../env/app-env.token';
import { AppEnvironment } from '../../../env/app-env.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../models';

export interface NavItem {
  icon: string;
  labelKey: string;
  route: string;
  badge?: number;
  roles?: UserRole[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() isMobile = false;
  @Input() isMobileOpen = false;
  @Input() isCollapsed = false;
  @Output() stateChange = new EventEmitter<boolean>();
  @Output() closeMobile = new EventEmitter<void>();
  
  @ViewChild('sidebar') sidebarRef!: ElementRef;
  
  activeRoute = '/dashboard';
  navSections: { titleKey: string; items: NavItem[] }[] = [
    {
      titleKey: 'SIDEBAR.MAIN',
      items: [
        { icon: 'dashboard', labelKey: 'SIDEBAR.DASHBOARD', route: '/dashboard', roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN] },
        { icon: 'pets', labelKey: 'SIDEBAR.MY_PETS', route: '/pets', badge: 3, roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN] },
        { icon: 'calendar_month', labelKey: 'SIDEBAR.APPOINTMENTS', route: '/appointments', roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN] }
      ]
    },
    {
      titleKey: 'SIDEBAR.MANAGEMENT',
      items: [
        { icon: 'medical_services', labelKey: 'SIDEBAR.DOCTORS', route: '/doctors', roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
        { icon: 'inventory', labelKey: 'SIDEBAR.INVENTORY', route: '/inventory', roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
        { icon: 'analytics', labelKey: 'SIDEBAR.REPORTS', route: '/reports', roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] }
      ]
    },
    {
      titleKey: 'SIDEBAR.SUPER_ADMIN',
      items: [
        { icon: 'admin_panel_settings', labelKey: 'SIDEBAR.CLINICS', route: '/super-admin', roles: [UserRole.SUPER_ADMIN] },
        { icon: 'settings', labelKey: 'SIDEBAR.SYSTEM_SETTINGS', route: '/super-admin/settings', roles: [UserRole.SUPER_ADMIN] }
      ]
    }
  ];
  
  appVersion: string;
  currentUserRole: UserRole | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(APP_ENV) private env: AppEnvironment,
    private router: Router,
    private authService: AuthService
  ) {
    this.appVersion = this.env.version;
  }

  ngOnInit() {
    // Get current user role on initialization
    this.currentUserRole = this.authService.getCurrentUser()?.role || null;
  }

  ngAfterViewInit() {
    this.setupAccessibility();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Handle sidebar keyboard navigation
    if (event.key === 'Escape' && this.isMobileOpen) {
      this.closeMobile.emit();
    }
  }

  private setupAccessibility() {
    if (this.sidebarRef) {
      const sidebar = this.sidebarRef.nativeElement;
      sidebar.setAttribute('role', 'navigation');
      sidebar.setAttribute('aria-label', 'Main navigation');
    }
  }

  /**
   * Filter navigation items based on user role
   */
  getFilteredNavItems(items: NavItem[]): NavItem[] {
    return items.filter(item => {
      // If no roles specified, show to everyone
      if (!item.roles || item.roles.length === 0) {
        return true;
      }
      // Check if current user's role matches any of the allowed roles
      return this.currentUserRole ? item.roles.includes(this.currentUserRole) : false;
    });
  }

  /**
   * Check if a section should be visible based on filtered items
   */
  shouldShowSection(items: NavItem[]): boolean {
    return this.getFilteredNavItems(items).length > 0;
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      this.closeMobile.emit();
    } else {
      const newState = !this.isCollapsed;
      this.isCollapsed = newState;
      this.stateChange.emit(newState);
    }
  }

  navigateTo(route: string): void {
    this.activeRoute = route;
    this.router.navigate([route]).then(() => {
      if (this.isMobile) {
        this.closeMobile.emit();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getSidebarClasses(): { [key: string]: boolean } {
    return {
      'sidebar': true,
      'collapsed': this.isCollapsed && !this.isMobile,
      'mobile-open': this.isMobile && this.isMobileOpen
    };
  }
}