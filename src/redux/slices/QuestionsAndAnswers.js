import { createSlice, nanoid } from "@reduxjs/toolkit";

const QuestionAnswerSlice = createSlice({
  name: "QuestionAnswer",
  initialState: {
    List: [],
    QandALength: 0,
  },
  reducers: {
    SetQuestionsAnswersLists(state, action) {
      // let QuestionAnswerObject = {};
      // QuestionAnswerObject.id = nanoid(); //For Creating Unique Id Always.
      // QuestionAnswerObject.quizid = action.payload.quizid;
      // QuestionAnswerObject.question = action.payload.questionValue;
      // QuestionAnswerObject.answerOne = action.payload.answerOne;
      // QuestionAnswerObject.answerTwo = action.payload.answerTwo;
      // QuestionAnswerObject.answerThree = action.payload.answerThree;
      // QuestionAnswerObject.answerFour = action.payload.answerFour;
      // QuestionAnswerObject.correctAnswer = action.payload.correctAnswer;
      state.List = action.payload;
    },
    SetTotalQandA(state, action) {
      state.QandALength = action.payload;
    },
    DeleteQuestionsAnswersLists(state, action) {
      state.List.pop(state.List.id == action.payload);
    },
  },
});

export const {
  SetQuestionsAnswersLists,
  DeleteQuestionsAnswersLists,
  EditQuestionsAnswer,
  SetTotalQandA,
} = QuestionAnswerSlice.actions;
export default QuestionAnswerSlice.reducer;
