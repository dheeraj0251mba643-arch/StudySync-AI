import React, { useState } from 'react';
import { QuizQuestion, SubjectType } from '../types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertCircle, Award } from 'lucide-react';

interface PracticeExamQuizProps {
  questions: QuizQuestion[];
  selectedSubject: SubjectType;
  setSelectedSubject: (subject: SubjectType) => void;
  onRecordScore: (quizId: string, score: number, total: number) => void;
  onGoToBooking: () => void;
}

export const PracticeExamQuiz: React.FC<PracticeExamQuizProps> = ({
  questions,
  selectedSubject,
  setSelectedSubject,
  onRecordScore,
  onGoToBooking,
}) => {
  const filteredQuestions = questions.filter((q) => q.subject === selectedSubject);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = filteredQuestions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (currentQ.options[idx].isCorrect) {
      setUserScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const finalScore = userScore + (selectedOption !== null && currentQ.options[selectedOption].isCorrect ? 1 : 0);
      onRecordScore(`quiz-${selectedSubject}-${Date.now()}`, finalScore, filteredQuestions.length);
      setQuizCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserScore(0);
    setQuizCompleted(false);
  };

  const scorePct = filteredQuestions.length > 0 ? Math.round((userScore / filteredQuestions.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">High-Yield Practice Exam</h1>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span>Clinical Vignettes & Mechanism Traps</span>
            <span aria-hidden="true">·</span>
            <span>{filteredQuestions.length} Questions</span>
          </div>
        </div>

        {/* Subject Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => {
              setSelectedSubject('organic-chemistry');
              handleReset();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedSubject === 'organic-chemistry'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Organic Chemistry
          </button>
          <button
            onClick={() => {
              setSelectedSubject('human-anatomy');
              handleReset();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedSubject === 'human-anatomy'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Human Anatomy
          </button>
        </div>
      </div>

      {!quizCompleted && currentQ ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Metadata bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">{currentQ.topic}</span>
              <span aria-hidden="true">·</span>
              <span className="text-sky-700 font-medium">{currentQ.highYieldYieldFactor}</span>
            </div>
            <div className="font-mono tabular-nums">
              Question {currentIdx + 1} of {filteredQuestions.length}
            </div>
          </div>

          {/* Clinical Vignette */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-800 leading-relaxed font-normal">
            <span className="font-semibold text-slate-900 block mb-1 text-xs uppercase tracking-wider">Clinical Scenario / Laboratory Setup</span>
            {currentQ.clinicalVignette}
          </div>

          {/* Question Stem */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let borderClass = 'border-slate-200 hover:border-slate-300 bg-white';
              let badgeColor = 'bg-slate-100 text-slate-700';

              if (isAnswered) {
                if (opt.isCorrect) {
                  borderClass = 'border-emerald-500 bg-emerald-50/50';
                  badgeColor = 'bg-emerald-600 text-white';
                } else if (isSelected && !opt.isCorrect) {
                  borderClass = 'border-rose-500 bg-rose-50/50';
                  badgeColor = 'bg-rose-600 text-white';
                } else {
                  borderClass = 'border-slate-200 bg-slate-50 opacity-60';
                }
              } else if (isSelected) {
                borderClass = 'border-sky-600 bg-sky-50/50';
                badgeColor = 'bg-sky-600 text-white';
              }

              const letterLabel = String.fromCharCode(65 + idx);

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${borderClass}`}
                >
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${badgeColor}`}>
                    {letterLabel}
                  </span>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-slate-900 block leading-snug">
                      {opt.text}
                    </span>
                    {isAnswered && (isSelected || opt.isCorrect) && (
                      <p className={`text-xs mt-1.5 leading-relaxed ${opt.isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                        <strong className="font-semibold">{opt.isCorrect ? 'Rationale: ' : 'Distractor Trap: '}</strong>
                        {opt.rationale}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Controls */}
          {isAnswered && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                {selectedOption !== null && currentQ.options[selectedOption].isCorrect ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Correct (+1 point)
                  </span>
                ) : (
                  <span className="text-rose-700 font-semibold flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    Missed question — review rationale above
                  </span>
                )}
              </div>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{currentIdx < filteredQuestions.length - 1 ? 'Next Question' : 'Complete Exam'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Completion Screen */
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs text-center space-y-6">
          <div className="w-12 h-12 bg-sky-50 text-sky-700 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Practice Quiz Complete</h2>
            <div className="text-sm text-slate-500">
              Exam Simulation: {selectedSubject === 'organic-chemistry' ? 'Organic Chemistry II Mechanisms' : 'Human Anatomy Systems'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto py-2">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-500 block">Score</span>
              <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                {userScore} / {filteredQuestions.length}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-500 block">Accuracy</span>
              <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                {scorePct}%
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-500 block">Readiness</span>
              <span className="text-xl font-bold text-sky-700">
                {scorePct >= 75 ? 'Strong' : 'Review Needed'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            {scorePct >= 75
              ? 'Great command of core principles. Continue active recall spaced repetition to lock in long-term retention before exam day.'
              : 'Several mechanistic nuances need targeted clarification. We recommend locking in a 1-on-1 sprint review with a pre-med tutor to eliminate weak points.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={onGoToBooking}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Schedule 1-on-1 Sprint Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
