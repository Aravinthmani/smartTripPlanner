import React from 'react';
import { Car, Train, Plane, Bus, MapPin, ExternalLink } from 'lucide-react';

interface TransportationInfoProps {
  destination: string;
}

const TransportationInfo: React.FC<TransportationInfoProps> = ({ destination }) => {
  const transportOptions = [
    {
      type: 'Airport Shuttle',
      icon: Plane,
      description: 'Direct shuttle service from airport to city center',
      cost: '$25-35',
      duration: '45 mins',
      booking: `https://www.google.com/search?q=${encodeURIComponent(destination + ' airport shuttle booking')}`
    },
    {
      type: 'Taxi/Rideshare',
      icon: Car,
      description: 'Uber, Lyft, and local taxi services available',
      cost: '$30-50',
      duration: '30-40 mins',
      booking: 'https://uber.com'
    },
    {
      type: 'Public Transit',
      icon: Train,
      description: 'Metro, bus, and train connections throughout the city',
      cost: '$2-5 per ride',
      duration: 'Varies',
      booking: `https://www.google.com/search?q=${encodeURIComponent(destination + ' public transportation map')}`
    },
    {
      type: 'Car Rental',
      icon: Car,
      description: 'Multiple rental agencies available at airport and downtown',
      cost: '$40-80/day',
      duration: 'Full day access',
      booking: 'https://www.kayak.com/cars'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Bus className="w-5 h-5 mr-2 text-blue-600" />
        Transportation Options in {destination}
      </h3>
      <div className="space-y-4">
        {transportOptions.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <IconComponent className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{option.type}</h4>
                    <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Cost: {option.cost}</span>
                      <span>Duration: {option.duration}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={option.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                >
                  Book
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransportationInfo;