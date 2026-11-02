import React from 'react';
import { Calendar, User, BookOpen } from 'lucide-react';

interface TopNavProps {
  activeTab: 'flashcards' | 'quiz' | 'booking' | 'calculator' | 'brief';
  setActiveTab: (tab: 'flashcards' | 'quiz' | 'booking' | 'calculator' | 'brief') => void;
  onOpenProfile: () => void;
  bookedCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenProfile,
  bookedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark - Top Bar Contract */}
        <button
          onClick={() => setActiveTab('flashcards')}
          className="text-lg font-bold tracking-tight text-slate-900 hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 text-left"
        >
          StudySync AI
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'flashcards'
                ? 'text-sky-700 border-sky-600 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Active Recall
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'quiz'
                ? 'text-sky-700 border-sky-600 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Practice Exam
          </button>

          <button
            onClick={() => setActiveTab('booking')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'booking'
                ? 'text-sky-700 border-sky-600 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Sprint Booking
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'calculator'
                ? 'text-sky-700 border-sky-600 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            ROI Calculator
          </button>

          <button
            onClick={() => setActiveTab('brief')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'brief'
                ? 'text-sky-700 border-sky-600 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Venture Brief
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenProfile}
            aria-label="Student profile settings"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('booking')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            {bookedCount > 0 ? `Bookings (${bookedCount})` : 'Book Exam Sprint'}
          </button>
        </div>

      </div>

      {/* Mobile subnav */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-100 gap-4 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'flashcards' ? 'text-sky-700 font-bold' : ''}`}
        >
          Active Recall
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'quiz' ? 'text-sky-700 font-bold' : ''}`}
        >
          Practice Exam
        </button>
        <button
          onClick={() => setActiveTab('booking')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'booking' ? 'text-sky-700 font-bold' : ''}`}
        >
          Sprint Booking
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'calculator' ? 'text-sky-700 font-bold' : ''}`}
        >
          ROI Calculator
        </button>
        <button
          onClick={() => setActiveTab('brief')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'brief' ? 'text-sky-700 font-bold' : ''}`}
        >
          Venture Brief
        </button>
      </div>
    </header>
  );
};
