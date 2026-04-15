import { LoadingState } from "@/components/feedback/LoadingState";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingState message="Loading…" />
    </div>
  );
}
