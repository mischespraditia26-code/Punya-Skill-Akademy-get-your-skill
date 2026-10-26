import React from 'react';
import { Award, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenChat }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Accreditation */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                SA
              </span>
              <span className="text-base font-bold text-white tracking-tight">
                Skill Academy
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-md">
              Platform pelatihan dan sertifikasi vokasi berbasis Digital Marketing nomor 1 di Indonesia. Menghadirkan kurikulum berbasis proyek riil dengan Real Ad Budget, bimbingan mentor praktisi unicorn, dan sertifikasi resmi BNSP untuk akselerasi karir masa depan.
            </p>

            <div className="text-[11px] text-slate-500 space-y-1">
              <div>Standar Kompetensi: <span className="font-semibold text-slate-300">SKKNI & Sertifikasi BNSP Digital Marketer</span></div>
              <div>Mitra Resmi: <span className="text-slate-300">Google Certified Partner & Meta Certified Company</span></div>
              <div>Jaringan Kerja: <span className="text-slate-300">350+ Hiring Partners di Indonesia & Asia Tenggara</span></div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Jalur Pelatihan Digital Marketing
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Full-Stack Digital Marketing Bootcamp
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Performance Marketing & Paid Ads
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SEO & High-Converting Copywriting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Social Media Strategy & TikTok Viral
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('registration')}
                  className="hover:text-white transition-colors cursor-pointer text-orange-400 font-medium"
                >
                  Formulir Pendaftaran Siswa Baru
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('status-check')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cek Status Terdaftar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Campus */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Kontak & Student Support
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  Headquarters: Ruangguru Tower, Jl. Dr. Saharjo No. 161, Manggarai Selatan, Tebet, Jakarta Selatan 12860
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Student Hotline: +62 21-2854-3000 / WA 0812-9876-5432</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>info@skillacademy.com</span>
              </li>
              <li>
                <button
                  onClick={onOpenChat}
                  className="mt-2 px-3 py-1.5 bg-slate-800 text-orange-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Chat dengan SkillBot AI →</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Skill Academy. All rights reserved. Platform Pelatihan Berbasis Digital Marketing Terakreditasi.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500">
              <Award className="w-3.5 h-3.5" />
              <span>Sistem Registrasi Siswa Terdaftar Resmi</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
