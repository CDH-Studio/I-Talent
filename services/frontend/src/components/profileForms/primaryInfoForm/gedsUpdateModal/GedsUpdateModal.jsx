import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import GedsUpdateModalView from "./GedsUpdateModalView";
import useAxios from "../../../../utils/useAxios";

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
    <GedsUpdateModalView visibility={visibility} saveDataToDB={saveDataToDB} />
  );
};

GedsUpdateModal.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default GedsUpdateModal;
