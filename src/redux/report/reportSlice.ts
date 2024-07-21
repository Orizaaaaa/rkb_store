import { createSlice } from '@reduxjs/toolkit';

const reportSlice = createSlice({
    name: 'report',
    initialState: {
        reportList: [],
    },
    reducers: {
        addReport: (state, action) => {
            state.reportList = action.payload;
        },
    }
});

export const { addReport } = reportSlice.actions;
export default reportSlice.reducer;
