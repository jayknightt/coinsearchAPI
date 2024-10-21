import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import CoinModal from './components/CoinModal';
import { searchCrypto } from './api/cryptoApi';
import { CryptoData } from './types';

function App() {
  const [searchResults, setSearchResults] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<CryptoData | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchCrypto(query);
      setSearchResults(results);
      if (results.length === 0) {
        setError('No results found. Please try a different search term.');
      }
    } catch (error) {
      setError('An error occurred while searching. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoinClick = (coin: CryptoData) => {
    setSelectedCoin(coin);
  };

  const handleCloseModal = () => {
    setSelectedCoin(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600 flex items-center justify-center">
          <Search className="mr-2" size={36} />
          CoinSearch
        </h1>
        <div className="flex justify-between items-center mb-6">
          <SearchBar onSearch={handleSearch} />
          <a
            href="https://futppdzha6o.typeform.com/to/pIbZXfyv"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors duration-200"
          >
            Request Demo <ExternalLink size={18} className="ml-2" />
          </a>
        </div>
        {error && (
          <div className="mt-4 text-red-600 text-center">{error}</div>
        )}
        <SearchResults 
          results={searchResults} 
          isLoading={isLoading} 
          onCoinClick={handleCoinClick}
        />
      </div>
      {selectedCoin && (
        <CoinModal coin={selectedCoin} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;