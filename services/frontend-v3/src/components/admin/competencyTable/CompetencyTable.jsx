/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import handleError from "../../../functions/handleError";
import CompetencyTableView from "./CompetencyTableView";
import config from "../../../config";
import { IntlPropType } from "../../../customPropTypes";
import {
  setAdminCompetenciesLoading,
  setAdminCompetencies,
} from "../../../redux/slices/adminSlice";

const { backendAddress } = config;

/**
 *  CompetencyTable(props)
 *  Controller for the CompetencyTableView.
 *  It gathers the required data for rendering the component.
 */
const CompetencyTable = ({ intl }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";

  const dispatch = useDispatch();

  /* get competency information */
  const getCompetencies = useCallback(async () => {
    try {
      dispatch(setAdminCompetenciesLoading(true));

      const results = await axios.get(
        `${backendAddress}api/option/competenciesAllLang`
      );

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((competency) => ({
        ...competency,
        key: competency.id,
      }));

      dispatch(setAdminCompetencies(formattedData));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  /* useEffect will run if statement, when the component is mounted */
  /* useEffect will run else statement, if an addition, update/edit or deletion occurs in the table */
  useEffect(() => {
    getCompetencies();
  }, [getCompetencies]);

  /* get part of the title for the page */
  const getDisplayType = (plural) => {
    if (plural)
      return intl.formatMessage({
        id: `admin.competency.plural`,
      });

    return intl.formatMessage({
      id: `admin.competency.singular`,
    });
  };

  /* handles the search part of the column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  /* handles reset of column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  /* handles addition of a competency */
  const handleSubmitAdd = async (values) => {
    await axios.post(`${backendAddress}api/option/competency`, {
      en: values.addCompetencyEn,
      fr: values.addCompetencyFr,
    });

    getCompetencies();
  };

  /* handles the update/edit of a competency */
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`${backendAddress}api/option/competency`, {
      id,
      en: values.editCompetencyEn,
      fr: values.editCompetencyFr,
    });

    getCompetencies();
  };

  /* handles the deletion of a competency */
  const handleSubmitDelete = async () => {
    await axios.delete(`${backendAddress}api/option/competencies`, {
      data: {
        ids: selectedRowKeys,
      },
    });

    setSelectedRowKeys([]);

    getCompetencies();
  };

  /* helper function to rowSelection */
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = (selectedRowKeys) => {
    // Can access the keys of each competency selected in the table
    setSelectedRowKeys(selectedRowKeys);
  };

  /* handles row selection in the table */
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      onSelectChange(selectedRowKeys);
    },
  };

  document.title = `${getDisplayType(true)} - Admin | I-Talent`;

  return (
    <CompetencyTableView
      handleSearch={handleSearch}
      handleReset={handleReset}
      handleSubmitAdd={handleSubmitAdd}
      handleSubmitEdit={handleSubmitEdit}
      handleSubmitDelete={handleSubmitDelete}
      selectedRowKeys={selectedRowKeys}
      searchedColumn={searchedColumn}
      searchText={searchText}
      size={size}
      rowSelection={rowSelection}
    />
  );
};

CompetencyTable.propTypes = {
  intl: IntlPropType,
};

CompetencyTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(CompetencyTable);
