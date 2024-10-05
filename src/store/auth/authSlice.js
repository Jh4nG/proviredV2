import { createSlice } from "@reduxjs/toolkit";

export const authSlide = createSlice({
    name: 'auth',
    initialState:{
        status : 'logout',
        data : {},
        user: null,
        tipousuario: null,
        token : null
    },

    reducers : {
        setToken : (state, {payload}) => {
            state.token = payload
        }, 

        obtenerUsuarioAdmin : (state, {payload}) => {
            state.status = 'autenticado',
            state.user = payload.user,
            state.tipousuario = payload.tipousuario,
            state.data = payload.data
        },

        logout : (state) => {
            state.status = 'logout',
            state.user = null,
            state.tipousuario = null,
            state.data = null,
            state.token = null
        }
    }
});

export const { setToken, obtenerUsuarioAdmin, logout } = authSlide.actions;
export default authSlide.reducer;