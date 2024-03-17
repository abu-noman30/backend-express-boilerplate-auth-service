import { T_PaginationOptions, T_PaginationOptionsResult } from './calculatePagination.d';

export const calculatePagination = (query: T_PaginationOptions): T_PaginationOptionsResult => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || 'createdAt';
  const orderBy = query.orderBy || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    orderBy
  };
};
