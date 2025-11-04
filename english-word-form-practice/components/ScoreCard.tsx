
import React from 'react';

interface ScoreCardProps {
  score: number;
  total: number;
  onReset: () => void;
  onNext: () => void;
  isLastQuiz: boolean;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, total, onReset, onNext, isLastQuiz }) => {
  const percentage = Math.round((score / total) * 100);
  let feedbackText = '';
  let feedbackColor = 'text-green-400';

  if (percentage < 50) {
    feedbackText = "Keep trying! Practice makes perfect.";
    feedbackColor = 'text-red-400';
  } else if (percentage < 80) {
    feedbackText = "Good job! You're getting there.";
    feedbackColor = 'text-yellow-400';
  } else {
    feedbackText = "Excellent work! You've mastered this set.";
  }

  return (
    <div className="bg-slate-900/50 text-center p-6 rounded-lg mb-8 border border-slate-700">
      <h3 className="text-2xl font-bold text-slate-100">Your Result</h3>
      <p className="text-6xl font-bold my-4 text-cyan-400">
        {score} <span className="text-3xl text-slate-400">/ {total}</span>
      </p>
      <p className={`text-lg font-semibold ${feedbackColor}`}>{feedbackText}</p>
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors"
        >
          Try Again
        </button>
        {!isLastQuiz && (
            <button
            onClick={onNext}
            className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-500 transition-colors"
            >
            Next Quiz
            </button>
        )}
      </div>
    </div>
  );
};
