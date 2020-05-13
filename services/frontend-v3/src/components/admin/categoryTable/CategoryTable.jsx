/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import CategoryTableView from "./CategoryTableView";
import config from "../../../config";
import { IntlPropType } from "../../../customPropTypes";

const { backendAddress } = config;

/**
 *  CategoryTable(props)
 *  Controller for the CategoryTableView.
 *  It gathers the required data for rendering the component.
 */
function CategoryTable({ intl, type }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";

  /* useEffect will run if statement, when the component is mounted */
  /* useEffect will run else statement, if an addition, update/edit or deletion occurs in the table */

  /* get category information */
  const getCategories = async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/admin/options/categories/skill`
      );
      return results.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
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

  /* handles the deletion of a category */
  const handleSubmitDelete = async () => {
    try {
      const url = `${backendAddress}api/admin/delete/${type}`;

      let result;

      // eslint-disable-next-line func-names
      await axios.post(url, { ids: selectedRowKeys }).then(function (response) {
        result = response.data.deletePerformed;
      });

      if (result === false) {
        return true;
      }
      setReset(true);
      return false;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  /* handles addition of a category */
  // eslint-disable-next-line consistent-return
  const handleSubmitAdd = async (values) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}`;

      await axios.post(url, {
        descriptionEn: values.addCategoryEn,
        descriptionFr: values.addCategoryFr,
      });

      setReset(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  /* handles the update/edit of a category */
  // eslint-disable-next-line consistent-return
  const handleSubmitEdit = async (values, id) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}/${id}`;

      await axios.put(url, {
        descriptionEn: values.editCategoryEn,
        descriptionFr: values.editCategoryFr,
      });

      setReset(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  /* get part of the title for the page */
  const getDisplayType = (plural) => {
    if (plural)
      return intl.formatMessage({
        id: `admin.${type}.plural`,
        defaultMessage: type,
      });

    return intl.formatMessage({
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

  /* helper function to rowSelection */
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = (selectedRowKeys) => {
    // Can access the keys of each category selected in the table
    setSelectedRowKeys(selectedRowKeys);
  };

  /* handles row selection in the table */
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      onSelectChange(selectedRowKeys);
    },
  };

  /* configures data from backend into viewable data for the table */
  const getCategoryInformation = () => {
    // Allows for sorting of data between French/English in terms of description:
    const description =
      intl.formatMessage({ id: "language.code" }) === "en"
        ? "descriptionEn"
        : "descriptionFr";

    const allCategories = _.sortBy(data, description);

    for (let i = 0; i < allCategories.length; i += 1) {
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

CategoryTable.propTypes = {
  intl: IntlPropType,
  type: PropTypes.string.isRequired,
};

CategoryTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(CategoryTable);
