# Uppadar Hollie Staycation Cebu

Local development copy of the direct-booking, availability, guest-status, deposit, and property-operations system for Uppadar Hollie at Deca Homes Tower 1, Banilad, Cebu City.

The public property website is branded and uses media supplied through the official Facebook page. Deployment is intentionally disabled until the owner provides a separate hosting account and a fresh Supabase project.

## Local development

```powershell
npm.cmd install
npm.cmd run dev --workspace web
```

Open `http://localhost:3000`.

## Before enabling direct booking

1. Confirm the maximum guest count and bedroom sleeping arrangements.
2. Confirm nightly rates, extra-guest pricing, parking fees, deposit amount, cancellation policy, and house rules.
3. Obtain the official phone number, email address, payment account, and payment QR image.
4. Create a new Supabase project and apply the included migrations only to that new project.
5. Add the new environment values from `apps/web/.env.example`.
6. Change `bookingConfigured` to `true` in `apps/web/src/lib/property.ts` only after the new database and business rules are verified.
7. Create a separate GitHub repository and hosting account. This local repository has no remote and cannot accidentally deploy to SnowAZ.

## Verification

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
```
