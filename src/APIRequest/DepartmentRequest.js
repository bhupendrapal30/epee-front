//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetDepartmentDetails } from "../redux/slices/DepartmentSlice";
import {
  SetTotalDepartment,
  SetDepartmentLists,
  SetDepartmentDetails,
  SetDepartmentDropDown,
} from "../redux/slices/DepartmentSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class DepartmentRequest {
  static async DepartmentCreate(postBody) {
    const { data } = await RestClient.postRequest(
      "/user/adddepartment",
      postBody,
    );

    if (data) {
      store.dispatch(ResetDepartmentDetails());
      ToastMessage.successMessage("Department Create Successful");
      return true;
    }
  }

  static async DepartmentList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/user/departmentslist`,
    );

    if (data) {
      console.log(data.data)
      store.dispatch(ResetDepartmentDetails());
      const total = data.data?.count;
      store.dispatch(SetDepartmentLists(data.data));
      store.dispatch(SetTotalDepartment(total || 0));
    }
  }

  static async DepartmentDropDown() {
    const { data } = await RestClient.getRequest(`/Department/DepartmentDropDown`);

    if (data) {
      store.dispatch(SetDepartmentDropDown(data));
    }
  }

  static async DepartmentDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/getdepartmentid`,
      PostBody1
    );

    if (data) {
      store.dispatch(SetDepartmentDetails(data?.data));
      return true;
    }
  }

  static async DepartmentUpdate(id, postBody) {
    postBody.id=id;
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/updatedepartment`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetDepartmentDetails());
      ToastMessage.successMessage("Department Update Successful");
      return true;
    }
  }

  static async DepartmentDelete(id) {
    const { data } = await RestClient.deleteRequest(
      `/Department/DepartmentDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("Department Delete Successful");
      return true;
    }
  }
}

export default DepartmentRequest;
