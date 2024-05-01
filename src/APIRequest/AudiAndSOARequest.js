//Internal Import
import SessionHelper from "../helpers/SessionHelper";
import ToastMessage from "../helpers/ToastMessage";
import {
  SetAuditList,
  SetAuditListLength,
  SetSOAList,
  SetSOAListLength,
  SetSOAAnnexList,
  SetSOAAnnexListLength,
} from "../redux/slices/AuditAndSOA";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class AssetRequest {
  static async SOACreate(postBody) {
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest("user/addsoa", PostBody1);
    if (data) {
      ToastMessage.successMessage("SOA created successfully!!");
      return true;
    }
  }
  static async SOALists(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(`user/soalist`);

    if (data) {
      const total = data.data.length;
      console.log("SOA LIST LENGTH ----> ", total);
      store.dispatch(SetSOAList(data.data));
      store.dispatch(SetSOAListLength(total || 0));
      return total;
    }
  }
  static async SOAUpdate(id, postBody) {
    postBody.quizid = id;
    let PostBody1 = { data: postBody };
    const { data } = await RestClient.postRequest(`/user/soaupdate`, PostBody1);

    if (data) {
      ToastMessage.successMessage("SOA Updated Successfully");
      return true;
    }
  }

  static async SOAData(id, postBody) {
    let PostBody1 = { data: { id: id } };
    const { data } = await RestClient.getRequest(`user/soadetails`, PostBody1);
    console.log("IN API REQUEST SOA UPDATES -----> ", data);
    if (data) {
      //store.dispatch(SetQuizData(data.data));
      return true;
    }
  }
  static async SOADetailsAnnexList(id) {
    let PostBody1 = { data: { soaid: new Number(id) } };
    const { data } = await RestClient.postRequest(
      `user/SoaDetailsAnnexlist`,
      PostBody1
    );
    console.log("SOA Details Annex List -----> ", data);
    if (data) {
      const total = data.data.length;
      store.dispatch(SetSOAAnnexList(data.data));
      store.dispatch(SetSOAAnnexListLength(total || 0));
      return { total, list: data.data };
    }
  }
}

export default AssetRequest;
