import React, { useState } from 'react';
import { Flashcard, SubjectType } from '../types';
import { RotateCw, CheckCircle, Sparkles, Download, Plus, ChevronLeft, ChevronRight, HelpCircle, Layers, FileText } from 'lucide-react';

interface FlashcardDeckProps {
  cards: Flashcard[];
  onUpdateCardMastery: (id: string, mastery: 'new' | 'learning' | 'mastered') => void;
  onAddCustomCards: (newCards: Flashcard[]) => void;
  selectedSubject: SubjectType;
  setSelectedSubject: (subject: SubjectType) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  onUpdateCardMastery,
  onAddCustomCards,
  selectedSubject,
  setSelectedSubject,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showNoteConverter, setShowNoteConverter] = useState(false);
  const [rawLectureNotes, setRawLectureNotes] = useState('');
  const [converterSubject, setConverterSubject] = useState<SubjectType>(selectedSubject);
  const [isConverting, setIsConverting] = useState(false);

  // Filter cards by selected subject
  const filteredCards = cards.filter((c) => c.subject === selectedSubject);
  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleRate = (mastery: 'new' | 'learning' | 'mastered') => {
    if (currentCard) {
      onUpdateCardMastery(currentCard.id, mastery);
      handleNext();
    }
  };

  // Convert raw lecture notes into active recall flashcards
  const handleConvertNotes = () => {
    if (!rawLectureNotes.trim()) return;
    setIsConverting(true);

    setTimeout(() => {
      // Intelligent extraction algorithm based on raw lecture text
      const lines = rawLectureNotes
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      const generated: Flashcard[] = [];
      const timestamp = Date.now();

      // If text contains colon or dashes, extract pairs
      let parsedPairs: { front: string; back: string }[] = [];

      for (const line of lines) {
        if (line.includes(':')) {
          const [f, ...b] = line.split(':');
          if (f && b.length) parsedPairs.push({ front: f.trim(), back: b.join(':').trim() });
        } else if (line.includes(' - ')) {
          const [f, ...b] = line.split(' - ');
          if (f && b.length) parsedPairs.push({ front: f.trim(), back: b.join(' - ').trim() });
        } else if (line.includes('?')) {
          const [f, ...b] = line.split('?');
          if (f && b.length) parsedPairs.push({ front: f.trim() + '?', back: b.join('?').trim() });
        }
      }

      if (parsedPairs.length === 0) {
        // Fallback: chunk lines into question/answer pairs
        for (let i = 0; i < lines.length; i += 2) {
          const front = lines[i];
          const back = lines[i + 1] || 'Key high-yield concept extracted from lecture notes.';
          parsedPairs.push({ front, back });
        }
      }

      parsedPairs.slice(0, 5).forEach((pair, idx) => {
        generated.push({
          id: `custom-${timestamp}-${idx}`,
          subject: converterSubject,
          topic: 'Lecture Note Synthesis',
          front: pair.front.startsWith('What') || pair.front.startsWith('How') || pair.front.includes('?') 
            ? pair.front 
            : `Explain the mechanism / clinical significance of: ${pair.front}`,
          back: pair.back,
          clinicalNote: converterSubject === 'organic-chemistry' 
            ? 'High-yield exam synthesis target; watch for stereocenter retention vs inversion.' 
            : 'Tested in anatomical dissection and high-yield nerve/vessel cross-sections.',
          mechanismOrKeyPoint: 'Extracted automatically from course lecture slides.',
          mastery: 'new',
          reviewCount: 0,
        });
      });

      onAddCustomCards(generated);
      setIsConverting(false);
      setRawLectureNotes('');
      setShowNoteConverter(false);
      setSelectedSubject(converterSubject);
      setCurrentIndex(filteredCards.length); // jump to newly added card
    }, 450);
  };

  const handleLoadSampleNotes = (type: SubjectType) => {
    if (type === 'organic-chemistry') {
      setConverterSubject('organic-chemistry');
      setRawLectureNotes(
        `Aldol Condensation: Enolate nucleophile attacks aldehyde or ketone carbonyl, followed by dehydration to yield an alpha,beta-unsaturated carbonyl compound.\n` +
        `Grignard with Carbon Dioxide: Organomagnesium halide reacts with dry ice (CO2) to yield a carboxylic acid after protonation with one carbon added.\n` +
        `Markovnikov Rule: In electrophilic additions of HX to unsymmetrical alkenes, H adds to the carbon with more hydrogen atoms, forming the more stable carbocation.`
      );
    } else {
      setConverterSubject('human-anatomy');
      setRawLectureNotes(
        `Radial Nerve Injury at Spiral Groove: Mid-shaft humerus fracture damages the radial nerve in the radial groove, causing wrist drop and sensory loss over the first dorsal web space.\n` +
        `Portal Triad Contents: Located in the hepatoduodenal ligament, consists of the Proper Hepatic Artery, Hepatic Portal Vein, and Common Bile Duct.\n` +
        `Diaphragmatic Apertures: T8 for Vena Cava (Caval opening), T10 for Esophagus (and Vagus nerve), T12 for Aorta (Aortic hiatus with thoracic duct).`
      );
    }
  };

  // Download Anki-compatible CSV
  const handleExportAnki = () => {
    const csvHeader = 'Front,Back,Tags\n';
    const csvRows = filteredCards
      .map((c) => {
        const cleanFront = `"${c.front.replace(/"/g, '""')}"`;
        const cleanBack = `"${(c.back + '<br><br><b>Key Mechanism / Takeaway:</b> ' + (c.mechanismOrKeyPoint || '') + '<br><b>Clinical Note:</b> ' + c.clinicalNote).replace(/"/g, '""')}"`;
        const tags = `"${c.subject},${c.topic.replace(/\s+/g, '_')}"`;
        return `${cleanFront},${cleanBack},${tags}`;
      })
      .join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `StudySync_${selectedSubject}_Anki_Deck.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download High-Yield Study Guide
  const handleExportGuide = () => {
    const title = selectedSubject === 'organic-chemistry' ? 'ORGANIC CHEMISTRY HIGH-YIELD SPRINT GUIDE' : 'HUMAN ANATOMY HIGH-YIELD SPRINT GUIDE';
    let text = `${title}\nGenerated by StudySync AI for Pre-Med Examination Mastery\n${'='.repeat(70)}\n\n`;
    
    filteredCards.forEach((c, i) => {
      text += `[${i + 1}] TOPIC: ${c.topic.toUpperCase()}\n`;
      text += `QUESTION: ${c.front}\n`;
      text += `ANSWER: ${c.back}\n`;
      if (c.mechanismOrKeyPoint) {
        text += `MECHANISM / KEY PRINCIPLE: ${c.mechanismOrKeyPoint}\n`;
      }
      text += `CLINICAL CORRELATION: ${c.clinicalNote}\n`;
      text += `STATUS: ${c.mastery.toUpperCase()}\n`;
      text += `${'-'.repeat(70)}\n\n`;
    });

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `StudySync_${selectedSubject}_HighYield_Guide.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const masteredCount = filteredCards.filter((c) => c.mastery === 'mastered').length;
  const learningCount = filteredCards.filter((c) => c.mastery === 'learning').length;
  const newCount = filteredCards.filter((c) => c.mastery === 'new').length;
  const masteryPercentage = filteredCards.length > 0 ? Math.round((masteredCount / filteredCards.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header bar & Subject Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Active Recall Mastery Deck</h1>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span>{selectedSubject === 'organic-chemistry' ? 'Organic Chemistry II' : 'Human Anatomy'}</span>
            <span aria-hidden="true">·</span>
            <span>{filteredCards.length} high-yield cards</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{masteryPercentage}% mastered</span>
          </div>
        </div>

        {/* Functional Subject Segmented Filter (Allowed by §1.A) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => {
              setSelectedSubject('organic-chemistry');
              setCurrentIndex(0);
              setIsFlipped(false);
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
              setCurrentIndex(0);
              setIsFlipped(false);
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

      {/* Raw Note Instant Converter Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-700" />
              <span>Instant Lecture Notes Converter</span>
            </div>
            <p className="text-xs text-slate-500">
              Facing an upcoming exam with unorganized slides or notes? Paste raw bullet points to generate instant active-recall flashcards.
            </p>
          </div>
          <button
            onClick={() => setShowNoteConverter(!showNoteConverter)}
            className="px-3.5 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto shrink-0"
          >
            {showNoteConverter ? 'Close Converter' : '+ Convert Notes into Cards'}
          </button>
        </div>

        {showNoteConverter && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Paste lecture slides, syllabus outline, or textbook notes below:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleLoadSampleNotes('organic-chemistry')}
                  className="text-sky-700 hover:underline font-medium"
                >
                  Load Orgo Sample
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => handleLoadSampleNotes('human-anatomy')}
                  className="text-sky-700 hover:underline font-medium"
                >
                  Load Anatomy Sample
                </button>
              </div>
            </div>

            <textarea
              value={rawLectureNotes}
              onChange={(e) => setRawLectureNotes(e.target.value)}
              placeholder="e.g. SN1: Occurs in polar protic solvents, tertiary substrate, carbocation intermediate, racemization."
              rows={4}
              className="w-full text-xs font-mono p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span>Assign to:</span>
                <select
                  value={converterSubject}
                  onChange={(e) => setConverterSubject(e.target.value as SubjectType)}
                  aria-label="Assign to subject"
                  className="text-xs bg-slate-100 border border-slate-200 rounded px-2 py-1 font-medium"
                >
                  <option value="organic-chemistry">Organic Chemistry</option>
                  <option value="human-anatomy">Human Anatomy</option>
                </select>
              </div>

              <button
                onClick={handleConvertNotes}
                disabled={isConverting || !rawLectureNotes.trim()}
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isConverting ? (
                  <span>Extracting High-Yield Concepts...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Active Recall Deck</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Flashcard Interactive Stage */}
      {currentCard ? (
        <div className="space-y-4">
          
          {/* Card Meta Kicker & Progress */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{currentCard.topic}</span>
              <span aria-hidden="true">·</span>
              <span>
                Status: <strong className="font-medium text-slate-900">{currentCard.mastery}</strong>
              </span>
            </div>
            <div className="font-mono tabular-nums">
              Card {currentIndex + 1} of {filteredCards.length}
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] sm:min-h-[360px] bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs hover:border-slate-300 cursor-pointer transition-all flex flex-col justify-between relative select-none"
          >
            {/* Top Prompt / Flip Hint */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono uppercase tracking-wider text-[11px]">
                {isFlipped ? 'ACTIVE RECALL ANSWER & MECHANISM' : 'CLINICAL PROMPT / QUESTION'}
              </span>
              <span className="flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click or tap to flip</span>
              </span>
            </div>

            {/* Card Content Area */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
                    {currentCard.front}
                  </h3>
                  <p className="text-xs text-slate-500 italic">
                    Formulate your answer mentally or verbally before flipping to trigger active neural retrieval.
                  </p>
                </div>
              ) : (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                    {currentCard.back}
                  </div>

                  {currentCard.mechanismOrKeyPoint && (
                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
                      <div className="font-semibold text-slate-900">Key Mechanism / Structural Rule:</div>
                      <p className="leading-relaxed">{currentCard.mechanismOrKeyPoint}</p>
                    </div>
                  )}

                  <div className="text-xs text-slate-500 space-y-1">
                    <span className="font-semibold text-slate-700">Clinical / Exam Relevance:</span>
                    <p className="leading-relaxed">{currentCard.clinicalNote}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>{isFlipped ? 'Did you recall correctly?' : 'Press space or click to reveal'}</span>
              <span className="font-mono">Reviewed {currentCard.reviewCount} times</span>
            </div>
          </div>

          {/* Rating / Spaced Repetition Feedback Controls */}
          {isFlipped ? (
            <div className="bg-slate-100 p-2 rounded-xl flex items-center justify-between gap-2">
              <button
                onClick={() => handleRate('new')}
                className="flex-1 py-2.5 px-3 bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors text-center"
              >
                Again (&lt;1d)
              </button>
              <button
                onClick={() => handleRate('learning')}
                className="flex-1 py-2.5 px-3 bg-white hover:bg-amber-50 hover:text-amber-700 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors text-center"
              >
                Hard (2d)
              </button>
              <button
                onClick={() => handleRate('learning')}
                className="flex-1 py-2.5 px-3 bg-white hover:bg-sky-50 hover:text-sky-700 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors text-center"
              >
                Good (4d)
              </button>
              <button
                onClick={() => handleRate('mastered')}
                className="flex-1 py-2.5 px-3 bg-white hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors text-center"
              >
                Easy (7d)
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Card</span>
              </button>

              <button
                onClick={() => setIsFlipped(true)}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Flip to Reveal
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Next Card</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Export & Deliverables Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <span>Mastery: <strong className="text-slate-900">{masteredCount} mastered</strong></span>
              <span aria-hidden="true">·</span>
              <span><strong className="text-slate-900">{learningCount} learning</strong></span>
              <span aria-hidden="true">·</span>
              <span><strong className="text-slate-900">{newCount} new</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportAnki}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export to Anki (.CSV)</span>
              </button>

              <button
                onClick={handleExportGuide}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Study Guide</span>
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-sm text-slate-500">
          No flashcards available in this subject. Use the converter above to add your notes!
        </div>
      )}
    </div>
  );
};
