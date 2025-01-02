export default async function getData(offset: number, limit: number): Promise<number[]> {
  const { promise, resolve } = Promise.withResolvers<number[]>();

  setTimeout(() => {
    const numbers = Array.from({ length: limit + 1 }, (_, index) => index + offset);

    resolve(numbers);
  }, 2500);

  return promise;
}
