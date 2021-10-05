import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import dayjs from "dayjs";

import handleError from "../../../functions/handleError";
import {
  setAdminBugs,
  setAdminBugsLoading,
} from "../../../redux/slices/adminSlice";
import useAxios from "../../../utils/useAxios";
import BugsTableView from "./BugsTableView";

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
        createdAt: dayjs(bug.createdAt).format("lll"),
        key: bug.id,
        updatedAt: dayjs(bug.updatedAt).format("lll"),
        userId: bug.user.id,
        userName: bug.user.name,
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
