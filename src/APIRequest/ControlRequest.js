//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetControlDetails } from "../redux/slices/ControlSlice";
import {
  SetTotalControl,
  SetControlLists,
  SetControlDetails,
  SetControlDropDown,
  SetFrameworkDropDown,
} from "../redux/slices/ControlSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class ControlRequest {
  static async ControlCreate(postBody) {
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      "/user/addcontrol",
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetControlDetails());
      ToastMessage.successMessage("Control Create Successful");
      return true;
    }
  }

  static async ControlList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/user/controllist`,
    );

    if (data) {
      console.log(data.data)
      store.dispatch(ResetControlDetails());
      const total = data.data?.count;
      store.dispatch(SetControlLists(data.data));
      store.dispatch(SetTotalControl(total || 0));
    }
  }

  static async ControlDropDown() {
    const { data } = await RestClient.getRequest(`/Control/ControlDropDown`);

    if (data) {
      store.dispatch(SetControlDropDown(data));
    }
  }

  static async FrameworkDropDown() {
    const { data } = await RestClient.getRequest(`/user/frameworklist`);

    if (data) {
      store.dispatch(SetFrameworkDropDown(data.data));
    }
  }

  static async ControlDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/controldetails`,
      PostBody1
    );

    if (data) {
      console.log(data?.data[0])
      store.dispatch(SetControlDetails(data?.data[0]));
      return true;
    }
  }

  static async ControlUpdate(id, postBody) {
    postBody.id=id;
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/controlupdate`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetControlDetails());
      ToastMessage.successMessage("Control Update Successful");
      return true;
    }
  }

  static async ControlDelete(id) {

    const { data } = await RestClient.deleteRequest(
      `/Control/ControlDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("Control Delete Successful");
      return true;
    }
  }
}

export default ControlRequest;
