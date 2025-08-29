import { User } from '@/types';

// Mock user for development
const mockUser: User = {
  id: '1',
  email: 'investor@landvest.co.uk',
  name: 'Sarah Chen',
  role: 'investor',
  subscriptionTier: 'professional',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
  profile: {
    id: '1',
    userId: '1',
    company: 'Birmingham Property Investments',
    phone: '+44 7700 900123',
    location: 'Birmingham',
    investmentBudget: 2500000,
    investmentGoals: ['capital-growth', 'development', 'rental-income'],
    areasOfInterest: ['Digbeth', 'Jewellery Quarter', 'Eastside'],
    verified: true,
    bio: 'Property developer focusing on Birmingham regeneration areas'
  }
};

export class AuthService {
  static async getCurrentUser(): Promise<User | null> {
    // Check if user is logged in (mock for now)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        return mockUser;
      }
    }
    return null;
  }
  
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const token = 'mock_jwt_token_' + Date.now();
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
    
    return { user: mockUser, token };
  }
  
  static async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
  
  static async register(data: {
    email: string;
    password: string;
    name: string;
    role: string;
  }): Promise<{ user: User; token: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role as User['role'],
      subscriptionTier: 'free',
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: Date.now().toString(),
        userId: Date.now().toString(),
        location: 'Birmingham',
        verified: false
      }
    };
    
    const token = 'mock_jwt_token_' + Date.now();
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
    
    return { user: newUser, token };
  }
  
  static isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }
  
  static hasPermission(user: User | null, permission: string): boolean {
    if (!user) return false;
    
    const permissions = {
      admin: ['all'],
      developer: ['create', 'edit', 'delete', 'view'],
      agent: ['create', 'edit', 'view'],
      investor: ['view', 'save', 'contact']
    };
    
    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes('all') || userPermissions.includes(permission);
  }
  
  static getSubscriptionFeatures(tier: User['subscriptionTier']) {
    const features = {
      free: {
        searches: 3,
        planningReports: 1,
        savedProperties: 10,
        emailAlerts: false,
        apiAccess: false
      },
      starter: {
        searches: 15,
        planningReports: 5,
        savedProperties: 50,
        emailAlerts: true,
        apiAccess: false
      },
      professional: {
        searches: 'unlimited',
        planningReports: 'unlimited',
        savedProperties: 'unlimited',
        emailAlerts: true,
        apiAccess: true
      },
      enterprise: {
        searches: 'unlimited',
        planningReports: 'unlimited',
        savedProperties: 'unlimited',
        emailAlerts: true,
        apiAccess: true,
        whiteLabel: true,
        dedicatedSupport: true
      }
    };
    
    return features[tier];
  }
}
