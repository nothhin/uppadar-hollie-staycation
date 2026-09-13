"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { showError, showSuccess } from "@/lib/sweetalert";
import styles from "../admin.module.css";

export type AirbnbSyncPanelStatus = {
  status: "never" | "running" | "succeeded" | "failed";
  lastSucceededAt: string | null;
  lastFailedAt: string | null;
  lastError: string | null;
  eventsSeen: number;
  conflictsSeen: number;
  activeEvents: number;
};

function formatSyncTime(value: string | null) {
  if (!value) return "Not synced yet";
  return new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function AirbnbCalendarSyncPanel({
  status,
  importConfigured,
  exportConfigured,
}: {
  status: AirbnbSyncPanelStatus;
  importConfigured: boolean;
  exportConfigured: boolean;
}) {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
  const canSync = importConfigured && !syncing;

  const syncNow = async () => {
    if (!canSync) return;
    setSyncing(true);
    try {
      const response = await fetch("/api/admin/airbnb-calendar/sync", { method: "POST", cache: "no-store" });
      const body = await response.json() as { ok?: boolean; error?: string; data?: { eventsSeen: number } };
      if (!response.ok || !body.ok) throw new Error(body.error || "Airbnb calendar sync failed.");
      await showSuccess(`Airbnb calendar synced. ${body.data?.eventsSeen ?? 0} event(s) imported.`);
      router.refresh();
    } catch (error) {
      await showError(error instanceof Error ? error.message : "Airbnb calendar sync failed.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <section className={`${styles.operationsSidePanel} ${styles.airbnbSyncPanel}`} aria-labelledby="airbnb-sync-title">
      <div className={styles.panelHeading}>
        <p className={styles.eyebrow}>External calendar</p>
        <h2 id="airbnb-sync-title">Airbnb availability sync</h2>
        <p>Airbnb dates and website bookings are kept in the same availability check.</p>
      </div>
      <div className={styles.airbnbSyncGrid}>
        <div><span>Airbnb → website</span><strong data-ready={importConfigured}>{importConfigured ? "Connected" : "Needs setup"}</strong></div>
        <div><span>Website → Airbnb</span><strong data-ready={exportConfigured}>{exportConfigured ? "Feed ready" : "Needs setup"}</strong></div>
        <div><span>Imported dates</span><strong>{status.activeEvents}</strong></div>
        <div><span>Last successful sync</span><strong>{formatSyncTime(status.lastSucceededAt)}</strong></div>
      </div>
      {status.conflictsSeen > 0 ? <p className={styles.airbnbSyncWarning} role="alert">{status.conflictsSeen} imported date range(s) overlap an existing website stay. Review the conflict before confirming anything.</p> : null}
      {status.status === "failed" && status.lastError ? <p className={styles.airbnbSyncError} role="alert">Last sync failed: {status.lastError}</p> : null}
      <div className={styles.airbnbSyncActions}>
        <button type="button" onClick={syncNow} disabled={!canSync}>{syncing ? "Syncing…" : "Sync Airbnb now"}</button>
        <small>{status.lastFailedAt ? `Last failed ${formatSyncTime(status.lastFailedAt)}` : "Automatic refresh runs when the calendar is viewed and on the configured scheduler."}</small>
      </div>
      {!importConfigured || !exportConfigured ? <p className={styles.airbnbSyncSetup}>Add the server-only Airbnb iCal URL, export token, Supabase service key, and cron secret before enabling production sync.</p> : null}
    </section>
  );
}
