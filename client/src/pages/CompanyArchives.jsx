import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import api from '../services/api';
import {
  Building,
  Search,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Sparkles,
  Award,
  Layers,
  Code2,
  CalendarCheck
} from 'lucide-react';

export const CompanyArchives = () => {
  const { addDsaProblem, addRevision } = useData();

  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('comp-google');
  const [search, setSearch] = useState('');
  const [addedMap, setAddedMap] = useState({});

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const res = await api.get('/company-archives');
        if (res?.data) {
          setCompanies(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchArchives();
  }, []);

  const selectedCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  const handleAddProblem = async (q) => {
    await addDsaProblem({
      title: q.title,
      topic: q.topic,
      difficulty: q.difficulty,
      status: 'Needs Revision',
      timeComplexity: q.complexity.split(',')[0] || 'O(n)',
      spaceComplexity: q.complexity.split(',')[1] || 'O(1)',
      notes: `Target Company: ${selectedCompany?.name || 'Tier-1'}`
    });
    setAddedMap(prev => ({ ...prev, [q.id]: 'Added to DSA!' }));
    setTimeout(() => setAddedMap(prev => ({ ...prev, [q.id]: null })), 3000);
  };

  const handleAddRevision = async (q) => {
    await addRevision({
      topic: `${selectedCompany?.name}: ${q.title}`,
      category: 'DSA',
      priority: q.difficulty === 'Hard' ? 'High' : 'Medium',
      scheduledDate: new Date().toISOString().split('T')[0],
      notes: `Company Focus: ${selectedCompany?.interviewFocus}`
    });
    setAddedMap(prev => ({ ...prev, [q.id]: 'Scheduled for Revision!' }));
    setTimeout(() => setAddedMap(prev => ({ ...prev, [q.id]: null })), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Building className="w-6 h-6 text-indigo-400" /> Tier-1 Placement Archives & Experiences
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real interview questions, hiring rounds, and technical focus areas for Google, Microsoft, Amazon, Uber & Atlassian.
          </p>
        </div>
      </div>

      {/* Company Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {companies.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedCompanyId(c.id)}
            className={`p-4 rounded-2xl border text-center transition-all space-y-1 ${
              selectedCompanyId === c.id
                ? 'bg-indigo-950/60 border-indigo-600/80 shadow-xl shadow-indigo-600/20 scale-105'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-black text-sm text-white mx-auto shadow-inner">
              {c.name.charAt(0)}
            </div>
            <p className="text-xs font-bold text-white pt-1">{c.name}</p>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-medium">
              {c.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Company Details Pane */}
      {selectedCompany && (
        <div className="space-y-6">
          {/* Company Brief Card */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Interview Blueprint</span>
                <h2 className="text-xl font-black text-white mt-0.5">{selectedCompany.name} Placement Archive</h2>
              </div>
              <span className={`text-xs px-3 py-1 rounded-xl font-bold border ${selectedCompany.logoColor}`}>
                {selectedCompany.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" /> Hiring Rounds & Process:
                </p>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">{selectedCompany.hiringRounds}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Key Technical Focus Areas:
                </p>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">{selectedCompany.interviewFocus}</p>
              </div>
            </div>
          </div>

          {/* Questions Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              Frequently Asked Interview Questions ({selectedCompany.questions?.length || 0})
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {selectedCompany.questions?.map((q) => (
                <div
                  key={q.id}
                  className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        q.difficulty === 'Hard' ? 'bg-rose-950 text-rose-400 border border-rose-800/50' : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {q.topic}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-900/40">
                        Frequency: {q.frequency}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{q.title}</h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Target Complexity: {q.complexity}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {addedMap[q.id] ? (
                      <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold animate-fadeIn">
                        <CheckCircle2 className="w-4 h-4" /> {addedMap[q.id]}
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleAddProblem(q)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5 text-emerald-400" /> Add to DSA
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddRevision(q)}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
                        >
                          <CalendarCheck className="w-3.5 h-3.5" /> Schedule
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CompanyArchives;
