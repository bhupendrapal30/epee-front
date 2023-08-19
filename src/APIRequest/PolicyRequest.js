//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetPolicyDetails } from "../redux/slices/PolicySlice";
import {
  SetTotalPolicy,
  SetPolicyLists,
  SetPolicyDetails,
} from "../redux/slices/PolicySlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class PolicyRequest {
  static async PolicyCreate(postBody) {
     let PostBody1={"data":postBody}
    const { data } = await RestClient.postRequest(
      "user/fileupload",
       PostBody1,
    );

    if (data) {
      store.dispatch(ResetPolicyDetails());
      ToastMessage.successMessage("Policy Created Successfully");
      return true;
    }
  }

  static async PolicyList(pageNumber, perPage, searchKey) {
    let PostBody1={};
    const { data } = await RestClient.getRequest(
      `user/defaultfilelist`
    );

    if (data) {
      store.dispatch(ResetPolicyDetails());
      const total = data.data.data.length;
     

      store.dispatch(SetPolicyLists(data.data.data));
      store.dispatch(SetTotalPolicy(total || 0));
    }
  }

  

  static async PolicyDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/getrolebyid`,
      PostBody1
    );

    if (data) {
      store.dispatch(SetPolicyDetails(data.data));
      return true;
    }
  }

  static async PolicyUpdate(id, postBody) {
       postBody.id=id;
    let PostBody1={"data":postBody}
    const { data } = await RestClient.postRequest(
      `user/updaterole`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetPolicyDetails());
      ToastMessage.successMessage("Role Updated Successfully");
      return true;
    }
  }

  static async PolicyDelete(id) {

     let PostBody1={"data":{"id":id}};
      const { data } = await RestClient.postRequest(
        `user/deleterole`,
         PostBody1
      );

    if (data) {
      ToastMessage.successMessage("Role Delete Successful");
      return true;
    }
  }
}

export default PolicyRequest;
