import React, { useState, useEffect } from 'react';
import { VOCATIONAL_PROGRAMS } from '../data/programs';
import { CandidateRegistration } from '../types';
import {
  UserCheck,
  Search,
  Compass,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface RegistrationPortalProps {
  initialProgramId?: string;
  onRegisteredSuccess: (registration: CandidateRegistration) => void;
  onOpenChatWithQuery?: (prompt: string) => void;
  activeTab?: 'form' | 'check' | 'quiz';
  onTabChange?: (tab: 'form' | 'check' | 'quiz') => void;
}

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({
  initialProgramId,
  onRegisteredSuccess,
  onOpenChatWithQuery,
  activeTab = 'form',
  onTabChange,
}) => {
  const [currentTab, setCurrentTab] = useState<'form' | 'check' | 'quiz'>(activeTab);

  useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const setTab = (tab: 'form' | 'check' | 'quiz') => {
    setCurrentTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    nik: '',
    birthPlaceDate: '',
    gender: 'Laki-laki',
    phone: '',
    email: '',
    lastEducation: 'S1 / Sarjana',
    program: initialProgramId || 'fullstack_digital_marketing',
    city: '',
    notes: '',
  });

  useEffect(() => {
    if (initialProgramId) {
      setFormData((prev) => ({ ...prev, program: initialProgramId }));
    }
  }, [initialProgramId]);

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Status Check State
  const [searchQuery, setSearchQuery] = useState('');
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<CandidateRegistration | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({
    careerGoal: 'performance',
    workStyle: 'corporate',
    interest: 'ads_analysis',
  });
  const [quizMatchedProgram, setQuizMatchedProgram] = useState<string | null>(null);

  // Handle Form Submission
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanedNik = formData.nik.replace(/\D/g, '');
    if (cleanedNik.length !== 16) {
      setFormError('Nomor Induk Kependudukan (NIK) harus terdiri dari 16 digit angka sesuai KTP.');
      return;
    }

    if (!formData.fullName.trim()) {
      setFormError('Nama lengkap wajib diisi.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 9) {
      setFormError('Nomor WhatsApp aktif wajib diisi untuk verifikasi akun LMS.');
      return;
    }

    setFormSubmitting(true);
    try {
      const selectedProgramObj = VOCATIONAL_PROGRAMS.find((p) => p.id === formData.program);
      const programName = selectedProgramObj ? selectedProgramObj.name : formData.program;

      const payload = {
        ...formData,
        nik: cleanedNik,
        programName,
      };

      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409 && data.data) {
          setFormError(`NIK ini telah terdaftar sebelumnya sebagai siswa Skill Academy dengan No. Siswa: ${data.data.id}. Anda dapat langsung mengecek status atau mencetak kartu.`);
          onRegisteredSuccess(data.data);
          return;
        }
        throw new Error(data.error || 'Gagal menyimpan pendaftaran');
      }

      onRegisteredSuccess(data.data);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Terjadi kendala saat mendaftar');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle Status Check
  const handleCheckStatus = async (queryParam?: string) => {
    const q = (queryParam || searchQuery).trim();
    if (!q) {
      setCheckError('Silakan masukkan NIK 16 digit atau Nomor Registrasi Siswa Anda.');
      return;
    }

    setCheckLoading(true);
    setCheckError(null);
    setCheckResult(null);

    try {
      const res = await fetch(`/api/registrations/check?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Data pendaftaran siswa tidak ditemukan');
      }

      setCheckResult(data.data);
    } catch (err) {
      setCheckError(err instanceof Error ? err.message : 'Pencarian gagal');
    } finally {
      setCheckLoading(false);
    }
  };

  // Calculate Quiz Recommendation
  const handleCalculateQuiz = () => {
    if (quizAnswers.careerGoal === 'performance') {
      setQuizMatchedProgram('performance_marketing_ads');
    } else if (quizAnswers.careerGoal === 'creative') {
      setQuizMatchedProgram('social_media_tiktok');
    } else if (quizAnswers.careerGoal === 'ecommerce') {
      setQuizMatchedProgram('ecommerce_growth_specialist');
    } else if (quizAnswers.careerGoal === 'seo') {
      setQuizMatchedProgram('seo_content_authority');
    } else {
      setQuizMatchedProgram('fullstack_digital_marketing');
    }
  };

  return (
    <section id="registration" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
          <span>Portal Resmi Calon Siswa Skill Academy</span>
          <span aria-hidden="true">·</span>
          <span>Sistem Registrasi & Verifikasi Terdaftar</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Pendaftaran & Verifikasi Status Siswa Terdaftar
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Daftarkan diri Anda untuk mengikuti pelatihan berbasis Digital Marketing terbaik di Indonesia atau verifikasi status pendaftaran dan cetak Kartu Siswa resmi Anda di sini.
        </p>
      </div>

      {/* Tab Controls (Segmented control buttons) */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setTab('form')}
            className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              currentTab === 'form'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Formulir Pendaftaran Siswa</span>
          </button>

          <button
            onClick={() => setTab('check')}
            className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              currentTab === 'check'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Cek Status Terdaftar</span>
          </button>

          <button
            onClick={() => setTab('quiz')}
            className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              currentTab === 'quiz'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Tes Rekomendasi Jalur</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Registration Form */}
      {currentTab === 'form' && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Formulir Pendaftaran Pelatihan Digital Marketing</h3>
            <p className="text-xs text-slate-500 mt-1">
              Data yang Anda masukkan digunakan untuk penerbitan Nomor Siswa dan Kartu Tanda Terdaftar resmi Skill Academy.
            </p>
          </div>

          {formError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">{formError}</div>
            </div>
          )}

          <form onSubmit={handleSubmitForm} className="space-y-6">
            {/* Program Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Pilih Jalur Pelatihan Digital Marketing <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
                required
              >
                {VOCATIONAL_PROGRAMS.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name} — ({prog.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Lengkap (Sesuai KTP) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Aulia Rahmawati"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  NIK KTP (16 Digit) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="Contoh: 3201012304020003"
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
                  required
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {formData.nik.length}/16 digit angka
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tempat & Tanggal Lahir
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta, 14 Mei 2002"
                  value={formData.birthPlaceDate}
                  onChange={(e) => setFormData({ ...formData, birthPlaceDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Jenis Kelamin
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
                >
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </select>
              </div>
            </div>

            {/* Contact & Education */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  No. WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
                  required
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Informasi aktivasi akun LMS dan jadwal Onboarding dikirim via WhatsApp
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Contoh: nama@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Pendidikan Terakhir
                </label>
                <select
                  value={formData.lastEducation}
                  onChange={(e) => setFormData({ ...formData, lastEducation: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
                >
                  <option value="S1 / Sarjana">S1 / Sarjana</option>
                  <option value="D3 / Diploma">D3 / Diploma</option>
                  <option value="SMK / SMA Sederajat">SMK / SMA Sederajat</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Kota / Kabupaten Domisili
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Karir / Alasan Mengikuti Pelatihan (Opsional)
              </label>
              <textarea
                rows={3}
                placeholder="Ceritakan singkat motivasi Anda (misal: ingin switch career menjadi Performance Marketer, meningkatkan omset bisnis online, dll)..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
              />
            </div>

            {/* Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 disabled:bg-slate-400 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {formSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mendaftarkan & Menerbitkan Nomor Siswa...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Kirim Pendaftaran & Buat Kartu Siswa Terdaftar</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                Dengan menekan tombol di atas, Anda resmi terdaftar dalam sistem akademik Skill Academy dan mendapatkan akses konsultasi portofolio.
              </p>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Status Check */}
      {currentTab === 'check' && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Verifikasi & Cek Bukti Terdaftar Siswa</h3>
            <p className="text-xs text-slate-500 mt-1">
              Masukkan NIK KTP (16 digit) atau Nomor Siswa Skill Academy Anda (contoh: SA-DM-2026-1024).
            </p>
          </div>

          {/* Quick Demo Pre-filled Chips */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
            <div className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Contoh Siswa Terdaftar (Klik untuk uji coba cek):</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('3201015504010002');
                  handleCheckStatus('3201015504010002');
                }}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded-md hover:border-orange-500 hover:text-orange-600 transition-colors cursor-pointer text-[11px]"
              >
                Aulia Rahmawati (Full-Stack DM)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('3374024809030001');
                  handleCheckStatus('3374024809030001');
                }}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded-md hover:border-orange-500 hover:text-orange-600 transition-colors cursor-pointer text-[11px]"
              >
                Dimas Surya (Performance Ads)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('SA-DM-2026-2150');
                  handleCheckStatus('SA-DM-2026-2150');
                }}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded-md hover:border-orange-500 hover:text-orange-600 transition-colors cursor-pointer text-[11px]"
              >
                Nabila Putri (TikTok Marketing)
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Masukkan NIK 16 digit atau Nomor Siswa SA-DM-..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckStatus()}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all font-mono"
              />
            </div>
            <button
              onClick={() => handleCheckStatus()}
              disabled={checkLoading}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 disabled:bg-slate-400 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {checkLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengecek...</span>
                </>
              ) : (
                <span>Cek Status</span>
              )}
            </button>
          </div>

          {checkError && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900 text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Data Tidak Ditemukan</p>
                <p className="mt-0.5 text-amber-800">{checkError}</p>
                <button
                  onClick={() => setTab('form')}
                  className="mt-2 text-xs font-bold text-orange-600 hover:underline cursor-pointer"
                >
                  Belum terdaftar? Isi formulir sekarang →
                </button>
              </div>
            </div>
          )}

          {checkResult && (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block">
                    Nomor Siswa Resmi Skill Academy
                  </span>
                  <span className="text-base font-bold font-mono text-orange-700">
                    {checkResult.id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-xs font-bold">
                    {checkResult.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Nama Siswa:</span>
                  <span className="font-bold text-slate-900 text-sm">{checkResult.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Jalur Pelatihan:</span>
                  <span className="font-semibold text-orange-600">{checkResult.programName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Nomor WhatsApp:</span>
                  <span className="font-mono text-slate-800">{checkResult.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tanggal Registrasi:</span>
                  <span className="text-slate-800">
                    {new Date(checkResult.registeredAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {checkResult.notes && (
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 block mb-0.5">Catatan Akademik:</span>
                  {checkResult.notes}
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                <button
                  onClick={() => onRegisteredSuccess(checkResult)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Buka & Cetak Kartu Siswa</span>
                </button>

                {onOpenChatWithQuery && (
                  <button
                    onClick={() =>
                      onOpenChatWithQuery(
                        `Halo SkillBot, saya telah terdaftar dengan ID ${checkResult.id} atas nama ${checkResult.fullName} untuk jalur ${checkResult.programName}. Bagaimana persiapan sebelum onboarding?`
                      )
                    }
                    className="text-xs font-semibold text-orange-600 hover:underline cursor-pointer"
                  >
                    Konsultasi Persiapan ke AI Chatbot →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Quiz Recommendation */}
      {currentTab === 'quiz' && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Tes Rekomendasi Jalur Karir Digital Marketing</h3>
            <p className="text-xs text-slate-500 mt-1">
              Temukan spesialisasi digital marketing yang paling sesuai dengan kepribadian dan tujuan karir Anda.
            </p>
          </div>

          <div className="space-y-5 text-xs sm:text-sm">
            {/* Question 1 */}
            <div>
              <label className="block font-semibold text-slate-800 mb-2">
                1. Apa fokus keahlian yang paling ingin Anda kuasai?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'performance', label: 'Mengelola Iklan Berbayar & Optimasi ROAS (Meta & Google Ads)' },
                  { id: 'creative', label: 'Bikin Konten Viral, Storytelling & Video TikTok' },
                  { id: 'seo', label: 'Riset Kata Kunci, Menulis Artikel & Ranking Google (SEO)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, careerGoal: opt.id })}
                    className={`p-3 rounded-lg border text-left font-medium transition-all cursor-pointer ${
                      quizAnswers.careerGoal === opt.id
                        ? 'bg-orange-50 border-orange-600 text-orange-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block font-semibold text-slate-800 mb-2">
                2. Lingkungan kerja atau target masa depan Anda:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'corporate', label: 'Bekerja di Tech Startup / Unicorn / Korporat' },
                  { id: 'ecommerce', label: 'Membangun Bisnis Online / Toko Marketplace Sendiri' },
                  { id: 'agency', label: 'Bekerja di Digital Agency atau Freelancer Global' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, workStyle: opt.id })}
                    className={`p-3 rounded-lg border text-left font-medium transition-all cursor-pointer ${
                      quizAnswers.workStyle === opt.id
                        ? 'bg-orange-50 border-orange-600 text-orange-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block font-semibold text-slate-800 mb-2">
                3. Tipe aktivitas yang paling Anda nikmati:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    id: 'ads_analysis',
                    label: 'Melihat dashboard data, menghitung konversi, dan eksperimen strategi iklan',
                  },
                  {
                    id: 'full_stack',
                    label: 'Ingin menguasai semua channel secara komprehensif (360° Digital Marketer)',
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, interest: opt.id })}
                    className={`p-3 rounded-lg border text-left font-medium transition-all cursor-pointer ${
                      quizAnswers.interest === opt.id
                        ? 'bg-orange-50 border-orange-600 text-orange-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCalculateQuiz}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Lihat Rekomendasi Jalur Terbaik</span>
              </button>
            </div>

            {/* Quiz Result */}
            {quizMatchedProgram && (
              <div className="p-5 bg-orange-50 border border-orange-200 rounded-xl space-y-3 mt-4">
                {(() => {
                  const prog = VOCATIONAL_PROGRAMS.find((p) => p.id === quizMatchedProgram);
                  if (!prog) return null;
                  return (
                    <>
                      <div className="flex items-center gap-2 text-xs font-bold text-orange-900">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Rekomendasi Jalur Pelatihan Paling Cocok:</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{prog.name}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700 pt-1">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Estimasi Gaji Karir:</span>
                          <span className="font-bold text-emerald-700">{prog.salaryEstimate}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Durasi Belajar:</span>
                          <span>{prog.duration}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, program: prog.id }));
                            setTab('form');
                          }}
                          className="px-5 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span>Pilih & Daftarkan Diri ke Jalur Ini</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
