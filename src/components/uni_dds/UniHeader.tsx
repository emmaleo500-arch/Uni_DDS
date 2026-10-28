import React from 'react';
import { ShoppingBag, Plane, UtensilsCrossed, Radio, Clock, ShieldCheck } from 'lucide-react';
import { DropZone, CartItem } from '../../types/uniDds';

interface UniHeaderProps {
  currentTab: 'order' | 'kitchen' | 'flight_ops' | 'tracking';
  setCurrentTab: (tab: 'order' | 'kitchen' | 'flight_ops' | 'tracking') => void;
  selectedDropZone: DropZone;
  onOpenDropZoneSelector: () => void;
  cart: CartItem[];
  onOpenCart: () => void;
  hasActiveOrder: boolean;
}

export const UniHeader: React.FC<UniHeaderProps> = ({
  currentTab,
  setCurrentTab,
  selectedDropZone,
  onOpenDropZoneSelector,
  cart,
  onOpenCart,
  hasActiveOrder
}) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentTab('order')}
              className="text-left cursor-pointer group flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs group-hover:bg-amber-400 transition-colors">
                <Plane className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-white whitespace-nowrap">
                  Uni_DDS
                </span>
                <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-medium">
                  University Drone Delivery Service
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button
              onClick={() => setCurrentTab('order')}
              className={`cursor-pointer whitespace-nowrap py-1 transition-colors flex items-center gap-1.5 ${
                currentTab === 'order'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                  : 'hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Campus Dining</span>
            </button>

            <button
              onClick={() => setCurrentTab('tracking')}
              className={`cursor-pointer whitespace-nowrap py-1 transition-colors flex items-center gap-1.5 ${
                currentTab === 'tracking'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                  : 'hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Flight Tracking</span>
              {hasActiveOrder && (
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>

            <button
              onClick={() => setCurrentTab('kitchen')}
              className={`cursor-pointer whitespace-nowrap py-1 transition-colors flex items-center gap-1.5 ${
                currentTab === 'kitchen'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                  : 'hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Kitchen KDS</span>
            </button>

            <button
              onClick={() => setCurrentTab('flight_ops')}
              className={`cursor-pointer whitespace-nowrap py-1 transition-colors flex items-center gap-1.5 ${
                currentTab === 'flight_ops'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                  : 'hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-sky-400" />
              <span>Drone Flight Ops</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action & landing pad selector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Campus Drop Zone Selector */}
            <button
              onClick={onOpenDropZoneSelector}
              className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg text-slate-200 transition-colors"
              title="Change drone landing pad"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-slate-400">Pad:</span>
              <span className="font-semibold text-white truncate max-w-[140px]">
                {selectedDropZone.code}
              </span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="cursor-pointer relative flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Flight Cart</span>
              <span className="bg-slate-950 text-white rounded-full px-1.5 py-0.2 text-[11px] tabular-numbers font-mono">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-800 no-scrollbar text-xs">
          <button
            onClick={() => setCurrentTab('order')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium ${
              currentTab === 'order' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Dining
          </button>
          <button
            onClick={() => setCurrentTab('tracking')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium ${
              currentTab === 'tracking' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Flight Tracker {hasActiveOrder && '•'}
          </button>
          <button
            onClick={() => setCurrentTab('kitchen')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium ${
              currentTab === 'kitchen' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Kitchen KDS
          </button>
          <button
            onClick={() => setCurrentTab('flight_ops')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium ${
              currentTab === 'flight_ops' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Flight Ops
          </button>
        </div>
      </div>
    </header>
  );
};
