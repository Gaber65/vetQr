import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 74px);
      background-color: #f9fafb;
    }
  `]

})
export class AppComponent implements OnInit {
  title = 'vet-clinic-app';

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(savedLang);
    
    // Set text direction based on language
    this.setDirection(savedLang);

    // Subscribe to language changes
    this.translate.onLangChange.subscribe((event) => {
      this.setDirection(event.lang);
    });
  }

  ngOnInit(): void {
    // Check if user is authenticated on app load
    // If token exists and is not expired, redirect to dashboard
    if (this.authService.isAuthenticated() && this.router.url === '/auth/login') {
      this.router.navigate(['/dashboard']);
    }
  }

  private setDirection(lang: string): void {
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
}
