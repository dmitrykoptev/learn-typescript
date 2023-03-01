import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Country } from "models/country";
import { Extra } from "models/extra";
import { Status } from "models/status";

export const loadCountryByName = createAsyncThunk<
  { data: Country[] },
  string,
  { extra: Extra }
>("@@details/load-country-by-name", (name, { extra: { client, api } }) => {
  return client.get(api.searchByCountry(name));
});
export const loadNeighborsByBorder = createAsyncThunk<
  { data: Country[] },
  string[],
  { extra: Extra }
>("@@details/load-neighbors", (borders, { extra: { client, api } }) => {
  return client.get(api.filterByCode(borders));
});

type InitialState = {
  currentCountry: Country | null;
  neighbors: string[];
  status: Status;
  error: string | null;
};

const initialState: InitialState = {
  currentCountry: null,
  neighbors: [],
  status: "idle",
  error: null,
};

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state) => {
        state.status = "rejected";
        state.error = "Cannot load data";
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        state.neighbors = action.payload.data.map((country) => country.name);
      });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;
