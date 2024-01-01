import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Header from "./components/Header";
import Main from "./components/Main";
import reducer from "./components/Reducer";
import Loader from "./components/Loader";
import Error from "./components/Error";
import ScreenStart from "./components/ScreenStart";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import QuizProgress from "./components/QuizProgress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

export const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  totalSeconds: null,
};

function App() {
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
        const response = await axios.get("http://localhost:8000/questions");
        dispatch({ type: "dataReceived", payload: response.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "dataFailed" });
      }
    };
    getQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <ScreenStart numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <QuizProgress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} totalSeconds={totalSeconds} />
              {answer !== null && (
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestions={numQuestions}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
