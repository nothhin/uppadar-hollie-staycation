import Image from "next/image";
import Link from "next/link";
import AvailabilityCalendar from "./AvailabilityCalendar";
import UiIcon, { type IconName } from "./UiIcon";
import { SavedBookingLink } from "./BookingMemory";
import BookingLauncher from "./BookingLauncher";
import { amenityGroups, galleryImages, galleryVideos, nearbyPlaces, propertyProfile, unavailableAmenities } from "@/lib/property";

export const dynamic = "force-dynamic";

const quickFacts: ReadonlyArray<[IconName, string]> = [["bed", "2 Bedrooms"], ["users", "Family ready"], ["wifi", "Fast Wi-Fi"], ["lock", "Smart lock"]];
export default function Home() {
  return <main className="pwa-site" id="home">
    <header className="pwa-header">
      <a className="pwa-logo" href="#home"><Image src="/images/uppadar-hollie/logo-transparent.png" alt="Uppadar Hollie" width={42} height={42} /><span><strong>Uppadar Hollie</strong><small>Staycation Cebu</small></span></a>
      <span className="pwa-online"><i /> Online</span>
      <div className="pwa-head-actions"><BookingLauncher className="pwa-icon-book"><UiIcon name="calendar" size={16} /><span className="sr-only">Open booking form</span></BookingLauncher><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer" aria-label="Chat with the host"><UiIcon name="message" size={16} /></a></div>
    </header>

    <div className="pwa-install"><span className="pwa-install-icon"><UiIcon name="install" size={17} /></span><div><strong>Install Uppadar Hollie</strong><small>Fast offline access &amp; instant booking status.</small></div><button type="button">Install</button><button className="pwa-install-close" type="button" aria-label="Dismiss install prompt">×</button></div>
    <div className="pwa-status"><span><i /> Online · Ready to book</span><span><UiIcon name="bolt" size={11} /> Instant sync active</span></div>

    <section className="pwa-hero">
      <Image src="/images/uppadar-hollie/hero.jpg" alt="Uppadar Hollie condo living room" fill priority sizes="(max-width: 720px) 100vw, 760px" />
      <div className="pwa-hero-top"><span><UiIcon name="pin" size={12} /> Banilad, Cebu City</span><strong>Direct booking</strong></div>
      <div className="pwa-hero-copy"><small>YOUR HOME AWAY FROM HOME</small><h1>Your cozy escape,<br />away from home.</h1><p>Comfort. Convenience. Cebu.</p></div>
      <div className="pwa-facts">{quickFacts.map(([icon,label]) => <div key={label}><span><UiIcon name={icon} size={19} /></span><strong>{label}</strong></div>)}</div>
    </section>

    <div className="pwa-primary-actions"><BookingLauncher><UiIcon name="calendar" size={17} />Reserve your dates</BookingLauncher><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer"><UiIcon name="message" size={17} />Chat host</a></div>

    <section className="pwa-section" id="spaces">
      <div className="pwa-section-title"><div><small>EXPERIENCE THE SPACE</small><h2>Curated corners designed for deep rest &amp; easy living.</h2></div><span>360°<small>VIEW</small></span></div>
      <div className="pwa-gallery">{galleryImages.slice(0,5).map((image,index) => <figure key={image.src} className={index === 0 ? "pwa-gallery-main" : ""}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 720px) 70vw, 360px" /></figure>)}</div>
      <div className="pwa-tour-links">{galleryVideos.map((video,index) => <a key={video.src} href={video.src} target="_blank" rel="noreferrer"><UiIcon name="play" size={14} />Watch tour {index+1}</a>)}</div>
    </section>

    <section className="pwa-rooms" id="rooms">
      <div className="pwa-rooms-heading"><small>SLEEPING SPACES</small><h2>Two rooms made<br />for real rest.</h2><p>Both bedrooms are air-conditioned and thoughtfully fitted for comfort, storage, privacy, and safety.</p></div>
      <article><div className="pwa-room-photo"><Image src="/images/uppadar-hollie/master-bedroom.jpg" alt="Master bedroom with queen-size bed" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="pwa-room-copy"><span>MASTER BEDROOM</span><h3>Queen-size comfort</h3><p>A comfy queen-size spring mattress with the practical details you want for an easy stay.</p><ul><li>Queen-size spring mattress</li><li>Built-in wardrobe</li><li>Blackout blind</li><li>Vanity mirror with LED light</li><li>Safety window grill</li><li>Air conditioner</li></ul></div></article>
      <article><div className="pwa-room-photo"><Image src="/images/uppadar-hollie/bunk-bedroom.jpg" alt="Second bedroom with double-size bunk bed" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="pwa-room-copy"><span>SECOND BEDROOM</span><h3>Double-size bunk room</h3><p>A roomy bunk setup with large spring mattresses, ideal for family members or friends sharing the stay.</p><ul><li>Double-size bunk bed</li><li>Large spring mattresses</li><li>Built-in wardrobe</li><li>Vanity mirror</li><li>Safety window grill</li><li>Air conditioner</li></ul></div></article>
    </section>

    <section className="pwa-section pwa-amenities" id="amenities">
      <small>WHAT THIS PLACE OFFERS</small><h2>Stay essentials,<br />already handled.</h2>
      <div className="pwa-amenity-groups">{amenityGroups.map(group => <article className="pwa-amenity-group" key={group.title}><header><span><UiIcon name={group.icon as IconName} size={19} /></span><h3>{group.title}</h3></header><ul>{group.items.map(item => <li key={item.name}><UiIcon name="check" size={15} /><div><strong>{item.name}</strong>{"detail" in item && item.detail ? <small>{item.detail}</small> : null}</div></li>)}</ul></article>)}</div>
      <article className="pwa-unavailable"><header><span aria-hidden="true">×</span><div><small>NOT INCLUDED</small><h3>Unavailable at this property</h3></div></header><ul>{unavailableAmenities.map(item => <li key={item}><span aria-hidden="true">×</span><div><strong>{item}</strong>{item === "Carbon monoxide alarm" ? <small>There is no carbon monoxide detector on the property.</small> : null}</div></li>)}</ul></article>
    </section>

    <section className="pwa-location" id="location">
      <div><small>YOUR CEBU HOME BASE</small><h2>Close to the city.<br />Cozy when you&apos;re home.</h2><address>{propertyProfile.address}</address><ul>{nearbyPlaces.map(place => <li key={place}>{place}</li>)}</ul><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propertyProfile.address)}`} target="_blank" rel="noreferrer">Open in Google Maps ↗</a></div>
      <Image src="/images/uppadar-hollie/lounge.jpg" alt="Uppadar Hollie lounge and kitchen" width={520} height={640} />
    </section>

    <section className="pwa-booking" id="availability">
      <div className="pwa-book-heading"><span>LIVE AVAILABILITY · DIRECT WITH HOST</span><h2>Reserve your Cebu stay.</h2><p>Choose your preferred dates and contact Uppadar Hollie directly. Rates and guest limits will be confirmed by the host.</p></div>
      <div className="pwa-config-card"><span>STAY CONFIGURATION</span><article><div><strong>Entire two-bedroom condo</strong><small>Fully furnished · Kitchen · Smart lock</small></div><b>Ask host</b></article><article><div><strong>Perfect for your Cebu visit</strong><small>Family · Friends · Business travel</small></div><b>Flexible</b></article></div>
      <AvailabilityCalendar />
      <div className="pwa-returning"><strong>Already sent a request?</strong><SavedBookingLink /></div>
    </section>

    <section className="pwa-host"><Image src="/images/uppadar-hollie/logo-transparent.png" alt="Uppadar Hollie logo" width={110} height={110} /><div><small>DIRECT OWNER ASSISTANCE</small><h2>Questions before booking?</h2><p>Talk directly with Uppadar Hollie for availability, current promotions, policies, and anything you need for a comfortable Cebu stay.</p><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer">Chat with the host →</a></div></section>

    <footer className="pwa-footer"><div className="pwa-logo"><Image src="/images/uppadar-hollie/logo-transparent.png" alt="" width={38} height={38} /><span><strong>Uppadar Hollie</strong><small>{propertyProfile.tagline}</small></span></div><div><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><span>© {new Date().getFullYear()}</span></div></footer>

    <nav className="pwa-bottom-nav" aria-label="Mobile navigation"><a href="#home"><span><UiIcon name="home" /></span>Explore</a><a href="#spaces"><span><UiIcon name="image" /></span>Spaces</a><BookingLauncher className="pwa-bottom-book"><span><UiIcon name="calendar" /></span>Book</BookingLauncher><a href={propertyProfile.messengerUrl} target="_blank" rel="noreferrer"><span><UiIcon name="message" /></span>Chat</a><a href="#location"><span><UiIcon name="pin" /></span>Location</a></nav>
  </main>;
}
