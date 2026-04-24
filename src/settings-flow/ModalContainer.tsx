import { type ReactNode } from "react";

type ModalContainerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  showBack: boolean;
  onBack: () => void;
  children: ReactNode;
};

const headerBtn =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-fig-btn text-sf-muted transition hover:bg-sf-page hover:text-sf-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sf-brand";

export function ModalContainer({
  open,
  title,
  onClose,
  showBack,
  onBack,
  children,
}: ModalContainerProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 flex w-full max-w-[560px] flex-col overflow-hidden rounded-[16px] bg-sf-surface shadow-modal ring-1 ring-black/[0.06]"
      >
        <header className="flex items-center gap-3 border-b border-sf-header px-6 py-5">
          {showBack ? (
            <button type="button" onClick={onBack} className={headerBtn} aria-label="Go back">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <span className="w-8 shrink-0" aria-hidden />
          )}
          <h1
            id="modal-title"
            className="min-w-0 flex-1 text-center text-fig-h2 text-sf-ink"
          >
            {title}
          </h1>
          <button type="button" onClick={onClose} className={headerBtn} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div className="flex flex-1 flex-col px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
