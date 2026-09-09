"use client";

import { useState } from "react";
import styles from "./book.module.css";

type BookingPriceFieldsProps = {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
};

export default function BookingPriceFields({
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = "2",
}: BookingPriceFieldsProps) {
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(() => Number(initialGuests) || 2);
  const bedroomChoice = "both_bedrooms" as const;

  return (
    <>
      <div className={styles.grid}>
        <label>
          <span>Check-in</span>
          <input
            name="checkIn"
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            required
          />
        </label>
        <label>
          <span>Check-out</span>
          <input
            name="checkOut"
            type="date"
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            required
          />
        </label>
      </div>
      <label>
        <span>Number of guests</span>
        <select
          name="guests"
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          required
        >
          {Array.from({ length: 8 }, (_, index) => index + 1).map(
            (guestCount) => (
              <option key={guestCount} value={guestCount}>
                {guestCount} guest{guestCount === 1 ? "" : "s"}
              </option>
            ),
          )}
        </select>
        <small>The host will confirm the allowed occupancy and final rate.</small>
      </label>
      <input type="hidden" name="bedroomChoice" value={bedroomChoice} />
      <input type="hidden" name="parkingType" value="none" />
    </>
  );
}
