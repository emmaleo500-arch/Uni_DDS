import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Percent,
  PieChart,
  Calculator,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const UnitEconomics: React.FC = () => {
  // Input parameters
  const [aov, setAov] = useState<number>(34.0);
  const [commissionPct, setCommissionPct] = useState<number>(20.0);
  const [deliveryFee, setDeliveryFee] = useState<number>(3.99);
  const [serviceFee, setServiceFee] = useState<number>(2.50);
  const [driverPayout, setDriverPayout] = useState<number>(5.80);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(15000);
  const [fixedOverhead, setFixedOverhead] = useState<number>(4500);

  // Financial calculations
  const merchantCommissionRevenue = aov * (commissionPct / 100);
  const merchantNetPayout = aov - merchantCommissionRevenue;

  // Total amount charged to customer credit card (Food subtotal + delivery + service fee)
  const customerTotalPaid = aov + deliveryFee + serviceFee;

  // Payment gateway fee: 2.9% + $0.30
  const paymentFee = customerTotalPaid * 0.029 + 0.30;

  // Platform gross inflows per order
  const grossPlatformInflow = merchantCommissionRevenue + deliveryFee + serviceFee;

  // Platform direct fulfillment costs per order
  const directFulfillmentCost = driverPayout + paymentFee;

  // Net platform contribution margin per order
  const netContributionPerOrder = grossPlatformInflow - directFulfillmentCost;
  const netMarginPct = (netContributionPerOrder / customerTotalPaid) * 100;

  // Monthly aggregates
  const monthlyGMV = customerTotalPaid * monthlyOrders;
  const monthlyGrossRevenue = grossPlatformInflow * monthlyOrders;
  const monthlyDriverDisbursements = driverPayout * monthlyOrders;
  const monthlyPaymentFees = paymentFee * monthlyOrders;
  const monthlyContributionMargin = netContributionPerOrder * monthlyOrders;
  const monthlyNetOperatingIncome = monthlyContributionMargin - fixedOverhead;

  // Breakeven order volume
  const breakevenOrders = netContributionPerOrder > 0
    ? Math.ceil(fixedOverhead / netContributionPerOrder)
    : Infinity;

  const resetToStandard = () => {
    setAov(34.0);
    setCommissionPct(20.0);
    setDeliveryFee(3.99);
    setServiceFee(2.50);
    setDriverPayout(5.80);
    setMonthlyOrders(15000);
    setFixedOverhead(4500);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Unit Economics & Marketplace Financial Model
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              Model platform margins, calibrate restaurant commission against driver pay floors, and forecast monthly breakeven thresholds.
            </p>
          </div>
          <button
            onClick={resetToStandard}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        {/* High-Level Per-Order KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">
              Net Margin Per Order
            </span>
            <div className={`text-2xl font-black mt-1 tabular-numbers ${
              netContributionPerOrder >= 0 ? 'text-emerald-700' : 'text-rose-600'
            }`}>
              ${netContributionPerOrder.toFixed(2)}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {netMarginPct.toFixed(1)}% of total order value
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">
              Monthly Net Contribution
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1 tabular-numbers">
              ${(monthlyContributionMargin / 1000).toFixed(1)}k
            </div>
            <span className="text-xs text-slate-500 font-medium">
              At {monthlyOrders.toLocaleString()} orders/month
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">
              Breakeven Threshold
            </span>
            <div className="text-2xl font-black text-amber-700 mt-1 tabular-numbers">
              {breakevenOrders === Infinity ? 'Unattainable' : `${breakevenOrders.toLocaleString()}`}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Orders/mo to cover fixed costs
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">
              Monthly GMV (Gross Value)
            </span>
            <div className="text-2xl font-black text-indigo-700 mt-1 tabular-numbers">
              ${(monthlyGMV / 1000).toFixed(0)}k
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Total transaction flow
            </span>
          </div>
        </div>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Sliders (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Marketplace Economics Parameters
            </h2>
            <span className="text-[11px] text-slate-400">Adjust to simulate</span>
          </div>

          {/* Slider 1: Average Order Value */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Average Order Value (AOV):</span>
              <span className="font-bold text-slate-900 font-mono text-sm">${aov.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={18}
              max={65}
              step={1}
              value={aov}
              onChange={(e) => setAov(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$18.00 (Casual Fast Food)</span>
              <span>$35.00 (Dinner for 2)</span>
              <span>$65.00 (Family Dinner)</span>
            </div>
          </div>

          {/* Slider 2: Restaurant Commission */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Restaurant Commission Rate:</span>
              <span className="font-bold text-amber-700 font-mono text-sm">{commissionPct}%</span>
            </div>
            <input
              type="range"
              min={12}
              max={30}
              step={1}
              value={commissionPct}
              onChange={(e) => setCommissionPct(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>12% (Pilot/Subsidized)</span>
              <span>20% (Standard)</span>
              <span>30% (High Density/Premium)</span>
            </div>
          </div>

          {/* Slider 3: Customer Delivery Fee */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Customer Delivery Fee:</span>
              <span className="font-bold text-slate-900 font-mono text-sm">${deliveryFee.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={7}
              step={0.5}
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$0.00 (Promo Free Delivery)</span>
              <span>$3.99 (Standard Zone)</span>
              <span>$7.00 (Long Distance/Surge)</span>
            </div>
          </div>

          {/* Slider 4: Customer Platform Service Fee */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Platform Service Fee:</span>
              <span className="font-bold text-slate-900 font-mono text-sm">${serviceFee.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={4.5}
              step={0.25}
              value={serviceFee}
              onChange={(e) => setServiceFee(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$1.00</span>
              <span>$2.50</span>
              <span>$4.50</span>
            </div>
          </div>

          {/* Slider 5: Driver Payout per Order */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Driver Courier Payout (Base + Distance):</span>
              <span className="font-bold text-slate-900 font-mono text-sm">${driverPayout.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={3.5}
              max={9.0}
              step={0.25}
              value={driverPayout}
              onChange={(e) => setDriverPayout(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$3.50 (Batched dropoff)</span>
              <span>$5.80 (Average 2.5km run)</span>
              <span>$9.00 (Peak rush minimum)</span>
            </div>
          </div>

          {/* Slider 6: Monthly Order Scale */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Monthly Order Scale:</span>
              <span className="font-bold text-indigo-700 font-mono text-sm">
                {monthlyOrders.toLocaleString()} orders
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={50000}
              step={1000}
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1k (Soft launch beta)</span>
              <span>15k (City district)</span>
              <span>50k (Metropolitan maturity)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Breakdown Table & Profit Waterfall (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Per-Order Waterfall Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Per-Order Financial Ledger Breakdown
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Unit Basis</span>
            </div>

            {/* Visual stacked bar */}
            <div>
              <div className="text-[11px] text-slate-500 mb-1.5 flex justify-between">
                <span>Total Customer Charge: <strong>${customerTotalPaid.toFixed(2)}</strong></span>
                <span className="text-emerald-700 font-bold">
                  Net Retained: ${netContributionPerOrder.toFixed(2)}
                </span>
              </div>
              <div className="h-4 w-full rounded-md overflow-hidden flex text-[9px] font-bold text-white text-center">
                <div
                  style={{ width: `${(merchantNetPayout / customerTotalPaid) * 100}%` }}
                  className="bg-slate-400 flex items-center justify-center truncate px-1"
                  title={`Merchant Share: $${merchantNetPayout.toFixed(2)}`}
                >
                  Rest.
                </div>
                <div
                  style={{ width: `${(driverPayout / customerTotalPaid) * 100}%` }}
                  className="bg-amber-500 flex items-center justify-center truncate px-1"
                  title={`Driver Courier: $${driverPayout.toFixed(2)}`}
                >
                  Driver
                </div>
                <div
                  style={{ width: `${(paymentFee / customerTotalPaid) * 100}%` }}
                  className="bg-slate-600 flex items-center justify-center truncate px-1"
                  title={`Payment Gateway: $${paymentFee.toFixed(2)}`}
                >
                  Stripe
                </div>
                <div
                  style={{ width: `${Math.max(0, (netContributionPerOrder / customerTotalPaid) * 100)}%` }}
                  className="bg-emerald-600 flex items-center justify-center truncate px-1"
                  title={`Platform Net Cut: $${netContributionPerOrder.toFixed(2)}`}
                >
                  Platform
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                <span>Restaurant: ${merchantNetPayout.toFixed(2)}</span>
                <span>Driver: ${driverPayout.toFixed(2)}</span>
                <span>Stripe: ${paymentFee.toFixed(2)}</span>
                <span className="font-bold text-emerald-700">Platform: ${netContributionPerOrder.toFixed(2)}</span>
              </div>
            </div>

            {/* Tabular Details */}
            <div className="space-y-2 text-xs divide-y divide-slate-100 pt-2">
              <div className="flex justify-between py-1 text-slate-700">
                <span>Customer Basket Food Subtotal</span>
                <span className="font-mono tabular-numbers">${aov.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-700">
                <span>Restaurant Commission ({commissionPct}%)</span>
                <span className="font-mono tabular-numbers text-emerald-700">+${merchantCommissionRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-700">
                <span>Delivery Fee Collected</span>
                <span className="font-mono tabular-numbers text-emerald-700">+${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-700">
                <span>Platform Service Fee</span>
                <span className="font-mono tabular-numbers text-emerald-700">+${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 font-semibold text-slate-900 bg-slate-50 px-2 rounded">
                <span>Gross Platform Revenue</span>
                <span className="font-mono tabular-numbers">${grossPlatformInflow.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span>Driver Courier Payout</span>
                <span className="font-mono tabular-numbers text-rose-600">-${driverPayout.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span>Credit Card Processing (2.9% + $0.30)</span>
                <span className="font-mono tabular-numbers text-rose-600">-${paymentFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-sm text-slate-900 bg-emerald-50/70 border border-emerald-200/60 px-2.5 rounded-lg">
                <span>Net Contribution Margin</span>
                <span className="font-mono tabular-numbers text-emerald-800">
                  ${netContributionPerOrder.toFixed(2)} ({netMarginPct.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Monthly P&L Summary */}
          <div className="bg-slate-900 text-white rounded-xl p-6 space-y-3">
            <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider">
                Monthly P&L Projections ({monthlyOrders.toLocaleString()} Orders)
              </span>
              <span className="font-mono text-slate-400 text-[11px]">RUN RATE</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Gross Platform Net Inflow:</span>
                <span className="font-mono tabular-numbers font-bold text-white">
                  ${monthlyGrossRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Courier Fleet Payouts:</span>
                <span className="font-mono tabular-numbers text-amber-300">
                  -${monthlyDriverDisbursements.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Payment Processing Fees:</span>
                <span className="font-mono tabular-numbers text-slate-400">
                  -${monthlyPaymentFees.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Cloud & Server Overhead:</span>
                <span className="font-mono tabular-numbers text-slate-400">
                  -${fixedOverhead.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold">
                <span>Net Operating Income:</span>
                <span className={`font-mono tabular-numbers ${
                  monthlyNetOperatingIncome >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  ${monthlyNetOperatingIncome.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
