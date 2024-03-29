import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import handleError from "../../../functions/handleError";
import {
  setAdminDiplomas,
  setAdminDiplomasLoading,
} from "../../../redux/slices/adminSlice";
import useAxios from "../../../utils/useAxios";
import DiplomaTableView from "./DiplomaTableView";

/**
 *  DiplomaTable(props)
 *  Controller for the DiplomaTableView.
 *  It gathers the required data for rendering the component.
 */
const DiplomaTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const axios = useAxios();
  const history = useHistory();
  const intl = useIntl();

  const dispatch = useDispatch();

  // Fetches the diploma information
  const getDiplomas = useCallback(async () => {
    try {
      dispatch(setAdminDiplomasLoading(true));

      const results = await axios.get(`option/diplomasAllLang`);

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((competency) => ({
        ...competency,
        key: competency.id,
      }));

      dispatch(setAdminDiplomas(formattedData));
    } catch (error) {
      handleError(error, "redirect", history);
    }
  }, [axios, dispatch, history]);

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
    await axios.post(`option/diploma`, {
      en: values.addDiplomaEn,
      fr: values.addDiplomaFr,
    });

    getDiplomas();
  };

  // Handles the update/edit of a diploma
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`option/diploma`, {
      en: values.editDiplomaEn,
      fr: values.editDiplomaFr,
      id,
    });

    getDiplomas();
  };

  // Handles the deletion of a diploma
  const handleSubmitDelete = async () => {
    await axios.delete(`option/diplomas`, {
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
    fixed: "left",
    onChange: (modifiedSelectedRowKeys) => {
      onSelectChange(modifiedSelectedRowKeys);
    },
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: "diplomas",
        });

      return intl.formatMessage({
        id: "diploma",
      });
    };

    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  }, [intl]);

  return (
    <DiplomaTableView
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

export default DiplomaTable;
