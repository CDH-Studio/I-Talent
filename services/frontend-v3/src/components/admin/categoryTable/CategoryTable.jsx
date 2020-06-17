import React, { useState, useEffect, useCallback } from "react";
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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";

  const dispatch = useDispatch();

  // Fetches the category information
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
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Handles the deletion of a category
  const handleSubmitDelete = async () => {
    const result = await axios.delete(
      `${backendAddress}api/option/categories`,
      {
        data: {
          ids: selectedRowKeys,
        },
      }
    );

    if (result.data === false) {
      return true;
    }

    getCategories();
    return true;
  };

  // Handles addition of a category
  const handleSubmitAdd = async (values) => {
    await axios.post(`${backendAddress}api/option/category`, {
      en: values.addCategoryEn,
      fr: values.addCategoryFr,
    });

    getCategories();
  };

  // Handles the update/edit of a category
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`${backendAddress}api/option/category`, {
      id,
      en: values.editCategoryEn,
      fr: values.editCategoryFr,
    });

    getCategories();
  };

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

  // Helper function to rowSelection
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = (_selectedRowKeys) => {
    // Can access the keys of each category selected in the table
    setSelectedRowKeys(_selectedRowKeys);
  };

  // Handles row selection in the table
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: (_selectedRowKeys) => {
      onSelectChange(_selectedRowKeys);
    },
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: `admin.category.plural`,
        });

      return intl.formatMessage({
        id: `admin.category.singular`,
      });
    };

    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  }, [intl]);

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
