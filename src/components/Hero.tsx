import React from 'react';
import { ArrowRight, Bot, CheckCircle, TrendingUp, Users, Target } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
  onChatClick: () => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onRegisterClick,
  onChatClick,
  onExplorePrograms,
}) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Graphic / Image Overlay */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/images/hero_skill_academy_dm_1792999087575.jpg"
          alt="Suasana studio pelatihan Digital Marketing Skill Academy"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-400 uppercase">
              <span>Skill Academy by Ruangguru Group</span>
              <span aria-hidden="true">·</span>
              <span>Sertifikasi BNSP & Partner Resmi Google</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Pelatihan Berbasis Digital Marketing No. 1 di Indonesia
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Kuasai keahlian Performance Marketing, SEO, Social Media Strategy, dan E-Commerce dengan kurikulum berbasis proyek nyata. Disediakan <strong className="text-white">Real Ad Budget</strong> untuk praktek beriklan langsung dan penyaluran kerja ke 350+ mitra industri.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onRegisterClick}
                className="px-6 py-3 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Daftar Pelatihan Siswa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onChatClick}
                className="px-5 py-3 text-sm font-medium text-slate-200 bg-slate-800/90 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-orange-400" />
                <span>Konsultasi AI Karir Digital</span>
              </button>

              <button
                onClick={onExplorePrograms}
                className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Lihat Silabus Lengkap →
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real Ad Budget untuk Praktek Iklan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sertifikasi BNSP & Portofolio Riil</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Job Connector ke 350+ Hiring Partners</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <h3 className="text-base font-semibold text-white">Batch Penerimaan Siswa Baru 2026</h3>
                  <p className="text-xs text-slate-400">Bootcamp Digital Marketing & Sertifikasi</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-md">
                  Pendaftaran Dibuka
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                  <Target className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white text-xs">Full-Stack Digital Marketing (Batch 48)</h4>
                    <p className="text-xs text-slate-400">12 Minggu Intensif: Ads, SEO, Copywriting, & CRM. Sisa kuota: 35 kursi.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                  <TrendingUp className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white text-xs">Performance Marketing & Paid Ads</h4>
                    <p className="text-xs text-slate-400">Meta Ads & Google Ads dengan saldo iklan nyata. Sisa kuota: 25 kursi.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                  <Users className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white text-xs">Social Media & TikTok Viral Marketing</h4>
                    <p className="text-xs text-slate-400">Strategi algoritma FYP, video shooting & KOL marketing. Sisa kuota: 40 kursi.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onRegisterClick}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-center text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Daftar Sekarang & Dapatkan Kartu Siswa Terdaftar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Metrics Strip */}
      <div className="border-t border-slate-800 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums">120.000+</div>
            <div className="text-xs text-slate-400 mt-0.5">Alumni Profesional Terlatih</div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-bold text-emerald-400 tabular-nums">94.8%</div>
            <div className="text-xs text-slate-400 mt-0.5">Lulusan Bekerja / Promosi Karir</div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums">350+</div>
            <div className="text-xs text-slate-400 mt-0.5">Mitra Perusahaan Perekrut (Hiring Partners)</div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-bold text-orange-400">Terakreditasi BNSP</div>
            <div className="text-xs text-slate-400 mt-0.5">Standar Kompetensi Kerja Nasional (SKKNI)</div>
          </div>
        </div>
      </div>
    </section>
  );
};
