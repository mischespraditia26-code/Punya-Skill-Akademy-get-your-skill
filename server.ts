import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory student registrations store for Skill Academy Digital Marketing
export interface RegistrationRecord {
  id: string; // e.g. SA-DM-2026-1024
  nik: string;
  fullName: string;
  birthPlaceDate: string;
  gender: string;
  phone: string;
  email: string;
  lastEducation: string;
  program: string;
  programName: string;
  city: string;
  status: 'TERVERIFIKASI' | 'SELEKSI_BERKAS' | 'JADWAL_ONBOARDING' | 'LULUS_PELATIHAN';
  registeredAt: string;
  notes?: string;
}

const registrations: RegistrationRecord[] = [
  {
    id: 'SA-DM-2026-1024',
    nik: '3201015504010002',
    fullName: 'Aulia Rahmawati',
    birthPlaceDate: 'Jakarta, 14 Mei 2002',
    gender: 'Perempuan',
    phone: '081298765432',
    email: 'aulia.rahmawati@gmail.com',
    lastEducation: 'S1 Manajemen Bisnis',
    program: 'fullstack_digital_marketing',
    programName: 'Full-Stack Digital Marketing Bootcamp & Certification',
    city: 'Jakarta Selatan, DKI Jakarta',
    status: 'TERVERIFIKASI',
    registeredAt: '2026-03-10T09:30:00.000Z',
    notes: 'Registrasi tervalidasi. Siap mengikuti sesi Onboarding & Pembagian Kelompok Proyek Nyata.',
  },
  {
    id: 'SA-DM-2026-1089',
    nik: '3374024809030001',
    fullName: 'Dimas Surya Pratama',
    birthPlaceDate: 'Semarang, 28 September 2001',
    gender: 'Laki-laki',
    phone: '085712345678',
    email: 'dimas.surya@gmail.com',
    lastEducation: 'D3 Komunikasi',
    program: 'performance_marketing_ads',
    programName: 'Performance Marketing & Paid Ads (Meta, Google & TikTok Ads)',
    city: 'Semarang, Jawa Tengah',
    status: 'JADWAL_ONBOARDING',
    registeredAt: '2026-03-18T14:15:00.000Z',
    notes: 'Jadwal sesi 1-on-1 mentoring portfolio dengan Head of Growth: Selasa pkl 19:30 WIB.',
  },
  {
    id: 'SA-DM-2026-2150',
    nik: '3578011211020005',
    fullName: 'Nabila Putri Cahyani',
    birthPlaceDate: 'Surabaya, 12 November 2003',
    gender: 'Perempuan',
    phone: '082199887766',
    email: 'nabila.putri@gmail.com',
    lastEducation: 'SMK Multimedia',
    program: 'social_media_tiktok',
    programName: 'Social Media Strategy & TikTok Viral Marketing Specialist',
    city: 'Surabaya, Jawa Timur',
    status: 'TERVERIFIKASI',
    registeredAt: '2026-03-24T11:00:00.000Z',
    notes: 'Pendaftaran lengkap. Akun Learning Management System (LMS) Skill Academy aktif.',
  },
];

// Initialize GoogleGenAI SDK
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Anda adalah "SkillBot", Konsultan Belajar & Karir Resmi Skill Academy — Platform Pelatihan Berbasis Digital Marketing Nomor 1 di Indonesia.
Skill Academy menyelenggarakan pelatihan vokasi digital marketing berstandar industri dengan sertifikasi resmi BNSP (Badan Nasional Sertifikasi Profesi) dan sertifikasi internasional (Google & Meta Certified).

PROGRAM PELATIHAN DIGITAL MARKETING SKILL ACADEMY:
1. Full-Stack Digital Marketing Bootcamp (Jalur Terfavorit):
   - Materi Lengkap: Performance Ads (Meta & Google), SEO & Website Optimization, Content Marketing & Copywriting, CRM Email Marketing, dan Social Media Strategy.
   - Durasi: 12 Minggu Intensif (Live Interactive Class + Live Practice with Real Ad Budget).
   - Sertifikasi: Sertifikat Kompetensi BNSP Digital Marketer & Google Analytics 4 Certification.
   - Proyek: Portofolio riil mengelola kampanye iklan live dengan anggaran iklan nyata yang disediakan Skill Academy.
   - Estimasi Gaji Lulusan: Rp 6.000.000 - Rp 14.000.000 / bulan (Digital Marketing Specialist / Manager).

