import React, { useState } from 'react';
import { RoadmapPhase } from '../types/roadmap';
import { MILESTONES, PLATFORM_MODULES } from '../data/roadmapData';
import { Download, Copy, Check, Printer, FileText, X } from 'lucide-react';

interface ExecutiveExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  phases: RoadmapPhase[];
  totalProgressPct: number;
}

export const ExecutiveExportModal: React.FC<ExecutiveExportModalProps> = ({
  isOpen,
  onClose,
  phases,
  totalProgressPct
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = phases.reduce(
    (acc, p) => acc + p.tasks.filter((t) => t.status === 'completed').length,
    0
  );

  const getExportData = () => {
    return {
      title: 'Food Delivery Platform Executive Roadmap & Architecture Blueprint',
      generatedAt: new Date().toISOString(),
      overallProgress: `${totalProgressPct}%`,
      totalDeliverables: totalTasks,
      completedDeliverables: completedTasks,
      phases: phases.map((p) => ({
        phase: p.phaseNumber,
        name: p.name,
        duration: p.durationLabel,
        objective: p.objective,
        outcomes: p.keyOutcomes,
        tasks: p.tasks.map((t) => ({
          title: t.title,
          track: t.track,
          sprint: t.sprint,
          status: t.status,
          deliverable: t.deliverable,
          role: t.assigneeRole
        }))
      })),
      milestones: MILESTONES,
      modules: PLATFORM_MODULES.map((m) => ({
        module: m.name,
        platform: m.targetPlatform,
        persona: m.userPersona,
        features: m.features.map((f) => ({
          name: f.name,
          priority: f.priority,
          techStack: f.techStack
        }))
      }))
    };
  };

  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(getExportData(), null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(getExportData(), null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'food-delivery-platform-roadmap.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-800" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Executive Blueprint & Roadmap Export
              </h2>
              <span className="text-xs text-slate-500">
                Comprehensive 24-week delivery platform strategy & implementation plan
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-slate-700 p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed font-sans">
          {/* Executive Overview Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
              <span>FleetBite 3-Sided Marketplace Plan</span>
              <span className="text-emerald-700 font-mono">{totalProgressPct}% Project Readiness</span>
            </div>
            <p className="text-slate-600">
              This roadmap specifies the 24-week critical path to launch a full-scale food delivery marketplace across mobile (Customer & Driver native apps), tablet (Kitchen KDS), and web (Super Admin).
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/70 text-[11px]">
              <div>
                <span className="text-slate-400 block uppercase">Phases / Sprints</span>
                <span className="font-bold text-slate-800">5 Phases · 12 Sprints</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase">Core Deliverables</span>
                <span className="font-bold text-slate-800">{totalTasks} Work Items</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase">Target Pilot Stack</span>
                <span className="font-bold text-slate-800">PostGIS + Redis + Stripe</span>
              </div>
            </div>
          </div>

          {/* Phase By Phase Summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Phased Execution Schedule
            </h3>
            <div className="space-y-2.5">
              {phases.map((p) => (
                <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      Phase {p.phaseNumber}: {p.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{p.durationLabel}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{p.objective}</p>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Deliverables: {p.tasks.map((t) => t.title).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Milestones */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Critical Milestone Decision Gates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {MILESTONES.map((m) => (
                <div key={m.id} className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900">Wk {m.week}: {m.title}</div>
                  <div className="text-slate-500 mt-0.5">{m.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJson}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Brief</span>
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
