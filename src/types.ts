export interface VocationalProgram {
  id: string;
  name: string;
  category: 'LUAR_NEGERI' | 'TEKNIK_INDUSTRI' | 'JASA_HOSPITALITY' | 'DIGITAL';
  targetCountry: string;
  duration: string;
  salaryEstimate: string;
  certification: string;
  quotaAvailable: number;
  highlight: string;
  description: string;
  curriculum: string[];
  requirements: string[];
  intakeSchedule: string;
  image?: string;
}

export interface CandidateRegistration {
  id: string;
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
  status: 'TERVERIFIKASI' | 'SELEKSI_BERKAS' | 'JADWAL_WAWANCARA' | 'LULUS_PELATIHAN';
  registeredAt: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini-3.8-flash' | 'knowledge_base';
}
