import React, { useState } from 'react';
import { VOCATIONAL_PROGRAMS } from '../data/programs';
import {
  Calendar,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ProgramCatalogProps {
  onSelectProgram: (programId: string) => void;
  onAskAboutProgram: (programName: string) => void;
}

export const ProgramCatalog: React.FC<ProgramCatalogProps> = ({
  onSelectProgram,
  onAskAboutProgram,
}) => {
  const [filter, setFilter] = useState<string>('ALL');
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedProgramId(expandedProgramId === id ? null : id);
  };

  const filteredPrograms = VOCATIONAL_PROGRAMS.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'ADS') return p.id.includes('ads') || p.id.includes('fullstack');
    if (filter === 'CONTENT') return p.id.includes('seo') || p.id.includes('social');
    if (filter === 'ECOMMERCE') return p.id.includes('ecommerce') || p.id.includes('ai');
    return true;
  });

  return (
    <section id="programs" className="bg-slate-50 border-y border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
            Kurikulum Praktis Industri Berstandar SKKNI & BNSP
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Katalog Pelatihan Berbasis Digital Marketing
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Pilih spesialisasi digital marketing yang ingin Anda kuasai. Setiap jalur dilengkapi proyek kampanye riil, modal iklan nyata, dan sertifikasi resmi.
          </p>
        </div>

        {/* Filter Bar (Zero-pill discipline: segmented control buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-200/70 rounded-xl max-w-xl mx-auto mb-10">
          {[
            { id: 'ALL', label: 'Semua Jalur' },
            { id: 'ADS', label: 'Full-Stack & Paid Ads' },
            { id: 'CONTENT', label: 'SEO & Content Creator' },
            { id: 'ECOMMERCE', label: 'E-Commerce & AI' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === cat.id
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => {
            const isExpanded = expandedProgramId === program.id;

            return (
              <div
                key={program.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Card Media Header */}
                  <div className="relative h-48 bg-slate-800 overflow-hidden">
                    {program.image ? (
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-orange-900 text-white font-bold">
                        {program.name}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                      <span className="bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md font-medium">
                        Skill Academy Bootcamp
                      </span>
                      <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded-md font-semibold">
                        Sisa Kuota: {program.quotaAvailable}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] text-orange-300 font-medium">
                        {program.duration}
                      </div>
                      <h3 className="text-base font-bold text-white line-clamp-1">
                        {program.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    {/* Salary & Cert */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Estimasi Gaji Karir:</span>
                        <span className="font-bold text-emerald-700 tabular-nums">
                          {program.salaryEstimate}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-200/60">
                        <span className="text-slate-500 font-medium shrink-0">Sertifikasi:</span>
                        <span className="font-semibold text-slate-800 text-right">
                          {program.certification}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {program.description}
                    </p>

                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{program.intakeSchedule}</span>
                    </div>

                    {/* Expandable Accordion */}
                    <div>
                      <button
                        onClick={() => toggleExpand(program.id)}
                        className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>{isExpanded ? 'Tutup Rincian' : 'Lihat Silabus & Persyaratan'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 text-xs">
                          <div>
                            <span className="font-semibold text-slate-900 block mb-1">
                              Materi Pokok / Silabus Pembelajaran:
                            </span>
                            <ul className="space-y-1 text-slate-600">
                              {program.curriculum.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3 h-3 text-orange-600 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="font-semibold text-slate-900 block mb-1">
                              Kualifikasi Calon Siswa:
                            </span>
                            <ul className="space-y-1 text-slate-600">
                              {program.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-orange-600 font-bold shrink-0">•</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onSelectProgram(program.id)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span>Daftar Jalur Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onAskAboutProgram(program.name)}
                    className="p-2.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    title={`Tanyakan rincian program ${program.name} ke SkillBot AI`}
                    aria-label={`Tanyakan rincian program ${program.name} ke SkillBot AI`}
                  >
                    <MessageSquare className="w-4 h-4 text-orange-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
