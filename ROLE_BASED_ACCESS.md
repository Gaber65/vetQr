# Role-Based Access Control (RBAC) Implementation Guide

## Overview

This application implements a comprehensive role-based access control system that manages user permissions across the application, including navigation visibility, route protection, and component-level access control.

## User Roles

The application supports three user roles:

1. **SUPER_ADMIN** - Has full system access including clinic management and system settings
2. **ADMIN** - Can manage their clinic, doctors, inventory, and view reports
3. **USER** - Regular users with access to basic features (dashboard, pets, appointments)

## Features

### 1. Sidebar Navigation Filtering

The sidebar automatically shows/hides navigation items based on the user's role.

**How it works:**
- Each navigation item in `sidebar.component.ts` has a `roles` array property
- The `getFilteredNavItems()` method filters items based on the current user's role
- Sections without visible items are automatically hidden

**Example configuration:**
```typescript
navSections: { titleKey: string; items: NavItem[] }[] = [
  {
    titleKey: 'SIDEBAR.MAIN',
    items: [
      { 
        icon: 'dashboard', 
        labelKey: 'SIDEBAR.DASHBOARD', 
        route: '/dashboard', 
        roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN] 
      },
      { 
        icon: 'medical_services', 
        labelKey: 'SIDEBAR.DOCTORS', 
        route: '/doctors', 
        roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN]  // Admins only
      },
      { 
        icon: 'admin_panel_settings', 
        labelKey: 'SIDEBAR.CLINICS', 
        route: '/super-admin', 
        roles: [UserRole.SUPER_ADMIN]  // Super admin only
      }
    ]
  }
];
```

### 2. Route Protection

Routes are protected using the `RoleGuard` to prevent unauthorized access.

**Configuration in `app-routing.module.ts`:**
```typescript
{
  path: 'admin',
  loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] }
}
```

**Behavior:**
- If a user tries to access a route they don't have permission for, they're redirected to the dashboard
- Authentication is checked first, then role authorization

### 3. Component-Level Role Directive

The `*appRole` structural directive allows conditional rendering based on user roles.

**Usage Examples:**

```html
<!-- Show only to admins and super admins -->
<div *appRole="[UserRole.ADMIN, UserRole.SUPER_ADMIN]">
  <button>Admin Controls</button>
</div>

<!-- Show only to super admins -->
<div *appRole="UserRole.SUPER_ADMIN">
  <button>Create Clinic</button>
</div>

<!-- Show only to regular users -->
<div *appRole="UserRole.USER">
  <p>Your user-specific content</p>
</div>
```

**Implementation:**
The directive is available globally after importing `SharedModule`.

## Access Control by Role

### SUPER_ADMIN Role
- ✅ Dashboard
- ✅ My Pets
- ✅ Appointments
- ✅ Doctors Management
- ✅ Inventory Management
- ✅ Reports
- ✅ Clinics Management (Super Admin features)
- ✅ System Settings
- ✅ All admin routes

### ADMIN Role
- ✅ Dashboard
- ✅ My Pets
- ✅ Appointments
- ✅ Doctors Management
- ✅ Inventory Management
- ✅ Reports
- ❌ Clinics Management (Super Admin only)
- ❌ System Settings (Super Admin only)

### USER Role
- ✅ Dashboard
- ✅ My Pets
- ✅ Appointments
- ❌ Doctors Management (Admin only)
- ❌ Inventory Management (Admin only)
- ❌ Reports (Admin only)
- ❌ Clinics Management (Super Admin only)
- ❌ System Settings (Super Admin only)

## Implementation Details

### Sidebar Component

**Key Methods:**

1. **`getFilteredNavItems(items: NavItem[]): NavItem[]`**
   - Filters navigation items based on current user role
   - Returns only items that the user has permission to see

2. **`shouldShowSection(items: NavItem[]): boolean`**
   - Determines if a navigation section should be visible
   - Returns true if the section has at least one visible item

3. **`ngOnInit()`**
   - Retrieves the current user's role from AuthService
   - Stores it in `currentUserRole` property

### Role Guard

The `RoleGuard` implements `CanActivate` interface and:
- Checks if user is authenticated
- Verifies if user has required roles
- Redirects unauthorized users to dashboard
- Protects both lazy-loaded and direct routes

