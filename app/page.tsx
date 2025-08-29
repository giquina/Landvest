'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Search, MapPin, TrendingUp, Shield, Users, BarChart3, ArrowRight, 
  CheckCircle, Building2, Zap, Filter, Eye, Star, Home, Trees, 
  Building, Briefcase, ChevronDown, Menu, X, Bell, User, 
  Calendar, DollarSign, FileText, Award, Target, Sparkles,
  ChevronRight, Globe, Lock, Unlock, Database, Brain, Clock,
  Heart, Layers, BookOpen, Factory, Landmark, Mountain, HelpCircle,
  Share2, Wheat, PoundSterling, Euro, Banknote
} from 'lucide-react';

// Dynamically import map component to avoid SSR issues
const MapSearch = dynamic(() => import('../components/MapSearch'), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-gradient-to-br from-green-900 to-green-800 rounded-3xl animate-pulse flex items-center justify-center"><p className="text-white">Loading map...</p></div>
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState([50000, 1000000]);
  const [planningFilter, setPlanningFilter] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // New state for enhanced features
  const [userMode, setUserMode] = useState('beginner'); // 'beginner' or 'advanced'
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [selectedLandTypes, setSelectedLandTypes] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [showInternational, setShowInternational] = useState(false);

  // Currency conversion rates
  const currencyRates = {
    GBP: 1,
    USD: 1.27,
    EUR: 1.16,
    CNY: 9.13,
    AED: 4.67,
    HKD: 9.92,
    SGD: 1.71
  };

  // Land type definitions
  const landTypes = [
    {
      id: 'development',
      name: 'Development Land',
      icon: Building2,
      description: 'Ready with planning permission',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'strategic',
      name: 'Strategic Land',
      icon: Target,
      description: 'Future development potential',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'agricultural',
      name: 'Agricultural Land',
      icon: Trees,
      description: 'Farming and future potential',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'brownfield',
      name: 'Brownfield Sites',
      icon: Factory,
      description: 'Former industrial land',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'structures',
      name: 'Land with Structures',
      icon: Landmark,
      description: 'Barns and conversion opportunities',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      id: 'greenfield',
      name: 'Greenfield Land',
      icon: Mountain,
      description: 'Undeveloped countryside',
      color: 'from-emerald-400 to-emerald-600'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper functions for new features
  const convertPrice = (priceInGBP: number) => {
    const converted = priceInGBP * currencyRates[selectedCurrency as keyof typeof currencyRates];
    const symbols: Record<string, string> = {
      GBP: '£',
      USD: '$',
      EUR: '€',
      CNY: '¥',
      AED: 'AED',
      HKD: 'HK$',
      SGD: 'S$'
    };
    return `${symbols[selectedCurrency]}${converted.toLocaleString()}`;
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    );
  };

  const toggleCompare = (id: number) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(cId => cId !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      alert('You can compare up to 3 properties');
      return prev;
    });
  };

  const toggleLandType = (typeId: string) => {
    setSelectedLandTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  // Enhanced properties with more details
  const properties = [
    { 
      id: 1, 
      title: 'Prime Development Land - Digbeth', 
      price: 450000, 
      size: '2.3 acres', 
      planningStatus: 'Outline Approved', 
      growth: '+18%',
      landType: 'development',
      roi: '287%',
      views: 234,
      enquiries: 12
    },
    { 
      id: 2, 
      title: 'Agricultural Investment - Jewellery Quarter', 
      price: 280000, 
      size: '1.1 acres', 
      planningStatus: 'Pre-Application', 
      growth: '+22%',
      landType: 'agricultural',
      roi: '195%',
      views: 156,
      enquiries: 8
    },
    { 
      id: 3, 
      title: 'Brownfield Site - Birmingham Business Park', 
      price: 750000, 
      size: '4.7 acres', 
      planningStatus: 'Full Permission', 
      growth: '+15%',
      landType: 'brownfield',
      roi: '342%',
      views: 445,
      enquiries: 23
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 blur-xl opacity-60"></div>
                <span className="relative text-3xl font-black text-white">
                  Land<span className="gradient-text">Vest</span>
                </span>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-black rounded-full animate-pulse-glow">
                BETA
              </span>
            </div>            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Features</a>
              <a href="#map" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Search Land</a>
              <a href="#planning" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Planning AI</a>
              <a href="#pricing" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Pricing</a>
              
              {/* User Mode Toggle */}
              <div className="flex items-center bg-black/30 rounded-lg p-1">
                <button
                  onClick={() => setUserMode('beginner')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    userMode === 'beginner' 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Beginner
                </button>
                <button
                  onClick={() => setUserMode('advanced')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    userMode === 'advanced' 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-4 h-4 inline mr-1" />
                  Advanced
                </button>
              </div>

              {/* Currency Selector */}
              <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-black/30 text-white border border-white/20 rounded-lg px-3 py-1 text-sm focus:border-yellow-400 transition"
              >
                <option value="GBP">£ GBP</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="CNY">¥ CNY</option>
                <option value="AED">AED</option>
                <option value="HKD">HK$</option>
                <option value="SGD">S$ SGD</option>
              </select>

              {/* Favorites Counter */}
              {favorites.length > 0 && (
                <button className="relative p-2 text-gray-300 hover:text-yellow-400">
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                </button>
              )}
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 text-gray-300 hover:text-yellow-400">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 glass rounded-lg hover:bg-white/10">
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="btn-premium px-6 py-2.5 rounded-lg font-semibold text-black flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section - Enhanced */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full blur-3xl opacity-10 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full mb-8 animate-slide-up">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-bold text-yellow-400">Birmingham Launch</span>
              <span className="text-sm text-gray-300">26.4% Growth Opportunity</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <span className="text-white">AI-Powered</span>
              <br />
              <span className="gradient-text">Land Investment</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
              Discover hidden gems in Birmingham's booming land market with planning intelligence that gives you the edge
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.3s'}}>
              <button className="group btn-premium px-8 py-4 rounded-xl font-bold text-black flex items-center justify-center gap-3 text-lg">
                <Unlock className="w-5 h-5" />
                Start Free Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-8 py-4 glass border border-white/20 rounded-xl font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Eye className="w-5 h-5" />
                Watch Demo (2 min)
              </button>
            </div>
          </div>
          {/* Live Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="glass rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-8 h-8 text-yellow-400" />
                <span className="text-xs text-green-400 font-bold">LIVE</span>
              </div>
              <p className="text-3xl font-bold text-white">£8.2T</p>
              <p className="text-sm text-gray-400">Market Value</p>
            </div>
            <div className="glass rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-2">
                <Database className="w-8 h-8 text-yellow-400" />
                <span className="text-xs text-green-400 font-bold animate-pulse">+12</span>
              </div>
              <p className="text-3xl font-bold text-white">2,847</p>
              <p className="text-sm text-gray-400">Active Plots</p>
            </div>
            <div className="glass rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-2">
                <Brain className="w-8 h-8 text-yellow-400" />
                <ArrowRight className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white">87%</p>
              <p className="text-sm text-gray-400">AI Accuracy</p>
            </div>
            <div className="glass rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-yellow-400" />
                <span className="text-xs text-yellow-400">24/7</span>
              </div>
              <p className="text-3xl font-bold text-white">< 3s</p>
              <p className="text-sm text-gray-400">Analysis Time</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Land Type Selection Section - NEW */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-4">
              Choose Your <span className="gradient-text">Investment Type</span>
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              {userMode === 'beginner' 
                ? "Select the type of land you're interested in (we'll guide you through each option)"
                : "Filter by specific land categories for targeted investment opportunities"
              }
            </p>
            {userMode === 'beginner' && (
              <p className="text-sm text-yellow-400 mt-2">
                💡 Tip: Hover over each option to learn more
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {landTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedLandTypes.includes(type.id);
              
              return (
                <button
                  key={type.id}
                  onClick={() => toggleLandType(type.id)}
                  className={`group relative p-6 rounded-xl transition-all duration-300 hover-lift ${
                    isSelected 
                      ? 'premium-card ring-2 ring-yellow-400' 
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} mb-3 mx-auto flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{type.name}</h3>
                  <p className="text-xs text-gray-400">{type.description}</p>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                    </div>
                  )}
                  
                  {userMode === 'beginner' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-black/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-48">
                      <p className="text-xs text-white">{type.description}</p>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/90"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedLandTypes.length > 0 && (
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                Filtering by {selectedLandTypes.length} land type{selectedLandTypes.length > 1 ? 's' : ''}
              </p>
              <button 
                onClick={() => setSelectedLandTypes([])}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Interactive Map Search Section */}
      <section id="map" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-white mb-4">
              Find Your Perfect <span className="gradient-text">Investment Plot</span>
            </h2>
            <p className="text-xl text-gray-300">
              Interactive map with real-time data from 40+ sources
            </p>
          </div>

          {/* Advanced Filters */}
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Property Type Filter */}
              <div>
                <label className="text-sm text-gray-300 font-medium mb-2 block">Property Type</label>
                <select 
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-yellow-400 transition"
                >
                  <option value="all">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
              </div>
              {/* Price Range Filter */}
              <div>
                <label className="text-sm text-gray-300 font-medium mb-2 block">
                  Price Range: £{priceRange[0].toLocaleString()} - £{priceRange[1].toLocaleString()}
                </label>
                <input 
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-yellow-400"
                />
              </div>

              {/* Planning Status Filter */}
              <div>
                <label className="text-sm text-gray-300 font-medium mb-2 block">Planning Status</label>
                <select 
                  value={planningFilter}
                  onChange={(e) => setPlanningFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-yellow-400 transition"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Full Permission</option>
                  <option value="outline">Outline Permission</option>
                  <option value="pending">Application Pending</option>
                  <option value="none">No Application</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button className="w-full btn-premium py-3 rounded-lg font-bold text-black flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Properties
                </button>
              </div>
            </div>
          </div>
          {/* Map Container */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="map-container glass rounded-3xl p-2">
                <MapSearch />
              </div>
            </div>

            {/* Property Cards - Enhanced */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Featured Properties</h3>
                {compareList.length > 0 && (
                  <button className="text-sm bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full">
                    Compare ({compareList.length})
                  </button>
                )}
              </div>
              
              {properties.map((property, index) => {
                const landType = landTypes.find(t => t.id === property.landType);
                const Icon = landType?.icon || Building2;
                const isFavorite = favorites.includes(property.id);
                const isComparing = compareList.includes(property.id);
                
                return (
                  <div 
                    key={property.id}
                    className={`premium-card rounded-xl p-4 hover-lift relative ${
                      isComparing ? 'ring-2 ring-yellow-400' : ''
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className={`p-1.5 rounded-lg transition-all ${
                          isFavorite 
                            ? 'bg-red-500 text-white' 
                            : 'glass text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleCompare(property.id)}
                        className={`p-1.5 rounded-lg transition-all ${
                          isComparing
                            ? 'bg-yellow-400 text-black'
                            : 'glass text-gray-400 hover:text-yellow-400'
                        }`}
                      >
                        <Layers className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 glass text-gray-400 hover:text-white rounded-lg">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Land Type Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${landType?.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-gray-400">{landType?.name}</span>
                    </div>
                    
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-white pr-20">{property.title}</h4>
                        <p className="text-sm text-gray-400">{property.size}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        {property.growth}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold gradient-text">
                        {convertPrice(property.price)}
                      </span>
                      <span className="text-xs text-gray-400">{property.planningStatus}</span>
                    </div>
                    
                    {/* Additional Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {property.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {property.enquiries}
                        </span>
                      </div>
                      <span className="text-yellow-400 font-medium">
                        ROI: {property.roi}
                      </span>
                    </div>
                    
                    {userMode === 'beginner' && (
                      <button className="mt-3 w-full py-2 glass text-yellow-400 rounded-lg text-xs hover:bg-white/10 flex items-center justify-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        Learn about this investment
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Planning Permission AI Section */}
      <section id="planning" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-yellow-900/20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full mb-4">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">Our #1 Differentiator</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Planning Permission <span className="gradient-text">AI Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our proprietary AI analyzes 10+ years of planning data to predict approval likelihood with 87% accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Analysis Demo */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Brain className="w-8 h-8 text-yellow-400" />
                Live AI Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Location Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse"></div>
                    </div>
                    <span className="text-green-400 font-bold">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Historical Success</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-yellow-400 to-amber-600"></div>
                    </div>
                    <span className="text-yellow-400 font-bold">76%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Policy Compliance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-600"></div>
                    </div>
                    <span className="text-green-400 font-bold">100%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Infrastructure Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-5/6 h-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                    </div>
                    <span className="text-blue-400 font-bold">85%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
                <p className="text-green-400 font-bold mb-1">AI Prediction: HIGH APPROVAL CHANCE</p>
                <p className="text-sm text-gray-300">Based on 2,847 similar applications in Birmingham</p>
              </div>
            </div>
            {/* Key Features */}
            <div className="space-y-4">
              <div className="premium-card rounded-xl p-6">
                <Shield className="w-12 h-12 text-yellow-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Risk Assessment</h4>
                <p className="text-gray-300 mb-4">
                  Comprehensive analysis of environmental, legal, and market risks
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Flood risk analysis
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Contamination checks
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Legal title verification
                  </li>
                </ul>
              </div>

              <div className="premium-card rounded-xl p-6">
                <Target className="w-12 h-12 text-yellow-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Success Factors</h4>
                <p className="text-gray-300 mb-4">
                  Key indicators that increase approval likelihood
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">HS2 Proximity</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">Growth Area</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">Infrastructure Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* International Investors Section - NEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-4">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-bold">International Investors Welcome</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Join <span className="gradient-text">Global Investors</span> in UK Land
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              40% of UK land investments come from overseas. Full foreign ownership rights, no residency required.
            </p>
          </div>

          {/* Key Markets Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="glass rounded-xl p-4 text-center hover-lift">
              <span className="text-2xl mb-2 block">🇨🇳</span>
              <p className="text-sm text-gray-400">China</p>
              <p className="text-xl font-bold gradient-text">£13B/year</p>
            </div>
            <div className="glass rounded-xl p-4 text-center hover-lift">
              <span className="text-2xl mb-2 block">🇦🇪</span>
              <p className="text-sm text-gray-400">UAE</p>
              <p className="text-xl font-bold gradient-text">£8B/year</p>
            </div>
            <div className="glass rounded-xl p-4 text-center hover-lift">
              <span className="text-2xl mb-2 block">🇸🇬</span>
              <p className="text-sm text-gray-400">Singapore</p>
              <p className="text-xl font-bold gradient-text">£5B/year</p>
            </div>
            <div className="glass rounded-xl p-4 text-center hover-lift">
              <span className="text-2xl mb-2 block">🇺🇸</span>
              <p className="text-sm text-gray-400">USA</p>
              <p className="text-xl font-bold gradient-text">£4B/year</p>
            </div>
            <div className="glass rounded-xl p-4 text-center hover-lift">
              <span className="text-2xl mb-2 block">🇭🇰</span>
              <p className="text-sm text-gray-400">Hong Kong</p>
              <p className="text-xl font-bold gradient-text">£3B/year</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 100% Ownership */}
            <div className="premium-card rounded-xl p-6 hover-lift">
              <Shield className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">100% Foreign Ownership</h3>
              <p className="text-gray-300 mb-4">
                No restrictions on foreign ownership of UK land
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Full freehold rights
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  No residency requirements
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Protected by UK law
                </li>
              </ul>
            </div>

            {/* Multi-Currency Support */}
            <div className="premium-card rounded-xl p-6 hover-lift">
              <Banknote className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Multi-Currency Platform</h3>
              <p className="text-gray-300 mb-4">
                View prices and transact in your preferred currency
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">GBP</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">USD</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">EUR</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">CNY</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">AED</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs">HKD</span>
              </div>
            </div>

            {/* Tax & Legal Support */}
            <div className="premium-card rounded-xl p-6 hover-lift">
              <FileText className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Complete Support</h3>
              <p className="text-gray-300 mb-4">
                Tax guidance and legal support for international buyers
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  SDLT calculator (+2% surcharge)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  UK company formation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Visa investment routes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Portfolio Tracking Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-black text-white mb-6">
                  Track Your <span className="gradient-text">Portfolio Performance</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Monitor all your land investments in one intelligent dashboard
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Real-Time Valuations</h4>
                      <p className="text-sm text-gray-400">Track market value changes instantly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Planning Milestones</h4>
                      <p className="text-sm text-gray-400">Never miss important dates</p>
                    </div>
                  </div>                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Document Management</h4>
                      <p className="text-sm text-gray-400">All paperwork in one secure place</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Dashboard Preview */}
              <div className="glass rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">Your Portfolio</h3>
                  <span className="text-sm text-green-400">+24.3% YTD</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Total Value</p>
                      <p className="text-xs text-gray-400">5 Properties</p>
                    </div>
                    <p className="text-xl font-bold gradient-text">£2.4M</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Monthly Growth</p>
                      <p className="text-xs text-gray-400">Average</p>
                    </div>
                    <p className="text-xl font-bold text-green-400">+2.1%</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Planning Success</p>
                      <p className="text-xs text-gray-400">3 of 3 approved</p>
                    </div>
                    <p className="text-xl font-bold text-green-400">100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-white mb-4">
              Investment Plans That <span className="gradient-text">Scale With You</span>
            </h2>
            <p className="text-xl text-gray-300">
              Start free, upgrade when you find your first opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="premium-card rounded-2xl p-8 hover-lift">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-gray-400 mb-6">Perfect for exploring opportunities</p>
              <p className="text-4xl font-black text-white mb-1">£49</p>
              <p className="text-sm text-gray-400 mb-6">/month</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>5 searches per month</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Basic market data</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Email alerts</span>
                </li>
              </ul>
              
              <button className="w-full py-3 glass border border-white/20 rounded-lg font-bold text-white hover:bg-white/10 transition">
                Start Free Trial
              </button>
            </div>
            {/* Professional Plan */}
            <div className="premium-card rounded-2xl p-8 hover-lift relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-yellow-400 to-amber-600 text-black text-sm font-bold rounded-full">
                  MOST POPULAR
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 mt-2">Professional</h3>
              <p className="text-gray-400 mb-6">For serious investors</p>
              <p className="text-4xl font-black gradient-text mb-1">£199</p>
              <p className="text-sm text-gray-400 mb-6">/month</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="font-medium">Planning Permission AI</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Unlimited searches</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Portfolio tracking</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              
              <button className="w-full py-3 btn-premium rounded-lg font-bold text-black">
                Start Free Trial
              </button>
            </div>
            {/* Enterprise Plan */}
            <div className="premium-card rounded-2xl p-8 hover-lift">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-400 mb-6">For institutions & teams</p>
              <p className="text-4xl font-black text-white mb-1">£499+</p>
              <p className="text-sm text-gray-400 mb-6">/month</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>White-label options</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              
              <button className="w-full py-3 glass border border-white/20 rounded-lg font-bold text-white hover:bg-white/10 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-black text-white mb-4">
            Land<span className="gradient-text">Vest</span>
          </p>
          <p className="text-gray-400">© 2024 LandVest. All rights reserved. FCA authorization pending.</p>
        </div>
      </footer>
    </div>
  );
}