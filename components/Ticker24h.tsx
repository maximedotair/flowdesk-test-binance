// components/Ticker24h.tsx

import Card from "./Card";

interface Ticker24hProps {
  data: {
    symbol: string;
    priceChange: string;
    priceChangePercent: string;
    weightedAvgPrice: string;
    prevClosePrice: string;
    lastPrice: string;
    lastQty: string;
    bidPrice: string;
    bidQty: string;
    askPrice: string;
    askQty: string;
    openPrice: string;
    highPrice: string;
    lowPrice: string;
    volume: string;
    quoteVolume: string;
    openTime: number;
    closeTime: number;
    firstId: number;
    lastId: number;
    count: number;
  };
}

const Ticker24h = ({ data }: Ticker24hProps) => 
  (
    <div className="p-4 bg-white shadow rounded mt-4 overflow-hidden">
      <h2 className="font-bold mb-2 text-xl text-blue-500">24h Ticker Data:</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value], i) => (
          <Card key={i} label={key} value={value} />
        ))}
      </div>
    </div>
  );


export default Ticker24h;
