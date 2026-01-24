
import React, { useState } from 'react';
import { Alarm } from '../types';
import { Bell, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface AlarmSectionProps {
  alarms: Alarm[];
  onAdd: (time: string, label: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const AlarmSection: React.FC<AlarmSectionProps> = ({ alarms, onAdd, onDelete, onToggle }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTime, setNewTime] = useState('08:00');
  const [newLabel, setNewLabel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newTime, newLabel || 'Alarm');
    setNewLabel('');
    setIsAdding(false);
  };

  return (
    <div className="w-full mt-6 p-6 glass rounded-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white/70">
          <Bell size={18} />
          <h3 className="font-semibold uppercase tracking-wider text-sm">Alarms</h3>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
        >
          <Plus size={18} />
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col gap-3">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-cyan-500 transition-colors"
              required
            />
            <input
              type="text"
              placeholder="Label (optional)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-lg p-2 text-white placeholder:text-white/30 outline-none focus:border-cyan-500 transition-colors"
            />
            <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 rounded-lg transition-all">
              Save Alarm
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {alarms.map(alarm => (
          <div key={alarm.id} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${alarm.isEnabled ? 'bg-white/10' : 'bg-white/5 opacity-50'}`}>
            <div>
              <div className="font-digital text-2xl text-white">{alarm.time}</div>
              <div className="text-xs text-white/60">{alarm.label}</div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onToggle(alarm.id)} className="text-white/60 hover:text-white transition-colors">
                {alarm.isEnabled ? <ToggleRight size={28} className="text-cyan-400" /> : <ToggleLeft size={28} />}
              </button>
              <button onClick={() => onDelete(alarm.id)} className="text-red-400/60 hover:text-red-400 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlarmSection;
