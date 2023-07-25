// components/Ticker.tsx

import Card from "./Card";

interface TickerProps {
  data: {
    symbol: string;
    priceChange: string;
    priceChangePercent: string;
    weightedAvgPrice: string;
    openPrice: string;
    highPrice: string;
    lowPrice: string;
    lastPrice: string;
    volume: string;
    quoteVolume: string;
    openTime: number;
    closeTime: number;
    firstId: number;
    lastId: number;
    count: number;
  }; 
}

const Ticker = ({ data }: TickerProps) => (
    <div className="p-4 bg-white shadow rounded overflow-hidden">
      <h2 className="font-bold mb-2 text-xl text-blue-500">Ticker Data:</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value], i) => (
          <Card key={i} label={key} value={value} />
        ))}
      </div>
    </div>
  );

export default Ticker;
