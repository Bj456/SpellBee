// src/components/App.jsx
import React, { useState } from "react";
import StartScreen from "./StartScreen";
import ModeSelection from "./ModeSelection";
import TrainingArena from "./TrainingArena";
import UserInfo from "./UserInfo";
import Header from "./Header";

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
