import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Compass, Plus, X } from 'lucide-react';

interface TripFormProps {
  onSubmit: (tripData: TripData) => void;
}

export interface TripData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  customBudget?: number;
  tripType: string;
  interests: string[];
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TripData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    customBudget: undefined,
    tripType: '',
    interests: []
  });

  const [customInterest, setCustomInterest] = useState('');
  const [showCustomInterest, setShowCustomInterest] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBudgetChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      budget: value,
      customBudget: value === 'custom' ? prev.customBudget : undefined
    }));
  };

  const handleCustomBudgetChange = (value: string) => {
    const numValue = value === '' ? undefined : parseInt(value);
    setFormData(prev => ({
      ...prev,
      customBudget: numValue
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !formData.interests.includes(customInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, customInterest.trim()]
      }));
      setCustomInterest('');
      setShowCustomInterest(false);
    }
  };

  const handleRemoveCustomInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const predefinedInterests = [
    'Culture & History', 'Adventure', 'Food & Dining', 'Shopping', 
    'Nightlife', 'Nature', 'Museums', 'Beach', 'Photography', 'Architecture'
  ];

  const customInterests = formData.interests.filter(interest => !predefinedInterests.includes(interest));

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-white/20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <Compass className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Perfect Trip</h2>
        <p className="text-gray-600">Tell us about your dream destination and we'll create a personalized itinerary</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              Destination
            </label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
              placeholder="Where would you like to go?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-2" />
              Number of Travelers
            </label>
            <select
              value={formData.travelers}
              onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'traveler' : 'travelers'}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <DollarSign className="inline w-4 h-4 mr-2" />
              Budget Range
            </label>
            <select
              value={formData.budget}
              onChange={(e) => handleBudgetChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
              required
            >
              <option value="">Select budget range</option>
              <option value="budget">Budget ($500-$1,500)</option>
              <option value="mid-range">Mid-range ($1,500-$3,000)</option>
              <option value="luxury">Luxury ($3,000+)</option>
              <option value="custom">Custom Amount</option>
            </select>
            
            {formData.budget === 'custom' && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Enter your budget amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={formData.customBudget || ''}
                    onChange={(e) => handleCustomBudgetChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                    placeholder="Enter amount"
                    min="0"
                    required={formData.budget === 'custom'}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter your total trip budget in USD
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trip Type 
              <span className="text-xs text-gray-500 font-normal ml-1">(Optional)</span>
            </label>
            <select
              value={formData.tripType}
              onChange={(e) => setFormData({...formData, tripType: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              <option value="">Select trip type (optional)</option>
              <option value="leisure">Leisure</option>
              <option value="business">Business</option>
              <option value="adventure">Adventure</option>
              <option value="romantic">Romantic</option>
              <option value="family">Family</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Help us customize your experience based on your travel style
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">What are you interested in?</label>
          
          {/* Predefined Interests */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            {predefinedInterests.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  formData.interests.includes(interest)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          {/* Custom Interests Display */}
          {customInterests.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Your custom interests:</p>
              <div className="flex flex-wrap gap-2">
                {customInterests.map(interest => (
                  <div
                    key={interest}
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomInterest(interest)}
                      className="ml-2 text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Custom Interest */}
          {!showCustomInterest ? (
            <button
              type="button"
              onClick={() => setShowCustomInterest(true)}
              className="inline-flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Interest
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                placeholder="Enter your interest..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomInterest();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomInterest}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomInterest(false);
                  setCustomInterest('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Create My Trip Plan
        </button>
      </form>
    </div>
  );
};

export default TripForm;