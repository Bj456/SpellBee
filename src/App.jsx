import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import ModeSelection from "./components/ModeSelection";
import TrainingArena from "./components/TrainingArena";
import UserInfo from "./components/UserInfo";


function App() {
  const [screen, setScreen] = useState("start"); // start / mode / training
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("🐝");
  const [musicOn, setMusicOn] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200">
      <Header
        screen={screen}
        setScreen={setScreen}
        musicOn={musicOn}
        setMusicOn={setMusicOn}
      />

      {screen === "start" && (
        <StartScreen
          setScreen={setScreen}
          setUserName={setUserName}
          setAvatar={setAvatar}
        />
      )}

      {screen === "mode" && (
        <ModeSelection setScreen={setScreen} />
      )}

      {screen === "training" && (
        <TrainingArena userName={userName} avatar={avatar} musicOn={musicOn} />
      )}
    </div>
  );
}

export default App;
