# Authentication Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# Add your backend API URL when ready
# API_BASE_URL=http://localhost:8000/api
```

## Mock Users for Testing

The system comes with mock users for testing:

- **Email**: `sam@example.com` / **Password**: `password123` / **Role**: `recruiter`
- **Email**: `admin@example.com` / **Password**: `admin123` / **Role**: `admin`

## Features Implemented

✅ **NextAuth.js Setup** - Complete authentication system
✅ **Middleware Guards** - Route protection for authenticated areas
✅ **Mock API Calls** - Simulated authentication without backend
✅ **Form Validation** - Client-side validation for login/register
✅ **Session Management** - Persistent authentication state
✅ **Route Protection** - Automatic redirects based on auth status
✅ **Logout Functionality** - Complete session termination

## How It Works

1. **Public Routes**: `/`, `/auth/login`, `/auth/register`
2. **Protected Routes**: `/recruiter`, `/candidate`, `/rtr`
3. **Authentication Flow**: Login → Dashboard → Protected Routes
4. **Middleware**: Automatically redirects unauthenticated users to login

## Testing the System

1. Start your development server: `pnpm dev`
2. Visit `http://localhost:3000` - should redirect to login if not authenticated
3. Use mock credentials to log in
4. Navigate to protected routes - should work when authenticated
5. Try accessing auth pages when logged in - should redirect to dashboard
6. Test logout functionality

## Next Steps for Production

1. Replace mock users with real database
2. Implement proper password hashing
3. Add email verification
4. Set up proper session management
5. Add rate limiting
6. Implement refresh tokens
7. Add 2FA support

## File Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API endpoints
│   ├── auth/                            # Authentication pages
│   └── ...                              # Protected routes
├── components/
│   ├── dashboard/                       # Dashboard components
│   └── providers/                       # Context providers
├── hooks/
│   └── use-auth.tsx                    # Authentication hook
├── lib/
│   └── auth.ts                         # NextAuth configuration
├── middleware.ts                        # Route protection
└── types/
    └── next-auth.d.ts                  # TypeScript extensions
```
