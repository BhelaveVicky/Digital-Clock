
import React, { useEffect, useState } from 'react';
import { WorldZone } from '../types';
import { getTimeInZone, formatTime } from '../utils/time';
import { Globe, X } from 'lucide-react';

interface WorldClockProps {
  zones: WorldZone[];
  is24Hour: boolean;
  onRemove: (id: string) => void;
}

const WorldClock: React.FC<WorldClockProps> = ({ zones, is24Hour, onRemove }) => {
  const [times, setTimes] = useState<Record<string, Date>>({});

  useEffect(() => {
    const tick = () => {
      const newTimes: Record<string, Date> = {};
      zones.forEach(z => {
        newTimes[z.id] = getTimeInZone(z.timezone);
      });
      setTimes(newTimes);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [zones]);

  if (zones.length === 0) return null;

  return (
    <div className="w-full mt-8 p-6 glass rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-2 mb-4 text-white/70">
        <Globe size={18} />
        <h3 className="font-semibold uppercase tracking-wider text-sm">World Times</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map(zone => {
          const t = times[zone.id] || new Date();
          const { hours, minutes, seconds, period } = formatTime(t, is24Hour);
          return (
            <div key={zone.id} className="relative group p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
              <button
                onClick={() => onRemove(zone.id)}
                className="absolute top-2 right-2 p-1 text-white/0 group-hover:text-white/40 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
              <div className="text-white/60 text-xs mb-2 uppercase font-medium tracking-wider">{zone.city}</div>
              <div className="font-digital text-3xl text-white flex items-baseline gap-1">
                <span>{hours}:{minutes}</span>
                <span className="text-base opacity-60 font-normal">{seconds}</span>
                {!is24Hour && <span className="text-xs ml-1 opacity-60 font-normal self-start mt-1">{period}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorldClock;
