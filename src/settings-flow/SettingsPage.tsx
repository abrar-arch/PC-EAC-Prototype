import { useEffect, useReducer, useState } from "react";
import { AccountModalBody } from "./AccountModalBody";
import { accountModalReducer } from "./accountModalReducer";
import { ConnectedAccountsSection } from "./ConnectedAccountsSection";
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

type TopTab = "profile" | "account" | "management";

const topTabButton =
  "border-b-4 px-4 pb-3 pt-3 text-[16px] leading-6 transition";

const actionBtn =
  "inline-flex h-12 items-center justify-center rounded-full border border-[#353535] px-6 text-[16px] font-semibold leading-6 text-[#353535] transition hover:bg-[#f5f5f5]";

export function SettingsPage() {
  const [modal, dispatch] = useReducer(accountModalReducer, initialAccountModalState);
  const [activeTab, setActiveTab] = useState<TopTab>("profile");
  const [connection, setConnection] = useState<ConnectionSectionState>({ phase: "idle" });

  useEffect(() => {
    if (connection.phase !== "stabilizing") return;
    const t = window.setTimeout(() => {
      setConnection((prev) => (prev.phase === "stabilizing" ? { ...prev, phase: "connected" } : prev));
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
    <div className="min-h-screen bg-[#f5f5f5] text-[#181818]">
      <header className="bg-[#181818] text-white">
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span className="text-[24px] font-semibold">steps</span>
            <nav className="hidden items-center gap-6 text-[14px] text-white/90 lg:flex">
              <span>Home</span>
              <span>Enablement</span>
              <span>Sales</span>
              <span>Marketing</span>
              <span>Support</span>
              <span>Analytics</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <input
              readOnly
              value="Search"
              className="h-10 w-[260px] rounded-full border border-white/20 bg-white/10 px-4 text-[14px] text-white/80"
            />
            <div className="h-9 w-9 rounded-full bg-white/15" aria-hidden />
            <div className="h-9 w-9 rounded-full bg-[#f97316]" aria-hidden />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-8">
        <div className="border-b border-[#c9c9c9] bg-white px-6">
          <div className="flex gap-4">
            <button
              type="button"
              className={`${topTabButton} ${activeTab === "profile" ? "border-[#353535] font-bold" : "border-transparent text-[#747474]"}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              type="button"
              className={`${topTabButton} ${activeTab === "account" ? "border-[#353535] font-bold" : "border-transparent text-[#747474]"}`}
              onClick={() => setActiveTab("account")}
            >
              Account Information
            </button>
            <button
              type="button"
              className={`${topTabButton} ${activeTab === "management" ? "border-[#353535] font-bold" : "border-transparent text-[#747474]"}`}
              onClick={() => setActiveTab("management")}
            >
              Account Management
            </button>
          </div>
        </div>

        {activeTab === "profile" ? (
          <main className="space-y-6 pt-6">
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[16px] font-semibold text-[#747474]">Account</p>
                  <h1 className="mt-1 text-[34px] font-semibold leading-10">AnyPartner Inc.</h1>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" className={actionBtn}>Follow</button>
                  <button type="button" className={actionBtn}>Edit</button>
                  <button type="button" className={actionBtn}>Submit for Approval</button>
                  <button type="button" className={actionBtn}>Deactivate</button>
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
                <InfoItem label="Type" value="Partner" />
                <InfoItem label="Phone" value="222-333-4444" accent />
                <InfoItem label="Website" value="-" />
                <InfoItem label="Account Owner" value="Pawan Kumar Adda" />
                <InfoItem label="Industry" value="-" />
                <InfoItem label="Billing Address" value="-" />
              </div>
            </section>

            <section className="rounded-2xl border border-[#e8e8e8] bg-white">
              <div className="border-b border-[#c9c9c9] px-6 pt-3">
                <div className="flex gap-6">
                  <button type="button" className="border-b-4 border-[#353535] px-2 pb-3 text-[16px] font-bold">
                    Details
                  </button>
                  <button type="button" className="px-2 pb-3 text-[16px] text-[#747474]">
                    Related
                  </button>
                </div>
              </div>

              <div className="space-y-8 px-8 py-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <InfoRow label="Account Owner" value="Pawan Kumar Adda" accent />
                  <InfoRow label="Phone" value="222-2323-223" />
                  <InfoRow label="Account Name" value="-" />
                  <InfoRow label="Fax" value="-" />
                  <InfoRow label="Parent Account" value="-" />
                  <InfoRow label="Website" value="-" />
                </div>

                <div className="rounded-xl border border-[#c9c9c9] p-6">
                  <p className="text-[18px] font-medium">Additional Information</p>
                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <InfoRow label="Type" value="-" compact />
                    <InfoRow label="Employees" value="2133" compact />
                    <InfoRow label="Industry" value="-" compact />
                    <InfoRow label="Annual Revenue" value="-" compact />
                  </div>
                </div>

                <ConnectedAccountsSection connection={connection} onConnectPartner={() => dispatch({ type: "OPEN" })} />
              </div>
            </section>
          </main>
        ) : null}

        {activeTab !== "profile" ? (
          <section className="rounded-2xl border border-dashed border-[#c9c9c9] bg-white p-10 text-center text-[16px] text-[#747474]">
            This tab is not part of the prototype flow yet.
          </section>
        ) : null}
      </div>

      <footer className="bg-[#181818] py-8 text-white">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 text-[14px] text-white/90">
          <span>English (US)</span>
          <span>© Steps Corporation. All rights reserved.</span>
        </div>
      </footer>

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

type InfoItemProps = {
  label: string;
  value: string;
  accent?: boolean;
};

function InfoItem({ label, value, accent = false }: InfoItemProps) {
  return (
    <div>
      <p className="text-[14px] text-[#747474]">{label}</p>
      <p className={`mt-2 text-[16px] font-medium ${accent ? "text-[#e67e22]" : "text-[#181818]"}`}>{value}</p>
    </div>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
  accent?: boolean;
  compact?: boolean;
};

function InfoRow({ label, value, accent = false, compact = false }: InfoRowProps) {
  return (
    <div>
      <p className={`text-[#181818] ${compact ? "text-[14px]" : "text-[16px]"} font-medium`}>{label}</p>
      <p className={`mt-2 text-[16px] ${accent ? "text-[#e67e22]" : "text-[#181818]"}`}>{value}</p>
    </div>
  );
}
