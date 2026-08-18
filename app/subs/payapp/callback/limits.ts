export const MAX_BODY_BYTES = 64 * 1024;

export function isBodyTooLarge(rawBody: string): boolean {
  return Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES;
}
