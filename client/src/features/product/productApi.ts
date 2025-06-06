import { createApi } from '@reduxjs/toolkit/query/react'; 

import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Product } from "../../app/models/product";


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => 'api/Product/ProductList',
    }),
    addProduct: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'api/Product/CreateProduct',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {useGetAllProductsQuery,useAddProductMutation} = productApi;