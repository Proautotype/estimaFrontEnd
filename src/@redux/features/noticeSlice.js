import { createSlice, nanoid } from "@reduxjs/toolkit";
import reduxConstants from "../reduxConstants";
const notices = [
    ];
const noticeSlice = createSlice({
    initialState: notices,
    name: "notice-board-slice",
    reducers: {
        addNotice(state, { payload }) {
            state.push(payload);
        },
        removeNotice(state, { payload }) {

            state.push(payload);
        },
    }
})

export const { addNotice, removeNotice } = noticeSlice.actions;
export default noticeSlice;