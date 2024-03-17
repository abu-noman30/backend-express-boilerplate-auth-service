import { SortOrder } from 'mongoose';

export type T_PaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: number | string;
  orderBy?: SortOrder;
};

export type T_PaginationOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: number | string;
  orderBy: SortOrder;
};
