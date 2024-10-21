import React from 'react';
import { CryptoData } from '../types';
import { X, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';

interface CoinModalProps {
  coin: CryptoData;
  onClose: () => void;
}

const CoinModal: React.FC<CoinModalProps> = ({ coin, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Current Price:</p>
            <p className="text-xl font-semibold">${coin.current_price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">24h Change:</p>
            <p className={`text-xl font-semibold flex items-center ${coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {coin.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="w-5 h-5 mr-1" />
              ) : (
                <TrendingDown className="w-5 h-5 mr-1" />
              )}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-gray-600">Market Cap:</p>
            <p className="text-xl font-semibold">${coin.market_cap.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">24h Volume:</p>
            <p className="text-xl font-semibold">${coin.total_volume.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Market Cap Rank:</p>
            <p className="text-xl font-semibold">#{coin.market_cap_rank}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <a
            href={`https://www.coingecko.com/en/coins/${coin.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            Learn More <ExternalLink size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CoinModal;