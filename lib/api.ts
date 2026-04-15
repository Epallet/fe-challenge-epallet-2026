/** Thrown when an API response has a non-OK HTTP status. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message?: string
  ) {
    super(message ?? `API error ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

type Params = Record<string, string | number | boolean | undefined | null>;

/**
 * Typed fetch wrapper. Builds a URL from path + params, parses JSON as T,
 * and throws ApiError on non-OK responses.
 *
 * @example
 * const data = await fetcher<ProductsResponse>("/api/products", { category: "Beverages" });
 */
export async function fetcher<T>(
  path: string,
  params?: Params,
  init?: RequestInit
): Promise<T> {
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env["NEXT_PUBLIC_APP_URL"] ?? "http://localhost:3000";

  const url = new URL(path, base);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return response.json() as Promise<T>;
}
