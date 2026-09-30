import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Question from './components/Question';
import Result from './components/Result';
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';
import AudioToggle from './components/AudioToggle';
import { QUIZ_QUESTIONS, CREATURE_RESULTS } from './data/quizData';

export default function App() {
  const [stage, setStage] = useState('landing'); // 'landing' | 'quiz' | 'result'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    vampire: 0,
    witch: 0,
    ghost: 0,
    werewolf: 0,
    reaper: 0,
  });
  const [resultCreature, setResultCreature] = useState(null);

  // Preload all high-res editorial illustrations on mount
  useEffect(() => {
    const assetsToPreload = [
      '/assets/landing.jpg',
      '/assets/scene_hallway.jpg',
      '/assets/scene_crossroads.jpg',
      '/assets/result_vampire.jpg',
      '/assets/result_witch.jpg',
      '/assets/result_ghost.jpg',
      '/assets/result_werewolf.jpg',
      '/assets/result_reaper.jpg',
    ];
    assetsToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleStartQuiz = () => {
    setScores({
      vampire: 0,
      witch: 0,
      ghost: 0,
      werewolf: 0,
      reaper: 0,
    });
    setCurrentQuestionIndex(0);
    setResultCreature(null);
    setStage('quiz');
  };

  const handleAnswerSelected = (answer) => {
    // Tally score
    const updatedScores = { ...scores };
    Object.entries(answer.scores).forEach(([creature, val]) => {
      if (updatedScores[creature] !== undefined) {
        updatedScores[creature] += val;
      }
    });
    setScores(updatedScores);

    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Determine final creature
      let topCreature = 'vampire';
      let maxScore = -1;

      // Ordered priority for deterministic tie-breaking
      const priorityOrder = ['vampire', 'witch', 'ghost', 'werewolf', 'reaper'];
      for (const key of priorityOrder) {
        if (updatedScores[key] > maxScore) {
          maxScore = updatedScores[key];
          topCreature = key;
        }
      }

      setResultCreature(CREATURE_RESULTS[topCreature]);
      setStage('result');
    }
  };

  const handleRestart = () => {
    setStage('landing');
    setCurrentQuestionIndex(0);
    setResultCreature(null);
  };

  return (
    <div className="horror-app-root">
      {/* Editorial Grain and Dark Vignette Filters */}
      <GrainOverlay />

      {/* Spooky Candle/Ember Cursor for Desktop */}
      <CustomCursor />

      {/* Ambient Audio Toggle */}
      <AudioToggle />

      {/* Main Experience Screens */}
      {stage === 'landing' && (
        <Landing onStart={handleStartQuiz} />
      )}

      {stage === 'quiz' && (
        <Question
          questionData={QUIZ_QUESTIONS[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={QUIZ_QUESTIONS.length}
          onAnswerSelected={handleAnswerSelected}
        />
      )}

      {stage === 'result' && resultCreature && (
        <Result
          result={resultCreature}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
