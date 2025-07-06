import { createApi } from '@reduxjs/toolkit/query/react'; 
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { CreateShiftRequest, Shift } from '../../app/models/shift';


export const shiftApi = createApi({
  reducerPath: 'shiftApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Shifts'],
  endpoints: (builder) => ({
    getAllShifts: builder.query<Shift[], void>({
      query: () => 'api/Shift/ShiftList',
       providesTags: ['Shifts'],
    }),
    getShiftById: builder.query<Shift, string>({
      query: (id) => `api/Shift/GetShiftById/${id}`,
    }),
    createShift: builder.mutation<void, CreateShiftRequest>({
      query: (requestData) => ({
        url: 'api/Shift/CreateShift',
        method: 'POST',
        body: requestData, 
      }),
      invalidatesTags: ['Shifts'],
    }),
    updateShift: builder.mutation<void, Shift>({
      query: (requestData) => ({
        url: 'api/Shift/UpdateShift',
        method: 'PUT',
        body: requestData,
      }),
      invalidatesTags: ['Shifts'],
    }),
    deleteShift: builder.mutation<string, string>({
      query: (id) => ({
        url: `api/Shift/DeleteShift/${id}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
        }),
        invalidatesTags: ['Shifts'],
    })
  }),
});

export const {useGetAllShiftsQuery,useCreateShiftMutation,useUpdateShiftMutation,
  useDeleteShiftMutation,useGetShiftByIdQuery} = shiftApi;