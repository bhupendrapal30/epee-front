//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetRoleDetails } from "../redux/slices/RoleSlice";
import {
  SetTotalRole,
  SetRoleList,
  SetRoleDetails,
} from "../redux/slices/RoleSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class RoleRequest {
  static async RoleCreate(postBody) {
    let PostBody1={"data":postBody}
    const { data } = await RestClient.postRequest(
      "user/addrole",
       PostBody1,
    );

    if (data) {
      store.dispatch(ResetRoleDetails());
      ToastMessage.successMessage("Role Created Successfully");
      return true;
    }
  }

  static async RoleList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/user/rolelist`,
    );

    if (data) {
      store.dispatch(ResetRoleDetails());
      const total = data.data.length;
      console.log(total);
      console.log(data.data);

      store.dispatch(SetRoleList(data.data));
      store.dispatch(SetTotalRole(total || 0));
    }
  }

  

  static async RoleDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/getrolebyid`,
      PostBody1
    );

    if (data) {
      store.dispatch(SetRoleDetails(data.data));
      return true;
    }
  }

  static async RoleUpdate(id, postBody) {
       postBody.id=id;
    let PostBody1={"data":postBody}
    const { data } = await RestClient.postRequest(
      `user/updaterole`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetRoleDetails());
      ToastMessage.successMessage("Role Updated Successfully");
      return true;
    }
  }

  static async RoleDelete(id) {

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

export default RoleRequest;