### Auth Service Role Methods

1. **`hasRole(roles: UserRole[]): boolean`**
   - Checks if current user has any of the specified roles
   - Used by RoleGuard and other components

2. **`getCurrentUser(): User | null`**
   - Returns the current authenticated user object
   - Includes role property

3. **`getUserRoleFromToken(): UserRole | null`**
   - Extracts role from JWT token
   - Handles multiple role claim formats

## Best Practices

### Adding New Navigation Items

When adding new navigation items, always specify the allowed roles:

```typescript
{
  icon: 'new_feature',
  labelKey: 'SIDEBAR.NEW_FEATURE',
  route: '/new-feature',
  roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN]  // Specify allowed roles
}
```

### Protecting New Routes

Always use both `AuthGuard` and `RoleGuard` for protected routes:

```typescript
{
  path: 'new-route',
  component: NewRouteComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] }
}
```

### Conditional Rendering in Templates

Use the `*appRole` directive for UI elements that need role-based visibility:

```html
<!-- For multiple roles -->
<button *appRole="[UserRole.ADMIN, UserRole.SUPER_ADMIN]" 
        (click)="adminAction()">
  Admin Action
</button>

<!-- For single role -->
<div *appRole="UserRole.SUPER_ADMIN">
  Super Admin Controls
</div>
```

## Testing Role-Based Access

### Test Users

The application includes mock users for testing:

1. **Super Admin:**
   - Email: `superadmin@vetclinic.com`
   - Username: `superadmin`
   - Role: `SUPER_ADMIN`

2. **Admin:**
   - Email: `admin@vetclinic.com`
   - Username: `admin`
   - Role: `ADMIN`

3. **Regular User:**
   - Email: `user@vetclinic.com`
   - Username: `user`
   - Role: `USER`

### Testing Checklist

- [ ] Login as each role and verify sidebar shows correct navigation
- [ ] Try to access protected routes directly via URL (should redirect)
- [ ] Verify role-based directives hide/show elements correctly
- [ ] Test logout and login with different roles
- [ ] Check that unauthorized users cannot access admin features

## Troubleshooting

### Sidebar Shows All Items

**Problem:** Navigation items appear regardless of user role.

**Solution:**
1. Check that `currentUserRole` is being set in `ngOnInit()`
2. Verify `getFilteredNavItems()` is called in the template
3. Ensure `roles` array is properly defined in navigation items

### Routes Not Protected

**Problem:** Users can access restricted routes.

**Solution:**
1. Verify `RoleGuard` is applied to the route
2. Check that `data.roles` includes the correct roles
3. Ensure `AuthGuard` is also applied
4. Confirm user is properly authenticated

### Directive Not Working

**Problem:** `*appRole` directive doesn't hide elements.

**Solution:**
1. Ensure `SharedModule` is imported in your feature module
2. Verify `RoleDirective` is exported from `SharedModule`
3. Check that `AuthService.getCurrentUser()` returns a valid user

## Security Considerations

### Frontend vs Backend

⚠️ **Important:** This is frontend-only access control. Always implement backend authorization as well to prevent unauthorized API access.

### Best Practices:

1. **Never rely solely on frontend controls**
2. **Validate roles on every API request**
3. **Use JWT tokens with role claims**
4. **Implement role checks in backend controllers**
5. **Regular security audits of access controls**

## Future Enhancements

Potential improvements to consider:

1. **Role Hierarchy:** Implement role inheritance (SUPER_ADMIN inherits ADMIN permissions)
2. **Permission System:** Fine-grained permissions beyond roles
3. **Dynamic Roles:** Fetch roles from backend instead of hardcoded
4. **Role Management UI:** Interface for administrators to manage user roles
5. **Audit Logging:** Track role changes and access attempts
6. **Multi-Tenancy:** Role-based access per clinic/organization

## Support

For issues or questions about role-based access control:
- Review the AuthService for authentication logic
- Check RoleGuard for route protection implementation
- Examine SidebarComponent for navigation filtering
- Consult app-routing.module.ts for route configurations

---

**Last Updated:** 2024
**Version:** 1.0.0