import React, { useState, useEffect, useRef } from "react";

const wordsToSpell = [
  "lake","wave","speed","cheese","rain",
  "now","rest","cube","thank","sheep",
  "fix","dine","stone","sorry","broom",
  "thumb","hide","seed","girl","red",
  "fresh","need","bone","rose","shed"
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

function TrainingArena({ speech }) {
  const [words, setWords] = useState(shuffle([...wordsToSpell]));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [currentWrong, setCurrentWrong] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [wordsAttempted, setWordsAttempted] = useState([]);
  const [trainingStarted, setTrainingStarted] = useState(false);

  const inputRef = useRef();

  const currentWord = words[currentIndex];

  useEffect(() => {
    if (trainingStarted && speech) speakWord();
  }, [currentIndex, trainingStarted]);

  const speakWord = () => {
    if (!speech) return;
    speech.speak({
      text: currentWord,
      queue: false
    });
  };

  const handleStart = () => {
    setTrainingStarted(true);
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const handleSubmit = () => {
    const userWord = inputValue.trim().toLowerCase();
    const correctWord = currentWord.toLowerCase();
    const isCorrect = userWord === correctWord;

    // Update Score & Wrong counters
    if (isCorrect) {
      setScore(prev => prev + Math.max(10 - currentWrong * 2, 1));
    } else {
      setCurrentWrong(prev => prev + 1);
      setTotalWrong(prev => prev + 1);
    }

    // Update attempted words list
    setWordsAttempted(prev => [
      ...prev,
      { word: currentWord, correct: isCorrect }
    ]);

    // Reset input
    setInputValue("");
    setCurrentWrong(0);

    // Next word
    if (currentIndex + 1 < words.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Game finished
      alert(`Training Completed! Final Score: ${score}`);
    }

    // Focus on input for next word
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const progressPercentage = Math.floor((wordsAttempted.length / words.length) * 100);

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg mt-6">
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

          {/* Score / Wrong Buttons */}
          <div className="flex justify-between mb-4">
            <button className="px-3 py-1 bg-purple-500 text-white rounded">Score: {score}</button>
            <button className="px-3 py-1 bg-yellow-500 text-white rounded">Wrong: {currentWrong}</button>
            <button className="px-3 py-1 bg-red-500 text-white rounded">Total Wrong: {totalWrong}</button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 h-4 rounded mb-4">
            <div
              className="bg-green-500 h-4 rounded"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Words Attempted */}
          <div className="flex flex-wrap gap-2">
            {wordsAttempted.map((w, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded ${
                  w.correct ? "bg-green-300" : "bg-red-300"
                }`}
              >
                {w.word} {w.correct ? "✅" : "❌"}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TrainingArena;
