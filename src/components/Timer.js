import React, { useEffect } from "react";

const Timer = ({ dispatch, totalSeconds }) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: "quizSeconds" });
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [dispatch]);
  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
