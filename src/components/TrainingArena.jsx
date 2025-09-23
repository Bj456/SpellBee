import React, { useEffect, useState, useRef } from "react";
import { easyWords, averageWords, hardWords } from "../words"; // aap ye file bana ke words array export karenge

function TrainingArena({ user, mode, onBack, playCorrect, playWrong, musicOn, toggleMusic }) {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(""); // Correct / Wrong feedback
  const [timer, setTimer] = useState(10);
  const timerRef = useRef(null);

  const speechRef = useRef(window.speechSynthesis);

  useEffect(() => {
    // Pick 10 random words based on mode
    let source = [];
    if (mode === "easy") source = easyWords;
    else if (mode === "average") source = averageWords;
    else source = hardWords;

    let shuffled = [...source].sort(() => Math.random() - 0.5).slice(0, 10);
    setWords(shuffled);
  }, [mode]);

  useEffect(() => {
    if (words.length === 0 || currentIndex >= words.length) return;

    setInput("");
    setFeedback("");
    setTimer(10);
    pronounceWord(words[currentIndex]);

    // Timer countdown
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(); // auto submit on timer end
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [words, currentIndex]);

  const pronounceWord = (word) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-IN"; // Indian English
    speechSynthesis.speak(utterance);
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);

    const currentWord = words[currentIndex];
    if (input.trim().toLowerCase() === currentWord.toLowerCase()) {
      setScore(prev => prev + 1);
      setFeedback(`✅ Correct!`);
      playCorrect();
    } else {
      setFeedback(`❌ Wrong! Correct: ${currentWord}`);
      playWrong();
    }

    // Next word after short delay
    setTimeout(() => {
      if (currentIndex + 1 < words.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setFeedback(`🏁 Round Finished! Your score: ${score + (input.trim().toLowerCase() === currentWord.toLowerCase() ? 1 : 0)}/${words.length}`);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 p-6">
      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded font-bold"
          onClick={onBack}
        >
          ⬅ Back
        </button>
        <button
          className={`px-4 py-2 rounded font-bold ${musicOn ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={toggleMusic}
        >
          🎵 {musicOn ? "Music On" : "Music Off"}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2">
        Hello, {user?.name} {user?.avatar}
      </h2>

      {currentIndex < words.length ? (
        <>
          <p className="text-lg mb-2">Time: {timer}s</p>
          <input
            type="text"
            className="p-2 mb-2 border rounded w-64 text-center"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            autoFocus
          />
          <p className="text-xl font-semibold text-center">{feedback}</p>
          <p className="mt-2">Progress: {currentIndex + 1}/{words.length}</p>
        </>
      ) : (
        <p className="text-xl font-bold text-center">{feedback}</p>
      )}

      <p className="mt-4 text-sm text-center">
        Sound Effects by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=88784" target="_blank" rel="noopener noreferrer">freesound_community</a> from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=88784" target="_blank" rel="noopener noreferrer">Pixabay</a>
      </p>
    </div>
  );
}

export default TrainingArena;
