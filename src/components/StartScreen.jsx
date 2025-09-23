import React from "react";

function StartScreen({ onStart, musicOn, toggleMusic, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-4 animate-bounce">🐝 SpellBee Trainer 🐝</h1>
      <p className="text-center mb-6 text-lg">Practice your spellings in a fun and interactive way!</p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded font-bold"
        >
          ⬅ Back
        </button>
        <button
          onClick={toggleMusic}
          className={`px-4 py-2 rounded font-bold ${musicOn ? "bg-green-500 text-white" : "bg-gray-300"}`}
        >
          🎵 {musicOn ? "Music On" : "Music Off"}
        </button>
      </div>

      <button
        onClick={onStart}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg animate-pulse"
      >
        ✅ Play
      </button>
    </div>
  );
}

export default StartScreen;
