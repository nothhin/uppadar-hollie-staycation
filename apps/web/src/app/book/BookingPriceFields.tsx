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
  const [bedroomChoice, setBedroomChoice] = useState("both_bedrooms");
  const [parkingType, setParkingType] = useState("none");

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
      <fieldset className={styles.roomChoice}>
        <legend>Choose your stay</legend>
        {[{ value: "both_bedrooms", title: "Entire two-bedroom condo", detail: "Queen master · Double-size bunk room", rate: "₱2,200 / night" }, { value: "bedroom_1", title: "Master bedroom", detail: "Queen-size comfort bed · Up to 2 guests", rate: "₱1,700 / night" }, { value: "bedroom_2", title: "Double-size bunk room", detail: "Up to 2 guests · +₱250 per additional guest", rate: "₱1,700 / night" }].map((room) => <label key={room.value} className={bedroomChoice === room.value ? styles.roomChoiceActive : undefined}><input type="radio" name="bedroomChoice" value={room.value} checked={bedroomChoice === room.value} onChange={(event) => setBedroomChoice(event.target.value)} /><span><strong>{room.title}</strong><small>{room.detail}</small></span><b>{room.rate}</b></label>)}
      </fieldset>
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
      <label>
        <span>Parking (optional)</span>
        <select name="parkingType" value={parkingType} onChange={(event) => setParkingType(event.target.value)}>
          <option value="none">No parking</option>
          <option value="car">Car parking · ₱350 / night</option>
          <option value="motorcycle">Motorcycle parking · ₱150 / night</option>
        </select>
      </label>
    </>
  );
}
