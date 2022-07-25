import { useAppDispatch } from "./redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { weatherActions } from "../redux/weatherSlice";

const allActions = {
    ...weatherActions
}

export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(allActions, dispatch);
}