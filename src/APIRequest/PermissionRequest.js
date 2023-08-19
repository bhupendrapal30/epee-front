//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetPermissionDetails } from "../redux/slices/PermissionSlice";
import {
  SetTotalPermission,
  SetPermissionLists,
  SetPermissionDetails,
  
} from "../redux/slices/PermissionSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class PermissionRequest {
  static async PermissionCreate(postBody) {
    let PostBody1={"data":postBody}
    const { data } = await RestClient.postRequest("user/addpermission", PostBody1);

    if (data) {
      store.dispatch(ResetPermissionDetails());
      ToastMessage.successMessage("News Create Successful");
      return true;
    }
  }

  static async PermissionList(pageNumber, perPage, searchKey) {
     let PostBody1={};
    const { data } = await RestClient.postRequest(
      `user/PermissionList`,PostBody1
    );

    if (data) {
      
      store.dispatch(ResetPermissionDetails());
      const total = data.data.length;
      console.log(total)
      store.dispatch(SetPermissionLists(data.data));
      store.dispatch(SetTotalPermission(total || 0));
    }
  }

  

  static async PermissionDetails(id, postBody) {
      let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(`user/getpermissionId`,PostBody1);

    if (data) {
      store.dispatch(SetPermissionDetails(data.data));
      return true;
    }
  }

  static async PermissionUpdate(id, postBody) {

      postBody.id=id;
      let PostBody1={"data":postBody}
      const { data } = await RestClient.postRequest(
        `user/updatepermission`,
        PostBody1,
      );

    if (data) {
      store.dispatch(ResetPermissionDetails());
      ToastMessage.successMessage("Permission Updated Successfully");
      return true;
    }
  }

  static async PermissionDelete(id) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(`user/deletepermission`,PostBody1);

    if (data) {
      ToastMessage.successMessage("Permission Deleted Successfully !!!");
      return true;
    }
  }
}

export default PermissionRequest;
