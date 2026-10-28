import React, { useState } from 'react';
import {
  ShoppingBag,
  Plane,
  UtensilsCrossed,
  Radio,
  Clock,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  History
} from 'lucide-react';
import { DropZone, CartItem } from '../../types/uniDds';
import { StudentUser } from '../../types/auth';

interface UniHeaderProps {
  currentTab: 'order' | 'kitchen' | 'flight_ops' | 'tracking' | 'history';
  setCurrentTab: (tab: 'order' | 'kitchen' | 'flight_ops' | 'tracking' | 'history') => void;
  selectedDropZone: DropZone;
  onOpenDropZoneSelector: () => void;
  cart: CartItem[];
  onOpenCart: () => void;
  hasActiveOrder: boolean;
  currentUser: StudentUser | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const UniHeader: React.FC<UniHeaderProps> = ({
  currentTab,
  setCurrentTab,
  selectedDropZone,
  onOpenDropZoneSelector,
  cart,
  onOpenCart,
  hasActiveOrder,
  currentUser,
  onOpenAuth,
  onSignOut
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
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

            <button
              onClick={() => setCurrentTab('history')}
              className={`cursor-pointer whitespace-nowrap py-1 transition-colors flex items-center gap-1.5 ${
                currentTab === 'history'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                  : 'hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Past Orders</span>
            </button>
          </nav>

          {/* Zone 3: Authentication, Drop Pad, Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Campus Drop Zone Selector */}
            <button
              onClick={onOpenDropZoneSelector}
              className="cursor-pointer hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg text-slate-200 transition-colors"
              title="Change drone landing pad"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-slate-400">Pad:</span>
              <span className="font-semibold text-white truncate max-w-[120px]">
                {selectedDropZone.code}
              </span>
            </button>

            {/* User Account / Sign In State */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="cursor-pointer flex items-center gap-2 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg text-xs transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="font-bold text-white text-[11px] truncate max-w-[100px]">
                      {currentUser.fullName}
                    </div>
                    <div className="text-[9px] text-emerald-400 font-mono">
                      ${currentUser.diningDollarsBalance.toFixed(2)}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="font-bold text-sm text-slate-900">{currentUser.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{currentUser.studentIdNumber}</div>
                      <div className="text-[11px] text-slate-600 truncate mt-0.5">{currentUser.email}</div>
                    </div>

                    <div className="p-3 bg-slate-50 border-b border-slate-100 space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Meal Plan:</span>
                        <span className="font-semibold text-slate-800">{currentUser.mealPlanType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dining Dollars:</span>
                        <span className="font-mono font-bold text-emerald-700">
                          ${currentUser.diningDollarsBalance.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Weekly Swipes:</span>
                        <span className="font-mono font-bold text-slate-800">
                          {currentUser.mealSwipesRemaining}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200/60">
                        <span className="text-slate-500">Campus Residence:</span>
                        <span className="font-medium text-slate-700 truncate max-w-[130px]">
                          {currentUser.campusDormOrBuilding}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          setCurrentTab('history');
                        }}
                        className="cursor-pointer w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 font-semibold flex items-center gap-2 transition-colors border-b border-slate-100"
                      >
                        <History className="w-3.5 h-3.5 text-amber-600" />
                        <span>Past 10 Orders & Receipts</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onSignOut();
                        }}
                        className="cursor-pointer w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out of Campus SSO</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Student Sign In</span>
              </button>
            )}

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
            onClick={() => setCurrentTab('history')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium ${
              currentTab === 'history' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Past Orders
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
