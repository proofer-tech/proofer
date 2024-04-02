declare module "array-from-async" {
  export default function arrayFromAsync<T>(
    iterable: ReturnType<T>,
  ): Promise<AsyncGeneratorReturnType<ReturnType<T>>>;
}
