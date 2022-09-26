import { combineReducers, configureStore } from "@reduxjs/toolkit";
import showcard_slice from "./features/showcard_slice";

const allReducers = combineReducers({
    showcard_session_data: showcard_slice
});

const store = configureStore({
   reducer: allReducers
});

export default store;