import React, { useState } from "react";

function ModeSelection({ setCurrentScreen, mode, setMode, maxQuestions, setMaxQuestions }) {
  const [inputQuestions, setInputQuestions] = useState(maxQuestions);

  const handleStart = () => {
    setMaxQuestions(inputQuestions);
    setCurrentScreen("training");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h2 className="text-4xl font-bold mb-2 flex justify-center">
        <span className="animate-bounce mr-2">🐝</span>SpellBee Trainer
        <span className="animate-bounce ml-2">🐝</span>
      </h2>

      <h3 className="text-2xl mb-4">Select Mode</h3>

      <div className="flex gap-4 mb-4">
        {["easy", "average", "hard"].map((m) => (
          <button
            key={m}
            className={`px-4 py-2 rounded font-bold ${
              mode === m ? "bg-green-400" : "bg-gray-300"
            }`}
            onClick={() => setMode(m)}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <input
        type="number"
        min="1"
        max="50"
        value={inputQuestions}
        onChange={(e) => setInputQuestions(Number(e.target.value))}
        className="mb-4 px-3 py-2 rounded text-lg"
      />

      <button
        onClick={handleStart}
        className="px-6 py-2 bg-blue-400 rounded-lg font-bold hover:bg-blue-500 transition"
      >
        Start
      </button>

      <button
        onClick={() => setCurrentScreen("start")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        Back
      </button>
    </div>
  );
}

export default ModeSelection;
