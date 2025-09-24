import React, { useState } from "react";

function StartScreen({ setCurrentScreen, setPlayerName, setAvatar }) {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleEnter = () => {
    if (name.trim() !== "") {
      setPlayerName(name);
      setAvatar(selectedAvatar);
      setCurrentScreen("mode");
    }
  };

  const avatars = ["🐝", "🦋", "🦁", "🐶", "🐱"]; // example avatars

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
      <h1 className="text-5xl font-bold mb-2">
        <span className="animate-bounce">🐝</span> SpellBee Trainer{" "}
        <span className="animate-bounce">🐝</span>
      </h1>
      <p className="text-xl mb-4">Practice your spellings in a fun way!</p>

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 px-3 py-2 rounded text-lg"
      />

      <div className="flex gap-4 mb-4 justify-center">
        {avatars.map((av) => (
          <span
            key={av}
            className={`text-4xl cursor-pointer ${
              selectedAvatar === av ? "scale-125" : ""
            }`}
            onClick={() => setSelectedAvatar(av)}
          >
            {av}
          </span>
        ))}
      </div>

      <button
        onClick={handleEnter}
        className="px-6 py-2 bg-yellow-400 rounded-lg font-bold hover:bg-yellow-500 transition"
      >
        Get Enter → Play
      </button>
    </div>
  );
}

export default StartScreen;
