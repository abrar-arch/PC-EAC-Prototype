import type { Dispatch } from "react";
import type { AccountModalAction } from "./accountModalReducer";
import {
  ConnectAccountStep,
  IntroStep,
  PasswordStep,
  SelectAccountStep,
  SelectCalendarStep,
} from "./steps";
import type {
  AccountModalState,
  AccountPick,
  CalendarOption,
  CalendarProviderId,
  ConnectionSubmitPayload,
} from "./types";

type AccountModalBodyProps = {
  state: AccountModalState;
  dispatch: Dispatch<AccountModalAction>;
  calendars: CalendarOption[];
  partnerAccountOptions: Record<CalendarProviderId, readonly AccountPick[]>;
  onFlowSubmit: (payload: ConnectionSubmitPayload) => void;
};

function resolvedCalendarName(calendars: CalendarOption[], id: string | null): string {
  if (!id) return "No calendar selected";
  return calendars.find((c) => c.id === id)?.name ?? "Selected calendar";
}

export function AccountModalBody({
  state,
  dispatch,
  calendars,
  partnerAccountOptions,
  onFlowSubmit,
}: AccountModalBodyProps) {
  const step = state.currentStep;

  const submitCalendarStep = () => {
    if (!state.selectedProvider || !state.selectedAccountEmail) return;
    const calendarId = state.calendarSyncEnabled ? state.selectedCalendar : null;
    if (state.calendarSyncEnabled && !calendarId) return;
    onFlowSubmit({
      provider: state.selectedProvider,
      accountEmail: state.selectedAccountEmail,
      calendarId,
      calendarName: state.calendarSyncEnabled
        ? resolvedCalendarName(calendars, calendarId)
        : "Calendar sync off",
      calendarSyncEnabled: state.calendarSyncEnabled,
    });
    dispatch({ type: "CLOSE" });
  };

  switch (step) {
    case "intro":
      return <IntroStep onNext={() => dispatch({ type: "INTRO_NEXT" })} />;
    case "provider":
      return (
        <ConnectAccountStep
          onContinue={(provider) => dispatch({ type: "GO_TO_ACCOUNT", provider })}
        />
      );
    case "account": {
      const p = state.selectedProvider;
      if (!p) return null;
      const accounts = partnerAccountOptions[p];
      return (
        <SelectAccountStep
          provider={p}
          accounts={accounts}
          onContinue={(email) => dispatch({ type: "GO_TO_PASSWORD", accountEmail: email })}
        />
      );
    }
    case "password": {
      const p = state.selectedProvider;
      const email = state.selectedAccountEmail;
      if (!p || !email) return null;
      return (
        <PasswordStep
          provider={p}
          accountEmail={email}
          onContinue={() => dispatch({ type: "PASSWORD_NEXT" })}
        />
      );
    }
    case "select_calendar":
      return (
        <SelectCalendarStep
          provider={state.selectedProvider}
          calendars={calendars}
          calendarSyncEnabled={state.calendarSyncEnabled}
          selectedCalendarId={state.selectedCalendar}
          onCalendarSyncEnabledChange={(enabled) =>
            dispatch({ type: "SET_CALENDAR_SYNC_ENABLED", enabled })
          }
          onSelectCalendar={(id) => dispatch({ type: "SET_CALENDAR", calendarId: id })}
          onSubmit={submitCalendarStep}
        />
      );
    default: {
      const _exhaustive: never = step;
      return _exhaustive;
    }
  }
}
