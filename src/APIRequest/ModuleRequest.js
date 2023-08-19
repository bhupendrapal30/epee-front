//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import {
 SetModuleDropDown,SetRoleDropDown
} from "../redux/slices/ModuleSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class ModuleRequest {
  
  static async ModuleDropDown() {

    const { data } = await RestClient.getRequest(`user/modulelist`);
    if (data.status) {
      let datavar = {
        "moduleData":data.data.data}
         console.log(datavar);
      store.dispatch(SetModuleDropDown(datavar.moduleData));
    }
  }

 static async RoleDropDown() {

    const { data } = await RestClient.getRequest(`user/rolelistingdata`);
    console.log(data)
    if (data.status) {
      let datavar = {
        "moduleData":data.data.data}
        
      store.dispatch(SetRoleDropDown(datavar.moduleData));
    }
  }
  

  
}

export default ModuleRequest;
