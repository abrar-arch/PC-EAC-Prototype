import { successSubtitle } from "../calendarIntegrationCopy";
import { modalBtnPrimary } from "../modalButtonClasses";
import { SuccessState } from "../SuccessState";
import type { CalendarProviderId } from "../types";

type CompletionStepProps = {
  provider: CalendarProviderId | null;
  calendarName: string;
  onDone: () => void;
};

export function CompletionStep({ provider, calendarName, onDone }: CompletionStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <SuccessState calendarName={calendarName} subtitle={successSubtitle(provider, calendarName)} />
      <div className="flex justify-end border-t border-sf-line-soft pt-4">
        <button type="button" onClick={onDone} className={modalBtnPrimary}>
          Done
        </button>
      </div>
    </div>
  );
}
