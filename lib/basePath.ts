/**
 * Returns the configured basePath at runtime.
 * Next.js injects this into the client bundle automatically.
 */
export function getBasePath(): string {
  return process.env.__NEXT_ROUTER_BASEPATH || '';
}
