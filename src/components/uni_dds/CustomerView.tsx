import React, { useState, useMemo } from 'react';
import {
  DiningSpot,
  MenuItem,
  DropZone,
  DietaryTag,
  CampusZone,
  CartItem,
  CartItemOption
} from '../../types/uniDds';
import {
  Search,
  MapPin,
  Clock,
  Star,
  Plus,
  Plane,
  X,
  Check,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

interface CustomerViewProps {
  diningSpots: DiningSpot[];
  selectedDropZone: DropZone;
  onOpenDropZoneSelector: () => void;
  onAddToCart: (item: CartItem) => void;
  onViewTracker: () => void;
  hasActiveOrder: boolean;
}

export const CustomerView: React.FC<CustomerViewProps> = ({
  diningSpots,
  selectedDropZone,
  onOpenDropZoneSelector,
  onAddToCart,
  onViewTracker,
  hasActiveOrder
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'All'>('All');
  const [selectedZone, setSelectedZone] = useState<CampusZone | 'All'>('All');
  const [activeDiningSpot, setActiveDiningSpot] = useState<DiningSpot | null>(null);

  // Item customization modal state
  const [customizingItem, setCustomizingItem] = useState<{
    item: MenuItem;
    spot: DiningSpot;
  } | null>(null);
  const [selectedOptionIds, setSelectedOptionIds] = useState<Record<string, string[]>>({});
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [specialNote, setSpecialNote] = useState<string>('');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Filter dining spots
  const filteredSpots = useMemo(() => {
    return diningSpots.filter((spot) => {
      const matchesZone = selectedZone === 'All' || spot.zone === selectedZone;
      const matchesSearch =
        searchQuery === '' ||
        spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.menu.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDietary =
        selectedDietary === 'All' ||
        spot.menu.some((m) => m.dietary.includes(selectedDietary));

      return matchesZone && matchesSearch && matchesDietary;
    });
  }, [diningSpots, selectedZone, searchQuery, selectedDietary]);

  const openCustomizer = (item: MenuItem, spot: DiningSpot) => {
    // Initialize default required options
    const initialOptions: Record<string, string[]> = {};
    if (item.optionGroups) {
      item.optionGroups.forEach((grp) => {
        if (grp.required && grp.options.length > 0) {
          initialOptions[grp.id] = [grp.options[0].id];
        } else {
          initialOptions[grp.id] = [];
        }
      });
    }

    setSelectedOptionIds(initialOptions);
    setItemQuantity(1);
    setSpecialNote('');
    setCustomizingItem({ item, spot });
  };

  const handleOptionToggle = (
    groupId: string,
    optionId: string,
    maxSelect: number,
    required: boolean
  ) => {
    setSelectedOptionIds((prev) => {
      const current = prev[groupId] || [];
      if (maxSelect === 1) {
        return { ...prev, [groupId]: [optionId] };
      }
      if (current.includes(optionId)) {
        if (required && current.length === 1) return prev;
        return { ...prev, [groupId]: current.filter((id) => id !== optionId) };
      }
      if (current.length >= maxSelect) {
        return prev;
      }
      return { ...prev, [groupId]: [...current, optionId] };
    });
  };

  const handleConfirmAddToCart = () => {
    if (!customizingItem) return;
    const { item, spot } = customizingItem;

    // Collect chosen options
    const chosenOptions: CartItemOption[] = [];
    let optionsTotalPrice = 0;

    if (item.optionGroups) {
      item.optionGroups.forEach((grp) => {
        const selectedIds = selectedOptionIds[grp.id] || [];
        selectedIds.forEach((sId) => {
          const opt = grp.options.find((o) => o.id === sId);
          if (opt) {
            chosenOptions.push({
              groupId: grp.id,
              groupTitle: grp.title,
              optionId: opt.id,
              optionName: opt.name,
              price: opt.price
            });
            optionsTotalPrice += opt.price;
          }
        });
      });
    }

    const singleItemTotal = item.price + optionsTotalPrice;
    const totalItemPrice = singleItemTotal * itemQuantity;

    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      diningSpotId: spot.id,
      diningSpotName: spot.name,
      quantity: itemQuantity,
      selectedOptions: chosenOptions,
      specialInstructions: specialNote.trim() || undefined,
      totalItemPrice
    };

    onAddToCart(cartItem);
    setCustomizingItem(null);
    setAddedToast(`${itemQuantity}x ${item.name} added to Drone Cart!`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-amber-400 px-4 py-2.5 rounded-xl border border-amber-400/40 shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Plane className="w-4 h-4 text-amber-400" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Active Order Live Banner if any */}
      {hasActiveOrder && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Plane className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                You have an active autonomous drone flight in progress!
              </div>
              <div className="text-[11px] text-slate-600">
                Estimated arrival at {selectedDropZone.name}: ~3 minutes.
              </div>
            </div>
          </div>
          <button
            onClick={onViewTracker}
            className="cursor-pointer px-3.5 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors whitespace-nowrap"
          >
            Open Live Flight Radar →
          </button>
        </div>
      )}

      {/* Campus Hero & Drone Drop Zone Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>CAMPUS AERIAL DELIVERY CORRIDORS ACTIVE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Order fresh food. Delivered by autonomous drone in under 5 minutes.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Uni_DDS connects certified campus dining halls, student cafes, and wok labs directly to designated campus landing pads with high-speed automated drone flights.
          </p>

          {/* Current Drop Zone Card */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3 p-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  Current Drop Pad Destination:
                </span>
                <span className="font-bold text-white text-xs sm:text-sm">
                  {selectedDropZone.name} ({selectedDropZone.code})
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {selectedDropZone.description}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenDropZoneSelector}
              className="cursor-pointer px-4 py-3 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-colors whitespace-nowrap"
            >
              Change Landing Pad
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search campus cafes, burgers, tonkotsu ramen, cold brew..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Zone Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs focus:bg-white focus:outline-hidden text-slate-700"
            >
              <option value="All">All Campus Zones</option>
              <option value="Central Quad">Central Quad</option>
              <option value="Science & Engineering">Science & Engineering</option>
              <option value="North Campus">North Campus</option>
              <option value="Athletics & South">Athletics & South</option>
              <option value="West Dorms">West Dorms</option>
            </select>
          </div>
        </div>

        {/* Dietary Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Dietary:
          </span>
          {(['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein'] as const).map((diet) => (
            <button
              key={diet}
              onClick={() => setSelectedDietary(diet)}
              className={`cursor-pointer px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
                selectedDietary === diet
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      {/* Dining Spots Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Available Campus Dining Hubs ({filteredSpots.length})
          </h2>
          <span className="text-xs text-slate-500">
            Autonomous Drone Flight: ~3.5–5.0 min transit
          </span>
        </div>

        {filteredSpots.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500">
            No campus dining locations match your search or filters. Try resetting the filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="p-5 space-y-3">
                  {/* Spot Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[11px] text-amber-700 font-semibold uppercase tracking-wider">
                        {spot.zone}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {spot.name}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {spot.cuisine}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold text-amber-900">
                      <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                      <span>{spot.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal font-sans">
                        ({spot.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Flight telemetry preview tag */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Flight Time:</span>
                    </span>
                    <span className="font-bold text-slate-900 tabular-numbers">
                      {spot.averageFlightTimeMins} mins
                    </span>
                  </div>

                  {/* Highlights from Menu */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Popular Drone Cargo Dishes:
                    </span>
                    <div className="space-y-1.5">
                      {spot.menu.slice(0, 2).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-slate-50 transition-colors"
                        >
                          <div className="truncate mr-2">
                            <span className="font-medium text-slate-900">{item.name}</span>
                            <span className="text-[10px] text-slate-400 block">{item.calories} kcal</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-bold text-slate-800 tabular-numbers">
                              ${item.price.toFixed(2)}
                            </span>
                            <button
                              onClick={() => openCustomizer(item, spot)}
                              className="cursor-pointer p-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded font-bold transition-colors"
                              title="Add to flight order"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">
                    Launch: {spot.droneLaunchPad}
                  </span>
                  <button
                    onClick={() => setActiveDiningSpot(spot)}
                    className="cursor-pointer font-bold text-slate-900 hover:text-amber-700"
                  >
                    View Full Menu ({spot.menu.length}) →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FULL DINING SPOT MENU MODAL */}
      {activeDiningSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  {activeDiningSpot.zone} · Launch Pad: {activeDiningSpot.droneLaunchPad}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {activeDiningSpot.name}
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  {activeDiningSpot.cuisine} · {activeDiningSpot.location}
                </div>
              </div>
              <button
                onClick={() => setActiveDiningSpot(null)}
                className="cursor-pointer text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu List */}
            <div className="p-6 overflow-y-auto divide-y divide-slate-100 space-y-4">
              {activeDiningSpot.menu.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{item.name}</span>
                      <span className="font-mono text-xs font-bold text-slate-800">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px]">
                      <span className="text-slate-400 font-mono">{item.calories} kcal</span>
                      {item.dietary.map((d) => (
                        <span key={d} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openCustomizer(item, activeDiningSpot)}
                    className="cursor-pointer shrink-0 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Select</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveDiningSpot(null)}
                className="cursor-pointer px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg text-xs hover:bg-slate-300"
              >
                Back to Campus Dining
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ITEM CUSTOMIZATION MODAL */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {customizingItem.spot.name}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {customizingItem.item.name}
                </h3>
                <span className="font-bold text-slate-900 text-sm font-mono block mt-1">
                  Base: ${customizingItem.item.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="cursor-pointer text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-700">
              <p className="text-slate-600 leading-relaxed">
                {customizingItem.item.description}
              </p>

              {customizingItem.item.optionGroups?.map((group) => {
                const currentSelections = selectedOptionIds[group.id] || [];

                return (
                  <div key={group.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">
                        {group.title} {group.required && <span className="text-amber-700">*Required</span>}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Max {group.maxSelect}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {group.options.map((opt) => {
                        const isSelected = currentSelections.includes(opt.id);

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              handleOptionToggle(group.id, opt.id, group.maxSelect, group.required)
                            }
                            className={`w-full flex items-center justify-between p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-medium'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                                  isSelected ? 'bg-amber-600 text-white border-amber-600' : 'border-slate-300'
                                }`}
                              >
                                {isSelected && '✓'}
                              </span>
                              <span>{opt.name}</span>
                            </span>
                            <span className="font-mono text-slate-500 tabular-numbers">
                              {opt.price > 0 ? `+$${opt.price.toFixed(2)}` : 'Free'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Special instructions */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Special Kitchen Notes (Allergies / Dressing on side)
                </label>
                <input
                  type="text"
                  placeholder="e.g. No raw onions, sauce on side"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white text-xs"
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-800">Quantity</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setItemQuantity((prev) => Math.max(1, prev - 1))}
                    className="cursor-pointer w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-sm w-6 text-center tabular-numbers">
                    {itemQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setItemQuantity((prev) => prev + 1)}
                    className="cursor-pointer w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCustomizingItem(null)}
                className="cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAddToCart}
                className="cursor-pointer px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-xs"
              >
                <Plane className="w-3.5 h-3.5 text-amber-400" />
                <span>Add to Drone Flight Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
