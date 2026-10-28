import React, { useState, useEffect } from 'react';
import {
  DropZone,
  DiningSpot,
  CartItem,
  Order,
  OrderFlightStatus
} from './types/uniDds';
import { StudentUser, DEMO_USERS } from './types/auth';
import { CAMPUS_DROP_ZONES, CAMPUS_DINING_SPOTS } from './data/campusData';
import { UniHeader } from './components/uni_dds/UniHeader';
import { CustomerView } from './components/uni_dds/CustomerView';
import { CartDrawer } from './components/uni_dds/CartDrawer';
import { LiveFlightTracker } from './components/uni_dds/LiveFlightTracker';
import { KitchenKDS } from './components/uni_dds/KitchenKDS';
import { FlightOpsRadar } from './components/uni_dds/FlightOpsRadar';
import { DropZoneModal } from './components/uni_dds/DropZoneModal';
import { AuthModal } from './components/uni_dds/AuthModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'order' | 'kitchen' | 'flight_ops' | 'tracking'>('order');
  const [selectedDropZone, setSelectedDropZone] = useState<DropZone>(CAMPUS_DROP_ZONES[0]);
  const [isDropZoneModalOpen, setIsDropZoneModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Authentication State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    try {
      const saved = localStorage.getItem('uni_dds_user');
      return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default to Alex Chen for instant convenience
    } catch {
      return DEMO_USERS[0];
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('uni_dds_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state with initial demonstration order
  const [orders, setOrders] = useState<Order[]>(() => {
    const sampleBurgerSpot = CAMPUS_DINING_SPOTS[0];
    const initialOrder: Order = {
      id: 'DDS-8419',
      studentName: 'Maya Lin',
      studentIdNumber: 'U-782194',
      diningSpot: sampleBurgerSpot,
      items: [
        {
          id: 'sample-1',
          menuItem: sampleBurgerSpot.menu[0],
          diningSpotId: sampleBurgerSpot.id,
          diningSpotName: sampleBurgerSpot.name,
          quantity: 1,
          selectedOptions: [
            {
              groupId: 'cheese-choice',
              groupTitle: 'Cheese',
              optionId: 'ch-cheddar',
              optionName: 'Sharp Cheddar',
              price: 0
            },
            {
              groupId: 'extra-toppings',
              groupTitle: 'Add Extras',
              optionId: 'ex-bacon',
              optionName: 'Crispy Smoked Bacon',
              price: 1.75
            }
          ],
          specialInstructions: 'Extra burger sauce in pod',
          totalItemPrice: 13.25
        },
        {
          id: 'sample-2',
          menuItem: sampleBurgerSpot.menu[2],
          diningSpotId: sampleBurgerSpot.id,
          diningSpotName: sampleBurgerSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 5.50
        }
      ],
      dropZone: CAMPUS_DROP_ZONES[0],
      status: 'airborne',
      subtotal: 18.75,
      mealPlanDiscount: 1.88,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 2.00,
      grandTotal: 22.35,
      paymentMethod: 'Campus Meal Plan',
      placedAt: '12:28 PM',
      estimatedArrivalAt: '12:33 PM',
      flightProgressPct: 60,
      telemetry: {
        droneId: 'DDS-Aero-X1',
        droneModel: 'SkyCargo Hexacopter Pro',
        batteryPct: 92,
        altitudeMeters: 42,
        airspeedKmh: 48,
        windSpeedKnots: 7,
        payloadKg: 1.35,
        gpsCoordinates: { x: 62, y: 38 },
        headingDegrees: 52
      }
    };
    return [initialOrder];
  });

  // Active tracked order (first non-delivered order or most recent)
  const activeOrder = orders.find((o) => o.status !== 'delivered') || orders[0] || null;

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('uni_dds_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  // Persist user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('uni_dds_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('uni_dds_user');
      }
    } catch (e) {
      console.error('Failed to save user session:', e);
    }
  }, [currentUser]);

  // Auth Operations
  const handleLoginSuccess = (user: StudentUser) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.menuItem.id === newItem.menuItem.id &&
          JSON.stringify(it.selectedOptions) === JSON.stringify(newItem.selectedOptions)
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        const existing = updated[existingIdx];
        const newQty = existing.quantity + newItem.quantity;
        const singlePrice = existing.totalItemPrice / existing.quantity;
        updated[existingIdx] = {
          ...existing,
          quantity: newQty,
          totalItemPrice: singlePrice * newQty
        };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const singlePrice = item.totalItemPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            totalItemPrice: singlePrice * newQty
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((it) => it.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCurrentTab('tracking');
  };

  // Update order status across kitchen and flight ops
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderFlightStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Create a quick simulation order
  const handleStartSampleOrder = () => {
    const spot = CAMPUS_DINING_SPOTS[1]; // Wok lab
    const ramenOrder: Order = {
      id: `DDS-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: currentUser ? currentUser.fullName : 'Alex Chen',
      studentIdNumber: currentUser ? currentUser.studentIdNumber : 'U-9021849',
      diningSpot: spot,
      items: [
        {
          id: `sample-sim-${Date.now()}`,
          menuItem: spot.menu[0],
          diningSpotId: spot.id,
          diningSpotName: spot.name,
          quantity: 1,
          selectedOptions: [
            {
              groupId: 'ramen-spice',
              groupTitle: 'Spice',
              optionId: 'sp-1',
              optionName: 'Spicy Chili Rayu (+ Level 1)',
              price: 0
            }
          ],
          totalItemPrice: 13.50
        }
      ],
      dropZone: selectedDropZone,
      status: 'received',
      subtotal: 13.50,
      mealPlanDiscount: 1.35,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 2.00,
      grandTotal: 17.63,
      paymentMethod: 'Campus Meal Plan',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrivalAt: new Date(Date.now() + 4 * 60000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      flightProgressPct: 10,
      telemetry: {
        droneId: 'DDS-Swift-02',
        droneModel: 'Apex Urban eVTOL Quad',
        batteryPct: 96,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 6,
        payloadKg: 1.15,
        gpsCoordinates: { x: spot.coordinates.x, y: spot.coordinates.y },
        headingDegrees: 180
      }
    };

    setOrders((prev) => [ramenOrder, ...prev]);
    setCurrentTab('tracking');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Universal Campus Header */}
      <UniHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedDropZone={selectedDropZone}
        onOpenDropZoneSelector={() => setIsDropZoneModalOpen(true)}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        hasActiveOrder={!!activeOrder && activeOrder.status !== 'delivered'}
        currentUser={currentUser}
        onOpenAuth={() => handleOpenAuth('login')}
        onSignOut={handleSignOut}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'order' && (
          <CustomerView
            diningSpots={CAMPUS_DINING_SPOTS}
            selectedDropZone={selectedDropZone}
            onOpenDropZoneSelector={() => setIsDropZoneModalOpen(true)}
            onAddToCart={handleAddToCart}
            onViewTracker={() => setCurrentTab('tracking')}
            hasActiveOrder={!!activeOrder && activeOrder.status !== 'delivered'}
          />
        )}

        {currentTab === 'tracking' && (
          <LiveFlightTracker
            activeOrder={activeOrder}
            onUpdateOrderStatus={(newStatus) => {
              if (activeOrder) {
                handleUpdateOrderStatus(activeOrder.id, newStatus);
              }
            }}
            onStartSampleOrder={handleStartSampleOrder}
          />
        )}

        {currentTab === 'kitchen' && (
          <KitchenKDS
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddNewSimulationOrder={handleStartSampleOrder}
          />
        )}

        {currentTab === 'flight_ops' && <FlightOpsRadar />}
      </main>

      {/* Clean Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">Uni_DDS</span>
            <span>·</span>
            <span>University Drone Delivery Service</span>
            <span>·</span>
            <span className="text-slate-500">Autonomous Campus Dining Transit</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setCurrentTab('order')}
              className="cursor-pointer hover:text-white transition-colors"
            >
              Order Food
            </button>
            <button
              onClick={() => setCurrentTab('tracking')}
              className="cursor-pointer hover:text-white transition-colors"
            >
              Flight Radar
            </button>
            <button
              onClick={() => setCurrentTab('kitchen')}
              className="cursor-pointer hover:text-white transition-colors"
            >
              Kitchen KDS
            </button>
            <button
              onClick={() => setCurrentTab('flight_ops')}
              className="cursor-pointer hover:text-white transition-colors"
            >
              Airspace Ops
            </button>
            {!currentUser ? (
              <button
                onClick={() => handleOpenAuth('login')}
                className="cursor-pointer text-amber-400 hover:text-amber-300 font-bold transition-colors"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                className="cursor-pointer hover:text-rose-400 transition-colors"
              >
                Sign Out ({currentUser.fullName.split(' ')[0]})
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        selectedDropZone={selectedDropZone}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        currentUser={currentUser}
        onPromptLogin={() => {
          setIsCartOpen(false);
          handleOpenAuth('login');
        }}
      />

      {/* Campus Landing Pad Modal */}
      <DropZoneModal
        isOpen={isDropZoneModalOpen}
        onClose={() => setIsDropZoneModalOpen(false)}
        selectedZone={selectedDropZone}
        onSelectZone={(zone) => setSelectedDropZone(zone)}
      />

      {/* Campus Student Login & Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
      />
    </div>
  );
}
