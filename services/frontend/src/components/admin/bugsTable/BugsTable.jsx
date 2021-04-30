import { useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import dayjs from "dayjs";
import BugsTableView from "./BugsTableView";
import {
  setAdminBugs,
  setAdminBugsLoading,
} from "../../../redux/slices/adminSlice";
import useAxios from "../../../utils/useAxios";
import handleError from "../../../functions/handleError";

const BugsTable = () => {
  const axios = useAxios();
  const history = useHistory();
  const dispatch = useDispatch();

  const saveDataToDB = async (unalteredValues, id) => {
    const values = { ...unalteredValues };

    if (!values.githubIssue || values.githubIssue.length === 0) {
      delete values.githubIssue;
    }

    await axios.put(`bugs/${id}`, values);
  };

  const getBugs = useCallback(async () => {
    try {
      dispatch(setAdminBugsLoading(true));

      const results = await axios.get(`bugs`);

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((bug) => ({
        ...bug,
        key: bug.id,
        createdAt: dayjs(bug.createdAt).format("lll"),
        updatedAt: dayjs(bug.updatedAt).format("lll"),
        userName: bug.user.name,
        userId: bug.user.id,
      }));

      dispatch(setAdminBugs(formattedData));
    } catch (error) {
      handleError(error, "redirect", history);
    }
  }, [axios, dispatch, history]);

  useEffect(() => {
    getBugs();
  }, [getBugs]);

  return <BugsTableView getBugs={getBugs} saveDataToDB={saveDataToDB} />;
};

export default BugsTable;
