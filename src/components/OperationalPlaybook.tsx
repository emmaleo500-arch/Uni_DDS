import React, { useState } from 'react';
import {
  Users,
  Compass,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Bike
} from 'lucide-react';

export const OperationalPlaybook: React.FC = () => {
  const [activeStrategyTab, setActiveStrategyTab] = useState<'chicken_egg' | 'batching' | 'cac'>('batching');
  const [batchingMode, setBatchingMode] = useState<'unbatched' | 'batched'>('batched');

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Critical Operational Challenges & Mitigation Playbook
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Operational blueprints addressing the fundamental failure modes of 3-sided marketplaces: initial liquidity imbalance, high deadhead delivery miles, and customer acquisition burn.
        </p>

        {/* Tab Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          <button
            onClick={() => setActiveStrategyTab('batching')}
            className={`cursor-pointer text-left p-4 rounded-xl border transition-all ${
              activeStrategyTab === 'batching'
                ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider">Challenge 01</span>
            </div>
            <div className="font-bold text-sm">Route Batching & Optimization</div>
            <div className={`text-xs mt-1 ${activeStrategyTab === 'batching' ? 'text-slate-300' : 'text-slate-500'}`}>
              Multi-order dispatch algorithms
            </div>
          </button>

          <button
            onClick={() => setActiveStrategyTab('chicken_egg')}
            className={`cursor-pointer text-left p-4 rounded-xl border transition-all ${
              activeStrategyTab === 'chicken_egg'
                ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-bold uppercase tracking-wider">Challenge 02</span>
            </div>
            <div className="font-bold text-sm">The Chicken-and-Egg Paradox</div>
            <div className={`text-xs mt-1 ${activeStrategyTab === 'chicken_egg' ? 'text-slate-300' : 'text-slate-500'}`}>
              Hyper-local density & merchant seed
            </div>
          </button>

          <button
            onClick={() => setActiveStrategyTab('cac')}
            className={`cursor-pointer text-left p-4 rounded-xl border transition-all ${
              activeStrategyTab === 'cac'
                ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider">Challenge 03</span>
            </div>
            <div className="font-bold text-sm">Unit Economics & CAC Discipline</div>
            <div className={`text-xs mt-1 ${activeStrategyTab === 'cac' ? 'text-slate-300' : 'text-slate-500'}`}>
              Balancing driver pay & commission
            </div>
          </button>
        </div>
      </div>

      {/* STRATEGY 1: ROUTE BATCHING SIMULATOR */}
      {activeStrategyTab === 'batching' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Algorithmic Delivery Optimization
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Single Trips vs. Smart Route Batching Simulator
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  How pairing adjacent kitchen pickups and proximate customer dropoffs saves vehicle kilometers, driver idle time, and platform fulfillment costs.
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs self-start sm:self-auto">
                <button
                  onClick={() => setBatchingMode('unbatched')}
                  className={`cursor-pointer px-3 py-1.5 rounded-md font-semibold transition-colors ${
                    batchingMode === 'unbatched'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Unbatched (2 Drivers)
                </button>
                <button
                  onClick={() => setBatchingMode('batched')}
                  className={`cursor-pointer px-3 py-1.5 rounded-md font-semibold transition-colors ${
                    batchingMode === 'batched'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Smart Batched (1 Courier)
                </button>
              </div>
            </div>

            {/* Comparison Metrics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Distance</span>
                <div className="text-2xl font-black text-slate-900 mt-1 tabular-numbers">
                  {batchingMode === 'batched' ? '9.8 km' : '16.4 km'}
                </div>
                <span className={`text-[11px] font-semibold ${batchingMode === 'batched' ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {batchingMode === 'batched' ? '40% Distance Saved' : 'Independent Single Runs'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Courier Fleet Cost</span>
                <div className="text-2xl font-black text-slate-900 mt-1 tabular-numbers">
                  {batchingMode === 'batched' ? '$8.60' : '$11.60'}
                </div>
                <span className={`text-[11px] font-semibold ${batchingMode === 'batched' ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {batchingMode === 'batched' ? 'Save $3.00 (26% cut)' : '$5.80 x 2 separate drivers'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Driver Hourly Rate</span>
                <div className="text-2xl font-black text-emerald-700 mt-1 tabular-numbers">
                  {batchingMode === 'batched' ? '$27.80/hr' : '$19.20/hr'}
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  {batchingMode === 'batched' ? 'Courier earns +45% per hour' : 'Standard 1-drop rate'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Cold Food SLA Risk</span>
                <div className="text-2xl font-black text-slate-900 mt-1 tabular-numbers">
                  {batchingMode === 'batched' ? '+4 min' : 'Baseline'}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium">
                  Well under 35m hot threshold
                </span>
              </div>
            </div>

            {/* Visual Route Flow */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
              <div className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                {batchingMode === 'batched'
                  ? 'Batched Routing Path (Sequential Co-Pickup & Dropoff)'
                  : 'Unbatched Dispatched Paths (Duplicate Deadhead Miles)'}
              </div>

              {batchingMode === 'batched' ? (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs bg-white p-3.5 rounded-lg border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">Pickup 1: Artisan Burger Co.</div>
                      <div className="text-slate-500 text-[11px]">Bag 1 placed in insulated thermal pocket</div>
                    </div>
                    <span className="font-mono text-slate-500 text-[11px]">0.0 km · 0 min</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs bg-white p-3.5 rounded-lg border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">Pickup 2: Tokyo Ramen (Same Plaza, 150m away)</div>
                      <div className="text-slate-500 text-[11px]">Bag 2 secured; 2 orders in courier cargo</div>
                    </div>
                    <span className="font-mono text-slate-500 text-[11px]">+0.2 km · +3 min</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs bg-white p-3.5 rounded-lg border border-emerald-300 bg-emerald-50/30">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">Dropoff 1: 742 Evergreen Terrace</div>
                      <div className="text-slate-500 text-[11px]">Customer Sarah receives hot burger (19 min total)</div>
                    </div>
                    <span className="font-mono text-emerald-700 text-[11px] font-bold">+4.8 km · +16 min</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs bg-white p-3.5 rounded-lg border border-emerald-300 bg-emerald-50/30">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      4
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">Dropoff 2: 890 Oak Ridge Way (600m away)</div>
                      <div className="text-slate-500 text-[11px]">Customer David receives steaming ramen (24 min total)</div>
                    </div>
                    <span className="font-mono text-emerald-700 text-[11px] font-bold">+1.2 km · +5 min</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Bike className="w-3.5 h-3.5 text-slate-600" /> Driver 1 (Sarah's Order)
                    </div>
                    <div className="text-slate-600 space-y-1 text-[11px]">
                      <div>Pickup: Artisan Burger Co.</div>
                      <div>Dropoff: 742 Evergreen Terrace (4.8 km)</div>
                      <div>Driver return / deadhead: 3.4 km</div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex justify-between font-mono text-[11px]">
                      <span>Cost: $5.80</span>
                      <span>Total: 8.2 km</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Bike className="w-3.5 h-3.5 text-slate-600" /> Driver 2 (David's Order)
                    </div>
                    <div className="text-slate-600 space-y-1 text-[11px]">
                      <div>Pickup: Tokyo Ramen Plaza</div>
                      <div>Dropoff: 890 Oak Ridge Way (5.2 km)</div>
                      <div>Driver return / deadhead: 3.0 km</div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex justify-between font-mono text-[11px]">
                      <span>Cost: $5.80</span>
                      <span>Total: 8.2 km</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Batching Rules Engine Specification */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 block">Algorithmic Batching Constraints (Safety Bounds):</span>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li><strong>Max Pick-up Gap:</strong> Second restaurant must be within 400m of the first merchant.</li>
                <li><strong>Max Drop-off Detour:</strong> Dropoff 2 must add no more than 6 minutes of driving to Dropoff 1.</li>
                <li><strong>Time-to-Door Cap:</strong> Neither order may exceed 32 minutes from kitchen ready to doorstep.</li>
                <li><strong>Bag Capacity Limit:</strong> Maximum 2 orders per scooter/bike courier; 3 orders for car courier.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* STRATEGY 2: CHICKEN AND EGG */}
      {activeStrategyTab === 'chicken_egg' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Marketplace Liquidity Architecture
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              The 3-Step Hyper-Local "Atomic Network" Playbook
            </h2>
            <p className="text-xs sm:text-base text-slate-600 mt-1">
              Food delivery is a neighborhood-by-neighborhood business. Launching city-wide without density dilutes liquidity. The solution is hyper-clustering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-400 block uppercase">Step 01: Pre-Supply (Weeks 1–3)</span>
              <h3 className="font-bold text-slate-900 text-base">Anchor Merchant Pre-Onboarding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Before releasing the consumer app, sign 20 high-frequency neighborhood favorites (pizza, burgers, sushi, ramen) within a strictly bounded 2.5 km diameter.
              </p>
              <div className="p-2.5 bg-white rounded border border-slate-200 text-[11px] text-slate-700 font-medium">
                Tactic: Offer 60-day commission holiday (12% instead of 22%) and provide free pre-configured Android KDS tablets.
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-400 block uppercase">Step 02: Fleet Density (Weeks 13–15)</span>
              <h3 className="font-bold text-slate-900 text-base">Guaranteed Driver Hourly Floor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Drivers won't stay active if they wait 40 minutes between orders. Establish a shift wage floor ($24/hour guaranteed) during peak lunch and dinner hours.
              </p>
              <div className="p-2.5 bg-white rounded border border-slate-200 text-[11px] text-slate-700 font-medium">
                Tactic: Schedule 8–10 dedicated shift couriers guaranteed 11:30am–2pm and 5:30pm–9pm to ensure sub-10 minute pickup SLA.
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-400 block uppercase">Step 03: Demand Ignition (Weeks 16–18)</span>
              <h3 className="font-bold text-slate-900 text-base">Hyper-Local Neighborhood Inbound</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Focus marketing spend exclusively on apartment complexes, office buildings, and university corridors located inside the active 2.5 km polygon.
              </p>
              <div className="p-2.5 bg-white rounded border border-slate-200 text-[11px] text-slate-700 font-medium">
                Tactic: "$10 off first order" direct mailers and QR posters placed directly inside residential lobbies in the cluster.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STRATEGY 3: UNIT ECONOMICS & CAC */}
      {activeStrategyTab === 'cac' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Growth & Margin Governance
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              CAC Reduction & Lifetime Value (LTV) Strategies
            </h2>
            <p className="text-xs sm:text-base text-slate-600 mt-1">
              High customer acquisition costs kill delivery startups. The path to profitability relies on repeat frequency and subscription memberships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Organic Viral Loops ("Give $10, Get $10")</h3>
              <p className="text-slate-600 leading-relaxed">
                Paid digital ads often drive CAC above $35. In-app referral links distributed to roommates and coworkers achieve a blended CAC under $14.
              </p>
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-slate-700">Referrer receives $10 credit only after referee completes first order.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-slate-700">Fraud heuristics block duplicate device IMEIs and virtual phone numbers.</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">FoodPass Subscription Tier ($9.99/mo)</h3>
              <p className="text-slate-600 leading-relaxed">
                Subscribers order 3.2x more frequently than non-members. While delivery fees are waived on orders over $15, the platform captures 20% commission on 8–10 orders per month.
              </p>
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-slate-700">Monthly recurring subscription covers server & insurance overhead.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-slate-700">LTV increases from $42 (casual) to $185 (annualized member).</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
