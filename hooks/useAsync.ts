import { useState, useCallback, useRef, useEffect } from "react";
import type { AsyncState } from "@/types";

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: () => Promise<T | null>;
  reset: () => void;
}

/**
 * Generic hook for managing async operations with loading / error / data state.
 * Safe against state updates after unmount and against out-of-order responses
 * (only the most recent call's result is applied).
 *
 * @example
 * const { data, loading, error, execute } = useAsync(() =>
 *   fetcher<ProductsResponse>("/api/products")
 * );
 *
 * useEffect(() => { execute(); }, [execute]);
 */
export function useAsync<T>(asyncFn: () => Promise<T>): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Always call the latest version of asyncFn without recreating execute
  const asyncFnRef = useRef(asyncFn);
  useEffect(() => {
    asyncFnRef.current = asyncFn;
  });

  // Guard against updates after unmount
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Guard against out-of-order responses: only the latest call's result wins
  const callIdRef = useRef(0);

  const execute = useCallback(async (): Promise<T | null> => {
    if (!mountedRef.current) return null;

    const callId = ++callIdRef.current;
    setState({ data: null, loading: true, error: null });

    try {
      const result = await asyncFnRef.current();
      if (mountedRef.current && callIdRef.current === callId) {
        setState({ data: result, loading: false, error: null });
      }
      return result;
    } catch (err) {
      if (mountedRef.current && callIdRef.current === callId) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      }
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    if (mountedRef.current) {
      setState({ data: null, loading: false, error: null });
    }
  }, []);

  return { ...state, execute, reset };
}
