import type { AccountModalState, CalendarProviderId, ModalStepId } from "./types";
import { initialAccountModalState } from "./types";

export type AccountModalAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "INTRO_NEXT" }
  | { type: "GO_TO_ACCOUNT"; provider: CalendarProviderId }
  | { type: "GO_TO_PASSWORD"; accountEmail: string }
  | { type: "PASSWORD_NEXT" }
  | { type: "SET_CALENDAR"; calendarId: string }
  | { type: "SET_CALENDAR_SYNC_ENABLED"; enabled: boolean }
  | { type: "GO_BACK" };

export function accountModalReducer(
  state: AccountModalState,
  action: AccountModalAction,
): AccountModalState {
  switch (action.type) {
    case "OPEN":
      return {
        ...initialAccountModalState,
        isModalOpen: true,
        currentStep: "intro",
      };
    case "CLOSE":
      return initialAccountModalState;
    case "INTRO_NEXT":
      if (!state.isModalOpen || state.currentStep !== "intro") return state;
      return { ...state, currentStep: "provider" };
    case "GO_TO_ACCOUNT":
      if (!state.isModalOpen || state.currentStep !== "provider") return state;
      return {
        ...state,
        currentStep: "account",
        selectedProvider: action.provider,
      };
    case "GO_TO_PASSWORD":
      if (!state.isModalOpen || state.currentStep !== "account") return state;
      return {
        ...state,
        currentStep: "password",
        selectedAccountEmail: action.accountEmail,
      };
    case "PASSWORD_NEXT":
      if (!state.isModalOpen || state.currentStep !== "password") return state;
      return { ...state, currentStep: "select_calendar" };
    case "SET_CALENDAR":
      if (!state.isModalOpen) return state;
      return { ...state, selectedCalendar: action.calendarId };
    case "SET_CALENDAR_SYNC_ENABLED":
      if (!state.isModalOpen) return state;
      return {
        ...state,
        calendarSyncEnabled: action.enabled,
        selectedCalendar: action.enabled ? state.selectedCalendar : null,
      };
    case "GO_BACK": {
      if (!state.isModalOpen) return state;
      switch (state.currentStep) {
        case "intro":
          return initialAccountModalState;
        case "provider":
          return { ...state, currentStep: "intro", selectedProvider: null };
        case "account":
          return {
            ...state,
            currentStep: "provider",
            selectedAccountEmail: null,
          };
        case "password":
          return {
            ...state,
            currentStep: "account",
          };
        case "select_calendar":
          return { ...state, currentStep: "password" };
      }
    }
    default:
      return state;
  }
}
