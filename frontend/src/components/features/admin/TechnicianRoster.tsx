'use client';

import React from 'react';
import { useAdminStore, Technician } from '@/store/useAdminStore';
import { Badge } from '@/components/ui/Badge';
import { Users, Star, Phone, CheckCircle2, Clock } from 'lucide-react';

export function TechnicianRoster() {
  const { technicians, updateTechStatus } = useAdminStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-violet" /> Certified Technician Field Directory
        </h3>
        <span className="text-xs font-mono text-slate-400">Total Techs: {technicians.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {technicians.map((tech) => (
          <div
            key={tech.id}
            className="p-4 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-purple-600 text-white flex items-center justify-center font-bold font-mono text-sm">
                  {tech.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm dark:text-white text-slate-900">{tech.name}</h4>
                  <div className="text-[11px] text-slate-400 font-mono">{tech.specialty}</div>
                </div>
              </div>

              {/* Status Selector */}
              <select
                value={tech.status}
                onChange={(e) => updateTechStatus(tech.id, e.target.value as Technician['status'])}
                className={`text-[10px] font-mono px-2 py-1 rounded-full border font-bold focus:outline-none ${
                  tech.status === 'On Site'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                    : tech.status === 'Available'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                    : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                }`}
              >
                <option value="Available" className="dark:bg-[#121826] bg-white">Available</option>
                <option value="On Site" className="dark:bg-[#121826] bg-white">On Site</option>
                <option value="Off Duty" className="dark:bg-[#121826] bg-white">Off Duty</option>
              </select>
            </div>

            <div className="pt-2 border-t dark:border-white/5 border-slate-100 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                <span className="font-bold">{tech.rating}</span>
                <span className="text-slate-400 text-[10px] ml-1">({tech.jobsCompleted} fixes)</span>
              </div>
              <div className="text-slate-400 flex items-center gap-1">
                <Phone className="w-3 h-3 text-brand-cyan" /> {tech.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
