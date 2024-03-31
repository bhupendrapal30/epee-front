//Internal Import
import SessionHelper from "../helpers/SessionHelper";
import ToastMessage from "../helpers/ToastMessage";
import { SetSurveyLists, SetTotalSurvey } from "../redux/slices/Survey";
import {
  SetSurveyQuestionLists,
  SetTotalSurveyQuestion,
} from "../redux/slices/SurveyQuestion";

import store from "../redux/store/store";
import RestClient from "./RestClient";

class SurveyRequest {
  static async SurveyCreate(postBody) {
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest("user/adduser", PostBody1);

    if (data) {
      store.dispatch(ResetUserData());
      ToastMessage.successMessage("Survey created successfully!!");
      return true;
    }
  }

  static async SurveyData(id, postBody) {
    let PostBody1 = { data: { id: id } };
    const { data } = await RestClient.postRequest(
      `user/getuserbyid`,
      PostBody1
    );
    console.log(data);
    if (data) {
      store.dispatch(SetUserData(data.data));
      return true;
    }
  }
  static async SurveyList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(`user/userlist`);

    if (data) {
      console.log(data.data.length);
      const total = data.data.length;
      store.dispatch(SetSurveyLists(data.data));
      store.dispatch(SetTotalSurvey(total || 0));
    }
  }

  static async SurveyUpdate(id, postBody) {
    postBody.id = id;
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest(
      `/user/updateuser`,
      PostBody1
    );

    if (data) {
      ToastMessage.successMessage("Survey Updated Successfully");
      return true;
    }
  }

  static async SurveyDelete(id) {
    let postBody = { data: { id: id, updatedyby: 1 } };
    const { data } = await RestClient.postRequest(`user/deleteuser`, postBody);

    if (data) {
      ToastMessage.successMessage("Survey Deleted Successfully");
      return true;
    }
  }

  static async SurveyQuestionCreate(postBody) {
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest("user/adduser", PostBody1);

    if (data) {
      store.dispatch(ResetUserData());
      ToastMessage.successMessage("Survey Question created successfully!!");
      return true;
    }
  }

  static async SurveyQuestionData(id, postBody) {
    let PostBody1 = { data: { id: id } };
    const { data } = await RestClient.postRequest(
      `user/getuserbyid`,
      PostBody1
    );
    console.log(data);
    if (data) {
      store.dispatch(SetUserData(data.data));
      return true;
    }
  }
  static async SurveyQuestionList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(`user/userlist`);

    if (data) {
      console.log(data.data.length);
      store.dispatch(ResetUserData());
      const total = data.data.length;
      store.dispatch(SetSurveyQuestionLists(data.data));
      store.dispatch(SetTotalSurveyQuestion(total || 0));
    }
  }

  static async SurveyQuestionUpdate(id, postBody) {
    postBody.id = id;
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest(
      `/user/updateuser`,
      PostBody1
    );

    if (data) {
      store.dispatch(ResetUserData());
      ToastMessage.successMessage("Survey Question Updated Successfully");
      return true;
    }
  }

  static async SurveyQuestionDelete(id) {
    let postBody = { data: { id: id, updatedyby: 1 } };
    const { data } = await RestClient.postRequest(`user/deleteuser`, postBody);

    if (data) {
      ToastMessage.successMessage("Survey Question Deleted Successfully");
      return true;
    }
  }
}

export default SurveyRequest;
