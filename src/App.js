import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import ScreenStart from "./components/ScreenStart";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import QuizProgress from "./components/QuizProgress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { status, answer } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <ScreenStart />}
        {status === "active" && (
          <>
            <QuizProgress />
            <Questions />
            <Footer>
              <Timer />
              {answer !== null && <NextButton />}
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
