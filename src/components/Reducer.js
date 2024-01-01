const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, questions: [], status: "error" };
    case "dataActive":
      return {
        ...state,
        status: "active",
        totalSeconds: state.questions.length * 30,
      };
    case "userAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuestion":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restartQuiz":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        status: "ready",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "quizSeconds":
      return {
        ...state,
        totalSeconds: state.totalSeconds - 1,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        status: state.totalSeconds === 0 ? "finished" : state.status,
      };
    default:
      return state;
  }
};

export default reducer;
