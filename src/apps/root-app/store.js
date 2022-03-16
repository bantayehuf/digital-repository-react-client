import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import mainNavBarReducer from "./redux_slice/mainNavSlice";
import dataTableSelectRowsReducer from "./redux_slice/dataTableSelectedRowsSlice";

const rootAppReducers = combineReducers({
    mainNav: mainNavBarReducer,
    dataTableSelectRows: dataTableSelectRowsReducer
});

export const store = configureStore({
    reducer: {
        rootApp: rootAppReducers,
        // repository: repositoryReducers
    }
});