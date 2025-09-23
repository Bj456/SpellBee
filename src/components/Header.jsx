import React from "react";

function Header({ onBack, onToggleMusic, musicOn }) {
  return (
    <div className="w-full text-center mb-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 animate-bounce mb-3">
        🐝 SpellBee Trainer 🐝
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Practice your spellings in a fun and interactive way!
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          ⬅ Back
        </button>

        <button
          onClick={onToggleMusic}
          className={`px-4 py-2 rounded-lg shadow-md transition ${
            musicOn
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {musicOn ? "🔇 Music Off" : "🎵 Music On"}
        </button>
      </div>
    </div>
  );
}

export default Header;
