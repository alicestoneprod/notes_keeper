import { configureStore } from "@reduxjs/toolkit"
import notesReducer from "./reducers/noteReducer"
export const store = configureStore({
  reducer: notesReducer,
})
