export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500';

export class AuthAPI {
  static async checkAuthStatus(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/status`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error checking auth status:', error);
      return {
        success: false,
        message: 'Failed to check authentication status',
        error: 'Network error',
      };
    }
  }

  static async logout(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error during logout:', error);
      return {
        success: false,
        message: 'Failed to logout',
        error: 'Network error',
      };
    }
  }

  static async getUserProfile(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        success: false,
        message: 'Failed to fetch user profile',
        error: 'Network error',
      };
    }
  }

  static getGoogleAuthUrl(): string {
    return `${API_BASE_URL}/auth/google`;
  }
}
