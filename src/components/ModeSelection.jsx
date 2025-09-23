import React from "react";

function ModeSelection({ onSelectMode }) {
  return (
    <div className="text-center p-5">
      <h2 className="text-2xl font-bold mb-4">Select Mode</h2>
      <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => onSelectMode("easy")}>Easy</button>
      <button className="m-2 p-2 bg-yellow-500 text-white rounded" onClick={() => onSelectMode("average")}>Average</button>
      <button className="m-2 p-2 bg-red-500 text-white rounded" onClick={() => onSelectMode("hard")}>Hard</button>
    </div>
  );
}

export default ModeSelection;
