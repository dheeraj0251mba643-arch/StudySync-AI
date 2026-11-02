export type SubjectType = 'organic-chemistry' | 'human-anatomy';

export interface StudentProfile {
  name: string;
  email: string;
  university: string;
  studentId: string;
  targetCourse: SubjectType;
  examDate: string;
  manualHoursSpentWeekly: number;
}

export interface Flashcard {
  id: string;
  subject: SubjectType;
  topic: string;
  front: string;
  back: string;
  clinicalNote: string;
  mechanismOrKeyPoint?: string;
  mastery: 'new' | 'learning' | 'mastered';
  reviewCount: number;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  rationale: string;
}

export interface QuizQuestion {
  id: string;
  subject: SubjectType;
  topic: string;
  clinicalVignette: string;
  question: string;
  options: QuizOption[];
  highYieldYieldFactor: string;
}

export interface InstructorSlot {
  id: string;
  dateStr: string; // YYYY-MM-DD
  dayLabel: string; // e.g. 'Thu, Nov 5'
  time: string; // e.g. '10:00 AM EST'
  isBooked: boolean;
}

export interface SprintPackage {
  id: string;
  title: string;
  subject: SubjectType;
  durationMinutes: number;
  priceUsd: number;
  instructorName: string;
  instructorTitle: string;
  instructorSchool: string;
  instructorScore: string;
  badgeLabel: string;
  description: string;
  curriculumHighlights: string[];
  slots: InstructorSlot[];
}

export interface BookedAppointment {
  bookingId: string;
  packageId: string;
  packageTitle: string;
  instructorName: string;
  instructorSchool: string;
  dateTimeString: string;
  studentName: string;
  studentEmail: string;
  studentUniversity: string;
  courseFocus: string;
  weakTopicsNotes: string;
  pricePaid: number;
  paymentMethod: string;
  createdAt: string;
  status: 'confirmed' | 'completed';
}

export interface UserState {
  profile: StudentProfile;
  flashcards: Flashcard[];
  customDecksCount: number;
  quizScores: {
    quizId: string;
    score: number;
    total: number;
    date: string;
  }[];
  bookedAppointments: BookedAppointment[];
}
