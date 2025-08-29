'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2, TrendingUp, Heart, Bell, Search, Calculator,
  FileText, Users, MapPin, Calendar, ChevronRight, Plus,
  BarChart3, PieChart, ArrowUpRight, ArrowDownRight,
  Shield, AlertCircle, Clock, Star, Download, Settings
} from 'lucide-react';

// Mock user data
const mockUser = {
  name: 'John Smith',
  email: 'john@example.com',
  role: 'INDIVIDUAL',
  subscription: 'PROFESSIONAL',
  portfolio: {
    totalValue: 2400000,
    totalProperties: 4,
    totalReturn: 24.3,
    monthlyChange: 2.8
  }
};

// Mock portfolio properties
const mockPortfolio = [
  {
    id: '1',
    title: 'Birmingham Eastside Plot',
    purchasePrice: 450000,
    currentValue: 520000,
    purchaseDate: '2023-06-15',
    size: 2.5,
    status: 'Pre-application',
    returnPercent: 15.6,
    planningProgress: 60
  },
  {
    id: '2',
    title: 'Digbeth Commercial Site',
    purchasePrice: 380000,
    currentValue: 425000,
    purchaseDate: '2023-09-20',
    size: 1.8,
    status: 'Planning submitted',
    returnPercent: 11.8,
    planningProgress: 35
  }
];

// Mock saved searches
const mockSavedSearches = [
  {
    id: '1',
    name: 'HS2 Corridor Opportunities',
    criteria: 'Within 1 mile of HS2, Under £500k',
    newMatches: 3,
    lastChecked: '2 hours ago'
  },
  {
    id: '2',
    name: 'Large Development Sites',
    criteria: 'Over 5 acres, Planning potential',
    newMatches: 1,
    lastChecked: '1 day ago'
  }
];

// Mock market insights
const mockInsights = [
  {
    title: 'Birmingham Land Values Up 3.2%',
    description: 'Average land prices in Birmingham increased by 3.2% this month',
    type: 'positive',
    date: '2 days ago'
  },
  {
    title: 'New Planning Policy Update',
    description: 'Birmingham Council announces relaxed planning for brownfield sites',
    type: 'neutral',
    date: '1 week ago'
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'portfolio', label: 'My Portfolio', icon: Building2 },
    { id: 'saved', label: 'Saved Properties', icon: Heart },
    { id: 'searches', label: 'Search Alerts', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {mockUser.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/properties"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Find Properties
              </Link>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subscription Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Plan</p>
              <p className="text-lg font-semibold text-gray-900">Professional (£199/month)</p>
            </div>
            <Link href="/subscription" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Upgrade to Enterprise →
            </Link>
          </div>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Building2 className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +{mockUser.portfolio.monthlyChange}%
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              £{(mockUser.portfolio.totalValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-gray-500 mt-1">Portfolio Value</p>
          </div>

          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-xs text-green-600 font-medium">YTD</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              +{mockUser.portfolio.totalReturn}%
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Return</p>
          </div>

          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {mockUser.portfolio.totalProperties}
            </p>
            <p className="text-sm text-gray-500 mt-1">Active Properties</p>
          </div>

          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">A</p>
            <p className="text-sm text-gray-500 mt-1">Average Grade</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl mb-6">
          <div className="border-b">
            <div className="flex gap-1 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Portfolio Performance</h2>
              <div className="space-y-4">
                {mockPortfolio.map((property) => (
                  <div key={property.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{property.title}</h3>
                        <p className="text-sm text-gray-500">{property.size} acres • {property.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">
                          +{property.returnPercent}%
                        </p>
                        <p className="text-sm text-gray-500">
                          £{((property.currentValue - property.purchasePrice) / 1000).toFixed(0)}k gain
                        </p>
                      </div>
                    </div>
                    
                    {/* Planning Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Planning Progress</span>
                        <span className="font-medium">{property.planningProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${property.planningProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-sm text-gray-500">
                        Purchased {property.purchaseDate}
                      </span>
                      <Link
                        href={`/properties/${property.id}`}
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 font-medium">
                View Full Portfolio
              </button>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Market Insights</h2>
              <div className="space-y-4">
                {mockInsights.map((insight, index) => (
                  <div key={index} className="pb-4 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-lg ${
                        insight.type === 'positive' ? 'bg-green-50' : 'bg-gray-50'
                      }`}>
                        {insight.type === 'positive' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
                        <p className="text-xs text-gray-400 mt-2">{insight.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link
                href="/insights"
                className="mt-4 block text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View All Insights →
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'searches' && (
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Saved Searches</h2>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Search
              </button>
            </div>

            <div className="space-y-4">
              {mockSavedSearches.map((search) => (
                <div key={search.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{search.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{search.criteria}</p>
                    </div>
                    <div className="text-right">
                      {search.newMatches > 0 && (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                          {search.newMatches} new
                        </span>
                      )}
                      <p className="text-xs text-gray-400 mt-2">Checked {search.lastChecked}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      View Results
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-sm text-gray-600 hover:text-gray-700">
                      Edit Alert
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-sm text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}