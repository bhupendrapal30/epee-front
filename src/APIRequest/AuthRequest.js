//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { SetLogin } from "../redux/slices/AuthSlice";
import { SetUserDetails } from "../redux/slices/UserSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class AuthRequest {
  static async RegisterUser(postBody) {
    var postBody = {"data":postBody}
    console.log(postBody);
    const { data } = await RestClient.postRequest(
      "user/login",
      postBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async LoginUser(postBody) {
    var postBody1 = {"data":postBody}
    const { data } = await RestClient.postRequest("user/login",postBody1);
    if (data) {
      store.dispatch(SetLogin(data?.data));
      store.dispatch(SetUserDetails(data.userData?.id[0]));
      ToastMessage.successMessage("User Login Successfull");
    }
  }


  static async addUserData(postBody) {
    console.log(postBody);
    var postBody1 = {"data":postBody}
    const { data } = await RestClient.postRequest("user/login",postBody1);
    if (data) {
      store.dispatch(SetLogin(data?.data));
      store.dispatch(SetUserDetails(data.userData?.id[0]));
      ToastMessage.successMessage("User Login Successfull");
    }
  }
}

export default AuthRequest;
