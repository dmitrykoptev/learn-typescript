import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "dark" | "light";

const themeSlice = createSlice({
  name: "@@theme",
  initialState: "light" as Theme,
  reducers: {
    setTheme: (_, action: PayloadAction<Theme>) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
