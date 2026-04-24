type ConnectionStatus = "disconnected" | "connected";

type ConnectionCardProps = {
  title: string;
  description: string;
  status: ConnectionStatus;
  statusLabel?: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
};

const btnBrand =
  "inline-flex h-8 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-fig-btn border border-sf-brand bg-sf-surface px-4 text-fig-ui font-normal text-sf-brand transition hover:bg-sf-brand-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sf-brand";

export function ConnectionCard({
  title,
  description,
  status,
  statusLabel,
  primaryActionLabel,
  onPrimaryAction,
}: ConnectionCardProps) {
  const connected = status === "connected";
  const badge = statusLabel ?? (connected ? "Connected" : "Not connected");

  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-fig-h2 text-sf-ink">{title}</h2>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold leading-4 ${
              connected
                ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600/20"
                : "bg-sf-page text-sf-muted ring-1 ring-sf-line"
            }`}
          >
            {badge}
          </span>
        </div>
        <p className="mt-1 max-w-3xl text-fig-body text-sf-ink">{description}</p>
      </div>
      <div className="flex shrink-0 sm:pt-0.5">
        <button type="button" onClick={onPrimaryAction} className={btnBrand}>
          {primaryActionLabel}
        </button>
      </div>
    </section>
  );
}
