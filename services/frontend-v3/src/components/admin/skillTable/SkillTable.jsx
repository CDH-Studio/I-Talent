/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";

import handleError from "../../../functions/handleError";
import SkillTableView from "./SkillTableView";
import config from "../../../config";
import { IntlPropType } from "../../../customPropTypes";
import {
  setAdminCategoriesLoading,
  setAdminCategories,
  setAdminSkills,
  setAdminSkillsLoading,
} from "../../../redux/slices/adminSlice";

const { backendAddress } = config;

/**
 *  SkillTable(props)
 *  Controller for the SkillTableView.
 *  It gathers the required data for rendering the component.
 */
const SkillTable = ({ intl }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";

  const dispatch = useDispatch();

  /* get skill information */
  const getSkill = useCallback(async () => {
    try {
      dispatch(setAdminSkillsLoading(true));

      const results = await axios.get(
        `${backendAddress}api/option/skillsAllLang`
      );

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((category) => ({
        ...category,
        key: category.id,
      }));

      dispatch(setAdminSkills(formattedData));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

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
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  useEffect(() => {
    getSkill();
    getCategories();
  }, [getCategories, getSkill]);

  /* get part of the title for the page */
  const getDisplayType = (plural) => {
    if (plural)
      return intl.formatMessage({
        id: `admin.skill.plural`,
      });

    return intl.formatMessage({
      id: `admin.skill.singular`,
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

  /* handles addition of a skill */
  const handleSubmitAdd = async (values) => {
    await axios.post(`${backendAddress}api/option/skill`, {
      en: values.addSkillEn,
      fr: values.addSkillFr,
      categoryId: values.addSkillCategory,
    });

    getSkill();
  };

  /* handles the update/edit of a skill */
  const handleSubmitEdit = async (values, id) => {
    await axios.put(`${backendAddress}api/option/skill`, {
      id,
      en: values.editSkillEn,
      fr: values.editSkillFr,
      categoryId: values.editSkillCategoryId,
    });

    getSkill();
  };

  /* handles the deletion of a skill */
  const handleSubmitDelete = async () => {
    await axios.delete(`${backendAddress}api/option/skills`, {
      data: {
        ids: selectedRowKeys,
      },
    });

    setSelectedRowKeys([]);
    getSkill();
  };

  /* helper function to rowSelection */
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = (selectedRowKeys) => {
    // Can access the keys of each skill selected in the table
    setSelectedRowKeys(selectedRowKeys);
  };

  /* handles row selection in the table */
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      console.log(selectedRowKeys);
      onSelectChange(selectedRowKeys);
    },
  };

  document.title = `${getDisplayType(true)} - Admin | I-Talent`;

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
      size={size}
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
