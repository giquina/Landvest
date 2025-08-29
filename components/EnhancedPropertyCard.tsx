'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, MapPin, Shield, Brain, Clock, Users, 
  AlertTriangle, CheckCircle, XCircle, FileText, 
  Calendar, DollarSign, BarChart3, Download, Share2,
  Eye, Star, Building2, Zap, Target, Award, Info
} from 'lucide-react';

interface PropertyData {
  id: number;
  title: string;
  price: string;
  size: string;
  location: string;
  planningStatus: string;
  planningSuccessScore: number;
  roiProjection: {
    percentage: number;
    timeframe: string;
    confidence: number;
  };
  riskIndicators: {
    flood: 'low' | 'medium' | 'high';
    access: 'good' | 'requires_easement' | 'restricted';
    contamination: 'none' | 'historical' | 'current';
    infrastructure: 'ready' | 'planned' | 'limited';
  };
  investmentGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  viewerCount: number;
  offerCount: number;
  nearbyApprovals: {
    total: number;
    approved: number;
  };
  keyMetrics: {
    pricePerAcre: string;
    distanceToHS2: string;
    councilArea: string;
    zoningType: string;
  };
  documents: {
    titleDeeds: boolean;
    planningDocs: boolean;
    environmentalReport: boolean;
    surveyReport: boolean;
  };
}

interface EnhancedPropertyCardProps {
  property: PropertyData;
  onViewDetails?: () => void;
}

export default function EnhancedPropertyCard({ property, onViewDetails }: EnhancedPropertyCardProps) {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [saved, setSaved] = useState(false);

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'low': case 'none': case 'good': case 'ready': return 'text-green-400';
      case 'medium': case 'requires_easement': case 'planned': return 'text-yellow-400';
      case 'high': case 'restricted': case 'current': case 'limited': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'from-green-400 to-emerald-600';
      case 'B': return 'from-blue-400 to-blue-600';
      case 'C': return 'from-yellow-400 to-amber-600';
      case 'D': return 'from-orange-400 to-orange-600';
      case 'F': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="relative group">
      {/* Main Card */}
      <div className="premium-card rounded-2xl p-6 hover-lift transition-all duration-500">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">{property.title}</h3>
              {property.offerCount > 2 && (
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full animate-pulse">
                  🔥 HOT
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {property.location}
              </span>
              <span>{property.size}</span>
            </div>
          </div>
          
          {/* Investment Grade Badge */}
          <div className="relative">
            <div className={`w-16 h-16 bg-gradient-to-br ${getGradeColor(property.investmentGrade)} rounded-xl flex items-center justify-center shadow-lg`}>
              <span className="text-2xl font-black text-white">{property.investmentGrade}</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-black/80 text-xs text-white px-2 py-1 rounded-full">
              Grade
            </div>
          </div>
        </div>

        {/* Planning Intelligence Score */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-xl p-4 mb-4 border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-green-400" />
              <span className="text-sm font-bold text-white">Planning Success Probability</span>
            </div>
            <span className="text-2xl font-black text-green-400">{property.planningSuccessScore}%</span>
          </div>
          <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all duration-1000"
              style={{ width: `${property.planningSuccessScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Based on {property.nearbyApprovals.approved}/{property.nearbyApprovals.total} similar applications approved nearby
          </p>
        </div>

        {/* ROI Projection */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-amber-600/10 rounded-xl p-4 mb-4 border border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-bold text-white">ROI Projection</span>
              </div>
              <p className="text-xs text-gray-400">{property.roiProjection.timeframe}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black gradient-text">
                {property.roiProjection.percentage}x
              </p>
              <p className="text-xs text-gray-400">
                {property.roiProjection.confidence}% confidence
              </p>
            </div>
          </div>
        </div>

        {/* Risk Indicators */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-white/5 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Flood Risk</span>
              <CheckCircle className={`w-4 h-4 ${getRiskColor(property.riskIndicators.flood)}`} />
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Access</span>
              {property.riskIndicators.access === 'requires_easement' ? (
                <AlertTriangle className={`w-4 h-4 ${getRiskColor(property.riskIndicators.access)}`} />
              ) : (
                <CheckCircle className={`w-4 h-4 ${getRiskColor(property.riskIndicators.access)}`} />
              )}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Contamination</span>
              {property.riskIndicators.contamination === 'none' ? (
                <CheckCircle className={`w-4 h-4 ${getRiskColor(property.riskIndicators.contamination)}`} />
              ) : (
                <XCircle className={`w-4 h-4 ${getRiskColor(property.riskIndicators.contamination)}`} />
              )}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Infrastructure</span>
              <Zap className={`w-4 h-4 ${getRiskColor(property.riskIndicators.infrastructure)}`} />
            </div>
          </div>
        </div>

        {/* Price and Key Metrics */}
        <div className="border-t border-white/10 pt-4 mb-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-3xl font-black gradient-text">{property.price}</p>
              <p className="text-sm text-gray-400">{property.keyMetrics.pricePerAcre}/acre</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">{property.planningStatus}</p>
              <p className="text-xs text-green-400">{property.keyMetrics.distanceToHS2} to HS2</p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-gray-400">
              <Eye className="w-4 h-4" />
              {property.viewerCount} viewing
            </span>
            <span className="flex items-center gap-1 text-yellow-400">
              <Users className="w-4 h-4" />
              {property.offerCount} offers
            </span>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={`p-2 rounded-lg transition ${saved ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/10 text-gray-400 hover:text-yellow-400'}`}
          >
            <Star className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-white text-sm font-medium"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-white text-sm font-medium">
            <Download className="w-4 h-4" />
            Due Diligence
          </button>
        </div>

        <button
          onClick={onViewDetails}
          className="w-full mt-3 btn-premium py-3 rounded-lg font-bold text-black flex items-center justify-center gap-2"
        >
          View Full Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Document Availability Indicators */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <FileText className={`w-4 h-4 ${property.documents.titleDeeds ? 'text-green-400' : 'text-gray-600'}`} />
            <span className="text-xs text-gray-400">Title</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className={`w-4 h-4 ${property.documents.environmentalReport ? 'text-green-400' : 'text-gray-600'}`} />
            <span className="text-xs text-gray-400">Environmental</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className={`w-4 h-4 ${property.documents.surveyReport ? 'text-green-400' : 'text-gray-600'}`} />
            <span className="text-xs text-gray-400">Survey</span>
          </div>
        </div>
      </div>

      {/* Analytics Overlay */}
      {showAnalytics && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg rounded-2xl p-6 z-10 animate-slide-up">
          <button
            onClick={() => setShowAnalytics(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>
          
          <h4 className="text-lg font-bold text-white mb-4">Market Analytics</h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Market Trend</span>
              <span className="text-sm text-green-400">↑ 12% YoY</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Similar Sales (3mo)</span>
              <span className="text-sm text-white">8 properties</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Avg. Days on Market</span>
              <span className="text-sm text-white">21 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Council Tax Band</span>
              <span className="text-sm text-white">TBD Post-Development</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
            <p className="text-xs text-blue-400 font-medium">Birmingham Council Insight</p>
            <p className="text-sm text-white mt-1">High approval rate for similar developments in this ward</p>
          </div>
        </div>
      )}
    </div>
  );
}
