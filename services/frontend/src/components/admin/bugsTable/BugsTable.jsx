import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import BugsTableView from "./BugsTableView";
import {
  setAdminBugs,
  setAdminBugsLoading,
} from "../../../redux/slices/adminSlice";
import useAxios from "../../../utils/useAxios";
import dayjs from "dayjs";
import handleError from "../../../functions/handleError";

const BugsTable = () => {
  const axios = useAxios();
  const history = useHistory();
  const dispatch = useDispatch();

  const getBugs = useCallback(async () => {
    try {
      dispatch(setAdminBugsLoading(true));

      const results = await axios.get(`api/bugs`);

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((bug) => ({
        ...bug,
        key: bug.id,
        createdAt: dayjs(bug.createdAt).format("YYYY-MM-DD"),
        updatedAt: dayjs(bug.updatedAt).format("YYYY-MM-DD"),
        userName: bug.user.fullname,
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

  return <BugsTableView />;
};

export default BugsTable;
