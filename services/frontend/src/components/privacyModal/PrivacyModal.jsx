import { useSelector, useDispatch } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
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
      showModal={!isPrivacyAccepted && keycloak && keycloak.authenticated}
      handleOk={handleOk}
      handleCancel={handleCancel}
      keycloak={keycloak}
      locale={locale}
    />
  );
};

export default PrivacyModal;
