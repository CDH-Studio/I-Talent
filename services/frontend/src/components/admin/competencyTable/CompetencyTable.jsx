import { useState, useEffect, useCallback } from "react";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useAxios from "../../../utils/useAxios";
import handleError from "../../../functions/handleError";
import CompetencyTableView from "./CompetencyTableView";
import { IntlPropType } from "../../../utils/customPropTypes";
import {
  setAdminCompetenciesLoading,
  setAdminCompetencies,
} from "../../../redux/slices/adminSlice";

/**
 *  CompetencyTable(props)
 *  Controller for the CompetencyTableView.
 *  It gathers the required data for rendering the component.
 */
const CompetencyTable = ({ intl }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const axios = useAxios();
  const history = useHistory();

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
      id,
      en: values.editCompetencyEn,
      fr: values.editCompetencyFr,
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
    onChange: (_selectedRowKeys) => {
      setSelectedRowKeys(_selectedRowKeys);
    },
    fixed: "left",
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: `competencies`,
        });

      return intl.formatMessage({
        id: `competency`,
      });
    };

    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  }, [intl]);

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
