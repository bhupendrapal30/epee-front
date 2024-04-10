//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetClauseDetails } from "../redux/slices/ClauseSlice";
import {
  SetTotalClause,
  SetClauseLists,
  SetClauseDetails,
  SetClauseDropDown,
  SetFrameworkDropDown,
} from "../redux/slices/ClauseSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class ClauseRequest {
  static async ClauseCreate(postBody) {
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      "/user/addcluse",
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetClauseDetails());
      ToastMessage.successMessage("Clause Create Successful");
      return true;
    }
  }

  static async ClauseList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/user/cluselist`,
    );

    if (data) {
      console.log(data.data)
      store.dispatch(ResetClauseDetails());
      const total = data.data?.count;
      store.dispatch(SetClauseLists(data.data));
      store.dispatch(SetTotalClause(total || 0));
    }
  }

  static async ClauseDropDown() {
    const { data } = await RestClient.getRequest(`/Clause/ClauseDropDown`);

    if (data) {
      store.dispatch(SetClauseDropDown(data));
    }
  }

  static async FrameworkDropDown() {
    const { data } = await RestClient.getRequest(`/user/frameworklist`);

    if (data) {
      store.dispatch(SetFrameworkDropDown(data.data));
    }
  }

  static async ClauseDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/clusedetails`,
      PostBody1
    );

    if (data) {
      console.log(data?.data)
      store.dispatch(SetClauseDetails(data?.data[0]));
      return true;
    }
  }

  static async ClauseUpdate(id, postBody) {
    postBody.id=id;
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/cluseupdate`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetClauseDetails());
      ToastMessage.successMessage("Clause Update Successful");
      return true;
    }
  }

  static async ClauseDelete(id) {

    const { data } = await RestClient.deleteRequest(
      `/Clause/ClauseDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("Clause Delete Successful");
      return true;
    }
  }
}

export default ClauseRequest;
