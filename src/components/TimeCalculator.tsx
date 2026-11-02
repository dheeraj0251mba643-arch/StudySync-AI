import React, { useState } from 'react';
import { Clock, TrendingUp, ShieldAlert, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface TimeCalculatorProps {
  initialHours?: number;
  onGoToActiveRecall: () => void;
  onGoToBooking: () => void;
}

export const TimeCalculator: React.FC<TimeCalculatorProps> = ({
  initialHours = 6,
  onGoToActiveRecall,
  onGoToBooking,
}) => {
  const [weeklyHours, setWeeklyHours] = useState(initialHours);
  const [weeksRemaining, setWeeksRemaining] = useState(8);
  const [hourlyValue, setHourlyValue] = useState(25);

  const totalHoursWasted = weeklyHours * weeksRemaining;
  const hoursReclaimedWithAI = Math.round(totalHoursWasted * 0.88); // 88% reduction in formatting friction
  const activeQuestionsGained = hoursReclaimedWithAI * 18; // approx 18 high-yield questions answered per hour
  const opportunityCostSaved = hoursReclaimedWithAI * hourlyValue;
  const burnoutReductionPct = Math.min(88, Math.round(weeklyHours * 9.5));

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Pre-Med Formatting & Study Burnout Calculator
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Measure how much non-cognitive formatting work (copy-pasting slides, writing cards) robs from actual active-recall mastery.
        </p>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Input sliders (5 cols) */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900">Your Study Variables</h2>

          {/* Slider 1: Weekly hours on formatting */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="weekly-hours-slider" className="text-slate-600 font-medium">Hours Spent Making Flashcards/Notes:</label>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{weeklyHours} hrs/wk</span>
            </div>
            <input
              id="weekly-hours-slider"
              type="range"
              min={2}
              max={14}
              step={1}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-sky-700 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>2 hrs (light)</span>
              <span>6 hrs (pre-med avg)</span>
              <span>14 hrs (heavy)</span>
            </div>
          </div>

          {/* Slider 2: Weeks remaining until exam */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="weeks-remaining-slider" className="text-slate-600 font-medium">Weeks Until Midterm / Final Exam:</label>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{weeksRemaining} weeks</span>
            </div>
            <input
              id="weeks-remaining-slider"
              type="range"
              min={2}
              max={16}
              step={1}
              value={weeksRemaining}
              onChange={(e) => setWeeksRemaining(Number(e.target.value))}
              className="w-full accent-sky-700 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>2 wks (sprint)</span>
              <span>8 wks (mid-semester)</span>
              <span>16 wks (full term)</span>
            </div>
          </div>

          {/* Slider 3: Hourly opportunity cost */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="hourly-value-slider" className="text-slate-600 font-medium">Opportunity Value of Time ($/hr):</label>
              <span className="font-mono font-bold text-slate-900 tabular-nums">${hourlyValue}/hr</span>
            </div>
            <input
              id="hourly-value-slider"
              type="range"
              min={15}
              max={60}
              step={5}
              value={hourlyValue}
              onChange={(e) => setHourlyValue(Number(e.target.value))}
              className="w-full accent-sky-700 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              Value of research hours, lab shifts, or sleep preservation.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600">
            <strong>Brief Grounding:</strong> Pre-Med students report 4–8 hours weekly lost to non-cognitive formatting, producing late-night fatigue and delayed active practice.
          </div>
        </div>

        {/* Right: Calculated Metrics & Impact (7 cols) */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Empirical Value Generation
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Hours Reclaimed</span>
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  {hoursReclaimedWithAI} hrs
                </span>
                <span className="text-[11px] text-emerald-700 block mt-0.5">88% reduction in manual formatting</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Active Questions Gained</span>
                <span className="text-2xl font-bold text-sky-700 font-mono tabular-nums">
                  +{activeQuestionsGained}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Extra high-yield practice reps</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Economic Value Saved</span>
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  ${opportunityCostSaved.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Time ROI on clinical study</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Burnout Risk Reduction</span>
                <span className="text-2xl font-bold text-emerald-700 font-mono tabular-nums">
                  -{burnoutReductionPct}%
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Avoid late-night note grinding</span>
              </div>
            </div>

            {/* Cognitive Comparison Table */}
            <div className="border border-slate-100 rounded-lg overflow-hidden text-xs">
              <div className="grid grid-cols-2 bg-slate-50 p-2.5 font-semibold text-slate-700 border-b border-slate-100">
                <span>Manual Note Creation</span>
                <span>StudySync AI Workflow</span>
              </div>
              <div className="p-3 grid grid-cols-2 gap-3 text-slate-600 bg-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-700">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Copy-pasting slides for 5+ hrs</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-700">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Passive reading & false fluency</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-700">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Pre-exam panic & late nights</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Instant high-yield card extraction</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>100% active recall from Day 1</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>1-on-1 sprint locking when stuck</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGoToActiveRecall}
              className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Convert Lecture Materials Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToBooking}
              className="flex-1 py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Book Exam Prep Sprint</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
