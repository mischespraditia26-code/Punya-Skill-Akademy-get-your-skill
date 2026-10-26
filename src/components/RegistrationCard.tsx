import React from 'react';
import { CandidateRegistration } from '../types';
import { Printer, Download, CheckCircle2, Shield, X, Sparkles } from 'lucide-react';

interface RegistrationCardProps {
  registration: CandidateRegistration;
  onClose: () => void;
  onAskChatbot?: (context: string) => void;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  registration,
  onClose,
  onAskChatbot,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const maskedNik =
    registration.nik.length === 16
      ? `${registration.nik.slice(0, 6)}******${registration.nik.slice(12)}`
      : registration.nik;

  const formattedDate = new Date(registration.registeredAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Action Bar (Non-printable) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm">Bukti Pendaftaran & Kartu Siswa Resmi Skill Academy</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium bg-orange-600 hover:bg-orange-500 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Container */}
        <div id="printable-card" className="p-6 sm:p-8 space-y-6">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-600 text-white font-black text-xl flex items-center justify-center rounded-xl shadow-sm">
                SA
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight tracking-tight">
                  SKILL ACADEMY
                </h2>
                <h3 className="text-xs font-extrabold text-orange-600 tracking-wider uppercase">
                  Pelatihan Berbasis Digital Marketing & Sertifikasi
                </h3>
                <p className="text-[11px] text-slate-500">
                  Lembaga Pelatihan Terakreditasi BNSP · Google & Meta Certified Partner
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-xs font-bold tracking-wide">
                RESMI TERDAFTAR
              </span>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                KARTU SISWA BOOTCAMP
              </div>
            </div>
          </div>

          {/* Registration Number Strip */}
          <div className="bg-slate-100 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 border border-slate-200">
            <div>
              <span className="text-[11px] uppercase font-semibold text-slate-500 block">
                Nomor Siswa Registrasi Resmi
              </span>
              <span className="text-lg font-mono font-bold text-orange-700 tracking-wide">
                {registration.id}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] uppercase font-semibold text-slate-500 block">
                Tanggal Terdaftar
              </span>
              <span className="text-xs font-semibold text-slate-800">{formattedDate}</span>
            </div>
          </div>

          {/* Candidate Profile Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Candidate Photo / QR Badge */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
              <div className="w-24 h-24 bg-white border border-slate-300 rounded-lg p-2 flex flex-col items-center justify-center shadow-inner">
                {/* SVG QR Code */}
                <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M10 10h30v30h-30z M15 15h20v20h-20z M20 20h10v10h-10z" />
                  <path d="M60 10h30v30h-30z M65 15h20v20h-20z M70 20h10v10h-10z" />
                  <path d="M10 60h30v30h-30z M15 65h20v20h-20z M20 70h10v10h-10z" />
                  <rect x="45" y="10" width="8" height="8" />
                  <rect x="45" y="24" width="8" height="8" />
                  <rect x="45" y="45" width="10" height="10" />
                  <rect x="60" y="45" width="8" height="8" />
                  <rect x="75" y="45" width="15" height="8" />
                  <rect x="60" y="60" width="12" height="12" />
                  <rect x="78" y="60" width="12" height="12" />
                  <rect x="45" y="78" width="18" height="12" />
                  <rect x="70" y="78" width="20" height="12" />
                </svg>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Pindai Verifikasi LMS
              </span>
            </div>

            {/* Candidate Details */}
            <div className="sm:col-span-2 space-y-2.5 text-xs">
              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Nama Siswa</span>
                <span className="col-span-2 font-bold text-slate-900 uppercase">
                  {registration.fullName}
                </span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">NIK KTP</span>
                <span className="col-span-2 font-mono font-semibold text-slate-800">
                  {maskedNik}
                </span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Jalur Pelatihan</span>
                <span className="col-span-2 font-bold text-orange-600">
                  {registration.programName}
                </span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tempat, Tgl Lahir</span>
                <span className="col-span-2 text-slate-800">{registration.birthPlaceDate}</span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Pendidikan Terakhir</span>
                <span className="col-span-2 text-slate-800">{registration.lastEducation}</span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Kota Domisili</span>
                <span className="col-span-2 text-slate-800">{registration.city}</span>
              </div>

              <div className="grid grid-cols-3 py-1">
                <span className="text-slate-500 font-medium">Status Pendaftaran</span>
                <span className="col-span-2 font-semibold text-emerald-700 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  {registration.status === 'TERVERIFIKASI'
                    ? 'TERVERIFIKASI & SIAP ONBOARDING'
                    : registration.status}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Barcode & Official Stamp */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-0.5 h-8">
                {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2].map((w, i) => (
                  <div
                    key={i}
                    className="h-full bg-slate-900"
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                SKILL ACADEMY ID: {registration.id}
              </span>
            </div>

            <div className="text-right text-[11px] text-slate-600">
              <div className="font-semibold text-slate-800">Direktorat Akademik Digital Marketing</div>
              <div className="text-[10px] text-slate-500">Skill Academy Indonesia</div>
              <div className="text-[9px] text-orange-600 font-semibold mt-1">
                [Tanda Tangan & Cap Digital Resmi Terverifikasi]
              </div>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-950 space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-orange-900">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Petunjuk Tahap Selanjutnya untuk Siswa Terdaftar:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-orange-900">
              1. Simpan kartu ini sebagai bukti registrasi resmi Anda. Student Advisor Skill Academy akan menghubungi WhatsApp Anda (
              <strong>{registration.phone}</strong>) dalam 1x24 jam untuk mengirimkan tautan aktivasi akun LMS, jadwal sesi Onboarding, dan klaim Real Ad Budget praktek.
            </p>
          </div>
        </div>

        {/* Footer Actions (Non-printable) */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            onClick={() => {
              if (onAskChatbot) {
                onAskChatbot(`Saya telah terdaftar dengan ID ${registration.id} untuk jalur ${registration.programName}. Apa saja persiapan materi awal sebelum kelas dimulai?`);
              }
              onClose();
            }}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Tanya AI tentang Persiapan Kelas →</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Simpan PDF / Print</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
