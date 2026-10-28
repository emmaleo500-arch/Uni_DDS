import React, { useState } from 'react';
import { Drone, DropZone } from '../../types/uniDds';
import { INITIAL_DRONE_FLEET, CAMPUS_DROP_ZONES } from '../../data/campusData';
import {
  Radio,
  Plane,
  Battery,
  ShieldAlert,
  Wind,
  Compass,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Wrench,
  MapPin
} from 'lucide-react';
import { DronePerformanceMetrics } from './DronePerformanceMetrics';

export const FlightOpsRadar: React.FC = () => {
  const [fleet, setFleet] = useState<Drone[]>(INITIAL_DRONE_FLEET);
  const [airspaceGroundingActive, setAirspaceGroundingActive] = useState(false);
  const [windKnots, setWindKnots] = useState(7);

  const toggleEmergencyRTH = () => {
    setAirspaceGroundingActive((prev) => !prev);
  };

  return (
    <div className="space-y-8">
      {/* Flight Ops Command Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className={`w-2 h-2 rounded-full ${airspaceGroundingActive ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'}`} />
              <span>UNIVERSITY AIRSPACE OPERATIONS COMMAND CENTER</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              Autonomous Drone Fleet & Geofence Controller
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time monitoring of campus air corridors, drone telemetry, battery health, and collision avoidance envelopes.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleEmergencyRTH}
              className={`cursor-pointer px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 ${
                airspaceGroundingActive
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{airspaceGroundingActive ? 'AIRSPACE GROUNDED (RTH ACTIVE)' : 'Emergency Return-To-Home'}</span>
            </button>
          </div>
        </div>

        {/* Airspace Conditions Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 text-xs">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Campus Surface Wind</span>
            <div className="text-lg font-black text-white mt-1 font-mono tabular-numbers">
              {windKnots} knots SW
            </div>
            <span className="text-[10px] text-emerald-400 block mt-0.5">Below 25 knot limit</span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Flight Ceiling</span>
            <div className="text-lg font-black text-white mt-1 font-mono tabular-numbers">
              60 meters AGL
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">FAA Part 107 Waiver</span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Geofence Status</span>
            <div className="text-lg font-black text-emerald-400 mt-1 font-mono">
              Protected
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">2 No-Fly Zones Enforced</span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Fleet Readiness</span>
            <div className="text-lg font-black text-white mt-1 font-mono tabular-numbers">
              3/4 Active
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">1 in scheduled dock tuneup</span>
          </div>
        </div>
      </div>

      {/* Fleet Overview Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Active Drone Hardware Units ({fleet.length})
          </h2>
          <span className="text-xs text-slate-500">Autonomous RTK-GPS Lock Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/60 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4 font-mono">Drone Call Sign</th>
                <th className="py-3 px-4">Airframe Model</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Battery Cell</th>
                <th className="py-3 px-4">Current Zone</th>
                <th className="py-3 px-4">Max Payload</th>
                <th className="py-3 px-4 text-right">Missions Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fleet.map((drone) => (
                <tr key={drone.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold font-mono text-slate-900 flex items-center gap-2">
                    <Plane className="w-3.5 h-3.5 text-amber-600" />
                    <span>{drone.callsign}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{drone.model}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                        drone.status === 'in_flight'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : drone.status === 'idle_docked'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {drone.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800 tabular-numbers">
                    <div className="flex items-center gap-1.5">
                      <Battery className={`w-3.5 h-3.5 ${drone.batteryPct > 50 ? 'text-emerald-600' : 'text-amber-600'}`} />
                      <span>{drone.batteryPct}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{drone.currentZone}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">{drone.maxPayloadKg} kg</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800 tabular-numbers">
                    {drone.totalMissions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* D3-Powered Drone Battery & Flight Delivery Performance Metrics */}
      <DronePerformanceMetrics />

      {/* Campus Landing Pads Overview */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          University Drone Landing Zones & Winch Pads ({CAMPUS_DROP_ZONES.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {CAMPUS_DROP_ZONES.map((pad) => (
            <div key={pad.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-amber-700">{pad.code}</span>
                <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {pad.padType}
                </span>
              </div>
              <div className="font-bold text-slate-900 text-sm">{pad.name}</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {pad.description}
              </p>
              <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-400">
                Zone: {pad.zone}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
