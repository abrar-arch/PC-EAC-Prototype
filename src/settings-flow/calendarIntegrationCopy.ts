import type { CalendarProviderId } from "./types";

export function partnerConnectIntroCopy(): string {
  return "Link a Microsoft or Google partner identity so we can sync calendars, shared resources, and workflows with your account.";
}

export function connectAccountIntro(): string {
  return "Choose where your calendars live. Next you'll sign in, then pick one calendar to sync.";
}

export function providerStepShortCopy(): string {
  return "Choose Microsoft or Google for this partner connection.";
}

export function selectAccountIntro(provider: CalendarProviderId): string {
  if (provider === "google") {
    return "Select the Google account you use for partner operations and calendar.";
  }
  return "Select the Microsoft work or school account to connect.";
}

export function passwordStepCopy(provider: CalendarProviderId, email: string): string {
  return `Sign in to ${provider === "google" ? "Google" : "Microsoft"} as ${email}. Enter your password to continue.`;
}

export function authLoadingMessages(provider: CalendarProviderId | null): {
  message: string;
  subtext: string;
} {
  switch (provider) {
    case "google":
      return {
        message: "Connecting to Google...",
        subtext:
          "If a browser tab opened, sign in with the Google account you use for Calendar and approve access.",
      };
    case "microsoft":
      return {
        message: "Connecting to Microsoft...",
        subtext: "Complete any Microsoft sign-in prompts, then return here.",
      };
    default:
      return {
        message: "Connecting your account...",
        subtext: "This usually takes a few seconds.",
      };
  }
}

export function selectCalendarIntro(provider: CalendarProviderId | null): string {
  switch (provider) {
    case "google":
      return "Select the Google calendar you want to keep in sync.";
    case "microsoft":
      return "Select the Outlook calendar that should stay in sync with this workspace.";
    default:
      return "Select the calendar you want to sync.";
  }
}

export function successSubtitle(
  provider: CalendarProviderId | null,
  calendarName: string,
): string {
  switch (provider) {
    case "google":
      return `${calendarName} is linked and ready for sync.`;
    case "microsoft":
      return `${calendarName} is linked and will stay in sync with your Microsoft calendars.`;
    default:
      return `${calendarName} is now linked and will stay up to date.`;
  }
}
