import Image from "next/image";
import Link from "next/link";
import AvailabilityCalendar from "./AvailabilityCalendar";
import { SavedBookingLink } from "./BookingMemory";
import ScrollReveal from "./ScrollReveal";
import {
  amenityHighlights,
  buildingAmenities,
  checkoutRules,
  galleryImages,
  galleryVideos,
  houseRules,
  nearbyPlaces,
  propertyProfile,
  stayHighlights,
  unitAmenities,
} from "@/lib/property";

export const dynamic = "force-dynamic";

export default function Home() {
  return <main><ScrollReveal />
    <section className="snow-hero" id="home">
      <Image src="/images/uppadar-hollie/hero.jpg" alt="Uppadar Hollie's warm living room and illuminated feature wall" fill preload sizes="100vw" className="snow-hero-image" />
      <div className="snow-hero-overlay" />
      <nav className="snow-nav" aria-label="Primary navigation">
        <a className="snow-brand" href="#home"><Image src="/images/uppadar-hollie/logo.jpg" alt="Uppadar Hollie logo" width={58} height={58} /><span><strong>Uppadar Hollie</strong><small>Staycation · Cebu</small></span></a>
        <div><a href="#about">About</a><a href="#gallery">Gallery</a><a href="#amenities">Amenities</a><a href="#availability">Availability</a><a href="#location">Location</a></div>
        <a className="gold-button" href="#availability">Plan your stay</a>
      </nav>
      <div className="snow-hero-copy">
        <p>2 bedrooms · Fully furnished · Smart self check-in</p>
        <h1>Your home away<br />from home <em>in Cebu.</em></h1>
        <span>Comfort. Convenience. Cebu.</span>
        <div className="hero-actions"><a className="gold-button" href="#availability">View availability</a><a className="ghost-button" href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Message the host</a></div>
      </div>
    </section>

    <section className="snow-highlights" aria-label="Stay highlights" data-reveal>{amenityHighlights.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>

    <section className="snow-section snow-intro" id="about" data-reveal>
      <div><p className="eyebrow">Welcome to Uppadar Hollie</p><h2>Experience Cebu like a local.</h2></div>
      <p>A fully furnished two-bedroom condo made for families, friends, and business travelers. Settle into a relaxing space with a complete kitchen, fast Wi-Fi, Netflix-ready entertainment, and secure smart-lock access.</p>
    </section>

    <section className="snow-section" id="gallery" data-reveal>
      <div className="snow-heading"><p className="eyebrow">A look inside</p><h2>Thoughtful comfort,<br />from arrival to checkout.</h2></div>
      <div className="snow-gallery">{galleryImages.map((image, index) => <figure key={image.src} className={index === 0 ? "snow-gallery-feature" : ""}><Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 58vw" : "(max-width: 800px) 100vw, 30vw"} /></figure>)}</div>
      <div className="snow-video-showcase" aria-label="Uppadar Hollie video tours">
        <div className="snow-video-heading"><p className="eyebrow">Watch the space</p><h3>See the stay in motion.</h3></div>
        <div className="snow-video-grid">{galleryVideos.map((video) => <a className="video-link-card" key={video.src} href={video.src} target="_blank" rel="noreferrer"><span aria-hidden="true">▶</span><strong>{video.label}</strong><small>Open on Facebook</small></a>)}</div>
      </div>
    </section>

    <section className="snow-section stay-grid" data-reveal>{stayHighlights.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</section>

    <section className="details-section" id="amenities" data-reveal>
      <div className="details-heading"><p className="eyebrow">Inside your stay</p><h2>Everything you need for an easy Cebu visit.</h2><p>Cook at home, stream a favorite show, stay connected, and enjoy convenient self check-in. Current rates, occupancy limits, and stay policies will be confirmed with the host before launch.</p></div>
      <div className="details-columns">
        <article><h3>Unit amenities</h3><ul>{unitAmenities.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><h3>Property &amp; location</h3><ul>{buildingAmenities.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div>
      <div className="important-notes">
        <article><strong>Stay rates</strong><p>Message Uppadar Hollie for the current nightly rate, promotions, and total for your preferred dates.</p></article>
        <article><strong>Direct booking</strong><p>Request your dates through the calendar or contact the Facebook page for personal assistance.</p></article>
        <article><strong>House rules</strong><ul>{houseRules.map((rule) => <li key={rule}>{rule}</li>)}</ul></article>
        <article><strong>Before you leave</strong><ul>{checkoutRules.map((rule) => <li key={rule}>{rule}</li>)}</ul></article>
      </div>
    </section>

    <section className="availability-section" id="availability" data-reveal>
      <div className="availability-copy"><p className="eyebrow">Plan your visit</p><h2>Find your Cebu dates.</h2><p>Choose an open date to begin a booking request. The live calendar will connect to the client’s new account before deployment.</p><div className="contact-card"><strong>Already sent a request?</strong><SavedBookingLink /></div><div className="contact-card"><strong>Prefer personal assistance?</strong><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Message Uppadar Hollie on Facebook</a><a href={propertyProfile.airbnbUrl} target="_blank" rel="noreferrer">View the Airbnb listing</a></div></div>
      {propertyProfile.bookingConfigured ? <AvailabilityCalendar /> : <div className="calendar-shell booking-setup-card"><p className="eyebrow">Booking setup in progress</p><h3>The reservation calendar is ready for the client’s new account.</h3><p>Rates, guest capacity, payment details, and policies will be connected before launch. For now, use the official Facebook page or Airbnb listing to request dates.</p><div className="hero-actions"><a className="gold-button" href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Message on Facebook</a><a className="ghost-button" href={propertyProfile.airbnbUrl} target="_blank" rel="noreferrer">Open Airbnb</a></div></div>}
    </section>

    <section className="location-panel" id="location" data-reveal>
      <div><p className="eyebrow">Well placed in Banilad</p><h2>City convenience,<br />at-home comfort.</h2><address>{propertyProfile.address}</address><ul className="nearby-list">{nearbyPlaces.map((place) => <li key={place}>{place}</li>)}</ul><a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propertyProfile.address)}`} target="_blank" rel="noreferrer">Open in Google Maps →</a></div>
      <div className="location-image"><Image src="/images/uppadar-hollie/lounge.jpg" alt="Uppadar Hollie's open-plan lounge and kitchen" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
    </section>

    <section className="snow-contact" id="contact" data-reveal><Image src="/images/uppadar-hollie/logo.jpg" alt="Uppadar Hollie Staycation Cebu logo" width={180} height={180} /><div><p className="eyebrow">Ready when you are</p><h2>Let’s plan your stay.</h2><p>Visiting Cebu for business, a family vacation, or a weekend getaway? Connect directly with Uppadar Hollie to confirm the best available option.</p><div className="contact-links"><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Messenger</a><a href={propertyProfile.airbnbUrl} target="_blank" rel="noreferrer">Airbnb</a><a href={propertyProfile.facebookUrl} target="_blank" rel="noreferrer">Facebook page</a></div></div></section>

    <footer className="snow-footer"><a className="snow-brand" href="#home"><span><strong>Uppadar Hollie Staycation Cebu</strong><small>{propertyProfile.tagline}</small></span></a><p>{propertyProfile.address}</p><div className="snow-footer-meta"><nav aria-label="Legal"><Link href="/privacy">Privacy Notice</Link><Link href="/cookies">Cookie Notice</Link></nav><p>© {new Date().getFullYear()} Uppadar Hollie Staycation Cebu</p></div></footer>
  </main>;
}
