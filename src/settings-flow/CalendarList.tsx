import type { CalendarOption } from "./types";

type CalendarListProps = {
  calendars: CalendarOption[];
  value: string | null;
  onChange: (id: string) => void;
};

export function CalendarList({ calendars, value, onChange }: CalendarListProps) {
  return (
    <fieldset>
      <legend className="sr-only">Choose a calendar</legend>
      <ul className="max-h-60 divide-y divide-sf-line overflow-y-auto rounded-fig border border-sf-line">
        {calendars.map((cal) => {
          const selected = value === cal.id;
          return (
            <li key={cal.id}>
              <label
                className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition hover:bg-sf-page ${
                  selected ? "bg-sf-brand-tint" : "bg-sf-surface"
                }`}
              >
                <input
                  type="radio"
                  name="calendar"
                  value={cal.id}
                  checked={selected}
                  onChange={() => onChange(cal.id)}
                  className="mt-0.5 h-4 w-4 border-sf-line text-sf-brand focus:ring-sf-brand"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-fig-body font-semibold text-sf-ink">{cal.name}</span>
                  <span className="block text-[12px] leading-4 text-sf-muted">{cal.detail}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
