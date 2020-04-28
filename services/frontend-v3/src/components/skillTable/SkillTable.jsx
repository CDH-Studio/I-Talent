import React, { useState, useEffect } from "react";
import SkillTableView from "./SkillTableView";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

/**
 *  SkillTable(props)
 *  Controller for the SkillTableView.
 *  It gathers the required data for rendering the component.
 */
function SkillTable(props) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
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
    let skills = [];
    let categories = [];
    if (loading) {
      const setState = async () => {
        skills = await getSkill();
        categories = await getCategories();
        setData(skills);
        setCategories(categories);
        setLoading(false);
      };
      setState();
    } else {
      const updateState = async () => {
        skills = await getSkill();
        setData(skills);
        setReset(false);
      };
      updateState();
    }
  }, [loading, reset]);

  /* get skill information */
  const getSkill = async () => {
    try {
      let results = await axios.get(
        backendAddress + "api/admin/options/" + type
      );

      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* get category information */
  const getCategories = async () => {
    try {
      let results = await axios.get(
        backendAddress + "api/admin/options/categories/" + type
      );
      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* get part of the title for the page */
  const getDisplayType = (plural) => {
    if (plural)
      return props.intl.formatMessage({
        id: "admin." + type + ".plural",
        defaultMessage: type,
      });

    return props.intl.formatMessage({
      id: "admin." + type + ".singular",
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

  /* handles addition of a skill */
  const handleSubmitAdd = async (values) => {
    try {
      const url = backendAddress + "api/admin/options/" + type;

      await axios.post(url, {
        descriptionEn: values.addSkillEn,
        descriptionFr: values.addSkillFr,
        categoryId: values.addSkillCategory,
      });

      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* handles the update/edit of a skill */
  const handleSubmitEdit = async (values, id) => {
    try {
      const url = backendAddress + "api/admin/options/" + type + "/" + id;

      if (typeof values.editSkillCategory === "string") {
        const index = categories.findIndex(
          (object) =>
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
        let categoryObject = categories.find(
          (category) => category.id === values.editSkillCategory
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
      console.log(error);
      return 0;
    }
  };

  /* handles the deletion of a skill */
  const handleSubmitDelete = async () => {
    try {
      const url = backendAddress + "api/admin/delete/" + type;

      await axios.post(url, { ids: selectedRowKeys });

      setSelectedRowKeys([]);
      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
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
    // Can access the keys of each skill selected in the table
    setSelectedRowKeys(selectedRowKeys);
  };

  /* configures data from backend into viewable data for the table */
  const getSkillInformation = () => {
    // Allows for sorting of data between French/English in terms of description and category:
    const description =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "descriptionEn"
        : "descriptionFr";

    const category =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "categoryNameEn"
        : "categoryNameFr";

    let allSkills = _.sortBy(data, description);

    for (let i = 0; i < allSkills.length; i++) {
      allSkills[i].key = allSkills[i].id;
    }

    allSkills.forEach((e) => {
      e.categoryNameEn = e.category.descriptionEn;
      e.categoryNameFr = e.category.descriptionFr;
    });

    return _.sortBy(allSkills, category);
  };

  document.title = getDisplayType(true) + " - Admin | I-Talent";

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
}

export default injectIntl(SkillTable);
