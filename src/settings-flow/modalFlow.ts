import type { CalendarProviderId, ModalStepId } from "./types";

export const ACCOUNT_MODAL_STEP_ORDER = [
  "intro",
  "provider",
  "account",
  "password",
  "select_calendar",
] as const satisfies readonly ModalStepId[];

export function modalStepTitle(
  step: ModalStepId,
  ctx?: { provider: CalendarProviderId | null },
): string {
  if (step === "account") {
    if (ctx?.provider === "google") return "Choose a Google account";
    if (ctx?.provider === "microsoft") return "Choose a Microsoft account";
    return "Choose an account";
  }
  const titles: Record<Exclude<ModalStepId, "account">, string> = {
    intro: "Connect partner account",
    provider: "Choose a provider",
    password: "Enter your password",
    select_calendar: "Calendar sync",
  };
  return titles[step];
}

export function modalStepShowsBack(step: ModalStepId): boolean {
  return step !== "intro";
}
