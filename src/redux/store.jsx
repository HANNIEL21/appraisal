import { configureStore, combineReducers   } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import { authSlice } from "./features/Auth";
import { dashboardSlice } from "./features/Dashboard";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    dashboard: dashboardSlice.reducer,
})

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);