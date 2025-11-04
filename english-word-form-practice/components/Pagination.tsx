
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  const baseButtonClass = "px-6 py-2 text-white font-bold rounded-lg transition-colors duration-200 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed";
  const prevButtonClass = `${baseButtonClass} bg-slate-600 hover:bg-slate-500`;
  const nextButtonClass = `${baseButtonClass} bg-cyan-600 hover:bg-cyan-500`;

  return (
    <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg shadow-md">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className={prevButtonClass}
      >
        Previous
      </button>
      <span className="font-semibold text-slate-300">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        className={nextButtonClass}
      >
        Next
      </button>
    </div>
  );
};
