import { createAsyncThunk, createSlice, current, nanoid } from "@reduxjs/toolkit";
import { SocketService } from "../../services/SocketServices/SocketService";
import { WebService } from "../../services/WebServices/WebService";
// import showCardSession from "../reducers/showcard_session.reducer";
import reduxConstants from "../reduxConstants";

const webservice = new WebService();
export const rdCreateGame = createAsyncThunk('showcard/create', async (api, thunk) => {
    return await webservice.createGame(api);
});

const showcard_slice = createSlice({
    name: reduxConstants.SHOWCARD_SESSION.name,
    initialState: reduxConstants.SHOWCARD_SESSION.initialState,
    reducers:{
        clearStatus(state,action){
            console.log('pending lum ')
            state.process = "pending"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(rdCreateGame.pending, (state, { payload }) => {
            state.process = "pending"
        }).addCase(rdCreateGame.rejected, (state, { payload }) => {
            state.process = "rejected";
        }).addCase(rdCreateGame.fulfilled, (state, { payload }) => {
            if(payload?.status === 201){
                console.log('details ',  payload?.data)
                state.process = "fulfilled";
                state.isAdmin = payload.data?.isAdmin;
                state.serverDetails = {...payload?.data?.serverDetails};
                state.sessionDetails = payload?.data?.sessionDetails;
                state.members = payload?.data?.members;
                
            }else {
                state.process = "rejected";
                state.errorMsg = payload.data;
            }
            // console.log("Data => ", payload);
           ;
        })
    }
})

export const {clearStatus} = showcard_slice.actions;

export default showcard_slice.reducer;
