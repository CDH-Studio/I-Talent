/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import CompetencyTableView from "./CompetencyTableView";
import config from "../../../config";
import { IntlPropType } from "../../../customPropTypes";

const { backendAddress } = config;

/**
 *  CompetencyTable(props)
 *  Controller for the CompetencyTableView.
 *  It gathers the required data for rendering the component.
 */
const CompetencyTable = ({ intl, type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";

  /* get competency information */
  const getCompetencies = useCallback(async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/admin/options/${type}`
      );
      return results.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  }, [type]);

  /* useEffect will run if statement, when the component is mounted */
  /* useEffect will run else statement, if an addition, update/edit or deletion occurs in the table */
  useEffect(() => {
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
  }, [getCompetencies, loading, reset]);

  /* get part of the title for the page */
  const getDisplayType = (plural) => {
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
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  /* handles addition of a competency */
  const handleSubmitAdd = async (values) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}`;

      await axios.post(url, {
        descriptionEn: values.addCompetencyEn,
        descriptionFr: values.addCompetencyFr,
        categoryId: 22,
      });

      setReset(true);
      return 1;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  /* handles the update/edit of a competency */
  const handleSubmitEdit = async (values, id) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}/${id}`;

      await axios.put(url, {
        descriptionEn: values.editCompetencyEn,
        descriptionFr: values.editCompetencyFr,
      });

      setReset(true);
      return 1;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  /* handles the deletion of a competency */
  const handleSubmitDelete = async () => {
    try {
      const url = `${backendAddress}api/admin/delete/${type}`;

      await axios.post(url, { ids: selectedRowKeys });

      setSelectedRowKeys([]);
      setReset(true);
      return 1;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  /* helper function to rowSelection */
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = (selectedRowKeys) => {
    // Can access the keys of each competency selected in the table
    setSelectedRowKeys(selectedRowKeys);
  };

  /* handles row selection in the table */
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      onSelectChange(selectedRowKeys);
    },
  };

  /* configures data from backend into viewable data for the table */
  const convertToViewableInformation = () => {
    // Allows for sorting of data between French/English in terms of description:
    const description =
      intl.formatMessage({ id: "language.code" }) === "en"
        ? "descriptionEn"
        : "descriptionFr";

    const allCompetencies = _.sortBy(data, description);

    for (let i = 0; i < allCompetencies.length; i += 1) {
      allCompetencies[i].key = allCompetencies[i].id;
    }

    return allCompetencies;
  };

  document.title = `${getDisplayType(true)} - Admin | I-Talent`;

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

CompetencyTable.propTypes = {
  intl: IntlPropType,
  type: PropTypes.string.isRequired,
};

CompetencyTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(CompetencyTable);
