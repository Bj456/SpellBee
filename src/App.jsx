import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import ModeSelection from "./components/ModeSelection";
import TrainingArena from "./components/TrainingArena";

function App() {
  const [page, setPage] = useState("start");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [mode, setMode] = useState("easy");

  return (
    <>
      {page === "start" && (
        <StartScreen
          onNext={(name, avatarChoice) => {
            setUserName(name);
            setAvatar(avatarChoice);
            setPage("mode");
          }}
        />
      )}
      {page === "mode" && (
        <ModeSelection
          onSelectMode={(selectedMode) => {
            setMode(selectedMode);
            setPage("training");
          }}
        />
      )}
      {page === "training" && (
        <TrainingArena
          userName={userName}
          avatar={avatar}
          mode={mode}
          onRestart={() => setPage("start")}
        />
      )}
    </>
  );
}

export default App;
