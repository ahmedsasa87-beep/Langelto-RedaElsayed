
import React from 'react';
import { useApp } from '../AppContext';

const Ticker: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="bg-red-600 text-white py-1 overflow-hidden whitespace-nowrap z-50">
      <div className="inline-block animate-ticker">
        {settings.tickerTexts.map((text, idx) => (
          <span key={idx} className="mx-12 font-bold text-sm">
            ✨ {text} ✨
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
