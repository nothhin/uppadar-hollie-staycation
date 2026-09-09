import Image from "next/image";
import Link from "next/link";
import AvailabilityCalendar from "./AvailabilityCalendar";
import { SavedBookingLink } from "./BookingMemory";
import { galleryImages, galleryVideos, nearbyPlaces, propertyProfile, unitAmenities } from "@/lib/property";

export const dynamic = "force-dynamic";

const quickFacts = [["▣", "2 Beds"], ["♟", "Family ready"], ["⌁", "Fast Wi-Fi"], ["⌂", "Smart lock"]] as const;

export default function Home() {
  return <main className="pwa-site" id="home">
    <header className="pwa-header">
      <a className="pwa-logo" href="#home"><Image src="/images/uppadar-hollie/logo-transparent.png" alt="Uppadar Hollie" width={42} height={42} /><span><strong>Uppadar Hollie</strong><small>Staycation Cebu</small></span></a>
      <span className="pwa-online"><i /> Online</span>
      <div className="pwa-head-actions"><a href="#availability" aria-label="Open booking">▣</a><button type="button" aria-label="Open profile">♟</button></div>
    </header>

    <div className="pwa-install"><span className="pwa-install-icon">▣</span><div><strong>Install Uppadar Hollie</strong><small>Fast offline access &amp; instant booking status.</small></div><button type="button">Install</button><span>×</span></div>
    <div className="pwa-status"><span><i /> Online · Ready to book</span><span>⚡ Instant sync active</span></div>

    <section className="pwa-hero">
      <Image src="/images/uppadar-hollie/hero.jpg" alt="Uppadar Hollie condo living room" fill priority sizes="(max-width: 720px) 100vw, 760px" />
      <div className="pwa-hero-top"><span>● Banilad, Cebu City</span><strong>Direct booking</strong></div>
      <div className="pwa-hero-copy"><small>YOUR HOME AWAY FROM HOME</small><h1>Your cozy escape,<br />away from home.</h1><p>Comfort. Convenience. Cebu.</p></div>
      <div className="pwa-facts">{quickFacts.map(([icon,label]) => <div key={label}><span>{icon}</span><strong>{label}</strong></div>)}</div>
    </section>

    <div className="pwa-primary-actions"><a href="#availability">▣ &nbsp;Reserve your dates</a><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">▱ &nbsp;Chat host</a></div>

    <section className="pwa-section" id="spaces">
      <div className="pwa-section-title"><div><small>EXPERIENCE THE SPACE</small><h2>Curated corners designed for deep rest &amp; easy living.</h2></div><span>360°<small>VIEW</small></span></div>
      <div className="pwa-gallery">{galleryImages.slice(0,5).map((image,index) => <figure key={image.src} className={index === 0 ? "pwa-gallery-main" : ""}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 720px) 70vw, 360px" /></figure>)}</div>
      <div className="pwa-tour-links">{galleryVideos.map((video,index) => <a key={video.src} href={video.src} target="_blank" rel="noreferrer">▶ Watch tour {index+1}</a>)}</div>
    </section>

    <section className="pwa-section pwa-amenities" id="amenities">
      <small>EVERYTHING INCLUDED</small><h2>Stay essentials,<br />already handled.</h2>
      <div className="pwa-amenity-grid">{unitAmenities.map((item,index) => <article key={item}><span>{["▣","⌁","♨","▤","◉","⌂","◇","✓","♟"][index] || "✓"}</span><p>{item}</p></article>)}</div>
    </section>

    <section className="pwa-location" id="location">
      <div><small>YOUR CEBU HOME BASE</small><h2>Close to the city.<br />Cozy when you&apos;re home.</h2><address>{propertyProfile.address}</address><ul>{nearbyPlaces.map(place => <li key={place}>{place}</li>)}</ul><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propertyProfile.address)}`} target="_blank" rel="noreferrer">Open in Google Maps ↗</a></div>
      <Image src="/images/uppadar-hollie/lounge.jpg" alt="Uppadar Hollie lounge and kitchen" width={520} height={640} />
    </section>

    <section className="pwa-booking" id="availability">
      <div className="pwa-book-heading"><span>LIVE AVAILABILITY · DIRECT WITH HOST</span><h2>Reserve your Cebu stay.</h2><p>Choose your preferred dates and contact Uppadar Hollie directly. Rates and guest limits will be confirmed by the host.</p></div>
      <div className="pwa-config-card"><span>STAY CONFIGURATION</span><article><div><strong>Entire two-bedroom condo</strong><small>Fully furnished · Kitchen · Smart lock</small></div><b>Ask host</b></article><article><div><strong>Perfect for your Cebu visit</strong><small>Family · Friends · Business travel</small></div><b>Flexible</b></article></div>
      {propertyProfile.bookingConfigured ? <AvailabilityCalendar /> : <div className="pwa-calendar-placeholder"><div><span>CALENDAR</span><strong>Booking calendar setup</strong></div><p>The live client account will be connected before deployment. Message the host now to ask about open dates.</p><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">▱ Message host on Messenger</a></div>}
      <div className="pwa-returning"><strong>Already sent a request?</strong><SavedBookingLink /></div>
    </section>

    <section className="pwa-host"><Image src="/images/uppadar-hollie/logo-transparent.png" alt="Uppadar Hollie logo" width={110} height={110} /><div><small>DIRECT OWNER ASSISTANCE</small><h2>Questions before booking?</h2><p>Talk directly with Uppadar Hollie for availability, current promotions, policies, and anything you need for a comfortable Cebu stay.</p><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Chat with the host →</a></div></section>

    <footer className="pwa-footer"><div className="pwa-logo"><Image src="/images/uppadar-hollie/logo-transparent.png" alt="" width={38} height={38} /><span><strong>Uppadar Hollie</strong><small>{propertyProfile.tagline}</small></span></div><div><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><span>© {new Date().getFullYear()}</span></div></footer>

    <nav className="pwa-bottom-nav" aria-label="Mobile navigation"><a href="#home"><span>⌂</span>Explore</a><a href="#spaces"><span>▧</span>Spaces</a><a className="pwa-bottom-book" href="#availability"><span>▣</span>Book</a><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer"><span>▱</span>Chat</a><a href="#location"><span>⌖</span>Location</a></nav>
  </main>;
}
