import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.load();
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) audioRef.current.pause();
    else audioRef.current.play().catch((err) => console.log(err));
    setMusicOn(!musicOn);
  };

  const handleBack = () => {
    alert("Back button clicked! (Later we will add navigation)");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 p-4">
      <Header
        onBack={handleBack}
        onToggleMusic={toggleMusic}
        musicOn={musicOn}
      />

      <audio ref={audioRef} loop style={{ display: "none" }}>
        <source src="/bg.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default App;
