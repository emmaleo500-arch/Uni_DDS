import React, { useState, useMemo } from 'react';
import { Order } from '../../types/uniDds';
import { StudentUser } from '../../types/auth';
import {
  History,
  Repeat,
  Plane,
  Clock,
  MapPin,
  Utensils,
  Search,
  CheckCircle2,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Receipt,
  User,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface OrderHistoryProps {
  currentUser: StudentUser | null;
  pastOrders: Order[];
  onReorder: (order: Order) => void;
  onOpenAuth: () => void;
  onViewOrderDetails?: (order: Order) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  currentUser,
  pastOrders,
  onReorder,
  onOpenAuth,
  onViewOrderDetails
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpotFilter, setSelectedSpotFilter] = useState<string>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [reorderedToast, setReorderedToast] = useState<string | null>(null);

  // Filter orders by student, search query, and station
  const filteredOrders = useMemo(() => {
    return pastOrders.filter((order) => {
      const matchesSearch =
        searchQuery === '' ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.diningSpot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((it) => it.menuItem.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSpot =
        selectedSpotFilter === 'all' || order.diningSpot.id === selectedSpotFilter;

      return matchesSearch && matchesSpot;
    }).slice(0, 10); // Guarantee past 10 orders
  }, [pastOrders, searchQuery, selectedSpotFilter]);

  const handleReorderClick = (order: Order) => {
    onReorder(order);
    setReorderedToast(`Reordered ${order.items.length} items from ${order.diningSpot.name}!`);
    setTimeout(() => setReorderedToast(null), 3500);
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  if (!currentUser) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <History className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign In to View Flight Order History</h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          Sign in with your University Student ID to view your past 10 drone delivery sorties, access digital receipts, and reorder your favorite meals with one tap.
        </p>
        <button
          onClick={onOpenAuth}
          className="cursor-pointer px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
        >
          Sign In with University CAS
        </button>
      </div>
    );
  }

  // Calculate student lifetime stats
  const totalSpent = pastOrders.reduce((acc, o) => acc + o.grandTotal, 0);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {reorderedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-amber-400 px-4 py-2.5 rounded-xl border border-amber-400/40 shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Repeat className="w-4 h-4 text-amber-400" />
          <span>{reorderedToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>STUDENT FLIGHT LOGS · PAST 10 SORTIES</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              Order History: {currentUser.fullName}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              ID: <span className="font-mono text-slate-200">{currentUser.studentIdNumber}</span> · Meal Plan: <span className="text-slate-200">{currentUser.mealPlanType}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-right">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">
                Total Campus Dining Spend
              </span>
              <span className="text-lg font-black text-amber-400 font-mono tabular-numbers">
                ${totalSpent.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar inside Banner */}
        <div className="pt-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search past orders by meal, dish, or ID #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:bg-slate-750 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Station:</span>
            <select
              value={selectedSpotFilter}
              onChange={(e) => setSelectedSpotFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-hidden"
            >
              <option value="all">All Campus Dining Hubs</option>
              <option value="spot-burger">The Quad Burger Forge</option>
              <option value="spot-wok">Polytechnic Wok & Ramen</option>
              <option value="spot-pizza">Red Brick Oven Pizza Co.</option>
              <option value="spot-cafe">Caffeine Lab & Study Bakery</option>
              <option value="spot-green">Campus Green Bowls</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Displaying Past 10 Verified Deliveries ({filteredOrders.length})
          </h2>
          <span className="text-xs text-slate-500">
            Tap 'Reorder' to instantly add dishes to flight cart
          </span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500">
            No past orders match your search query.
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredOrders.map((order, idx) => {
              const isExpanded = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 hover:border-slate-300 transition-colors shadow-2xs"
                >
                  {/* Order Card Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {order.diningSpot.name}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="font-mono text-slate-500 text-xs">
                            #{order.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{order.placedAt}</span>
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-600" />
                            <span>Pad: {order.dropZone.code}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      {/* Price & Reorder Action */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase block font-mono">
                          Total Cost
                        </span>
                        <div className="font-extrabold text-base text-slate-900 font-mono tabular-numbers">
                          ${order.grandTotal.toFixed(2)}
                        </div>
                      </div>

                      {/* Primary 'Reorder' Button */}
                      <button
                        onClick={() => handleReorderClick(order)}
                        className="cursor-pointer px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap active:scale-95"
                        title="Reorder this exact meal"
                      >
                        <Repeat className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary of Items */}
                  <div className="space-y-1.5 text-xs">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-slate-700 bg-slate-50/70 p-2 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 font-mono">
                            {item.quantity}x
                          </span>
                          <span className="font-medium">{item.menuItem.name}</span>
                          {item.selectedOptions.length > 0 && (
                            <span className="text-[10px] text-slate-400">
                              ({item.selectedOptions.map((o) => o.optionName).join(', ')})
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-slate-700 tabular-numbers">
                          ${item.totalItemPrice.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Flight Telemetry & Receipt Expander */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Touchdown Verified
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                        Drone: {order.telemetry.droneId} ({order.telemetry.droneModel})
                      </span>
                    </div>

                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="cursor-pointer flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium text-[11px]"
                    >
                      <span>{isExpanded ? 'Hide Flight Receipt' : 'View Flight Receipt'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Expanded Itemized Flight Ledger */}
                  {isExpanded && (
                    <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3 animate-in fade-in duration-100">
                      <div className="flex items-center justify-between font-bold text-slate-800 pb-2 border-b border-slate-200">
                        <span className="flex items-center gap-1.5">
                          <Receipt className="w-4 h-4 text-slate-500" />
                          <span>Digital Delivery Receipt</span>
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                          Payment: {order.paymentMethod}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-slate-600">
                        <div className="flex justify-between">
                          <span>Items Subtotal:</span>
                          <span className="font-mono tabular-numbers">${order.subtotal.toFixed(2)}</span>
                        </div>
                        {order.mealPlanDiscount > 0 && (
                          <div className="flex justify-between text-emerald-700">
                            <span>Student Meal Plan Discount:</span>
                            <span className="font-mono tabular-numbers">-${order.mealPlanDiscount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Aerial Flight Clearance Fee:</span>
                          <span className="font-mono tabular-numbers">${order.droneFlightFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Campus Green Tech Fee:</span>
                          <span className="font-mono tabular-numbers">${order.campusServiceFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ground Crew Tip:</span>
                          <span className="font-mono tabular-numbers">${order.tip.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-extrabold text-slate-900 pt-2 border-t border-slate-200 text-sm">
                          <span>Total Billed:</span>
                          <span className="font-mono tabular-numbers">${order.grandTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Delivery Landing Pad: <strong>{order.dropZone.name}</strong></span>
                        <span className="font-mono">Payload: {order.telemetry.payloadKg} kg</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
