//Internal Import
import SessionHelper from "../helpers/SessionHelper";
import ToastMessage from "../helpers/ToastMessage";
import { SetUserDetails,SetUserData,ResetUserData,SetUserList,SetTotalUser} from "../redux/slices/UserSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class UserRequest {
  static async ProfileDetails() {
    const { data } = await RestClient.getRequest("/Employee/ProfileDetails");
    if (data) {
      store.dispatch(SetUserDetails(data?.[0]));
      return true;
    }
  }
   
  static async UserCreate(postBody) {
    let PostBody1={"data":postBody}
    const { data } = await RestClient.postRequest(
      "user/adduser",
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetUserData());
      ToastMessage.successMessage("User created successfully!!");
      return true;
    }
  }

  static async UserData(id, postBody) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `user/getuserbyid`,
       PostBody1
    );
    console.log(data);
    if (data) {
      store.dispatch(SetUserData(data.data));
      return true;
    }
  }
  static async UserList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `user/userlist`,
    );

    if (data) {
      console.log(data.data.length)
      store.dispatch(ResetUserData());
      const total = data.data.length;
      store.dispatch(SetUserList(data.data));
      store.dispatch(SetTotalUser(total || 0));
    }
  }


  static async UserUpdate(id, postBody) {
        postBody.id=id;
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/updateuser`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetUserData());
      ToastMessage.successMessage("User Updated Successfully");
      return true;
    }
  }
   
  static async SendRecoveryOtp(Email) {
    const { data } = await RestClient.getRequest(
      `/Employee/SendRecoveryOtp/${Email}`,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      SessionHelper.SetRecoverVerifyEmail(Email);
      return true;
    }
  }

  static async VerifyRecoveryOtp(Otp) {
    const Email = SessionHelper.GetRecoverVerifyEmail();
    console.log(Email);
    const { data } = await RestClient.getRequest(
      `/Employee/VerifyRecoveryOtp/${Email}/${Otp}`,
    );
    if (data) {
      SessionHelper.SetRecoverVerifyOTP(Otp);
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async RecoveryResetPass(PostBody) {
    const Email = SessionHelper.GetRecoverVerifyEmail();
    const Otp = SessionHelper.GetRecoverVerifyOTP();
    const { data } = await RestClient.postRequest(
      `/Employee/RecoveryResetPass/${Email}/${Otp}`,
      PostBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async VerifyAccountSentOtp() {
    const Email = SessionHelper.GetRecoverVerifyEmail();
    console.log(Email);
    const { data } = await RestClient.getRequest(
      `/User/VerifyAccountSentOtp/${Email}`,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async VerifyAccountVerifyOtp(Email, Otp) {
    const { data } = await RestClient.getRequest(
      `/User/VerifyAccountVerifyOtp/${Email}/${Otp}`,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async ProfileUpdate(PostBody) {
    const { data } = await RestClient.updateRequest(
      `/Employee/ProfileUpdate`,
      PostBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async EmployeeChangePassword(PostBody) {
    const { data } = await RestClient.putRequest(
      `/Employee/EmployeeChangePassword`,
      PostBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }
  static async UserDelete(id) {
    let postBody={"data":{"id":id,"updatedyby":1}}
    const { data } = await RestClient.postRequest(
      `user/deleteuser`,
      postBody
    );

    if (data) {
      ToastMessage.successMessage("User Delete Successful");
      return true;
    }
  }
}




export default UserRequest;
