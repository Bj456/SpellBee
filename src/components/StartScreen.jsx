// src/components/StartScreen.jsx
import React, { useEffect, useState } from "react";

export default function StartScreen({ onStart }) {
  const [vibrate, setVibrate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVibrate((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <h1
        className={`text-5xl font-bold mb-4 flex justify-center items-center ${
          vibrate ? "animate-bounce text-yellow-600" : "text-purple-700"
        }`}
      >
        <span className="animate-bounce mr-2">🐝</span>
        SpellBee Trainer
        <span className="animate-bounce ml-2">🐝</span>
      </h1>
      <p className="mb-6 text-lg">Practice your spellings in a fun and interactive way!</p>
      <button
        className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-800 transition"
        onClick={onStart}
      >
        Get Enter → Play
      </button>
    </div>
  );
}
