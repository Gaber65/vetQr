import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../models';

/**
 * Role-based structural directive to conditionally show/hide content based on user roles
 * 
 * Usage:
 * *appRole="[UserRole.ADMIN, UserRole.SUPER_ADMIN]" - Show only if user has one of these roles
 * *appRole="UserRole.USER" - Show only if user has this exact role
 */
@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {
  @Input() appRole: UserRole | UserRole[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();

    const userRole = this.authService.getCurrentUser()?.role;
    
    if (!userRole) {
      return; // No authenticated user, don't show content
    }

    const allowedRoles = Array.isArray(this.appRole) ? this.appRole : [this.appRole];
    
    if (allowedRoles.includes(userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}