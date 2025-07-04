import { useState} from 'react';
import { DollarSign, Compass, Globe, MapPin } from 'lucide-react';
import TripForm, { TripData } from './components/TripForm';
import TripPlan from './components/TripPlan';

function App() {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [showPlan, setShowPlan] = useState(false);

  const handleTripSubmit = (data: TripData) => {
    setTripData(data);
    setShowPlan(true);
  };

  const handleBack = () => {
    setShowPlan(false);
  };

  if (showPlan && tripData) {
    return <TripPlan tripData={tripData} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SmartTripPlanner
                </h1>
                <p className="text-xs text-gray-600">Your Perfect Trip Awaits</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                Personalized Itineraries
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Local Insights
              </span>
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Smart Budgeting
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Perfect Trip
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Awaits Discovery
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Create personalized travel itineraries with detailed recommendations, accurate pricing, and local insights. 
            Turn your wanderlust into unforgettable adventures.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Globe className="w-4 h-4 mr-2 text-blue-500" />
              AI-Powered Planning
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 mr-2 text-purple-500" />
              Local Expert Tips
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <DollarSign className="w-4 h-4 mr-2 text-green-500" />
              Budget Optimization
            </div>
          </div>
        </div>
      </div>

      {/* Trip Form */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <TripForm onSubmit={handleTripSubmit} />
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose SmartTripPlanner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Recommendations</h3>
              <p className="text-gray-600">Get customized suggestions based on your preferences, budget, and travel style using advanced AI algorithms.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Budget Planning</h3>
              <p className="text-gray-600">Get detailed cost breakdowns and stay within budget with our intelligent pricing optimization.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Insider Knowledge</h3>
              <p className="text-gray-600">Access authentic local tips, hidden gems, and cultural insights for an immersive travel experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SmartTripPlanner
              </span>
            </div>
            <p className="text-gray-300 text-lg mb-4">
              Crafting unforgettable journeys, one trip at a time.
            </p>
            <div className="border-t border-gray-700 pt-6 mt-6">
              <p className="text-gray-400 text-sm mb-2">
                © 2025 SmartTripPlanner. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Developed with by <span className="text-blue-400 font-medium">Aravinth</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;