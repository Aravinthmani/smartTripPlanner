import React from 'react';
import { Lightbulb, DollarSign, Clock, Utensils, Camera } from 'lucide-react';

interface LocalTipsProps {
  destination: string;
  tripType: string;
}

const LocalTips: React.FC<LocalTipsProps> = ({ destination, tripType }) => {
  const getGeneralTips = () => [
    {
      category: 'Money & Tipping',
      icon: DollarSign,
      tips: [
        'Tipping is customary at 15-20% for restaurants',
        'Many places accept credit cards, but carry some cash',
        'ATMs are widely available throughout the city',
        'Consider notifying your bank of travel plans'
      ]
    },
    {
      category: 'Best Times to Visit',
      icon: Clock,
      tips: [
        'Museums are less crowded on weekday mornings',
        'Restaurants typically open for dinner at 5-6 PM',
        'Rush hour is 7-9 AM and 5-7 PM - plan accordingly',
        'Many attractions offer early bird or sunset discounts'
      ]
    },
    {
      category: 'Food & Dining',
      icon: Utensils,
      tips: [
        'Try the local specialty dishes - ask locals for recommendations',
        'Food trucks and local markets offer authentic, affordable meals',
        'Make dinner reservations in advance for popular restaurants',
        'Happy hour typically runs 4-7 PM at most bars'
      ]
    },
    {
      category: 'Photography & Etiquette',
      icon: Camera,
      tips: [
        'Always ask permission before photographing people',
        'Some museums and religious sites prohibit photography',
        'Golden hour (sunrise/sunset) offers the best lighting',
        'Respect local customs and dress codes at religious sites'
      ]
    }
  ];

  const getTripSpecificTips = () => {
    const tripSpecificTips = {
      adventure: [
        'Pack layers for changing weather conditions',
        'Book adventure activities in advance',
        'Check weather conditions before outdoor activities',
        'Inform someone of your adventure plans'
      ],
      business: [
        'Research local business customs and etiquette',
        'Arrive early for meetings to account for traffic',
        'Have business cards translated if needed',
        'Dress conservatively for business meetings'
      ],
      romantic: [
        'Make dinner reservations at romantic restaurants',
        'Book couples activities and spa treatments early',
        'Research sunset viewing spots',
        'Consider hiring a photographer for special moments'
      ],
      family: [
        'Research family-friendly restaurants and activities',
        'Pack entertainment for travel time',
        'Look for hotels with family amenities',
        'Plan shorter activity periods for younger children'
      ],
      leisure: [
        'Take time to explore neighborhoods on foot',
        'Don\'t over-schedule - leave time for spontaneous discoveries',
        'Try local transportation for an authentic experience',
        'Visit local markets for unique souvenirs'
      ]
    };

    return tripSpecificTips[tripType as keyof typeof tripSpecificTips] || [];
  };

  const generalTips = getGeneralTips();
  const specificTips = getTripSpecificTips();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
        Local Tips for {destination}
        {tripType && (
          <span className="ml-2 text-sm text-gray-500 font-normal">
            ({tripType} trip)
          </span>
        )}
      </h3>
      
      <div className="space-y-6">
        {generalTips.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div key={index}>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <IconComponent className="w-4 h-4 mr-2 text-blue-500" />
                {section.category}
              </h4>
              <ul className="space-y-2">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="text-gray-600 text-sm flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* Trip-specific tips */}
        {specificTips.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-purple-500" />
              {tripType ? `${tripType.charAt(0).toUpperCase() + tripType.slice(1)} Trip Tips` : 'Trip-Specific Tips'}
            </h4>
            <ul className="space-y-2">
              {specificTips.map((tip, tipIndex) => (
                <li key={tipIndex} className="text-gray-600 text-sm flex items-start">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Pro Tip:</strong> Download offline maps and translation apps before you travel. 
          Having backup plans for activities helps when weather doesn't cooperate!
        </p>
      </div>
    </div>
  );
};

export default LocalTips;