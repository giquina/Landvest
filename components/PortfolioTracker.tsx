'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, MapPin, 
  Calendar, FileText, Bell, BarChart3, PieChart,
  Clock, CheckCircle, AlertTriangle, Target,
  Download, Plus, Settings, Eye, Filter
} from 'lucide-react';

interface PortfolioProperty {
  id: number;
  title: string;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  size: string;
  planningStatus: string;
  nextMilestone: string;
  daysToMilestone: number;
  documents: number;
  alerts: number;
}

export default function PortfolioTracker() {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('6M');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  const portfolioStats = {
    totalValue: 2456000,
    totalGrowth: 24.3,
    monthlyGrowth: 2.1,
    properties: 5,
    planningApproved: 3,
    underDevelopment: 2,
    averageROI: 31.2,
    totalInvested: 1975000
  };

  const properties: PortfolioProperty[] = [
    {
      id: 1,
      title: "Digbeth Development Site",
      location: "0.8 acres, Creative Quarter",
      purchaseDate: "Jan 2024",
      purchasePrice: 485000,
      currentValue: 572000,
      size: "0.8 acres",
      planningStatus: "Approved",
      nextMilestone: "Construction Start",
      daysToMilestone: 45,
      documents: 23,
      alerts: 2
    },
    {
      id: 2,
      title: "Jewellery Quarter Plot",
      location: "0.5 acres, Conservation Area",
      purchaseDate: "Mar 2024",
      purchasePrice: 320000,
      currentValue: 358000,
      size: "0.5 acres",
      planningStatus: "Pending Decision",
      nextMilestone: "Planning Committee",
      daysToMilestone: 12,
      documents: 18,
      alerts: 1
    },
    {
      id: 3,
      title: "Eastside Business Land",
      location: "1.2 acres, Enterprise Zone",
      purchaseDate: "Nov 2023",
      purchasePrice: 625000,
      currentValue: 780000,
      size: "1.2 acres",
      planningStatus: "Approved",
      nextMilestone: "Phase 1 Complete",
      daysToMilestone: 30,
      documents: 31,
      alerts: 0
    }
  ];
  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />;
  };

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <div className="glass rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Portfolio Performance</h2>
              <p className="text-sm text-gray-400">Track your Birmingham land investments</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
              <Download className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-400" />
              <span className={`text-sm font-bold ${getGrowthColor(portfolioStats.totalGrowth)}`}>
                +{portfolioStats.totalGrowth}%
              </span>
            </div>
            <p className="text-3xl font-black text-white mb-1">
              £{(portfolioStats.totalValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-gray-400">Total Portfolio Value</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-xl p-6 border border-yellow-500/30">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-400">
                {portfolioStats.averageROI}%
              </span>
            </div>
            <p className="text-3xl font-black text-white mb-1">
              £{((portfolioStats.totalValue - portfolioStats.totalInvested) / 1000).toFixed(0)}k
            </p>
            <p className="text-sm text-gray-400">Total Profit</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-blue-400" />
              <span className="text-sm font-bold text-blue-400">60%</span>
            </div>
            <p className="text-3xl font-black text-white mb-1">
              {portfolioStats.planningApproved}/{portfolioStats.properties}
            </p>
            <p className="text-sm text-gray-400">Planning Approved</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <span className="text-sm font-bold text-purple-400">Monthly</span>
            </div>
            <p className="text-3xl font-black text-white mb-1">
              +{portfolioStats.monthlyGrowth}%
            </p>
            <p className="text-sm text-gray-400">Average Growth</p>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-2 mb-6">
          {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeframe === period
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Performance Chart Placeholder */}
        <div className="h-64 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 flex items-center justify-center">
          <div className="text-center">
            <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400">Interactive performance chart</p>
            <p className="text-xs text-gray-500">Showing {timeframe} performance</p>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="glass rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-white">Your Properties</h3>
          <button className="btn-premium px-4 py-2 rounded-lg font-bold text-black flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Property
          </button>
        </div>

        <div className="space-y-4">
          {properties.map(property => {
            const growth = ((property.currentValue - property.purchasePrice) / property.purchasePrice) * 100;
            const profit = property.currentValue - property.purchasePrice;
            
            return (
              <div
                key={property.id}
                className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition cursor-pointer"
                onClick={() => setSelectedProperty(property.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{property.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {property.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Purchased {property.purchaseDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black gradient-text">
                      £{(property.currentValue / 1000).toFixed(0)}k
                    </p>
                    <div className={`flex items-center gap-1 justify-end ${getGrowthColor(growth)}`}>
                      {getGrowthIcon(growth)}
                      <span className="text-sm font-bold">
                        {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Purchase Price</p>
                    <p className="text-sm font-bold text-white">
                      £{(property.purchasePrice / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Profit</p>
                    <p className={`text-sm font-bold ${getGrowthColor(profit)}`}>
                      £{(profit / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Planning</p>
                    <p className={`text-sm font-bold ${
                      property.planningStatus === 'Approved' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {property.planningStatus}
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Documents</p>
                    <p className="text-sm font-bold text-white flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {property.documents}
                    </p>
                  </div>
                </div>

                {/* Next Milestone */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm font-bold text-white">{property.nextMilestone}</p>
                      <p className="text-xs text-gray-400">Next milestone</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-400">{property.daysToMilestone}</p>
                    <p className="text-xs text-gray-400">days</p>
                  </div>
                </div>

                {/* Alerts */}
                {property.alerts > 0 && (
                  <div className="mt-3 flex items-center gap-2 p-2 bg-yellow-500/10 rounded-lg">
                    <Bell className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-yellow-400">
                      {property.alerts} new alert{property.alerts > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-3xl p-8">
        <h3 className="text-xl font-black text-white mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
            <FileText className="w-8 h-8 text-yellow-400 mb-2" />
            <p className="text-sm font-bold text-white">Generate Report</p>
            <p className="text-xs text-gray-400">Monthly performance</p>
          </button>
          <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
            <Bell className="w-8 h-8 text-blue-400 mb-2" />
            <p className="text-sm font-bold text-white">Set Alerts</p>
            <p className="text-xs text-gray-400">Price & planning updates</p>
          </button>
          <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
            <Eye className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-sm font-bold text-white">Market Watch</p>
            <p className="text-xs text-gray-400">Compare to market</p>
          </button>
          <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
            <Filter className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-sm font-bold text-white">Find Similar</p>
            <p className="text-xs text-gray-400">New opportunities</p>
          </button>
        </div>
      </div>
    </div>
  );
}
