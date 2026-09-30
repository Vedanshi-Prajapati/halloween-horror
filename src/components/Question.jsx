import React, { useState, useEffect } from 'react';
import Progress from './Progress';
import Answer from './Answer';

export default function Question({
  questionData,
  currentIndex,
  totalQuestions,
  onAnswerSelected,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset local selection when question index changes
  useEffect(() => {
    setSelectedId(null);
    setIsTransitioning(false);
  }, [questionData.id]);

  // Handle choice selection with subtle delay for smooth editorial pacing
  const handleSelect = (answer) => {
    if (selectedId || isTransitioning) return;
    setSelectedId(answer.id);
    setIsTransitioning(true);

    // Brief atmospheric pause before moving to the next query
    setTimeout(() => {
      onAnswerSelected(answer);
    }, 420);
  };

  // Keyboard shortcut listener (A-D, 1-4)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedId || isTransitioning) return;
      const key = e.key.toUpperCase();
      let targetIndex = -1;

      if (key === 'A' || key === '1') targetIndex = 0;
      else if (key === 'B' || key === '2') targetIndex = 1;
      else if (key === 'C' || key === '3') targetIndex = 2;
      else if (key === 'D' || key === '4') targetIndex = 3;

      if (targetIndex >= 0 && targetIndex < questionData.answers.length) {
        handleSelect(questionData.answers[targetIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [questionData, selectedId, isTransitioning]);

  return (
    <div className={`question-scene-container ${isTransitioning ? 'fading-out' : 'fading-in'}`}>
      {/* Background Illustrated Scene */}
      <div className="scene-backdrop" aria-hidden="true">
        <img
          src={questionData.scene}
          alt=""
          className="scene-backdrop-image"
          loading="eager"
        />
        <div className="scene-shade" />
      </div>

      <div className="question-content-wrapper">
        {/* Progress Indicator */}
        <header className="question-header">
          <Progress
            currentIndex={currentIndex}
            totalCount={totalQuestions}
            roman={questionData.roman}
          />
        </header>

        {/* Central Question Artwork & Inscription Frame */}
        <main className="question-main-editorial">
          <div className="question-woodcut-plate">
            <h2 className="question-prompt-text">
              {questionData.question}
            </h2>
          </div>

          {/* Answer Choices */}
          <div className="answers-stacked-group" role="group" aria-label="Answer options">
            {questionData.answers.map((ans, idx) => (
              <Answer
                key={ans.id}
                answer={ans}
                index={idx}
                isSelected={selectedId === ans.id}
                onSelect={handleSelect}
                disabled={isTransitioning}
              />
            ))}
          </div>

          <footer className="question-footer-hints">
            <span className="hint-item">SELECT AN ANSWER OR PRESS KEYS [A] – [D]</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
