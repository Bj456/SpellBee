import React, { useState, useEffect, useRef } from "react";

const wordsToSpell = [
  "lake", "wave", "speed", "cheese", "rain",
  "now", "rest", "cube", "thank", "sheep",
  "fix", "dine", "stone", "sorry", "broom",
  "thumb", "hide", "seed", "girl", "red",
  "fresh", "need", "bone", "rose", "shed"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    [array[counter], array[index]] = [array[index], array[counter]];
  }
  return array;
}

function TrainingArena({ speech, setSpeech }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [currentWrong, setCurrentWrong] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [wordsAttempted, setWordsAttempted] = useState([]);
  const [trainingStarted, setTrainingStarted] = useState(false);

  const inputRef = useRef();

  const words = shuffle([...wordsToSpell]);

  const currentWord = words[currentWordIndex];

  const handleStart = () => {
    setTrainingStarted(true);
    speakWord();
  };

  const speakWord = () => {
    if (speech) {
      speech.speak({
        text: currentWord,
        queue: false
      });
    }
  };

  const handleSubmit = () => {
    let correct = inputValue.trim().toLowerCase() === currentWord.toLowerCase();
    if (correct) {
      setScore(prev => prev + 10 - currentWrong * 2 > 0 ? 10 - currentWrong * 2 : 1);
    } else {
      setCurrentWrong(prev => prev + 1);
    }

    setWordsAttempted(prev => [
      ...prev,
      { word: currentWord, correct }
    ]);

    if (currentWrong > 0 && !correct) setTotalWrong(prev => prev + 1);

    // Reset for next word
    setInputValue("");
    setCurrentWrong(0);
    setCurrentWordIndex(prev => (prev + 1) % words.length);

    // Speak next word
    setTimeout(() => {
      if (currentWordIndex + 1 < words.length) {
        speakWord();
        inputRef.current.focus();
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
      {!trainingStarted && (
        <button
          onClick={handleStart}
          className="w-full py-2 mb-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
        >
          🏁 Start Training
        </button>
      )}

      {trainingStarted && (
        <>
          <div className="mb-4 text-center text-xl font-semibold">
            Spell the word:
            <div className="text-purple-700 font-bold text-2xl mt-2">{currentWord}</div>
          </div>

          <input
            ref={inputRef}
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Type the word here"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
          />

          <button
            onClick={handleSubmit}
            className="w-full py-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
          >
            ✅ Submit Answer
          </button>

          <div className="flex justify-between mb-2">
            <button className="px-3 py-1 bg-purple-500 text-white rounded">Score: {score}</button>
            <button className="px-3 py-1 bg-yellow-500 text-white rounded">Wrong: {currentWrong}</button>
            <button className="px-3 py-1 bg-red-500 text-white rounded">Total Wrong: {totalWrong}</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TrainingArena;
