import { NextRequest } from "next/server";

type GeneratorReturnType<T extends Generator> =
  T extends Generator<any, infer R, any> ? R : never;
type AsyncGeneratorReturnType<T extends AsyncGenerator> =
  T extends AsyncGenerator<infer R> ? R[] : never;

export interface PageProps {
  params: Record<string, any | string | string[]>;
  searchParams: Record<string, any | string | string[]>;
}
export interface NextHandlerContext {
  params: Record<string, any | string | string[]>;
}

export type NextHandler = (
  req: NextRequest,
  ctx: NextHandlerContext,
) => Promise<Response> | Response;
