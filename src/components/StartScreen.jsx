import React, { useState, useEffect } from "react";

function StartScreen({ onNext, avatar, setAvatar, setUserName, userName }) {
  const avatars = ["🐝", "🐼", "🦁", "🐸", "🐧"];

  // Vibration effect for heading
  const [vibrate, setVibrate] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setVibrate((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <h1
        className={`text-4xl font-bold mb-2 ${
          vibrate ? "animate-bounce text-yellow-600" : "text-purple-700"
        }`}
      >
        🐝 SpellBee Trainer 🐝
      </h1>
      <p className="text-lg mb-6 text-gray-800">
        Practice your spellings in a fun and interactive way!
      </p>

      {/* Name Input */}
      <label className="text-lg font-semibold mb-2">Enter Your Name</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="border rounded p-2 mb-4 text-center"
        placeholder="Your Name"
      />

      {/* Avatar Selection */}
      <label className="text-lg font-semibold mb-2">Choose Avatar:</label>
      <div className="flex flex-row space-x-4 mb-6">
        {avatars.map((av) => (
          <button
            key={av}
            onClick={() => setAvatar(av)}
            className={`text-3xl p-2 rounded-full ${
              avatar === av ? "bg-yellow-300" : "bg-white"
            } hover:scale-110 transition`}
          >
            {av}
          </button>
        ))}
      </div>

      {/* Get Enter */}
      <button
        onClick={() => {
          if (userName.trim() !== "") onNext(userName, avatar);
        }}
        className="px-6 py-2 text-lg font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full animate-bounce"
      >
        Get Enter → Play
      </button>
    </div>
  );
}

export default StartScreen;
