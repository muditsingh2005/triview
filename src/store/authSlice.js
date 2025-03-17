import { createSlice } from "@reduxjs/toolkit"

//to track auth status

const initialStatus = {
    status : false,
    userData : null

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        login : (state , action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        logout : (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login , logout} = authSlice.action;

export default authSlice.reducer;