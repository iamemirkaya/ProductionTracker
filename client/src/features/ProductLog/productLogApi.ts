import { createApi } from '@reduxjs/toolkit/query/react'; 
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type {ProductLog} from '../../app/models/ProductionLog';


type ProductLogParams = {
  workshopId?: string;
  shiftId?: string;
  productId?: string; 
};

export const productLogApi = createApi({
  reducerPath: 'productLogApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['ProductLogs'],
  endpoints: (builder) => ({
    getAllProductLogs: builder.query<ProductLog[], ProductLogParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();     
        if (params?.workshopId) queryParams.append('WorkshopId', params.workshopId);
        if (params?.shiftId) queryParams.append('ShiftId', params.shiftId);
        if (params?.productId) queryParams.append('ProductId', params.productId);

        return `api/ProductionLog/ProductionLogList?${queryParams.toString()}`;
      },
      providesTags: ['ProductLogs'],
    }),   
  }),
});

// Artık hook'umuz parametre alabiliyor.
export const { useGetAllProductLogsQuery } = productLogApi;