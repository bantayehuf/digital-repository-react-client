import {
    combineReducers
} from "redux";
import dataTableSelectRowsReducer from "../../root-app/state_slice/dataTableSelectedRows";

const repositoryReducers = combineReducers({
    dataTableSelectRows: dataTableSelectRowsReducer
});

export default repositoryReducers;