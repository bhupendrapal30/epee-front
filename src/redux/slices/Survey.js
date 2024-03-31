import { createSlice, nanoid } from "@reduxjs/toolkit";

const SurveySlice = createSlice({
  name: "Survey",
  initialState: {
    List: [],
    SurveyLength: 0,
  },
  reducers: {
    SetSurveyLists(state, action) {
      state.List = action.payload;
    },
    SetTotalSurvey(state, action) {
      state.SurveyLength = action.payload;
    },
  },
});

export const { SetSurveyLists, SetTotalSurvey } = SurveySlice.actions;
export default SurveySlice.reducer;
