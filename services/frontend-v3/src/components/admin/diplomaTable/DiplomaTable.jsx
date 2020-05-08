import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import DiplomaTableView from "./DiplomaTableView";
import config from "../../../config";

const { backendAddress } = config;

/**
 *  DiplomaTable(props)
 *  Controller for the DiplomaTableView.
 *  It gathers the required data for rendering the component.
 */
function DiplomaTable(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";
  const { type } = props;

  /* useEffect will run if statement, when the component is mounted */
  /* useEffect will run else statement, if an addition, update/edit or deletion occurs in the table */
  useEffect(() => {
    let diplomas = [];
    if (loading) {
      const setState = async () => {
        diplomas = await getDiplomas();
        setData(diplomas);
        setLoading(false);
      };
      setState();
    } else {
      const updateState = async () => {
        diplomas = await getDiplomas();
        setData(diplomas);
        setReset(false);
      };
      updateState();
    }
  }, [loading, reset]);

  /* get diploma information */
  const getDiplomas = async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/admin/options/${type}`
      );
      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* get part of the title for the page */
  const getDisplayType = (plural) => {
    if (plural)
      return props.intl.formatMessage({
        id: `admin.${type}.plural`,
        defaultMessage: type,
      });

    return props.intl.formatMessage({
      id: `admin.${type}.singular`,
      defaultMessage: type,
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

  /* handles addition of a diploma */
  const handleSubmitAdd = async (values) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}`;

      await axios.post(url, {
        descriptionEn: values.addDiplomaEn,
        descriptionFr: values.addDiplomaFr,
      });

      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* handles the update/edit of a diploma */
  const handleSubmitEdit = async (values, id) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}/${id}`;

      await axios.put(url, {
        descriptionEn: values.editDiplomaEn,
        descriptionFr: values.editDiplomaFr,
      });

      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* handles the deletion of a diploma */
  const handleSubmitDelete = async () => {
    try {
      const url = `${backendAddress}api/admin/delete/${type}`;

      await axios.post(url, { ids: selectedRowKeys });

      setSelectedRowKeys([]);
      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* handles row selection in the table */
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      onSelectChange(selectedRowKeys);
    },
  };

  /* helper function to rowSelection */
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = (selectedRowKeys) => {
    // Can access the keys of each diploma selected in the table
    setSelectedRowKeys(selectedRowKeys);
  };

  /* configures data from backend into viewable data for the table */
  const convertToViewableInformation = () => {
    // Allows for sorting of data between French/English in terms of description:
    const description =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "descriptionEn"
        : "descriptionFr";

    const allDiplomas = _.sortBy(data, description);

    for (let i = 0; i < allDiplomas.length; i++) {
      allDiplomas[i].key = allDiplomas[i].id;
    }

    return allDiplomas;
  };

  document.title = `${getDisplayType(true)} - Admin | I-Talent`;

  if (loading) {
    return <Skeleton active />;
  }

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
      data={convertToViewableInformation()}
    />
  );
}

export default injectIntl(DiplomaTable);
