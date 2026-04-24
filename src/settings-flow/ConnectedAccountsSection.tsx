import { LoaderState } from "./LoaderState";
import type { ConnectionSectionState } from "./types";

type ConnectedAccountsSectionProps = {
  connection: ConnectionSectionState;
  onConnectPartner: () => void;
};

const btnPrimaryDark =
  "inline-flex h-10 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-[#353535] px-5 text-[13px] font-medium text-white transition hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sf-brand";

export function ConnectedAccountsSection({ connection, onConnectPartner }: ConnectedAccountsSectionProps) {
  if (connection.phase === "stabilizing") {
    return (
      <div
        className="rounded-2xl border border-sf-line bg-sf-surface p-8"
        aria-live="polite"
        aria-busy="true"
      >
        <h3 className="text-fig-h2 text-sf-ink">Connected accounts</h3>
        <div className="mt-6">
          <LoaderState
            message="Connection stabilizing…"
            subtext="Securing your partner link and applying sync preferences."
          />
        </div>
      </div>
    );
  }

  if (connection.phase === "connected") {
    const { provider, accountEmail, calendarName } = connection;
    const providerLabel = provider === "google" ? "Google" : "Microsoft";
    return (
      <div className="rounded-2xl border border-sf-line bg-sf-surface p-8">
        <h3 className="text-fig-h2 text-sf-ink">Connected accounts</h3>
        <div className="mt-6 flex flex-col gap-4 rounded-fig border border-emerald-600/20 bg-emerald-50/60 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 12L10.5 16.5L18 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-fig-h2 text-sf-ink">Connection established</p>
              <p className="mt-1 text-fig-body text-sf-muted">
                {providerLabel} partner account <span className="font-semibold text-sf-ink">{accountEmail}</span>{" "}
                is linked.
              </p>
              <p className="mt-2 text-fig-body text-sf-ink">
                Calendar: <span className="font-semibold">{calendarName}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sf-line bg-sf-surface p-8">
      <h3 className="text-fig-h2 text-sf-ink">Connected accounts</h3>
      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-fig-h2 text-sf-ink">No partner account connected</p>
          <p className="mt-2 max-w-2xl text-fig-body text-sf-muted">
            Connect your Microsoft or Google partner account to enable data sync, access shared resources, and
            manage partner workflows.
          </p>
          <button type="button" className="mt-4 text-fig-body font-medium text-sf-brand hover:underline">
            Learn about partner account connection
          </button>
        </div>
        <button type="button" onClick={onConnectPartner} className={btnPrimaryDark}>
          Connect partner account
        </button>
      </div>
    </div>
  );
}
