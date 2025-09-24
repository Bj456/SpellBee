import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import ModeSelection from "./components/ModeSelection";
import TrainingArena from "./components/TrainingArena";

function App() {
  const [page, setPage] = useState("start");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("🐝");
  const [mode, setMode] = useState("easy");
  const [maxQuestions, setMaxQuestions] = useState(10);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center">
      {page === "start" && (
        <StartScreen
          onNext={(name, avatarChoice) => {
            setUserName(name);
            setAvatar(avatarChoice);
            setPage("mode");
          }}
          avatar={avatar}
          setAvatar={setAvatar}
          setUserName={setUserName}
          userName={userName}
        />
      )}

      {page === "mode" && (
        <ModeSelection
          onSelectMode={(selectedMode, selectedQuestions) => {
            setMode(selectedMode);
            setMaxQuestions(selectedQuestions);
            setPage("training");
          }}
          onBack={() => setPage("start")}
        />
      )}

      {page === "training" && (
        <TrainingArena
          userName={userName}
          avatar={avatar}
          mode={mode}
          maxQuestions={maxQuestions}
          onRestart={() => setPage("start")}
        />
      )}
    </div>
  );
}

export default App;
