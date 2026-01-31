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
  OnDestroy 
} from '@angular/core';
import { Router } from '@angular/router';
import { APP_ENV } from '../../../env/app-env.token';
import { AppEnvironment } from '../../../env/app-env.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface NavItem {
  icon: string;
  labelKey: string;
  route: string;
  badge?: number;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
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
        { icon: 'dashboard', labelKey: 'SIDEBAR.DASHBOARD', route: '/dashboard' },
        { icon: 'pets', labelKey: 'SIDEBAR.MY_PETS', route: '/pets', badge: 3 },
        { icon: 'calendar_month', labelKey: 'SIDEBAR.APPOINTMENTS', route: '/appointments' }
      ]
    },
    {
      titleKey: 'SIDEBAR.MANAGEMENT',
      items: [
        { icon: 'medical_services', labelKey: 'SIDEBAR.DOCTORS', route: '/doctors' },
        { icon: 'inventory', labelKey: 'SIDEBAR.INVENTORY', route: '/inventory' },
        { icon: 'analytics', labelKey: 'SIDEBAR.REPORTS', route: '/reports' }
      ]
    }
  ];
  
  appVersion: string;
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(APP_ENV) private env: AppEnvironment,
    private router: Router
  ) {
    this.appVersion = this.env.version;
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
    // Implement logout logic
    console.log('Logging out...');
    // Typically: this.authService.logout();
  }

  getSidebarClasses(): { [key: string]: boolean } {
    return {
      'sidebar': true,
      'collapsed': this.isCollapsed && !this.isMobile,
      'mobile-open': this.isMobile && this.isMobileOpen
    };
  }
}