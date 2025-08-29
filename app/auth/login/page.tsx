'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/lib/auth-service';
import { isValidEmail } from '@/lib/utils';
import { 
  Lock, Mail, Eye, EyeOff, ArrowRight, 
  Building2, TrendingUp, Shield, Sparkles 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const { user, token } = await AuthService.login(email, password);
      router.push('/dashboard');
    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('investor@landvest.co.uk');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-3xl font-black text-white">
              Land<span className="gradient-text">Vest</span>
            </h1>
          </Link>
          
          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400">Sign in to access your land investment dashboard</p>
          </div>
          
          {/* Demo Account Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-400/10 to-amber-600/10 rounded-lg border border-yellow-400/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <p className="text-sm font-bold text-yellow-400">Demo Account Available</p>
            </div>
            <p className="text-xs text-gray-300 mb-2">Try LandVest with a demo account</p>
            <button
              onClick={handleDemoLogin}
              className="text-xs text-yellow-400 hover:text-yellow-300 underline"
            >
              Use demo credentials
            </button>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{errors.general}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  } rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${
                    errors.password ? 'border-red-500' : 'border-white/20'
                  } rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">{errors.password}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-yellow-400" />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-yellow-400 hover:text-yellow-300">
                Forgot password?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-premium py-3 rounded-lg font-bold text-black flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-yellow-400 hover:text-yellow-300 font-medium">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Side - Feature Showcase */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-600/20 blur-3xl"></div>
        
        <div className="relative max-w-lg">
          <h3 className="text-4xl font-bold text-white mb-6">
            Start Your Land Investment Journey
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Join 1,247 Birmingham investors already using LandVest to find profitable opportunities
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">26.4% Average Returns</h4>
                <p className="text-sm text-gray-400">Birmingham's fastest growing investment market</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">347 Active Listings</h4>
                <p className="text-sm text-gray-400">Exclusive Birmingham land opportunities</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">FCA Regulated</h4>
                <p className="text-sm text-gray-400">Secure, compliant investment platform</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 glass rounded-xl">
            <p className="text-gray-300 italic">
              "Found my perfect plot in Digbeth within 2 weeks. The planning intelligence saved me months of research."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-black">SC</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Sarah Chen</p>
                <p className="text-xs text-gray-400">Property Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
