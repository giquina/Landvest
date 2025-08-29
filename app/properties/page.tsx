'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search, Filter, MapPin, TrendingUp, Building2, Train,
  ChevronDown, Grid, Map, AlertCircle, Star, Heart,
  ArrowUpRight, Calendar, Users, Shield
} from 'lucide-react';

// Mock properties data
const mockProperties = [
  {
    id: '1',
    title: 'Prime Development Land - Birmingham Eastside',
    price: 450000,
    size: 2.5,
    location: 'Birmingham Eastside',
    postcode: 'B9 4AA',
    planningScore: 82,
    roi: 3.2,
    investmentGrade: 'A',
    image: '/api/placeholder/400/300',
    featured: true,
    hs2Impact: true,
    viewers: 234
  },
  {
    id: '2',
    title: 'Commercial Plot - Digbeth Creative Quarter',
    price: 380000,
    size: 1.8,
    location: 'Digbeth',
    postcode: 'B5 6DY',
    planningScore: 75,
    roi: 2.8,
    investmentGrade: 'B',
    image: '/api/placeholder/400/300',
    featured: false,
    hs2Impact: true,
    viewers: 189
  },
  {
    id: '3',
    title: 'Residential Development Site - Jewellery Quarter',
    price: 620000,
    size: 3.2,
    location: 'Jewellery Quarter',
    postcode: 'B18 6HA',
    planningScore: 88,
    roi: 3.5,
    investmentGrade: 'A',
    image: '/api/placeholder/400/300',
    featured: true,
    hs2Impact: false,
    viewers: 412
  },
  // Add more mock properties as needed
];

const filterOptions = {
  priceRange: [
    { label: 'Under £250k', value: '0-250000' },
    { label: '£250k - £500k', value: '250000-500000' },
    { label: '£500k - £1M', value: '500000-1000000' },
    { label: 'Over £1M', value: '1000000+' }
  ],
  landSize: [
    { label: 'Under 1 acre', value: '0-1' },
    { label: '1-3 acres', value: '1-3' },
    { label: '3-5 acres', value: '3-5' },
    { label: 'Over 5 acres', value: '5+' }
  ],
  planningStatus: [
    { label: 'Planning Granted', value: 'granted' },
    { label: 'Planning Pending', value: 'pending' },
    { label: 'Pre-Application', value: 'pre-app' },
    { label: 'No Planning', value: 'none' }
  ],
  landType: [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Mixed Use', value: 'mixed' },
    { label: 'Agricultural', value: 'agricultural' }
  ]
};

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    priceRange: '',
    landSize: '',
    planningStatus: '',
    landType: '',
    hs2Only: false
  });

  const toggleSaved = (propertyId: string) => {
    setSavedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Birmingham Land Opportunities</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {viewMode === 'grid' ? (
                  <>
                    <Map className="h-4 w-4" />
                    Map View
                  </>
                ) : (
                  <>
                    <Grid className="h-4 w-4" />
                    Grid View
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, postcode, or keywords..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="h-5 w-5" />
              Filters
              {showFilters && <span className="ml-1 px-2 py-0.5 bg-emerald-600 text-white text-xs rounded-full">3</span>}
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 pr-10"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="size">Size: Largest First</option>
                <option value="planning">Planning Score</option>
                <option value="roi">ROI Potential</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Prices</option>
                    {filterOptions.priceRange.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Size</label>
                  <select
                    value={filters.landSize}
                    onChange={(e) => setFilters({...filters, landSize: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Sizes</option>
                    {filterOptions.landSize.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Planning Status</label>
                  <select
                    value={filters.planningStatus}
                    onChange={(e) => setFilters({...filters, planningStatus: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Status</option>
                    {filterOptions.planningStatus.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Type</label>
                  <select
                    value={filters.landType}
                    onChange={(e) => setFilters({...filters, landType: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Types</option>
                    {filterOptions.landType.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.hs2Only}
                    onChange={(e) => setFilters({...filters, hs2Only: e.target.checked})}
                    className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">HS2 Impact Zone Only</span>
                </label>
                <button
                  onClick={() => setFilters({
                    search: '',
                    priceRange: '',
                    landSize: '',
                    planningStatus: '',
                    landType: '',
                    hs2Only: false
                  })}
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{mockProperties.length}</span> properties in Birmingham
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle className="h-4 w-4" />
            <span>New properties added daily</span>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              {/* Property Image */}
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                {property.featured && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                    FEATURED
                  </span>
                )}
                {property.hs2Impact && (
                  <span className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Train className="h-3 w-3" />
                    HS2
                  </span>
                )}
                <button
                  onClick={() => toggleSaved(property.id)}
                  className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur rounded-lg hover:bg-white transition-colors"
                >
                  <Heart className={`h-5 w-5 ${savedProperties.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>

              {/* Property Details */}
              <div className="p-5">
                <Link href={`/properties/${property.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                    {property.title}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}, {property.postcode}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      £{property.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{property.size} acres</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-emerald-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">{property.roi}x ROI</span>
                    </div>
                    <p className="text-sm text-gray-500">24 months</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">{property.planningScore}%</span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded">
                      Grade {property.investmentGrade}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{property.viewers}</span>
                  </div>
                </div>

                <Link
                  href={`/properties/${property.id}`}
                  className="mt-4 w-full px-4 py-2 bg-emerald-600 text-white text-center rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  View Details
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Load More Properties
          </button>
        </div>
      </div>
    </div>
  );
}