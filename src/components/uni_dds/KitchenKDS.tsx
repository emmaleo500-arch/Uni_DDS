import React, { useState } from 'react';
import { Order, OrderFlightStatus, DiningSpot } from '../../types/uniDds';
import { CAMPUS_DINING_SPOTS } from '../../data/campusData';
import {
  Utensils,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plane,
  Scale,
  Volume2,
  VolumeX,
  ShieldCheck,
  RotateCw
} from 'lucide-react';

interface KitchenKDSProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderFlightStatus) => void;
  onAddNewSimulationOrder: () => void;
}

export const KitchenKDS: React.FC<KitchenKDSProps> = ({
  orders,
  onUpdateOrderStatus,
  onAddNewSimulationOrder
}) => {
  const [selectedSpotId, setSelectedSpotId] = useState<string>('all');
  const [isAudioChime, setIsAudioChime] = useState<boolean>(true);
  const [stockAvailability, setStockAvailability] = useState<Record<string, boolean>>({
    'Dean\'s Double Wagyu Smash': true,
    'Parmesan Truffle Fries': true,
    'Tokyo Tonkotsu Rich Pork Ramen': true,
    'Ceremonial Iced Matcha Latte': true,
    'Crispy Tofu Hibachi Rice Bowl': false // 86ed
  });

  const filteredOrders = orders.filter((o) => {
    if (selectedSpotId === 'all') return true;
    return o.diningSpot.id === selectedSpotId;
  });

  return (
    <div className="space-y-8">
      {/* KDS Header Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>CAMPUS KITCHEN DISPLAY TERMINAL (KDS)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              Drone Cargo Packaging & Kitchen Queue
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Cook fresh student orders, pack in thermal payload pods, calibrate weight limits, and authorize automated drone launch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAudioChime(!isAudioChime)}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-300"
            >
              {isAudioChime ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span>{isAudioChime ? 'Audio Alert ON' : 'Muted'}</span>
            </button>

            <button
              onClick={onAddNewSimulationOrder}
              className="cursor-pointer px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Simulate New Student Order</span>
            </button>
          </div>
        </div>

        {/* Filter bar by Dining Spot */}
        <div className="flex items-center gap-2 pt-6 overflow-x-auto text-xs no-scrollbar">
          <span className="text-slate-400 font-medium">Filter Station:</span>
          <button
            onClick={() => setSelectedSpotId('all')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              selectedSpotId === 'all'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Campus Stations ({orders.length})
          </button>
          {CAMPUS_DINING_SPOTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSpotId(s.id)}
              className={`cursor-pointer px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedSpotId === s.id
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Orders Queue (Left 8 cols) + Menu 86ing & Drone Bay Status (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Kitchen Tickets (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Active Kitchen Tickets ({filteredOrders.length})
            </h2>
            <span className="text-xs text-slate-500">
              Auto-dispatches to closest idle drone once packed
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold text-slate-900 text-sm">Kitchen Queue All Caught Up!</div>
              <p>No active orders waiting for preparation. New student orders will chime here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((ord) => {
                const isPending = ord.status === 'received';
                const isCooking = ord.status === 'preparing';
                const isPacked = ord.status === 'drone_loading';
                const isLaunched = ord.status === 'airborne' || ord.status === 'descending_winch' || ord.status === 'delivered';

                return (
                  <div
                    key={ord.id}
                    className={`bg-white rounded-xl border p-5 space-y-4 transition-all shadow-xs ${
                      isPending
                        ? 'border-amber-400 ring-2 ring-amber-100'
                        : isCooking
                        ? 'border-sky-300'
                        : isPacked
                        ? 'border-indigo-300 bg-indigo-50/20'
                        : 'border-slate-200 opacity-80'
                    }`}
                  >
                    {/* Ticket Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-slate-900">
                            #{ord.id}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="font-semibold text-slate-800 text-xs">
                            {ord.studentName} ({ord.studentIdNumber})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Station: {ord.diningSpot.name} · Landing Pad: <strong>{ord.dropZone.code}</strong>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                          isPending
                            ? 'bg-amber-100 text-amber-800'
                            : isCooking
                            ? 'bg-sky-100 text-sky-800'
                            : isPacked
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {ord.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Ticket Items */}
                    <div className="space-y-2 text-xs">
                      {ord.items.map((it) => (
                        <div key={it.id} className="p-2.5 bg-slate-50 rounded-lg">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{it.quantity}x {it.menuItem.name}</span>
                            <span className="font-mono">${it.totalItemPrice.toFixed(2)}</span>
                          </div>
                          {it.selectedOptions.length > 0 && (
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {it.selectedOptions.map((o) => o.optionName).join(' · ')}
                            </div>
                          )}
                          {it.specialInstructions && (
                            <div className="text-[10px] text-rose-700 font-medium mt-1">
                              Kitchen Note: {it.specialInstructions}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Weight Check Calibration & Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Scale className="w-4 h-4 text-slate-400" />
                        <span>Weight Calibration: <strong>1.35 kg</strong> / 3.2 kg max</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isPending && (
                          <button
                            onClick={() => onUpdateOrderStatus(ord.id, 'preparing')}
                            className="cursor-pointer px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition-colors"
                          >
                            Accept & Start Cooking (6 min)
                          </button>
                        )}

                        {isCooking && (
                          <button
                            onClick={() => onUpdateOrderStatus(ord.id, 'drone_loading')}
                            className="cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Pack in Drone Cargo Pod</span>
                          </button>
                        )}

                        {isPacked && (
                          <button
                            onClick={() => onUpdateOrderStatus(ord.id, 'airborne')}
                            className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold rounded-lg text-xs transition-colors flex items-center gap-2 shadow-xs"
                          >
                            <Plane className="w-4 h-4 text-amber-400" />
                            <span>Authorize Drone Launch Now</span>
                          </button>
                        )}

                        {isLaunched && (
                          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Drone Airborne in Flight</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Drone Bay Status & Menu 86ing (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Drone Launch Bay Status */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Dining Dock Launch Catapult
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Docking Bay #A-2</span>
                  <span className="text-emerald-700 font-mono">DDS-Aero-X1 Docked</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Battery: 94% · Payload door open · Ready to receive heat pod
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Docking Bay #B-1</span>
                  <span className="text-amber-700 font-mono">DDS-Swift-02 Charging</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Battery: 88% · Rapid wireless inductive charging pad active
                </div>
              </div>
            </div>
          </div>

          {/* Menu Item 86ing (Out of Stock Toggle) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Live Stock 86ing
                </h3>
                <span className="text-[11px] text-slate-500">
                  Disable sold out dishes immediately
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {Object.entries(stockAvailability).map(([name, isAvailable]) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <span
                    className={`font-medium max-w-[160px] truncate ${
                      isAvailable ? 'text-slate-800' : 'text-slate-400 line-through'
                    }`}
                  >
                    {name}
                  </span>
                  <button
                    onClick={() =>
                      setStockAvailability((prev) => ({ ...prev, [name]: !prev[name] }))
                    }
                    className={`cursor-pointer px-2 py-0.5 rounded text-[10px] font-bold ${
                      isAvailable
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isAvailable ? 'In Stock' : '86ed (Sold Out)'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
