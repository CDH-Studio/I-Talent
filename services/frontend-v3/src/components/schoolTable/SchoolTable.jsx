import React, { useState, useEffect } from "react";
import SchoolTableView from "./SchoolTableView";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

function SchoolTable(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";
  const { type } = props;

  useEffect(() => {
    let schools = [];
    if (loading) {
      const setState = async () => {
        schools = await getSchools();
        setData(schools);
        console.log("Before: ", schools);
        setLoading(false);
      };
      setState();
    } else {
      const updateState = async () => {
        schools = await getSchools();
        setData(schools);
        console.log("After: ", schools);
        setReset(false);
      };
      updateState();
    }
  }, [loading, reset]);

  const getSchools = async () => {
    try {
      let results = await axios.get(
        backendAddress + "api/admin/options/" + type
      );
      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const getDisplayType = (plural) => {
    if (plural)
      return props.intl.formatMessage({
        id: "admin." + type + ".plural",
        defaultMessage: type,
      });

    return props.intl.formatMessage({
      id: "admin." + type + ".singular",
      defaultMessage: type,
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // const handleSubmitEdit = async (values, id) => {};

  const handleSubmitAdd = async (values) => {
    try {
      const url = backendAddress + "api/admin/options/" + type;

      await axios.post(url, {
        country: values.addSchoolCountry.toUpperCase(),
        description: values.addSchoolName,
        state: values.addSchoolState.toUpperCase(),
      });

      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const handleSubmitEdit = async (values, id) => {
    try {
      const url = backendAddress + "api/admin/options/" + type + "/" + id;

      await axios.put(url, {
        country: values.editSchoolCountry.toUpperCase(),
        description: values.editSchoolName,
        state: values.editSchoolState.toUpperCase(),
      });

      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const handleSubmitDelete = async () => {
    try {
      const url = backendAddress + "api/admin/delete/" + type;

      await axios.post(url, { ids: selectedRowKeys });

      setSelectedRowKeys([]);
      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      onSelectChange(selectedRowKeys);
    },
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const convertToViewableInformation = () => {
    let allSchools = _.sortBy(data, "description");

    for (let i = 0; i < allSchools.length; i++) {
      allSchools[i].key = allSchools[i].id;
    }

    return allSchools;
  };

  document.title = getDisplayType(true) + " - Admin | I-Talent";

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <SchoolTableView
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

export default injectIntl(SchoolTable);
