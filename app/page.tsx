'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Search, MapPin, TrendingUp, Shield, Users, BarChart3, ArrowRight, 
  CheckCircle, Building2, Zap, Filter, Eye, Star, Home, Trees, 
  Building, Briefcase, ChevronDown, Menu, X, Bell, User, 
  Calendar, DollarSign, FileText, Award, Target, Sparkles,
  ChevronRight, Globe, Lock, Unlock, Database, Brain, Clock, Crown
} from 'lucide-react';

// Dynamically import components to avoid SSR issues
const MapSearch = dynamic(() => import('../components/MapSearch'), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-gradient-to-br from-green-900 to-green-800 rounded-3xl animate-pulse flex items-center justify-center"><p className="text-white">Loading map...</p></div>
});

const EnhancedPropertyCard = dynamic(() => import('../components/EnhancedPropertyCard'), { ssr: false });
const ROICalculator = dynamic(() => import('../components/ROICalculator'), { ssr: false });
const RiskAssessmentDashboard = dynamic(() => import('../components/RiskAssessmentDashboard'), { ssr: false });
const CommunityHub = dynamic(() => import('../components/CommunityHub'), { ssr: false });
const PortfolioTracker = dynamic(() => import('../components/PortfolioTracker'), { ssr: false });

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState([50000, 1000000]);
  const [planningFilter, setPlanningFilter] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showDashboard, setShowDashboard] = useState(false);
  const [activeSection, setActiveSection] = useState<'properties' | 'calculator' | 'risk' | 'community' | 'portfolio'>('properties');

  const properties = [
    { 
      id: 1, 
      title: 'Development Site - Digbeth High Street', 
      price: '£485,000', 
      size: '0.8 acres', 
      planningStatus: 'Pre-Application Submitted', 
      growth: '+18%',
      distance: '0.3 miles from HS2 Station',
      zone: 'Creative Quarter'
    },
    { 
      id: 2, 
      title: 'Mixed-Use Plot - Jewellery Quarter', 
      price: '£320,000', 
      size: '0.5 acres', 
      planningStatus: 'Planning Approved Sept 2024', 
      growth: '+22%',
      distance: '0.7 miles to City Centre',
      zone: 'Conservation Area'
    },
    { 
      id: 3, 
      title: 'Commercial Site - Eastside Business District', 
      price: '£625,000', 
      size: '1.2 acres', 
      planningStatus: 'Full Permission Granted', 
      growth: '+15%',
      distance: 'Adjacent to Curzon Street',
      zone: 'Enterprise Zone'
    },
  ];

  // Enhanced property data for the new cards
  const enhancedProperties = [
    {
      id: 1,
      title: 'Digbeth Creative Quarter Development',
      price: '£485,000',
      size: '0.8 acres',
      location: 'Digbeth High Street',
      planningStatus: 'Pre-Application Submitted',
      planningSuccessScore: 82,
      roiProjection: {
        percentage: 3.2,
        timeframe: '24 months',
        confidence: 78
      },
      riskIndicators: {
        flood: 'low' as const,
        access: 'good' as const,
        contamination: 'none' as const,
        infrastructure: 'ready' as const
      },
      investmentGrade: 'A' as const,
      viewerCount: 147,
      offerCount: 4,
      nearbyApprovals: {
        total: 23,
        approved: 19
      },
      keyMetrics: {
        pricePerAcre: '£606,250',
        distanceToHS2: '0.3 miles',
        councilArea: 'Birmingham City',
        zoningType: 'Mixed Use'
      },
      documents: {
        titleDeeds: true,
        planningDocs: true,
        environmentalReport: true,
        surveyReport: false
      }
    },
    {
      id: 2,
      title: 'Jewellery Quarter Heritage Site',
      price: '£320,000',
      size: '0.5 acres',
      location: 'Warstone Lane',
      planningStatus: 'Planning Approved',
      planningSuccessScore: 94,
      roiProjection: {
        percentage: 2.8,
        timeframe: '18 months',
        confidence: 85
      },
      riskIndicators: {
        flood: 'low' as const,
        access: 'requires_easement' as const,
        contamination: 'historical' as const,
        infrastructure: 'planned' as const
      },
      investmentGrade: 'B' as const,
      viewerCount: 89,
      offerCount: 2,
      nearbyApprovals: {
        total: 15,
        approved: 11
      },
      keyMetrics: {
        pricePerAcre: '£640,000',
        distanceToHS2: '0.7 miles',
        councilArea: 'Birmingham City',
        zoningType: 'Conservation Area'
      },
      documents: {
        titleDeeds: true,
        planningDocs: true,
        environmentalReport: false,
        surveyReport: true
      }
    }
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
              <span className="text-white">Smart Data-Driven</span>
              <br />
              <span className="gradient-text">Land Investment</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
              Discover profitable land opportunities in Birmingham with predictive planning insights and comprehensive market intelligence
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.3s'}}>
              <button className="group btn-premium px-8 py-4 rounded-xl font-bold text-black flex items-center justify-center gap-3 text-lg">
                <Unlock className="w-5 h-5" />
                Start Free Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-8 py-4 glass border border-white/20 rounded-xl font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Eye className="w-5 h-5" />
                Watch Demo (2 min)
              </button>
            </div>

            {/* Trust Signal */}
            <p className="text-sm text-gray-400 mt-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
              ✨ <span className="text-green-400 font-medium">No credit card required</span> • Join 1,200+ Birmingham investors
            </p>
          </div>
          {/* Birmingham-Focused Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="glass rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-2">
                <Building2 className="w-8 h-8 text-yellow-400" />
                <span className="text-xs text-green-400 font-bold">BIRMINGHAM</span>
              </div>
              <p className="text-3xl font-bold text-white">347</p>
              <p className="text-sm text-gray-400">Available Plots</p>
            </div>
            <div className="glass rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-yellow-400" />
                <span className="text-xs text-green-400 font-bold animate-pulse">+26.4%</span>
              </div>
              <p className="text-3xl font-bold text-white">£280k</p>
              <p className="text-sm text-gray-400">Avg. Plot Price</p>
            </div>
            <div className="glass rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-yellow-400" />
                <span className="text-xs text-green-400">THIS MONTH</span>
              </div>
              <p className="text-3xl font-bold text-white">23</p>
              <p className="text-sm text-gray-400">Approvals Won</p>
            </div>
            <div className="glass rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-yellow-400" />
                <span className="text-xs text-yellow-400">GROWING</span>
              </div>
              <p className="text-3xl font-bold text-white">1,247</p>
              <p className="text-sm text-gray-400">Local Investors</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              How <span className="gradient-text">LandVest</span> Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From search to purchase in 4 simple steps - we guide you through every stage of land investment
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-10 h-10 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Discover Opportunities</h3>
              <p className="text-gray-400">
                Search Birmingham's land market with advanced filters. Find plots by size, price, planning status, and growth potential.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-10 h-10 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Birmingham Market Intelligence</h3>
              <p className="text-gray-400">
                Get comprehensive Birmingham data analysis including planning success probability, HS2 impact assessment, and local market trends.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Due Diligence</h3>
              <p className="text-gray-400">
                Access legal documents, environmental checks, and infrastructure reports. Everything you need in one place.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Track & Manage</h3>
              <p className="text-gray-400">
                Monitor your investments with real-time valuations, planning updates, and portfolio performance metrics.
              </p>
            </div>
          </div>

          {/* Process Flow Arrows */}
          <div className="hidden md:flex justify-center items-center mt-12 space-x-16">
            <ArrowRight className="w-8 h-8 text-yellow-400 opacity-60" />
            <ArrowRight className="w-8 h-8 text-green-400 opacity-60" />
            <ArrowRight className="w-8 h-8 text-blue-400 opacity-60" />
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="btn-premium px-8 py-4 rounded-xl font-bold text-black flex items-center justify-center gap-3 text-lg mx-auto">
              <Unlock className="w-5 h-5" />
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-400 mt-3">3 free searches • No credit card needed</p>
          </div>
        </div>
      </section>

      {/* Birmingham-Focused Map Search Section */}
      <section id="map" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-white mb-4">
              Find Your Perfect <span className="gradient-text">Birmingham Plot</span>
            </h2>
            <p className="text-xl text-gray-300">
              Search 347 available plots across Digbeth, Jewellery Quarter, Edgbaston & beyond
            </p>
          </div>

          {/* Birmingham-Specific Filters */}
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Area Filter - Birmingham Specific */}
              <div>
                <label className="text-sm text-gray-300 font-medium mb-2 block">Birmingham Area</label>
                <select 
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-yellow-400 transition"
                >
                  <option value="all">All Areas</option>
                  <option value="digbeth">Digbeth (47 plots)</option>
                  <option value="jewellery">Jewellery Quarter (23 plots)</option>
                  <option value="edgbaston">Edgbaston (31 plots)</option>
                  <option value="eastside">Eastside (28 plots)</option>
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

            {/* Property Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Featured Properties</h3>
              {properties.map((property, index) => (
                <div 
                  key={property.id}
                  className="premium-card rounded-xl p-4 cursor-pointer hover-lift"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white mb-1">{property.title}</h4>
                      <p className="text-xs text-gray-500">{property.distance}</p>
                      <p className="text-sm text-gray-400">{property.size} • {property.zone}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      {property.growth}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold gradient-text">{property.price}</span>
                    </div>
                    <div className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                      {property.planningStatus}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Planning Intelligence Section */}
      <section id="planning" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-yellow-900/20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full mb-4">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">Our Key Advantage</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Planning Permission <span className="gradient-text">Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced analytics that predict planning approval likelihood using 10+ years of historical data and local council patterns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Smart Analytics Demo */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Brain className="w-8 h-8 text-yellow-400" />
                Birmingham Council Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Location Score (HS2 Impact)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse"></div>
                    </div>
                    <span className="text-green-400 font-bold">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Birmingham Council Success Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-yellow-400 to-amber-600"></div>
                    </div>
                    <span className="text-yellow-400 font-bold">73%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Local Policy Compliance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-600"></div>
                    </div>
                    <span className="text-green-400 font-bold">100%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Big City Plan Alignment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-5/6 h-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                    </div>
                    <span className="text-blue-400 font-bold">89%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
                <p className="text-green-400 font-bold mb-1">Birmingham Council Prediction: HIGH APPROVAL CHANCE</p>
                <p className="text-sm text-gray-300">Based on 147 similar Digbeth applications since 2020</p>
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

      {/* NEW: Enhanced Investment Tools Dashboard */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-600 text-black rounded-full mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">Advanced Investment Tools</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Professional-Grade <span className="gradient-text">Analysis Tools</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to make data-driven land investment decisions
            </p>
          </div>

          {/* Tool Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveSection('properties')}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                activeSection === 'properties' 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Smart Properties
            </button>
            <button
              onClick={() => setActiveSection('calculator')}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                activeSection === 'calculator' 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <DollarSign className="w-4 h-4 inline mr-2" />
              ROI Calculator
            </button>
            <button
              onClick={() => setActiveSection('risk')}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                activeSection === 'risk' 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Risk Assessment
            </button>
            <button
              onClick={() => setActiveSection('community')}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                activeSection === 'community' 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Community
            </button>
            <button
              onClick={() => setActiveSection('portfolio')}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                activeSection === 'portfolio' 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Portfolio
            </button>
          </div>

          {/* Dynamic Content Area */}
          <div className="animate-slide-up">
            {activeSection === 'properties' && (
              <div className="grid md:grid-cols-2 gap-8">
                {enhancedProperties.map(property => (
                  <EnhancedPropertyCard 
                    key={property.id} 
                    property={property}
                    onViewDetails={() => console.log('View details', property.id)}
                  />
                ))}
              </div>
            )}

            {activeSection === 'calculator' && (
              <ROICalculator initialPrice={450000} location="Birmingham" />
            )}

            {activeSection === 'risk' && (
              <RiskAssessmentDashboard propertyId="1" location="Birmingham" />
            )}

            {activeSection === 'community' && (
              <CommunityHub />
            )}

            {activeSection === 'portfolio' && (
              <PortfolioTracker />
            )}
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

      {/* Birmingham Success Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Birmingham Investors Are <span className="gradient-text">Winning Big</span>
            </h2>
            <p className="text-xl text-gray-300">
              Real results from local investors using LandVest to secure prime Birmingham plots
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">SC</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold">Sarah Chen</h4>
                  <p className="text-gray-400 text-sm">Property Developer</p>
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">
                "Found my Digbeth plot through LandVest 8 months ago. Planning approved last week - property value up £85k already."
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-green-400 font-bold">+£85k ROI</span>
                <span className="text-gray-400">Digbeth High Street</span>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">MP</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold">Michael Phillips</h4>
                  <p className="text-gray-400 text-sm">Investment Consultant</p>
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">
                "The planning intelligence was spot on. Got approval first time for my Jewellery Quarter site. LandVest saved me months of research."
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-green-400 font-bold">First-time approval</span>
                <span className="text-gray-400">Jewellery Quarter</span>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">AR</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold">Aisha Rahman</h4>
                  <p className="text-gray-400 text-sm">First-time Land Investor</p>
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">
                "Started with the free plan, found an Eastside plot within 2 weeks. Already seeing 12% value increase as HS2 work progresses."
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-green-400 font-bold">+12% growth</span>
                <span className="text-gray-400">Eastside District</span>
              </div>
            </div>
          </div>
          
          {/* Local agent endorsement */}
          <div className="mt-16 text-center">
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-xl text-white italic mb-4">
                "LandVest has become essential for our Birmingham land transactions. Their planning intelligence consistently outperforms our in-house research team."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">KS</span>
                </div>
                <div className="text-left">
                  <h4 className="text-white font-bold">Kate Stevenson</h4>
                  <p className="text-gray-400">Senior Partner, Birmingham Land Associates</p>
                  <p className="text-yellow-400 text-sm">25+ years Birmingham property experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Sold Properties Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">
              Recently Sold Through <span className="gradient-text">LandVest</span>
            </h2>
            <p className="text-gray-300">
              Completed transactions this quarter - proving market demand
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="premium-card rounded-xl p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-white">Bordesley Street Plot</h4>
                  <p className="text-sm text-gray-400">0.6 acres • Digbeth</p>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  SOLD
                </span>
              </div>
              <p className="text-2xl font-bold text-green-400 mb-2">£425,000</p>
              <p className="text-xs text-gray-400">Sold 3 days after listing</p>
            </div>
            
            <div className="premium-card rounded-xl p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-white">Warstone Lane Site</h4>
                  <p className="text-sm text-gray-400">0.4 acres • Jewellery Quarter</p>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  SOLD
                </span>
              </div>
              <p className="text-2xl font-bold text-green-400 mb-2">£380,000</p>
              <p className="text-xs text-gray-400">Multiple offers received</p>
            </div>
            
            <div className="premium-card rounded-xl p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-white">Curzon Street Adjacent</h4>
                  <p className="text-sm text-gray-400">1.1 acres • Eastside</p>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  SOLD
                </span>
              </div>
              <p className="text-2xl font-bold text-green-400 mb-2">£675,000</p>
              <p className="text-xs text-gray-400">Above asking price</p>
            </div>
            
            <div className="premium-card rounded-xl p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-white">Summer Hill Terrace</h4>
                  <p className="text-sm text-gray-400">0.8 acres • Edgbaston</p>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  SOLD
                </span>
              </div>
              <p className="text-2xl font-bold text-green-400 mb-2">£520,000</p>
              <p className="text-xs text-gray-400">Planning pre-approved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Birmingham Investment Guide Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900/10 to-yellow-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Birmingham Area <span className="gradient-text">Investment Guides</span>
            </h2>
            <p className="text-xl text-gray-300">
              Deep local knowledge to help you choose the right Birmingham district
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass rounded-2xl p-6 hover-lift cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Digbeth Deep Dive</h3>
              <p className="text-gray-300 text-sm mb-4">Creative Quarter transformation, HS2 impact, planning trends</p>
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold">47 active plots</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            
            <div className="glass rounded-2xl p-6 hover-lift cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Crown className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Jewellery Quarter Guide</h3>
              <p className="text-gray-300 text-sm mb-4">Conservation area rules, heritage considerations, premium pricing</p>
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold">23 active plots</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            
            <div className="glass rounded-2xl p-6 hover-lift cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Eastside Enterprise Zone</h3>
              <p className="text-gray-300 text-sm mb-4">Business rates relief, development incentives, tech hub growth</p>
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold">31 active plots</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            
            <div className="glass rounded-2xl p-6 hover-lift cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Trees className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Edgbaston Residential</h3>
              <p className="text-gray-300 text-sm mb-4">Premium residential development, university proximity, family homes</p>
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold">28 active plots</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Social Proof & Market Opportunity */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900/10 to-yellow-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold text-sm">BIRMINGHAM MARKET ALERT</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              HS2 Completion in <span className="gradient-text">18 Months</span> - Land Values Surging
            </h3>
            <p className="text-gray-300 mb-6">
              Birmingham investors are securing plots now before Curzon Street Station opens. 
              <span className="text-yellow-400 font-medium"> Early investors seeing 26.4% annual returns.</span>
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>73 plots sold this quarter</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>£12.3M deals completed in Q4</span>
              </div>
            </div>
            
            {/* Birmingham-specific testimonial */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white italic">"Found my Digbeth plot through LandVest 8 months ago. Planning approved last week - property value up £85k already."</p>
              <p className="text-sm text-gray-400 mt-2">- Sarah Chen, Birmingham Property Developer</p>
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

          <div className="grid md:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div className="premium-card rounded-2xl p-8 hover-lift relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-green-400 to-emerald-600 text-black text-sm font-bold rounded-full">
                  FREE FOREVER
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 mt-2">Explorer</h3>
              <p className="text-gray-400 mb-6">Perfect for getting started</p>
              <p className="text-4xl font-black gradient-text mb-1">£0</p>
              <p className="text-sm text-gray-400 mb-6">forever</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>3 searches per month</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Basic property details</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>1 planning report/month</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Email price alerts</span>
                </li>
              </ul>
              
              <button className="w-full py-3 btn-premium rounded-lg font-bold text-black">
                Start Free Now
              </button>
            </div>

            {/* Starter Plan */}
            <div className="premium-card rounded-2xl p-8 hover-lift">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-gray-400 mb-6">For regular searchers</p>
              <p className="text-4xl font-black text-white mb-1">£49</p>
              <p className="text-sm text-gray-400 mb-6">/month</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>15 searches per month</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Advanced filters</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>5 planning reports/month</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Basic portfolio tracking</span>
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
                  <span className="font-medium">Planning Intelligence System</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Unlimited property searches</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Advanced market analytics</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Portfolio tracking dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Priority support & alerts</span>
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

      {/* Enhanced Professional Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-950 border-t border-white/10">
        {/* Newsletter Section */}
        <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Stay Ahead of Birmingham's Land Market</h3>
              <p className="text-gray-300 mb-6">Get weekly market insights, new property alerts, and exclusive investment opportunities</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 transition"
                />
                <button className="btn-premium px-6 py-3 rounded-lg font-bold text-black whitespace-nowrap">
                  Get Updates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 blur-lg opacity-60"></div>
                    <span className="relative text-2xl font-black text-white">
                      Land<span className="gradient-text">Vest</span>
                    </span>
                  </div>
                  <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-black rounded-full">
                    BETA
                  </span>
                </div>
                <p className="text-gray-300 mb-6 max-w-md">
                  The UK's first dedicated platform for intelligent land investment. Making Birmingham's £8.2T land market accessible to everyone.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-yellow-400 hover:bg-white/20 transition">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-yellow-400 hover:bg-white/20 transition">
                    <Users className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-yellow-400 hover:bg-white/20 transition">
                    <FileText className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Platform Links */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Platform</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Property Search</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Planning Intelligence</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Portfolio Tracking</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Market Reports</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Birmingham Data</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Investment Guide</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Planning Process</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Legal Compliance</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">API Documentation</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Help Center</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Careers</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Press Kit</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Contact</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Partner with Us</a></li>
                </ul>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>FCA Authorization Pending</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Lock className="w-4 h-4 text-green-400" />
                    <span>Bank-Grade Security</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Database className="w-4 h-4 text-green-400" />
                    <span>GDPR Compliant</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Birmingham • United Kingdom • Est. 2024
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-950">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 LandVest Ltd. All rights reserved. Company Registration: England & Wales.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-yellow-400 transition">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-yellow-400 transition">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-yellow-400 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}