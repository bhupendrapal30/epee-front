//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetPolicyDetails } from "../redux/slices/PolicySlice";
import {
  SetTotalPolicy,
  SetCategoryDropDown,
  SetPolicyLists,
  SetPolicyVersionLists,
  SetPolicyApproverList,
  SetPolicyDetails,
  SetStandardCatDropDown,
  SetassignerDropdrown,
  SetreccurenceDropdrown,
  SetframeworkDropDown,
  SetownerDropdrown,
  SetdepartmentDropdrown,
  SetclauseDropdrown,
  SetsubclauseDropdrown,
 
} from "../redux/slices/PolicySlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class PolicyRequest {
  static async PolicyCreate(postBody) {
     let PostBody1={"data":postBody}
    const { data } = await RestClient.postRequest(
      "user/createpolicy",
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
      `user/policylist`
    );
   if (data) {
      store.dispatch(ResetPolicyDetails());
      const total = data.data.length;
     

      store.dispatch(SetPolicyLists(data.data));
      store.dispatch(SetTotalPolicy(total || 0));
    }
  }


  // static async PolicyListNew(pageNumber, perPage, searchKey) {
  //   let PostBody1={};
  //   const { data } = await RestClient.getRequest(
  //     `user/policylist`
  //   );
  //  if (data) {
  //     store.dispatch(ResetPolicyDetails());
  //     const total = data.data.length;
     

  //     store.dispatch(SetPolicyLists(data.data));
  //     store.dispatch(SetTotalPolicy(total || 0));
  //   }
  // }

  static async PolicyVersionList(id,pageNumber, perPage, searchKey) {
    let data1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      'user/defaultfileversionlist',data1
    );
   
   if (data) {
      store.dispatch(ResetPolicyDetails());
      const total = data.data.length;
     
       console.log(total)
      store.dispatch(SetPolicyVersionLists(data.data));
      store.dispatch(SetTotalPolicy(total || 0));
    }
  }


  static async PolicyApproverList(id,pageNumber, perPage, searchKey) {
    let data1={"data":{"policyid":id}};
    const { data } = await RestClient.postRequest(
      'user/approverlist',data1
    );
   
   if (data) {
      store.dispatch(ResetPolicyDetails());
      const total = data.data.length;
     
       console.log(total)
      store.dispatch(SetPolicyApproverList(data.data.data));
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
      console.log(data.data);
      store.dispatch(SetStandardCatDropDown(data.data));
    }
  }

  static async frameworkDropDown() {
    const { data } = await RestClient.getRequest(`user/frameworklist`);

    if (data) {
      console.log(data.data);
      store.dispatch(SetframeworkDropDown(data.data));
    }
  }

  static async assignerDropdrown() {
    const { data } = await RestClient.getRequest(`user/assigner`);

    if (data) {
      console.log(data.data)
      store.dispatch(SetassignerDropdrown(data.data));
    }
  }


  static async ownerDropdrown() {
    const { data } = await RestClient.getRequest(`user/assigner`);

    if (data) {
      console.log(data.data)
      store.dispatch(SetownerDropdrown(data.data));
    }
  }

  static async departmentDropdrown() {
    const { data } = await RestClient.getRequest(`user/department`);

    if (data) {
      //console.log(data.data)
      store.dispatch(SetdepartmentDropdrown(data.data));
    }
  }

  static async clauseDropdrown() {
    const { data } = await RestClient.getRequest(`user/clauselist`);

    if (data) {
      
      store.dispatch(SetclauseDropdrown(data.data));
    }
  }

  static async subclauseDropdrown() {
    const { data } = await RestClient.getRequest(`user/subclauselist`);

    if (data) {
      //console.log(data.data)
      store.dispatch(SetsubclauseDropdrown(data.data));
    }
  }
  static async controlsDropdrown() {
    const { data } = await RestClient.getRequest(`user/controlist`);

    if (data) {
      //console.log(data.data)
      store.dispatch(SetreccurenceDropdrown(data.data));
    }
  }

  static async subControlsDropdrown() {
    const { data } = await RestClient.getRequest(`user/subcontrolist`);

    if (data) {
      //console.log(data.data)
      store.dispatch(SetreccurenceDropdrown(data.data));
    }
  }
  static async reccurenceDropdrown() {
    const { data } = await RestClient.getRequest(`user/reccurence`);

    if (data) {
      //console.log(data.data)
      store.dispatch(SetreccurenceDropdrown(data.data));
    }
  }


  


  

  static async PolicyDetails(id, postBody) {
    let PostBody1={"data":{"policyid":id}};
    const { data } = await RestClient.postRequest(
      `/user/policydetails`,
      PostBody1
    );

    if (data) {
      let cData = {...data.data[0],...data.approver_mapping[0],...data.cluse_mapping[0],...data.control_mapping[0]}
      console.log(data)
      store.dispatch(SetPolicyDetails(cData));
      return true;
    }
  }

  static async PolicyUpdate(id, postBody) {
       postBody.policyid=id;
    let PostBody1={"data":postBody}
    const { data } = await RestClient.postRequest(
      `user/policyupdate`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetPolicyDetails());
      ToastMessage.successMessage("Policy updated Successfully");
      return true;
    }
  }


  static async PolicyFileUpdate(id, postBody) {
       postBody.policyid=id;
    let PostBody1={"data":postBody}
    const { data } = await RestClient.postRequest(
      `user/policyfileupdate`,
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
