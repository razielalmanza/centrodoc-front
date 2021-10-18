interface Page {
  take: number,
  skip: number,
}
export const calculatePage = (pageSize: number, page: number) => {
  return { 
    take: pageSize,
    skip: (page -1) * pageSize,
  } as Page;
}