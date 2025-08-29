'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Maximize, TrendingUp, Calendar, FileText,
  AlertTriangle, CheckCircle, Clock, Users, Download, Share2,
  Heart, Building2, Train, ShieldCheck, BarChart3, Calculator,
  TreePine, Droplets, Zap, Car, School, ShoppingBag
} from 'lucide-react';

// Mock property data - replace with API call
const mockProperty = {
  id: '1',
  title: 'Prime Development Land - Birmingham Eastside',
  price: 450000,
  size: 2.5,
  location: 'Birmingham Eastside, B9',
  postcode: 'B9 4AA',
  coordinates: { lat: 52.4862, lng: -1.8904 },
  description: 'Exceptional development opportunity in Birmingham\'s fastest-growing district. This 2.5-acre plot benefits from proximity to HS2 Curzon Street Station (0.8 miles) and sits within the Eastside regeneration zone.',
  
  // Planning Intelligence
  planningScore: 82,
  planningStatus: 'Pre-application discussions',
  planningHistory: [
    { date: '2023-11', status: 'Similar plot approved for 45 units', success: true },
    { date: '2023-08', status: 'Adjacent site granted commercial permission', success: true },
    { date: '2023-05', status: 'Area designated for mixed-use development', success: true }
  ],
  
  // Investment Metrics
  roi: { min: 2.8, max: 3.5, expected: 3.2 },
  investmentGrade: 'A',
  developmentPotential: '45-50 residential units or 15,000 sq ft commercial',
  estimatedBuildCost: 3200000,
  estimatedGDV: 5400000,
  
  // Risk Assessment
  risks: {
    flood: { level: 'low', score: 10 },
    contamination: { level: 'medium', score: 45 },
    access: { level: 'low', score: 15 },
    planning: { level: 'low', score: 18 },
    market: { level: 'low', score: 12 },
    infrastructure: { level: 'low', score: 8 }
  },
  
  // Infrastructure
  hs2Impact: true,
  nearbyInfrastructure: [
    { type: 'train', name: 'HS2 Curzon Street', distance: '0.8 miles', impact: 'high' },
    { type: 'road', name: 'A38(M) Aston Expressway', distance: '0.3 miles', impact: 'medium' },
    { type: 'metro', name: 'Eastside Metro Extension', distance: '0.2 miles', impact: 'high' }
  ],
  
  // Amenities
  amenities: {
    schools: 4,
    shops: 12,
    parks: 3,
    transport: 8
  },
  
  // Market Data
  comparables: [
    { address: '2.3 acres, Digbeth', price: 425000, date: '2024-01', pricePerAcre: 184783 },
    { address: '3.1 acres, Aston', price: 520000, date: '2023-11', pricePerAcre: 167742 },
    { address: '1.8 acres, Duddeston', price: 310000, date: '2023-10', pricePerAcre: 172222 }
  ],
  
  images: [
    '/api/placeholder/800/400',
    '/api/placeholder/800/400',
    '/api/placeholder/800/400'
  ],
  
  documents: [
    { name: 'Title Plan', size: '2.4 MB', type: 'PDF' },
    { name: 'Environmental Report', size: '8.1 MB', type: 'PDF' },
    { name: 'Planning Pre-app Response', size: '1.2 MB', type: 'PDF' },
    { name: 'Flood Risk Assessment', size: '3.5 MB', type: 'PDF' }
  ],
  
  viewers: 234,
  savedBy: 47,
  inquiries: 12
};

export default function PropertyDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const property = mockProperty; // In production, fetch based on params.id
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'planning', label: 'Planning Intelligence' },
    { id: 'investment', label: 'Investment Analysis' },
    { id: 'risks', label: 'Risk Assessment' },
    { id: 'location', label: 'Location & Infrastructure' },
    { id: 'documents', label: 'Documents' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/properties" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">{property.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-lg transition-colors ${
                  isSaved ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      className="w-2 h-2 bg-white rounded-full opacity-70 hover:opacity-100"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl">
              <div className="border-b">
                <div className="flex gap-1 p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-50 rounded-lg">
                            <Maximize className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Plot Size</p>
                            <p className="font-semibold">{property.size} acres</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-50 rounded-lg">
                            <Building2 className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Development Potential</p>
                            <p className="font-semibold">45-50 units</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Train className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">HS2 Distance</p>
                            <p className="font-semibold">0.8 miles</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-50 rounded-lg">
                            <Users className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Interest Level</p>
                            <p className="font-semibold">{property.viewers} viewers</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Development Opportunity</h3>
                      <p className="text-gray-600">{property.developmentPotential}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'planning' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Planning Success Probability</h3>
                        <span className="text-3xl font-bold text-emerald-600">{property.planningScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full"
                          style={{ width: `${property.planningScore}%` }}
                        />
                      </div>
                      <p className="mt-3 text-sm text-gray-600">
                        Based on analysis of 147 similar applications in Birmingham over the past 24 months
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Planning History</h3>
                      <div className="space-y-3">
                        {property.planningHistory.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            {item.success ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium">{item.status}</p>
                              <p className="text-sm text-gray-500">{item.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Current Status</h3>
                      <p className="text-gray-600">{property.planningStatus}</p>
                    </div>
                  </div>
                )}

                {/* Add more tab content here */}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-1">Asking Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  £{property.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  £{Math.round(property.price / property.size).toLocaleString()} per acre
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Investment Grade</span>
                  <span className="font-semibold text-emerald-600">{property.investmentGrade}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Expected ROI</span>
                  <span className="font-semibold">{property.roi.expected}x in 24mo</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Planning Score</span>
                  <span className="font-semibold">{property.planningScore}%</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold"
                >
                  Make an Enquiry
                </button>
                <button className="w-full py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 font-semibold">
                  Schedule Viewing
                </button>
                <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold flex items-center justify-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calculate Returns
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{property.viewers} people viewed</span>
                  <span>{property.savedBy} saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}