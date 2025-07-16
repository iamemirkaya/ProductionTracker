import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import type { RootState } from "../store/store";

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));



const customBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
    
});




export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, 
    extraOptions: object) => {

    api.dispatch(startLoading());
    await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());  
    return result;       
    }