import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { transformKey } from "../../public/config";
import { applyMiddleware, combineReducers, compose, createStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import persistReducer from "redux-persist/es/persistReducer";
import { thunk } from "redux-thunk";

const persistConfig = {
    key : 'root',
    storage,
    transforms: [encryptTransform({secretKey : transformKey, onError : ()=>{}})]
}

const rootReducer = combineReducers({
    usuarioState : authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = (process.env.NODE_ENV === 'developmoent' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
)