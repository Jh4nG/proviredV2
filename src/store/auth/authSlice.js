import { createSlice } from "@reduxjs/toolkit";

export const authSlide = createSlice({
    name: 'auth',
    initialState:{
        status : 'logout',
        data : {
            token : '',
            expiracion : ''
        },
        userInfo : {
            user: '',
            tipousuario: '',
            nombre: '',
            estado: '',
            tipo_cliente: '',
            infodespachos: '',
            misprocesosauto: '',
            avisosderemate: '',
            historialprocesos: '',
            misprocesosalerta: '',
            misprocesos: '',
            misprocesospremium: '',
            duracionsuscripcion: '',
            informe_procesal: '',
            group_users: '',
            parent: '',
        }
    },

    reducers : {
        obtenerUsuario : (state, {payload}) => {
            state.status = 'autenticado',
            state.user = payload.user,
            state.tipousuario = payload.tipousuario,
            state.nombre = payload.data.nombre,
            state.estado = payload.data.estado,
            state.tipo_cliente = payload.data.tipo_cliente,
            state.infodespachos = payload.data.infodespachos,
            state.misprocesosauto = payload.data.misprocesosauto,
            state.avisosderemate = payload.data.avisosderemate,
            state.historialprocesos = payload.data.historialprocesos,
            state.misprocesosalerta = payload.data.misprocesosalerta,
            state.misprocesos = payload.data.misprocesos,
            state.misprocesospremium = payload.data.misprocesospremium,
            state.duracionsuscripcion = payload.data.duracionsuscripcion,
            state.informe_procesal = payload.data.informe_procesal,
            state.group_users = payload.data.group_users,
            state.parent = payload.data.parent
        },

        logout : (state) => {
            state.status = 'logout',
            state.user = null,
            state.tipousuario = null,
            state.nombre = null,
            state.estado = null,
            state.tipo_cliente = null,
            state.infodespachos = null,
            state.misprocesosauto = null,
            state.avisosderemate = null,
            state.historialprocesos = null,
            state.misprocesosalerta = null,
            state.misprocesos = null,
            state.misprocesospremium = null,
            state.duracionsuscripcion = null,
            state.informe_procesal = null,
            state.group_users = null,
            state.parent = null
        }
    }
});

export const { obtenerUsuario, logout } = authSlide.actions;
export default authSlide.reducer;