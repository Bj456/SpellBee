import React, { useState, useEffect, useRef } from "react";
import { easyWords, averageWords, hardWords } from "../words";

function TrainingArena({ playerName, avatar, mode, maxQuestions, setCurrentScreen }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const bgMusic = useRef(null);
  const correctSound = useRef(null);
  const wrongSound = useRef(null);

  useEffect(() => {
    // Select words randomly based on mode
    let wordsPool = mode === "easy" ? easyWords : mode === "average" ? averageWords : hardWords;
    let shuffled = [...wordsPool].sort(() => 0.5 - Math.random()).slice(0, maxQuestions);
    setQuestions(shuffled);

    // Load audio
    bgMusic.current = new Audio("/bg.mp3");
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.3;
    bgMusic.current.play();

    correctSound.current = new Audio("/correct.mp3");
    wrongSound.current = new Audio("/wrong.mp3");

    playWord(shuffled[0]);

    // Cleanup
    return () => {
      bgMusic.current.pause();
    };
  }, []);

  const playWord = (word) => {
    if (!word) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-IN"; // Indian English
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = () => {
    if (answer.toLowerCase() === questions[currentIndex].toLowerCase()) {
      correctSound.current.play();
      setScore(score + 1);
      setMessage("Correct!");
    } else {
      wrongSound.current.play();
      setMessage(`Wrong! Correct: ${questions[currentIndex]}`);
    }
    setAnswer("");
    if (currentIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        playWord(questions[currentIndex + 1]);
        setMessage("");
      }, 1000);
    } else {
      setTimeout(() => setCurrentScreen("userinfo"), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-yellow-100 p-4">
      <h2 className="text-2xl font-bold mb-2">
        {avatar} {playerName}
      </h2>
      <p className="mb-4">Score: {score}</p>

      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="mb-2 px-3 py-2 rounded text-lg"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button
        onClick={handleSubmit}
        className="mb-2 px-4 py-2 bg-green-400 rounded font-bold hover:bg-green-500 transition"
      >
        Submit
      </button>

      <p className="text-lg font-bold">{message}</p>
      <button
        onClick={() => setCurrentScreen("start")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Back
      </button>
    </div>
  );
}

export default TrainingArena;
