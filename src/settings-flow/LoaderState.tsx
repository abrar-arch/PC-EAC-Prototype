type LoaderStateProps = {
  message?: string;
  subtext?: string;
};

export function LoaderState({
  message = "Signing you in...",
  subtext = "This may take a few seconds.",
}: LoaderStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-sf-line border-t-sf-brand"
        role="status"
        aria-label="Loading"
      />
      <div className="space-y-1">
        <p className="text-fig-body font-semibold text-sf-ink">{message}</p>
        <p className="text-fig-body text-sf-muted">{subtext}</p>
      </div>
    </div>
  );
}
