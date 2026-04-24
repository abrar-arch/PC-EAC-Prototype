type SuccessStateProps = {
  calendarName: string;
  subtitle?: string;
};

export function SuccessState({ calendarName, subtitle }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sf-brand-tint text-sf-brand ring-1 ring-sf-brand/20">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 12L10.5 16.5L18 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="space-y-2">
        <p className="text-fig-h2 text-sf-ink">You&apos;re all set</p>
        <p className="text-fig-body text-sf-ink">
          <span className="font-semibold">{calendarName}</span> is connected.
        </p>
        {subtitle ? <p className="text-fig-body text-sf-muted">{subtitle}</p> : null}
      </div>
    </div>
  );
}
