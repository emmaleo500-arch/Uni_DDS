import React from 'react';
import { DropZone } from '../../types/uniDds';
import { CAMPUS_DROP_ZONES } from '../../data/campusData';
import { MapPin, X, Check, ShieldCheck } from 'lucide-react';

interface DropZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedZone: DropZone;
  onSelectZone: (zone: DropZone) => void;
}

export const DropZoneModal: React.FC<DropZoneModalProps> = ({
  isOpen,
  onClose,
  selectedZone,
  onSelectZone
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Select Campus Drone Drop Pad</h2>
              <span className="text-[11px] text-slate-500">
                Where should the autonomous drone deliver your meal?
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto space-y-3 text-xs">
          {CAMPUS_DROP_ZONES.map((zone) => {
            const isSelected = selectedZone.id === zone.id;

            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => {
                  onSelectZone(zone);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-100 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{zone.code}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                        {zone.padType}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm mt-1">{zone.name}</div>
                    <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                      {zone.description}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>

                <div className="mt-2 text-[10px] text-slate-400 pt-1.5 border-t border-slate-100">
                  Campus Zone: {zone.zone}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
