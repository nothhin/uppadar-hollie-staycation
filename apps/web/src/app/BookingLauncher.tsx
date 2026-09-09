"use client";

import { useState, type ReactNode } from "react";
import BookingModal from "./BookingModal";

export default function BookingLauncher({ children, className }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return <>
    <button className={className} type="button" onClick={() => setOpen(true)}>{children}</button>
    {open ? <BookingModal checkIn="" checkOut="" onClose={() => setOpen(false)} /> : null}
  </>;
}