2. Performance Marketing & Paid Advertising Specialist:
   - Fokus: Penguasaan Meta Ads Manager (Facebook & Instagram Ads), TikTok Ads, Google Search/Display/Performance Max, Conversion Rate Optimization (CRO), dan Skalabilitas ROAS (Return on Ad Spend).
   - Durasi: 8 Minggu Intensif.
   - Sertifikasi: Meta Certified Media Buying & Google Ads Search Certification.

3. SEO & Content Marketing Authority:
   - Fokus: Riset Kata Kunci Mendalam, Technical SEO, On-Page & Off-Page Backlink Strategy, Copywriting Konversi Tinggi, dan Optimasi Mesin Pencari Google 2026.
   - Durasi: 6 Minggu.
   - Sertifikasi: BNSP Search Engine Optimizer & Hubspot Content Marketing.

4. Social Media Strategy & TikTok Viral Marketing:
   - Fokus: Strategi Konten Viral, Algoritma TikTok & Reels, Storyboarding, Produksi Video Pendek Menggunakan Smartphone, Influencer Management, dan Live Shopping Host.
   - Durasi: 6 Minggu.

5. E-Commerce & Marketplace Growth Specialist:
   - Fokus: Optimasi Toko Online di Shopee & Tokopedia, Iklan Marketplace, Manajemen Stok, Live Selling, dan CRM Retensi Pelanggan.
   - Durasi: 6 Minggu.

6. AI for Digital Marketing & Data Analytics:
   - Fokus: Automasi Pemasaran dengan AI (Gemini & ChatGPT for Copywriting/Visual), Google Analytics 4 (GA4), dan Pembuatan Dashboard Looker Studio interaktif untuk analisis bisnis.
   - Durasi: 6 Minggu.

KEUNGGULAN SKILL ACADEMY:
- 100% Praktek dengan Real Ad Budget: Siswa diberikan modal saldo iklan langsung untuk praktek beriklan.
- 1-on-1 Mentoring dengan Praktisi Industri: Mentor dari unicorn, tech startup, dan top digital agency.
- Job Connector & Talent Placement: Akses ke 350+ mitra perekrut (hiring partners) untuk penyaluran kerja langsung.
- Sertifikasi Resmi: Terakreditasi resmi, dapat digunakan untuk melamar kerja di korporat, agensi, maupun freelance internasional.

CARA TERDAFTAR DI SKILL ACADEMY:
Jelaskan bahwa calon peserta dapat mendaftar langsung di portal ini pada tab "Formulir Pendaftaran Siswa", mengisi data diri & NIK, lalu otomatis mendapatkan "Nomor Registrasi Siswa Skill Academy (SA-DM-2026-XXXX)" serta "Kartu Tanda Terdaftar Siswa Resmi" yang dapat dicetak/disimpan. Calon siswa juga bisa mengecek status pendaftaran kapan saja di tab "Cek Status Terdaftar".

