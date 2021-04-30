import { useState, useEffect, useCallback } from "react";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useAxios from "../../../utils/useAxios";
import handleError from "../../../functions/handleError";
import SkillTableView from "./SkillTableView";
import { IntlPropType } from "../../../utils/customPropTypes";
import {
  setAdminCategoriesLoading,
  setAdminCategories,
  setAdminSkills,
  setAdminSkillsLoading,
} from "../../../redux/slices/adminSlice";

/**
 *  SkillTable(props)
 *  Controller for the SkillTableView.
 *  It gathers the required data for rendering the component.
 */
const SkillTable = ({ intl }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const axios = useAxios();
  const history = useHistory();
  const dispatch = useDispatch();

  const getBackendInfo = useCallback(async () => {
    try {
      dispatch(setAdminSkillsLoading(true));
      dispatch(setAdminCategoriesLoading(true));
      const [skill, categories] = await Promise.all([
        axios.get(`option/skillsAllLang`),
        axios.get(`option/categoriesAllLang`),
      ]);

      dispatch(
        setAdminSkills(
          skill.data.map((category) => ({ ...category, key: category.id }))
        )
      );

      dispatch(
        setAdminCategories(
          categories.data.map((category) => ({
            ...category,
            key: category.id,
          }))
        )
      );
    } catch (error) {
      handleError(error, "redirect", history);
    }
  }, [axios, dispatch, history]);

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

  // Handles addition of a skill
  const handleSubmitAdd = async (values) => {
    await axios.post(`option/skill`, {
      en: values.addSkillEn,
      fr: values.addSkillFr,
      categoryId: values.addSkillCategory,
    });
    getBackendInfo();
  };

  // Handles the update/edit of a skill
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`option/skill`, {
      id,
      en: values.editSkillEn,
      fr: values.editSkillFr,
      categoryId: values.editSkillCategoryId,
    });
    getBackendInfo();
  };

  // Handles the deletion of a skill
  const handleSubmitDelete = async () => {
    await axios.delete(`option/skills`, {
      data: {
        ids: selectedRowKeys,
      },
    });
    setSelectedRowKeys([]);
    getBackendInfo();
  };

  // Helper function to rowSelection
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = (_selectedRowKeys) => {
    // Can access the keys of each skill selected in the table
    setSelectedRowKeys(_selectedRowKeys);
  };

  // Handles row selection in the table
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: (_selectedRowKeys) => {
      onSelectChange(_selectedRowKeys);
    },
    fixed: "left",
  };

  useEffect(() => {
    getBackendInfo();
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: `skills`,
        });

      return intl.formatMessage({
        id: `skill`,
      });
    };
    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  });

  return (
    <SkillTableView
      handleSearch={handleSearch}
      handleReset={handleReset}
      handleSubmitAdd={handleSubmitAdd}
      handleSubmitEdit={handleSubmitEdit}
      handleSubmitDelete={handleSubmitDelete}
      selectedRowKeys={selectedRowKeys}
      searchedColumn={searchedColumn}
      searchText={searchText}
      rowSelection={rowSelection}
    />
  );
};

SkillTable.propTypes = {
  intl: IntlPropType,
};

SkillTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(SkillTable);
