export interface FindAllResponse<T> {
  data: T[];
  metadata: {
    totalCount: number;
    pageCount: number;
    page: number;
    perPage: number;
    sortBy: string;
    sortOrder: string;
    keyword: string;
  };
}
