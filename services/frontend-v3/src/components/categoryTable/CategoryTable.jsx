import React, { useState, useEffect } from "react";
import CategoryTableView from "./CategoryTableView";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

function CategoryTable(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [size] = useState("large");

  const { type } = props;

  const getCategories = async () => {
    try {
      let results = await axios.get(
        backendAddress + "api/admin/options/categories/skill"
      );
      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const handleSubmitDelete = async () => {
    try {
      const url = backendAddress + "api/admin/delete/" + type;

      let result;

      await axios.post(url, { ids: selectedRowKeys }).then(function (response) {
        result = response.data.deletePerformed;
      });

      if (result === false) {
        return true;
      } else {
        setReset(true);
        return false;
      }
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const handleSubmitAdd = async (values) => {
    try {
      const url = backendAddress + "api/admin/options/" + type;

      await axios.post(url, {
        descriptionEn: values.addCategoryEn,
        descriptionFr: values.addCategoryFr,
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
        descriptionEn: values.editCategoryEn,
        descriptionFr: values.editCategoryFr,
      });

      setReset(true);
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

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      onSelectChange(selectedRowKeys);
    },
  };

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const getCategoryInformation = () => {
    const description =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "descriptionEn"
        : "descriptionFr";

    let allCategories = _.sortBy(data, description);

    for (let i = 0; i < allCategories.length; i++) {
      allCategories[i].key = allCategories[i].id;
    }

    return allCategories;
  };

  useEffect(() => {
    let categories = [];
    if (loading) {
      const setState = async () => {
        categories = await getCategories();
        setData(categories);
        setLoading(false);
      };
      setState();
    } else {
      const updateState = async () => {
        categories = await getCategories();
        setData(categories);
        setReset(false);
        setSelectedRowKeys([]);
      };
      updateState();
    }
  }, [loading, reset]);

  document.title = getDisplayType(true) + " - Admin | I-Talent";

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <CategoryTableView
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
      data={getCategoryInformation()}
    />
  );
}

export default injectIntl(CategoryTable);
