import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import handleError from "../../../functions/handleError";
import CategoryTableView from "./CategoryTableView";
import config from "../../../config";
import { IntlPropType } from "../../../customPropTypes";
import {
  setAdminCategories,
  setAdminCategoriesLoading,
} from "../../../redux/slices/adminSlice";

const { backendAddress } = config;

/**
 *  CategoryTable(props)
 *  Controller for the CategoryTableView.
 *  It gathers the required data for rendering the component.
 */
function CategoryTable({ intl }) {
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";

  const dispatch = useDispatch();

  /* get category information */
  const getCategories = useCallback(async () => {
    try {
      dispatch(setAdminCategoriesLoading(true));

      const results = await axios.get(
        `${backendAddress}api/option/categoriesAllLang`
      );

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((category) => ({
        ...category,
        key: category.id,
      }));

      dispatch(setAdminCategories(formattedData));

      if (reset) {
        setReset(false);
      }
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch, reset]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  /* handles the deletion of a category */
  const handleSubmitDelete = async () => {
    const result = await axios.delete(`${backendAddress}api/option/categories`, {
      data: {
        ids: selectedRowKeys,
      },
    });

    if (result.data === false) {
      return true;
    }
    setReset(true);
    return true;
  };

  /* handles addition of a category */
  // eslint-disable-next-line consistent-return
  const handleSubmitAdd = async (values) => {
    await axios.post(`${backendAddress}api/option/category`, {
      en: values.addCategoryEn,
      fr: values.addCategoryFr,
    });

    setReset(true);
  };

  /* handles the update/edit of a category */
  // eslint-disable-next-line consistent-return
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`${backendAddress}api/option/category`, {
      id,
      en: values.editCategoryEn,
      fr: values.editCategoryFr,
    });

    setReset(true);
  };

  /* get part of the title for the page */
  const getDisplayType = (plural) => {
    if (plural)
      return intl.formatMessage({
        id: `admin.category.plural`,
      });

    return intl.formatMessage({
      id: `admin.category.singular`,
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

  document.title = `${getDisplayType(true)} - Admin | I-Talent`;

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
    />
  );
}

CategoryTable.propTypes = {
  intl: IntlPropType,
};

CategoryTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(CategoryTable);
