import React, { useState, useEffect } from "react";
import CompetencyTableView from "./CompetencyTableView";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

function CompetencyTable(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [size] = useState("large");

  const { type } = props;

  useEffect(() => {
    const getCompetencies = async () => {
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
    let competencies = [];
    if (loading) {
      const setState = async () => {
        competencies = await getCompetencies();
        setData(competencies);
        setLoading(false);
      };
      setState();
    } else {
      const updateState = async () => {
        competencies = await getCompetencies();
        setData(competencies);
        setReset(false);
      };
      updateState();
    }
  }, [loading, reset]);

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleSubmitAdd = async (values) => {
    try {
      const url = backendAddress + "api/admin/options/" + type;

      await axios.post(url, {
        descriptionEn: values.addCompetencyEn,
        descriptionFr: values.addCompetencyFr,
        categoryId: 22,
      });

      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const handleSubmitEdit = async (values, id) => {
    try {
      const url = backendAddress + "api/admin/options/" + type + "/" + id;

      await axios.put(url, {
        descriptionEn: values.editCompetencyEn,
        descriptionFr: values.editCompetencyFr,
      });

      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

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

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      onSelectChange(selectedRowKeys);
    },
  };

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const convertToViewableInformation = () => {
    const description =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "descriptionEn"
        : "descriptionFr";

    let allCompetencies = _.sortBy(data, description);

    for (let i = 0; i < allCompetencies.length; i++) {
      allCompetencies[i].key = allCompetencies[i].id;
    }

    return allCompetencies;
  };

  document.title = getDisplayType(true) + " - Admin | I-Talent";

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <CompetencyTableView
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
      data={convertToViewableInformation()}
    />
  );
}

export default injectIntl(CompetencyTable);
