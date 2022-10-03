import { createAsyncThunk, createSlice, current, } from "@reduxjs/toolkit";
import { WebService } from "../../services/WebServices/WebService";
// import showCardSession from "../reducers/showcard_session.reducer";
import reduxConstants from "../reduxConstants";

const webservice = new WebService();
export const rdCreateGame = createAsyncThunk('showcard/create', async (api, thunk) => {

    return await webservice.createGame(api);
});

export const rdJoinGame = createAsyncThunk('showcard/join', async (api, thunk) => {
    const newApi = { ...api }
    const ws = new WebService(newApi?.socketService);
    return await ws.joinGame(newApi);
});

const showcard_slice = createSlice({
    name: reduxConstants.SHOWCARD_SESSION.name,
    initialState: reduxConstants.SHOWCARD_SESSION.initialState,
    reducers: {
        clearStatus(state, action) {
            state.process = "pending"
        },
        clearData(state, action) {
            state.process = "pending";
            state.isAdmin = null
            state.serverDetails = {};
            state.sessionDetails = {};
            state.members = [];
            state.chatID = "";
            state.errorMsg = "";
        },
        saveData(state, { payload }) {
            state.process = "fulfilled";
            state.isAdmin = payload?.body?.isAdmin;
            state.serverDetails = { ...payload?.body?.serverDetails };
            state.sessionDetails = payload?.body?.sessionDetails;
            state.members = payload?.body?.members;
            state.chatID = payload?.body?.chatid;
            state.errorMsg = "Server created successfully!";
        },
        addMember(state, { payload }) {
            state.members.push(payload)
        }, addMembers(state, { payload }) {
            state.members = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(rdCreateGame.pending, (state, { payload }) => {
            state.process = "pending"
        }).addCase(rdCreateGame.rejected, (state, { payload }) => {
            state.process = "rejected";
        }).addCase(rdCreateGame.fulfilled, (state, { payload }) => {
            if (payload?.status === 201) {
                console.log('details ', payload?.data)
                state.process = "fulfilled";
                state.isAdmin = payload.data?.isAdmin;
                state.serverDetails = { ...payload?.data?.serverDetails };
                state.sessionDetails = payload?.data?.sessionDetails;
                state.members = payload?.data?.members;
                state.chatID = payload?.data?.chatID;
                state.errorMsg = "Server created successfully!";
            } else {
                state.process = "rejected";
                state.errorMsg = payload.data;
            }
            ;
        }).addCase(rdJoinGame.pending, (state, { payload }) => {
            state.process = "pending"
        }).addCase(rdJoinGame.rejected, (state, { payload }) => {
            state.process = "rejected";
        }).addCase(rdJoinGame.fulfilled, (state, { payload }) => {
            if (payload?.status === 201) {
                console.log('details ', payload?.data)
                state.process = "fulfilled";
                state.isAdmin = payload?.data?.body?.isAdmin;
                state.serverDetails = { ...payload?.data?.body?.serverDetails };
                state.sessionDetails = payload?.data?.body?.sessionDetails;
                state.members = payload?.data?.body?.members;
                state.errorMsg = "Hey you have joined server!";

            } else {
                state.process = "rejected";
                state.errorMsg = payload.data;
            }
            ;
        })
    }
})

export const { clearStatus, clearData, saveData, addMember, addMembers } = showcard_slice.actions;

export default showcard_slice.reducer;
