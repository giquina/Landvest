'use client';

import React, { useState } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, 
  Droplets, Map, Factory, Zap, Trees, Home,
  FileText, Scale, TrendingUp, Info, ChevronRight,
  AlertCircle, Activity, BarChart3
} from 'lucide-react';

interface RiskAssessmentProps {
  propertyId?: string;
  location?: string;
}

interface RiskFactor {
  category: string;
  level: 'low' | 'medium' | 'high';
  score: number;
  details: string;
  mitigation?: string;
  icon: React.ReactNode;
}

export default function RiskAssessmentDashboard({ propertyId, location = 'Birmingham' }: RiskAssessmentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const riskFactors: RiskFactor[] = [
    {
      category: 'Flood Risk',
      level: 'low',
      score: 15,
      details: 'Property is in Flood Zone 1 - very low probability of flooding',
      mitigation: 'Standard insurance coverage recommended',
      icon: <Droplets className="w-5 h-5" />
    },
    {
      category: 'Planning Risk',
      level: 'medium',
      score: 45,
      details: 'Conservation area restrictions apply, requiring additional approvals',
      mitigation: 'Engage heritage consultant early in planning process',
      icon: <FileText className="w-5 h-5" />
    },
    {
      category: 'Contamination',
      level: 'low',
      score: 20,
      details: 'No historical industrial use recorded on site',
      mitigation: 'Phase 1 environmental assessment recommended',
      icon: <Factory className="w-5 h-5" />
    },
    {
      category: 'Access Rights',
      level: 'medium',
      score: 40,
      details: 'Shared access road requires easement agreement',
      mitigation: 'Legal review of access rights needed before purchase',
      icon: <Map className="w-5 h-5" />
    },
    {
      category: 'Infrastructure',
      level: 'low',
      score: 25,
      details: 'All utilities available at site boundary',
      mitigation: 'Confirm capacity with utility providers',
      icon: <Zap className="w-5 h-5" />
    },
    {
      category: 'Market Risk',
      level: 'low',
      score: 30,
      details: 'Strong demand in Birmingham, HS2 driving growth',
      mitigation: 'Monitor market conditions quarterly',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      category: 'Environmental',
      level: 'low',
      score: 20,
      details: 'No protected species or habitats identified',
      mitigation: 'Ecological survey recommended pre-development',
      icon: <Trees className="w-5 h-5" />
    },
    {
      category: 'Legal Title',
      level: 'low',
      score: 10,
      details: 'Clear freehold title with no restrictions',
      mitigation: 'Standard conveyancing process',
      icon: <Scale className="w-5 h-5" />
    }
  ];

  const overallRiskScore = Math.round(
    riskFactors.reduce((sum, factor) => sum + factor.score, 0) / riskFactors.length
  );

  const getOverallRiskLevel = () => {
    if (overallRiskScore < 30) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (overallRiskScore < 60) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    return { level: 'High', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'low': return { text: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' };
      case 'medium': return { text: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
      case 'high': return { text: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' };
      default: return { text: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30' };
    }
  };

  const overallRisk = getOverallRiskLevel();

  return (
    <div className="glass rounded-3xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Risk Assessment</h2>
            <p className="text-sm text-gray-400">Comprehensive due diligence analysis</p>
          </div>
        </div>
        <div className={`px-4 py-2 ${overallRisk.bg} rounded-full`}>
          <span className={`text-sm font-bold ${overallRisk.color}`}>
            Overall Risk: {overallRisk.level}
          </span>
        </div>
      </div>

      {/* Overall Risk Score */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Combined Risk Score</h3>
            <p className="text-sm text-gray-400">Based on 8 key risk factors</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black gradient-text">{overallRiskScore}</div>
            <div className="text-xs text-gray-400">out of 100</div>
          </div>
        </div>
        
        {/* Risk Score Bar */}
        <div className="relative h-8 bg-black/30 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="w-1/3 bg-gradient-to-r from-green-600 to-green-500"></div>
            <div className="w-1/3 bg-gradient-to-r from-yellow-600 to-yellow-500"></div>
            <div className="w-1/3 bg-gradient-to-r from-red-600 to-red-500"></div>
          </div>
          <div 
            className="absolute top-0 left-0 h-full bg-white/20 backdrop-blur-sm"
            style={{ width: `${100 - overallRiskScore}%` }}
          ></div>
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-1 h-12 bg-white shadow-lg"
            style={{ left: `${overallRiskScore}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Low Risk (0-30)</span>
          <span>Medium Risk (30-60)</span>
          <span>High Risk (60-100)</span>
        </div>
      </div>

      {/* Risk Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {riskFactors.map((factor) => {
          const colors = getRiskColor(factor.level);
          return (
            <div
              key={factor.category}
              onClick={() => setSelectedCategory(factor.category)}
              className={`${colors.bg} ${colors.border} border rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={colors.text}>{factor.icon}</div>
                <span className={`text-xl font-bold ${colors.text}`}>{factor.score}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{factor.category}</h4>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${colors.text} bg-current`}></div>
                <span className={`text-xs ${colors.text} capitalize`}>{factor.level} Risk</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Category Details */}
      {selectedCategory && (
        <div className="bg-white/5 rounded-2xl p-6 mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">{selectedCategory} - Detailed Analysis</h3>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          {riskFactors
            .filter(f => f.category === selectedCategory)
            .map(factor => (
              <div key={factor.category}>
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-300 mb-2">{factor.details}</p>
                    {factor.mitigation && (
                      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <p className="text-xs font-bold text-green-400 mb-1">Mitigation Strategy:</p>
                        <p className="text-xs text-gray-300">{factor.mitigation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Key Recommendations */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Priority Actions
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">Legal Review Required</p>
              <p className="text-xs text-gray-400">Verify access rights and easement agreements</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">Heritage Consultation</p>
              <p className="text-xs text-gray-400">Conservation area requires specialist planning advice</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">Environmental Survey</p>
              <p className="text-xs text-gray-400">Phase 1 assessment to confirm no contamination</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 btn-premium py-3 rounded-lg font-bold text-black flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" />
          Download Full Report
        </button>
        <button className="flex-1 glass py-3 rounded-lg font-bold text-white border border-white/20 hover:bg-white/10 transition flex items-center justify-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Compare Properties
        </button>
      </div>

      {/* Birmingham Market Alert */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-green-400 mb-1">Birmingham Market Advantage</p>
            <p className="text-xs text-gray-300">
              Properties in this area have a 73% planning approval rate. 
              The upcoming HS2 station reduces market risk significantly with guaranteed infrastructure investment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
