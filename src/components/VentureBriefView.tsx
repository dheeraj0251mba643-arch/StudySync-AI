import React from 'react';
import { CheckCircle2, ArrowRight, ExternalLink, ShieldCheck, Clock, UserCheck, BookOpen, CreditCard } from 'lucide-react';

interface VentureBriefViewProps {
  onGoToBooking: () => void;
  onGoToStudy: () => void;
}

export const VentureBriefView: React.FC<VentureBriefViewProps> = ({
  onGoToBooking,
  onGoToStudy,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header document card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-900 uppercase tracking-wide">DGU Venture Quest</span>
            <span className="mx-2">·</span>
            <span>Entrepreneurship & Innovation — DBS Global University</span>
          </div>
          <div>
            <span>Generated: 2 Nov 2026</span>
          </div>
        </div>

        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Student Author</span>
            <span className="font-semibold text-slate-900 text-base">Dheeraj Pratap Singh</span>
            <span className="text-xs text-slate-600 block font-mono">Roll: 0251MBA643</span>
            <span className="text-xs text-slate-600 block">dheeraj.0251mba643@dgu.ac.in</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Venture Entity</span>
            <span className="font-semibold text-slate-900 text-base">StudySync AI</span>
            <span className="text-xs text-slate-600 block">Pre-Med Active Recall & Self-Service Booking Platform</span>
            <span className="text-xs text-emerald-700 font-medium block">Assignment 2 — Venture App Build Prototype</span>
          </div>
        </div>
      </div>

      {/* Venture Application Objective */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Venture Application Objective</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Build an individual working application prototype based on validated venture logic derived from the Venture Quest journey.
            This system establishes empirical customer self-sufficiency and willing-to-pay conversion without manual intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Target Beachhead Segment</h3>
            <p className="text-sm text-slate-800 font-medium">
              2nd- and 3rd-year Undergraduate Pre-Med students taking Organic Chemistry and Human Anatomy at major research universities.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Why: This group faces an extreme volume of dense, memorization-heavy material where GPA stakes are critical for medical school admissions, making them high-intent early adopters.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Core Problem & Pain</h3>
            <p className="text-sm text-slate-800 font-medium">
              Wasting 4–8 hours weekly doing tedious, non-cognitive formatting work.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Students spend hours manually copy-pasting notes into flashcards and writing manual quiz questions rather than actively learning the content, leading to study burnout, delayed active study, and exam anxiety.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
          <div className="font-semibold text-slate-900">Jobs to Be Done (JTBD)</div>
          <p className="text-slate-600">
            Facing an upcoming midterm or final exam with weeks of unorganized lecture slides, notes, and readings to review → Instantly convert raw course materials into structured, high-yield active-recall flashcards and practice quizzes → Spend limited study hours directly mastering the content and walk into exam day fully prepared without suffering burnout.
          </p>
        </div>
      </div>

      {/* Validation Objective & Core MVP Feature */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">Validation Objective</div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">Core MVP Feature: Self-Service Booking & Direct Payment Checkout</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Critical Assumption: Target customers have a strong enough desire for automated online booking that they will complete a payment and schedule an appointment without needing to speak to a human representative first.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
            <Clock className="w-4 h-4 text-sky-700" />
            <div className="font-semibold text-slate-900">Real-Time Availability</div>
            <p className="text-slate-600">
              Live schedule matrix showing real-time tutor slots across 7 upcoming days with instant status sync.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
            <CreditCard className="w-4 h-4 text-sky-700" />
            <div className="font-semibold text-slate-900">Direct Payment Checkout</div>
            <p className="text-slate-600">
              Zero human sales friction. Client completes payment with mock test cards or coupon code, generating an instant booking receipt.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
            <BookOpen className="w-4 h-4 text-sky-700" />
            <div className="font-semibold text-slate-900">Active Recall Engine</div>
            <p className="text-slate-600">
              Instant conversion of raw notes into high-yield 3D flashcards with Spaced Repetition and Anki export.
            </p>
          </div>
        </div>

        {/* Specifications Alignment Matrix */}
        <div className="border-t border-slate-100 pt-6 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Specification Compliance Checklist</h3>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Self-Service Booking & Direct Payment Checkout:</span> Fully operational. Users select an Organic Chemistry or Anatomy sprint session, choose a live time slot, and execute automated checkout.
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">V1 Scope Adherence:</span> Web-only responsive design, no native app stubs, no in-app live chat, single checkout sprints without recurring subscriptions.
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Required Inputs from User:</span> User credentials, university, exam date, weak topics, raw lecture text upload, and checkout details.
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Required Outputs / Display:</span> Decision recommendations, calculated metrics (hours saved, active mastery %), 3D flip visual feedback, downloadable deliverables (Anki CSV, printable study sheet, calendar .ics).
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Data Stored:</span> Persistent user profile, custom decks, quiz history, and booked appointments in localStorage.
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onGoToBooking}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Test MVP Self-Service Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onGoToStudy}
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Launch Active Recall Engine</span>
          </button>
        </div>
      </div>
    </div>
  );
};
