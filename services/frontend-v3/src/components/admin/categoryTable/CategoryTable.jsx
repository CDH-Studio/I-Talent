import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import CategoryTableView from "./CategoryTableView";
import config from "../../../config";

const { backendAddress } = config;

/**
 *  CategoryTable(props)
 *  Controller for the CategoryTableView.
 *  It gathers the required data for rendering the component.
 */
function CategoryTable(props) {
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

  /* get category information */
  const getCategories = async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/admin/options/categories/skill`
      );
      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* handles the deletion of a category */
  const handleSubmitDelete = async () => {
    try {
      const url = `${backendAddress}api/admin/delete/${type}`;

      let result;

      await axios.post(url, { ids: selectedRowKeys }).then(function (response) {
        result = response.data.deletePerformed;
      });

      if (result === false) {
        return true;
      }
      setReset(true);
      return false;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* handles addition of a category */
  const handleSubmitAdd = async (values) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}`;

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

  /* handles the update/edit of a category */
  const handleSubmitEdit = async (values, id) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}/${id}`;

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
    // Can access the keys of each category selected in the table
    setSelectedRowKeys(selectedRowKeys);
  };

  /* configures data from backend into viewable data for the table */
  const getCategoryInformation = () => {
    // Allows for sorting of data between French/English in terms of description:
    const description =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "descriptionEn"
        : "descriptionFr";

    const allCategories = _.sortBy(data, description);

    for (let i = 0; i < allCategories.length; i++) {
      allCategories[i].key = allCategories[i].id;
    }

    return allCategories;
  };

  document.title = `${getDisplayType(true)} - Admin | I-Talent`;

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
