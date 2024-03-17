/*  
    ['page','limit','sortBy', 'orderBy']
    ['page=1', 'limit=10', 'sortBy=createdDate', 'orderBy=asc/desc'] 
*/

export const queryParamsPicker = <T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
  const finalObj: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};
