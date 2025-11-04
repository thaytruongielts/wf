
import React, { useState, useCallback } from 'react';
import { Quiz } from './components/Quiz';
import { Pagination } from './components/Pagination';
import { quizData } from './data/quizData';

const TOTAL_PAGES = quizData.length;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = useCallback((page: number) => {
    if (page >= 0 && page < TOTAL_PAGES) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  }, []);

  const handleNextPage = useCallback(() => {
    handlePageChange(currentPage + 1);
  }, [currentPage, handlePageChange]);

  const currentQuiz = quizData[currentPage];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-2">English Word Form Practice</h1>
        <p className="text-lg text-slate-400">Hone your skills for the 10th-grade entrance exam!</p>
      </header>
      
      <main className="w-full max-w-4xl">
        <Quiz
          key={currentPage} // Add key to reset Quiz state on page change
          quiz={currentQuiz}
          quizNumber={currentPage + 1}
          onComplete={handleNextPage}
          isLastQuiz={currentPage === TOTAL_PAGES - 1}
        />
      </main>

      <footer className="w-full max-w-4xl mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  );
};

export default App;
