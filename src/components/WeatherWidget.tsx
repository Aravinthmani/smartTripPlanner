import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer } from 'lucide-react';

interface WeatherWidgetProps {
  destination: string;
  startDate: string;
  endDate: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ destination, startDate, endDate }) => {
  // Mock weather data - in a real app, this would come from a weather API
  const weatherData = [
    { date: startDate, temp: 75, condition: 'sunny', icon: Sun, desc: 'Sunny' },
    { date: new Date(new Date(startDate).getTime() + 86400000).toISOString().split('T')[0], temp: 72, condition: 'cloudy', icon: Cloud, desc: 'Partly Cloudy' },
    { date: new Date(new Date(startDate).getTime() + 172800000).toISOString().split('T')[0], temp: 68, condition: 'rainy', icon: CloudRain, desc: 'Light Rain' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Thermometer className="w-5 h-5 mr-2 text-blue-600" />
        Weather Forecast for {destination}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weatherData.map((day, index) => {
          const IconComponent = day.icon;
          return (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              <IconComponent className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold text-gray-900">{day.temp}°F</p>
              <p className="text-sm text-gray-600">{day.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherWidget;