import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "sweetalert2/dist/sweetalert2.min.css";
import GuestMenu from "./GuestMenu";
import BrowserViewPrompt from "./BrowserViewPrompt";

const bodyFont = Plus_Jakarta_Sans({ variable: "--font-body", subsets: ["latin"] });
const displayFont = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "Uppadar Hollie Staycation Cebu | Condo in Banilad", template: "%s | Uppadar Hollie" },
  description: "Stay in a fully furnished two-bedroom condo with Wi-Fi, Netflix-ready TV, equipped kitchen, and smart self check-in at Deca Homes Tower 1, Banilad, Cebu City.",
  applicationName: "Uppadar Hollie Staycation Cebu",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Uppadar Hollie",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}><body>{children}<GuestMenu /><BrowserViewPrompt /></body></html>;
}
