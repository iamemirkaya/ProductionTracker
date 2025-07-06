import { createApi } from '@reduxjs/toolkit/query/react'; 
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { CreateWorkshopRequest, Workshop } from "../../app/models/workshop";
import type { GetWorkshopsParams, PagedResponse } from '../../app/models/paged';


export const workshopApi = createApi({
  reducerPath: 'workshopApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Workshops'],
  endpoints: (builder) => ({
    getAllWorkshops: builder.query<PagedResponse<Workshop>, GetWorkshopsParams>({
      query: ({ page, pageSize }) =>
        `api/Workshop/WorkshopList?page=${page}&pageSize=${pageSize}`,
      providesTags: ['Workshops'],
    }),
    getWorkshopById: builder.query<Workshop, string>({
      query: (id) => `api/Workshop/GetWorkshopById/${id}`,
    }),
    createWorkshop: builder.mutation<void, CreateWorkshopRequest>({
      query: (requestData) => ({
        url: 'api/Workshop/CreateWorkshop',
        method: 'POST',
        body: requestData, 
      }),
      invalidatesTags: ['Workshops'],
    }),
    updateWorkshop: builder.mutation<void, Workshop>({
      query: (requestData) => ({
        url: 'api/Workshop/UpdateWorkshop',
        method: 'PUT',
        body: requestData,
      }),
      invalidatesTags: ['Workshops'],
    }),
    deleteWorkshop: builder.mutation<string, string>({
      query: (id) => ({
        url: `api/Workshop/DeleteWorkshop/${id}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
        }),
        invalidatesTags: ['Workshops'],
    })
  }),
});

export const {useGetAllWorkshopsQuery,useCreateWorkshopMutation,useUpdateWorkshopMutation,
  useDeleteWorkshopMutation,useGetWorkshopByIdQuery} = workshopApi;
