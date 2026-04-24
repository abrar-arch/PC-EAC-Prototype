export type ModalStepId = "intro" | "provider" | "account" | "password" | "select_calendar";

export type CalendarProviderId = "google" | "microsoft";

export type AccountModalState = {
  isModalOpen: boolean;
  currentStep: ModalStepId;
  selectedProvider: CalendarProviderId | null;
  selectedAccountEmail: string | null;
  calendarSyncEnabled: boolean;
  selectedCalendar: string | null;
};

export const initialAccountModalState: AccountModalState = {
  isModalOpen: false,
  currentStep: "intro",
  selectedProvider: null,
  selectedAccountEmail: null,
  calendarSyncEnabled: true,
  selectedCalendar: null,
};

export type CalendarOption = {
  id: string;
  name: string;
  detail: string;
};

export type AccountPick = {
  email: string;
};

export type ConnectionSubmitPayload = {
  provider: CalendarProviderId;
  accountEmail: string;
  /** Empty when calendar sync was left disabled. */
  calendarId: string | null;
  calendarName: string;
  calendarSyncEnabled: boolean;
};

export type ConnectionSectionState =
  | { phase: "idle" }
  | {
      phase: "stabilizing";
      provider: CalendarProviderId;
      accountEmail: string;
      calendarName: string;
    }
  | {
      phase: "connected";
      provider: CalendarProviderId;
      accountEmail: string;
      calendarName: string;
    };
