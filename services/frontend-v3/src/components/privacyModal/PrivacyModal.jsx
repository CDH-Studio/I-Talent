import React from "react";
import PrivacyModalView from "./PrivacyModalView";
import { useSelector, useDispatch} from "react-redux";
import { setIsPrivacyAccepted } from "../../redux/slices/userSlice";
import { useKeycloak } from "@react-keycloak/web";


const PrivacyModal = ({ data }) => {
    const dispatch = useDispatch();
    const { isPrivacyAccepted } = useSelector((state) => state.user);
    const [keycloak] = useKeycloak();
  
    const handleOk = e => {
      dispatch(setIsPrivacyAccepted(true));
    };
   return <PrivacyModalView showModal={!isPrivacyAccepted} handleOk={handleOk} keycloak={keycloak} />
};


export default PrivacyModal;
