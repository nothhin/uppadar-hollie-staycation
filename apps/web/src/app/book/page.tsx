import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { submitBookingRequest } from "./actions";
import { propertyProfile } from "@/lib/property";
import styles from "./book.module.css";
import BookingPriceFields from "./BookingPriceFields";
import BookingIdempotencyInput from "./BookingIdempotencyInput";
import UiIcon from "../UiIcon";

export const metadata: Metadata = { title: "Request a booking" };

export default async function BookingPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  if (params.submitted === "1") return <main className={styles.shell}><section className={styles.success}><Image src="/images/uppadar-hollie/logo.jpg" alt="Uppadar Hollie Staycation Cebu" width={110} height={110} /><p>Booking request received</p><h1>Thank you. We’ll be in touch.</h1><p>Your dates are pending review—not yet confirmed. Uppadar Hollie Staycation Cebu will contact you with availability, the final rate, stay rules, and payment instructions.</p><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Follow up on Messenger</a><Link href="/">Return to Uppadar Hollie</Link></section></main>;

  return <main className={styles.shell}>
    <header><Link className={styles.brand} href="/"><Image src="/images/uppadar-hollie/logo-transparent.png" alt="" width={42} height={42} /><span><strong>Uppadar Hollie</strong><small>ONLINE</small></span></Link><span className={styles.pageLabel}>Availability and booking</span><Link href="/#availability">Back</Link></header>
    <section className={styles.progress}><div><b>1</b><strong>Step 1: Dates &amp; room</strong><small>Step 1 of 3</small></div><ol><li>1. Select Stay</li><li>2. Guest Details</li><li>3. Confirmed</li></ol></section>
    <div className={styles.layout}>
      <section className={styles.intro}><p><UiIcon name="check" size={13} /> Live availability · Direct with host</p><h1>Reserve Your Sanctuary</h1><p>Choose your preferred dates and send your stay details. Uppadar Hollie will confirm availability, final pricing, payment instructions, and house rules directly with you.</p><div className={styles.roomTiles}><figure><Image src="/images/uppadar-hollie/master-bedroom.jpg" alt="Master bedroom" fill sizes="(max-width: 760px) 50vw, 220px" /><figcaption>Master Bedroom</figcaption></figure><figure><Image src="/images/uppadar-hollie/bunk-bedroom.jpg" alt="Second bunk bedroom" fill sizes="(max-width: 760px) 50vw, 220px" /><figcaption>Second Bedroom</figcaption></figure></div><aside><strong>Questions? Host assistance</strong><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer"><UiIcon name="message" size={16} />Reserve via Messenger</a></aside></section>
      <form action={submitBookingRequest} className={styles.form}>
        <div className={styles.formHeading}><span>SUITE CONFIGURATION</span><h2>Entire two-bedroom condo</h2><p>Queen master bedroom · Double-size bunk room · Fully equipped kitchen</p><strong>Rate confirmed by host</strong></div>
        {params.error ? <div className={styles.error} role="alert">We couldn’t submit those details. Check every field or contact us directly.</div> : null}
        <BookingIdempotencyInput /><input type="hidden" name="roomTypeId" value="" /><input type="hidden" name="preferredContact" value="phone" />
        <label className={styles.honeypot}>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <BookingPriceFields initialCheckIn={params.checkIn} initialCheckOut={params.checkOut} initialGuests={params.guests} />
        <label><span>Full name</span><input name="fullName" autoComplete="name" required /></label>
        <label><span>Email address (optional)</span><input name="email" type="email" autoComplete="email" /></label>
        <label><span>Contact number (required)</span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="09xx xxx xxxx" required /><small>Uppadar Hollie will call this number about your request.</small></label>
        <label><span>Special requests (optional)</span><textarea name="specialRequests" rows={4} maxLength={1000} placeholder="Arrival time, celebration, or anything Uppadar Hollie should know" /></label>
        <label className={styles.consent}><input name="consent" type="checkbox" required /><span>I agree that Uppadar Hollie may use my contact and stay details to respond to this request. I have read the <Link href="/privacy">Privacy Notice</Link> and <Link href="/cookies">Cookie Notice</Link>. This does not confirm a reservation, and payment instructions are handled offline.</span></label>
        <div className={styles.saved}><strong><UiIcon name="bookmark" size={15} /> Saved to this device</strong><span>Your booking draft stays available on this device.</span></div>
        <button type="submit"><UiIcon name="message" size={18} />Submit direct request</button><small>This sends a request only. Your stay is confirmed after the host reviews your dates and contacts you.</small>
      </form>
    </div>
    <nav className={styles.bottomNav}><Link href="/"><UiIcon name="home" /><span>Explore</span></Link><Link href="/#rooms"><UiIcon name="bed" /><span>Bedrooms</span></Link><Link className={styles.activeBook} href="/book"><UiIcon name="calendar" /><span>Book</span></Link><Link href="/#amenities"><UiIcon name="sparkles" /><span>Amenities</span></Link><a href={propertyProfile.messengerUrl}><UiIcon name="message" /><span>Host</span></a></nav>
  </main>;
}
