export type T_ApiResponse<T> = {
	statusCode: number;
	success: boolean;
	message?: string | null;
	meta?: {
		page: number;
		limit: number;
		total: number;
	};
	data?: T | null;
};
