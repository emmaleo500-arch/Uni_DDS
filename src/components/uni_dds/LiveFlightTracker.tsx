import React, { useState, useEffect } from 'react';
import { Order, OrderFlightStatus } from '../../types/uniDds';
import {
  Plane,
  Clock,
  Compass,
  Wind,
  Battery,
  ShieldAlert,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  MapPin,
  Utensils
} from 'lucide-react';

interface LiveFlightTrackerProps {
  activeOrder: Order | null;
  onUpdateOrderStatus: (newStatus: OrderFlightStatus) => void;
  onStartSampleOrder: () => void;
}

export const LiveFlightTracker: React.FC<LiveFlightTrackerProps> = ({
  activeOrder,
  onUpdateOrderStatus,
  onStartSampleOrder
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isPodUnlocked, setIsPodUnlocked] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(10); // 0 to 100

  // Sound generator using Web Audio API for telemetry feedback
  const playBeaconChime = () => {
    if (!isAudioEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.15); // A6
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.warn('Audio feedback error:', e);
    }
  };

  // Auto-progress simulation
  useEffect(() => {
    if (!activeOrder) return;

    const interval = setInterval(() => {
      if (activeOrder.status === 'received') {
        onUpdateOrderStatus('preparing');
      } else if (activeOrder.status === 'preparing') {
        onUpdateOrderStatus('drone_loading');
      } else if (activeOrder.status === 'drone_loading') {
        onUpdateOrderStatus('airborne');
        playBeaconChime();
      } else if (activeOrder.status === 'airborne') {
        setSimulatedProgress((p) => {
          if (p >= 85) {
            onUpdateOrderStatus('descending_winch');
            playBeaconChime();
            return 85;
          }
          return p + 15;
        });
      } else if (activeOrder.status === 'descending_winch') {
        onUpdateOrderStatus('delivered');
        playBeaconChime();
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [activeOrder?.status]);

  if (!activeOrder) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Plane className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No Active Drone Missions in Flight</h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          You don't have an active autonomous delivery flight in progress. Choose a delicious meal from campus dining or start a simulation run now.
        </p>
        <button
          onClick={onStartSampleOrder}
          className="cursor-pointer px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
        >
          Launch Instant Flight Simulation (Dean's Double Smash)
        </button>
      </div>
    );
  }

  // Derive stage numbers
  const stages: { status: OrderFlightStatus; label: string; sub: string }[] = [
    { status: 'received', label: 'Order Transmitted', sub: 'Kitchen terminal acknowledged' },
    { status: 'preparing', label: 'Chef Cooking', sub: 'Food being packed in heat pod' },
    { status: 'drone_loading', label: 'Drone Dock Loading', sub: 'Payload weight calibrated (1.35 kg)' },
    { status: 'airborne', label: 'Airborne En Route', sub: 'Cruising at 45m AGL across campus' },
    { status: 'descending_winch', label: 'Hovering & Winch Drop', sub: 'Tether cable lowering payload to pad' },
    { status: 'delivered', label: 'Mission Completed', sub: 'Cargo ready for pickup on landing pad' }
  ];

  const currentStageIndex = stages.findIndex((s) => s.status === activeOrder.status);

  // Dynamic telemetry metrics based on status
  const isAirborne = activeOrder.status === 'airborne';
  const isDescending = activeOrder.status === 'descending_winch';
  const isDelivered = activeOrder.status === 'delivered';

  const altitude = isAirborne ? 42 : isDescending ? 12 : 0;
  const airspeed = isAirborne ? 48 : isDescending ? 4 : 0;
  const battery = isDelivered ? 89 : isAirborne ? 92 : 94;

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>MISSION #{activeOrder.id} · AUTONOMOUS DRONE FLIGHT</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              Flight Path: {activeOrder.diningSpot.name} → {activeOrder.dropZone.code}
            </h1>
            <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
              <span>Recipient: {activeOrder.studentName} ({activeOrder.studentIdNumber})</span>
              <span>·</span>
              <span>Assigned Drone: {activeOrder.telemetry.droneId} ({activeOrder.telemetry.droneModel})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className="cursor-pointer p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
              title="Toggle audio beacon feedback"
            >
              {isAudioEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Manual Stage Progressor for testing */}
            {currentStageIndex < stages.length - 1 && (
              <button
                onClick={() => {
                  const nextStatus = stages[currentStageIndex + 1].status;
                  onUpdateOrderStatus(nextStatus);
                  playBeaconChime();
                }}
                className="cursor-pointer px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Advance Flight Phase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {isDelivered && (
              <button
                onClick={onStartSampleOrder}
                className="cursor-pointer px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Simulation</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Telemetry Gauges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 text-xs">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
              <Compass className="w-3.5 h-3.5 text-sky-400" /> Altitude
            </div>
            <div className="text-xl font-black text-white mt-1 tabular-numbers font-mono">
              {altitude} <span className="text-xs text-slate-400 font-normal">m AGL</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {isAirborne ? 'Cruising Ceiling' : isDescending ? 'Hover Winch Mode' : 'Grounded on Pad'}
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
              <Plane className="w-3.5 h-3.5 text-amber-400" /> Airspeed
            </div>
            <div className="text-xl font-black text-white mt-1 tabular-numbers font-mono">
              {airspeed} <span className="text-xs text-slate-400 font-normal">km/h</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Max corridor speed: 55 km/h
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
              <Battery className="w-3.5 h-3.5 text-emerald-400" /> Battery Cell
            </div>
            <div className="text-xl font-black text-white mt-1 tabular-numbers font-mono">
              {battery}%
            </div>
            <span className="text-[10px] text-emerald-400 block mt-0.5">
              LiPo 6S 22.2V Nominal
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
              <Wind className="w-3.5 h-3.5 text-indigo-400" /> Campus Wind
            </div>
            <div className="text-xl font-black text-white mt-1 tabular-numbers font-mono">
              7 <span className="text-xs text-slate-400 font-normal">knots</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Direction: SW (Nominal)
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> ETA
            </div>
            <div className="text-xl font-black text-white mt-1 tabular-numbers font-mono">
              {isDelivered ? 'Arrived' : isAirborne ? '1.5 min' : '3.8 min'}
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Pad: {activeOrder.dropZone.code}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Campus Radar Map (Left) + Flight Stepper & Cargo Unlock (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 2D Campus Radar Simulation Map (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                Geofenced Campus Flight Radar
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                Autonomous Air Corridor Navigation
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-600">
              Live Vector Map
            </span>
          </div>

          {/* SVG 2D Radar Canvas */}
          <div className="relative w-full aspect-16/10 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden p-4 select-none">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />

            {/* Campus No-Fly Geofence Zones (University Observatory, Substation) */}
            <div
              className="absolute border border-rose-500/40 bg-rose-500/10 rounded-md flex items-center justify-center text-[9px] text-rose-300 font-mono p-1"
              style={{ left: '15%', top: '15%', width: '22%', height: '24%' }}
            >
              NO-FLY: Observatory
            </div>
            <div
              className="absolute border border-rose-500/40 bg-rose-500/10 rounded-md flex items-center justify-center text-[9px] text-rose-300 font-mono p-1"
              style={{ left: '60%', top: '65%', width: '25%', height: '20%' }}
            >
              NO-FLY: High Voltage
            </div>

            {/* Launch Dining Spot Marker */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
              style={{
                left: `${activeOrder.diningSpot.coordinates.x}%`,
                top: `${activeOrder.diningSpot.coordinates.y}%`
              }}
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold border-2 border-slate-900 shadow-md">
                <Utensils className="w-3 h-3" />
              </div>
              <span className="text-[9px] font-mono text-indigo-300 bg-slate-900/90 px-1.5 py-0.5 rounded mt-1 border border-indigo-500/30 whitespace-nowrap">
                {activeOrder.diningSpot.name}
              </span>
            </div>

            {/* Target Drop Zone Landing Pad Marker */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
              style={{
                left: `${activeOrder.dropZone.coordinates.x}%`,
                top: `${activeOrder.dropZone.coordinates.y}%`
              }}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold border-2 border-slate-900 shadow-md animate-pulse">
                <MapPin className="w-3 h-3" />
              </div>
              <span className="text-[9px] font-mono text-emerald-300 bg-slate-900/90 px-1.5 py-0.5 rounded mt-1 border border-emerald-500/30 whitespace-nowrap">
                Pad: {activeOrder.dropZone.code}
              </span>
            </div>

            {/* Drone Vector on Flight Path */}
            {(() => {
              const startX = activeOrder.diningSpot.coordinates.x;
              const startY = activeOrder.diningSpot.coordinates.y;
              const targetX = activeOrder.dropZone.coordinates.x;
              const targetY = activeOrder.dropZone.coordinates.y;

              const progressRatio = isDelivered
                ? 1.0
                : isDescending
                ? 0.95
                : isAirborne
                ? Math.min(0.9, Math.max(0.2, simulatedProgress / 100))
                : 0.05;

              const droneX = startX + (targetX - startX) * progressRatio;
              const droneY = startY + (targetY - startY) * progressRatio;

              return (
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-1000"
                  style={{ left: `${droneX}%`, top: `${droneY}%` }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20 border-2 border-white">
                      <Plane className="w-4 h-4 animate-spin-slow" />
                    </div>
                    {/* Radar ping ripple */}
                    <div className="absolute inset-0 rounded-full border border-amber-400/60 animate-ping pointer-events-none" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-300 bg-slate-900/90 px-1.5 py-0.5 rounded mt-1 border border-amber-400/30 whitespace-nowrap">
                    {activeOrder.telemetry.droneId} ({altitude}m)
                  </span>
                </div>
              );
            })()}

            {/* Radar status footer in map */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded backdrop-blur-xs border border-slate-800">
              <span>CAMPUS AIR CORRIDOR #4: CLEAR</span>
              <span>GPS ACCURACY: ±0.15m</span>
            </div>
          </div>

          {/* Winch Cable Delivery Notice */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Precision Winch Descent Technology</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Upon reaching {activeOrder.dropZone.name}, the drone hovers safely at 12 meters altitude and lowers the thermal cargo tether directly onto the landing pad to protect bystanders and prevent propwash.
            </p>
          </div>
        </div>

        {/* Right Column: 6-Stage Mission Stepper & Cargo Unlock (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cargo Pod Unlock Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isDelivered ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Drone Cargo Bay Status
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">POD #DDS-7</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
              <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                isPodUnlocked
                  ? 'bg-emerald-100 text-emerald-700'
                  : isDelivered
                  ? 'bg-amber-100 text-amber-700 animate-bounce'
                  : 'bg-slate-200 text-slate-400'
              }`}>
                {isPodUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>

              <div>
                <div className="font-bold text-slate-900 text-sm">
                  {isPodUnlocked
                    ? 'Cargo Bay Unlocked!'
                    : isDelivered
                    ? 'Drone on Pad · Ready for Pickup'
                    : 'Pod Sealed for Transit'}
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  {isPodUnlocked
                    ? 'Take your hot meal and close the pod latch.'
                    : isDelivered
                    ? 'Tap below with your student phone to unseal the pod.'
                    : 'Cargo locks automatically until drone lands on pad.'}
                </p>
              </div>

              {isDelivered && !isPodUnlocked && (
                <button
                  onClick={() => {
                    setIsPodUnlocked(true);
                    playBeaconChime();
                  }}
                  className="cursor-pointer w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Tap to Unlock Drone Cargo Pod</span>
                </button>
              )}
            </div>

            {/* Order Content Summary */}
            <div className="space-y-1.5 pt-1 text-xs">
              <span className="font-bold text-slate-700 block text-[11px] uppercase">
                Packed Payload Items:
              </span>
              {activeOrder.items.map((it) => (
                <div key={it.id} className="flex justify-between py-1 text-slate-600 border-b border-slate-50">
                  <span>{it.quantity}x {it.menuItem.name}</span>
                  <span className="font-mono tabular-numbers">${it.totalItemPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stepper */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Flight Mission Progression
            </h3>

            <div className="space-y-3.5">
              {stages.map((stage, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stage.status} className="flex items-start gap-3 text-xs">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0 text-[11px] ${
                        isPassed
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className={`font-bold ${isCurrent ? 'text-amber-800' : isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                        {stage.label}
                      </div>
                      <div className="text-[11px] text-slate-500">{stage.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
