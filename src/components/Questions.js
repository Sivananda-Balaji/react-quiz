import React from "react";
import Options from "./Options";
import { useQuiz } from "../contexts/QuizContext";

const Questions = () => {
  const { questions, index } = useQuiz();
  const questionObj = questions[index];
  return (
    <div>
      <h3>{questionObj.question}</h3>
      <Options questionObj={questionObj} />
    </div>
  );
};

export default Questions;
