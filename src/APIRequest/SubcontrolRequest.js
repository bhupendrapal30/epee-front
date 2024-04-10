//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetSubcontrolDetails } from "../redux/slices/SubcontrolSlice";
import {
  SetTotalSubcontrol,
  SetSubcontrolLists,
  SetSubcontrolDetails,
  SetSubcontrolDropDown,
} from "../redux/slices/SubcontrolSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class SubcontrolRequest {
  static async SubcontrolCreate(postBody) {
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      "/user/addsubcontrol",
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetSubcontrolDetails());
      ToastMessage.successMessage("Subcontrol Create Successful");
      return true;
    }
  }

  static async SubcontrolList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/user/subcontrollist`,
    );

    if (data) {
      console.log(data.data)
      store.dispatch(ResetSubcontrolDetails());
      const total = data.data?.count;
      store.dispatch(SetSubcontrolLists(data.data));
      store.dispatch(SetTotalSubcontrol(total || 0));
    }
  }

  static async SubcontrolDropDown() {
    const { data } = await RestClient.getRequest(`/user/cluselistdropdown`);

    if (data) {
      console.log(data?.data)
      store.dispatch(SetSubcontrolDropDown(data.data));
    }
  }

  

  static async SubcontrolDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/subcontroldetails`,
      PostBody1
    );

    if (data) {
      console.log(data?.data)
      store.dispatch(SetSubcontrolDetails(data?.data[0]));
      return true;
    }
  }

  static async SubcontrolUpdate(id, postBody) {
    postBody.id=id;
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/subcontrolupdate`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetSubcontrolDetails());
      ToastMessage.successMessage("Subcontrol Update Successful");
      return true;
    }
  }

  static async SubcontrolDelete(id) {

    const { data } = await RestClient.deleteRequest(
      `/Subcontrol/SubcontrolDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("Subcontrol Delete Successful");
      return true;
    }
  }
}

export default SubcontrolRequest;
