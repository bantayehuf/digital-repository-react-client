import {
    createSlice
} from "@reduxjs/toolkit";

export const dataTableSelectedRows = createSlice({
    name: "dataTableSelectedRows",
    initialState: {
        totalSelectedRows: 0,
        selectedRows: []
    },
    reducers: {
        selectedRowsChangeHandler: (state, action) => {
            state.totalSelectedRows = action.payload.totalSelectedRows;
            state.selectedRows= action.payload.selectedRows;
        }
    }
});

export const {
    selectedRowsChangeHandler
} = dataTableSelectedRows.actions;
export default dataTableSelectedRows.reducer;