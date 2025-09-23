import React, { useEffect, useState, useRef } from "react";
import { easyWords, averageWords, hardWords } from "../words.js";

function TrainingArena({ userName, avatar, mode, onRestart }) {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [musicOn, setMusicOn] = useState(true);
  const timerRef = useRef(null);

  const bgMusic = useRef(new Audio("/bg.mp3"));
  const correctSound = new Audio("/correct.mp3");
  const wrongSound = new Audio("/wrong.mp3");

  useEffect(() => {
    if (mode === "easy") setWords(easyWords.slice(0, 10));
    else if (mode === "average") setWords(averageWords.slice(0, 10));
    else setWords(hardWords.slice(0, 10));

    if (musicOn) bgMusic.current.play();
    else bgMusic.current.pause();

    return () => bgMusic.current.pause();
  }, []);

  useEffect(() => {
    startWord();
  }, [words]);

  const startWord = () => {
    if (currentIndex >= words.length) return;

    speakWord(words[currentIndex]);
    startTimer();
  };

  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleSubmit(""); // timeout → treat as wrong
    }, 10000);
  };

  const speakWord = (word) => {
    const msg = new SpeechSynthesisUtterance(word);
    msg.lang = "en-IN";
    window.speechSynthesis.speak(msg);
  };

  const handleSubmit = (typed) => {
    clearTimeout(timerRef.current);

    const correct = typed.toLowerCase() === words[currentIndex].toLowerCase();
    if (correct) {
      setScore(score + 1);
      setFeedback("Correct! 👍");
      correctSound.play();
    } else {
      setFeedback(`Wrong! ❌ Correct: ${words[currentIndex]}`);
      wrongSound.play();
    }

    setInput("");
    setTimeout(() => {
      setFeedback("");
      setCurrentIndex(currentIndex + 1);
      if (currentIndex + 1 < words.length) speakWord(words[currentIndex + 1]);
    }, 1500);
  };

  if (currentIndex >= words.length) {
    return (
      <div className="text-center p-5">
        <h2 className="text-2xl font-bold mb-4">🎉 Test Completed!</h2>
        <p>{userName} {avatar}</p>
        <p>Score: {score} / {words.length}</p>
        <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={onRestart}>Restart</button>
      </div>
    );
  }

  return (
    <div className="text-center p-5">
      <button onClick={() => { bgMusic.current.pause(); setMusicOn(false); }} className="m-2 p-1 bg-gray-300 rounded">Music Off</button>
      <button onClick={() => { bgMusic.current.play(); setMusicOn(true); }} className="m-2 p-1 bg-gray-300 rounded">Music On</button>
      <button onClick={onRestart} className="m-2 p-1 bg-gray-300 rounded">⬅ Back</button>

      <h2 className="text-xl font-bold mt-4">Word #{currentIndex + 1}</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type the word you hear"
        className="border p-2 mt-2"
      />
      <br />
      <button
        onClick={() => handleSubmit(input)}
        className="bg-green-500 text-white p-2 mt-2 rounded"
      >
        Submit
      </button>

      {feedback && <p className="mt-4 text-lg">{feedback}</p>}
    </div>
  );
}

export default TrainingArena;
