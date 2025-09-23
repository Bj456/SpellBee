import React, { useState } from "react";

const avatars = ["🐝", "🦋", "🦄", "🐱"]; // simple animated avatars / emojis

function UserInfo({ onContinue }) {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const handleContinue = () => {
    if (!name) return alert("Please enter your name!");
    onContinue({ name, avatar: selectedAvatar });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 p-6">
      <h2 className="text-3xl font-bold mb-4">Enter your name</h2>
      <input
        type="text"
        placeholder="Your Name"
        className="p-2 mb-4 border rounded w-64 text-center"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h3 className="text-xl font-semibold mb-2">Choose your avatar</h3>
      <div className="flex gap-4 mb-6">
        {avatars.map((a) => (
          <div
            key={a}
            className={`text-5xl cursor-pointer transform transition-transform hover:scale-125 ${
              selectedAvatar === a ? "ring-4 ring-green-400 rounded-full" : ""
            }`}
            onClick={() => setSelectedAvatar(a)}
          >
            {a}
          </div>
        ))}
      </div>

      <button
        onClick={handleContinue}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
      >
        ✅ Continue
      </button>
    </div>
  );
}

export default UserInfo;
