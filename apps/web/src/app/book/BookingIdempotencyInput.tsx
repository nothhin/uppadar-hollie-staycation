"use client";

import { useEffect, useRef } from "react";

export default function BookingIdempotencyInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = crypto.randomUUID();
  }, []);

  return <input ref={inputRef} type="hidden" name="idempotencyKey" defaultValue="" />;
}
