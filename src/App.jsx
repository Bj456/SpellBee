// src/components/App.jsx
// src/App.jsx
import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import ModeSelection from "./components/ModeSelection";
import TrainingArena from "./components/TrainingArena";
import UserInfo from "./components/UserInfo";
import Header from "./components/Header";
export default function App() {
  const [stage, setStage] = useState("start"); // start → user → mode → arena
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [mode, setMode] = useState("");
  const [questionCount, setQuestionCount] = useState(5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <Header />

      {stage === "start" && (
        <StartScreen onStart={() => setStage("user")} />
      )}

      {stage === "user" && (
        <UserInfo
          onSubmit={(name, avatar) => {
            setUserName(name);
            setAvatar(avatar);
            setStage("mode");
          }}
        />
      )}

      {stage === "mode" && (
        <ModeSelection
          onSelectMode={(selectedMode, count) => {
            setMode(selectedMode);
            setQuestionCount(count);
            setStage("arena");
          }}
          onBack={() => setStage("start")}
        />
      )}

      {stage === "arena" && (
        <TrainingArena
          mode={mode}
          questionCount={questionCount}
          userName={userName}
          avatar={avatar}
          onBack={() => setStage("mode")}
        />
      )}
    </div>
  );
}
