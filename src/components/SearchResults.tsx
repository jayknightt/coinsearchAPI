import React from 'react';
import { CryptoData } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SearchResultsProps {
  results: CryptoData[];
  isLoading: boolean;
  onCoinClick: (coin: CryptoData) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading, onCoinClick }) => {
  if (isLoading) {
    return <div className="mt-8 text-center">Loading...</div>;
  }

  if (results.length === 0) {
    return <div className="mt-8 text-center">No results found</div>;
  }

  return (
    <div className="mt-8">
      {results.map((crypto) => (
        <div 
          key={crypto.id} 
          className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => onCoinClick(crypto)}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">{crypto.name} ({crypto.symbol})</h2>
            <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Price:</p>
              <p className="font-medium">${crypto.current_price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">24h Change:</p>
              <p className={`font-medium flex items-center ${crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {crypto.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-600">Market Cap:</p>
              <p className="font-medium">${crypto.market_cap.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">24h Volume:</p>
              <p className="font-medium">${crypto.total_volume.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;