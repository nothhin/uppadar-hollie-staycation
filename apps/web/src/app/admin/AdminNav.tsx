"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const navigation = [
  { label: "Overview", href: "/admin#overview", id: "overview" },
  { label: "Stay enquiries", href: "/admin#booking-requests", id: "booking-requests" },
  { label: "Stay calendar", href: "/admin#calendar", id: "calendar" },
  { label: "Confirmed stays", href: "/admin/confirmed", id: "confirmed" },
  { label: "Housekeeping & finance", href: "/admin/operations", id: "operations" },
  { label: "Guest guide", href: "/admin#guest-rules", id: "guest-rules" },
  { label: "Property settings", href: "/admin#settings", id: "settings" },
] as const;

function useActiveSection() {
  const pathname = usePathname();
  const [hash, setHash] = useState("overview");
  useEffect(() => {
    const update = () => setHash(window.location.hash.slice(1) || "overview");
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [pathname]);
  if (pathname === "/admin/confirmed") return "confirmed";
  if (pathname === "/admin/operations") return "operations";
  return hash;
}

export function AdminNav({ activeClassName }: { activeClassName: string }) {
  const active = useActiveSection();
  return <nav aria-label="Host workspace navigation">{navigation.map((item,index)=><a className={active===item.id?activeClassName:undefined} href={item.href} key={item.id}><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span>{item.label}</a>)}</nav>;
}

type MobileNavClasses = { button:string; backdrop:string; drawer:string; drawerOpen:string; drawerHeader:string; closeButton:string; active:string };

export function AdminMobileNav({ classes }: { classes: MobileNavClasses }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const drawer = open ? createPortal(<div className={classes.backdrop} role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)setOpen(false);}}><aside id="mobile-admin-navigation" className={`${classes.drawer} ${classes.drawerOpen}`} role="dialog" aria-modal="true" aria-label="Host workspace navigation"><div className={classes.drawerHeader}><div><strong>Uppadar Hollie</strong><small>Host workspace</small></div><button className={classes.closeButton} type="button" aria-label="Close host navigation" onClick={()=>setOpen(false)}>×</button></div><nav aria-label="Mobile host navigation">{navigation.map((item,index)=><a className={active===item.id?classes.active:undefined} href={item.href} key={item.id} onClick={()=>setOpen(false)}><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span>{item.label}</a>)}</nav></aside></div>, document.body) : null;

  return <><button className={classes.button} type="button" aria-label="Open admin navigation" aria-expanded={open} aria-controls="mobile-admin-navigation" onClick={()=>setOpen(true)}><span aria-hidden="true"><i/><i/><i/></span></button>{drawer}</>;
}
