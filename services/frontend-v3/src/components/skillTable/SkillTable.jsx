import React, { useState, useEffect } from "react";
import SkillTableView from "./SkillTableView";
import { Skeleton, message } from "antd";
import axios from "axios";
// import _ from "lodash";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

function SkillTable(props) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [size] = useState("large");
  // const [categories, setCategories] = useState(null);

  const { type } = props;

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

  const getDisplayType = plural => {
    if (plural)
      return props.intl.formatMessage({
        id: "admin." + type + ".plural",
        defaultMessage: type
      });

    return props.intl.formatMessage({
      id: "admin." + type + ".singular",
      defaultMessage: type
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const handleSubmitDelete = async () => {
    try {
      console.log("Delete Values: ", selectedRowKeys);

      const url = backendAddress + "api/admin/delete/" + type;

      await axios.post(url, { ids: selectedRowKeys });

      // deleteValues (if needed)

      await getSkill();

      console.log(data);
      console.log(loading);

      setSelectedRowKeys([]);

      message.success(
        props.intl.formatMessage({
          id: "admin.success",
          defaultMessage: "Successful"
        })
      );
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const handleSubmitCancel = () => {
    message.error(
      props.intl.formatMessage({
        id: "admin.cancelled",
        defaultMessage: "Cancelled"
      })
    );
  };

  const rowSelection = {
    onChange: selectedRowKeys => {
      onSelectChange(selectedRowKeys);
    }
  };

  const onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const getSkillInformation = () => {
    let allSkills = data;

    for (let i = 0; i < allSkills.length; i++) {
      allSkills[i].key = allSkills[i].id;
    }

    allSkills.map(function(e) {
      e.categoryNameEn = e.category.descriptionEn;
      e.categoryNameFr = e.category.descriptionFr;
    });

    return allSkills;
  };

  useEffect(() => {
    document.title = getDisplayType(true) + " - Admin | MyTalent ";
    const updateState = async () => {
      let skills = await getSkill();
      let categories = await getCategories();
      setData(skills);
      setCategories(categories);
      setLoading(false);
    };
    updateState();
  }, []);

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <SkillTableView
      handleSearch={handleSearch}
      handleReset={handleReset}
      handleSubmitDelete={handleSubmitDelete}
      handleSubmitCancel={handleSubmitCancel}
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
