//Internal Import
import SessionHelper from "../helpers/SessionHelper";
import ToastMessage from "../helpers/ToastMessage";
import {
  SetQuestionsAnswersLists,
  DeleteQuestionsAnswersLists,
  EditQuestionsAnswer,
  SetTotalQandA,
} from "../redux/slices/QuestionsAndAnswers";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class QuestionAnswerRequest {
  static async QuestionAndAnswerCreate(postBody) {
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest(
      "user/addquestion",
      PostBody1
    );
    if (data) {
      ToastMessage.successMessage("Question And Answer created successfully!!");
      return true;
    }
  }
  static async QandAList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(`user/questionlist`);

    if (data) {
      const total = data.data.length;
      store.dispatch(SetQuestionsAnswersLists(data.data));
      store.dispatch(SetTotalQandA(total || 0));
    }
  }
  static async QuestionAndAnswerUpdate(id, postBody) {
    postBody.questionid = id;
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest(
      `/user/questionupdate`,
      PostBody1
    );

    if (data) {
      ToastMessage.successMessage("Question And Answer Updated Successfully");
      return true;
    }
  }
}

export default QuestionAnswerRequest;
