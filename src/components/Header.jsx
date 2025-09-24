export default function Header({ screen, setScreen, musicOn, setMusicOn }) {
  return (
    <div className="flex justify-between items-center p-4 bg-purple-100 shadow-md">
      {screen !== "start" && (
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          onClick={() => setScreen("start")}
        >
          ⬅ Back
        </button>
      )}

      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        onClick={() => setMusicOn(!musicOn)}
      >
        {musicOn ? "🎵 Music On" : "🎵 Music Off"}
      </button>
    </div>
  );
}
