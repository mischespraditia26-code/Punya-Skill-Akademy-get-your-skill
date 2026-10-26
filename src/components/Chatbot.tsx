import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  X,
  Sparkles,
  Loader2,
  Trash2,
  Copy,
  Check,
  UserCheck,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onGoToRegistration: (programId?: string) => void;
  mode?: 'floating' | 'modal';
}

const DEFAULT_SUGGESTIONS = [
  'Rekomendasi jalur digital marketing untuk pemula?',
  'Bagaimana fasilitas Real Ad Budget untuk praktek iklan?',
  'Apakah dapat sertifikasi resmi BNSP & Google?',
  'Bagaimana cara mendaftar agar terdaftar resmi?',
  'Opsi cicilan & promo beasiswa bootcamp?',
];

export const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  onGoToRegistration,
  mode = 'floating',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'Halo! Saya **SkillBot**, Konsultan Belajar & Karir Resmi **Skill Academy** (Platform Pelatihan Berbasis Digital Marketing No. 1 di Indonesia).\n\nAda yang bisa saya bantu terkait pemilihan jalur bootcamp (Performance Ads, SEO, TikTok/Sosmed, E-Commerce), saldo iklan nyata (Real Ad Budget), sertifikasi BNSP, atau panduan pendaftaran agar resmi terdaftar?',
      timestamp: new Date().toISOString(),
      source: 'knowledge_base',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menerima tanggapan');
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Maaf, saya tidak dapat merespons saat ini.',
        timestamp: new Date().toISOString(),
        source: data.source,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        content:
          'Mohon maaf, terjadi kendala saat memproses jawaban. Anda tetap dapat langsung mengisi formulir pendaftaran di tab **"Formulir Pendaftaran Siswa"** di atas untuk mendapatkan Nomor Siswa resmi Skill Academy.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          'Percakapan telah direset. Silakan tanyakan hal apa pun seputar kurikulum Digital Marketing, portofolio riil, atau alur pendaftaran siswa di Skill Academy.',
        timestamp: new Date().toISOString(),
        source: 'knowledge_base',
      },
    ]);
  };

  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-0.5 pl-2">
            <span className="text-orange-600 font-bold shrink-0">•</span>
            <span className="flex-1">{formattedParts}</span>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return <p key={idx} className="my-0.5 leading-relaxed">{formattedParts}</p>;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={
        mode === 'modal' || isExpanded
          ? 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs'
          : 'fixed bottom-4 right-4 z-50 w-full max-w-md sm:max-w-lg'
      }
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-200 ${
          mode === 'modal' || isExpanded
            ? 'w-full max-w-3xl h-[85vh]'
            : 'h-[560px] max-h-[85vh]'
        }`}
      >
        {/* Chatbot Header */}
        <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-sm font-bold text-xs">
              SA
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">SkillBot</h3>
                <span className="text-[10px] text-orange-400 font-mono">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Konsultan Belajar & Karir Skill Academy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
              title="Bersihkan Percakapan"
              aria-label="Bersihkan Percakapan"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {mode !== 'modal' && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer hidden sm:block"
                title={isExpanded ? 'Perkecil' : 'Perbesar'}
                aria-label={isExpanded ? 'Perkecil' : 'Perbesar'}
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
              aria-label="Tutup Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggestion Quick Chips */}
        <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none">
          {DEFAULT_SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sug)}
              className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium bg-white text-slate-700 hover:text-orange-600 hover:border-orange-400 border border-slate-200 rounded-md transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => {
            const isBot = msg.role === 'assistant';

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    SA
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] shadow-2xs ${
                    isBot
                      ? 'bg-white border border-slate-200 text-slate-700'
                      : 'bg-orange-600 text-white font-medium'
                  }`}
                >
                  <div className="space-y-1">{renderFormattedText(msg.content)}</div>

                  {isBot && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          onGoToRegistration();
                          onClose();
                        }}
                        className="text-orange-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <UserCheck className="w-3 h-3" />
                        <span>Buka Form Pendaftaran</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                SA
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-600" />
                <span>SkillBot sedang mengetik tanggapan...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Tanyakan jalur digital marketing, real ad budget, sertifikasi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm"
              aria-label="Kirim Pertanyaan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
            <span>Didukung Gemini AI untuk konsultasi karir digital marketing</span>
            <button
              onClick={() => {
                onGoToRegistration();
                onClose();
              }}
              className="text-orange-600 hover:underline font-medium cursor-pointer"
            >
              Daftar Bootcamp Sekarang →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
