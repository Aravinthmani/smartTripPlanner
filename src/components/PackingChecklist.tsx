import React, { useState } from 'react';
import { CheckSquare, Square, Package } from 'lucide-react';

interface PackingChecklistProps {
  tripType: string;
  destination: string;
  days: number;
}

const PackingChecklist: React.FC<PackingChecklistProps> = ({ tripType, destination, days }) => {
  const getPackingItems = () => {
    const baseItems = [
      'Passport/ID',
      'Travel insurance documents',
      'Phone charger',
      'Camera',
      'Comfortable walking shoes',
      'Weather-appropriate clothing',
      'Personal medications',
      'Toiletries',
      'Sunglasses',
      'Portable battery pack'
    ];

    const tripSpecificItems = {
      adventure: ['Hiking boots', 'Backpack', 'Water bottle', 'First aid kit', 'Outdoor gear'],
      beach: ['Swimwear', 'Beach towel', 'Sunscreen', 'Flip flops', 'Beach bag'],
      business: ['Business attire', 'Laptop', 'Business cards', 'Formal shoes', 'Presentation materials'],
      romantic: ['Nice dinner outfit', 'Perfume/cologne', 'Special occasion wear', 'Jewelry'],
      family: ['Entertainment for kids', 'Snacks', 'Extra clothes', 'Baby supplies (if needed)', 'Games/toys'],
      leisure: ['Casual wear', 'Comfortable shoes', 'Day pack', 'Entertainment items']
    };

    // If no trip type is specified, use general leisure items
    const specificItems = tripSpecificItems[tripType as keyof typeof tripSpecificItems] || tripSpecificItems.leisure;
    
    return [...baseItems, ...specificItems];
  };

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (item: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(item)) {
      newCheckedItems.delete(item);
    } else {
      newCheckedItems.add(item);
    }
    setCheckedItems(newCheckedItems);
  };

  const packingItems = getPackingItems();
  const completionRate = Math.round((checkedItems.size / packingItems.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Package className="w-5 h-5 mr-2 text-blue-600" />
          Packing Checklist
          {tripType && (
            <span className="ml-2 text-sm text-gray-500 font-normal">
              ({tripType} trip)
            </span>
          )}
        </h3>
        <div className="text-sm text-gray-600">
          {checkedItems.size}/{packingItems.length} items ({completionRate}%)
        </div>
      </div>
      
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {packingItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            onClick={() => toggleItem(item)}
          >
            {checkedItems.has(item) ? (
              <CheckSquare className="w-5 h-5 text-green-500 mr-3" />
            ) : (
              <Square className="w-5 h-5 text-gray-400 mr-3" />
            )}
            <span className={`${checkedItems.has(item) ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackingChecklist;