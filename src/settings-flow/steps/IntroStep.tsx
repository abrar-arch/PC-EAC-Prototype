import { partnerConnectIntroCopy } from "../calendarIntegrationCopy";
import { modalBtnPrimary } from "../modalButtonClasses";

type IntroStepProps = {
  onNext: () => void;
};

export function IntroStep({ onNext }: IntroStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-center text-fig-body text-sf-ink">{partnerConnectIntroCopy()}</p>
      <div className="flex justify-end gap-2 border-t border-sf-line-soft pt-4">
        <button type="button" onClick={onNext} className={modalBtnPrimary}>
          Next
        </button>
      </div>
    </div>
  );
}
