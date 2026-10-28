import React, { useState, useEffect } from 'react';
import { CartItem, DropZone, Order } from '../../types/uniDds';
import { StudentUser } from '../../types/auth';
import { CAMPUS_DINING_SPOTS } from '../../data/campusData';
import {
  X,
  Trash2,
  Plane,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  User,
  Lock
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  selectedDropZone: DropZone;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
  currentUser: StudentUser | null;
  onPromptLogin: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  selectedDropZone,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  currentUser,
  onPromptLogin
}) => {
  const [paymentMethod, setPaymentMethod] = useState<
    'Campus Meal Plan' | 'Dining Dollars' | 'Credit Card' | 'Apple Pay'
  >('Campus Meal Plan');
  const [tip, setTip] = useState<number>(2.0);
  const [studentId, setStudentId] = useState<string>('U-9021849');
  const [studentName, setStudentName] = useState<string>('Alex Chen');

  useEffect(() => {
    if (currentUser) {
      setStudentName(currentUser.fullName);
      setStudentId(currentUser.studentIdNumber);
      if (currentUser.mealPlanType === 'Dining Dollars Only') {
        setPaymentMethod('Dining Dollars');
      } else if (currentUser.mealPlanType === 'None (Card Only)') {
        setPaymentMethod('Credit Card');
      } else {
        setPaymentMethod('Campus Meal Plan');
      }
    }
  }, [currentUser]);

  if (!isOpen) return null;

  // Calculations
  const foodSubtotal = cart.reduce((acc, item) => acc + item.totalItemPrice, 0);
  const mealPlanDiscount =
    paymentMethod === 'Campus Meal Plan' || paymentMethod === 'Dining Dollars'
      ? foodSubtotal * 0.10
      : 0;
  const droneFlightFee = cart.length > 0 ? 2.49 : 0;
  const campusServiceFee = cart.length > 0 ? 0.99 : 0;
  const grandTotal = Math.max(0, foodSubtotal - mealPlanDiscount + droneFlightFee + campusServiceFee + tip);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Protection requirement: student must be logged in to launch drone flight
    if (!currentUser) {
      onPromptLogin();
      return;
    }

    // Pick first dining spot from cart items
    const diningSpot =
      CAMPUS_DINING_SPOTS.find((s) => s.id === cart[0].diningSpotId) || CAMPUS_DINING_SPOTS[0];

    const newOrder: Order = {
      id: `DDS-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: currentUser.fullName,
      studentIdNumber: currentUser.studentIdNumber,
      diningSpot,
      items: [...cart],
      dropZone: selectedDropZone,
      status: 'received',
      subtotal: foodSubtotal,
      mealPlanDiscount,
      droneFlightFee,
      campusServiceFee,
      tip,
      grandTotal,
      paymentMethod,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrivalAt: new Date(Date.now() + 5 * 60000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      flightProgressPct: 5,
      telemetry: {
        droneId: 'DDS-Aero-X1',
        droneModel: 'SkyCargo Hexacopter Pro',
        batteryPct: 94,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 7,
        payloadKg: 1.35,
        gpsCoordinates: { x: diningSpot.coordinates.x, y: diningSpot.coordinates.y },
        headingDegrees: 45
      }
    };

    onPlaceOrder(newOrder);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white max-w-md w-full h-full flex flex-col shadow-2xl overflow-hidden border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Drone Flight Cart</h2>
              <span className="text-[11px] text-slate-500">
                Destination: {selectedDropZone.code}
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

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* User Auth Protection Banner */}
          {!currentUser ? (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600" /> Protected Student Flight
                </span>
                <span className="text-[10px] text-amber-700 font-mono">CAS Required</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Sign in with your University ID to verify landing pad clearance, apply meal plan discounts, and protect your delivery.
              </p>
              <button
                type="button"
                onClick={onPromptLogin}
                className="cursor-pointer w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors"
              >
                Sign In / Student Register
              </button>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-950">
                    {currentUser.fullName} ({currentUser.studentIdNumber})
                  </div>
                  <div className="text-[10px] text-emerald-700">
                    Meal Plan: {currentUser.mealPlanType} · ${currentUser.diningDollarsBalance.toFixed(2)} Dining $
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                VERIFIED
              </span>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <Plane className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-medium">Your drone payload bay is empty.</p>
              <p className="text-[11px] text-slate-400">
                Explore campus cafes and add your favorite dishes!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-slate-500 font-medium pb-1 border-b border-slate-100">
                <span>Flight Payload ({cart.length} unique items)</span>
                <button
                  onClick={onClearCart}
                  className="cursor-pointer text-rose-600 hover:text-rose-800 text-[11px]"
                >
                  Clear All
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {item.menuItem.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.diningSpotName}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900 tabular-numbers">
                      ${item.totalItemPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Selected options */}
                  {item.selectedOptions.length > 0 && (
                    <div className="text-[11px] text-slate-600 space-y-0.5">
                      {item.selectedOptions.map((opt) => (
                        <div key={opt.optionId} className="flex justify-between">
                          <span>+ {opt.optionName}</span>
                          {opt.price > 0 && (
                            <span className="font-mono text-slate-400">
                              +${opt.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {item.specialInstructions && (
                    <div className="text-[10px] text-amber-800 italic bg-amber-50 p-1.5 rounded">
                      Note: {item.specialInstructions}
                    </div>
                  )}

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="cursor-pointer text-slate-400 hover:text-rose-600 p-1"
                      title="Remove from flight"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="cursor-pointer w-6 h-6 rounded bg-white border border-slate-200 font-bold flex items-center justify-center hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold tabular-numbers px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="cursor-pointer w-6 h-6 rounded bg-white border border-slate-200 font-bold flex items-center justify-center hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="space-y-4 pt-2">
              {/* Drop Target Confirmation */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-amber-900 uppercase block">
                  Delivery Destination:
                </span>
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{selectedDropZone.name}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  {selectedDropZone.description}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <span className="font-bold text-slate-800 block text-xs">
                  Campus Payment Credential:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Campus Meal Plan', label: 'Meal Plan (10% Off)', sub: 'Swipes' },
                    { id: 'Dining Dollars', label: 'Dining Dollars', sub: 'Prepaid ID' },
                    { id: 'Apple Pay', label: 'Apple Pay', sub: 'Instant' },
                    { id: 'Credit Card', label: 'Credit Card', sub: 'Visa/MC' }
                  ].map((p) => {
                    const isSelected = paymentMethod === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id as any)}
                        className={`cursor-pointer p-2.5 rounded-xl border text-left transition-colors ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold text-xs">{p.label}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                          {p.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flight Crew Tip */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-800 block text-xs">
                  Drone Flight Ground Crew Tip:
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1.0, 2.0, 3.0, 5.0].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTip(amt)}
                      className={`cursor-pointer py-1.5 text-center rounded-lg border font-mono font-bold text-xs transition-colors ${
                        tip === amt
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      ${amt.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Food Payload Subtotal</span>
                  <span className="font-mono tabular-numbers">${foodSubtotal.toFixed(2)}</span>
                </div>

                {mealPlanDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Student Meal Plan Discount (10%)</span>
                    <span className="font-mono tabular-numbers">-${mealPlanDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Plane className="w-3 h-3 text-amber-600" /> Aerial Flight Clearance Fee
                  </span>
                  <span className="font-mono tabular-numbers">${droneFlightFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Campus Green Service Fee</span>
                  <span className="font-mono tabular-numbers">${campusServiceFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Ground Crew Tip</span>
                  <span className="font-mono tabular-numbers">${tip.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-numbers">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Action */}
        <div className="p-5 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className={`cursor-pointer w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-between transition-all shadow-md ${
              cart.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-amber-400" />
              <span>
                {!currentUser ? 'Sign In to Authorize Flight' : 'Authorize Drone Flight Launch'}
              </span>
            </span>
            <span className="font-mono tabular-numbers text-amber-400">
              ${grandTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
