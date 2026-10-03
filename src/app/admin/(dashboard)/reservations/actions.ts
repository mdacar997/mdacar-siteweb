"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { reservations } from "@/db/schema";
import { requireAdminAction } from "@/lib/auth/require-admin";
import {
  hasOverlappingActiveReservation,
  isValidReservationStatus,
} from "@/lib/reservations";
import type { UpdateStatusState } from "./action-state";

/**
 * Changes a reservation's status. Authenticated + authorized (via
 * requireAdminAction) and only ever writes one of the fixed enum values —
 * never an arbitrary client-supplied string.
 *
 * Confirming a reservation is the one place this phase enforces the
 * "no obvious double-booking" rule from the brief: if the reservation is
 * linked to a real car (carId) and has both a pickup and return date, the
 * confirmation is rejected when another active reservation for the same
 * car overlaps those dates. Every other transition is always allowed —
 * reservations are business records, not database rows to be blocked on.
 */
export async function updateReservationStatusAction(
  _prevState: UpdateStatusState,
  formData: FormData,
): Promise<UpdateStatusState> {
  await requireAdminAction();

  const id = Number(formData.get("reservationId"));
  const status = formData.get("status");

  if (!Number.isInteger(id) || id <= 0) {
    return { error: "Cette réservation n'existe pas." };
  }
  if (!isValidReservationStatus(status)) {
    return { error: "Statut invalide." };
  }

  const [existing] = await db
    .select({
      id: reservations.id,
      carId: reservations.carId,
      pickupDate: reservations.pickupDate,
      returnDate: reservations.returnDate,
    })
    .from(reservations)
    .where(eq(reservations.id, id))
    .limit(1);

  if (!existing) {
    return { error: "Cette réservation n'existe pas." };
  }

  if (
    status === "confirmed" &&
    existing.carId &&
    existing.pickupDate &&
    existing.returnDate
  ) {
    const conflict = await hasOverlappingActiveReservation({
      carId: existing.carId,
      startDate: existing.pickupDate,
      endDate: existing.returnDate,
      excludeReservationId: existing.id,
    });
    if (conflict) {
      return {
        error:
          "Impossible de confirmer : ce véhicule a déjà une réservation active sur ces dates.",
      };
    }
  }

  try {
    await db
      .update(reservations)
      .set({ status, updatedAt: new Date() })
      .where(eq(reservations.id, id));
  } catch {
    return { error: "Impossible de modifier le statut." };
  }

  revalidatePath("/admin/reservations");
  revalidatePath(`/admin/reservations/${id}`);
  revalidatePath("/admin");
  return { error: null };
}


/**
 * Permanently deletes one reservation.
 *
 * This is intentionally restricted to authenticated admins and operates on
 * the database row itself. The notifications.reservation_id foreign key is
 * configured with ON DELETE CASCADE, so linked reservation notifications are
 * removed with the reservation instead of becoming stale dashboard records.
 */
export async function deleteReservationAction(formData: FormData): Promise<void> {
  await requireAdminAction();

  const id = Number(formData.get("reservationId"));
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Cette réservation n'existe pas.");
  }

  const result = await db
    .delete(reservations)
    .where(eq(reservations.id, id))
    .returning({ id: reservations.id });

  if (result.length === 0) {
    throw new Error("Cette réservation n'existe pas.");
  }

  revalidatePath("/admin/reservations");
  revalidatePath(`/admin/reservations/${id}`);
  revalidatePath("/admin");
  revalidatePath("/admin/notifications");
  redirect("/admin/reservations");
}
