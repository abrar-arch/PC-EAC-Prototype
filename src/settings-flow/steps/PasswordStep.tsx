import { useState } from "react";
import { passwordStepCopy } from "../calendarIntegrationCopy";
import { modalBtnPrimary } from "../modalButtonClasses";
import type { CalendarProviderId } from "../types";

type PasswordStepProps = {
  provider: CalendarProviderId;
  accountEmail: string;
  onContinue: () => void;
};

export function PasswordStep({ provider, accountEmail, onContinue }: PasswordStepProps) {
  const [password, setPassword] = useState("");

  const canContinue = password.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-fig-body text-sf-ink">{passwordStepCopy(provider, accountEmail)}</p>
      <div>
        <label htmlFor="partner-password" className="sr-only">
          Password
        </label>
        <input
          id="partner-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-fig border border-sf-line bg-sf-surface px-3 py-2 text-fig-body text-sf-ink outline-none ring-sf-brand/30 placeholder:text-sf-muted focus:border-sf-brand focus:ring-2"
        />
      </div>
      <div className="flex justify-end gap-2 border-t border-sf-line-soft pt-4">
        <button type="button" disabled={!canContinue} onClick={onContinue} className={modalBtnPrimary}>
          Next
        </button>
      </div>
    </div>
  );
}