GAYA KOMUNIKASI:
- Ramah, bersemangat, profesional, edukatif, dan memotivasi.
- Gunakan Bahasa Indonesia yang luwes dan modern.
- Gunakan poin-poin terstruktur agar mudah dibaca di ponsel dan desktop.`;

// API: Chatbot
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Pesan pertanyaan wajib diisi' });
      return;
    }

    // Helper function for knowledge base fallback answers
    const getKnowledgeBaseReply = (query: string): string => {
      const lower = query.toLowerCase();
      if (lower.includes('performance') || lower.includes('meta ads') || lower.includes('google ads') || lower.includes('iklan')) {
        return `Halo! Pelatihan **Performance Marketing & Paid Ads** di Skill Academy dirancang khusus untuk Anda yang ingin jago beriklan dengan ROAS tinggi:\n\n` +
          `• **Materi Utama**: Meta Ads Manager (IG & FB), TikTok Ads, Google Search & Performance Max, serta Analisis Metrik Konversi (CTR, CPC, ROAS).\n` +
          `• **Fasilitas Spesial**: Disediakan **Real Ad Budget** (saldo iklan nyata) sehingga Anda praktek langsung menjalankan campaign riil, bukan sekadar teori!\n` +
          `• **Sertifikasi**: Meta Certified Media Buying & Google Ads Certification.\n` +
          `• **Peluang Karir**: Performance Marketer, Media Buyer, Paid Ads Specialist dengan estimasi gaji Rp 7 - 15 Juta/bulan.\n\n` +
          `Untuk terdaftar di batch terbaru, silakan buka tab **"Formulir Pendaftaran Siswa"** di atas!`;
      } else if (lower.includes('seo') || lower.includes('content') || lower.includes('copywriting')) {
        return `Program **SEO & Content Marketing** di Skill Academy mengajarkan cara mendominasi halaman 1 Google dan menghasilkan penjualan organik:\n\n` +
          `• **Kurikulum**: Riset Keyword dengan SEMrush/Ahrefs, Technical SEO, On-Page Optimization, Copywriting Menjual, dan strategi Backlink.\n` +
          `• **Portofolio**: Anda akan membangun website riil yang terindeks dan mendatangkan trafik organik terukur.\n` +
          `• **Sertifikasi**: BNSP Specialist & Hubspot Inbound Certification.\n\n` +
          `Daftarkan diri Anda sekarang untuk mengamankan kuota mentoring 1-on-1 bersama praktisi SEO terkemuka!`;
      } else if (lower.includes('biaya') || lower.includes('cicilan') || lower.includes('promo') || lower.includes('harga')) {
        return `Di Skill Academy, kami menyediakan opsi pembiayaan fleksibel agar siapa pun bisa meningkatkan skill digital marketing:\n\n` +
          `1. **Cicilan 0%**: Pembayaran fleksibel hingga 3 - 6 bulan tanpa bunga.\n` +
          `2. **Beasiswa & Potongan Early Bird**: Potongan khusus bagi pendaftar gelombang awal 2026.\n` +
          `3. **Fasilitas Termasuk**: Real Ad Budget untuk praktek, akses seumur hidup ke materi LMS, bimbingan CV & interview, serta penyaluran kerja ke 350+ hiring partner.\n\n` +
          `Silakan isi formulir pendaftaran untuk mendapatkan penawaran beasiswa pelatihan terbaik!`;
      } else if (lower.includes('syarat') || lower.includes('pemula') || lower.includes('background')) {
        return `Apakah pemula tanpa latar belakang marketing bisa ikut pelatihan Skill Academy?\n\n` +
          `**Tentu saja!** Kurikulum kami dirancang dari level *zero to hero*:\n` +
          `• Tidak perlu latar belakang IT atau bisnis sebelumnya.\n` +
          `• Dibimbing langkah demi langkah oleh mentor praktisi industri.\n` +
          `• Dilengkapi sesi tanya-jawab interaktif dan review tugas portofolio setiap minggu.\n` +
          `• Syarat umum: Memiliki laptop/PC, koneksi internet, dan komitmen belajar 6-12 minggu.\n\n` +
          `Daftarkan diri Anda sekarang di portal resmi ini!`;
      } else if (lower.includes('daftar') || lower.includes('registrasi') || lower.includes('terdaftar')) {
        return `Untuk menjadi peserta resmi terdaftar di Skill Academy:\n\n` +
          `1. Buka tab **"Formulir Pendaftaran Siswa"** di portal resmi ini.\n` +
          `2. Lengkapi biodata (Nama Lengkap, NIK 16 digit, No. WhatsApp, dan Jalur Digital Marketing yang dipilih).\n` +
          `3. Klik **"Kirim Pendaftaran & Buat Kartu Siswa"**.\n` +
          `4. Anda akan otomatis mendapatkan **Nomor Registrasi Siswa (SA-DM-2026-XXXX)** dan **Kartu Tanda Terdaftar Digital** ber-QR Code yang siap dicetak.\n\n` +
          `Anda juga dapat mengecek status pendaftaran kapan pun melalui tab **"Cek Status Terdaftar"**!`;
      } else {
        return `Halo! Selamat datang di **Skill Academy** — Pusat Pelatihan & Bootcamp Berbasis Digital Marketing.\n\n` +
          `Saya siap membantu Anda dengan informasi mengenai:\n` +
          `• Full-Stack Digital Marketing Bootcamp\n` +
          `• Performance Marketing (Meta & Google Ads) dengan Real Ad Budget\n` +
          `• SEO, Copywriting & TikTok Viral Marketing\n` +
          `• Sertifikasi Resmi BNSP & Penyaluran Kerja ke 350+ Hiring Partners\n` +
          `• Panduan cara mendaftar agar resmi terdaftar sebagai siswa baru\n\n` +
          `Jalur digital marketing apa yang ingin Anda kuasai?`;
      }
    };

    if (!ai) {
      const reply = getKnowledgeBaseReply(message);
      res.json({ reply, source: 'knowledge_base' });
      return;
    }

    try {
      // Call Gemini 3.8 Flash with a 8-second timeout guard
      const formattedHistory = Array.isArray(history)
        ? history.slice(-6).map((item: { role: string; content: string }) => ({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.content }],
          }))
        : [];

      const contents = [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];

      const apiCall = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI response timeout')), 8000)
      );

      const response = await Promise.race([apiCall, timeoutPromise]);
      const reply = response.text || getKnowledgeBaseReply(message);
      res.json({ reply, source: 'gemini-3.8-flash' });
    } catch (genError) {
      console.warn('Gemini generateContent temporary error/timeout, using fallback:', genError);
      const fallbackReply = getKnowledgeBaseReply(message);
      res.json({ reply: fallbackReply, source: 'knowledge_base' });
    }
  } catch (error) {
    console.error('Skill Academy Chat error:', error);
    res.status(500).json({
      error: 'Terjadi kendala saat memproses jawaban. Silakan coba sesaat lagi.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// API: Get all registrations
app.get('/api/registrations', (_req: Request, res: Response) => {
  res.json({
    total: registrations.length,
    data: registrations,
  });
});

// API: Search registration by NIK or Registration ID
app.get('/api/registrations/check', (req: Request, res: Response) => {
  const query = (req.query.q as string || '').trim().toLowerCase();
  if (!query) {
    res.status(400).json({ error: 'Masukkan NIK atau Nomor Registrasi Siswa' });
    return;
  }

  const found = registrations.find(
    (r) => r.id.toLowerCase() === query || r.nik === query
  );

  if (!found) {
    res.status(404).json({
      found: false,
      message: `Data pendaftaran siswa dengan kata kunci "${query}" tidak ditemukan. Pastikan NIK atau No. Registrasi sudah sesuai, atau daftarkan diri Anda sekarang.`,
    });
    return;
  }

  res.json({
    found: true,
    data: found,
  });
});

// API: Create new student registration
app.post('/api/registrations', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      nik,
      birthPlaceDate,
      gender,
      phone,
      email,
      lastEducation,
      program,
      programName,
      city,
      notes,
    } = req.body;

    if (!fullName || !nik || !phone || !program) {
      res.status(400).json({
        error: 'Nama Lengkap, NIK, No. WhatsApp, dan Jalur Pelatihan wajib diisi.',
      });
      return;
    }

    // Check if NIK already registered
    const existing = registrations.find((r) => r.nik === nik.trim());
    if (existing) {
      res.status(409).json({
        error: 'NIK ini sudah terdaftar sebagai siswa Skill Academy.',
        data: existing,
      });
      return;
    }

    // Generate Registration ID e.g. SA-DM-2026-XXXX
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const id = `SA-DM-2026-${randomDigits}`;

    const newRecord: RegistrationRecord = {
      id,
      nik: nik.trim(),
      fullName: fullName.trim(),
      birthPlaceDate: birthPlaceDate || 'Indonesia',
      gender: gender || 'Laki-laki',
      phone: phone.trim(),
      email: email?.trim() || `${nik}@siswa.skillacademy.com`,
      lastEducation: lastEducation || 'S1 / Sarjana',
      program,
      programName: programName || program,
      city: city || 'Indonesia',
      status: 'TERVERIFIKASI',
      registeredAt: new Date().toISOString(),
      notes: notes || 'Registrasi online via portal resmi Skill Academy. Berkas awal terverifikasi sistem.',
    };

    registrations.unshift(newRecord);

    res.status(201).json({
      success: true,
      message: 'Selamat! Pendaftaran berhasil dan Anda resmi terdaftar sebagai siswa Skill Academy.',
      data: newRecord,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Gagal memproses pendaftaran' });
  }
});

// Start server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Skill Academy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
