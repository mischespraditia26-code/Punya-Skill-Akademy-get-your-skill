/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RegistrationPortal } from './components/RegistrationPortal';
import { ProgramCatalog } from './components/ProgramCatalog';
import { AccreditationSection } from './components/AccreditationSection';
import { RegistrationCard } from './components/RegistrationCard';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { CandidateRegistration } from './types';
import { Bot } from 'lucide-react';

export default function App() {
  const [selectedProgramForReg, setSelectedProgramForReg] = useState<string>('fullstack_digital_marketing');
  const [activePortalTab, setActivePortalTab] = useState<'form' | 'check' | 'quiz'>('form');
  const [currentRegistration, setCurrentRegistration] = useState<CandidateRegistration | null>(null);

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'status-check') {
      setActivePortalTab('check');
      const el = document.getElementById('registration');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (sectionId === 'registration') {
      setActivePortalTab('form');
      const el = document.getElementById('registration');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProgramFromCatalog = (programId: string) => {
    setSelectedProgramForReg(programId);
    setActivePortalTab('form');
    scrollToSection('registration');
  };

  const handleAskAboutProgram = (programName: string) => {
    setChatPrompt(`Halo SkillBot, tolong jelaskan rincian jalur ${programName}: materi yang dipelajari, tools yang digunakan, fasilitas Real Ad Budget, dan prospek karir setelah lulus.`);
    setIsChatOpen(true);
  };

  const handleOpenChatWithQuery = (prompt: string) => {
    setChatPrompt(prompt);
    setIsChatOpen(true);
  };

  const handleRegistrationSuccess = (record: CandidateRegistration) => {
    setCurrentRegistration(record);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-orange-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenChat={() => {
          setChatPrompt(undefined);
          setIsChatOpen(true);
        }}
        onOpenRegister={() => {
          setActivePortalTab('form');
          scrollToSection('registration');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onRegisterClick={() => {
            setActivePortalTab('form');
            scrollToSection('registration');
          }}
          onChatClick={() => {
            setChatPrompt('Halo SkillBot! Saya ingin konsultasi rekomendasi jalur Digital Marketing yang paling cocok untuk pemula seperti saya.');
            setIsChatOpen(true);
          }}
          onExplorePrograms={() => scrollToSection('programs')}
        />

        {/* Digital Marketing Course Catalog */}
        <ProgramCatalog
          onSelectProgram={handleSelectProgramFromCatalog}
          onAskAboutProgram={handleAskAboutProgram}
        />

        {/* Central Registration & Status Verification Hub ("Terdaftar") */}
        <RegistrationPortal
          initialProgramId={selectedProgramForReg}
          activeTab={activePortalTab}
          onTabChange={setActivePortalTab}
          onRegisteredSuccess={handleRegistrationSuccess}
          onOpenChatWithQuery={handleOpenChatWithQuery}
        />

        {/* BNSP Accreditation, Tech Partners & FAQ */}
        <AccreditationSection
          onOpenChatWithQuery={handleOpenChatWithQuery}
          onOpenRegister={() => {
            setActivePortalTab('form');
            scrollToSection('registration');
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenChat={() => {
          setChatPrompt(undefined);
          setIsChatOpen(true);
        }}
      />

      {/* Official Student Digital ID Card Modal */}
      {currentRegistration && (
        <RegistrationCard
          registration={currentRegistration}
          onClose={() => setCurrentRegistration(null)}
          onAskChatbot={handleOpenChatWithQuery}
        />
      )}

      {/* Floating or Modal AI Chatbot (SkillBot) */}
      <Chatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialPrompt={chatPrompt}
        onGoToRegistration={(programId) => {
          if (programId) setSelectedProgramForReg(programId);
          setActivePortalTab('form');
          scrollToSection('registration');
        }}
      />

      {/* Floating Chat Trigger Button */}
      {!isChatOpen && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
          <button
            onClick={() => {
              setChatPrompt(undefined);
              setIsChatOpen(true);
            }}
            className="group flex items-center gap-2.5 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            aria-label="Buka Chatbot Konsultan Belajar Skill Academy"
          >
            <Bot className="w-5 h-5 text-white animate-bounce group-hover:animate-none" />
            <span className="text-xs font-bold tracking-wide">Tanya SkillBot AI</span>
          </button>
        </div>
      )}
    </div>
  );
}
