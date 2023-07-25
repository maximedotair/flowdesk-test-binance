import React, { useState } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Ticker from '../components/Ticker';
import Ticker24h from '../components/Ticker24h';
import Trades from '../components/Trades';

const IndexPage = () => {
  const [currencyPair, setCurrencyPair] = useState('');
  const [tickerData, setTickerData] = useState(null);
  const [ticker24hData, setTicker24hData] = useState(null);
  const [tradesData, setTradesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMarketData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const tickerResponse = await axios.get(`https://api.binance.com/api/v3/ticker?symbol=${currencyPair}`);
      const ticker24hResponse = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${currencyPair}`);
      const tradesResponse = await axios.get(`https://api.binance.com/api/v3/trades?symbol=${currencyPair}`);
  
      setTickerData(tickerResponse.data);
      setTicker24hData(ticker24hResponse.data);
      setTradesData(tradesResponse.data);
    } catch (error) {
      setError('Unable to fetch data. Please check the entered pair or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-5 p-5">
      <h1 className="text-2xl font-bold mb-5">Binance Market Data Viewer</h1>
      <form onSubmit={fetchMarketData} className="mb-5">
        <label htmlFor="currencyPair" className="block mb-2">Currency Pair</label>
        <input type="text" id="currencyPair" value={currencyPair} onChange={e => setCurrencyPair(e.target.value.toUpperCase())} className="border-2 border-gray-200 p-2 rounded w-64" placeholder='BTCUSDT'/>
      
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && tickerData && ticker24hData && tradesData &&
        <Tabs>
          <TabList>
            <Tab>Ticker</Tab>
            <Tab>24h Ticker</Tab>
            <Tab>Trades</Tab>
          </TabList>
          <TabPanel>
            <Ticker data={tickerData} />
          </TabPanel>
          <TabPanel>
            <Ticker24h data={ticker24hData} />
          </TabPanel>
          <TabPanel>
            <Trades data={tradesData} />
          </TabPanel>
        </Tabs>
      }
    </div>
  );
};

export default IndexPage;
