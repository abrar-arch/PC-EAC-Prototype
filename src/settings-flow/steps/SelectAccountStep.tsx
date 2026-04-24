import { useState } from "react";
import { selectAccountIntro } from "../calendarIntegrationCopy";
import { modalBtnPrimary } from "../modalButtonClasses";
import type { AccountPick, CalendarProviderId } from "../types";

type SelectAccountStepProps = {
  provider: CalendarProviderId;
  accounts: readonly AccountPick[];
  onContinue: (email: string) => void;
};

export function SelectAccountStep({ provider, accounts, onContinue }: SelectAccountStepProps) {
  const [email, setEmail] = useState<string | null>(accounts[0]?.email ?? null);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-fig-body text-sf-ink">{selectAccountIntro(provider)}</p>
      <fieldset>
        <legend className="sr-only">Pick an account</legend>
        <ul className="divide-y divide-sf-line overflow-hidden rounded-fig border border-sf-line">
          {accounts.map((a) => {
            const selected = email === a.email;
            return (
              <li key={a.email}>
                <label
                  className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition hover:bg-sf-page ${
                    selected ? "bg-sf-brand-tint" : "bg-sf-surface"
                  }`}
                >
                  <input
                    type="radio"
                    name="partner-account"
                    value={a.email}
                    checked={selected}
                    onChange={() => setEmail(a.email)}
                    className="h-4 w-4 border-sf-line text-sf-brand focus:ring-sf-brand"
                  />
                  <span className="text-fig-body font-medium text-sf-ink">{a.email}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
      <div className="flex justify-end gap-2 border-t border-sf-line-soft pt-4">
        <button
          type="button"
          disabled={!email}
          onClick={() => email && onContinue(email)}
          className={modalBtnPrimary}
        >
          Next
        </button>
      </div>
    </div>
  );
}
