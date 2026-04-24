import type { AccountPick, CalendarProviderId } from "./types";

export const PARTNER_ACCOUNT_OPTIONS: Record<CalendarProviderId, readonly AccountPick[]> = {
  google: [{ email: "partner.ops@gmail.com" }, { email: "calendar.shared@gmail.com" }],
  microsoft: [{ email: "alex@partner365.onmicrosoft.com" }, { email: "integrations@contoso.com" }],
};
