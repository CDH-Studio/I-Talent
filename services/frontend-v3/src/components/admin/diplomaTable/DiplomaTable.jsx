import React, { useState, useEffect, useCallback } from "react";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import axios from "../../../axios-instance";
import DiplomaTableView from "./DiplomaTableView";
import handleError from "../../../functions/handleError";
import {
  setAdminDiplomas,
  setAdminDiplomasLoading,
} from "../../../redux/slices/adminSlice";
import { IntlPropType } from "../../../customPropTypes";

/**
 *  DiplomaTable(props)
 *  Controller for the DiplomaTableView.
 *  It gathers the required data for rendering the component.
 */
const DiplomaTable = ({ intl }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";

  const dispatch = useDispatch();

  // Fetches the diploma information
  const getDiplomas = useCallback(async () => {
    try {
      dispatch(setAdminDiplomasLoading(true));

      const results = await axios.get(`api/option/diplomasAllLang`);

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((competency) => ({
        ...competency,
        key: competency.id,
      }));

      dispatch(setAdminDiplomas(formattedData));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  useEffect(() => {
    getDiplomas();
  }, [getDiplomas]);

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

  // Handles addition of a diploma
  const handleSubmitAdd = async (values) => {
    await axios.post(`api/option/diploma`, {
      en: values.addDiplomaEn,
      fr: values.addDiplomaFr,
    });

    getDiplomas();
  };

  // Handles the update/edit of a diploma
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`api/option/diploma`, {
      id,
      en: values.editDiplomaEn,
      fr: values.editDiplomaFr,
    });

    getDiplomas();
  };

  // Handles the deletion of a diploma
  const handleSubmitDelete = async () => {
    await axios.delete(`api/option/diplomas`, {
      data: {
        ids: selectedRowKeys,
      },
    });

    setSelectedRowKeys([]);
    getDiplomas();
  };

  // Helper function to rowSelection
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = (modifiedSelectedRowKeys) => {
    // Can access the keys of each diploma selected in the table
    setSelectedRowKeys(modifiedSelectedRowKeys);
  };

  // Handles row selection in the table
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: (modifiedSelectedRowKeys) => {
      onSelectChange(modifiedSelectedRowKeys);
    },
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: `admin.diploma.plural`,
        });

      return intl.formatMessage({
        id: `admin.diploma.singular`,
      });
    };

    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  }, [intl]);

  return (
    <DiplomaTableView
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

DiplomaTable.propTypes = {
  intl: IntlPropType,
};

DiplomaTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(DiplomaTable);
