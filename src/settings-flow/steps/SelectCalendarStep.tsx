import { selectCalendarIntro } from "../calendarIntegrationCopy";
import { CalendarList } from "../CalendarList";
import { modalBtnPrimary } from "../modalButtonClasses";
import type { CalendarOption, CalendarProviderId } from "../types";

type SelectCalendarStepProps = {
  provider: CalendarProviderId | null;
  calendars: CalendarOption[];
  calendarSyncEnabled: boolean;
  selectedCalendarId: string | null;
  onCalendarSyncEnabledChange: (enabled: boolean) => void;
  onSelectCalendar: (id: string) => void;
  onSubmit: () => void;
};

export function SelectCalendarStep({
  provider,
  calendars,
  calendarSyncEnabled,
  selectedCalendarId,
  onCalendarSyncEnabledChange,
  onSelectCalendar,
  onSubmit,
}: SelectCalendarStepProps) {
  const canSubmit =
    calendarSyncEnabled ? selectedCalendarId !== null : true;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-fig-body text-sf-ink">{selectCalendarIntro(provider)}</p>
      <label className="flex cursor-pointer items-start gap-3 rounded-fig border border-sf-line bg-sf-page px-4 py-3">
        <input
          type="checkbox"
          checked={calendarSyncEnabled}
          onChange={(e) => onCalendarSyncEnabledChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-sf-line text-sf-brand focus:ring-sf-brand"
        />
        <span>
          <span className="block text-fig-body font-semibold text-sf-ink">Enable calendar sync</span>
          <span className="block text-[12px] leading-4 text-sf-muted">
            When enabled, pick which calendar should stay aligned with this workspace.
          </span>
        </span>
      </label>
      {calendarSyncEnabled ? (
        <CalendarList calendars={calendars} value={selectedCalendarId} onChange={onSelectCalendar} />
      ) : (
        <p className="rounded-fig border border-dashed border-sf-line bg-sf-surface px-4 py-3 text-fig-body text-sf-muted">
          Calendar sync is off. You can enable it later from account settings.
        </p>
      )}
      <div className="flex justify-end gap-2 border-t border-sf-line-soft pt-4">
        <button type="button" disabled={!canSubmit} onClick={onSubmit} className={modalBtnPrimary}>
          Submit
        </button>
      </div>
    </div>
  );
}
