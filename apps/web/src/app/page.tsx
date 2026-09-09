import Image from "next/image";
import Link from "next/link";
import AvailabilityCalendar from "./AvailabilityCalendar";
import { SavedBookingLink } from "./BookingMemory";
import ScrollReveal from "./ScrollReveal";
import { buildingAmenities, checkoutRules, galleryImages, galleryVideos, houseRules, nearbyPlaces, propertyProfile, unitAmenities } from "@/lib/property";

export const dynamic = "force-dynamic";
const amenityPills = ["2 bedrooms", "Fast Wi-Fi", "Netflix-ready", "Full kitchen", "Smart lock", "Self check-in"];

export default function Home() {
  return <main className="uh-site"><ScrollReveal />
    <nav className="uh-nav" aria-label="Primary navigation">
      <a className="uh-brand" href="#home"><Image src="/images/uppadar-hollie/logo-transparent.png" alt="Uppadar Hollie logo" width={46} height={46} /><span><strong>Uppadar Hollie</strong><small>Cebu City staycation</small></span></a>
      <div className="uh-nav-links"><a href="#spaces">The space</a><a href="#amenities">What&apos;s inside</a><a href="#location">Neighborhood</a></div>
      <a className="uh-button uh-button-small" href="#availability">Check dates</a>
    </nav>

    <section className="uh-hero" id="home">
      <div className="uh-hero-copy">
        <p className="uh-kicker"><span>●</span> Your easy Cebu home base</p>
        <h1>Stay comfy.<br />Live <em>local.</em></h1>
        <p className="uh-lede">A cheerful two-bedroom condo in Banilad for family trips, friend getaways, and work visits that deserve a little more room.</p>
        <div className="uh-actions"><a className="uh-button" href="#availability">Find your dates <span>→</span></a><a className="uh-text-link" href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Chat with your host</a></div>
        <div className="uh-mini-proof"><strong>Right where you need to be.</strong><span>Deca Homes Tower 1 · near Oakridge Business Park</span></div>
      </div>
      <div className="uh-hero-visual">
        <div className="uh-postcard"><Image src="/images/uppadar-hollie/hero.jpg" alt="Warm living room at Uppadar Hollie" fill preload sizes="(max-width: 850px) 92vw, 48vw" /><span>Make yourself at home ☺</span></div>
        <div className="uh-room-note"><strong>2</strong><span>cozy<br />bedrooms</span></div>
        <div className="uh-location-stamp"><span>CEB</span><strong>Banilad</strong><small>Cebu City</small></div>
      </div>
    </section>

    <section className="uh-marquee" aria-label="Property amenities">{amenityPills.map((item) => <span key={item}>{item}</span>)}</section>

    <section className="uh-welcome" data-reveal>
      <p className="uh-section-no">01 / WELCOME IN</p>
      <div><h2>A city stay that feels like somebody thought of everything.</h2><p>Drop your bags, cook something good, stream a movie, and settle in. Uppadar Hollie keeps the practical things simple so your Cebu days can be the fun part.</p></div>
    </section>

    <section className="uh-tour" id="spaces" data-reveal>
      <div className="uh-section-heading"><div><p className="uh-section-no">02 / TAKE A LOOK</p><h2>Your little corner<br />of Cebu.</h2></div><p>Bright spaces, warm details, and enough room for your crew. Here&apos;s a peek before you arrive.</p></div>
      <div className="uh-photo-grid">
        {galleryImages.map((image, index) => <figure key={image.src} className={`uh-photo uh-photo-${index + 1}`}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 92vw, 45vw" />{index === 0 && <figcaption>Living room · movie nights welcome</figcaption>}</figure>)}
      </div>
      <div className="uh-video-row"><div><strong>Want the full walk-through?</strong><span>See the space in motion on Facebook.</span></div>{galleryVideos.map((video, index) => <a key={video.src} href={video.src} target="_blank" rel="noreferrer"><span>▶</span> Tour {index + 1}</a>)}</div>
    </section>

    <section className="uh-amenities" id="amenities" data-reveal>
      <div className="uh-amenity-intro"><p className="uh-section-no">03 / THE GOOD STUFF</p><h2>Everything for an easy stay.</h2><p>No hotel-room shuffle. You have the everyday comforts that make longer weekends and busy work trips feel effortless.</p><a className="uh-text-link" href="#availability">Ready to pick dates?</a></div>
      <div className="uh-feature-cards">
        <article className="uh-feature-main"><span className="uh-icon">⌂</span><h3>Room for your people</h3><p>Two comfortable bedrooms, including a double-deck bed, give families and groups space to actually unwind.</p><strong>Sleep easy in Cebu</strong></article>
        <article><span className="uh-icon">⌁</span><h3>Cook &amp; connect</h3><p>Complete kitchen essentials, high-speed Wi-Fi, and a Netflix-ready smart TV.</p></article>
        <article><span className="uh-icon">↗</span><h3>Come and go easily</h3><p>Smart-lock access makes secure self check-in simple—even after a full travel day.</p></article>
      </div>
    </section>

    <section className="uh-details" data-reveal>
      <article><h3>Inside the condo</h3><ul>{unitAmenities.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article><h3>Building &amp; area</h3><ul>{buildingAmenities.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article className="uh-rules"><h3>Good to know</h3><ul>{[...houseRules, ...checkoutRules].map((item) => <li key={item}>{item}</li>)}</ul></article>
    </section>

    <section className="uh-location" id="location" data-reveal>
      <div className="uh-location-photo"><Image src="/images/uppadar-hollie/lounge.jpg" alt="Open-plan lounge and kitchen at Uppadar Hollie" fill sizes="(max-width: 800px) 92vw, 48vw" /><span>Close to the city.<br />Cozy when you&apos;re home.</span></div>
      <div className="uh-location-copy"><p className="uh-section-no">04 / AROUND THE CORNER</p><h2>Banilad puts Cebu within easy reach.</h2><address>{propertyProfile.address}</address><ul>{nearbyPlaces.map((place) => <li key={place}>{place}</li>)}</ul><a className="uh-button uh-button-light" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propertyProfile.address)}`} target="_blank" rel="noreferrer">Open in Google Maps →</a></div>
    </section>

    <section className="uh-book" id="availability" data-reveal>
      <div className="uh-book-copy"><p className="uh-section-no">05 / LET&apos;S MAKE PLANS</p><h2>Cebu is calling.<br />Pick your dates.</h2><p>Message Uppadar Hollie for current rates, promotions, guest limits, and availability.</p><div className="uh-book-links"><div><strong>Already requested?</strong><SavedBookingLink /></div><div><strong>Book with a real person</strong><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Message us on Facebook →</a></div></div></div>
      {propertyProfile.bookingConfigured ? <AvailabilityCalendar /> : <div className="uh-setup-card"><span>CALENDAR COMING SOON</span><h3>We&apos;re getting the booking calendar ready.</h3><p>Until the client&apos;s new booking account is connected, send your preferred dates directly through the official Facebook page.</p><a className="uh-button" href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Message on Facebook →</a><a className="uh-text-link" href={propertyProfile.airbnbUrl} target="_blank" rel="noreferrer">Or view the Airbnb listing</a></div>}
    </section>

    <section className="uh-closing" data-reveal><Image src="/images/uppadar-hollie/logo-transparent.png" alt="Uppadar Hollie logo" width={128} height={128} /><div><p>Comfort. Convenience. Cebu.</p><h2>Come for the city.<br />Stay for the <em>homey</em> feeling.</h2><div className="uh-actions"><a className="uh-button" href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Start a conversation</a><a className="uh-text-link" href={propertyProfile.facebookUrl} target="_blank" rel="noreferrer">Follow on Facebook</a></div></div></section>

    <footer className="uh-footer"><div className="uh-brand"><Image src="/images/uppadar-hollie/logo-transparent.png" alt="" width={42} height={42} /><span><strong>Uppadar Hollie</strong><small>{propertyProfile.tagline}</small></span></div><p>{propertyProfile.address}</p><div><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><span>© {new Date().getFullYear()}</span></div></footer>
  </main>;
}
