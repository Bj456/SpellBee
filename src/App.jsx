import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import TrainingArena from "./components/TrainingArena";

function App() {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  // Optional: speech instance if you integrate TTS later
  const [speech, setSpeech] = useState(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.load();
  }, []);

  // Music toggle function
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) audioRef.current.pause();
    else audioRef.current.play().catch((err) => console.log(err));
    setMusicOn(!musicOn);
  };

  // Back button action
  const handleBack = () => {
    alert("Back clicked! (Later we can add navigation to previous screen)");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 p-4">
      {/* Header Component */}
      <Header onBack={handleBack} onToggleMusic={toggleMusic} musicOn={musicOn} />

      {/* Training Arena */}
      <TrainingArena speech={speech} setSpeech={setSpeech} />

      {/* Background Music */}
      <audio ref={audioRef} loop style={{ display: "none" }}>
        <source src="/bg.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
