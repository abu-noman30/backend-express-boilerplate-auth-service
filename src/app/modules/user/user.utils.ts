export const generateIncrementedUserId = (id: string): string => {
	return (parseInt(id) + 1).toString();
};
