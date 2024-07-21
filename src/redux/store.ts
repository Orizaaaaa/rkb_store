// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import reportReducer from './report/reportSlice';

export const store = configureStore({
    reducer: {
        report: reportReducer,
    },
});
