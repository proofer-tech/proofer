type GeneratorReturnType<T extends Generator> =
  T extends Generator<any, infer R, any> ? R : never;
type AsyncGeneratorReturnType<T extends AsyncGenerator> =
  T extends AsyncGenerator<infer R> ? R[] : never;
