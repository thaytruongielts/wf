
import React, { useState, useMemo } from 'react';
import { QuestionCard } from './QuestionCard';
import { ScoreCard } from './ScoreCard';
import type { Quiz as QuizType, UserAnswers } from '../types';

interface QuizProps {
  quiz: QuizType;
  quizNumber: number;
  onComplete: () => void;
  isLastQuiz: boolean;
}

export const Quiz: React.FC<QuizProps> = ({ quiz, quizNumber, onComplete, isLastQuiz }) => {
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!isSubmitted) return 0;
    return quiz.reduce((total, question) => {
      return total + (userAnswers[question.id] === question.answer ? 1 : 0);
    }, 0);
  }, [isSubmitted, quiz, userAnswers]);

  const handleOptionSelect = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };
  
  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-2xl shadow-slate-950/50">
      <h2 className="text-3xl font-bold text-cyan-300 border-b-2 border-slate-700 pb-4 mb-6">Quiz {quizNumber}</h2>
      
      {isSubmitted && <ScoreCard score={score} total={quiz.length} onReset={handleReset} onNext={onComplete} isLastQuiz={isLastQuiz}/>}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {quiz.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={index + 1}
              selectedOption={userAnswers[question.id]}
              onOptionSelect={handleOptionSelect}
              isSubmitted={isSubmitted}
            />
          ))}
        </div>
        
        {!isSubmitted && (
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all duration-300 ease-in-out shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
              disabled={Object.keys(userAnswers).length !== quiz.length}
            >
              Submit Answers
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
