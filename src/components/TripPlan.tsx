import React from 'react';
import { MapPin, Clock, DollarSign, Star, ArrowLeft, ExternalLink } from 'lucide-react';
import { TripData } from './TripForm';
import WeatherWidget from './WeatherWidget';
import PackingChecklist from './PackingChecklist';
import TransportationInfo from './TransportationInfo';
import EmergencyContacts from './EmergencyContacts';
import TripSharing from './TripSharing';
import LocalTips from './LocalTips';

interface TripPlanProps {
  tripData: TripData;
  onBack: () => void;
}

const TripPlan: React.FC<TripPlanProps> = ({ tripData, onBack }) => {
  const getDays = () => {
    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const days = getDays();

  // Function to generate Google Maps link
  const getGoogleMapsLink = (location: string) => {
    const encodedLocation = encodeURIComponent(`${location}, ${tripData.destination}`);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  };

  // Get budget info for display and calculations
  const getBudgetInfo = () => {
    if (tripData.budget === 'custom' && tripData.customBudget) {
      return {
        display: `$${tripData.customBudget.toLocaleString()}`,
        amount: tripData.customBudget,
        category: tripData.customBudget < 1500 ? 'budget' : tripData.customBudget < 3000 ? 'mid-range' : 'luxury'
      };
    }
    
    const budgetRanges = {
      budget: { display: '$500-$1,500', amount: 1000, category: 'budget' },
      'mid-range': { display: '$1,500-$3,000', amount: 2250, category: 'mid-range' },
      luxury: { display: '$3,000+', amount: 4000, category: 'luxury' }
    };
    
    return budgetRanges[tripData.budget as keyof typeof budgetRanges] || budgetRanges.budget;
  };

  const budgetInfo = getBudgetInfo();

  // Mock data based on trip parameters
  const hotels = [
    {
      name: `${tripData.destination} Grand Hotel`,
      rating: 4.8,
      price: budgetInfo.category === 'luxury' ? 450 : budgetInfo.category === 'mid-range' ? 250 : 120,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
      description: 'Luxury accommodation in the heart of the city with stunning views.',
      address: 'Downtown District'
    },
    {
      name: `${tripData.destination} Boutique Inn`,
      rating: 4.5,
      price: budgetInfo.category === 'luxury' ? 320 : budgetInfo.category === 'mid-range' ? 180 : 85,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Free WiFi', 'Breakfast', 'Pet-friendly', 'Parking'],
      description: 'Charming boutique hotel with personalized service and unique character.',
      address: 'Historic Quarter'
    }
  ];

  const activities = [
    {
      day: 1,
      title: `Welcome to ${tripData.destination}`,
      activities: [
        { name: 'Airport Transfer', time: '10:00 AM', cost: 35, location: `${tripData.destination} Airport` },
        { name: 'City Walking Tour', time: '2:00 PM', cost: 45, location: 'City Center' },
        { name: 'Welcome Dinner', time: '7:00 PM', cost: budgetInfo.category === 'luxury' ? 125 : budgetInfo.category === 'mid-range' ? 85 : 45, location: 'Main Street Restaurant District' }
      ]
    },
    {
      day: 2,
      title: 'Cultural Exploration',
      activities: [
        { name: 'Museum Visit', time: '9:00 AM', cost: 25, location: `${tripData.destination} National Museum` },
        { name: 'Local Market Tour', time: '11:30 AM', cost: 15, location: 'Central Market' },
        { name: 'Traditional Cooking Class', time: '3:00 PM', cost: budgetInfo.category === 'luxury' ? 125 : budgetInfo.category === 'mid-range' ? 75 : 45, location: 'Culinary Arts Center' }
      ]
    },
    {
      day: 3,
      title: 'Adventure Day',
      activities: [
        { name: 'Scenic Tour', time: '8:00 AM', cost: budgetInfo.category === 'luxury' ? 150 : budgetInfo.category === 'mid-range' ? 95 : 65, location: `${tripData.destination} Scenic Overlook` },
        { name: 'Local Lunch', time: '12:30 PM', cost: budgetInfo.category === 'luxury' ? 55 : budgetInfo.category === 'mid-range' ? 35 : 25, location: 'Waterfront District' },
        { name: 'Sunset Viewing', time: '6:00 PM', cost: 25, location: 'Sunset Point' }
      ]
    }
  ];

  const totalHotelCost = hotels[0].price * days;
  const totalActivityCost = activities.reduce((sum, day) => 
    sum + day.activities.reduce((daySum, activity) => daySum + activity.cost, 0), 0
  );
  const totalCost = totalHotelCost + totalActivityCost;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Planning
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Trip to {tripData.destination}</h1>
              <p className="text-xl text-white/90">
                {new Date(tripData.startDate).toLocaleDateString()} - {new Date(tripData.endDate).toLocaleDateString()}
              </p>
              <p className="text-white/80 mt-2">
                {tripData.travelers} {tripData.travelers === 1 ? 'traveler' : 'travelers'} • {days} days • Budget: {budgetInfo.display}
              </p>
              <a
                href={getGoogleMapsLink(tripData.destination)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
              >
                <MapPin className="w-4 h-4 mr-2" />
                View {tripData.destination} on Maps
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${totalCost.toLocaleString()}</p>
              <p className="text-white/80">Total estimated cost</p>
              {tripData.budget === 'custom' && tripData.customBudget && (
                <p className="text-sm text-white/70 mt-1">
                  {totalCost <= tripData.customBudget ? '✅ Within budget' : '⚠️ Over budget'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Weather and Trip Sharing Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <WeatherWidget 
            destination={tripData.destination}
            startDate={tripData.startDate}
            endDate={tripData.endDate}
          />
          <TripSharing tripData={tripData} />
        </div>

        {/* Hotels Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-blue-600" />
            Recommended Hotels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${hotel.image})` }}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{hotel.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{hotel.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{hotel.address}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${hotel.price}</span>
                      <span className="text-gray-600 ml-2">per night</span>
                    </div>
                    <a
                      href={getGoogleMapsLink(hotel.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      View on Maps
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-blue-600" />
            Your Itinerary
          </h2>
          <div className="space-y-8">
            {activities.map((day, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {day.day}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{day.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{activity.name}</span>
                        <span className="text-green-600 font-bold">${activity.cost}</span>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center mb-2">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.time}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {activity.location}
                        </p>
                        <a
                          href={getGoogleMapsLink(activity.location)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transportation and Packing Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TransportationInfo destination={tripData.destination} />
          <PackingChecklist 
            tripType={tripData.tripType}
            destination={tripData.destination}
            days={days}
          />
        </div>

        {/* Local Tips and Emergency Contacts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LocalTips 
            destination={tripData.destination}
            tripType={tripData.tripType}
          />
          <EmergencyContacts destination={tripData.destination} />
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
            Cost Breakdown
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-700">Accommodation ({days} nights)</span>
              <span className="font-semibold text-gray-900">${totalHotelCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-700">Activities & Experiences</span>
              <span className="font-semibold text-gray-900">${totalActivityCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3 text-lg font-bold">
              <span className="text-gray-900">Total Estimated Cost</span>
              <span className="text-blue-600">${totalCost.toLocaleString()}</span>
            </div>
            {tripData.budget === 'custom' && tripData.customBudget && (
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-gray-600">Your Budget</span>
                <span className="text-gray-600">${tripData.customBudget.toLocaleString()}</span>
              </div>
            )}
            {tripData.budget === 'custom' && tripData.customBudget && (
              <div className="flex justify-between items-center py-2 text-sm font-medium">
                <span className="text-gray-700">
                  {totalCost <= tripData.customBudget ? 'Remaining Budget' : 'Over Budget'}
                </span>
                <span className={totalCost <= tripData.customBudget ? 'text-green-600' : 'text-red-600'}>
                  {totalCost <= tripData.customBudget ? '+' : ''}${(tripData.customBudget - totalCost).toLocaleString()}
                </span>
              </div>
            )}
            <p className="text-sm text-gray-600 mt-4">
              * Prices are estimates and may vary based on season, availability, and specific preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlan;