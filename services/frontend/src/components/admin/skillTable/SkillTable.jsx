import { useCallback, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import handleError from "../../../functions/handleError";
import {
  setAdminCategories,
  setAdminCategoriesLoading,
  setAdminSkills,
  setAdminSkillsLoading,
} from "../../../redux/slices/adminSlice";
import { IntlPropType } from "../../../utils/customPropTypes";
import useAxios from "../../../utils/useAxios";
import SkillTableView from "./SkillTableView";

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
        axios.get(`api/option/skillsAllLang`),
        axios.get(`api/option/categoriesAllLang`),
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
    await axios.post(`api/option/skill`, {
      categoryId: values.addSkillCategory,
      en: values.addSkillEn,
      fr: values.addSkillFr,
    });
    getBackendInfo();
  };

  // Handles the update/edit of a skill
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`api/option/skill`, {
      categoryId: values.editSkillCategoryId,
      en: values.editSkillEn,
      fr: values.editSkillFr,
      id,
    });
    getBackendInfo();
  };

  // Handles the deletion of a skill
  const handleSubmitDelete = async () => {
    await axios.delete(`api/option/skills`, {
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
    fixed: "left",
    onChange: (_selectedRowKeys) => {
      onSelectChange(_selectedRowKeys);
    },
  };

  useEffect(() => {
    getBackendInfo();
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: "skills",
        });

      return intl.formatMessage({
        id: "skill",
      });
    };
    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  });

  return (
    <SkillTableView
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

SkillTable.propTypes = {
  intl: IntlPropType,
};

SkillTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(SkillTable);
