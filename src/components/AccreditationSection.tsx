import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Laptop,
  Users,
  Briefcase,
  Layers,
} from 'lucide-react';

interface AccreditationSectionProps {
  onOpenChatWithQuery?: (prompt: string) => void;
  onOpenRegister?: () => void;
}

const FAQS = [
  {
    q: 'Apakah pemula tanpa latar belakang marketing atau IT bisa mengikuti pelatihan ini?',
    a: 'Sangat bisa! Kurikulum pelatihan berbasis Digital Marketing di Skill Academy dirancang bertahap dari pemahaman dasar (zero to hero). Setiap modul dilengkapi panduan langkah demi langkah (step-by-step) serta didampingi mentor praktisi industri secara langsung.',
  },
  {
    q: 'Bagaimana mekanisme fasilitas Real Ad Budget untuk praktek beriklan?',
    a: 'Setiap siswa/tim akan diberikan modal anggaran iklan nyata dari Skill Academy untuk praktek langsung menjalankan campaign di Meta Ads Manager (Instagram/Facebook) dan Google Ads. Anda akan menganalisis metrik riil (CTR, CPC, ROAS) bukan sekadar simulasi teori.',
  },
  {
    q: 'Apakah sertifikat yang diperoleh diakui secara nasional dan industri?',
    a: 'Ya, Anda akan mendapatkan Sertifikat Kelulusan Resmi Skill Academy, sertifikasi internasional Google & Meta, serta difasilitasi uji kompetensi resmi Badan Nasional Sertifikasi Profesi (BNSP) untuk skema Digital Marketer / SEO Specialist.',
  },
  {
    q: 'Bagaimana alur penyaluran kerja (Job Connector) ke 350+ mitra perusahaan?',
    a: 'Menjelang akhir pelatihan, Anda akan mendapatkan sesi Career Preparation (bedah CV ATS, optimasi profil LinkedIn, simulasi interview). Setelah lulus dan portofolio Anda terverifikasi, profil Anda akan disalurkan langsung ke 350+ hiring partners (tech startup, korporat, dan digital agency).',
  },
  {
    q: 'Apakah ada fasilitas cicilan untuk biaya pelatihan?',
    a: 'Tersedia opsi cicilan ringan 0% hingga 3-6 bulan melalui berbagai metode pembayaran resmi, serta program beasiswa potongan biaya pelatihan bagi pendaftar gelombang awal (Early Bird).',
  },
];

export const AccreditationSection: React.FC<AccreditationSectionProps> = ({
  onOpenChatWithQuery,
  onOpenRegister,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="accreditation" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Institutional Trust Block */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Standar Industri & Akreditasi Nasional</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sertifikasi BNSP Resmi & Kemitraan Ekosistem Digital Global
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Skill Academy menyelaraskan kurikulum dengan Standar Kompetensi Kerja Nasional Indonesia (SKKNI) Kemnaker RI, berpartner resmi dengan raksasa teknologi Google & Meta, dan dipercaya oleh ratusan perusahaan terkemuka di Asia Tenggara.
            </p>

            {/* Legal Identification Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span className="text-slate-400 block text-[11px] mb-1">Lisensi BNSP RI:</span>
                <span className="font-bold text-white text-sm">LSP Digital Marketer</span>
                <span className="text-[10px] text-emerald-400 block mt-1">Uji Kompetensi Nasional Resmi</span>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span className="text-slate-400 block text-[11px] mb-1">Global Tech Partner:</span>
                <span className="font-bold text-white text-sm">Google & Meta Certified</span>
                <span className="text-[10px] text-orange-400 block mt-1">Media Buying & Analytics Standard</span>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span className="text-slate-400 block text-[11px] mb-1">Ekosistem Karir:</span>
                <span className="font-bold text-white text-sm">350+ Hiring Partners</span>
                <span className="text-[10px] text-blue-400 block mt-1">Tech Startups, Unicorns & Agencies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities & Learning Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Real Ad Budget Disediakan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Praktek beriklan langsung dengan saldo iklan nyata di Meta Ads & Google Ads, bukan sekadar melihat tutorial.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">1-on-1 Mentoring Praktisi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Konsultasi langsung dengan Head of Growth, Media Buyer, dan SEO Lead dari top tech companies.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Portofolio Berstandar Industri</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lulus dengan portofolio riil studi kasus brand nyata yang siap dipresentasikan saat interview kerja.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Penyaluran Kerja Aktif</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Akses khusus ke jaringan perekrutan eksklusif Skill Academy untuk penempatan karir cepat.
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Informasi lengkap seputar registrasi pendaftaran, sertifikasi, dan metode pembelajaran di Skill Academy.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-orange-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-slate-500 mb-3">
              Ada pertanyaan seputar silabus atau ingin konsultasi jalur karir Anda?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {onOpenChatWithQuery && (
                <button
                  onClick={() =>
                    onOpenChatWithQuery(
                      'Halo SkillBot, saya ingin berkonsultasi mengenai jalur Digital Marketing yang paling cocok untuk latar belakang saya dan cara pendaftarannya.'
                    )
                  }
                  className="px-4 py-2 text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
                >
                  Konsultasi Gratis dengan SkillBot AI →
                </button>
              )}

              {onOpenRegister && (
                <button
                  onClick={onOpenRegister}
                  className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
                >
                  Isi Formulir Pendaftaran Siswa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
