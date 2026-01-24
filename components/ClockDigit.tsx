
import React, { useEffect, useState } from 'react';

interface ClockDigitProps {
  value: string;
  isNeon: boolean;
}

const ClockDigit: React.FC<ClockDigitProps> = ({ value, isNeon }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  return (
    <div className={`relative flex items-center justify-center transition-all duration-300 ${isNeon ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-white'}`}>
      <span className={`font-digital text-6xl md:text-8xl lg:text-9xl font-bold transition-all duration-150 transform ${isAnimating ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}>
        {displayValue}
      </span>
    </div>
  );
};

export default ClockDigit;
