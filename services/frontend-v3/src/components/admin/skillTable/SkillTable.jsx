import React, { useState, useEffect, useCallback } from "react";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import useAxios from "../../../utils/axios-instance";
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

  const dispatch = useDispatch();

  // Fetches the skill information
  const getSkill = useCallback(async () => {
    try {
      dispatch(setAdminSkillsLoading(true));

      const results = await axios.get(`api/option/skillsAllLang`);

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((category) => ({
        ...category,
        key: category.id,
      }));

      dispatch(setAdminSkills(formattedData));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch]);

  // Fetches the category information
  const getCategories = useCallback(async () => {
    try {
      dispatch(setAdminCategoriesLoading(true));

      const results = await axios.get(`api/option/categoriesAllLang`);

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((category) => ({
        ...category,
        key: category.id,
      }));

      dispatch(setAdminCategories(formattedData));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch]);

  useEffect(() => {
    getSkill();
    getCategories();
  }, [getCategories, getSkill]);

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
      en: values.addSkillEn,
      fr: values.addSkillFr,
      categoryId: values.addSkillCategory,
    });

    getSkill();
  };

  // Handles the update/edit of a skill
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`api/option/skill`, {
      id,
      en: values.editSkillEn,
      fr: values.editSkillFr,
      categoryId: values.editSkillCategoryId,
    });

    getSkill();
  };

  // Handles the deletion of a skill
  const handleSubmitDelete = async () => {
    await axios.delete(`api/option/skills`, {
      data: {
        ids: selectedRowKeys,
      },
    });

    setSelectedRowKeys([]);
    getSkill();
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
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: `admin.skill.plural`,
        });

      return intl.formatMessage({
        id: `admin.skill.singular`,
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
