//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetRiskDetails } from "../redux/slices/RiskSlice";
import {
  SetTotalRisk,
  SetRiskLists,
  SetRiskControlLists,
  SetRiskMitigationLists,
  SetRiskDetails,
  SetRiskownerDropDown
  
} from "../redux/slices/RiskSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class RiskRequest {
  static async RiskCreate(postBody) {
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      "/user/addriskregister",
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetRiskDetails());
      ToastMessage.successMessage("Risk Create Successful");
      return  data.data.riskid;
    }
  }

  static async RiskList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/user/risklist`,
    );

    if (data) {
      console.log(data.data)
      store.dispatch(ResetRiskDetails());
      const total = data.data?.count;
      store.dispatch(SetRiskLists(data.data));
      store.dispatch(SetTotalRisk(total || 0));
    }
  }

 

  static async RiskControlList(id) {
    let PostBody1={"data":{"riskid":id}};
    const { data } = await RestClient.postRequest(
      `/user/applicablecontrollist`,PostBody1
    );

    if (data) {
      console.log(data.data)
      store.dispatch(ResetRiskDetails());
      const total = data.data?.count;
      store.dispatch(SetRiskControlLists(data.data));
    }
  }

  static async RiskMitigationList(id) {
    let PostBody1={"data":{"riskid":id}};
    const { data } = await RestClient.postRequest(
      `/user/mitigationlist`,PostBody1
    );

    if (data) {
      console.log(data.data)
      store.dispatch(ResetRiskDetails());
      const total = data.data?.count;
      store.dispatch(SetRiskMitigationLists(data.data));
    }
  }

  // static async RiskDropDown() {
  //   const { data } = await RestClient.getRequest(`/Risk/RiskDropDown`);

  //   if (data) {
  //     store.dispatch(SetRiskDropDown(data));
  //   }
  // }

  static async RiskownerDropDown() {
    const { data } = await RestClient.getRequest(`/user/riskowner`);

    if (data) {
      store.dispatch(SetRiskownerDropDown(data.data));
    }
  }


  static async RiskDetails(id, postBody) {
    let PostBody1={"data":{"id":id}};
    console.log("ttt")
    const { data } = await RestClient.postRequest(
      `/user/riskdetails`,
      PostBody1
    );

    if (data) {
      console.log(data?.data[0])
      store.dispatch(SetRiskDetails(data?.data[0]));
      return true;
    }
  }

  static async RiskUpdate(id, postBody) {
    postBody.riskid=id;
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/updateriskregister`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetRiskDetails());
      ToastMessage.successMessage("Risk Update Successful");
      return true;
    }
  }


  static async RiskUpdateInherit(id, postBody) {
    //postBody.riskid=id;

    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/inheritriskupdate`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetRiskDetails());
      ToastMessage.successMessage("Risk Update Successful");
      return true;
    }
  }

  static async RiskUpdateControl(id, postBody) {
    //postBody.riskid=id;
    
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/addapplicablecontrol`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetRiskDetails());
      ToastMessage.successMessage("Risk Update Successful");
      return true;
    }
  }


  static async RiskAssesControl(id, postBody) {
    //postBody.riskid=id;
    
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/addriskassistments`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetRiskDetails());
      ToastMessage.successMessage("Risk Update Successful");
      return true;
    }
  }


  static async RiskUpdateMitigation(id, postBody) {
    //postBody.riskid=id;
    
    let PostBody1={"data":postBody};
    const { data } = await RestClient.postRequest(
      `/user/addmitigation`,
      PostBody1,
    );

    if (data) {
      store.dispatch(ResetRiskDetails());
      ToastMessage.successMessage("Risk Update Successful");
      return true;
    }
  }

  static async RiskDelete(id) {

    const { data } = await RestClient.deleteRequest(
      `/Risk/RiskDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("Risk Delete Successful");
      return true;
    }
  }


  static async RiskMitigationDelete(id) {
    let PostBody1={"data":{"id":id}};
    const { data } = await RestClient.postRequest(
      `/user/deletemitigation`,PostBody1
    );

    if (data) {
      ToastMessage.successMessage("Risk Delete Successful");
      return true;
    }
  }

  static async RiskControlDelete(id) {
    let PostBody1={"data":{"riskid":id,"updatedby":1}};
    const { data } = await RestClient.postRequest(
      `/user/deletriskcontrol`,PostBody1
    );

    if (data) {
      ToastMessage.successMessage("Risk Delete Successful");
      return true;
    }
  }
}

export default RiskRequest;
