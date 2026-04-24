import { useEffect, useReducer, useState } from "react";
import { AccountModalBody } from "./AccountModalBody";
import { accountModalReducer } from "./accountModalReducer";
import { ConnectedAccountsSection } from "./ConnectedAccountsSection";
import { imgSettingsGear } from "./figmaAssets";
import { modalStepShowsBack, modalStepTitle } from "./modalFlow";
import { ModalContainer } from "./ModalContainer";
import { PARTNER_ACCOUNT_OPTIONS } from "./partnerFlowData";
import type { ConnectionSectionState, ConnectionSubmitPayload } from "./types";
import { initialAccountModalState } from "./types";

const MOCK_CALENDARS = [
  { id: "cal-primary", name: "Primary", detail: "user@example.com" },
  { id: "cal-team", name: "Team / Shared", detail: "Shared with sales team" },
  { id: "cal-holidays", name: "Holidays", detail: "Regional holiday calendar" },
] as const;

const STABILIZE_MS = 2200;

const tabBase =
  "relative pb-3 text-[13px] font-semibold transition after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:transition-colors";
const tabActive = `${tabBase} text-sf-ink after:bg-sf-ink`;
const tabIdle = `${tabBase} text-sf-muted after:bg-transparent hover:text-sf-ink`;

export function SettingsPage() {
  const [modal, dispatch] = useReducer(accountModalReducer, initialAccountModalState);
  const [activeTab, setActiveTab] = useState<"profile" | "account" | "management">("profile");
  const [connection, setConnection] = useState<ConnectionSectionState>({ phase: "idle" });

  useEffect(() => {
    if (connection.phase !== "stabilizing") return;
    const t = window.setTimeout(() => {
      setConnection((prev) =>
        prev.phase === "stabilizing" ? { ...prev, phase: "connected" } : prev,
      );
    }, STABILIZE_MS);
    return () => window.clearTimeout(t);
  }, [connection.phase]);

  const showBack = modalStepShowsBack(modal.currentStep);

  const handleFlowSubmit = (payload: ConnectionSubmitPayload) => {
    setConnection({
      phase: "stabilizing",
      provider: payload.provider,
      accountEmail: payload.accountEmail,
      calendarName: payload.calendarName,
    });
  };

  return (
    <div className="min-h-screen bg-sf-page text-sf-ink">
      <div className="mx-auto flex min-h-screen max-w-[1368px] flex-col gap-0 pb-24">
        <header className="border-b border-sf-line bg-sf-surface px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-fig-title text-sf-ink">steps</span>
            <div className="h-9 w-9 rounded-full bg-sf-icon-well" aria-hidden />
          </div>
        </header>

        <div className="border-b border-sf-line bg-sf-surface px-6">
          <div className="flex gap-8">
            <button type="button" className={activeTab === "profile" ? tabActive : tabIdle} onClick={() => setActiveTab("profile")}>
              Profile
            </button>
            <button
              type="button"
              className={activeTab === "account" ? tabActive : tabIdle}
              onClick={() => setActiveTab("account")}
            >
              Account information
            </button>
            <button
              type="button"
              className={activeTab === "management" ? tabActive : tabIdle}
              onClick={() => setActiveTab("management")}
            >
              Account management
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-6 pt-8">
          {activeTab === "profile" ? (
            <>
              <section className="rounded-2xl border border-sf-line bg-sf-surface p-8">
                <p className="text-[12px] font-medium uppercase tracking-wide text-sf-muted">Account</p>
                <h1 className="mt-1 text-[22px] font-bold leading-tight text-sf-ink">AnyPartner Inc.</h1>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-fig-body text-sf-muted">Type</dt>
                    <dd className="mt-1 text-fig-body font-semibold text-sf-ink">Partner</dd>
                  </div>
                  <div>
                    <dt className="text-fig-body text-sf-muted">Phone</dt>
                    <dd className="mt-1 text-fig-body font-semibold text-[#e67e22]">222-333-4444</dd>
                  </div>
                  <div>
                    <dt className="text-fig-body text-sf-muted">Account owner</dt>
                    <dd className="mt-1 text-fig-body font-semibold text-sf-ink">Pawan Kumar Adda</dd>
                  </div>
                </dl>
              </section>

              <ConnectedAccountsSection
                connection={connection}
                onConnectPartner={() => dispatch({ type: "OPEN" })}
              />
            </>
          ) : null}

          {activeTab === "account" ? (
            <section className="rounded-2xl border border-dashed border-sf-line bg-sf-surface p-10 text-center text-fig-body text-sf-muted">
              Account information placeholder — switch to <strong className="text-sf-ink">Profile</strong> for the
              partner connection flow.
            </section>
          ) : null}

          {activeTab === "management" ? (
            <section className="rounded-2xl border border-dashed border-sf-line bg-sf-surface p-10 text-center text-fig-body text-sf-muted">
              Account management placeholder.
            </section>
          ) : null}

          <section className="rounded-fig bg-sf-surface p-6 ring-1 ring-sf-line/80">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-sf-icon-well">
                <img src={imgSettingsGear} alt="" className="h-[26px] w-[26px] object-contain" width={26} height={26} />
              </div>
              <div>
                <h2 className="text-fig-h2 text-sf-ink">Calendar &amp; email connections</h2>
                <p className="mt-1 max-w-3xl text-fig-body text-sf-muted">
                  Additional workspace integrations (separate from the partner account link above).
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ModalContainer
        open={modal.isModalOpen}
        title={modalStepTitle(modal.currentStep, { provider: modal.selectedProvider })}
        onClose={() => dispatch({ type: "CLOSE" })}
        showBack={showBack}
        onBack={() => dispatch({ type: "GO_BACK" })}
      >
        <AccountModalBody
          state={modal}
          dispatch={dispatch}
          calendars={[...MOCK_CALENDARS]}
          partnerAccountOptions={PARTNER_ACCOUNT_OPTIONS}
          onFlowSubmit={handleFlowSubmit}
        />
      </ModalContainer>
    </div>
  );
}
