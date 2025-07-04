import React from 'react';
import { Phone, Shield, MapPin, AlertTriangle, Globe } from 'lucide-react';

interface EmergencyContactsProps {
  destination: string;
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ destination }) => {
  // Function to get country-specific emergency information
  const getCountryEmergencyInfo = (destination: string) => {
    const destinationLower = destination.toLowerCase();
    
    // Country-specific emergency numbers
    const countryEmergencyNumbers = {
      // India
      india: {
        emergency: '112',
        police: '100',
        fire: '101',
        medical: '108',
        tourist: '1363',
        embassy: '+91-11-2419-8000'
      },
      // United States
      usa: {
        emergency: '911',
        police: '911',
        fire: '911',
        medical: '911',
        tourist: '311',
        embassy: 'N/A'
      },
      // United Kingdom
      uk: {
        emergency: '999',
        police: '999',
        fire: '999',
        medical: '999',
        tourist: '101',
        embassy: '+44-20-7499-9000'
      },
      // Canada
      canada: {
        emergency: '911',
        police: '911',
        fire: '911',
        medical: '911',
        tourist: '311',
        embassy: '+1-613-238-5335'
      },
      // Australia
      australia: {
        emergency: '000',
        police: '000',
        fire: '000',
        medical: '000',
        tourist: '1800-803-772',
        embassy: '+61-2-6214-5600'
      },
      // Germany
      germany: {
        emergency: '112',
        police: '110',
        fire: '112',
        medical: '112',
        tourist: '115',
        embassy: '+49-30-8305-0'
      },
      // France
      france: {
        emergency: '112',
        police: '17',
        fire: '18',
        medical: '15',
        tourist: '3975',
        embassy: '+33-1-43-12-22-22'
      },
      // Japan
      japan: {
        emergency: '110/119',
        police: '110',
        fire: '119',
        medical: '119',
        tourist: '050-3816-2787',
        embassy: '+81-3-3224-5000'
      },
      // China
      china: {
        emergency: '110/119/120',
        police: '110',
        fire: '119',
        medical: '120',
        tourist: '12301',
        embassy: '+86-10-8531-3000'
      },
      // Thailand
      thailand: {
        emergency: '191',
        police: '191',
        fire: '199',
        medical: '1669',
        tourist: '1672',
        embassy: '+66-2-205-4000'
      },
      // Singapore
      singapore: {
        emergency: '999',
        police: '999',
        fire: '995',
        medical: '995',
        tourist: '1800-736-2000',
        embassy: '+65-6476-9100'
      },
      // UAE
      uae: {
        emergency: '999',
        police: '999',
        fire: '997',
        medical: '998',
        tourist: '800-4438',
        embassy: '+971-2-414-2200'
      },
      // South Korea
      'south korea': {
        emergency: '112/119',
        police: '112',
        fire: '119',
        medical: '119',
        tourist: '1330',
        embassy: '+82-2-397-4114'
      },
      // Brazil
      brazil: {
        emergency: '190',
        police: '190',
        fire: '193',
        medical: '192',
        tourist: '136',
        embassy: '+55-61-3312-7000'
      },
      // Mexico
      mexico: {
        emergency: '911',
        police: '911',
        fire: '911',
        medical: '911',
        tourist: '078',
        embassy: '+52-55-5080-2000'
      },
      // Italy
      italy: {
        emergency: '112',
        police: '113',
        fire: '115',
        medical: '118',
        tourist: '1518',
        embassy: '+39-06-4674-1'
      },
      // Spain
      spain: {
        emergency: '112',
        police: '091',
        fire: '080',
        medical: '061',
        tourist: '902-102-112',
        embassy: '+34-91-587-2200'
      },
      // Netherlands
      netherlands: {
        emergency: '112',
        police: '0900-8844',
        fire: '112',
        medical: '112',
        tourist: '14-020',
        embassy: '+31-70-310-2209'
      },
      // Switzerland
      switzerland: {
        emergency: '112',
        police: '117',
        fire: '118',
        medical: '144',
        tourist: '163',
        embassy: '+41-31-357-7011'
      },
      // Russia
      russia: {
        emergency: '112',
        police: '102',
        fire: '101',
        medical: '103',
        tourist: '8-800-200-0200',
        embassy: '+7-495-728-5000'
      },
      // Turkey
      turkey: {
        emergency: '112',
        police: '155',
        fire: '110',
        medical: '112',
        tourist: '174',
        embassy: '+90-312-455-5555'
      }
    };

    // Try to match destination with country
    for (const [country, numbers] of Object.entries(countryEmergencyNumbers)) {
      if (destinationLower.includes(country) || 
          destinationLower.includes(country.replace(' ', '')) ||
          (country === 'usa' && (destinationLower.includes('america') || destinationLower.includes('states'))) ||
          (country === 'uk' && (destinationLower.includes('britain') || destinationLower.includes('england') || destinationLower.includes('london'))) ||
          (country === 'uae' && (destinationLower.includes('dubai') || destinationLower.includes('emirates')))) {
        return { country: country.toUpperCase(), ...numbers };
      }
    }

    // Default to international emergency numbers if country not found
    return {
      country: 'INTERNATIONAL',
      emergency: '112',
      police: '112',
      fire: '112',
      medical: '112',
      tourist: 'Contact local authorities',
      embassy: 'Contact nearest embassy'
    };
  };

  const emergencyNumbers = getCountryEmergencyInfo(destination);

  const emergencyInfo = [
    {
      service: 'Emergency Services',
      number: emergencyNumbers.emergency,
      description: 'All emergency services (Police, Fire, Medical)',
      icon: AlertTriangle,
      color: 'text-red-500',
      priority: 'high'
    },
    {
      service: 'Police',
      number: emergencyNumbers.police,
      description: 'Police assistance and crime reporting',
      icon: Shield,
      color: 'text-blue-500',
      priority: 'high'
    },
    {
      service: 'Medical Emergency',
      number: emergencyNumbers.medical,
      description: 'Ambulance and medical emergency services',
      icon: Phone,
      color: 'text-green-500',
      priority: 'high'
    },
    {
      service: 'Fire Department',
      number: emergencyNumbers.fire,
      description: 'Fire emergency and rescue services',
      icon: AlertTriangle,
      color: 'text-orange-500',
      priority: 'medium'
    },
    {
      service: 'Tourist Helpline',
      number: emergencyNumbers.tourist,
      description: 'Tourist assistance and information',
      icon: Globe,
      color: 'text-purple-500',
      priority: 'low'
    },
    {
      service: 'Embassy/Consulate',
      number: emergencyNumbers.embassy,
      description: 'Consular services for your country citizens',
      icon: MapPin,
      color: 'text-indigo-500',
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 hover:bg-red-600';
      case 'medium': return 'bg-orange-500 hover:bg-orange-600';
      case 'low': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-red-600" />
          Emergency Contacts
        </h3>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {emergencyNumbers.country}
        </div>
      </div>
      
      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800 font-medium">
          📍 Emergency numbers for {destination}
        </p>
        <p className="text-xs text-red-700 mt-1">
          Save these numbers in your phone before traveling. In case of emergency, call immediately.
        </p>
      </div>

      <div className="space-y-3">
        {emergencyInfo.map((contact, index) => {
          const IconComponent = contact.icon;
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <IconComponent className={`w-5 h-5 mr-3 ${contact.color}`} />
                  <div>
                    <h4 className="font-semibold text-gray-900">{contact.service}</h4>
                    <p className="text-gray-600 text-sm">{contact.description}</p>
                  </div>
                </div>
                <a
                  href={`tel:${contact.number.replace(/[^\d+]/g, '')}`}
                  className={`px-4 py-2 text-white text-sm rounded-lg transition-colors font-medium ${getPriorityColor(contact.priority)}`}
                >
                  {contact.number}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-3">
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            <strong>Important:</strong> Save these numbers in your phone before traveling. Consider purchasing travel insurance for additional protection.
          </p>
        </div>
        
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> When calling emergency services, clearly state your location, the nature of the emergency, and that you are a tourist if applicable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;