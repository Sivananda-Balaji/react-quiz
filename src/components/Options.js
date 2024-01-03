import React from "react";
import { useQuiz } from "../contexts/QuizContext";

const Options = ({ questionObj }) => {
  const { dispatch, answer } = useQuiz();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {questionObj.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              hasAnswer
                ? index === questionObj.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "userAnswer", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
