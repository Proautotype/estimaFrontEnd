import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WebService } from "../../services/WebServices/GameWebService";
// import showCardSession from "../reducers/showcard_session.reducer";
import reduxConstants from "../reduxConstants";
const _state = {
    serverDetails: {
        server: "",
        serverLink: ""
    },
    sessionDetails: {
        name: "",
        state: "",
        index: ""
    }, memberDetails: {
        chatID: "",
        members: [],
        isAdmin: false,
    },
    process: "pending",
    errorMsg: ""
}

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
    // initialState: reduxConstants.SHOWCARD_SESSION.initialState,
    initialState: _state,
    reducers: {
        clearStatus(state, action) {
            state.process = "pending"
        },
        clearData(state, action) {
            state.process = "pending";
            state.isAdmin = null
            state.serverDetails = {};
            state.sessionDetails = {};
            state.memberDetails = {
                chatID: "",
                isAdmin: false,
                members: []
            }
            state.errorMsg = "";
        },
        saveData(state, { payload }) {
            state.process = "fulfilled";
            state.serverDetails = { ...payload?.body?.serverDetails };
            state.sessionDetails = payload?.body?.sessionDetails;
            state.memberDetails = {
                chatID: payload?.body?.chatid,
                isAdmin: payload?.body?.isAdmin,
                members: []
            }
            state.errorMsg = "Server created successfully!";
        },
        addMember({ memberDetails }, { payload }) {
            const profile = memberDetails['members'].find((value) =>
                value.chatID === payload?.chatID);
            if (profile === undefined) {
                memberDetails['members'] = [...memberDetails['members'], payload];
                memberDetails['members'].map((data) => {
                    if (data.chatID === memberDetails['chatID']) {
                        data.memberName = "Me"
                    }
                    return data
                });
            }
        }, addMembers({ memberDetails }, { payload }) {
            // state.members = payload;
            memberDetails['members'] = [...payload];
            // put the current user first, and then sort by username
            memberDetails['members'].sort((a, b) => {
                if (a?.chatID === memberDetails['chatID']) return -1;
                if (b?.chatID === memberDetails['chatID']) return 1;
                if (a?.chatID < b?.chatID) return -1;
                return a?.chatID > b?.chatID ? 1 : 0;
            })
        },
        memberCast(state, { payload }) {
            const memberIndex = state['memberDetails']['members'].findIndex((value, idx) => value.chatID === payload?.chatID);
            if (memberIndex !== -1) {
                const selectedMember = state['memberDetails']['members'][memberIndex];
                state['memberDetails']['members'][memberIndex] = { ...selectedMember, scorecard: payload?.scorecard }
            }
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

export const { clearStatus, clearData, saveData, addMember, addMembers, memberCast } = showcard_slice.actions;

export default showcard_slice.reducer;
