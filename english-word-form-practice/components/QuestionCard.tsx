
import React from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedOption: string | undefined;
  onOptionSelect: (questionId: number, answer: string) => void;
  isSubmitted: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  selectedOption,
  onOptionSelect,
  isSubmitted,
}) => {
  const getButtonClass = (option: string) => {
    let baseClass = "w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ease-in-out disabled:cursor-not-allowed";

    if (isSubmitted) {
      if (option === question.answer) {
        return `${baseClass} bg-green-500/30 border-green-500 text-green-300 font-semibold`;
      }
      if (option === selectedOption && option !== question.answer) {
        return `${baseClass} bg-red-500/30 border-red-500 text-red-300 font-semibold`;
      }
      return `${baseClass} bg-slate-700/50 border-slate-600 text-slate-400`;
    }

    if (option === selectedOption) {
      return `${baseClass} bg-cyan-600/50 border-cyan-500 text-white font-semibold`;
    }
    
    return `${baseClass} bg-slate-700 border-slate-600 hover:bg-slate-600/70 hover:border-cyan-500`;
  };

  const sentenceWithBlank = question.sentence.replace('___', '______');

  return (
    <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/50">
      <p className="mb-4 text-lg text-slate-300">
        <span className="font-bold text-cyan-400 mr-2">{questionNumber}.</span>
        {sentenceWithBlank}
        <span className="text-sm font-mono text-slate-400 ml-2">({question.baseWord})</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onOptionSelect(question.id, option)}
            className={getButtonClass(option)}
            disabled={isSubmitted}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
