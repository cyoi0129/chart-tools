import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { ChartItemType, ChartListStore } from "../app/types";
import { fetchChartList, removeChart } from "../app/db";
import Cookies from 'js-cookie';

const currentUser: string = String(Cookies.get("firebase_user"));

const initialState: ChartListStore = {
  error: false,
  updated: false,
  charts: []
};

export const getChartList = createAsyncThunk(
  "ChartList/fetchChartList",
  async () => {
    const response = fetchChartList();
    return response;
  }
);

export const deleteChart = createAsyncThunk(
  "ChartList/deleteChart",
  async (id: string) => {
    const response = removeChart(id);
    return response;
  }
);

export const ChartListSlice = createSlice({
  name: "ChartList",
  initialState: initialState,
  reducers: {
    updateChartSlice: (state, action) => {
      state.charts = state.charts.filter(item => item.id !== action.payload.id);
      state.charts = [...state.charts, action.payload];
    },
    addChartSlice: (state, action) => {
      state.charts = [...state.charts, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChartList.fulfilled, (state, action) => {
      state.updated = true;
      state.error = false;
      state.charts = action.payload;
    });
    builder.addCase(deleteChart.fulfilled, (state, action) => {
      state.updated = true;
      state.error = false;
      state.charts = state.charts.filter(item => item.id !== action.payload);
    });
    builder.addCase(getChartList.rejected, (state) => {
      state.updated = false;
      state.error = true;
    });
    builder.addCase(deleteChart.rejected, (state) => {
      state.updated = false;
      state.error = true;
    });
    builder.addCase(getChartList.pending, (state) => {
    });
    builder.addCase(deleteChart.pending, (state) => {
    });
  },
});


export default ChartListSlice.reducer;
export const { updateChartSlice, addChartSlice } = ChartListSlice.actions;
export const selectChartList = (state: RootState) => state.ChartList;
export const selectChartById = (chartID: string) => {
  return createSelector(selectChartList, (state) => {
    const chartList: ChartItemType[] = state.charts;
    return chartList.find(chart => chart.id === chartID);
  })
}