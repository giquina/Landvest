'use client';

import React, { useState } from 'react';
import { 
  Users, MessageSquare, TrendingUp, Award, 
  Star, ThumbsUp, Share2, BookOpen, Calendar,
  DollarSign, MapPin, CheckCircle, Crown,
  Briefcase, Building2, Filter, Search,
  ArrowRight, Clock, Eye, Heart
} from 'lucide-react';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  authorRole: string;
  avatar: string;
  content: string;
  category: string;
  replies: number;
  likes: number;
  views: number;
  timestamp: string;
  isPinned?: boolean;
  isExpert?: boolean;
}

interface DealSyndication {
  id: number;
  title: string;
  location: string;
  totalValue: string;
  minInvestment: string;
  investorsNeeded: number;
  investorsJoined: number;
  deadline: string;
  expectedReturn: string;
  organizer: string;
  verified: boolean;
}

interface Expert {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  hourlyRate: string;
  availability: string;
  verified: boolean;
}

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState<'forum' | 'syndication' | 'experts'>('forum');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const forumPosts: ForumPost[] = [
    {
      id: 1,
      title: "HS2 Impact on Digbeth Land Values - My Analysis",
      author: "Sarah Chen",
      authorRole: "Property Developer",
      avatar: "SC",
      content: "After analyzing 47 transactions near Curzon Street...",
      category: "Market Analysis",
      replies: 23,
      likes: 156,
      views: 1247,
      timestamp: "2 hours ago",
      isPinned: true,
      isExpert: true
    },
    {
      id: 2,
      title: "Planning Permission Success - Jewellery Quarter Tips",
      author: "Michael Phillips",
      authorRole: "Planning Consultant",
      avatar: "MP",
      content: "Just got approval for my 3rd site in JQ. Here's what worked...",
      category: "Planning",
      replies: 45,
      likes: 289,
      views: 3421,
      timestamp: "5 hours ago",
      isExpert: true
    },
    {
      id: 3,
      title: "First-time investor - Need advice on Eastside plots",
      author: "James Wilson",
      authorRole: "New Investor",
      avatar: "JW",
      content: "Looking at 3 plots near Millennium Point. Budget £400k...",
      category: "Advice",
      replies: 12,
      likes: 34,
      views: 567,
      timestamp: "1 day ago"
    }
  ];

  const dealSyndications: DealSyndication[] = [
    {
      id: 1,
      title: "Digbeth Creative Quarter Development",
      location: "0.8 acres, Digbeth",
      totalValue: "£850,000",
      minInvestment: "£50,000",
      investorsNeeded: 10,
      investorsJoined: 7,
      deadline: "5 days",
      expectedReturn: "35% (24 months)",
      organizer: "Birmingham Property Syndicate",
      verified: true
    },
    {
      id: 2,
      title: "Jewellery Quarter Mixed-Use Site",
      location: "0.5 acres, JQ",
      totalValue: "£620,000",
      minInvestment: "£25,000",
      investorsNeeded: 15,
      investorsJoined: 11,
      deadline: "12 days",
      expectedReturn: "28% (18 months)",
      organizer: "West Midlands Investment Group",
      verified: true
    }
  ];

  const experts: Expert[] = [
    {
      id: 1,
      name: "Kate Stevenson",
      specialty: "Planning Applications",
      rating: 4.9,
      reviews: 127,
      hourlyRate: "£150",
      availability: "Available",
      verified: true
    },
    {
      id: 2,
      name: "David Kumar",
      specialty: "Environmental Assessments",
      rating: 4.8,
      reviews: 89,
      hourlyRate: "£120",
      availability: "Busy - 3 day wait",
      verified: true
    },
    {
      id: 3,
      name: "Emma Thompson",
      specialty: "Legal Due Diligence",
      rating: 5.0,
      reviews: 156,
      hourlyRate: "£200",
      availability: "Available",
      verified: true
    }
  ];

  return (
    <div className="glass rounded-3xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Community Hub</h2>
            <p className="text-sm text-gray-400">Connect with 1,247 Birmingham investors</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400 font-bold">89 Online Now</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab('forum')}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeTab === 'forum' 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Forum
        </button>
        <button
          onClick={() => setActiveTab('syndication')}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeTab === 'syndication' 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <DollarSign className="w-4 h-4 inline mr-2" />
          Deal Syndication
        </button>
        <button
          onClick={() => setActiveTab('experts')}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeTab === 'experts' 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <Award className="w-4 h-4 inline mr-2" />
          Expert Network
        </button>
      </div>

      {/* Forum Tab */}
      {activeTab === 'forum' && (
        <div>
          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['All', 'Market Analysis', 'Planning', 'Advice', 'Success Stories', 'HS2 Updates'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat.toLowerCase().replace(' ', '-'))}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === cat.toLowerCase().replace(' ', '-') || (cat === 'All' && selectedCategory === 'all')
                    ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Forum Posts */}
          <div className="space-y-4">
            {forumPosts.map(post => (
              <div key={post.id} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition cursor-pointer">
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    post.isExpert ? 'bg-gradient-to-br from-yellow-400 to-amber-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'
                  }`}>
                    <span className="text-sm font-bold text-white">{post.avatar}</span>
                  </div>
                  
                  {/* Post Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                          {post.title}
                          {post.isPinned && <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">PINNED</span>}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            {post.isExpert && <Crown className="w-4 h-4 text-yellow-400" />}
                            {post.author}
                          </span>
                          <span>•</span>
                          <span>{post.authorRole}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                        {post.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <button className="flex items-center gap-1 text-gray-400 hover:text-yellow-400 transition">
                        <ThumbsUp className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition">
                        <MessageSquare className="w-4 h-4" />
                        {post.replies} replies
                      </button>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Eye className="w-4 h-4" />
                        {post.views} views
                      </span>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition ml-auto">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full mt-6 py-3 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition">
            Load More Posts
          </button>
        </div>
      )}

      {/* Deal Syndication Tab */}
      {activeTab === 'syndication' && (
        <div>
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
            <p className="text-sm text-blue-400 font-bold mb-1">What is Deal Syndication?</p>
            <p className="text-xs text-gray-300">
              Pool resources with other investors to access larger opportunities. Share due diligence costs and reduce individual risk.
            </p>
          </div>

          <div className="space-y-4">
            {dealSyndications.map(deal => (
              <div key={deal.id} className="premium-card rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      {deal.title}
                      {deal.verified && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {deal.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Closes in {deal.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black gradient-text">{deal.totalValue}</p>
                    <p className="text-sm text-gray-400">Total Value</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Min Investment</p>
                    <p className="text-lg font-bold text-white">{deal.minInvestment}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Expected Return</p>
                    <p className="text-lg font-bold text-green-400">{deal.expectedReturn}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Investors</p>
                    <p className="text-lg font-bold text-yellow-400">
                      {deal.investorsJoined}/{deal.investorsNeeded}
                    </p>
                  </div>
                </div>

                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full"
                    style={{ width: `${(deal.investorsJoined / deal.investorsNeeded) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Organized by <span className="text-white font-medium">{deal.organizer}</span>
                  </p>
                  <button className="btn-premium px-6 py-2 rounded-lg font-bold text-black text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expert Network Tab */}
      {activeTab === 'experts' && (
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experts.map(expert => (
              <div key={expert.id} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {expert.verified && (
                    <div className="px-2 py-1 bg-green-500/20 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{expert.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{expert.specialty}</p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(expert.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill={i < Math.floor(expert.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {expert.rating} ({expert.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-bold gradient-text">{expert.hourlyRate}/hr</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    expert.availability === 'Available' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {expert.availability}
                  </span>
                </div>

                <button className="w-full py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition text-sm font-medium">
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
