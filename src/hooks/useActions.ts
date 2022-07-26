import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./redux";
import { weatherActions } from "../redux/weatherSlice";

const allActions = {
  ...weatherActions,
};

const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(allActions, dispatch);
};

export default useActions;
