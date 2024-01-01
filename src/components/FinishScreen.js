import React from "react";

const FinishScreen = ({ points, maxPoints, highscore, dispatch }) => {
  const percentage = Math.ceil((points / maxPoints) * 100);
  const emoji =
    percentage === 100
      ? "🥇"
      : percentage >= 80
      ? "😊"
      : percentage >= 50
      ? "😁"
      : percentage > 0
      ? "🤔"
      : percentage === 0
      ? "🤦🏻"
      : "";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You have scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({percentage}
        %)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
