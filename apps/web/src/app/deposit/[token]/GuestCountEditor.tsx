"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingPriceReceipt from "../../BookingPriceReceipt";
import { showError, showSuccess } from "@/lib/sweetalert";
import { updatePendingGuestCount, type GuestCountState } from "./actions";
import styles from "./deposit.module.css";

const initialState: GuestCountState = { status: "idle", message: "" };

export function GuestCountEditor({
  token,
  checkIn,
  checkOut,
  initialGuests,
  initialBedroom,
  initialParking,
}: {
  token: string;
  checkIn: string;
  checkOut: string;
  initialGuests: number;
  initialBedroom: string;
  initialParking: "none" | "car" | "motorcycle";
}) {
  const [guests, setGuests] = useState(initialGuests);
  const [bedroom, setBedroom] = useState(initialBedroom);
  const [parkingType, setParkingType] = useState(initialParking);
  const router = useRouter();
  const [state, action, pending] = useActionState(
    updatePendingGuestCount,
    initialState,
  );
  useEffect(() => {
    if (state.status === "success") {
      void showSuccess(state.message);
      router.refresh();
    }
    if (state.status === "error") void showError(state.message);
  }, [router, state]);
  const chooseGuests = (value: number) => {
    setGuests(value);
    if (value > 2 && bedroom === "bedroom_1") {
      setBedroom("bedroom_2");
      void showError(
        "The Master bedroom can accommodate a maximum of 2 guests. We switched your selection to the Second bedroom (bunk bed).",
      );
    }
  };
  const chooseBedroom = (value: string) => {
    setBedroom(value);
    if (value === "bedroom_1" && guests > 2) {
      setBedroom("bedroom_2");
      void showError(
        "The Master bedroom can accommodate a maximum of 2 guests. We switched your selection back to the Second bedroom (bunk bed).",
      );
    }
  };
  return (
    <section className={styles.guestEditor}>
      <div>
        <p className={styles.eyebrow}>Review before paying</p>
        <h2>Need to correct the number of guests?</h2>
        <p>Update it now and your total will recalculate automatically.</p>
      </div>
      <form action={action}>
        <input type="hidden" name="token" value={token} />
        <label>
          <span>Overnight parking</span>
          <select
            name="parkingType"
            value={parkingType}
            onChange={(event) =>
              setParkingType(event.target.value as typeof parkingType)
            }
          >
            <option value="none">No parking</option>
            <option value="car">Car — ₱350/night</option>
            <option value="motorcycle">Motorcycle — ₱150/night</option>
          </select>
        </label>
        <label>
          <span>Number of guests</span>
          <select
            name="guests"
            value={guests}
            onChange={(event) => chooseGuests(Number(event.target.value))}
          >
            {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count} guest{count === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Bedroom selection</span>
          <select name="bedroom" value={bedroom} onChange={(event) => chooseBedroom(event.target.value)}>
            <option value="bedroom_1">Master bedroom — up to 2 guests</option>
            <option value="bedroom_2">Second bedroom — up to 4 guests</option>
            <option value="both_bedrooms">Entire two-bedroom condo — up to 8 guests</option>
          </select>
        </label>
        <button disabled={pending}>
          {pending ? "Updating…" : "Update guests and total"}
        </button>
      </form>
      <BookingPriceReceipt
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        bedroomChoice={bedroom as "bedroom_1" | "bedroom_2" | "both_bedrooms"}
        parkingType={parkingType}
      />
      <small>
        Changes are allowed only before payment details or a receipt are
        submitted.
      </small>
    </section>
  );
}
