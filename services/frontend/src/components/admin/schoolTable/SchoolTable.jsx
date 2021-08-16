import { useCallback, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import handleError from "../../../functions/handleError";
import {
  setAdminSchools,
  setAdminSchoolsLoading,
} from "../../../redux/slices/adminSlice";
import { IntlPropType } from "../../../utils/customPropTypes";
import useAxios from "../../../utils/useAxios";
import SchoolTableView from "./SchoolTableView";

/**
 *  SchoolTable(props)
 *  Controller for the SchoolTableView.
 *  It gathers the required data for rendering the component.
 */
const SchoolTable = ({ intl }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const axios = useAxios();
  const history = useHistory();

  const dispatch = useDispatch();

  // Fetches the school information
  const getSchools = useCallback(async () => {
    try {
      dispatch(setAdminSchoolsLoading(true));

      const results = await axios.get(`api/option/schoolsAllLang`);

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((competency) => ({
        ...competency,
        key: competency.id,
      }));

      dispatch(setAdminSchools(formattedData));
    } catch (error) {
      handleError(error, "redirect", history);
    }
  }, [axios, dispatch, history]);

  useEffect(() => {
    getSchools();
  }, [getSchools]);

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

  // Handles addition of a school
  const handleSubmitAdd = async (values) => {
    await axios.post(`api/option/school`, {
      en: values.addSchoolEn,
      fr: values.addSchoolFr,
      abbrCountry: values.addSchoolCountry.toUpperCase(),
      abbrProvince: values.addSchoolProvince.toUpperCase(),
    });

    getSchools();
  };

  // Handles the update/edit of a school
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`api/option/school`, {
      id,
      en: values.editSchoolEn,
      fr: values.editSchoolFr,
      abbrCountry: values.editSchoolCountry.toUpperCase(),
      abbrProvince: values.editSchoolProvince.toUpperCase(),
    });

    getSchools();
  };

  // Handles the deletion of a school
  const handleSubmitDelete = async () => {
    await axios.delete(`api/option/schools`, {
      data: {
        ids: selectedRowKeys,
      },
    });

    setSelectedRowKeys([]);
    getSchools();
  };

  // Helper function to rowSelection
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = (_selectedRowKeys) => {
    // Can access the keys of each school selected in the table
    setSelectedRowKeys(_selectedRowKeys);
  };

  // Handles row selection in the table
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: (_selectedRowKeys) => {
      onSelectChange(_selectedRowKeys);
    },
    fixed: "left",
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: "schools",
        });

      return intl.formatMessage({
        id: "school",
      });
    };

    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  }, [intl]);

  return (
    <SchoolTableView
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

SchoolTable.propTypes = {
  intl: IntlPropType,
};

SchoolTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(SchoolTable);
