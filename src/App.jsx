import React, { useState, useEffect } from 'react';
import { 
  MapPin, Search, Filter, TrendingUp, Shield, Users, Globe,
  ChevronDown, Menu, X, Building, Calculator, FileText, Bell,
  Heart, Share2, Eye, CheckCircle, AlertCircle, Mountain, Trees,
  Factory, Landmark, Target, BookOpen, Zap, SlidersHorizontal,
  Grid, List, MapIcon, Bookmark, HelpCircle, Layers, Sparkles,
  PlayCircle, History, Home, Phone, Mail, ChevronRight
} from 'lucide-react';

// Note: Wheat icon might not exist, using Mountain as fallback
const Wheat = Mountain;

const LandVest = () => {
  // State Management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMode, setUserMode] = useState('beginner');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    landTypes: [],
    radius: '10',
    sortBy: 'featured'
  });
  // Land Type Options
  const landTypes = [
    {
      id: 'development',
      name: 'Development Land',
      icon: Building,
      color: 'blue',
      description: 'Land with planning permission ready to build',
      tooltip: 'Ready for immediate development - highest value but higher price'
    },
    {
      id: 'strategic',
      name: 'Strategic Land',
      icon: Target,
      color: 'purple',
      description: 'Land likely to get planning permission',
      tooltip: 'In local development plans - medium risk, high reward'
    },
    {
      id: 'agricultural',
      name: 'Agricultural Land',
      icon: Wheat,
      color: 'green',
      description: 'Farmland with agricultural potential',
      tooltip: 'Can generate income while holding - potential future development'
    },
    {
      id: 'brownfield',
      name: 'Brownfield Sites',
      icon: Factory,
      color: 'orange',
      description: 'Former industrial land for redevelopment',
      tooltip: 'Easier planning permission - may need cleanup'
    },
    {
      id: 'structures',
      name: 'Land with Structures',
      icon: Landmark,
      color: 'indigo',
      description: 'Includes barns, ruins for conversion',
      tooltip: 'Conversion opportunities - unique development potential'
    },
    {
      id: 'greenfield',
      name: 'Greenfield Land',
      icon: Trees,
      color: 'emerald',
      description: 'Undeveloped countryside land',
      tooltip: 'Pristine land - harder planning but high potential'
    }
  ];

  // Currency rates
  const currencyRates = {
    GBP: 1,
    USD: 1.27,
    EUR: 1.16,
    CNY: 9.13
  };

  // Helper Functions
  const convertPrice = (priceInGBP) => {
    const converted = priceInGBP * currencyRates[selectedCurrency];
    const symbols = {
      GBP: '£',
      USD: '$',
      EUR: '€',
      CNY: '¥'
    };
    return `${symbols[selectedCurrency]}${converted.toLocaleString()}`;
  };

  const toggleFavorite = (landId) => {
    if (favorites.includes(landId)) {
      setFavorites(favorites.filter(id => id !== landId));
    } else {
      setFavorites([...favorites, landId]);
    }
  };

  const toggleCompare = (landId) => {
    if (compareList.includes(landId)) {
      setCompareList(compareList.filter(id => id !== landId));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, landId]);
    } else {
      alert('You can compare up to 3 properties at once');
    }
  };

  // Sample land listings
  const landListings = [
    {
      id: 1,
      title: "Prime Development Land - Birmingham",
      type: "development",
      size: "2.5 acres",
      price: 450000,
      planningStatus: "Full Planning Granted",
      potential: "£2.4M GDV potential",
      location: "Edgbaston, Birmingham",
      features: ['Road Access', 'All Utilities', 'Level Site'],
      roi: "435%",
      timeframe: "18-24 months",
      riskLevel: "Low",
      views: 234,
      enquiries: 12,
      listed: "2 days ago"
    },
    {
      id: 2,
      title: "Agricultural Land - Yorkshire",
      type: "agricultural",
      size: "15 acres",
      price: 180000,
      planningStatus: "No Current Planning",
      potential: "Long-term development potential",
      location: "North Yorkshire",
      features: ['Grade 3 Agricultural', 'Income Producing', 'Road Frontage'],
      roi: "250%",
      timeframe: "5-7 years",
      riskLevel: "Medium",
      views: 567,
      enquiries: 23,
      listed: "1 week ago"
    },
    {
      id: 3,
      title: "Brownfield Redevelopment - Manchester",
      type: "brownfield",
      size: "4.2 acres",
      price: 750000,
      planningStatus: "Pre-Application Approved",
      potential: "100 apartments + retail",
      location: "Greater Manchester",
      features: ['City Centre Location', 'Cleared Site', 'Transport Links'],
      roi: "320%",
      timeframe: "2-3 years",
      riskLevel: "Low-Medium",
      views: 892,
      enquiries: 45,
      listed: "3 days ago"
    }
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-2xl font-bold text-gray-800">LandVest</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <button className="text-gray-700 hover:text-green-600 font-medium">
                  Search Land
                </button>
                <button className="text-gray-700 hover:text-green-600 font-medium">
                  How It Works
                </button>
                <button className="text-gray-700 hover:text-green-600 font-medium flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  International
                </button>
                
                {/* User Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUserMode('beginner')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      userMode === 'beginner' 
                        ? 'bg-white text-green-600 shadow' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <BookOpen className="h-4 w-4 inline mr-1" />
                    Beginner
                  </button>
                  <button
                    onClick={() => setUserMode('advanced')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      userMode === 'advanced' 
                        ? 'bg-white text-green-600 shadow' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Zap className="h-4 w-4 inline mr-1" />
                    Advanced
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-green-600">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              
              <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm"
              >
                <option value="GBP">£ GBP</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="CNY">¥ CNY</option>
              </select>

              <button 
                onClick={() => setIsLoggedIn(true)}
                className="hidden md:block px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
              >
                Sign In
              </button>
              <button className="hidden md:block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Start Free Trial
              </button>
              
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {userMode === 'beginner' 
                  ? "Find Your Perfect Land Investment"
                  : "Advanced Land Investment Platform"
                }
              </h1>
              <p className="text-xl text-green-100">
                {userMode === 'beginner'
                  ? "We'll guide you through every step of land investment"
                  : "Professional tools for serious land investors"
                }
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 text-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {userMode === 'beginner' ? '🔍 Quick Search' : '🎯 Advanced Search'}
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-green-600 hover:text-green-700"
                >
                  <SlidersHorizontal className="h-5 w-5 mr-1" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </button>
              </div>

              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Enter location, postcode, or land reference..."
                    className="w-full px-4 py-3 pr-10 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                  />
                  <MapPin className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>

              {/* Land Type Selector */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  What type of land are you looking for?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {landTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = searchFilters.landTypes.includes(type.id);
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          if (isSelected) {
                            setSearchFilters({
                              ...searchFilters,
                              landTypes: searchFilters.landTypes.filter(t => t !== type.id)
                            });
                          } else {
                            setSearchFilters({
                              ...searchFilters,
                              landTypes: [...searchFilters.landTypes, type.id]
                            });
                          }
                        }}
                        className={`relative group p-3 rounded-lg border-2 transition-all ${
                          isSelected 
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`h-6 w-6 mx-auto mb-1 ${
                          isSelected ? 'text-green-600' : 'text-gray-600'
                        }`} />
                        <p className="text-xs font-medium">{type.name}</p>
                        
                        {userMode === 'beginner' && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {type.tooltip}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {showFilters && (
                <div className="border-t pt-4 space-y-4 animate-fadeIn">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Price Range
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Land Size (acres)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Listings Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Available Land Investments
              </h2>
              <p className="text-gray-600 mt-1">
                {landListings.length} opportunities matching your criteria
              </p>
            </div>

            <div className="flex items-center gap-4">
              <select className="px-4 py-2 border rounded-lg">
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="roi-high">ROI: Highest First</option>
              </select>

              <div className="flex bg-white border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 ${viewMode === 'map' ? 'bg-green-100 text-green-600' : 'text-gray-600'}`}
                >
                  <MapIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Compare Bar */}
          {compareList.length > 0 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6 flex justify-between items-center">
              <div className="flex items-center">
                <Layers className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium">
                  {compareList.length} land{compareList.length > 1 ? 's' : ''} selected for comparison
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCompareList([])}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700"
                >
                  Clear
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Compare Now
                </button>
              </div>
            </div>
          )}

          {/* Land Cards */}
          <div className={`
            ${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
            ${viewMode === 'list' ? 'space-y-4' : ''}
            ${viewMode === 'map' ? 'hidden' : ''}
          `}>
            {landListings.map((land) => {
              const landType = landTypes.find(t => t.id === land.type);
              const Icon = landType?.icon || Mountain;
              const isFavorite = favorites.includes(land.id);
              const isComparing = compareList.includes(land.id);

              return (
                <div
                  key={land.id}
                  className={`
                    bg-white rounded-xl shadow-lg hover:shadow-xl transition-all
                    ${isComparing ? 'ring-2 ring-blue-500' : ''}
                  `}
                >
                  <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-t-xl">
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center">
                      <Icon className="h-4 w-4 text-gray-700 mr-1" />
                      <span className="text-xs font-medium">{landType?.name}</span>
                    </div>

                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => toggleFavorite(land.id)}
                        className={`p-2 rounded-full backdrop-blur transition-colors ${
                          isFavorite 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/90 text-gray-700 hover:bg-white'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleCompare(land.id)}
                        className={`p-2 rounded-full backdrop-blur transition-colors ${
                          isComparing
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/90 text-gray-700 hover:bg-white'
                        }`}
                      >
                        <Layers className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white backdrop-blur">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>

                    {land.riskLevel === 'Low' && (
                      <span className="absolute bottom-3 left-3 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        Low Risk
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{land.title}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <p className="text-2xl font-bold text-green-600">
                        {convertPrice(land.price)}
                      </p>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{land.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mountain className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{land.size}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{land.planningStatus}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        {land.roi} ROI
                      </div>
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        {land.timeframe}
                      </div>
                    </div>

                    <div className="border-t pt-3 mb-3">
                      <p className="text-sm font-medium text-purple-600">
                        💎 Potential: {land.potential}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {land.views} views
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {land.enquiries} enquiries
                      </span>
                      <span>{land.listed}</span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        View Details
                      </button>
                      {userMode === 'beginner' && (
                        <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                          <HelpCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {viewMode === 'map' && (
            <div className="bg-white rounded-xl shadow-lg p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map View</h3>
                <p className="text-gray-500">Map integration coming soon!</p>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-green-500" />
                <span className="ml-2 text-xl font-bold">LandVest</span>
              </div>
              <p className="text-gray-400 text-sm">
                The UK's first AI-powered land investment platform
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Land Types</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Development Land</a></li>
                <li><a href="#" className="hover:text-white">Strategic Land</a></li>
                <li><a href="#" className="hover:text-white">Agricultural Land</a></li>
                <li><a href="#" className="hover:text-white">Brownfield Sites</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Beginner's Guide</a></li>
                <li><a href="#" className="hover:text-white">ROI Calculator</a></li>
                <li><a href="#" className="hover:text-white">Market Reports</a></li>
                <li><a href="#" className="hover:text-white">Tax Information</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 LandVest. All rights reserved.</p>
            <p className="mt-2">
              Land investment carries risk. Not financial advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandVest;