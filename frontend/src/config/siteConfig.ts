// GENERATED from the architecture plan — do not edit by hand.
// Business shell configuration (brand, nav, contact) — DERIVED from the plan + brief.
// Header nav mirrors the public route table; never hand-edit. Design tokens are
// omitted on purpose — the fenced shell supplies its own theme defaults.
import type { SiteConfig } from '@/shell';

export const siteConfig: SiteConfig = {
  header: {
    brandName: "Fabricae PINE",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Client Dashboard", href: "/client-dashboard" },
      { label: "Lookbook", href: "/lookbook" },
      { label: "Products", href: "/products" },
      { label: "Contact", href: "/contact" },
    ],
    showAuth: true,
    showCart: false,
  },
  footer: {
    brandName: "Fabricae PINE",
    address: "vanraj mandal, Yadav Vyapar Bhavan, bus stop, Shop no 14 and 15, Chhatrapati Shivaji Maharaj Rd, near Mamledar Kacheri Road, Shukrawar Peth, Pune, Maharashtra 411002",
    phone: "099230 24705",
  },
};
