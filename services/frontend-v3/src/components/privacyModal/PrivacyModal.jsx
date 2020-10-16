import React from "react";
import PrivacyModalView from "./PrivacyModalView";
import { useSelector, useDispatch } from "react-redux";
import { setIsPrivacyAccepted } from "../../redux/slices/userSlice";
import { useKeycloak } from "@react-keycloak/web";
import { useHistory } from "react-router-dom";

const PrivacyModal = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPrivacyAccepted } = useSelector((state) => state.user);
  const [keycloak] = useKeycloak();
  const { locale } = useSelector((state) => state.settings);

  const handleOk = () => {
    dispatch(setIsPrivacyAccepted(true));
  };

  const handleCancel = () => {
    history.push("/logout");
  };
  return (
    <PrivacyModalView
      showModal={!isPrivacyAccepted}
      handleOk={handleOk}
      handleCancel={handleCancel}
      keycloak={keycloak}
      locale={locale}
    />
  );
};

export default PrivacyModal;
