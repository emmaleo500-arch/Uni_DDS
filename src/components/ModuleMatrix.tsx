import React, { useState, useEffect } from 'react';
import { PLATFORM_MODULES } from '../data/roadmapData';
import { PlatformModule, ModuleFeature } from '../types/roadmap';
import {
  Smartphone,
  Tablet,
  Bike,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sliders,
  DollarSign,
  MapPin,
  Flame,
  Volume2,
  VolumeX,
  CreditCard,
  Navigation,
  Check,
  RotateCcw
} from 'lucide-react';

export const ModuleMatrix: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<'customer' | 'restaurant' | 'driver' | 'admin'>('customer');

  const currentModule = PLATFORM_MODULES.find((m) => m.id === activeModuleId) || PLATFORM_MODULES[0];

  // Customer Interactive Simulator State
  const [selectedBurgerExtra, setSelectedBurgerExtra] = useState<string[]>(['cheese']);
  const [customerSpice, setCustomerSpice] = useState<'mild' | 'medium' | 'hot'>('medium');
  const [customerTip, setCustomerTip] = useState<number>(4.0);
  const [orderStage, setOrderStage] = useState<'menu' | 'cart' | 'tracking'>('menu');
  const [trackingStep, setTrackingStep] = useState<number>(1); // 1: received, 2: preparing, 3: driver picked up, 4: arriving

  // Restaurant Interactive Simulator State
  const [incomingOrders, setIncomingOrders] = useState([
    { id: '#FB-9201', customer: 'Sarah L.', items: '1x Truffle Burger, 1x Truffle Fries', total: '$28.50', status: 'pending', prepMins: 20 },
    { id: '#FB-9198', customer: 'David K.', items: '2x Spicy Tonkotsu Ramen', total: '$34.00', status: 'preparing', prepMins: 12 },
    { id: '#FB-9195', customer: 'Elena R.', items: '1x Margherita Pizza (GF)', total: '$22.00', status: 'ready', prepMins: 0 }
  ]);
  const [isSoundAlertOn, setIsSoundAlertOn] = useState(true);
  const [menuStock, setMenuStock] = useState<Record<string, boolean>>({
    'Truffle Aioli': true,
    'Brioche Buns': true,
    'Hass Avocado': false // 86ed!
  });

  // Driver Interactive Simulator State
  const [hasDriverOffer, setHasDriverOffer] = useState(true);
  const [offerCountdown, setOfferCountdown] = useState(28);
  const [driverJobState, setDriverJobState] = useState<'offer' | 'heading_restaurant' | 'picked_up' | 'delivered'>('offer');
  const [driverWallet, setDriverWallet] = useState(148.50);

  // Admin Interactive Simulator State
  const [surgeMultiplier, setSurgeMultiplier] = useState(1.2);
  const [pendingMerchants, setPendingMerchants] = useState([
    { id: 'm-1', name: 'Nonna\'s Artisan Pasta', category: 'Italian', permit: 'Sanitation A+', status: 'pending' },
    { id: 'm-2', name: 'Tokyo Street Yakitori', category: 'Japanese', permit: 'Permit Verified', status: 'pending' }
  ]);

  // Order tracking interval simulation
  useEffect(() => {
    let timer: any;
    if (orderStage === 'tracking' && trackingStep < 4) {
      timer = setTimeout(() => {
        setTrackingStep((prev) => prev + 1);
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [orderStage, trackingStep]);

  // Driver countdown simulation
  useEffect(() => {
    let interval: any;
    if (driverJobState === 'offer' && offerCountdown > 0) {
      interval = setInterval(() => {
        setOfferCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [driverJobState, offerCountdown]);

  // Customer subtotal calculation
  const baseBurgerPrice = 16.5;
  const extrasCost = (selectedBurgerExtra.includes('cheese') ? 1.5 : 0) +
                     (selectedBurgerExtra.includes('bacon') ? 2.5 : 0) +
                     (selectedBurgerExtra.includes('egg') ? 1.75 : 0);
  const subtotal = baseBurgerPrice + extrasCost;
  const deliveryFee = 3.99;
  const serviceFee = 2.45;
  const grandTotal = subtotal + deliveryFee + serviceFee + customerTip;

  return (
    <div className="space-y-8">
      {/* Top Section Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Core App Modules & Technical Specifications
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          The platform operates as a synchronized three-sided marketplace powered by four specialized client applications. Test live workflow prototypes and review functional priorities below.
        </p>

        {/* Module Switcher Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {PLATFORM_MODULES.map((mod) => {
            const isActive = activeModuleId === mod.id;
            const getIcon = () => {
              switch (mod.id) {
                case 'customer':
                  return <Smartphone className="w-4 h-4" />;
                case 'restaurant':
                  return <Tablet className="w-4 h-4" />;
                case 'driver':
                  return <Bike className="w-4 h-4" />;
                case 'admin':
                  return <ShieldAlert className="w-4 h-4" />;
              }
            };

            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`cursor-pointer text-left p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`p-1.5 rounded-lg ${isActive ? 'bg-slate-800 text-amber-400' : 'bg-white text-slate-700 shadow-2xs'}`}>
                    {getIcon()}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                    {mod.targetPlatform.split('/')[0]}
                  </span>
                </div>
                <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {mod.name.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Module Layout: Left specs, Right interactive simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Module Architecture, Persona, Specs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Module Architecture & Target Platform
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{currentModule.name}</h2>
              <div className="mt-2 text-xs text-slate-500 font-mono">
                Platform: <span className="text-slate-800">{currentModule.targetPlatform}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <span className="font-semibold text-slate-800">Target User Persona:</span>
              <p className="text-slate-600">{currentModule.userPersona}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {currentModule.summary}
            </p>

            {/* Key Challenges */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Operational & Technical Friction Points
              </h4>
              <ul className="space-y-1 text-xs text-slate-600">
                {currentModule.keyChallenges.map((kc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">·</span>
                    <span>{kc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Module Features Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Feature Roadmap & API Specifications
            </h3>

            <div className="divide-y divide-slate-100">
              {currentModule.features.map((feature) => (
                <div key={feature.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-semibold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <span>{feature.name}</span>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded w-fit ${
                      feature.priority.startsWith('P0')
                        ? 'bg-amber-50 text-amber-800 border border-amber-200/60'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {feature.priority}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] pt-1">
                    <div className="text-slate-500">
                      <span className="font-medium text-slate-700">Tech:</span> {feature.techStack}
                    </div>
                    {feature.apiEndpoint && (
                      <div className="font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                        {feature.apiEndpoint}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Live Wireframe Simulator (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Simulator Header */}
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold tracking-tight">
                  Interactive Prototype: {currentModule.name.split('(')[0]}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">LIVE PREVIEW</span>
            </div>

            {/* SIMULATOR 1: CUSTOMER APP */}
            {activeModuleId === 'customer' && (
              <div className="p-5 space-y-4 text-xs bg-slate-50/60 min-h-[520px] flex flex-col justify-between">
                {orderStage === 'menu' && (
                  <div className="space-y-4">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span className="flex items-center gap-1 font-medium text-slate-800">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" /> 742 Evergreen Terrace
                        </span>
                        <span className="text-emerald-700 font-semibold">20–30 min</span>
                      </div>
                      <div className="font-bold text-sm text-slate-900">
                        Artisan Burger Co.
                      </div>
                    </div>

                    {/* Dish Customizer */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">Truffle Wagyu Burger</div>
                          <div className="text-[11px] text-slate-500">Brioche bun, wagyu patty, black truffle aioli, arugula</div>
                        </div>
                        <span className="font-bold text-slate-900 tabular-numbers">${baseBurgerPrice.toFixed(2)}</span>
                      </div>

                      {/* Add-ons */}
                      <div className="pt-2 border-t border-slate-100">
                        <label className="font-semibold text-slate-800 block mb-1.5 text-[11px]">Add Extras:</label>
                        <div className="space-y-1.5">
                          {[
                            { id: 'cheese', name: 'Aged White Cheddar', price: 1.5 },
                            { id: 'bacon', name: 'Applewood Smoked Bacon', price: 2.5 },
                            { id: 'egg', name: 'Sunny Side Egg', price: 1.75 }
                          ].map((addon) => {
                            const isChecked = selectedBurgerExtra.includes(addon.id);
                            return (
                              <button
                                key={addon.id}
                                onClick={() => {
                                  setSelectedBurgerExtra((prev) =>
                                    isChecked ? prev.filter((x) => x !== addon.id) : [...prev, addon.id]
                                  );
                                }}
                                className={`w-full flex items-center justify-between p-2 rounded border text-left cursor-pointer transition-colors ${
                                  isChecked ? 'bg-amber-50/80 border-amber-300 text-amber-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                                    isChecked ? 'bg-amber-600 text-white border-amber-600' : 'border-slate-300'
                                  }`}>
                                    {isChecked && '✓'}
                                  </span>
                                  {addon.name}
                                </span>
                                <span className="tabular-numbers text-slate-500">+${addon.price.toFixed(2)}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Spice Level */}
                      <div className="pt-2 border-t border-slate-100">
                        <label className="font-semibold text-slate-800 block mb-1 text-[11px]">Spice Level:</label>
                        <div className="grid grid-cols-3 gap-1">
                          {(['mild', 'medium', 'hot'] as const).map((level) => (
                            <button
                              key={level}
                              onClick={() => setCustomerSpice(level)}
                              className={`py-1 text-center capitalize rounded border cursor-pointer font-medium ${
                                customerSpice === level
                                  ? 'bg-slate-900 text-white border-slate-900'
                                  : 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setOrderStage('cart')}
                      className="cursor-pointer w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors flex items-center justify-between px-4 shadow-xs"
                    >
                      <span>Proceed to Cart (1 item)</span>
                      <span className="tabular-numbers font-mono">${subtotal.toFixed(2)}</span>
                    </button>
                  </div>
                )}

                {orderStage === 'cart' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setOrderStage('menu')}
                        className="text-slate-600 hover:text-slate-900 cursor-pointer font-medium"
                      >
                        ← Back to Menu
                      </button>
                      <span className="font-bold text-slate-900">Order Checkout</span>
                    </div>

                    {/* Order summary */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between font-medium text-slate-900">
                        <span>1x Truffle Wagyu Burger ({customerSpice})</span>
                        <span className="tabular-numbers">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Extras: {selectedBurgerExtra.join(', ') || 'None'}
                      </div>
                    </div>

                    {/* Tip Selection */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="font-semibold text-slate-800 mb-2">Driver Courier Tip (100% to Driver):</div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[2, 4, 6, 8].map((amt) => (
                          <button
                            key={amt}
                            onClick={() => setCustomerTip(amt)}
                            className={`py-1.5 text-center rounded border cursor-pointer font-medium ${
                              customerTip === amt
                                ? 'bg-amber-600 text-white border-amber-600 font-bold'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 text-slate-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="tabular-numbers">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span className="tabular-numbers">${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Service Fee</span>
                        <span className="tabular-numbers">${serviceFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Driver Tip</span>
                        <span className="tabular-numbers">${customerTip.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100 text-sm">
                        <span>Total Due</span>
                        <span className="tabular-numbers">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setOrderStage('tracking');
                        setTrackingStep(1);
                      }}
                      className="cursor-pointer w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" /> Place Order & Pay with Stripe
                    </button>
                  </div>
                )}

                {orderStage === 'tracking' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">Live Order Tracking</span>
                      <button
                        onClick={() => {
                          setOrderStage('menu');
                          setTrackingStep(1);
                        }}
                        className="cursor-pointer text-amber-700 hover:text-amber-800 font-medium text-[11px]"
                      >
                        Reset Demo
                      </button>
                    </div>

                    {/* Mock map animation preview */}
                    <div className="bg-slate-900 text-white rounded-xl p-4 relative overflow-hidden h-36 flex flex-col justify-between">
                      <div className="relative z-10 flex justify-between items-start">
                        <div>
                          <div className="text-[10px] text-slate-400 font-mono">ORDER #FB-4091</div>
                          <div className="text-xs font-bold text-amber-400">
                            {trackingStep === 1 && 'Order Sent to Kitchen'}
                            {trackingStep === 2 && 'Chef Preparing in Kitchen (18 min)'}
                            {trackingStep === 3 && 'Driver Marco Picked Up Order'}
                            {trackingStep === 4 && 'Driver Arriving at Doorstep!'}
                          </div>
                        </div>
                        <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono">
                          {trackingStep === 4 ? 'ARRIVED' : 'LIVE GPS'}
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-[11px] pt-4">
                        <div className="flex items-center gap-1.5">
                          <Bike className="w-4 h-4 text-amber-400" />
                          <span>Courier Marco (Honda Scooter)</span>
                        </div>
                        <span className="tabular-numbers text-slate-300">
                          {trackingStep === 4 ? 'At Doorstep' : `${5 - trackingStep * 1.2} km away`}
                        </span>
                      </div>
                    </div>

                    {/* 4-Step Stepper */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      {[
                        { step: 1, label: 'Order Placed & Confirmed', sub: 'Merchant received order' },
                        { step: 2, label: 'Kitchen Preparing', sub: 'Chef cooking your Wagyu burger' },
                        { step: 3, label: 'Driver Picked Up', sub: 'Marco on route to your address' },
                        { step: 4, label: 'Delivered', sub: 'Enjoy your warm meal!' }
                      ].map((s) => {
                        const isDone = trackingStep >= s.step;
                        const isCurrent = trackingStep === s.step;
                        return (
                          <div key={s.step} className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                              isDone ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                            }`}>
                              {isDone ? '✓' : s.step}
                            </div>
                            <div>
                              <div className={`font-semibold ${isCurrent ? 'text-amber-800' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                                {s.label}
                              </div>
                              <div className="text-[10px] text-slate-500">{s.sub}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SIMULATOR 2: RESTAURANT TABLET */}
            {activeModuleId === 'restaurant' && (
              <div className="p-5 space-y-4 text-xs bg-slate-50/60 min-h-[520px]">
                {/* Kitchen HUD Control Bar */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Kitchen Display (KDS)</span>
                    <span className="text-[11px] text-slate-500">· Tablet Mode</span>
                  </div>
                  <button
                    onClick={() => setIsSoundAlertOn(!isSoundAlertOn)}
                    className="cursor-pointer flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900"
                  >
                    {isSoundAlertOn ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{isSoundAlertOn ? 'Audio Chime ON' : 'Muted'}</span>
                  </button>
                </div>

                {/* Live Order Queue */}
                <div className="space-y-2.5">
                  <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    Active Kitchen Tickets ({incomingOrders.length})
                  </div>

                  {incomingOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className={`p-3.5 rounded-xl border bg-white space-y-2 transition-all ${
                        ord.status === 'pending'
                          ? 'border-amber-400 ring-2 ring-amber-100'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono text-slate-900">{ord.id}</span>
                          <span className="text-slate-400">·</span>
                          <span className="font-semibold text-slate-700">{ord.customer}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : ord.status === 'preparing'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {ord.status}
                        </span>
                      </div>

                      <div className="text-slate-600 text-xs font-medium">
                        {ord.items}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="font-bold text-slate-900 tabular-numbers">{ord.total}</span>

                        <div className="flex items-center gap-1.5">
                          {ord.status === 'pending' && (
                            <button
                              onClick={() => {
                                setIncomingOrders((prev) =>
                                  prev.map((o) => (o.id === ord.id ? { ...o, status: 'preparing' } : o))
                                );
                              }}
                              className="cursor-pointer px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-xs"
                            >
                              Accept (20m)
                            </button>
                          )}
                          {ord.status === 'preparing' && (
                            <button
                              onClick={() => {
                                setIncomingOrders((prev) =>
                                  prev.map((o) => (o.id === ord.id ? { ...o, status: 'ready' } : o))
                                );
                              }}
                              className="cursor-pointer px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs"
                            >
                              Mark Ready
                            </button>
                          )}
                          {ord.status === 'ready' && (
                            <span className="text-slate-500 text-[11px] italic">
                              Driver arriving in 3 min
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Instant 86ing (Out-of-Stock) Widget */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                      Live Menu Item 86ing
                    </span>
                    <span className="text-[10px] text-slate-400">Toggle to disable instantly</span>
                  </div>
                  <div className="space-y-1.5">
                    {Object.entries(menuStock).map(([item, inStock]) => (
                      <div key={item} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className={`font-medium ${inStock ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                          {item}
                        </span>
                        <button
                          onClick={() => {
                            setMenuStock((prev) => ({ ...prev, [item]: !prev[item] }));
                          }}
                          className={`cursor-pointer px-2 py-0.5 rounded text-[10px] font-bold ${
                            inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {inStock ? 'Available' : '86ed (Sold Out)'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR 3: DRIVER APP */}
            {activeModuleId === 'driver' && (
              <div className="p-5 space-y-4 text-xs bg-slate-50/60 min-h-[520px]">
                {/* Driver Top Banner */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Today's Shift</span>
                    <span className="font-bold text-slate-900 text-sm tabular-numbers">
                      ${driverWallet.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setDriverWallet(0);
                    }}
                    className="cursor-pointer px-2.5 py-1 text-[11px] font-semibold bg-emerald-600 text-white rounded hover:bg-emerald-700"
                  >
                    Instant Cashout
                  </button>
                </div>

                {/* Offer HUD */}
                {driverJobState === 'offer' && (
                  <div className="bg-slate-900 text-white rounded-xl p-5 space-y-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded">
                        NEW DELIVERY OFFER
                      </span>
                      <span className="font-mono text-amber-400 text-xs font-bold">
                        {offerCountdown}s remaining
                      </span>
                    </div>

                    <div className="text-center py-2">
                      <span className="text-slate-400 text-[10px] uppercase block">Guaranteed Payout</span>
                      <div className="text-3xl font-black text-white tabular-numbers">$9.75</div>
                      <span className="text-emerald-400 text-[11px]">Includes $4.00 customer tip</span>
                    </div>

                    <div className="bg-slate-800 p-3 rounded-lg space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white">Artisan Burger Co. (Pickup)</div>
                          <div className="text-[10px] text-slate-400">1.2 km away · Food ready in 4 min</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 pt-1.5 border-t border-slate-700">
                        <Navigation className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white">742 Evergreen Terrace (Dropoff)</div>
                          <div className="text-[10px] text-slate-400">2.8 km delivery trip · Total 18 mins</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setOfferCountdown(30)}
                        className="cursor-pointer py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => {
                          setDriverJobState('heading_restaurant');
                          setDriverWallet((prev) => prev + 9.75);
                        }}
                        className="cursor-pointer py-2 rounded-lg bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400"
                      >
                        Accept Request
                      </button>
                    </div>
                  </div>
                )}

                {driverJobState === 'heading_restaurant' && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-bold">Active Delivery: Step 1 of 2</span>
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono text-[10px]">
                        TO RESTAURANT
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                      <div className="text-[11px] text-slate-500 uppercase">Turn-by-Turn Navigation</div>
                      <div className="font-bold text-slate-900 text-sm">In 200m, turn left on Grand Ave</div>
                      <div className="text-xs text-slate-600">Arrive at Artisan Burger Co.</div>
                    </div>

                    <button
                      onClick={() => setDriverJobState('picked_up')}
                      className="cursor-pointer w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg"
                    >
                      Confirm Order Pickup (#FB-9201)
                    </button>
                  </div>
                )}

                {driverJobState === 'picked_up' && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-bold">Active Delivery: Step 2 of 2</span>
                      <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-mono text-[10px]">
                        TO CUSTOMER
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                      <div className="text-[11px] text-slate-500 uppercase">Customer Note</div>
                      <div className="font-bold text-slate-900 text-sm">Leave at front porch table. Gate code #4412</div>
                    </div>

                    <button
                      onClick={() => setDriverJobState('delivered')}
                      className="cursor-pointer w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg"
                    >
                      Complete Delivery (Capture Photo)
                    </button>
                  </div>
                )}

                {driverJobState === 'delivered' && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-lg">
                      ✓
                    </div>
                    <div className="font-bold text-slate-900 text-sm">Delivery Completed!</div>
                    <div className="text-xs text-slate-600">+$9.75 added to your daily wallet.</div>
                    <button
                      onClick={() => {
                        setDriverJobState('offer');
                        setOfferCountdown(28);
                      }}
                      className="cursor-pointer px-4 py-2 bg-slate-900 text-white rounded font-medium text-xs"
                    >
                      Simulate Next Offer
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SIMULATOR 4: SUPER ADMIN DASHBOARD */}
            {activeModuleId === 'admin' && (
              <div className="p-5 space-y-4 text-xs bg-slate-50/60 min-h-[520px]">
                {/* Live Fleet Status Card */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                    City Operations Control Room
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-slate-50 rounded">
                      <span className="text-[10px] text-slate-400 block">Active Orders</span>
                      <span className="text-base font-bold text-slate-900 tabular-numbers">42</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <span className="text-[10px] text-slate-400 block">Idle Couriers</span>
                      <span className="text-base font-bold text-emerald-600 tabular-numbers">14</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <span className="text-[10px] text-slate-400 block">Avg Delivery</span>
                      <span className="text-base font-bold text-slate-900 tabular-numbers">27m</span>
                    </div>
                  </div>
                </div>

                {/* Surge Pricing Policy Control */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                      Dynamic Weather & Rush Surge
                    </span>
                    <span className="font-bold text-amber-700 font-mono text-sm">
                      {surgeMultiplier.toFixed(1)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1.0}
                    max={2.5}
                    step={0.1}
                    value={surgeMultiplier}
                    onChange={(e) => setSurgeMultiplier(parseFloat(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1.0x (Standard)</span>
                    <span>1.5x (Dinner Peak)</span>
                    <span>2.5x (Heavy Storm)</span>
                  </div>
                </div>

                {/* Merchant Approval Pipeline */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                      Merchant Vetting Pipeline
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {pendingMerchants.length} Pending
                    </span>
                  </div>

                  {pendingMerchants.length === 0 ? (
                    <div className="text-center py-4 text-slate-400">All merchants approved!</div>
                  ) : (
                    pendingMerchants.map((merchant) => (
                      <div key={merchant.id} className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-slate-900">{merchant.name}</div>
                            <div className="text-[10px] text-slate-500">{merchant.category} · {merchant.permit}</div>
                          </div>
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                            Review
                          </span>
                        </div>
                        <div className="flex justify-end gap-1.5 pt-1">
                          <button
                            onClick={() => {
                              setPendingMerchants((prev) => prev.filter((m) => m.id !== merchant.id));
                            }}
                            className="cursor-pointer px-2.5 py-1 text-[10px] font-bold bg-emerald-600 text-white rounded hover:bg-emerald-700"
                          >
                            Approve Merchant
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
