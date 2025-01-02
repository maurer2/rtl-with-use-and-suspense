export default async function getData(offset: number, limit: number): Promise<number[]> {
  const { promise, resolve, reject } = Promise.withResolvers<number[]>();

  if (offset < 0) {
    reject(new Error('Offset must be greater than or equal to 0'));
  }

  setTimeout(() => {
    const numbers = Array.from({ length: limit + 1 }, (_, index) => index + offset);

    resolve(numbers);
  }, 3000);

  return promise;
}
