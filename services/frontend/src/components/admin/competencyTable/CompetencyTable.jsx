import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import handleError from "../../../functions/handleError";
import {
  setAdminCompetencies,
  setAdminCompetenciesLoading,
} from "../../../redux/slices/adminSlice";
import useAxios from "../../../utils/useAxios";
import CompetencyTableView from "./CompetencyTableView";

/**
 *  CompetencyTable(props)
 *  Controller for the CompetencyTableView.
 *  It gathers the required data for rendering the component.
 */
const CompetencyTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const axios = useAxios();
  const history = useHistory();
  const intl = useIntl();
  const dispatch = useDispatch();

  // Fetches the competency information
  const getCompetencies = useCallback(async () => {
    try {
      dispatch(setAdminCompetenciesLoading(true));

      const results = await axios.get(`option/competenciesAllLang`);

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((competency) => ({
        ...competency,
        key: competency.id,
      }));

      dispatch(setAdminCompetencies(formattedData));
    } catch (error) {
      handleError(error, "redirect", history);
    }
  }, [axios, dispatch, history]);

  useEffect(() => {
    getCompetencies();
  }, [getCompetencies]);

  // Handles the search part of the column search functionality
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Handles reset of column search functionality
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // Handles addition of a competency
  const handleSubmitAdd = async (values) => {
    await axios.post(`option/competency`, {
      en: values.addCompetencyEn,
      fr: values.addCompetencyFr,
    });

    getCompetencies();
  };

  // Handles the update/edit of a competency
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`option/competency`, {
      en: values.editCompetencyEn,
      fr: values.editCompetencyFr,
      id,
    });

    getCompetencies();
  };

  // Handles the deletion of a competency
  const handleSubmitDelete = async () => {
    await axios.delete(`option/competencies`, {
      data: {
        ids: selectedRowKeys,
      },
    });

    setSelectedRowKeys([]);
    getCompetencies();
  };

  // Handles row selection in the table
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    fixed: "left",
    onChange: (_selectedRowKeys) => {
      setSelectedRowKeys(_selectedRowKeys);
    },
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: "competencies",
        });

      return intl.formatMessage({
        id: "competency",
      });
    };

    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  }, [intl]);

  return (
    <CompetencyTableView
      handleReset={handleReset}
      handleSearch={handleSearch}
      handleSubmitAdd={handleSubmitAdd}
      handleSubmitDelete={handleSubmitDelete}
      handleSubmitEdit={handleSubmitEdit}
      rowSelection={rowSelection}
      searchedColumn={searchedColumn}
      searchText={searchText}
      selectedRowKeys={selectedRowKeys}
    />
  );
};

export default CompetencyTable;
