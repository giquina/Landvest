import { NextRequest, NextResponse } from 'next/server';

// Mock authentication - replace with real auth logic
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock authentication check
    // In production, verify against database
    if (email === 'demo@landvest.uk' && password === 'demo123') {
      // Create mock session token
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      const response = NextResponse.json(
        {
          success: true,
          user: {
            id: '1',
            email: email,
            name: 'Demo User',
            role: 'INDIVIDUAL',
            subscription: 'PROFESSIONAL'
          },
          token: token
        },
        { status: 200 }
      );

      // Set auth cookie
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}