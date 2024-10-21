import axios from 'axios';
import { CryptoData } from '../types';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const searchCrypto = async (query: string): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { query }
    });

    const coinIds = response.data.coins.slice(0, 5).map((coin: any) => coin.id);

    const detailedResponse = await axios.get(`${API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: coinIds.join(','),
        order: 'market_cap_desc',
        per_page: 5,
        page: 1,
        sparkline: false
      }
    });

    return detailedResponse.data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
};