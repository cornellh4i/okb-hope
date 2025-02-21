import Cookies from 'js-cookie';

const AUTH_COOKIE_NAME = 'auth_token';
const CLIENT_ID = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URI as string;

export interface AuthToken {
  access_token: string;
}

export class AuthService {

  // Generate the authorization URL for initial redirect
  static getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: CLIENT_ID!,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
    });

    return `https://auth.calendly.com/oauth/authorize?${params.toString()}`;
  }

  static async exchangeCodeForToken(code: string): Promise<AuthToken> {
    const response = await fetch('/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to exchange code for token');
    }

    return response.json();
  }

  static storeAuthToken(token: AuthToken) {
    Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(token), {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  }

  static getAuthToken(): AuthToken | null {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    return token ? JSON.parse(token) : null;
  }

  static async getEvent(eventURI: string, token: string): Promise<any> {

    const response = await fetch('/api/calendly/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventURI, token }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }
}