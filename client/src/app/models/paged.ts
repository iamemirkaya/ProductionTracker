export interface PagedResponse<T> {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export interface GetWorkshopsParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
}