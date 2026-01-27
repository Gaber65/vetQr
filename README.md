# VetClinic - Pet Healthcare Management System

A modern, full-featured veterinary clinic management system built with Angular, Angular Material, and Bootstrap.

## 🎯 Features

- **Role-Based Access Control**: Three user roles with different permissions
  - **Super Admin**: System-wide management, can manage all clinics
  - **Admin**: Clinic-level management, manage doctors and patients
  - **User**: Pet owners who can view their pet's health records

- **Authentication & Security**
  - JWT-based authentication
  - Protected routes with guards
  - Role-based authorization
  - Session management (remember me functionality)

- **Modern UI/UX**
  - Stunning glassmorphism design
  - Smooth animations and transitions
  - Fully responsive layout
  - Custom Material Design theme
  - Bootstrap integration

- **Lazy Loading**
  - All feature modules are lazy-loaded for optimal performance
  - Fast initial load time

- **Internationalization (i18n)**
  - English and Arabic language support
  - RTL layout for Arabic

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

### Installation

1. Navigate to the project directory:

```bash
cd vet-clinic-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## 🔐 Demo Credentials

### Super Admin

- **Username**: `superadmin`
- **Email**: `superadmin@vetclinic.com`
- **Password**: `password123`

### Admin

- **Username**: `admin`
- **Email**: `admin@vetclinic.com`
- **Password**: `password123`

### User (Pet Owner)

- **Username**: `user`
- **Email**: `user@vetclinic.com`
- **Password**: `password123`

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                 # Singleton services, guards, interceptors
│   │   ├── guards/           # Auth & Role guards
│   │   ├── interceptors/     # JWT & Error interceptors
│   │   └── services/         # AuthService
│   ├── shared/               # Reusable components, pipes, models
│   │   └── models/           # TypeScript interfaces & enums
│   ├── features/             # Feature modules (lazy-loaded)
│   │   ├── auth/             # Authentication (Login)
│   │   ├── dashboard/        # Main dashboard
│   │   ├── super-admin/      # Super admin module
│   │   ├── admin/            # Admin module
│   │   └── user/             # User module
│   ├── app-routing.module.ts # Main routing configuration
│   └── app.module.ts         # Root module
├── assets/                   # Static assets
│   └── i18n/                 # Translation files
│       ├── en.json           # English translations
│       └── ar.json           # Arabic translations
├── environments/             # Environment configurations
└── styles.scss               # Global styles
```

## 🎨 Design Features

- **Gradient backgrounds** with animated paw prints
- **Glassmorphism effects** on cards and modals
- **Custom form controls** with smooth transitions
- **Responsive grid layouts** that adapt to all screen sizes
- **Hover animations** and micro-interactions
- **Custom scrollbars** for better aesthetics

## 🛠️ Technologies Used

- **Angular 17** - Modern web framework
- **Angular Material** - UI component library
- **Bootstrap 5** - CSS framework
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Enhanced CSS with variables and mixins

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- JWT token-based authentication
- HTTP interceptors for automatic token attachment
- Protected routes with guards
- Role-based access control
- Secure session management

## 📚 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## 🌐 Multi-language Support

The application supports:

- **English** (LTR)
- **Arabic** (RTL)

Translation files are located in `src/assets/i18n/`

## 👥 User Roles & Permissions

### Super Admin

- Manage all clinics in the system
- View and manage all users across clinics
- Configure system-wide settings
- Access all features

### Admin

- Manage clinic operations
- Add/edit/remove doctors and staff
- View all pet records in their clinic
- Manage appointments and schedules
- Access clinic-specific reports

### User (Pet Owner)

- View their pet's health records
- Track vaccination schedules
- Book appointments
- View medical history

## 🎯 Future Enhancements

- Real-time notifications
- Advanced reporting and analytics
- Payment integration
- Appointment booking system
- Medical records management
- Prescription management
- Inventory tracking
- Multi-clinic support for admins

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Author

Built with ❤️ using Angular and modern web technologies

---

**Note**: This is a demo application with mock authentication. In production, you would integrate with a real backend API.
