import { createApi } from '@reduxjs/toolkit/query/react'; 
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Product } from "../../app/models/product";


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => 'api/Product/ProductList',
       providesTags: ['Products'],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `api/Product/GetProductById/${id}`,
    }),
    addProduct: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'api/Product/CreateProduct',
        method: 'POST',
        body: formData,
      }),
    }),
    updateProduct: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'api/Product/UpdateProduct',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<string, string>({
      query: (id) => ({
        url: `api/Product/DeleteProduct/${id}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
        invalidatesTags: ['Products'],
    }),
  }),
});

export const {useGetAllProductsQuery,useAddProductMutation,useUpdateProductMutation,
  useDeleteProductMutation,useGetProductByIdQuery} = productApi;