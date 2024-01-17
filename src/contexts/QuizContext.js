import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import reducer from "../components/Reducer";

const QuizContext = createContext();

export const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  totalSeconds: null,
};

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highscore, totalSeconds } =
    state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          "https://react-quiz-data-wtnw.onrender.com/api/questions"
        );
        dispatch({ type: "dataReceived", payload: response.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "dataFailed" });
      }
    };
    getQuestions();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        totalSeconds,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  return context;
};

export { QuizProvider, useQuiz };
