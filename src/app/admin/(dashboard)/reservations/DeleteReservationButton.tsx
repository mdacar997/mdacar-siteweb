"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteReservationAction } from "./actions";

export function DeleteReservationButton({
  reservationId,
  customerName,
  compact = false,
}: {
  reservationId: number;
  customerName?: string;
  compact?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const label = customerName ? ` de « ${customerName} »` : "";
    const confirmed = window.confirm(
      `Supprimer définitivement la réservation${label} ?\n\nCette action est irréversible.`,
    );
    if (!confirmed) return;

    const formData = new FormData();
    formData.set("reservationId", String(reservationId));

    startTransition(async () => {
      await deleteReservationAction(formData);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Supprimer la réservation"
      title="Supprimer la réservation"
      className={
        compact
          ? "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-900/60 text-red-300 transition hover:border-red-500/70 hover:bg-red-950/30 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
          : "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-900/60 px-4 text-[14px] font-medium text-red-300 transition hover:border-red-500/70 hover:bg-red-950/30 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
      }
    >
      <Trash2 className="h-4 w-4" aria-hidden />
      {!compact && (isPending ? "Suppression…" : "Supprimer")}
    </button>
  );
}
