import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { cities } from '../data/cities';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (city: typeof cities[0]) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelect }) => {
    const [search, setSearch] = useState('');

    const filteredCities = useMemo(() => {
        return cities.filter(c =>
            c.city.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-neutral-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Add City</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input
                        type="text"
                        placeholder="Search city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                        autoFocus
                    />
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {filteredCities.map((city) => (
                        <button
                            key={city.city}
                            onClick={() => {
                                onSelect(city);
                                onClose();
                                setSearch('');
                            }}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
                        >
                            <span className="text-2xl">{city.flag}</span>
                            <span className="text-white/80 group-hover:text-white transition-colors">{city.city}</span>
                        </button>
                    ))}
                    {filteredCities.length === 0 && (
                        <div className="text-center py-8 text-white/30">
                            No cities found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
