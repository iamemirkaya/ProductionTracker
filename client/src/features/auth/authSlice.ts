import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../app/models/authTypes";
import { jwtDecode } from 'jwt-decode';
import type { RootState } from "../../app/store/store";
import { authApi } from "./authApi";


interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}


const token = localStorage.getItem('token');

const getInitialUser = (): User | null => {
    if (!token) return null;
    const decoded = jwtDecode<{ email: string; role: string | string[] }>(token);
    return {
        email: decoded.email,
        roles: Array.isArray(decoded.role) ? decoded.role : [decoded.role]
    };
};


const initialState: AuthState = {
  token: token,
  user: getInitialUser(), 
  isAuthenticated: !!token,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    logout: (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token'); 
    }

  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        const decoded = jwtDecode<{ email: string; role: string | string[] }>(payload.token);

        state.token = payload.token;
        state.isAuthenticated = true;
        state.user = {
            email: decoded.email,
            roles: Array.isArray(decoded.role) ? decoded.role : [decoded.role]
        };
        localStorage.setItem('token', payload.token);
    });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;