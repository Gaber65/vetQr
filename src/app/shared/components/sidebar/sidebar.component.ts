import { Component, Output, EventEmitter } from '@angular/core';

export interface NavItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar" [class.collapsed]="isCollapsed">
      <div class="sidebar-header">
        <div class="logo">
          <span class="material-icons">pets</span>
          <span class="logo-text" *ngIf="!isCollapsed">VetQR</span>
        </div>
        <button class="toggle-btn" (click)="toggleSidebar()">
          <span class="material-icons">{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section" *ngFor="let section of navSections">
          <span class="nav-section-title" *ngIf="!isCollapsed">{{ section.title }}</span>
          <a 
            class="nav-item" 
            *ngFor="let item of section.items"
            [class.active]="activeRoute === item.route"
            (click)="navigateTo(item.route)">
            <span class="material-icons nav-icon">{{ item.icon }}</span>
            <span class="nav-text" *ngIf="!isCollapsed">{{ item.label }}</span>
            <span class="nav-badge" *ngIf="item.badge && !isCollapsed">{{ item.badge }}</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-footer">
        <a class="nav-item logout" (click)="logout()">
          <span class="material-icons nav-icon">logout</span>
          <span class="nav-text" *ngIf="!isCollapsed">Logout</span>
        </a>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      height: 100vh;
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      transition: width 0.3s ease;
      z-index: 1000;
      box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);

      &.collapsed {
        width: 80px;
      }
    }

    .sidebar-header {
      padding: 24px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      color: white;

      .material-icons {
        font-size: 32px;
        background: linear-gradient(135deg, #06b6d4, #10b981);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .logo-text {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -0.5px;
      }
    }

    .toggle-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      color: white;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
      }

      .material-icons {
        font-size: 20px;
      }
    }

    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 20px 0;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }
    }

    .nav-section {
      margin-bottom: 24px;
    }

    .nav-section-title {
      display: block;
      padding: 8px 24px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.5);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 24px;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s;
      position: relative;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 0;
        background: linear-gradient(180deg, #06b6d4, #10b981);
        border-radius: 0 3px 3px 0;
        transition: height 0.3s;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: white;
      }

      &.active {
        background: rgba(6, 182, 212, 0.1);
        color: #06b6d4;

        &::before {
          height: 70%;
        }

        .nav-icon {
          background: linear-gradient(135deg, #06b6d4, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      &.logout {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 16px;

        &:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;

          .nav-icon {
            color: #ef4444;
          }
        }
      }

      .nav-icon {
        font-size: 22px;
        transition: all 0.3s;
      }

      .nav-text {
        font-size: 14px;
        font-weight: 500;
        flex: 1;
      }

      .nav-badge {
        background: linear-gradient(135deg, #06b6d4, #10b981);
        color: white;
        font-size: 11px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 12px;
        min-width: 20px;
        text-align: center;
      }
    }

    .sidebar-footer {
      padding: 16px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        
        &.mobile-open {
          transform: translateX(0);
        }
      }

      .sidebar.collapsed {
        width: 260px;
      }
    }
  `]
})
export class SidebarComponent {
  isCollapsed = false;
  activeRoute = '/dashboard';
  navSections: { title: string; items: NavItem[] }[] = [];

  constructor() {
    // Default navigation - can be customized per role
    this.navSections = [
      {
        title: 'Main',
        items: [
          { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
          { icon: 'pets', label: 'My Pets', route: '/user', badge: 3 },
          { icon: 'calendar_month', label: 'Appointments', route: '/appointments' }
        ]
      },
      {
        title: 'Management',
        items: [
          { icon: 'medical_services', label: 'Doctors', route: '/doctors' },
          { icon: 'inventory', label: 'Inventory', route: '/inventory' },
          { icon: 'analytics', label: 'Reports', route: '/reports' }
        ]
      }
    ];
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(route: string): void {
    this.activeRoute = route;
    // Navigation logic will be handled by router
  }

  logout(): void {
    // Logout logic
    console.log('Logging out...');
  }
}