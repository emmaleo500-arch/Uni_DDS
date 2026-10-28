import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import {
  Battery,
  Zap,
  TrendingDown,
  Clock,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Calendar,
  CheckCircle2,
  Info
} from 'lucide-react';

export interface DayMetric {
  dayIndex: number;
  dateStr: string;
  missionsCount: number;
  avgBatteryDrainPct: number;
  avgFlightTimeMins: number;
  avgPayloadKg: number;
  avgWindKnots: number;
  efficiencyWhPerKm: number;
  onTimeSlaPct: number;
}

export interface HourlyProfile {
  hour: number;
  label: string;
  missions: number;
  avgBatteryDrain: number;
  optimalChargingSlot: boolean;
}

export const DronePerformanceMetrics: React.FC = () => {
  const [selectedDrone, setSelectedDrone] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<30 | 14 | 7>(30);
  const [activeMetricView, setActiveMetricView] = useState<'drain' | 'efficiency' | 'time'>('drain');

  // Tooltip state
  const [hoveredPoint, setHoveredPoint] = useState<DayMetric | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // SVG Refs
  const trendSvgRef = useRef<SVGSVGElement | null>(null);
  const diurnalSvgRef = useRef<SVGSVGElement | null>(null);

  // Generate 30 days of realistic drone telemetry data
  const rawData: DayMetric[] = useMemo(() => {
    const list: DayMetric[] = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Simulate variations: mid-week peak, weekend lulls, occasional windy days
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const missions = isWeekend ? Math.floor(18 + Math.sin(i) * 5) : Math.floor(42 + Math.cos(i) * 8);

      const wind = 5 + Math.sin(i * 0.8) * 3 + (i % 7 === 0 ? 6 : 0); // wind knots
      const payload = 1.25 + Math.sin(i * 0.5) * 0.35; // kg
      const flightTime = 4.2 + (wind * 0.08) + (payload * 0.2); // mins

      // Battery drain % increases with wind and payload
      const baseDrain = selectedDrone === 'DDS-Zephyr-04' ? 14.5 : 10.5;
      const batteryDrain = baseDrain + (wind * 0.25) + (payload * 1.8) + (Math.sin(i) * 0.8);
      const efficiency = 14.2 + (batteryDrain * 0.85); // Wh/km

      list.push({
        dayIndex: 30 - i,
        dateStr,
        missionsCount: missions,
        avgBatteryDrainPct: Number(batteryDrain.toFixed(1)),
        avgFlightTimeMins: Number(flightTime.toFixed(1)),
        avgPayloadKg: Number(payload.toFixed(2)),
        avgWindKnots: Number(wind.toFixed(1)),
        efficiencyWhPerKm: Number(efficiency.toFixed(1)),
        onTimeSlaPct: Number((98.5 - (wind > 10 ? 3.5 : 0.8)).toFixed(1))
      });
    }
    return list;
  }, [selectedDrone]);

  // Filtered dataset based on timeframe
  const data = useMemo(() => {
    return rawData.slice(rawData.length - selectedTimeframe);
  }, [rawData, selectedTimeframe]);

  // 24-hour diurnal delivery and charging load
  const diurnalData: HourlyProfile[] = useMemo(() => {
    const hours: HourlyProfile[] = [];
    for (let h = 8; h <= 22; h++) {
      let missions = 4;
      let drain = 9.8;
      let optimal = false;

      if (h >= 11 && h <= 13) {
        missions = 18; // lunch rush
        drain = 13.4;
      } else if (h >= 17 && h <= 20) {
        missions = 24; // dinner rush
        drain = 14.1;
      } else if (h >= 14 && h <= 16) {
        missions = 6; // afternoon lull
        drain = 10.2;
        optimal = true; // Best slot for rapid battery rebalancing
      }

      hours.push({
        hour: h,
        label: `${h}:00`,
        missions,
        avgBatteryDrain: drain,
        optimalChargingSlot: optimal
      });
    }
    return hours;
  }, []);

  // Summary statistics
  const avgDrain = useMemo(() => {
    return (data.reduce((acc, d) => acc + d.avgBatteryDrainPct, 0) / data.length).toFixed(1);
  }, [data]);

  const avgFlightTime = useMemo(() => {
    return (data.reduce((acc, d) => acc + d.avgFlightTimeMins, 0) / data.length).toFixed(1);
  }, [data]);

  const totalSorties = useMemo(() => {
    return data.reduce((acc, d) => acc + d.missionsCount, 0);
  }, [data]);

  const avgEfficiency = useMemo(() => {
    return (data.reduce((acc, d) => acc + d.efficiencyWhPerKm, 0) / data.length).toFixed(1);
  }, [data]);

  // D3 Render: 30-Day Trend Chart
  useEffect(() => {
    if (!trendSvgRef.current || data.length === 0) return;

    const svg = d3.select(trendSvgRef.current);
    svg.selectAll('*').remove();

    const width = 640;
    const height = 240;
    const margin = { top: 20, right: 30, bottom: 35, left: 45 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define X & Y scales
    const xScale = d3
      .scalePoint<string>()
      .domain(data.map((d) => d.dateStr))
      .range([0, innerWidth])
      .padding(0.1);

    const getValue = (d: DayMetric) => {
      if (activeMetricView === 'drain') return d.avgBatteryDrainPct;
      if (activeMetricView === 'efficiency') return d.efficiencyWhPerKm;
      return d.avgFlightTimeMins;
    };

    const yMin = (d3.min(data, getValue) || 0) * 0.85;
    const yMax = (d3.max(data, getValue) || 20) * 1.15;

    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .nice()
      .range([innerHeight, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#f1f5f9')
      .attr('stroke-dasharray', '2,2');

    g.select('.domain').remove();

    // Gradient for area fill
    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'metric-area-grad')
      .attr('x1', '0')
      .attr('y1', '0')
      .attr('x2', '0')
      .attr('y2', '1');

    const primaryColor =
      activeMetricView === 'drain'
        ? '#d97706' // amber
        : activeMetricView === 'efficiency'
        ? '#0284c7' // sky
        : '#10b981'; // emerald

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', primaryColor)
      .attr('stop-opacity', 0.35);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', primaryColor)
      .attr('stop-opacity', 0.0);

    // Area Generator
    const areaGenerator = d3
      .area<DayMetric>()
      .x((d) => xScale(d.dateStr) || 0)
      .y0(innerHeight)
      .y1((d) => yScale(getValue(d)))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#metric-area-grad)')
      .attr('d', areaGenerator);

    // Line Generator
    const lineGenerator = d3
      .line<DayMetric>()
      .x((d) => xScale(d.dateStr) || 0)
      .y((d) => yScale(getValue(d)))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', primaryColor)
      .attr('stroke-width', 2.5)
      .attr('d', lineGenerator);

    // X Axis (sample every 4th or 5th label to prevent clutter)
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(
        xScale.domain().filter((_, idx) => {
          const step = selectedTimeframe === 30 ? 5 : selectedTimeframe === 14 ? 2 : 1;
          return idx % step === 0 || idx === data.length - 1;
        })
      );

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .call((axis) => axis.select('.domain').attr('stroke', '#cbd5e1'))
      .selectAll('text')
      .attr('fill', '#64748b')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono');

    // Y Axis
    const yAxisUnit =
      activeMetricView === 'drain' ? '%' : activeMetricView === 'efficiency' ? 'Wh/km' : 'm';
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((v) => `${v}${yAxisUnit}`);

    g.append('g')
      .call(yAxis)
      .call((axis) => axis.select('.domain').remove())
      .selectAll('text')
      .attr('fill', '#64748b')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono');

    // Interactive Hover Data Dots
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.dateStr) || 0)
      .attr('cy', (d) => yScale(getValue(d)))
      .attr('r', 4)
      .attr('fill', '#ffffff')
      .attr('stroke', primaryColor)
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', (event, d) => {
        const [x, y] = d3.pointer(event, trendSvgRef.current);
        setHoveredPoint(d);
        setTooltipPos({ x: x + 15, y: y - 10 });
      })
      .on('mouseleave', () => {
        setHoveredPoint(null);
        setTooltipPos(null);
      });
  }, [data, activeMetricView, selectedTimeframe]);

  // D3 Render: Diurnal Hourly Bar Chart
  useEffect(() => {
    if (!diurnalSvgRef.current) return;

    const svg = d3.select(diurnalSvgRef.current);
    svg.selectAll('*').remove();

    const width = 640;
    const height = 180;
    const margin = { top: 15, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(diurnalData.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.25);

    const maxMissions = d3.max(diurnalData, (d) => d.missions) || 25;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxMissions * 1.15])
      .nice()
      .range([innerHeight, 0]);

    // Bars
    g.selectAll('.bar')
      .data(diurnalData)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.label) || 0)
      .attr('y', (d) => yScale(d.missions))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d.missions))
      .attr('rx', 3)
      .attr('fill', (d) => (d.optimalChargingSlot ? '#10b981' : d.missions > 15 ? '#f59e0b' : '#334155'))
      .attr('opacity', 0.9);

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .call((axis) => axis.select('.domain').attr('stroke', '#cbd5e1'))
      .selectAll('text')
      .attr('fill', '#64748b')
      .attr('font-size', '9px')
      .attr('font-family', 'JetBrains Mono');

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(4))
      .call((axis) => axis.select('.domain').remove())
      .selectAll('text')
      .attr('fill', '#64748b')
      .attr('font-size', '9px')
      .attr('font-family', 'JetBrains Mono');
  }, [diurnalData]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Component Title & Filter Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-700">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>DRONE PERFORMANCE ANALYTICS & BATTERY OPTIMIZER</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Fleet Energy Efficiency & Delivery Telemetry
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            D3-powered longitudinal analysis of battery consumption, payload drag, and charging scheduling over the last 30 days.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Drone Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Drone:</span>
            <select
              value={selectedDrone}
              onChange={(e) => setSelectedDrone(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs focus:bg-white text-slate-800"
            >
              <option value="all">All Active Fleet</option>
              <option value="DDS-Aero-X1">DDS-Aero-X1 (Hexacopter)</option>
              <option value="DDS-Swift-02">DDS-Swift-02 (eVTOL Quad)</option>
              <option value="DDS-Valkyrie-03">DDS-Valkyrie-03 (Hexacopter)</option>
              <option value="DDS-Zephyr-04">DDS-Zephyr-04 (High-Cycle Pack)</option>
            </select>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
            {([30, 14, 7] as const).map((days) => (
              <button
                key={days}
                onClick={() => setSelectedTimeframe(days)}
                className={`cursor-pointer px-2.5 py-1 rounded font-semibold text-[11px] transition-colors ${
                  selectedTimeframe === days
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
            Avg Battery Drain / Flight
          </span>
          <div className="text-2xl font-black text-amber-700 mt-0.5 tabular-numbers font-mono">
            {avgDrain}%
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Nominal LiPo threshold: &lt; 15%
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
            Energy Efficiency Index
          </span>
          <div className="text-2xl font-black text-sky-700 mt-0.5 tabular-numbers font-mono">
            {avgEfficiency} <span className="text-xs font-normal text-slate-500">Wh/km</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">
            +12.4% vs industry baseline
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
            Average Flight Transit
          </span>
          <div className="text-2xl font-black text-slate-900 mt-0.5 tabular-numbers font-mono">
            {avgFlightTime} <span className="text-xs font-normal text-slate-500">mins</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Campus pad-to-pad transit
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
            Total Deliveries Logged
          </span>
          <div className="text-2xl font-black text-indigo-700 mt-0.5 tabular-numbers font-mono">
            {totalSorties}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Last {selectedTimeframe} days
          </span>
        </div>
      </div>

      {/* CHART 1: D3 Multi-day Longitudinal Telemetry Trend */}
      <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="font-bold text-xs uppercase tracking-wider text-slate-800">
              Longitudinal Performance Curve ({selectedTimeframe}-Day Window)
            </div>
            <div className="text-[11px] text-slate-500">
              Correlation between battery consumption, flight speed, and meteorological drag
            </div>
          </div>

          {/* Metric View Switcher */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs self-start sm:self-auto">
            <button
              onClick={() => setActiveMetricView('drain')}
              className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                activeMetricView === 'drain'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Battery Drain (%)
            </button>
            <button
              onClick={() => setActiveMetricView('efficiency')}
              className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                activeMetricView === 'efficiency'
                  ? 'bg-sky-600 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Efficiency (Wh/km)
            </button>
            <button
              onClick={() => setActiveMetricView('time')}
              className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                activeMetricView === 'time'
                  ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Transit Time (min)
            </button>
          </div>
        </div>

        {/* SVG Container with relative positioning for Tooltip */}
        <div className="relative w-full overflow-x-auto">
          <svg
            ref={trendSvgRef}
            viewBox="0 0 640 240"
            className="w-full h-auto max-h-[250px] min-w-[500px]"
          />

          {/* D3 Interactive Tooltip Popup */}
          {hoveredPoint && tooltipPos && (
            <div
              className="absolute pointer-events-none z-30 p-2.5 bg-slate-900 text-white text-[11px] rounded-lg shadow-lg border border-slate-700 space-y-1 w-44"
              style={{
                left: Math.min(tooltipPos.x, 480),
                top: Math.max(tooltipPos.y, 10)
              }}
            >
              <div className="font-bold text-amber-400 border-b border-slate-700 pb-1 flex justify-between">
                <span>{hoveredPoint.dateStr}</span>
                <span>{hoveredPoint.missionsCount} Flights</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Battery Drain:</span>
                <span className="font-mono font-bold text-white">
                  {hoveredPoint.avgBatteryDrainPct}%
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Energy:</span>
                <span className="font-mono font-bold text-sky-400">
                  {hoveredPoint.efficiencyWhPerKm} Wh/km
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Avg Payload:</span>
                <span className="font-mono text-slate-200">
                  {hoveredPoint.avgPayloadKg} kg
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Wind Speed:</span>
                <span className="font-mono text-slate-200">
                  {hoveredPoint.avgWindKnots} kts
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CHART 2: Diurnal Flight Scheduling & Rapid Dock Rebalancing Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 24h Hourly Demand & Charging Window Chart (7 cols) */}
        <div className="lg:col-span-7 border border-slate-200 rounded-xl p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Hourly Delivery Volume & Battery Load (8:00 AM – 10:00 PM)
              </div>
              <div className="text-[11px] text-slate-500">
                Green bars indicate optimal rapid-dock battery cell rebalancing windows
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              ref={diurnalSvgRef}
              viewBox="0 0 640 180"
              className="w-full h-auto max-h-[190px] min-w-[460px]"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-xs" /> Peak Rush Load (Lunch & Dinner)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs" /> Optimal Rebalancing Window (14:00-16:00)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-slate-700 rounded-xs" /> Baseline Transit
            </span>
          </div>
        </div>

        {/* Right: AI Battery Optimization & Scheduling Protocol (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-200">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Battery Life Extension & Scheduling Recommendations</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>1. Afternoon Dock Rotation</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  +18% Cell Life
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Rotate 2 drones to low-rate inductive charging between 14:00 and 16:30 to cool battery packs before the 18:00 dinner rush.
              </p>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>2. Dynamic Winch Altitude Adaptation</span>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                  Save 1.4 Wh/km
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                When wind exceeds 9 knots, lower cruising corridor from 45m to 35m AGL to reduce crosswind hover stabilization power.
              </p>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>3. Payload Matching Rule</span>
                <span className="text-[10px] font-mono text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                  Schedule Rule
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Route single-coffee and bakery deliveries (&lt; 0.6 kg) strictly to DDS-Swift-02; preserve heavier Hexacopters for &gt; 1.5 kg family dinners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
