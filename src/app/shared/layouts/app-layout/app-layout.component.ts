// app-layout.component.ts
import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  sidebarWidth = 260;
  isMobile = false;
  isMobileSidebarOpen = false;
  isSidebarCollapsed = false;

  private readonly MOBILE_BREAKPOINT = 768;
  private readonly SIDEBAR_WIDTH_EXPANDED = 260;
  private readonly SIDEBAR_WIDTH_COLLAPSED = 80;

  constructor(private router: Router) {
    this.setupRouterEvents();
  }

  ngOnInit() {
    this.checkScreen();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreen();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (this.isMobile && this.isMobileSidebarOpen) {
      this.closeMobileSidebar();
    }
  }

  private setupRouterEvents() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile) {
          this.closeMobileSidebar();
        }
      });
  }

  checkScreen() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
    
    if (this.isMobile) {
      this.sidebarWidth = 0;
      if (!wasMobile && this.isMobile) {
        // Just switched to mobile, close sidebar
        this.closeMobileSidebar();
      }
    } else {
      this.sidebarWidth = this.isSidebarCollapsed ? 
        this.SIDEBAR_WIDTH_COLLAPSED : 
        this.SIDEBAR_WIDTH_EXPANDED;
      this.isMobileSidebarOpen = false;
    }
  }

  onSidebarStateChange(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
    if (!this.isMobile) {
      this.sidebarWidth = isCollapsed ? 
        this.SIDEBAR_WIDTH_COLLAPSED : 
        this.SIDEBAR_WIDTH_EXPANDED;
    }
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    this.toggleBodyScroll(!this.isMobileSidebarOpen);
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
    this.toggleBodyScroll(true);
  }

  private toggleBodyScroll(enable: boolean) {
    if (this.isMobile) {
      document.body.style.overflow = enable ? '' : 'hidden';
    }
  }
}