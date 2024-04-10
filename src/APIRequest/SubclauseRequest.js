//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetSubclauseDetails } from "../redux/slices/SubclauseSlice";
import {
  SetTotalSubclause,
  SetSubclauseLists,
  SetSubclauseDetails,
  SetSubclauseDropDown,
} from "../redux/slices/SubclauseSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class SubclauseRequest {
  static async SubclauseCreate(postBody) {
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      "/user/addsubcluse",
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetSubclauseDetails());
      ToastMessage.successMessage("Subclause Create Successful");
      return true;
    }
  }

  static async SubclauseList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/user/subcluselist`,
    );

    if (data) {
      console.log(data.data)
      store.dispatch(ResetSubclauseDetails());
      const total = data.data?.count;
      store.dispatch(SetSubclauseLists(data.data));
      store.dispatch(SetTotalSubclause(total || 0));
    }
  }

  static async SubclauseDropDown() {
    const { data } = await RestClient.getRequest(`/user/cluselistdropdown`);

    if (data) {
      console.log(data?.data)
      store.dispatch(SetSubclauseDropDown(data.data));
    }
  }

  

  static async SubclauseDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/subclusedetails`,
      PostBody1
    );

    if (data) {
      console.log(data?.data)
      store.dispatch(SetSubclauseDetails(data?.data[0]));
      return true;
    }
  }

  static async SubclauseUpdate(id, postBody) {
    postBody.id=id;
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/subcluseupdate`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetSubclauseDetails());
      ToastMessage.successMessage("Subclause Update Successful");
      return true;
    }
  }

  static async SubclauseDelete(id) {

    const { data } = await RestClient.deleteRequest(
      `/Subclause/SubclauseDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("Subclause Delete Successful");
      return true;
    }
  }
}

export default SubclauseRequest;
