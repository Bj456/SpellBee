import React, { useState } from "react"; 
import StartScreen from "./components/StartScreen";
import ModeSelection from "./components/ModeSelection";
import TrainingArena from "./components/TrainingArena";
import UserInfo from "./components/UserInfo";

function App() {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [playerName, setPlayerName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [mode, setMode] = useState("easy");
  const [maxQuestions, setMaxQuestions] = useState(5);

  return (
    <div className="App">
      {currentScreen === "start" && (
        <StartScreen
          setCurrentScreen={setCurrentScreen}
          setPlayerName={setPlayerName}
          setAvatar={setAvatar}
        />
      )}
      {currentScreen === "mode" && (
        <ModeSelection
          setCurrentScreen={setCurrentScreen}
          mode={mode}
          setMode={setMode}
          maxQuestions={maxQuestions}
          setMaxQuestions={setMaxQuestions}
        />
      )}
      {currentScreen === "training" && (
        <TrainingArena
          userName={playerName}                  // updated
          avatar={avatar}
          mode={mode}
          maxQuestions={maxQuestions}
          onRestart={() => setCurrentScreen("mode")}  // Play Again
          onBackToHome={() => setCurrentScreen("start")} // Back to Home
        />
      )}
      {currentScreen === "userinfo" && (
        <UserInfo
          playerName={playerName}
          avatar={avatar}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </div>
  );
}

export default App;
