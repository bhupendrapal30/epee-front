import { createSlice, nanoid } from "@reduxjs/toolkit";

const SurveyQuestionSlice = createSlice({
  name: "SurveyQuestion",
  initialState: {
    List: [],
    SurveyQuestionLength: 0,
  },
  reducers: {
    SetSurveyQuestionLists(state, action) {
      state.List = action.payload;
    },
    SetTotalSurveyQuestion(state, action) {
      state.SurveyQuestionLength = action.payload;
    },
  },
});

export const { SetSurveyQuestionLists, SetTotalSurveyQuestion } =
  SurveyQuestionSlice.actions;
export default SurveyQuestionSlice.reducer;
