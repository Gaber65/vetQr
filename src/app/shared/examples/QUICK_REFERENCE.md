# Role-Based Access Control - Quick Reference Guide

## 🚀 Quick Start

### 1. Add Role-Based Navigation Item

```typescript
// In sidebar.component.ts
{
  icon: 'new_icon',
  labelKey: 'SIDEBAR.NEW_ITEM',
  route: '/new-route',
  roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] // Add allowed roles
}
```

### 2. Protect a Route

```typescript
// In app-routing.module.ts
{
  path: 'protected-route',
  component: ProtectedComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] }
}
```

### 3. Show/Hide Elements in Templates

```html
<!-- Single role -->
<div *appRole="UserRole.SUPER_ADMIN">
  Super Admin content
</div>

<!-- Multiple roles -->
<div *appRole="[UserRole.ADMIN, UserRole.SUPER_ADMIN]">
  Admin content
</div>
```

## 📋 Available Roles

```typescript
enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',  // Full system access
  ADMIN = 'ADMIN',               // Clinic management
  USER = 'USER'                  // Basic user access
}
```

## 🎯 Common Use Cases

### Hide Admin Controls from Users

```html
<button *appRole="[UserRole.ADMIN, UserRole.SUPER_ADMIN]" 
        (click)="deleteItem()">
  Delete
</button>
```

### Show Super Admin Features

```html
<div *appRole="UserRole.SUPER_ADMIN">
  <app-super-admin-panel></app-super-admin-panel>
</div>
```

### Conditional Logic in Components

```typescript
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../models';

constructor(private authService: AuthService) {}

canPerformAction(): boolean {
  return this.authService.hasRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]);
}
```

## 🔧 Useful Methods

### AuthService Methods

```typescript
// Get current user
const user = this.authService.getCurrentUser();

// Check if user has specific role(s)
const hasAccess = this.authService.hasRole([UserRole.ADMIN]);

// Get user role from token
const role = this.authService.getUserRoleFromToken();

// Check if authenticated
const isLoggedIn = this.authService.isAuthenticated();
```

### Sidebar Methods

```typescript
// Filter nav items by role
const filteredItems = this.getFilteredNavItems(items);

// Check if section should be visible
const isVisible = this.shouldShowSection(items);
```

## 📝 Role Hierarchy

```
SUPER_ADMIN (Top level)
  ├── Can access everything
  ├── Clinic management
  └── System settings

ADMIN (Middle level)
  ├── Can access clinic features
  ├── User management
  ├── Inventory
  └── Reports

USER (Base level)
  ├── Dashboard
  ├── My pets
  └── Appointments
```

## ⚠️ Important Notes

1. **Always specify roles** for navigation items to ensure proper filtering
2. **Use both guards** (AuthGuard + RoleGuard) for protected routes
3. **Backend validation** is essential - frontend controls are not sufficient
4. **Test with different roles** to verify access controls work correctly

## 🧪 Testing Checklist

- [ ] Login as SUPER_ADMIN - verify full access
- [ ] Login as ADMIN - verify clinic management access
- [ ] Login as USER - verify basic access only
- [ ] Try accessing protected routes directly - should redirect
- [ ] Verify sidebar filters correctly for each role
- [ ] Check role directives show/hide elements properly

## 🐛 Troubleshooting

### Problem: Sidebar shows all items
**Solution:** Ensure `roles` array is defined in navigation items

### Problem: Can access protected routes
**Solution:** Verify RoleGuard is applied and data.roles is set correctly

### Problem: Directive not hiding elements
**Solution:** Check that SharedModule is imported in your feature module

## 📚 Additional Resources

- Full documentation: `ROLE_BASED_ACCESS.md`
- Example component: `src/app/shared/examples/role-usage-examples.component.ts`
- Role directive: `src/app/shared/directive/role.directive.ts`
- Sidebar component: `src/app/shared/components/sidebar/sidebar.component.ts`

---

**Need help?** Check the comprehensive `ROLE_BASED_ACCESS.md` for detailed documentation.