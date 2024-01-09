export const wait = async (ms: number) => {
  return await new Promise<void>(resolve => setTimeout(resolve, ms));
};
