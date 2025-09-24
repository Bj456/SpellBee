// src/components/StartScreen.jsx
import React, { useState } from "react";

const avatars = ["🐝", "🐶", "🐱", "🐯", "🐵", "🐸", "🐼", "🦁"];

const StartScreen = ({ onStart }) => {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name, selectedAvatar);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 animate-gradient-x">
      {/* Title with vibrating bees */}
      <h1 className="text-5xl font-bold mb-2 flex justify-center items-center gap-2">
        <span className="animate-bounce">🐝</span>
        <span className="text-purple-700">SpellBee Trainer</span>
        <span className="animate-bounce">🐝</span>
      </h1>

      <p className="text-lg text-gray-700 mb-6 text-center">
        Practice your spellings in a fun and interactive way!
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
        <label className="block mb-2 font-semibold">Enter Your Name</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-purple-400 text-center"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Avatar Selection */}
        <label className="block mb-2 font-semibold">Choose Avatar:</label>
        <div className="flex justify-center flex-wrap gap-3 mb-4">
          {avatars.map((avatar, index) => (
            <button
              type="button"
              key={index}
              className={`text-3xl p-2 rounded-full transition transform hover:scale-125 ${
                selectedAvatar === avatar
                  ? "ring-4 ring-yellow-400 bg-yellow-100"
                  : "bg-gray-100"
              }`}
              onClick={() => setSelectedAvatar(avatar)}
            >
              {avatar}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
        >
          Get Enter → Play
        </button>
      </form>
    </div>
  );
};

export default StartScreen;
