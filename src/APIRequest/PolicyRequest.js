//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetPolicyDetails } from "../redux/slices/PolicySlice";
import {
  SetTotalPolicy,
  SetCategoryDropDown,
  SetPolicyLists,
  SetPolicyVersionLists,
  SetPolicyDetails,
  SetStandardCatDropDown
 
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
      const total = data.data.length;
     

      store.dispatch(SetPolicyLists(data.data));
      store.dispatch(SetTotalPolicy(total || 0));
    }
  }

  static async PolicyVersionList(id,pageNumber, perPage, searchKey) {
    let data1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      'user/defaultfileversionlist',data1
    );
    console.log(data.data)
   if (data) {
      store.dispatch(ResetPolicyDetails());
      const total = data.data.length;
     
       console.log(total)
      store.dispatch(SetPolicyVersionLists(data.data));
      store.dispatch(SetTotalPolicy(total || 0));
    }
  }

  static async CategoryDropDown() {
    const { data } = await RestClient.getRequest(`user/categorylist`);

    if (data) {
      //console.log(data.data)
      store.dispatch(SetCategoryDropDown(data.data));
    }
  }

  static async StandardCatDropDown() {
    const { data } = await RestClient.getRequest(`user/standredlist`);

    if (data) {
      store.dispatch(SetStandardCatDropDown(data.data));
    }
  }


  

  static async PolicyDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/getPolicyId`,
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
      `user/fileupdate`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetPolicyDetails());
      ToastMessage.successMessage("Policy updated Successfully");
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
