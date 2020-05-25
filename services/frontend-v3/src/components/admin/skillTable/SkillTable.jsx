/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";

import handleError from "../../../functions/handleError";
import SkillTableView from "./SkillTableView";
import config from "../../../config";
import { IntlPropType } from "../../../customPropTypes";

const { backendAddress } = config;

/**
 *  SkillTable(props)
 *  Controller for the SkillTableView.
 *  It gathers the required data for rendering the component.
 */
const SkillTable = ({ intl, type }) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";

  /* get skill information */
  const getSkill = useCallback(async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/admin/options/${type}`
      );

      return results.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  }, [type]);

  /* get category information */
  const getCategories = useCallback(async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/admin/options/categories/${type}`
      );
      return results.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  }, [type]);

  /* useEffect will run if statement, when the component is mounted */
  /* useEffect will run else statement, if an addition, update/edit or deletion occurs in the table */
  useEffect(() => {
    if (loading) {
      const setState = async () => {
        await getSkill()
          .then(skills => setData(skills))
          .then(getCategories)
          .then(categories => setCategories(categories))
          .catch(error => handleError(error, true, "redirect"));
        setLoading(false);
      };
      setState();
    } else {
      const updateState = async () => {
        await getSkill()
          .then(skills => setData(skills))
          .catch(error => handleError(error, true, "redirect"));

        setReset(false);
      };
      updateState();
    }
  }, [getCategories, getSkill, loading, reset]);

  /* get part of the title for the page */
  const getDisplayType = plural => {
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
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  /* handles addition of a skill */
  // eslint-disable-next-line consistent-return
  const handleSubmitAdd = async values => {
    try {
      const url = `${backendAddress}api/admin/options/${type}`;

      await axios.post(url, {
        descriptionEn: values.addSkillEn,
        descriptionFr: values.addSkillFr,
        categoryId: values.addSkillCategory,
      });

      setReset(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  /* handles the update/edit of a skill */
  // eslint-disable-next-line consistent-return
  const handleSubmitEdit = async (values, id) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}/${id}`;

      if (typeof values.editSkillCategory === "string") {
        const index = categories.findIndex(
          object =>
            object.descriptionEn === values.editSkillCategory ||
            object.descriptionFr === values.editSkillCategory
        );
        await axios.put(url, {
          descriptionEn: values.editSkillEn,
          descriptionFr: values.editSkillFr,
          categoryId: categories[index].id,
          category: categories[index],
        });
      } else {
        const categoryObject = categories.find(
          category => category.id === values.editSkillCategory
        );
        await axios.put(url, {
          descriptionEn: values.editSkillEn,
          descriptionFr: values.editSkillFr,
          categoryId: values.editSkillCategory,
          category: categoryObject,
        });
      }

      setReset(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  /* handles the deletion of a skill */
  // eslint-disable-next-line consistent-return
  const handleSubmitDelete = async () => {
    try {
      const url = `${backendAddress}api/admin/delete/${type}`;

      await axios.post(url, { ids: selectedRowKeys });

      setSelectedRowKeys([]);
      setReset(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  /* helper function to rowSelection */
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = selectedRowKeys => {
    // Can access the keys of each skill selected in the table
    setSelectedRowKeys(selectedRowKeys);
  };

  /* handles row selection in the table */
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: selectedRowKeys => {
      onSelectChange(selectedRowKeys);
    },
  };

  /* configures data from backend into viewable data for the table */
  const getSkillInformation = () => {
    // Allows for sorting of data between French/English in terms of description and category:
    const description =
      intl.formatMessage({ id: "language.code" }) === "en"
        ? "descriptionEn"
        : "descriptionFr";

    const category =
      intl.formatMessage({ id: "language.code" }) === "en"
        ? "categoryNameEn"
        : "categoryNameFr";

    const allSkills = _.sortBy(data, description);

    for (let i = 0; i < allSkills.length; i += 1) {
      allSkills[i].key = allSkills[i].id;
    }

    allSkills.forEach(e => {
      e.categoryNameEn = e.category.descriptionEn;
      e.categoryNameFr = e.category.descriptionFr;
    });

    return _.sortBy(allSkills, category);
  };

  document.title = `${getDisplayType(true)} - Admin | I-Talent`;

  if (loading) {
    return <Skeleton active />;
  }

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
      data={getSkillInformation()}
      categories={categories}
    />
  );
};

SkillTable.propTypes = {
  intl: IntlPropType,
  type: PropTypes.string.isRequired,
};

SkillTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(SkillTable);
