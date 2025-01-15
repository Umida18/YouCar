import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slices/carsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
