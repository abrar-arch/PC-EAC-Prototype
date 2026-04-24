import { useState } from "react";
import { providerStepShortCopy } from "../calendarIntegrationCopy";
import { modalBtnPrimary } from "../modalButtonClasses";
import type { CalendarProviderId } from "../types";

type ConnectAccountStepProps = {
  onContinue: (provider: CalendarProviderId) => void;
};

export function ConnectAccountStep({ onContinue }: ConnectAccountStepProps) {
  const [provider, setProvider] = useState<CalendarProviderId | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-center text-fig-body text-sf-ink">{providerStepShortCopy()}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <ProviderCard
          label="Google"
          sublabel="Google Calendar"
          selected={provider === "google"}
          onSelect={() => setProvider("google")}
        />
        <ProviderCard
          label="Microsoft"
          sublabel="Outlook & Microsoft 365"
          selected={provider === "microsoft"}
          onSelect={() => setProvider("microsoft")}
        />
      </div>
      <div className="flex justify-end gap-2 border-t border-sf-line-soft pt-4">
        <button
          type="button"
          disabled={!provider}
          onClick={() => provider && onContinue(provider)}
          className={modalBtnPrimary}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function ProviderCard({
  label,
  sublabel,
  selected,
  onSelect,
}: {
  label: string;
  sublabel: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center justify-center gap-1 rounded-fig border px-4 py-6 text-fig-ui font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sf-brand ${
        selected
          ? "border-sf-brand bg-sf-brand-tint text-sf-brand ring-1 ring-sf-brand/25"
          : "border-sf-line bg-sf-surface text-sf-ink hover:border-sf-brand/40 hover:bg-sf-page"
      }`}
    >
      <span className="text-fig-h2">{label}</span>
      <span className="text-fig-body font-normal text-sf-muted">{sublabel}</span>
    </button>
  );
}
