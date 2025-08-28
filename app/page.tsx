import { Search, MapPin, TrendingUp, Shield, Users, BarChart3, ArrowRight, CheckCircle, Building2, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-800">Land<span className="text-yellow-600">Vest</span></span>
              <span className="ml-2 text-xs text-gray-500 border border-gray-300 px-2 py-1 rounded">BETA</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-800 transition">Features</a>
              <a href="#birmingham" className="text-gray-700 hover:text-green-800 transition">Birmingham Focus</a>
              <a href="#pricing" className="text-gray-700 hover:text-green-800 transition">Pricing</a>
              <button className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">            <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Launching in Birmingham - 26.4% projected growth
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The UK's First AI-Powered<br />
              <span className="text-green-800">Land Investment</span> Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover profitable land opportunities with planning permission intelligence, 
              comprehensive data analysis, and investment-focused tools that Rightmove doesn't offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-green-800 border-2 border-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Trust Indicators */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-green-800">£8T</p>
              <p className="text-gray-600 text-sm">UK Land Market</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-800">40+</p>
              <p className="text-gray-600 text-sm">Data Sources Unified</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-800">87%</p>
              <p className="text-gray-600 text-sm">Planning Success Rate*</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-800">FCA</p>
              <p className="text-gray-600 text-sm">Regulated (Pending)</p>
            </div>
          </div>
        </div>
      </section>
      {/* Key Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Makes LandVest Different
            </h2>
            <p className="text-xl text-gray-600">
              Purpose-built for land investors, not homebuyers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Planning Permission AI */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Planning Permission AI</h3>
              <p className="text-gray-600 mb-4">
                Our #1 differentiator. Assess planning success likelihood using historical data and local trends.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Historical success rates by area</span>
                </li>                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Similar application outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Risk assessment scoring</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 - Comprehensive Data */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-yellow-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Land Data</h3>
              <p className="text-gray-600 mb-4">
                All relevant data in one place - currently scattered across 40+ platforms.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Legal & ownership details</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Environmental assessments</span>
                </li>                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Infrastructure impacts</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 - Investment Analytics */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Investment Analytics</h3>
              <p className="text-gray-600 mb-4">
                Professional tools for serious investors, not casual browsers.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">ROI calculators</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Comparable analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Portfolio tracking</span>
                </li>              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Birmingham Focus Section */}
      <section id="birmingham" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why We're Starting in Birmingham
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Birmingham offers the perfect combination of growth potential, 
                data availability, and investment opportunity.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-800 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Highest Growth Potential</h3>
                    <p className="text-gray-600">26.4% projected price growth - outperforming London and Manchester</p>
                  </div>
                </div>                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-800 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">HS2 & Infrastructure</h3>
                    <p className="text-gray-600">Major infrastructure investments driving land value increases</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-800 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Commonwealth Games Legacy</h3>
                    <p className="text-gray-600">Continued development and regeneration opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Birmingham Market Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Average Land Price</span>
                  <span className="font-semibold">£127/sq ft</span>
                </div>                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Annual Growth Rate</span>
                  <span className="font-semibold text-green-600">+12.3%</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Planning Success Rate</span>
                  <span className="font-semibold">73%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Opportunities</span>
                  <span className="font-semibold">2,847</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">
                Explore Birmingham Opportunities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Land Investment Strategy?
          </h2>          <p className="text-xl mb-8 text-green-100">
            Join forward-thinking investors who are already using data-driven insights to find profitable opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2">
              Start Your Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 backdrop-blur text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition">
              Schedule Demo
            </button>
          </div>
          <p className="mt-6 text-sm text-green-200">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white font-bold text-xl mb-4">Land<span className="text-yellow-500">Vest</span></p>
            <p className="text-sm">© 2024 LandVest. All rights reserved. FCA authorization pending.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}