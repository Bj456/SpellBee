import React, { useState, useRef } from "react";

function App() {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicOn(!musicOn);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 p-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 animate-bounce mb-6">
        🐝 Welcome to SpellBee! 🐝
      </h1>

      <div className="flex flex-wrap gap-3 justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
          ⬅ Back
        </button>
        <button
          onClick={toggleMusic}
          className={`px-4 py-2 rounded-lg shadow-md transition ${
            musicOn
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {musicOn ? "🔇 Music Off" : "🎵 Music On"}
        </button>
      </div>

      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/bg.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
