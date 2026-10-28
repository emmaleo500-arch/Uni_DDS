import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
  totalProgressPct: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  totalProgressPct
}) => {
  const navItems = [
    { id: 'timeline', label: 'Timeline & Sprints' },
    { id: 'modules', label: '3-Sided App Modules' },
    { id: 'architecture', label: 'Architecture & Schema' },
    { id: 'economics', label: 'Unit Economics' },
    { id: 'playbook', label: 'Launch Playbook' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('timeline')}
              className="text-left group cursor-pointer"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap group-hover:text-amber-600 transition-colors">
                FleetBite
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 font-normal ml-2">
                Platform Roadmap
              </span>
            </button>
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded text-xs text-slate-600">
              <span>Overall Progress</span>
              <span className="font-semibold text-slate-900 tabular-numbers">{totalProgressPct}%</span>
            </div>
          </div>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`cursor-pointer whitespace-nowrap transition-colors py-1 ${
                    isActive
                      ? 'text-slate-900 font-semibold border-b-2 border-amber-600'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenExport}
              className="cursor-pointer px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              Export Blueprint
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 text-xs whitespace-nowrap rounded font-medium ${
                activeTab === item.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
