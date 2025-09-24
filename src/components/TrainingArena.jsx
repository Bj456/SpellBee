import React, { useEffect, useState } from "react";
import correctSound from "../../public/correct.mp3";
import wrongSound from "../../public/wrong.mp3";
import bgMusic from "../../public/bg.mp3";
import wordsData from "../words";

function TrainingArena({ userName, avatar, mode, maxQuestions, onRestart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);
  const [feedback, setFeedback] = useState("");

  const correctAudio = new Audio(correctSound);
  const wrongAudio = new Audio(wrongSound);
  const bgAudio = new Audio(bgMusic);

  useEffect(() => {
    bgAudio.loop = true;
    bgAudio.volume = 0.5;
    bgAudio.play();
    return () => {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    };
  }, []);

  // Shuffle words once at the start
  useEffect(() => {
    let selectedWords = [];
    if (mode === "easy") selectedWords = wordsData.easy;
    if (mode === "average") selectedWords = wordsData.average;
    if (mode === "hard") selectedWords = wordsData.hard;

    // shuffle and slice according to maxQuestions
    const shuffled = [...selectedWords].sort(() => Math.random() - 0.5);
    setWords(shuffled.slice(0, maxQuestions));
  }, [mode, maxQuestions]);

  const speakWord = (word) => {
    // lower background music
    bgAudio.volume = 0.1;

    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = "en-IN"; // Indian English Accent
    utterance.rate = 0.9;

    utterance.onend = () => {
      // restore bg music
      bgAudio.volume = 0.5;
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (words.length > 0 && currentIndex < words.length) {
      speakWord(words[currentIndex]);
    }
  }, [words, currentIndex]);

  const checkAnswer = () => {
    const correct = words[currentIndex].word.toLowerCase();
    if (input.trim().toLowerCase() === correct) {
      setScore(score + 1);
      setFeedback(`🎉 Well done ${userName}! Keep it up!`);
      correctAudio.play();
    } else {
      setFeedback(`❌ Oops ${userName}, the correct spelling is "${correct}"`);
      wrongAudio.play();
    }
    setInput("");
    setTimeout(() => {
      setFeedback("");
      setCurrentIndex(currentIndex + 1);
    }, 1500);
  };

  if (currentIndex >= words.length) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over 🎉</h2>
        <p className="text-lg mb-4">
          {userName}, your final score is: {score}/{words.length}
        </p>
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-blue-500 text-white rounded-full font-bold hover:scale-105 transition"
        >
          ⬅ Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      {/* Avatar + Name */}
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-2">{avatar}</span>
        <h3 className="text-xl font-bold text-purple-700">{userName}</h3>
      </div>

      {/* Word + Hindi Meaning */}
      <h2 className="text-2xl font-bold mb-2">
        Listen & Type:{" "}
        <span className="text-green-600">
          {words[currentIndex].word} — {words[currentIndex].hindi}
        </span>
      </h2>

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border rounded p-2 mb-4 text-center"
        placeholder="Type spelling here"
      />

      <button
        onClick={checkAnswer}
        className="px-6 py-2 bg-green-500 text-white rounded-full font-bold hover:scale-105 transition"
      >
        Submit
      </button>

      {/* Score + Motivation */}
      <p className="mt-4 text-lg font-semibold">{feedback}</p>
      <p className="mt-2">
        Score: {score}/{words.length}
      </p>

      {/* Back Button */}
      <button
        onClick={onRestart}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:scale-105 transition"
      >
        ⬅ Back
      </button>
    </div>
  );
}

export default TrainingArena;
