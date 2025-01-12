"use client";

import React, { useState } from "react";
import { Quiz, Answer } from "@prisma/client";

type QuizComponentProps = {
  quizzes: (Quiz & { answers: Answer[] })[];
};

export const QuizComponent: React.FC<QuizComponentProps> = ({ quizzes }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuiz = quizzes[currentQuestionIndex];

  const handleAnswerClick = (answerId: string, isTrue: boolean) => {
    setSelectedAnswer(answerId);
    setIsAnswered(true);

    if (isTrue) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const handleSkip = () => {
    setSkippedCount((prev) => prev + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setSkippedCount(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="max-w-lg w-[350px] lg:w-[500px] mx-auto my-8 p-6 border rounded-lg shadow-lg ">
      {isQuizFinished ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Quiz Finished!
          </h2>
          <p className="text-green-600">Correct Answers: {correctCount}</p>
          <p className="text-red-600">Incorrect Answers: {incorrectCount}</p>
          <p className="text-yellow-600">Skipped Questions: {skippedCount}</p>
          <button
            onClick={handleRestart}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-white">
            {currentQuiz?.question}
          </h2>
          <div className="space-y-3">
            {currentQuiz?.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerClick(answer.id, answer.isTrue)}
                disabled={isAnswered}
                className={`w-full text-left p-3 rounded-md border ${
                  selectedAnswer === answer.id
                    ? answer.isTrue
                      ? "bg-green-100 border-green-400 text-green-700"
                      : "bg-red-100 border-red-400 text-red-700"
                    : "bg-gray-100 border-gray-300 "
                }`}
              >
                {answer.text}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-white">
              Question {currentQuestionIndex + 1} of {quizzes.length}
            </span>
            <button
              onClick={handleSkip}
              className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
            >
              Skip
            </button>
          </div>
        </>
      )}
    </div>
  );
};
