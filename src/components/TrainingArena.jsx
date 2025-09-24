// src/components/TrainingArena.jsx
import React, { useState, useEffect, useRef } from "react";
import { easyWords, averageWords, hardWords } from "../words";

const TrainingArena = ({ playerName, avatar, mode, totalQuestions, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [wordsList, setWordsList] = useState([]);
  const [message, setMessage] = useState("");
  const [dictationWord, setDictationWord] = useState(null);

  const correctAudio = useRef(new Audio("/correct.mp3"));
  const wrongAudio = useRef(new Audio("/wrong.mp3"));
  const dictationAudio = useRef(new Audio());
  const timerRef = useRef(null);

  useEffect(() => {
    // generate words list based on mode
    let selectedWords = [];
    if (mode === "Easy") selectedWords = [...easyWords];
    else if (mode === "Average") selectedWords = [...averageWords];
    else selectedWords = [...hardWords];

    // shuffle and pick required number of questions
    selectedWords = selectedWords.sort(() => 0.5 - Math.random());
    setWordsList(selectedWords.slice(0, totalQuestions));
    setCurrentIndex(0);
  }, [mode, totalQuestions]);

  useEffect(() => {
    if (wordsList.length > 0 && currentIndex < wordsList.length) {
      playDictation(wordsList[currentIndex]);
    }
  }, [wordsList, currentIndex]);

  const playDictation = (word) => {
    clearTimeout(timerRef.current);
    setDictationWord(word);
    dictationAudio.current.src = `https://translate.google.com/translate_tts?ie=UTF-8&q=${word}&tl=en-IN&client=tw-ob`;
    dictationAudio.current.play();
    timerRef.current = setTimeout(() => {
      nextWord();
    }, 10000); // auto next after 10 sec
  };

  const checkAnswer = () => {
    if (inputValue.trim().toLowerCase() === dictationWord.toLowerCase()) {
      setScore(score + 1);
      correctAudio.current.play();
      setMessage(`Well done, ${playerName}!`);
    } else {
      setWrong(wrong + 1);
      wrongAudio.current.play();
      setMessage(`Oops! Correct answer: ${dictationWord}`);
    }
    setInputValue("");
    nextWord();
  };

  const nextWord = () => {
    clearTimeout(timerRef.current);
    if (currentIndex + 1 < wordsList.length) setCurrentIndex(currentIndex + 1);
    else setDictationWord(null); // end
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="flex justify-between items-center mb-4">
        <button className="btn btn-secondary" onClick={onBack}>
          ⬅ Back
        </button>
        <div>
          <span>{avatar} {playerName}</span>
        </div>
        <button className="btn btn-secondary" onClick={() => {}}>
          🎵 Music On/Off
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2">
        {dictationWord ? "Listen & Type the Word" : "Training Completed!"}
      </h2>

      {dictationWord && (
        <>
          <input
            type="text"
            className="border p-2 mb-2 text-center"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type the word here"
          />
          <br />
          <button className="btn btn-primary" onClick={checkAnswer}>
            Submit
          </button>
        </>
      )}

      <div className="mt-4">
        <p>Score: {score}</p>
        <p>Wrong: {wrong}</p>
        <p className="mt-2 font-semibold text-blue-600">{message}</p>
      </div>

      {!dictationWord && (
        <button
          className="btn btn-success mt-4"
          onClick={() => setCurrentIndex(0)}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default TrainingArena;
