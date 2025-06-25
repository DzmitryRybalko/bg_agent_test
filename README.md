# User Directory Application

A responsive React TypeScript application for displaying and managing user data from the JSONPlaceholder API. Features a modern UI with table-like layout, modal interactions, and user management capabilities.

## 🚀 Features

- **User List Display**: Clean table-like layout showing user information
- **User Detail Modal**: Comprehensive modal with all user information and map integration
- **User Management**: Client-side user deletion functionality  
- **Responsive Design**: Mobile-first approach that works on all devices
- **Modern UI**: Professional interface with animations and visual feedback
- **TypeScript**: Fully typed codebase for better developer experience
- **Testing**: Comprehensive test suite with Vitest and React Testing Library

## 🛠 Tech Stack

- **React 18** - UI library with functional components and hooks
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped styling with modern CSS features
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **JSONPlaceholder** - External API for user data

## 📋 Requirements Met

### Core Functionality
- ✅ Table-like layout with proper columns (name/email, address, phone, website, company)
- ✅ User detail modal with all available information
- ✅ Map link integration using geo coordinates
- ✅ Client-side user deletion with confirmation
- ✅ Responsive design for different screen sizes
- ✅ Modern animations and visual feedback

### Code Quality
- ✅ TypeScript interfaces matching the provided specification
- ✅ CSS Modules for component styling
- ✅ Proper error handling and loading states
- ✅ Accessibility features (ARIA labels, keyboard navigation)
- ✅ Component testing with React Testing Library

### Development Experience
- ✅ Project rules (.cursorrules) for consistent development
- ✅ Comprehensive documentation
- ✅ Test coverage for components
- ✅ Proper TypeScript configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── UserTable/       # User table component
│   │   ├── UserTable.tsx
│   │   ├── UserTable.module.css
│   │   └── UserTable.test.tsx
│   └── UserModal/       # User modal component
│       ├── UserModal.tsx
│       └── UserModal.module.css
├── services/            # API and business logic
│   └── userService.ts   # User data service
├── types/               # TypeScript type definitions
│   └── User.ts          # User interface definitions
├── test/                # Test configuration
│   └── setup.ts         # Test setup file
├── App.tsx              # Main application component
├── App.module.css       # App-level styles
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🧪 Testing

The application includes comprehensive testing:

- **Unit Tests**: Component behavior and user interactions
- **Integration Tests**: Component interaction and data flow
- **Coverage**: Aim for >80% test coverage

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode during development
npm run test -- --watch
```

## 🎨 Design Decisions

### User Interface
- **Modern Design**: Clean, professional interface with subtle animations
- **Color Scheme**: Blue gradient background with white cards for contrast
- **Typography**: System fonts for optimal readability across platforms
- **Spacing**: Consistent spacing using a 8px grid system

### Responsive Design
- **Mobile First**: Designed for mobile devices, enhanced for desktop
- **Breakpoints**: 768px (tablet) and 1024px (desktop)
- **Flexible Layout**: CSS Grid and Flexbox for fluid layouts
- **Touch Friendly**: Adequate touch targets for mobile devices

### User Experience
- **Loading States**: Spinner animation while fetching data
- **Error Handling**: Graceful error messages with retry functionality
- **Visual Feedback**: Hover effects and transitions for interactivity
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

## 🔧 API Integration

### JSONPlaceholder API
- **Endpoint**: `https://jsonplaceholder.typicode.com/users`
- **Data Structure**: Users with nested address and company objects
- **Error Handling**: Network errors and API failures handled gracefully
- **Type Safety**: Full TypeScript typing for API responses

### Map Integration
- **Google Maps**: Links to Google Maps using geo coordinates
- **Format**: `https://www.google.com/maps?q=lat,lng`
- **Accessibility**: Descriptive link text for screen readers

## 🧩 Components

### UserTable
- Displays users in a responsive table layout
- Handles user selection and deletion
- Supports empty states
- Includes accessibility features

### UserModal
- Shows detailed user information
- Includes map link for user location
- Responsive design for mobile devices
- Proper modal semantics and keyboard navigation

### App
- Main application orchestrator
- Manages global state and API calls
- Implements error boundaries
- Provides loading and error states

## 🔍 Type Definitions

```typescript
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Geo {
  lat: string;
  lng: string;
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: Zero-config deployment for Vite apps
- **Netlify**: Drag-and-drop deployment
- **GitHub Pages**: Static site hosting
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Follow the established code style in `.cursorrules`
2. Write tests for new features
3. Ensure TypeScript strict mode compliance
4. Update documentation for significant changes
5. Test on multiple devices and browsers

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- JSONPlaceholder for providing the test API
- React team for the excellent framework
- Vite team for the fast build tool
- CSS Modules community for scoped styling solution 