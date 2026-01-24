
import React, { useState, useEffect, useCallback } from 'react';
import { Settings, Maximize2, Minimize2, Sparkles, Moon, Sun, Clock as ClockIcon, Plus } from 'lucide-react';
import { WorldZone, ClockSettings, ThemeMode } from './types';
import { formatTime, formatDate } from './utils/time';
import ClockDigit from './components/ClockDigit';
import WorldClock from './components/WorldClock';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [settings, setSettings] = useState<ClockSettings>({
    is24Hour: false,
    isNeon: true,
    theme: 'dark',
    showSeconds: true
  });
  const [worldZones, setWorldZones] = useState<WorldZone[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize
  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const addWorldZone = () => {
    const cities = [
      { city: 'London', tz: 'Europe/London' },
      { city: 'Tokyo', tz: 'Asia/Tokyo' },
      { city: 'New York', tz: 'America/New_York' },
      { city: 'Sydney', tz: 'Australia/Sydney' },
      { city: 'Dubai', tz: 'Asia/Dubai' }
    ];
    const pick = cities[Math.floor(Math.random() * cities.length)];
    if (!worldZones.some(z => z.city === pick.city)) {
      setWorldZones(prev => [...prev, { id: crypto.randomUUID(), city: pick.city, timezone: pick.tz }]);
    }
  };

  const { hours, minutes, seconds, period } = formatTime(time, settings.is24Hour);

  if (!isClient) return null;

  return (
    <div className={`min-h-screen transition-colors duration-700 animate-gradient flex flex-col items-center justify-center p-4 overflow-x-hidden ${settings.theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-blue-50 text-neutral-900'}`}
      style={{
        backgroundImage: settings.theme === 'dark'
          ? 'linear-gradient(-45deg, #0f172a, #1e1b4b, #312e81, #1e1b4b)'
          : 'linear-gradient(-45deg, #f0f9ff, #e0f2fe, #bae6fd, #e0f2fe)'
      }}
    >
      {/* Top Controls */}
      <div className="fixed top-6 right-6 flex items-center gap-3 z-50">
        <button
          onClick={() => setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}
          className="p-3 glass rounded-full hover:scale-110 active:scale-95 transition-all text-white/80 hover:text-white"
          title="Toggle Theme"
        >
          {settings.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} className="text-indigo-600" />}
        </button>
        <button
          onClick={() => setSettings(s => ({ ...s, isNeon: !s.isNeon }))}
          className={`p-3 glass rounded-full hover:scale-110 active:scale-95 transition-all ${settings.isNeon ? 'text-cyan-400' : 'text-white/80'}`}
          title="Toggle Neon"
        >
          <Sparkles size={20} />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-3 glass rounded-full hover:scale-110 active:scale-95 transition-all text-white/80 hover:text-white"
          title="Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      {/* Main Clock Card */}
      <main className="w-full max-w-4xl flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <div className={`w-full p-8 md:p-16 rounded-[40px] shadow-2xl transition-all duration-500 flex flex-col items-center ${settings.theme === 'dark' ? 'glass-dark' : 'bg-white/40 backdrop-blur-md border border-white/20'}`}>

          {/* Format Badge */}
          <div className="mb-8">
            <button
              onClick={() => setSettings(s => ({ ...s, is24Hour: !s.is24Hour }))}
              className="px-6 py-2 rounded-full glass text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-all border border-white/10"
            >
              {settings.is24Hour ? '24H Format' : '12H Format'}
            </button>
          </div>

          {/* Time Display */}
          <div className="flex items-center gap-2 md:gap-4 select-none">
            <ClockDigit value={hours[0]} isNeon={settings.isNeon} />
            <ClockDigit value={hours[1]} isNeon={settings.isNeon} />

            <div className={`font-digital text-5xl md:text-7xl font-light mb-4 transition-opacity duration-1000 ${time.getSeconds() % 2 === 0 ? 'opacity-100' : 'opacity-20'} ${settings.isNeon ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'text-white/40'}`}>
              :
            </div>

            <ClockDigit value={minutes[0]} isNeon={settings.isNeon} />
            <ClockDigit value={minutes[1]} isNeon={settings.isNeon} />

            {settings.showSeconds && (
              <>
                <div className={`font-digital text-5xl md:text-7xl font-light mb-4 transition-opacity duration-1000 ${time.getSeconds() % 2 === 0 ? 'opacity-100' : 'opacity-20'} ${settings.isNeon ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'text-white/40'}`}>
                  :
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1 opacity-80">
                    <ClockDigit value={seconds[0]} isNeon={settings.isNeon} />
                    <ClockDigit value={seconds[1]} isNeon={settings.isNeon} />
                  </div>
                </div>
              </>
            )}

            {!settings.is24Hour && (
              <div className="ml-4 flex flex-col justify-center items-center">
                <span className={`text-xl md:text-3xl font-digital font-bold ${settings.isNeon ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-white'}`}>
                  {period}
                </span>
              </div>
            )}
          </div>

          {/* Date Display */}
          <div className="mt-10 text-center">
            <h2 className={`text-lg md:text-2xl font-light tracking-[0.2em] uppercase opacity-70 ${settings.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {formatDate(time)}
            </h2>
          </div>
        </div>

        {/* Secondary Features Grid */}
        <div className="flex flex-col w-full mt-10 space-y-8">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex justify-between items-center mb-[-10px]">
              <h4 className="text-xs uppercase tracking-widest font-bold opacity-40 px-2">Global Tracking</h4>
              <button
                onClick={addWorldZone}
                className="text-[10px] uppercase tracking-wider bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-all"
              >
                + Add City
              </button>
            </div>
            <WorldClock
              zones={worldZones}
              is24Hour={settings.is24Hour}
              onRemove={(id) => setWorldZones(z => z.filter(x => x.id !== id))}
            />
          </div>


        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-16 mb-8 text-white/20 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <ClockIcon size={14} />
          <span className="text-xs font-medium tracking-widest uppercase">Lumina Pro Digital</span>
        </div>
        <div className="text-[10px] opacity-50">Precision engineered digital interface</div>
      </footer>
    </div>
  );
};

export default App;
