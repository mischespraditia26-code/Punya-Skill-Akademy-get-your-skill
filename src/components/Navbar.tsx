import React from 'react';
import { Award, MessageSquareText, Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenChat: () => void;
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenChat,
  onOpenRegister,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no subtitles/pills) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
            SA
          </span>
          <span className="tracking-tight">Skill Academy</span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('programs')}
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Program Digital Marketing
          </button>
          <button
            onClick={() => onNavigate('registration')}
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Pendaftaran Siswa
          </button>
          <button
            onClick={() => onNavigate('status-check')}
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cek Terdaftar
          </button>
          <button
            onClick={onOpenChat}
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-orange-600 font-semibold"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Tanya AI Konsultan</span>
          </button>
          <button
            onClick={() => onNavigate('accreditation')}
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Sertifikasi & Mitra</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRegister}
            className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            Daftar Bootcamp
          </button>
        </div>
      </div>
    </header>
  );
};
