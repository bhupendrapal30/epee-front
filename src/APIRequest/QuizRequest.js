//Internal Import
import SessionHelper from "../helpers/SessionHelper";
import ToastMessage from "../helpers/ToastMessage";
import {
  SetQuizLists,
  EditQuiz,
  DeleteQuizLists,
  SetTotalQuiz,
  SetQuizData,
} from "../redux/slices/Quiz";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class QuizRequest {
  static async QuizCreate(postBody) {
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest("user/addquiz", PostBody1);
    if (data) {
      ToastMessage.successMessage("Quiz created successfully!!");
      return true;
    }
  }
  static async QuizLists(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(`user/quizlist`);

    if (data) {
      console.log("Quiz Lists ----> ", data.data);
      const total = data.data.length;
      store.dispatch(SetQuizLists(data.data));
      store.dispatch(SetTotalQuiz(total || 0));
    }
  }
  static async QuizUpdate(id, postBody) {
    postBody.quizid = id;
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest(
      `/user/quizupdate`,
      PostBody1
    );

    if (data) {
      ToastMessage.successMessage("Quiz Updated Successfully");
      return true;
    }
  }

  static async QuizData(id, postBody) {
    let PostBody1 = { data: { id: id } };
    const { data } = await RestClient.getRequest(`user/quizdetails`, PostBody1);
    console.log(data);
    if (data) {
      store.dispatch(SetQuizData(data.data));
      return true;
    }
  }
}

export default QuizRequest;
