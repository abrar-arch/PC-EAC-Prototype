import { authLoadingMessages } from "../calendarIntegrationCopy";
import { LoaderState } from "../LoaderState";
import type { CalendarProviderId } from "../types";

type AuthLoadingStepProps = {
  provider: CalendarProviderId | null;
};

export function AuthLoadingStep({ provider }: AuthLoadingStepProps) {
  const { message, subtext } = authLoadingMessages(provider);
  return <LoaderState message={message} subtext={subtext} />;
}
