import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        jwt_token: null,
        userData: null
    },
    reducers: {
        setLoginAction: (state, action)=>{
            return action.payload;
        },
        setLogoutAction: () => {
            localStorage.clear();
            return{
                ...state,
                jwt_token: null,
                userData: null                
            }
        }
    }
})

export const {setLoginAction, setLogoutAction} = authSlice.actions;

export default authSlice.reducer;