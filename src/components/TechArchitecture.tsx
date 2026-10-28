import React, { useState } from 'react';
import { DATABASE_TABLES } from '../data/roadmapData';
import {
  Server,
  Database,
  Cpu,
  Layers,
  Radio,
  Lock,
  Copy,
  Check,
  Zap,
  Globe,
  Smartphone,
  ChevronRight,
  Code
} from 'lucide-react';

export const TechArchitecture: React.FC = () => {
  const [activeSchemaTable, setActiveSchemaTable] = useState<string>('orders');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeLayer, setActiveLayer] = useState<'all' | 'clients' | 'gateway' | 'services' | 'data'>('all');

  const selectedTable = DATABASE_TABLES.find((t) => t.name === activeSchemaTable) || DATABASE_TABLES[0];

  const handleCopySql = () => {
    navigator.clipboard.writeText(selectedTable.sqlDefinition);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Technical Architecture & Database Schema
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          High-throughput distributed systems blueprint designed for low-latency dispatching, geospatial radius lookups, sub-second WebSocket updates, and PCI-compliant financial settlement.
        </p>

        {/* Tech Stack Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Client Applications</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">Flutter / React Native</div>
            <span className="text-[11px] text-slate-500">Cross-platform iOS/Android</span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Backend & Real-Time</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">Node.js (NestJS) + WS</div>
            <span className="text-[11px] text-slate-500">Event-driven architecture</span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Spatial Database</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">PostgreSQL + PostGIS</div>
            <span className="text-[11px] text-slate-500">Geodetic distance & polygons</span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">In-Memory Telemetry</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">Redis Cluster (GEO)</div>
            <span className="text-[11px] text-slate-500">Sub-5ms courier lookups</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: SYSTEM TOPOLOGY & EVENT PIPELINE */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              End-to-End System Topology & Real-Time Data Flow
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              How user interactions trigger microservices, spatial queries, and push dispatches.
            </p>
          </div>

          {/* Layer Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => setActiveLayer('all')}
              className={`cursor-pointer px-2.5 py-1 rounded font-medium ${activeLayer === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
            >
              All Layers
            </button>
            <button
              onClick={() => setActiveLayer('gateway')}
              className={`cursor-pointer px-2.5 py-1 rounded font-medium ${activeLayer === 'gateway' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
            >
              API Gateway
            </button>
            <button
              onClick={() => setActiveLayer('services')}
              className={`cursor-pointer px-2.5 py-1 rounded font-medium ${activeLayer === 'services' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveLayer('data')}
              className={`cursor-pointer px-2.5 py-1 rounded font-medium ${activeLayer === 'data' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
            >
              Data Tier
            </button>
          </div>
        </div>

        {/* Visual Architecture Diagram Grid */}
        <div className="space-y-4">
          {/* Layer 1: Client Edge */}
          {(activeLayer === 'all' || activeLayer === 'clients') && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-600" /> Layer 1: Client Applications (Edge)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">TLS 1.3 / WSS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">Customer Mobile</div>
                  <div className="text-[11px] text-slate-500">React Native / Flutter</div>
                  <div className="text-[10px] text-slate-400 mt-1">Stripe Elements, Mapbox SDK</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">Restaurant KDS Tablet</div>
                  <div className="text-[11px] text-slate-500">Android / iPad Web App</div>
                  <div className="text-[10px] text-slate-400 mt-1">Audio Alarms, ESC/POS Chits</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">Courier Driver App</div>
                  <div className="text-[11px] text-slate-500">Native iOS & Android</div>
                  <div className="text-[10px] text-slate-400 mt-1">5s Background GPS Beacon</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">Super Admin Portal</div>
                  <div className="text-[11px] text-slate-500">React.js Web SPA</div>
                  <div className="text-[10px] text-slate-400 mt-1">Live Fleet Radar & Settlement</div>
                </div>
              </div>
            </div>
          )}

          {/* Connector */}
          <div className="flex justify-center text-slate-300">↓ REST APIs & WebSocket Duplex Stream ↓</div>

          {/* Layer 2: API Gateway & Socket Ingress */}
          {(activeLayer === 'all' || activeLayer === 'gateway') && (
            <div className="p-4 bg-sky-50/60 border border-sky-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-sky-900 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-sky-600" /> Layer 2: Cloud Ingress & API Gateway
                </span>
                <span className="text-[11px] text-sky-700 font-mono">Envoy / Kong + Socket Cluster</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-sky-100">
                  <div className="font-bold text-slate-900">JWT & RBAC Gatekeeper</div>
                  <div className="text-[11px] text-slate-500">Token validation & role scoping</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-sky-100">
                  <div className="font-bold text-slate-900">Rate Limiter & WAF</div>
                  <div className="text-[11px] text-slate-500">Token bucket DDoS protection</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-sky-100">
                  <div className="font-bold text-slate-900">WebSocket Pub/Sub Gateway</div>
                  <div className="text-[11px] text-slate-500">Redis adapter channel multiplexing</div>
                </div>
              </div>
            </div>
          )}

          {/* Connector */}
          <div className="flex justify-center text-slate-300">↓ Internal Microservice Bus ↓</div>

          {/* Layer 3: Core Domain Microservices */}
          {(activeLayer === 'all' || activeLayer === 'services') && (
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-amber-600" /> Layer 3: Core Platform Microservices
                </span>
                <span className="text-[11px] text-amber-700 font-mono">Node.js (TypeScript) Services</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-amber-100">
                  <div className="font-bold text-slate-900">Order State Machine</div>
                  <div className="text-[11px] text-slate-500">Order orchestration, cancellation & SLA rules</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-amber-100">
                  <div className="font-bold text-slate-900">Fleet Dispatch Engine</div>
                  <div className="text-[11px] text-slate-500">Spatial driver matching & route batching</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-amber-100">
                  <div className="font-bold text-slate-900">Menu & Catalog Service</div>
                  <div className="text-[11px] text-slate-500">Modifier trees, stock 86ing, dynamic pricing</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-amber-100">
                  <div className="font-bold text-slate-900">Payment & Escrow Engine</div>
                  <div className="text-[11px] text-slate-500">Stripe PaymentIntents, Connect splits & tips</div>
                </div>
              </div>
            </div>
          )}

          {/* Connector */}
          <div className="flex justify-center text-slate-300">↓ Persistent Storage & Cache ↓</div>

          {/* Layer 4: Storage & External Services */}
          {(activeLayer === 'all' || activeLayer === 'data') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Storage */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-slate-700" /> Data & Cache Tier
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">ACID + Memory</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="font-bold text-slate-900">PostgreSQL 16 + PostGIS</div>
                    <div className="text-[11px] text-slate-500">Relational consistency, spatial indexing (GIST) for delivery polygons.</div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="font-bold text-slate-900">Redis 7 Cluster</div>
                    <div className="text-[11px] text-slate-500">GEO commands (`GEOSEARCH`, `GEOADD`) for 5-second driver GPS pings.</div>
                  </div>
                </div>
              </div>

              {/* 3rd Party Integrations */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600" /> External Service Integrations
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Cloud Gateways</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="font-bold text-slate-900">Stripe Connect</div>
                    <div className="text-[11px] text-slate-500">Card processing & automated driver payouts</div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="font-bold text-slate-900">Google Maps / Mapbox</div>
                    <div className="text-[11px] text-slate-500">Geocoding, vector tiles, turn-by-turn ETA</div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="font-bold text-slate-900">FCM / APNs</div>
                    <div className="text-[11px] text-slate-500">High-priority push notifications with sound</div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="font-bold text-slate-900">Twilio Proxy</div>
                    <div className="text-[11px] text-slate-500">Masked phone calling & SMS OTP verification</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE DATABASE SCHEMA VIEWER */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Relational Database & PostGIS Spatial Schema
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Production-ready PostgreSQL DDL definitions with PostGIS geodetic coordinates and GIST spatial indices.
            </p>
          </div>

          <button
            onClick={handleCopySql}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'SQL Copied!' : 'Copy SQL DDL'}</span>
          </button>
        </div>

        {/* Table Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {DATABASE_TABLES.map((table) => {
            const isActive = activeSchemaTable === table.name;
            return (
              <button
                key={table.name}
                onClick={() => setActiveSchemaTable(table.name)}
                className={`cursor-pointer px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {table.name}
              </button>
            );
          })}
        </div>

        {/* Table Details */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-slate-900 text-sm">
                Table: {selectedTable.name}
              </span>
              <p className="text-xs text-slate-600 mt-0.5">{selectedTable.description}</p>
            </div>
            <span className="text-[11px] font-mono text-slate-500">PostgreSQL + PostGIS</span>
          </div>

          {/* Columns */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/60 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-4 font-mono">Column</th>
                  <th className="py-2.5 px-4 font-mono">Type</th>
                  <th className="py-2.5 px-4">Constraints</th>
                  <th className="py-2.5 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {selectedTable.columns.map((col) => (
                  <tr key={col.name} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{col.name}</td>
                    <td className="py-2.5 px-4 text-sky-700">{col.type}</td>
                    <td className="py-2.5 px-4 text-amber-700 font-mono text-[10px]">{col.constraints || '—'}</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600">{col.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Raw SQL Preview Block */}
          <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border-t border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase font-mono mb-2">Execute DDL Script:</div>
            <pre className="text-emerald-400 leading-relaxed">{selectedTable.sqlDefinition}</pre>
          </div>
        </div>

        {/* Redis Geospatial Dispatch Callout */}
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Redis Geospatial Dispatching In-Memory Command Pipeline:</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Every 5 seconds, active couriers push their current GPS coordinate. The dispatch worker matches nearby idle drivers within a 2.5 km radius using sub-millisecond Redis spatial search:
          </p>
          <pre className="p-2.5 bg-slate-900 text-amber-300 font-mono rounded text-[11px] overflow-x-auto">
{`# 1. Driver app registers telemetry point:
GEOADD fleet:drivers:active -73.9851 40.7488 "driver_uuid_7182"

# 2. Kitchen marks order ready, system queries idle couriers within 2.5km of restaurant:
GEOSEARCH fleet:drivers:active FROMLONLAT -73.9840 40.7492 BYRADIUS 2.5 km ASC WITHDIST WITHCOORD COUNT 3`}
          </pre>
        </div>
      </div>
    </div>
  );
};
