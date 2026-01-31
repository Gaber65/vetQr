import { Component } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      
      <div class="main-content" [class.expanded]="isSidebarExpanded">
        <header class="top-header">
          <div class="header-left">
            <button class="mobile-menu-toggle" (click)="toggleMobileSidebar()">
              <span class="material-icons">menu</span>
            </button>
            <h1 class="page-title">{{ pageTitle }}</h1>
          </div>
          
          <div class="header-right">
            <div class="search-box">
              <span class="material-icons search-icon">search</span>
              <input type="text" placeholder="Search pets, appointments..." />
            </div>
            
            <button class="header-btn notification-btn">
              <span class="material-icons">notifications</span>
              <span class="notification-badge">5</span>
            </button>
            
            <div class="user-profile">
              <div class="avatar">
                <span class="material-icons">person</span>
              </div>
              <div class="user-info">
                <span class="user-name">Dr. Sarah Johnson</span>
                <span class="user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <main class="content-area">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      min-height: 100vh;
      background: #f8fafc;
    }

    .main-content {
      flex: 1;
      margin-left: 260px;
      display: flex;
      flex-direction: column;
      transition: margin-left 0.3s ease;

      &.expanded {
        margin-left: 80px;
      }
    }

    .top-header {
      background: white;
      padding: 16px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 999;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: background 0.3s;

      &:hover {
        background: #f1f5f9;
      }

      .material-icons {
        font-size: 24px;
        color: #475569;
      }
    }

    .page-title {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .search-box {
      display: flex;
      align-items: center;
      background: #f1f5f9;
      padding: 10px 16px;
      border-radius: 12px;
      min-width: 320px;

      .search-icon {
        font-size: 20px;
        color: #94a3b8;
        margin-right: 12px;
      }

      input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: 14px;
        color: #1e293b;
        outline: none;

        &::placeholder {
          color: #94a3b8;
        }
      }
    }

    .header-btn {
      position: relative;
      background: #f1f5f9;
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #e2e8f0;
        transform: translateY(-2px);
      }

      .material-icons {
        font-size: 22px;
        color: #475569;
      }

      .notification-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        font-size: 10px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 10px;
        min-width: 16px;
        text-align: center;
      }
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 12px;
      transition: background 0.3s;

      &:hover {
        background: #f1f5f9;
      }

      .avatar {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #06b6d4, #10b981);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        .material-icons {
          font-size: 24px;
          color: white;
        }
      }

      .user-info {
        display: flex;
        flex-direction: column;

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .user-role {
          font-size: 12px;
          color: #64748b;
        }
      }
    }

    .content-area {
      flex: 1;
      padding: 32px;
      overflow-y: auto;
    }

    @media (max-width: 1024px) {
      .search-box {
        min-width: 240px;
      }
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }

      .mobile-menu-toggle {
        display: block;
      }

      .search-box {
        display: none;
      }

      .user-info {
        display: none;
      }

      .top-header {
        padding: 16px 20px;
      }

      .content-area {
        padding: 20px;
      }
    }
  `]
})
export class AppLayoutComponent {
  pageTitle = 'Dashboard';
  isSidebarExpanded = false;

  constructor() {
    // Set page title based on current route
    this.updatePageTitle();
  }

  updatePageTitle(): void {
    // This will be updated based on route in actual implementation
    const currentPath = window.location.pathname;
    if (currentPath.includes('user')) {
      this.pageTitle = 'My Pets';
    } else if (currentPath.includes('admin')) {
      this.pageTitle = 'Admin Dashboard';
    } else if (currentPath.includes('super-admin')) {
      this.pageTitle = 'Super Admin Dashboard';
    } else {
      this.pageTitle = 'Dashboard';
    }
  }

  toggleMobileSidebar(): void {
    // Toggle mobile sidebar
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar?.classList.toggle('mobile-open');
  }
}