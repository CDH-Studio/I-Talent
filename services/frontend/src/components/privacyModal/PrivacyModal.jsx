import { useKeycloak } from "@react-keycloak/web";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { setIsPrivacyAccepted } from "../../redux/slices/userSlice";
import PrivacyModalView from "./PrivacyModalView";

const PrivacyModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPrivacyAccepted } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);
  const { keycloak } = useKeycloak();

  /**
   * Set PrivacyAccepted state to true
   */
  const handleOk = () => {
    dispatch(setIsPrivacyAccepted(true));
  };

  /**
   * logout user if they decline terms
   */
  const handleCancel = () => {
    history.push("/logout");
  };

  return (
    <PrivacyModalView
      handleCancel={handleCancel}
      handleOk={handleOk}
      keycloak={keycloak}
      locale={locale}
      showModal={!isPrivacyAccepted && keycloak && keycloak.authenticated}
    />
  );
};

export default PrivacyModal;
