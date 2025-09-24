import React, { useState } from "react";

function ModeSelection({ onSelectMode, onBack }) {
  const [selectedMode, setSelectedMode] = useState("easy");
  const [questions, setQuestions] = useState(10);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Select Mode</h2>

      <div className="flex space-x-4 mb-6">
        {["easy", "average", "hard"].map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`px-4 py-2 rounded-full text-white font-bold ${
              selectedMode === mode ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Max Questions */}
      <label className="text-lg font-semibold mb-2">Maximum Questions:</label>
      <input
        type="number"
        min="5"
        max="50"
        value={questions}
        onChange={(e) => setQuestions(Number(e.target.value))}
        className="border rounded p-2 mb-6 text-center"
      />

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => onSelectMode(selectedMode, questions)}
          className="px-6 py-2 bg-blue-500 text-white rounded-full font-bold hover:scale-105 transition"
        >
          Start Training
        </button>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:scale-105 transition"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default ModeSelection;
