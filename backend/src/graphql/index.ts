
// =======================
// 10. ENVIRONMENT VARIABLES (.env)
// =======================
/*
# Database
DATABASE_URL="mysql://username:password@localhost:3306/auth_app"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-make-it-long-and-random-at-least-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret-key-different-from-jwt-secret
JWT_REFRESH_EXPIRES_IN=30d

# Server Configuration
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
*/

// =======================
// 11. SETUP COMMANDS
// =======================
/*
# 1. Install dependencies
npm install

# 2. Initialize Prisma (if not done)
npx prisma init

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to database (for development)
npm run db:push

# 5. Or run migrations (for production)
npm run db:migrate

# 6. Start development server
npm run dev

# 7. Open Prisma Studio (optional)
npm run db:studio
*/

// =======================
// 12. EXAMPLE GRAPHQL OPERATIONS
// =======================
/*
# Register a new user
mutation Register {
  register(input: {
    username: "johndoe"
    email: "john@example.com"
    password: "password123"
  }) {
    accessToken
    refreshToken
    user {
      id
      username
      email
      role
      createdAt
    }
  }
}

# Login
mutation Login {
  login(input: {
    email: "john@example.com"
    password: "password123"
  }) {
    accessToken
    refreshToken
    user {
      id
      username
      email
      role
    }
  }
}

# Get current user
query Me {
  me {
    id
    username
    email
    role
    createdAt
    updatedAt
  }
}

# Refresh access token
mutation RefreshToken {
  refreshToken(refreshToken: "your-refresh-token-here") {
    accessToken
    user {
      id
      username
      email
    }
  }
}

# Update profile
mutation UpdateProfile {
  updateProfile(input: {
    username: "johnsmith"
    email: "johnsmith@example.com"
  }) {
    id
    username
    email
    updatedAt
  }
}

# Change password
mutation ChangePassword {
  changePassword(input: {
    currentPassword: "oldpassword"
    newPassword: "newpassword123"
  }) {
    id
    updatedAt
  }
}

# Admin: Get all users
query Users {
  users {
    id
    username
    email
    role
    createdAt
  }
}

# Admin: Search users
query SearchUsers {
  searchUsers(searchTerm: "john") {
    id
    username
    email
    role
  }
}

# Admin: Update user role
mutation UpdateUserRole {
  updateUserRole(id: "1", role: ADMIN) {
    id
    username
    role
  }
}

# Admin: Get user stats
query UserStats {
  userStats {
    totalUsers
    totalAdmins
    totalRegularUsers
  }
}
*/