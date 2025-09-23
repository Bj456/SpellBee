import React from "react";

function ModeSelection({ onSelectMode, onBack, musicOn, toggleMusic }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-yellow-200 to-pink-200 p-6">
      <h2 className="text-3xl font-bold mb-6 animate-bounce">Select Mode</h2>

      <div className="flex gap-4 mb-6">
        <button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold"
          onClick={() => onSelectMode("easy")}
        >
          Easy
        </button>
        <button
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold"
          onClick={() => onSelectMode("average")}
        >
          Average
        </button>
        <button
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold"
          onClick={() => onSelectMode("hard")}
        >
          Hard
        </button>
      </div>

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded font-bold"
          onClick={onBack}
        >
          ⬅ Back
        </button>
        <button
          className={`px-4 py-2 rounded font-bold ${musicOn ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={toggleMusic}
        >
          🎵 {musicOn ? "Music On" : "Music Off"}
        </button>
      </div>
    </div>
  );
}

export default ModeSelection;
