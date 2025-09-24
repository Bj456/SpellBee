// src/components/TrainingArena.jsx
import React, { useEffect, useRef, useState } from "react";
import { easyWords, averageWords, hardWords } from "../words.js";

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TrainingArena({
  userName = "Player",
  avatar = "🐝",
  mode = "easy",
  maxQuestions = 10,
  onRestart,
  onBackToHome,
}) {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [seconds, setSeconds] = useState(10);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  const timerRef = useRef(null);
  const bgRef = useRef(null);
  const correctRef = useRef(null);
  const wrongRef = useRef(null);

  // initialize audio
  useEffect(() => {
    bgRef.current = new Audio("/bg.mp3");
    bgRef.current.loop = true;
    bgRef.current.volume = 0.5;

    correctRef.current = new Audio("/correct.mp3");
    wrongRef.current = new Audio("/wrong.mp3");

    return () => {
      window.speechSynthesis.cancel();
      if (bgRef.current) bgRef.current.pause();
    };
  }, []);

  // setup words when mode/maxQuestions changes
  useEffect(() => {
    let source =
      mode === "easy" ? easyWords : mode === "average" ? averageWords : hardWords;
    if (!Array.isArray(source)) source = [];
    const shuffled = shuffleArray(source);
    const take = Math.max(1, Math.min(maxQuestions || 10, shuffled.length));
    setWords(shuffled.slice(0, take));
    setIndex(0);
    setScore(0);
    setTyped("");
    setFeedback("");
    setSeconds(10);
  }, [mode, maxQuestions]);

  // start bg music
  useEffect(() => {
    if (bgRef.current) {
      bgRef.current.play().catch(() => {});
    }
  }, []);

  // when index changes → pronounce + start timer
  useEffect(() => {
    if (!words || words.length === 0) return;
    if (index >= words.length) {
      setRunning(false);
      return;
    }
    setTyped("");
    setFeedback("");
    setSeconds(10);
    pronounce(words[index]);

    setRunning(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused) {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current);
            handleAnswer("", true);
            return 0;
          }
          return s - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, index, paused]);

  // pronounce current word (Indian accent)
  const pronounce = (entry) => {
    if (!entry) return;
    try {
      if (bgRef.current) bgRef.current.volume = 0.08;
    } catch (e) {}

    try {
      const u = new SpeechSynthesisUtterance(entry.word);
      u.lang = "en-IN"; // Indian English accent
      u.rate = 0.95;
      u.pitch = 1;
      u.onend = () => {
        if (bgRef.current) bgRef.current.volume = 0.5;
      };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) {
      if (bgRef.current) bgRef.current.volume = 0.5;
    }
  };

  const motivational = () => {
    const msgs = [
      `Well done ${userName}! Keep it up!`,
      `Great job ${userName}! 👍`,
      `Awesome ${userName}! You're doing great!`,
      `${userName}, brilliant! Next one!`,
      `Nice work ${userName}!`,
    ];
    return msgs[Math.floor(Math.random() * msgs.length)];
  };

  const handleAnswer = (typedValue, timedOut = false) => {
    if (!words || index >= words.length) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setRunning(false);

    const correctWord = (words[index].word || "").toLowerCase().trim();
    const userAns = (typedValue || typed || "").toLowerCase().trim();

    const isCorrect = userAns === correctWord && !timedOut && userAns !== "";

    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback(motivational());
      correctRef.current && correctRef.current.play().catch(() => {});
    } else {
      setFeedback(`Oops! Correct: ${correctWord}`);
      wrongRef.current && wrongRef.current.play().catch(() => {});
    }

    setTimeout(() => {
      setFeedback("");
      setIndex((i) => i + 1);
    }, 1400);
  };

  const toggleMusic = () => {
    if (!bgRef.current) return;
    if (bgRef.current.paused) bgRef.current.play().catch(() => {});
    else bgRef.current.pause();
  };

  const togglePause = () => {
    setPaused(!paused);
  };

  const computeGrade = () => {
    const total = words.length || 1;
    const pct = Math.round((score / total) * 100);
    if (pct >= 80) return { grade: "A", pct };
    if (pct >= 60) return { grade: "B", pct };
    if (pct >= 40) return { grade: "C", pct };
    return { grade: "D", pct };
  };

  if (!words || words.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-lg">Preparing words...</p>
      </div>
    );
  }

  if (index >= words.length) {
    const g = computeGrade();
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-center">
          <div className="text-6xl mb-4">{avatar}</div>
          <h2 className="text-3xl font-bold mb-2">Well done, {userName} 🎉</h2>
          <p className="text-xl mb-2">
            Score: {score} / {words.length}
          </p>
          <p className="text-lg mb-4">
            Grade: <strong>{g.grade}</strong> ({g.pct}%)
          </p>
          <div className="text-6xl mb-4 animate-bounce">
            {g.pct >= 60 ? "👍" : "✨"}
          </div>
          <button
            onClick={onRestart}
            className="px-6 py-2 rounded-full bg-blue-600 text-white mb-2"
          >
            Play Again
          </button>
          <button
            onClick={onBackToHome}
            className="px-6 py-2 rounded-full bg-gray-400 text-white"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const entry = words[index];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-start p-6 text-center">
      <div className="w-full max-w-xl flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-4xl">{avatar}</span>
          <span className="font-bold text-white text-lg">{userName}</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleMusic} className="px-3 py-1 rounded bg-gray-200">
            🎵
          </button>
          <button onClick={onBackToHome} className="px-3 py-1 rounded bg-gray-200">
            ⬅
          </button>
        </div>
      </div>

      <div className="w-full max-w-xl mb-4">
        <div className="text-sm mb-2">
          Progress: {index + 1} / {words.length}
        </div>
        <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-3 bg-green-400"
            style={{ width: `${(index / words.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white/80 max-w-xl w-full rounded-xl p-6 shadow-md mb-4">
        <div className="mb-2 text-sm text-gray-600">
          Listen & Type (Meaning shown):
        </div>
        <div className="text-2xl font-semibold mb-4">{entry.hindi}</div>

        <div className="flex flex-col items-center">
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAnswer(typed);
            }}
            className="w-full max-w-md p-3 border rounded-lg text-center mb-3"
            placeholder="Type the word you hear (in English)"
            autoFocus
          />

          <div className="flex gap-3">
            <button
              onClick={() => handleAnswer(typed)}
              className="px-4 py-2 bg-green-500 text-white rounded-full"
            >
              Submit
            </button>
            <button
             
