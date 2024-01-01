import React from "react";

const Options = ({ questions, dispatch, answer }) => {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {questions.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              hasAnswer
                ? index === questions.correctOption
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
