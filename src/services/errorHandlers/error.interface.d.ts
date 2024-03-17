export type T_ErrorMessages = {
  path: string | number;
  message: string;
};

export type T_ErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: T_ErrorMessages[];
};
