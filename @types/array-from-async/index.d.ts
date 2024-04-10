declare module "array-from-async" {
  import { AsyncGeneratorReturnType } from "@/src/types/general";

  export default function arrayFromAsync<T>(
    iterable: ReturnType<T>,
  ): Promise<AsyncGeneratorReturnType<ReturnType<T>>>;
}
