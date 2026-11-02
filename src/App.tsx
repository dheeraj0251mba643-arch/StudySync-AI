import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { FlashcardDeck } from './components/FlashcardDeck';
import { PracticeExamQuiz } from './components/PracticeExamQuiz';
import { BookingAndCheckout } from './components/BookingAndCheckout';
import { TimeCalculator } from './components/TimeCalculator';
import { VentureBriefView } from './components/VentureBriefView';
import { StudentProfileModal } from './components/StudentProfileModal';
import { DEFAULT_STUDENT_PROFILE, INITIAL_FLASHCARDS, MOCK_QUIZ_QUESTIONS, SPRINT_PACKAGES } from './data/mockCourseData';
import { Flashcard, BookedAppointment, StudentProfile, SubjectType, SprintPackage } from './types';
import { BookOpen, CheckCircle, FileText, Calendar, Clock, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'studysync_ai_state_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz' | 'booking' | 'calculator' | 'brief'>('flashcards');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('organic-chemistry');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Persistent States
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT_PROFILE;
    } catch {
      return DEFAULT_STUDENT_PROFILE;
    }
  });

  const [cards, setCards] = useState<Flashcard[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cards`);
      return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
    } catch {
      return INITIAL_FLASHCARDS;
    }
  });

  const [packages, setPackages] = useState<SprintPackage[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_packages`);
      return saved ? JSON.parse(saved) : SPRINT_PACKAGES;
    } catch {
      return SPRINT_PACKAGES;
    }
  });

  const [bookedAppointments, setBookedAppointments] = useState<BookedAppointment[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_bookings`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizScores, setQuizScores] = useState<{ quizId: string; score: number; total: number; date: string }[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quizzes`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_cards`, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_packages`, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_bookings`, JSON.stringify(bookedAppointments));
  }, [bookedAppointments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_quizzes`, JSON.stringify(quizScores));
  }, [quizScores]);

  // Flashcard handlers
  const handleUpdateCardMastery = (id: string, mastery: 'new' | 'learning' | 'mastered') => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, mastery, reviewCount: c.reviewCount + 1 } : c
      )
    );
  };

  const handleAddCustomCards = (newCards: Flashcard[]) => {
    setCards((prev) => [...newCards, ...prev]);
  };

  // Booking handlers
  const handleCompleteBooking = (newBooking: BookedAppointment) => {
    setBookedAppointments((prev) => [newBooking, ...prev]);

    // Mark slot as booked in packages
    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === newBooking.packageId) {
          return {
            ...pkg,
            slots: pkg.slots.map((s) =>
              newBooking.dateTimeString.includes(s.time) ? { ...s, isBooked: true } : s
            ),
          };
        }
        return pkg;
      })
    );
  };

  const handleCancelAppointment = (bookingId: string) => {
    setBookedAppointments((prev) => prev.filter((b) => b.bookingId !== bookingId));
  };

  const handleRecordScore = (quizId: string, score: number, total: number) => {
    setQuizScores((prev) => [{ quizId, score, total, date: new Date().toISOString() }, ...prev]);
  };

  const handleResetAllData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_profile`);
    localStorage.removeItem(`${STORAGE_KEY}_cards`);
    localStorage.removeItem(`${STORAGE_KEY}_packages`);
    localStorage.removeItem(`${STORAGE_KEY}_bookings`);
    localStorage.removeItem(`${STORAGE_KEY}_quizzes`);
    setProfile(DEFAULT_STUDENT_PROFILE);
    setCards(INITIAL_FLASHCARDS);
    setPackages(SPRINT_PACKAGES);
    setBookedAppointments([]);
    setQuizScores([]);
    setIsProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Venture Quest Academic Header Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">DGU Venture Quest</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Student: <strong className="text-white">{profile.name}</strong> ({profile.studentId})</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="hidden md:inline">Assignment 2 Venture App Prototype</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <button
              onClick={() => setActiveTab('brief')}
              className="text-sky-400 hover:text-sky-300 transition-colors underline"
            >
              View Venture Brief & Validation Logic
            </button>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono text-slate-400">{profile.university}</span>
          </div>
        </div>
      </div>

      {/* Strict Top Bar Contract Header */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProfile={() => setIsProfileOpen(true)}
        bookedCount={bookedAppointments.length}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'flashcards' && (
          <FlashcardDeck
            cards={cards}
            onUpdateCardMastery={handleUpdateCardMastery}
            onAddCustomCards={handleAddCustomCards}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
          />
        )}

        {activeTab === 'quiz' && (
          <PracticeExamQuiz
            questions={MOCK_QUIZ_QUESTIONS}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            onRecordScore={handleRecordScore}
            onGoToBooking={() => setActiveTab('booking')}
          />
        )}

        {activeTab === 'booking' && (
          <BookingAndCheckout
            packages={packages}
            profile={profile}
            bookedAppointments={bookedAppointments}
            onCompleteBooking={handleCompleteBooking}
            onCancelAppointment={handleCancelAppointment}
          />
        )}

        {activeTab === 'calculator' && (
          <TimeCalculator
            initialHours={profile.manualHoursSpentWeekly}
            onGoToActiveRecall={() => setActiveTab('flashcards')}
            onGoToBooking={() => setActiveTab('booking')}
          />
        )}

        {activeTab === 'brief' && (
          <VentureBriefView
            onGoToBooking={() => setActiveTab('booking')}
            onGoToStudy={() => setActiveTab('flashcards')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">StudySync AI</span>
            <span aria-hidden="true">·</span>
            <span>Pre-Med High-Yield Active Learning & Sprint System</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <span>DGU Venture Quest 2026</span>
            <span aria-hidden="true">·</span>
            <span>Dheeraj Pratap Singh</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Profile Settings
            </button>
          </div>
        </div>
      </footer>

      {/* Student Profile Settings Modal */}
      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSaveProfile={setProfile}
        onResetAllData={handleResetAllData}
      />
    </div>
  );
}
