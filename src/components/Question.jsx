import React, { useState, useEffect } from 'react';
import Progress from './Progress';
import Answer from './Answer';
import { playQuestionTransition } from '../utils/audio';

export default function Question({
  questionData,
  currentIndex,
  totalQuestions,
  onAnswerSelected,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setSelectedId(null);
    setIsTransitioning(false);
  }, [questionData.id]);

  const handleSelect = (answer) => {
    if (selectedId || isTransitioning) return;
    setSelectedId(answer.id);
    setIsTransitioning(true);
    playQuestionTransition();

    setTimeout(() => {
      onAnswerSelected(answer);
    }, 400);
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
    <section className={`scene-stage-layout ${isTransitioning ? 'scene-leaving' : 'scene-entering'}`}>
      {/* Scene Folio Header */}
      <header className="scene-stage-header">
        <Progress
          currentIndex={currentIndex}
          totalCount={totalQuestions}
          sceneTitle={questionData.sceneTitle}
        />
      </header>

      {/* Hero Large Horror Illustration */}
      <div className="scene-hero-artwork-frame">
        <img
          key={questionData.scene}
          src={questionData.scene}
          alt={questionData.sceneTitle || "Halloween horror scene"}
          className="scene-hero-artwork-image"
          loading="eager"
        />
        <div className="scene-artwork-shadow-overlay" />
      </div>

      {/* Integrated Question & Choices Composition */}
      <div className="scene-interactive-bottom">
        <h2 className="scene-question-prompt">
          {questionData.question}
        </h2>

        {/* 2x2 Grid on Desktop, Clean Stack on Mobile */}
        <div className="scene-answers-grid" role="group" aria-label="Answer options">
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
      </div>
    </section>
  );
}
