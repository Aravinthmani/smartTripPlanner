import React, { useState } from 'react';
import { Share2, Copy, Mail, MessageSquare, Check } from 'lucide-react';
import { TripData } from './TripForm';

interface TripSharingProps {
  tripData: TripData;
}

const TripSharing: React.FC<TripSharingProps> = ({ tripData }) => {
  const [copied, setCopied] = useState(false);

  const generateShareableLink = () => {
    // In a real app, this would generate a unique shareable link
    return `${window.location.origin}/trip/${btoa(JSON.stringify(tripData))}`;
  };

  const generateTripSummary = () => {
    return `🌟 Check out my upcoming trip to ${tripData.destination}!\n\n📅 ${new Date(tripData.startDate).toLocaleDateString()} - ${new Date(tripData.endDate).toLocaleDateString()}\n👥 ${tripData.travelers} travelers\n🎯 Interests: ${tripData.interests.join(', ')}\n\nPlanned with our amazing trip planner! ✈️`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareableLink());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`My Trip to ${tripData.destination}`);
    const body = encodeURIComponent(`${generateTripSummary()}\n\nView full itinerary: ${generateShareableLink()}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaSMS = () => {
    const message = encodeURIComponent(`${generateTripSummary()}\n\n${generateShareableLink()}`);
    window.open(`sms:?body=${message}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Share2 className="w-5 h-5 mr-2 text-blue-600" />
        Share Your Trip
      </h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Trip Summary:</p>
          <p className="text-gray-800 whitespace-pre-line">{generateTripSummary()}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyToClipboard}
            className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          
          <button
            onClick={shareViaEmail}
            className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </button>
          
          <button
            onClick={shareViaSMS}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            SMS
          </button>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          Share your trip itinerary with friends and family to keep them informed about your travel plans.
        </div>
      </div>
    </div>
  );
};

export default TripSharing;