import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Uppadar Hollie Staycation Cebu",
    short_name: "Uppadar Hollie",
    description:
      "Book a fully furnished two-bedroom condo at Deca Homes Tower 1, Banilad, Cebu City.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ed",
    theme_color: "#4a2d24",
    icons: [
      {
        src: "/images/uppadar-hollie/logo.jpg",
        sizes: "200x200",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
