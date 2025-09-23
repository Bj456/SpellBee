import React, { useState, useRef } from "react";
import StartScreen from "./components/StartScreen";
import UserInfo from "./components/UserInfo";
import TrainingArena from "./components/TrainingArena";

function App() {
  const [stage, setStage] = useState("start"); // start, userInfo, modeSelection/training
  const [musicOn, setMusicOn] = useState(false);
  const [user, setUser] = useState(null);

  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) audioRef.current.pause();
    else audioRef.current.play().catch((err) => console.log(err));
    setMusicOn(!musicOn);
  };

  const handleBack = () => {
    alert("Back clicked!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      {stage === "start" && (
        <StartScreen
          onStart={() => setStage("userInfo")}
          musicOn={musicOn}
          toggleMusic={toggleMusic}
          onBack={handleBack}
        />
      )}

      {stage === "userInfo" && (
        <UserInfo
          onContinue={(userData) => {
            setUser(userData);
            setStage("training");
          }}
        />
      )}

      {stage === "training" && <TrainingArena user={user} />}
      
      <audio ref={audioRef} loop style={{ display: "none" }}>
        <source src="/bg.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default App;
