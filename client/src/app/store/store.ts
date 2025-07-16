import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../layout/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { productApi } from "../../features/product/productApi";
import { listenerMiddleware } from "../middleware/listenerMiddleware";
import { workshopApi } from "../../features/workshop/workshopApi";
import { shiftApi } from "../../features/shift/shiftApi";
import { productLogApi } from "../../features/ProductLog/productLogApi";
import workshopReducer from '../../features/workshop/workshopSlice';
import { authApi } from "../../features/auth/authApi";
import authReducer from "../../features/auth/authSlice";

export const store = configureStore({
    reducer: {        
        [productApi.reducerPath]: productApi.reducer, 
        [workshopApi.reducerPath]: workshopApi.reducer,
        [shiftApi.reducerPath]: shiftApi.reducer,
        [productLogApi.reducerPath]: productLogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        ui: uiSlice.reducer, 
        workshop: workshopReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(
            productApi.middleware,
            workshopApi.middleware,
            shiftApi.middleware,
            productLogApi.middleware,
            authApi.middleware
        ), 
    
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()