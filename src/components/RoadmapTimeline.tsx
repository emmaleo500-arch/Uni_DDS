import React, { useState, useMemo } from 'react';
import { RoadmapPhase, RoadmapTask, Milestone, Track, TaskStatus } from '../types/roadmap';
import { MILESTONES } from '../data/roadmapData';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Search,
  Flag,
  ArrowRight,
  Plus,
  RefreshCw,
  Layers,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
  onUpdateTaskStatus: (phaseId: string, taskId: string, newStatus: TaskStatus) => void;
  onAddTask: (phaseId: string, task: Omit<RoadmapTask, 'id'>) => void;
  onResetTasks: () => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  phases,
  onUpdateTaskStatus,
  onAddTask,
  onResetTasks
}) => {
  const [selectedTrack, setSelectedTrack] = useState<Track>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    'phase-1': true,
    'phase-2': true,
    'phase-3': false,
    'phase-4': false,
    'phase-5': false
  });
  const [viewMode, setViewMode] = useState<'phases' | 'sprints' | 'milestones'>('phases');
  const [selectedTaskDetail, setSelectedTaskDetail] = useState<RoadmapTask | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [targetPhaseForNewTask, setTargetPhaseForNewTask] = useState<string>('phase-2');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskRole, setNewTaskRole] = useState('Full Stack Engineer');
  const [newTaskTrack, setNewTaskTrack] = useState<'frontend' | 'backend' | 'product_ux' | 'operations'>('backend');
  const [newTaskSprint, setNewTaskSprint] = useState(4);

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allExpanded = Object.keys(phases).reduce((acc, _, idx) => {
      acc[`phase-${idx + 1}`] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedPhases(allExpanded);
  };

  const collapseAll = () => {
    setExpandedPhases({});
  };

  // Status cycling
  const cycleStatus = (phaseId: string, task: RoadmapTask) => {
    const sequence: TaskStatus[] = ['not_started', 'in_progress', 'completed', 'blocked'];
    const currentIndex = sequence.indexOf(task.status);
    const nextStatus = sequence[(currentIndex + 1) % sequence.length];
    onUpdateTaskStatus(phaseId, task.id, nextStatus);
  };

  // Filter tasks
  const filteredPhases = useMemo(() => {
    return phases.map((phase) => {
      const filteredTasks = phase.tasks.filter((task) => {
        const matchesTrack = selectedTrack === 'all' || task.track === selectedTrack;
        const matchesSearch =
          searchQuery === '' ||
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.deliverable.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.assigneeRole.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTrack && matchesSearch;
      });
      return {
        ...phase,
        tasks: filteredTasks
      };
    });
  }, [phases, selectedTrack, searchQuery]);

  // Sprint grouped tasks
  const sprintGroups = useMemo(() => {
    const sprints: Record<number, { sprintNum: number; tasks: { task: RoadmapTask; phaseId: string }[] }> = {};
    for (let s = 1; s <= 12; s++) {
      sprints[s] = { sprintNum: s, tasks: [] };
    }
    phases.forEach((phase) => {
      phase.tasks.forEach((task) => {
        if (!sprints[task.sprint]) {
          sprints[task.sprint] = { sprintNum: task.sprint, tasks: [] };
        }
        sprints[task.sprint].tasks.push({ task, phaseId: phase.id });
      });
    });
    return sprints;
  }, [phases]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const phase = phases.find((p) => p.id === targetPhaseForNewTask);
    const startWeek = phase ? phase.startWeek : 1;
    const endWeek = phase ? phase.endWeek : 3;

    onAddTask(targetPhaseForNewTask, {
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || 'Custom roadmap work item.',
      track: newTaskTrack,
      sprint: Number(newTaskSprint),
      startWeek,
      endWeek,
      status: 'not_started',
      assigneeRole: newTaskRole,
      deliverable: `${newTaskTitle.trim()} Specification / Code Artifact`
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsAddingTask(false);
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Done
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
            <Clock className="w-3 h-3 text-amber-600" /> In Progress
          </span>
        );
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
            <AlertCircle className="w-3 h-3 text-rose-600" /> Blocked
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            To Do
          </span>
        );
    }
  };

  const getTrackColor = (track: string) => {
    switch (track) {
      case 'backend':
        return 'text-sky-700 bg-sky-50 border-sky-100';
      case 'frontend':
        return 'text-indigo-700 bg-indigo-50 border-indigo-100';
      case 'product_ux':
        return 'text-purple-700 bg-purple-50 border-purple-100';
      case 'operations':
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-100';
    }
  };

  const getTrackLabel = (track: string) => {
    switch (track) {
      case 'backend':
        return 'Backend & Cloud';
      case 'frontend':
        return 'Mobile & Web UI';
      case 'product_ux':
        return 'Product & Strategy';
      case 'operations':
        return 'Merchant & Fleet Ops';
      default:
        return track;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Section: Overview Header & High-level stats */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Platform Engineering & Launch Roadmap
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              A 24-week phased execution path structured across 12 sprints to design, engineer, stress-test, and scale a 3-sided food delivery ecosystem (Consumers, Restaurants, Fleet Drivers, Super Admin).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAddingTask(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" /> Add Task
            </button>
            <button
              onClick={onResetTasks}
              title="Reset tasks to initial blueprint"
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Phase Summary Cards Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6">
          {phases.map((p) => {
            const completedCount = p.tasks.filter((t) => t.status === 'completed').length;
            const pct = p.tasks.length > 0 ? Math.round((completedCount / p.tasks.length) * 100) : 0;
            return (
              <div
                key={p.id}
                onClick={() => {
                  setViewMode('phases');
                  setExpandedPhases({ [p.id]: true });
                }}
                className="cursor-pointer p-3.5 bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-lg border border-slate-200/70"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-slate-700">Phase {p.phaseNumber}</span>
                  <span className="tabular-numbers font-medium">{pct}%</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">{p.name}</h4>
                <div className="mt-2 text-[11px] text-slate-500">{p.durationLabel}</div>
                <div className="mt-2 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-amber-600 h-1 transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Bar: View Switcher & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setViewMode('phases')}
            className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'phases'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Phase View (5 Phases)
          </button>
          <button
            onClick={() => setViewMode('sprints')}
            className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'sprints'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sprint View (12 Sprints)
          </button>
          <button
            onClick={() => setViewMode('milestones')}
            className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'milestones'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Milestone Gates
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search deliverables, roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Track Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value as Track)}
              className="bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2 text-xs focus:bg-white focus:outline-hidden"
            >
              <option value="all">All Tracks</option>
              <option value="product_ux">Product & UX</option>
              <option value="backend">Backend & Cloud</option>
              <option value="frontend">Mobile & Web UI</option>
              <option value="operations">Operations & Fleet</option>
            </select>
          </div>

          {viewMode === 'phases' && (
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={expandAll}
                className="cursor-pointer px-2 py-1 text-slate-600 hover:text-slate-900"
              >
                Expand All
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={collapseAll}
                className="cursor-pointer px-2 py-1 text-slate-600 hover:text-slate-900"
              >
                Collapse
              </button>
            </div>
          )}
        </div>
      </div>

      {/* VIEW 1: PHASES ACCORDION */}
      {viewMode === 'phases' && (
        <div className="space-y-6">
          {filteredPhases.map((phase) => {
            const isExpanded = !!expandedPhases[phase.id];
            const completedTasks = phase.tasks.filter((t) => t.status === 'completed').length;
            const progressPct = phase.tasks.length > 0 ? Math.round((completedTasks / phase.tasks.length) * 100) : 0;

            return (
              <div
                key={phase.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-shadow hover:shadow-xs"
              >
                {/* Phase Header */}
                <div
                  onClick={() => togglePhase(phase.id)}
                  className="cursor-pointer p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors border-b border-slate-100"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <button className="text-slate-400 hover:text-slate-700 mt-1 sm:mt-0">
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                          Phase 0{phase.phaseNumber}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500 font-medium">
                          {phase.durationLabel}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        {phase.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:shrink-0 pl-8 sm:pl-0">
                    <div className="text-right">
                      <div className="text-xs text-slate-500">
                        {completedTasks} of {phase.tasks.length} Deliverables Complete
                      </div>
                      <div className="text-sm font-bold text-slate-900 tabular-numbers">
                        {progressPct}%
                      </div>
                    </div>
                    <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-600 h-2 transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Phase Expanded Content */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-6">
                    {/* Phase Objective & Key Outcomes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg text-xs leading-relaxed">
                      <div>
                        <div className="font-semibold text-slate-900 mb-1">Phase Core Objective</div>
                        <p className="text-slate-600">{phase.objective}</p>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 mb-1">Key Exit Outcomes</div>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside">
                          {phase.keyOutcomes.map((ko, idx) => (
                            <li key={idx}>{ko}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Task Table */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Deliverables & Sprints ({phase.tasks.length})
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          Click status badge to toggle task state
                        </span>
                      </div>

                      {phase.tasks.length === 0 ? (
                        <div className="text-center py-8 text-xs text-slate-400">
                          No tasks match the selected filters in this phase.
                        </div>
                      ) : (
                        <div className="border border-slate-200 rounded-lg overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                              <tr>
                                <th className="py-2.5 px-4">Task & Deliverable</th>
                                <th className="py-2.5 px-4">Track</th>
                                <th className="py-2.5 px-4">Sprint</th>
                                <th className="py-2.5 px-4">Role Lead</th>
                                <th className="py-2.5 px-4 text-center">Status</th>
                                <th className="py-2.5 px-4 text-right">Details</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {phase.tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-slate-50/70 transition-colors">
                                  <td className="py-3 px-4 max-w-sm">
                                    <div className="font-semibold text-slate-900">{task.title}</div>
                                    <div className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">
                                      {task.deliverable}
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 whitespace-nowrap">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${getTrackColor(task.track)}`}>
                                      {getTrackLabel(task.track)}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-700">
                                    Sprint {task.sprint}
                                    <span className="text-[11px] text-slate-400 block">
                                      Wk {task.startWeek}–{task.endWeek}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                                    {task.assigneeRole}
                                  </td>
                                  <td className="py-3 px-4 text-center whitespace-nowrap">
                                    <button
                                      onClick={() => cycleStatus(phase.id, task)}
                                      className="cursor-pointer transition-transform active:scale-95"
                                      title="Click to cycle status"
                                    >
                                      {getStatusBadge(task.status)}
                                    </button>
                                  </td>
                                  <td className="py-3 px-4 text-right whitespace-nowrap">
                                    <button
                                      onClick={() => setSelectedTaskDetail(task)}
                                      className="cursor-pointer text-slate-500 hover:text-slate-900 font-medium text-xs underline"
                                    >
                                      View
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: SPRINTS TIMELINE */}
      {viewMode === 'sprints' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Bi-Weekly Sprint Breakdown (2-Week Cadence)
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Organized into 12 two-week agile sprints supporting continuous deployment, automated test integration, and cross-functional synchronization.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(sprintGroups).map(([sprintKey, group]) => {
                const sNum = Number(sprintKey);
                const startWk = (sNum - 1) * 2 + 1;
                const endWk = sNum * 2;
                return (
                  <div
                    key={sprintKey}
                    className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                      <div>
                        <span className="text-xs font-bold text-slate-900">Sprint {sNum}</span>
                        <span className="text-[11px] text-slate-500 block">Weeks {startWk}–{endWk}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">
                        {group.tasks.length} Tasks
                      </span>
                    </div>

                    <div className="space-y-2">
                      {group.tasks.length === 0 ? (
                        <div className="text-[11px] text-slate-400 py-3 text-center">
                          Sprint buffer / stabilization window
                        </div>
                      ) : (
                        group.tasks.map(({ task, phaseId }) => (
                          <div
                            key={task.id}
                            className="bg-white p-2.5 rounded border border-slate-200 text-xs shadow-2xs hover:border-slate-300 transition-colors"
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${getTrackColor(task.track)}`}>
                                {getTrackLabel(task.track)}
                              </span>
                              <button
                                onClick={() => cycleStatus(phaseId, task)}
                                className="cursor-pointer"
                              >
                                {getStatusBadge(task.status)}
                              </button>
                            </div>
                            <div className="font-semibold text-slate-900 line-clamp-1">{task.title}</div>
                            <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                              Lead: {task.assigneeRole}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MILESTONE GATES */}
      {viewMode === 'milestones' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Critical Milestone Decision Gates
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Strict exit criteria required before transitioning between development, field testing, and commercial operations.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8">
            {MILESTONES.map((m, idx) => {
              const isReached = m.status === 'reached';
              return (
                <div key={m.id} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-white transition-colors ${
                      isReached
                        ? 'border-emerald-600 bg-emerald-600'
                        : 'border-slate-300 group-hover:border-amber-600'
                    }`}
                  />

                  <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 bg-slate-200 rounded text-slate-800 tabular-numbers">
                          Week {m.week}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        isReached ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                      }`}>
                        {isReached ? 'Gate Cleared' : 'Pending Verification'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mb-3">{m.description}</p>

                    <div className="pt-3 border-t border-slate-200/60">
                      <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Sign-Off Checklist:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {m.criteria.map((c, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-2">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isReached ? 'text-emerald-600' : 'text-slate-300'}`} />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTaskDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${getTrackColor(selectedTaskDetail.track)}`}>
                  {getTrackLabel(selectedTaskDetail.track)}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {selectedTaskDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTaskDetail(null)}
                className="cursor-pointer text-slate-400 hover:text-slate-700 text-lg leading-none p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedTaskDetail.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Sprint / Timeline</span>
                <span className="font-semibold text-slate-800">
                  Sprint {selectedTaskDetail.sprint} (Weeks {selectedTaskDetail.startWeek}–{selectedTaskDetail.endWeek})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Role Lead</span>
                <span className="font-semibold text-slate-800">
                  {selectedTaskDetail.assigneeRole}
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-lg text-xs">
              <span className="text-amber-800 font-semibold block mb-0.5">Primary Deliverable Artifact:</span>
              <span className="text-amber-900 font-mono text-[11px]">{selectedTaskDetail.deliverable}</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedTaskDetail(null)}
                className="cursor-pointer px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {isAddingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateTask}
            className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Roadmap Work Item</h3>
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="cursor-pointer text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Phase</label>
                <select
                  value={targetPhaseForNewTask}
                  onChange={(e) => setTargetPhaseForNewTask(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:bg-white"
                >
                  {phases.map((p) => (
                    <option key={p.id} value={p.id}>
                      Phase {p.phaseNumber}: {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Geofenced Driver Handshake v2"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Scope, acceptance criteria, or integration details..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Engineering Track</label>
                  <select
                    value={newTaskTrack}
                    onChange={(e) => setNewTaskTrack(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:bg-white"
                  >
                    <option value="backend">Backend & Cloud</option>
                    <option value="frontend">Mobile & Web UI</option>
                    <option value="product_ux">Product & UX</option>
                    <option value="operations">Operations & Fleet</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sprint (1–12)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={newTaskSprint}
                    onChange={(e) => setNewTaskSprint(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assignee Role Lead</label>
                <input
                  type="text"
                  value={newTaskRole}
                  onChange={(e) => setNewTaskRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="cursor-pointer px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Insert Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
