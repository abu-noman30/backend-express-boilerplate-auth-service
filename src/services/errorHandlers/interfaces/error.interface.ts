export type T_GenericErrorMessage = {
	path: string | number;
	message: string;
};

export type T_GenericErrorResponse = {
	statusCode: number;
	message: string;
	errorMessages: T_GenericErrorMessage[];
};
