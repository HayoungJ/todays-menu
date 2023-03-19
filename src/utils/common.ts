export const createQuery = (querys: { key: string, value: any }[]): string => {
  const result = querys.reduce((result, query) => {
    if (query.value) result += `${query.key}=${query.value}&`;
    return result;
  }, ''); 
  return result.slice(0, -1);
}