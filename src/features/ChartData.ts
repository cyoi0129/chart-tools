import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { ChartDataStore, ChartItemType, ChartItemDataType } from "../app/types";
import { newChart, updateChart } from "../app/db";
import Cookies from 'js-cookie';

const currentUser: string = String(Cookies.get("firebase_user"));
const initialState: ChartDataStore = {
  updated: false,
  error: false,
  id: null,
  author: "",
  name: "",
  created: "",
  note: "",
  isPublic: false,
  data: [],
  option: null
};

export const addChart = createAsyncThunk(
  "ChartList/addChart",
  async (chart: ChartItemDataType) => {
    const response = newChart(chart);
    return response;
  }
);

export const reviseChart = createAsyncThunk(
  "ChartList/reviseChart",
  async (chart: ChartItemType) => {
    const response = updateChart(chart);
    return response;
  }
);

export const ChartDataSlice = createSlice({
  name: "ChartData",
  initialState: initialState,
  reducers: {
    setChartItemSlice: (state, action) => {
      state.id = action.payload.id;
      state.author = action.payload.author;
      state.created = action.payload.created;
      state.note = action.payload.note;
      state.name = action.payload.name;
      state.isPublic = action.payload.isPublic;
      state.data = action.payload.data;
      state.option = action.payload.option;
    },
    setChartDataSlice: (state, action) => {
      state.data = action.payload;
    },
    setChartOptionSlice: (state, action) => {
      state.option = action.payload;
      state.name = action.payload.title;
    },
    setChartMemoSlice: (state, action) => {
      state.note = action.payload.note;
      state.isPublic = action.payload.isPublic;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addChart.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.author = action.payload.author;
      state.created = action.payload.created;
      state.note = action.payload.note;
      state.name = action.payload.name;
      state.isPublic = action.payload.isPublic;
      state.data = action.payload.data;
      state.option = action.payload.option;
    });
    builder.addCase(reviseChart.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.author = action.payload.author;
      state.created = action.payload.created;
      state.note = action.payload.note;
      state.name = action.payload.name;
      state.isPublic = action.payload.isPublic;
      state.data = action.payload.data;
      state.option = action.payload.option;
    });
    builder.addCase(addChart.rejected, (state) => {
      state.updated = false;
      state.error = true;
    });
    builder.addCase(reviseChart.rejected, (state) => {
      state.updated = false;
      state.error = true;
    });
    builder.addCase(addChart.pending, (state) => {
    });
    builder.addCase(reviseChart.pending, (state) => {
    });
  },
});

export default ChartDataSlice.reducer;
export const { setChartItemSlice, setChartDataSlice, setChartOptionSlice, setChartMemoSlice } =
  ChartDataSlice.actions;
export const selectChartData = (state: RootState) => state.ChartData;
