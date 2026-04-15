"use client";

import { ErrorState } from "@/components/feedback/ErrorState";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ErrorState
        title="Something went wrong"
        message={
          error.message || "An unexpected error occurred. Please try again."
        }
        onRetry={reset}
      />
    </div>
  );
}
