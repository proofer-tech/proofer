import { camelCase } from "lodash";

export function keysToCamelCase(obj: { [key: string]: any }): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: keysToCamelCase(obj[key]),
      }),
      {},
    );
  }
  return obj;
}
