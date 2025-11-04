
export interface Question {
  id: number;
  sentence: string;
  baseWord: string;
  options: string[];
  answer: string;
}

export type Quiz = Question[];

export type QuizData = Quiz[];

export interface UserAnswers {
  [questionId: number]: string;
}
