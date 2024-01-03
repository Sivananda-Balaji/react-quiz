import React from "react";
import { useQuiz } from "../contexts/QuizContext";

const ScreenStart = () => {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "dataActive" })}
      >
        Let's Start
      </button>
    </div>
  );
};

export default ScreenStart;
