import React, { useState } from 'react';
import { 
  X, 
  History, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  ExternalLink,
  Filter
} from 'lucide-react';
import { ReleaseFormData } from './ReleaseForm';
import { Badge } from './ui/Badge';
import { EmptyState } from './ui/EmptyState';

export interface RunRecord {
  id: string;
  repoUrl: string;
  startDate: string;
  endDate: string;
  releaseType: 'Weekly' | 'Minor Release' | 'Major Release';
  timestamp: string;
  durationMs: number;
  status: 'verified' | 'failed' | 'warning';
  claimsCount: number;
  verifiedCount: number;
}

interface RunHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  runs: RunRecord[];
  onSelectRun: (record: RunRecord) => void;
}

export const RunHistoryModal: React.FC<RunHistoryModalProps> = ({
  isOpen,
  onClose,
  runs,
  onSelectRun,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'failed'>('all');

  if (!isOpen) return null;

  const filteredRuns = runs.filter((run) => {
    const matchesSearch = run.repoUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || run.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="run-history-title"
      >
        {/* Header */}
        <div className="bg-[#0B1220] px-6 py-4 flex items-center justify-between border-b border-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 id="run-history-title" className="text-base font-bold text-white tracking-tight">
                Release Generation Run History
              </h3>
              <p className="text-xs text-slate-400">
                Session execution log and AST verification audits
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repository or run ID..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {(['all', 'verified', 'failed'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className={`text-xs px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                  statusFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {runs.length === 0 ? (
            <EmptyState
              icon={History}
              title="No Release Runs in this Session"
              description="You have not triggered any release note generation runs yet. Use the workspace to connect a repository and generate verified notes."
              action={{
                label: 'Generate Release Notes',
                onClick: onClose,
              }}
            />
          ) : filteredRuns.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No runs match your search query "{searchQuery}".
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRuns.map((run) => (
                <div
                  key={run.id}
                  onClick={() => onSelectRun(run)}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {run.id}
                      </span>
                      <Badge
                        variant={run.status === 'verified' ? 'verified' : 'error'}
                        size="sm"
                        icon={run.status === 'verified' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      >
                        {run.status === 'verified' ? 'Verified & Audited' : 'Audit Failed'}
                      </Badge>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {run.releaseType}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-800">
                      {run.repoUrl.replace('https://github.com/', '')}
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center gap-3">
                      <span>Window: {run.startDate} → {run.endDate}</span>
                      <span>•</span>
                      <span>{run.claimsCount} claims ({run.verifiedCount} verified)</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{run.durationMs}ms</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {run.timestamp}
                    </div>
                    <div className="text-xs text-blue-600 font-medium group-hover:underline inline-flex items-center gap-1 mt-1">
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>Total runs recorded: {runs.length}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
