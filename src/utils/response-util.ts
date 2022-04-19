export const resStructure = (
  code: number,
  value: any,
  error: any = "",
  errorCode: string = ""
) => {
  error = error.message ? error.message : error;
  return { data: value, meta: { message: error, errorCode: errorCode }, code };
};
