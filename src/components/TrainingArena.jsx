import React, { useState, useEffect } from "react";
import { easyWords, averageWords, hardWords } from "../words";

function TrainingArena({ playerName, avatar, mode, maxQuestions, setCurrentScreen }) {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    let words = mode === "easy" ? easyWords : mode === "average" ? averageWords : hardWords;
    let shuffled = [...words].sort(() => 0.5 - Math.random()).slice(0, maxQuestions);
    setQuestions(shuffled);
  }, [mode, maxQuestions]);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === questions[currentIndex]) {
      setScore(score + 1);
    }
    setInput("");
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setCurrentIndex(0);
    setCurrentScreen("mode");
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (currentIndex >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-4xl font-bold mb-4">Your Score: {score}/{questions.length}</h2>
        <p className="mb-4">{playerName} {score > maxQuestions / 2 ? "Well done!" : "Keep trying!"}</p>
        <button
          onClick={handlePlayAgain}
          className="px-6 py-2 bg-yellow-400 rounded-lg font-bold hover:bg-yellow-500 transition mb-2"
        >
          Play Again
        </button>
        <button
          onClick={() => setCurrentScreen("start")}
          className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Main Screen
        </button>
        <p className="mt-4 text-sm">Developed by Teacher Bhaskar Joshi</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-3xl mb-2">{avatar} {playerName}</h2>
      <p className="text-xl mb-4">Spell the word:</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-4 px-3 py-2 rounded text-lg"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-400 rounded-lg font-bold hover:bg-blue-500 transition"
      >
        Submit
      </button>
    </div>
  );
}

export default TrainingArena;
