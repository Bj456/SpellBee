import { useState } from "react";

export default function StartScreen({ setScreen, setUserName, setAvatar }) {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🐝");

  const avatars = ["🐝", "🦋", "🐞", "🦄", "🐱"];

  const handleEnter = () => {
    if (!name) return alert("Please enter your name!");
    setUserName(name);
    setAvatar(selectedAvatar);
    setScreen("mode");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center p-4 space-y-6">
      <h1 className="text-4xl font-bold mb-2 flex justify-center">
        <span className="animate-bounce">🐝</span> SpellBee Trainer{" "}
        <span className="animate-bounce">🐝</span>
      </h1>
      <p className="text-lg">Practice your spellings in a fun and interactive way!</p>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-400 rounded px-3 py-2 text-center"
        />

        <div className="flex justify-center space-x-4 text-3xl">
          {avatars.map((av) => (
            <span
              key={av}
              className={`cursor-pointer ${selectedAvatar === av ? "scale-125" : ""}`}
              onClick={() => setSelectedAvatar(av)}
            >
              {av}
            </span>
          ))}
        </div>

        <button
          onClick={handleEnter}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Get Enter → Play
        </button>
      </div>
    </div>
  );
}
