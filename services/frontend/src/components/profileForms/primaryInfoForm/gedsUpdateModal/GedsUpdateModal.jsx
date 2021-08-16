import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import useAxios from "../../../../utils/useAxios";
import GedsUpdateModalView from "./GedsUpdateModalView";

const GedsUpdateModal = ({ visibility }) => {
  const axios = useAxios();
  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);

  /**
   * Save Data to DB by sending to backend API
   * @param {Object} formValues - Data from primary info form.
   */
  const saveDataToDB = async (formValues) => {
    const dbValues = {
      ...formValues,
    };
    await axios.put(`api/profile/${id}?language=${locale}`, dbValues);
  };

  return (
    <GedsUpdateModalView saveDataToDB={saveDataToDB} visibility={visibility} />
  );
};

GedsUpdateModal.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default GedsUpdateModal;
