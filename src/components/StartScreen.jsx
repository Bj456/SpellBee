import React, { useState } from "react";

function StartScreen({ onNext }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🐝");

  return (
    <div className="text-center p-5">
      <h1 className="text-3xl font-bold mb-4">🐝 SpellBee Trainer 🐝</h1>
      <p className="mb-4">Practice your spellings in a fun and interactive way!</p>

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-4"
      />
      <br />

      <label className="mr-2">Choose Avatar:</label>
      <select value={avatar} onChange={(e) => setAvatar(e.target.value)}>
        <option>🐝</option>
        <option>🦄</option>
        <option>🦋</option>
        <option>🐶</option>
      </select>
      <br /><br />

      <button
        className="bg-green-500 p-2 text-white rounded"
        onClick={() => onNext(name || "Player", avatar)}
      >
        Get Enter → Play
      </button>
    </div>
  );
}

export default StartScreen;
