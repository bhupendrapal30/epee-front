import { createSlice, nanoid } from "@reduxjs/toolkit";

const QuizSlice = createSlice({
  name: "Quiz",
  initialState: {
    QuizList: [],
    QuizLength: 0,
    QuizData: {
      quizName: "",
      description: "",
      totalNoOfQuestion: "",
      totalNoOfRetake: "",
      retakeAllowed: "",
      passingMarks: "",
    },
  },
  reducers: {
    SetQuizLists(state, action) {
      // let QuizObject = {};
      // QuizObject.id = nanoid(); //For Creating Unique Id Always.
      // QuizObject.quizName = action.payload.quizName;
      // QuizObject.description = action.payload.description;
      // QuizObject.totalNoOfQuestion = action.payload.totalNoOfQuestion;
      // QuizObject.totalNoOfRetake = action.payload.totalNoOfRetake;
      // QuizObject.retakeAllowed = action.payload.retakeAllowed;
      // QuizObject.passingMarks = action.payload.passingMarks;
      // state.QuizList.push(QuizObject);
      state.QuizList = action.payload;
    },
    SetTotalQuiz(state, action) {
      state.QuizLength = action.payload;
    },
    SetQuizData(state, action) {
      state.QuizData = action.payload;
    },
    DeleteQuizLists(state, action) {
      state.QuizList.pop(state.QuizList.id == action.payload);
    },
    EditQuiz(state, action) {
      let objectToReplace = {};
      objectToReplace.id = action.payload.id;
      objectToReplace.quizName = action.payload.quizName;
      objectToReplace.description = action.payload.description;
      objectToReplace.totalNoOfQuestion = action.payload.totalNoOfQuestion;
      objectToReplace.totalNoOfRetake = action.payload.totalNoOfRetake;
      objectToReplace.retakeAllowed = action.payload.retakeAllowed;
      objectToReplace.passingMarks = action.payload.passingMarks;
      let newArray = state.QuizList.map((item) =>
        item.id === action.payload.id ? objectToReplace : item
      );
      state.QuizList = [...newArray];
    },
  },
});

export const {
  SetQuizLists,
  DeleteQuizLists,
  EditQuiz,
  SetTotalQuiz,
  SetQuizData,
} = QuizSlice.actions;
export default QuizSlice.reducer;
