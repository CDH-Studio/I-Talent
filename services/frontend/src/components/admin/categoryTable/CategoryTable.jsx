import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import handleError from "../../../functions/handleError";
import {
  setAdminCategories,
  setAdminCategoriesLoading,
} from "../../../redux/slices/adminSlice";
import useAxios from "../../../utils/useAxios";
import CategoryTableView from "./CategoryTableView";

/**
 *  CategoryTable(props)
 *  Controller for the CategoryTableView.
 *  It gathers the required data for rendering the component.
 */
const CategoryTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const axios = useAxios();
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();

  // Fetches the category information
  const getCategories = useCallback(async () => {
    try {
      dispatch(setAdminCategoriesLoading(true));

      const results = await axios.get(`option/categoriesAllLang`);

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((category) => ({
        ...category,
        key: category.id,
      }));

      dispatch(setAdminCategories(formattedData));
    } catch (error) {
      handleError(error, "redirect", history);
    }
  }, [axios, dispatch, history]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Handles the deletion of a category
  const handleSubmitDelete = async () => {
    const result = await axios.delete(`option/categories`, {
      data: {
        ids: selectedRowKeys,
      },
    });
    if (result.data !== false) {
      getCategories();
    }
    return true;
  };

  // Handles addition of a category
  const handleSubmitAdd = async (values) => {
    await axios.post(`option/category`, {
      en: values.addCategoryEn,
      fr: values.addCategoryFr,
    });

    getCategories();
  };

  // Handles the update/edit of a category
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`option/category`, {
      en: values.editCategoryEn,
      fr: values.editCategoryFr,
      id,
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
    fixed: "left",
    onChange: (_selectedRowKeys) => {
      onSelectChange(_selectedRowKeys);
    },
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: "skill.categories",
        });

      return intl.formatMessage({
        id: "category",
      });
    };

    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  }, [intl]);

  return (
    <CategoryTableView
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

export default CategoryTable;
