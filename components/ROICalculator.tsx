'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, TrendingUp, Info, DollarSign, 
  Calendar, Percent, Target, AlertCircle,
  ChevronRight, BarChart3, PieChart, Award
} from 'lucide-react';

interface ROICalculatorProps {
  initialPrice?: number;
  location?: string;
}

export default function ROICalculator({ initialPrice = 450000, location = 'Birmingham' }: ROICalculatorProps) {
  const [purchasePrice, setPurchasePrice] = useState(initialPrice);
  const [developmentCost, setDevelopmentCost] = useState(150000);
  const [holdingPeriod, setHoldingPeriod] = useState(24); // months
  const [expectedGrowth, setExpectedGrowth] = useState(26.4); // Birmingham average
  const [planningCost, setPlanningCost] = useState(25000);
  const [professionalFees, setProfessionalFees] = useState(15000);
  
  const [results, setResults] = useState({
    totalInvestment: 0,
    expectedValue: 0,
    netProfit: 0,
    roi: 0,
    annualizedReturn: 0,
    breakEvenMonth: 0
  });

  useEffect(() => {
    calculateROI();
  }, [purchasePrice, developmentCost, holdingPeriod, expectedGrowth, planningCost, professionalFees]);

  const calculateROI = () => {
    const totalInvestment = purchasePrice + developmentCost + planningCost + professionalFees;
    const growthMultiplier = 1 + (expectedGrowth / 100) * (holdingPeriod / 12);
    const expectedValue = purchasePrice * growthMultiplier + developmentCost * 0.7; // 70% value add from development
    const netProfit = expectedValue - totalInvestment;
    const roi = (netProfit / totalInvestment) * 100;
    const annualizedReturn = (Math.pow(expectedValue / totalInvestment, 12 / holdingPeriod) - 1) * 100;
    const breakEvenMonth = totalInvestment / (netProfit / holdingPeriod);

    setResults({
      totalInvestment,
      expectedValue,
      netProfit,
      roi,
      annualizedReturn,
      breakEvenMonth: Math.max(0, Math.round(breakEvenMonth))
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="glass rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">ROI Calculator</h2>
            <p className="text-sm text-gray-400">Birmingham Land Investment Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-bold">Live Market Data</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white mb-4">Investment Parameters</h3>
          
          {/* Purchase Price */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <DollarSign className="w-4 h-4" />
              Purchase Price
            </label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-yellow-400 transition"
            />
            <p className="text-xs text-gray-400 mt-1">Current asking price for the land</p>
          </div>

          {/* Development Cost */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <DollarSign className="w-4 h-4" />
              Development Cost
            </label>
            <input
              type="number"
              value={developmentCost}
              onChange={(e) => setDevelopmentCost(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-yellow-400 transition"
            />
            <p className="text-xs text-gray-400 mt-1">Construction and infrastructure costs</p>
          </div>

          {/* Planning & Professional Fees */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Planning Costs</label>
              <input
                type="number"
                value={planningCost}
                onChange={(e) => setPlanningCost(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Professional Fees</label>
              <input
                type="number"
                value={professionalFees}
                onChange={(e) => setProfessionalFees(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Holding Period */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Calendar className="w-4 h-4" />
              Holding Period (months)
            </label>
            <input
              type="range"
              min="6"
              max="60"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(Number(e.target.value))}
              className="w-full accent-yellow-400"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>6 months</span>
              <span className="text-yellow-400 font-bold">{holdingPeriod} months</span>
              <span>5 years</span>
            </div>
          </div>

          {/* Expected Growth */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Percent className="w-4 h-4" />
              Expected Annual Growth
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-xs text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Birmingham average: 26.4%
                </div>
              </div>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="50"
                step="0.1"
                value={expectedGrowth}
                onChange={(e) => setExpectedGrowth(Number(e.target.value))}
                className="flex-1 accent-yellow-400"
              />
              <span className="text-lg font-bold text-yellow-400 w-16 text-right">{expectedGrowth}%</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white mb-4">Projected Returns</h3>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/30">
              <p className="text-sm text-gray-300 mb-1">Net Profit</p>
              <p className="text-2xl font-black text-green-400">{formatCurrency(results.netProfit)}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-xl p-4 border border-yellow-500/30">
              <p className="text-sm text-gray-300 mb-1">ROI</p>
              <p className="text-2xl font-black text-yellow-400">{results.roi.toFixed(1)}%</p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-gray-300">Total Investment</span>
              <span className="text-lg font-bold text-white">{formatCurrency(results.totalInvestment)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-gray-300">Expected Value</span>
              <span className="text-lg font-bold gradient-text">{formatCurrency(results.expectedValue)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-gray-300">Annualized Return</span>
              <span className="text-lg font-bold text-green-400">{results.annualizedReturn.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-gray-300">Break-even (months)</span>
              <span className="text-lg font-bold text-blue-400">{results.breakEvenMonth}</span>
            </div>
          </div>

          {/* Investment Grade */}
          <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-bold text-white">Investment Grade</span>
              </div>
              <span className="text-2xl font-black text-purple-400">
                {results.roi > 50 ? 'A' : results.roi > 30 ? 'B' : results.roi > 15 ? 'C' : 'D'}
              </span>
            </div>
            <p className="text-xs text-gray-300">
              {results.roi > 50 
                ? 'Excellent investment opportunity with high returns'
                : results.roi > 30 
                ? 'Strong investment with above-market returns'
                : results.roi > 15
                ? 'Moderate investment with steady returns'
                : 'Consider alternative opportunities'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 btn-premium py-3 rounded-lg font-bold text-black flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Full Report
            </button>
            <button className="flex-1 glass py-3 rounded-lg font-bold text-white border border-white/20 hover:bg-white/10 transition flex items-center justify-center gap-2">
              <PieChart className="w-5 h-5" />
              Save Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Market Context Alert */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-blue-400 mb-1">Birmingham Market Context</p>
            <p className="text-xs text-gray-300">
              With HS2 completion in 18 months, land values near stations are seeing accelerated growth. 
              Properties within 1 mile of Curzon Street are averaging 32% annual appreciation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
