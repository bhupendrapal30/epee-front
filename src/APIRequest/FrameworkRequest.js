//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetFrameworkDetails } from "../redux/slices/FrameworkSlice";
import {
  SetTotalFramework,
  SetFrameworkLists,
  SetFrameworkDetails,
  SetFrameworkDropDown,
} from "../redux/slices/FrameworkSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class FrameworkRequest {

  static async FrameworkCreate(postBody) {
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      "/user/addframework",
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetFrameworkDetails());
      ToastMessage.successMessage("Framework Create Successful");
      return true;
    }
  }

  static async FrameworkList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/user/frameworklists`,
    );

    if (data) {
      console.log(data.data)
      store.dispatch(ResetFrameworkDetails());
      const total = data.data?.count;
      store.dispatch(SetFrameworkLists(data.data));
      store.dispatch(SetTotalFramework(total || 0));
    }
  }

  static async FrameworkDropDown() {
    const { data } = await RestClient.getRequest(`/Framework/FrameworkDropDown`);

    if (data) {
      store.dispatch(SetFrameworkDropDown(data));
    }
  }

  static async FrameworkDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/frameworkdetails`,
      PostBody1
    );

    if (data) {
      store.dispatch(SetFrameworkDetails(data?.data[0]));
      return true;
    }
  }

  static async FrameworkUpdate(id, postBody) {
    postBody.id=id;
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/frameworkupdate`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetFrameworkDetails());
      ToastMessage.successMessage("Framework Update Successful");
      return true;
    }
  }

  static async FrameworkDelete(id) {
    const { data } = await RestClient.deleteRequest(
      `/Framework/FrameworkDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("Framework Delete Successful");
      return true;
    }
  }
}

export default FrameworkRequest;
