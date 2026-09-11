"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  submitBookingRequestInline,
  type BookingActionState,
} from "./book/actions";
import { propertyProfile } from "@/lib/property";
import { showError, showSuccess } from "@/lib/sweetalert";
import { RememberBooking, rememberBooking } from "./BookingMemory";
import UiIcon from "./UiIcon";
import BookingPriceReceipt from "./BookingPriceReceipt";

type BookingModalProps = {
  checkIn: string;
  checkOut: string;
  onClose: () => void;
};
const initialState: BookingActionState = { status: "idle" };

export default function BookingModal({
  checkIn,
  checkOut,
  onClose,
}: BookingModalProps) {
  const [state, action, pending] = useActionState(
    submitBookingRequestInline,
    initialState,
  );
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const idempotencyInputRef = useRef<HTMLInputElement>(null);
  const [selectedCheckIn, setSelectedCheckIn] = useState(checkIn);
  const [selectedCheckOut, setSelectedCheckOut] = useState(checkOut);
  const [guests, setGuests] = useState(2);
  const [bedroomChoice, setBedroomChoice] = useState<"bedroom_1" | "bedroom_2">("bedroom_1");
  const [parkingType, setParkingType] = useState<"none" | "car" | "motorcycle">(
    "none",
  );
  const [earlyCheckInHours, setEarlyCheckInHours] = useState(0);
  const [lateCheckoutHours, setLateCheckoutHours] = useState(0);
  const availabilityNotified = useRef(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (state.status === "success" && !availabilityNotified.current) {
      availabilityNotified.current = true;
      rememberBooking({
        url: state.depositLink ?? "/booking-status",
        reference: state.bookingReference,
        checkIn: selectedCheckIn,
        checkOut: selectedCheckOut,
      });
      window.dispatchEvent(new Event("snowaz:availability-changed"));
      void showSuccess(
        "Booking request received. The host will review your dates.",
      );
      window.location.assign(state.depositLink ?? "/booking-status");
    }
    if (state.status === "error" && state.message)
      void showError(state.message);
  }, [
    state.status,
    state.message,
    state.depositLink,
    state.bookingReference,
    selectedCheckIn,
    selectedCheckOut,
  ]);

  const adjustGuests = (change: number) =>
    setGuests((value) => {
      const next = Math.min(6, Math.max(1, value + change));
      if (next > 2) setBedroomChoice("bedroom_2");
      return next;
    });

  return (
    <div
      className="booking-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="booking-modal booking-modal-stitch"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={dialogRef}
      >
        <header className="booking-modal-brandbar">
          <div>
            <Image
              src="/images/uppadar-hollie/logo-transparent.png"
              alt=""
              width={38}
              height={38}
            />
            <span>
              <strong>Uppadar Hollie</strong>
              <small>ONLINE</small>
            </span>
          </div>
          <strong>Availability and booking</strong>
          <button
            type="button"
            aria-label="Close booking form"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        {state.status === "success" ? (
          <section className="booking-modal-success" role="status">
            <RememberBooking
              booking={{
                url: state.depositLink ?? "/booking-status",
                reference: state.bookingReference,
                checkIn: selectedCheckIn,
                checkOut: selectedCheckOut,
              }}
            />
            <span aria-hidden="true">✓</span>
            <p className="eyebrow">Request received</p>
            <h2 id={titleId}>Thank you. We&apos;ll be in touch.</h2>
            <p>
              Your reference is <strong>{state.bookingReference}</strong>. Your
              stay is not confirmed yet; the host will contact you with
              availability, the final rate, current rules, and payment
              instructions.
            </p>
            <a
              className="booking-deposit-link"
              href={propertyProfile.messengerUrl}
              target="_blank"
              rel="noreferrer"
            >
              <UiIcon name="message" size={17} />
              Follow up on Messenger
            </a>
            <button type="button" onClick={onClose}>
              Return to the property
            </button>
          </section>
        ) : (
          <>
            <div className="booking-modal-scroll">
              <div className="booking-modal-heading">
                <p className="eyebrow">
                  <UiIcon name="check" size={12} /> Live availability · Direct
                  with host
                </p>
                <h2 id={titleId}>Reserve Your Sanctuary</h2>
                <p>
                  Choose your preferred dates and send your stay details. The
                  host will confirm the final rate directly with you.
                </p>
              </div>
              <form
                action={action}
                onSubmit={() => { if (idempotencyInputRef.current && !idempotencyInputRef.current.value) idempotencyInputRef.current.value = crypto.randomUUID(); }}
                className="booking-modal-form booking-stitch-form"
              >
                {state.status === "error" ? (
                  <div className="booking-modal-error" role="alert">
                    {state.message}
                  </div>
                ) : null}
                <input
                  type="hidden"
                  name="idempotencyKey"
                  defaultValue=""
                  ref={idempotencyInputRef}
                />
                <input type="hidden" name="roomTypeId" value="" />
                <input type="hidden" name="preferredContact" value="phone" />
                <input
                  type="hidden"
                  name="bedroomChoice"
                  value={bedroomChoice}
                />
                <input type="hidden" name="parkingType" value={parkingType} />
                <input type="hidden" name="earlyCheckInHours" value={earlyCheckInHours} />
                <input type="hidden" name="lateCheckoutHours" value={lateCheckoutHours} />
                <label className="booking-honeypot">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                <section className="booking-suite-section">
                  <span>CHOOSE YOUR STAY</span>
                  <div className="booking-room-options">
                    {(
                      [
                        [
                          "bedroom_1",
                          "Master bedroom",
                          "Queen bed · Shared kitchen and bathroom",
                          "₱1,700 / night",
                        ],
                        [
                          "bedroom_2",
                          "Second bedroom",
                          "Double-size bunk bed · Occupancy pricing applies",
                          "₱1,700 / night",
                        ],
                      ] as const
                    ).map(([value, title, detail, price]) => (
                      <button
                        type="button"
                        className={
                          bedroomChoice === value ? "selected" : undefined
                        }
                        onClick={() => setBedroomChoice(value)}
                        key={value}
                      >
                        <span>
                          <strong>{title}</strong>
                          <small>{detail}</small>
                        </span>
                        <b>{price}</b>
                      </button>
                    ))}
                  </div>
                </section>
                <section className="booking-time-section">
                  <div className="booking-section-label"><span>OPTIONAL EXTRA TIME</span><small>Regular check-in is 2:00 PM · check-out is 11:00 AM · ₱150/hour</small></div>
                  <div className="booking-modal-grid">
                    <label><span>Early check-in</span><select value={earlyCheckInHours} onChange={(event) => { const value = Number(event.target.value); setEarlyCheckInHours(value); if (value) void showSuccess("Early check-in is subject to availability. We will flag it for host confirmation if another guest is checking out that day."); }}><option value={0}>No early check-in</option>{[1,2,3,4,5].map((hour) => <option key={hour} value={hour}>{hour} hour{hour === 1 ? "" : "s"} early · ₱{hour * 150}</option>)}</select></label>
                    <label><span>Late checkout</span><select value={lateCheckoutHours} onChange={(event) => { const value = Number(event.target.value); setLateCheckoutHours(value); if (value) void showSuccess("Late checkout is subject to availability. We will flag it for host confirmation if another guest is arriving that day."); }}><option value={0}>No late checkout</option>{[1,2,3,4,5].map((hour) => <option key={hour} value={hour}>{hour} hour{hour === 1 ? "" : "s"} late · ₱{hour * 150}</option>)}</select></label>
                  </div>
                </section>
                <section className="booking-date-section">
                  <div className="booking-section-label">
                    <span>CALENDAR</span>
                    <small>Choose your preferred stay</small>
                  </div>
                  <div className="booking-modal-grid">
                    <label>
                      <span>Check-in</span>
                      <input
                        name="checkIn"
                        type="date"
                        value={selectedCheckIn}
                        onChange={(event) =>
                          setSelectedCheckIn(event.target.value)
                        }
                        required
                      />
                    </label>
                    <label>
                      <span>Check-out</span>
                      <input
                        name="checkOut"
                        type="date"
                        value={selectedCheckOut}
                        onChange={(event) =>
                          setSelectedCheckOut(event.target.value)
                        }
                        required
                      />
                    </label>
                  </div>
                </section>
                <section className="booking-stay-details">
                  <h3>
                    <UiIcon name="sparkles" size={17} /> Stay Details
                  </h3>
                  <div className="booking-guest-row">
                    <div>
                      <strong>Guests</strong>
                      <small>Final occupancy confirmed by host</small>
                    </div>
                    <div>
                      <button
                        type="button"
                        aria-label="Remove guest"
                        onClick={() => adjustGuests(-1)}
                      >
                        −
                      </button>
                      <output>{guests}</output>
                      <button
                        type="button"
                        aria-label="Add guest"
                        onClick={() => adjustGuests(1)}
                      >
                        +
                      </button>
                    </div>
                    <input type="hidden" name="guests" value={guests} />
                  </div>
                  <div className="booking-selected-room-copy">
                    <strong>{bedroomChoice === "bedroom_1" ? "Master bedroom" : "Second bedroom"}</strong>
                    <small>{bedroomChoice === "bedroom_1" ? "Queen bed · Maximum 2 guests · ₱1,700/night" : "Double-size bunk bed · 2 pax ₱1,700 · 3 pax ₱1,950 · 4 pax ₱2,100 · +₱250 per guest after 4"}</small>
                  </div>
                </section>
                <section className="booking-parking-section">
                  <div className="booking-section-label">
                    <span>PARKING</span>
                    <small>Optional, subject to availability</small>
                  </div>
                  <div className="booking-parking-options">
                    {(
                      [
                        ["none", "No parking", "₱0 / night"],
                        ["car", "Car parking", "₱350 / night"],
                        ["motorcycle", "Motorcycle parking", "₱150 / night"],
                      ] as const
                    ).map(([value, label, price]) => (
                      <button
                        type="button"
                        className={
                          parkingType === value ? "selected" : undefined
                        }
                        onClick={() => setParkingType(value)}
                        key={value}
                      >
                        <strong>{label}</strong>
                        <b>{price}</b>
                      </button>
                    ))}
                  </div>
                </section>
                <div className="booking-preview-photos">
                  <figure>
                    <Image
                      src={bedroomChoice === "bedroom_1" ? "/images/uppadar-hollie/master-bedroom.jpg" : "/images/uppadar-hollie/second-bedroom-bunk-wide.png"}
                      alt={bedroomChoice === "bedroom_1" ? "Master bedroom with queen bed" : "Second bedroom with double-size bunk bed"}
                      fill
                      sizes="220px"
                    />
                    <figcaption>{bedroomChoice === "bedroom_1" ? "Master bedroom · Queen bed" : "Second bedroom · Double-size bunk bed"}</figcaption>
                  </figure>
                  <figure>
                    <Image
                      src="/images/uppadar-hollie/dining-table.png"
                      alt="Living and dining area"
                      fill
                      sizes="220px"
                    />
                    <figcaption>Living &amp; dining</figcaption>
                  </figure>
                </div>
                <section className="booking-contact-section">
                  <div className="booking-section-label">
                    <span>GUEST DETAILS</span>
                    <small>How should the host contact you?</small>
                  </div>
                  <label>
                    <span>Full name</span>
                    <input name="fullName" autoComplete="name" required />
                  </label>
                  <div className="booking-modal-grid">
                    <label>
                      <span>Email address (optional)</span>
                      <input name="email" type="email" autoComplete="email" />
                    </label>
                    <label>
                      <span>Contact number</span>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="09xx xxx xxxx"
                        required
                      />
                    </label>
                  </div>
                  <label>
                    <span>Special requests (optional)</span>
                    <textarea
                      name="specialRequests"
                      rows={3}
                      maxLength={1000}
                      placeholder="Arrival time, celebration, or anything the host should know"
                    />
                  </label>
                </section>
                <>
                  <BookingPriceReceipt
                    checkIn={selectedCheckIn}
                    checkOut={selectedCheckOut}
                    guests={guests}
                    bedroomChoice={bedroomChoice}
                    parkingType={parkingType}
                    earlyCheckInHours={earlyCheckInHours}
                    lateCheckoutHours={lateCheckoutHours}
                  />
                  <div className="booking-rate-note">
                    <UiIcon name="check" size={18} />
                    <div>
                      <strong>Rate confirmed by host</strong>
                      <small>
                        No payment is collected in this form. Current rates,
                        policies, and payment instructions are sent after
                        review.
                      </small>
                    </div>
                  </div>
                  <label className="booking-modal-consent">
                    <input name="consent" type="checkbox" required />
                    <span>
                      I agree that Uppadar Hollie may use my contact and stay
                      details to respond to this request. I have read the{" "}
                      <Link href="/privacy">Privacy Notice</Link> and{" "}
                      <Link href="/cookies">Cookie Notice</Link>.
                    </span>
                  </label>
                  <div className="booking-saved-note">
                    <UiIcon name="bookmark" size={17} />
                    <div>
                      <strong>Saved to this device</strong>
                      <small>
                        Your booking details remain available on this device.
                      </small>
                    </div>
                  </div>
                  <div className="booking-host-row">
                    <span>Questions? Host assistance</span>
                    <a
                      href={propertyProfile.messengerUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <UiIcon name="message" size={15} />
                      Reserve via Messenger
                    </a>
                  </div>
                </>
                <div className="booking-step-actions">
                  <button
                    className="booking-modal-submit"
                    type="submit"
                    disabled={pending}
                  >
                    <UiIcon name="message" size={17} />
                    {pending ? "Sending request…" : "Submit direct request"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
