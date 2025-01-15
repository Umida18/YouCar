import { ICar } from "../../Type/Type";
import api from "../../Api/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const response = await api.get("/cars");
  return response.data;
});

interface CarsState {
  cars: ICar[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CarsState = {
  cars: [],
  status: "idle",
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default carsSlice.reducer;
