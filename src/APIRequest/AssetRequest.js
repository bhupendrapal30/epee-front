//Internal Import
import SessionHelper from "../helpers/SessionHelper";
import ToastMessage from "../helpers/ToastMessage";
import {
  SetAssetTypeList,
  SetAssetTypeListLength,
  SetAssetAssignmentList,
  SetAssetAssignmentListLength,
  SetAssetInventoryList,
  SetAssetInventoryListLength,
} from "../redux/slices/AssetSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class AssetRequest {
  static async AssetTypeCreate(postBody) {
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest("user/addquiz", PostBody1);
    if (data) {
      ToastMessage.successMessage("Quiz created successfully!!");
      return true;
    }
  }
  static async AssetLists(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(`user/quizlist`);

    if (data) {
      const total = data.data.length;
      store.dispatch(SetQuizLists(data.data));
      store.dispatch(SetTotalQuiz(total || 0));
    }
  }
  static async AssetTypeUpdate(id, postBody) {
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

export default AssetRequest;
