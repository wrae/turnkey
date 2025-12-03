import React, { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from "react-router-dom";

const NAVY = "#0b2942";
const GOLD = "#f57c2c";

import logoUrl from "./assets/signature-logo.png";
import rawLogoUrl from "./assets/signature-logo.png";
import hero1 from "./assets/hero1.jpg";
import hero2 from "./assets/hero2.jpg";
import hero3 from "./assets/hero3.jpg";
import hero4 from "./assets/hero4.jpg";
import hero5 from "./assets/hero5.jpg";
import hero6 from "./assets/hero6.jpg";
import hero7 from "./assets/hero7.jpg";
import hero8 from "./assets/hero8.jpg";
import hero9 from "./assets/hero9.jpg";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";

export function useTransparentLogo(_targetHex?: string, _tolerance?: number) {
  // The logo asset already has a transparent background; just return it.
  return logoUrl as string;
}

/* =========================
   Constants & Types
   ========================= */
const IMAGES = [
  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
  hero6,
  hero7,
  hero8,
  hero9,
];

const NAV = [
  { to: "/", key: "home" },
  { to: "/services", key: "services" },
  { to: "/pricing", key: "pricing" },
  { to: "/about", key: "about" },
  { to: "/contact", key: "contact" },
] as const;

type Lang = "en" | "es";



/* =========================
   i18n
   ========================= */
const TRANSLATIONS = {
  en: {
    nav: { home: "Home", services: "Services", pricing: "Pricing", about: "About", contact: "Contact Us" },
    hero: { title: "Signature Turnkey Solutions Cleaning", subtitle: "Sparkling homes and spotless offices—done right, on time, every time.", cta: "Get a Free Quote" },
    home: {
      headline: "Relax. We’ll handle the mess.",
      features: ["Fully insured & bonded","Eco-friendly options","Flexible scheduling","Satisfaction guaranteed"],
      packagesHeading: "Top-Rated Packages",
      packagesText: "Try our Signature Turnkey Solutions Basic for busy households, or go deeper with Signature Turnkey Solutions Deep to reset neglected spaces. Offices love our Signature Turnkey Solutions Pro after-hours service.",
      viewPricing: "View Pricing",
      areasHeading: "Areas We Serve",
      areasText: "Greater metro area and surrounding suburbs. Same-week availability for most ZIP codes.",
    },
    services: {
      heading: "Services",
      list: {
        standard: "Standard House Cleaning",
        deep: "Deep Cleaning",
        move: "Move-In / Move-Out",
        office: "Office / Commercial",
        post: "Post-Construction",
        windows: "Windows",
        carpets: "Carpets & Upholstery",
        disinfect: "Disinfection / Sanitizing",
        laundry: "Laundry & Folding",
        appliance: "Appliance Detailing",
        other: "Other (specify)",
      },
      blurbs: {
        standard: "Dusting, floors, kitchens, and bathrooms. Perfect for weekly/biweekly upkeep.",
        deep: "Inside appliances, baseboards, vents, grout detailing—ideal for seasonal resets.",
        move: "Empty home? We scrub everything so you can hand over keys confidently.",
        office: "After-hours janitorial with supply restocking and checklists.",
        post: "Fine dust removal, windows, fixtures, and debris tidy-up.",
        windows: "Interior glass and reachable exterior panes for streak-free shine.",
        carpets: "Spot treatments and steam options for a refreshed look.",
        disinfect: "High-touch surfaces using EPA List N disinfectants.",
        laundry: "Wash, dry, fold, and change bed linens as requested.",
        appliance: "Fridge, oven, and microwave interiors—goodbye, mystery smudges.",
      },
    },
    pricing: {
      heading: "Pricing",
      note: "Transparent, simple pricing. No surprises—just reliable service. Homes vary; deep-clean pricing may adjust based on size and condition.",
      plans: {
        basic: "Signature Turnkey Solutions Basic",
        deep: "Signature Turnkey Solutions Deep",
        pro: "Signature Turnkey Solutions Pro (Office)",
        cadenceVisit: "per visit",
        cadenceMonthly: "monthly",
        features: {
          basic: ["Kitchens & bathrooms","Dusting & vacuum/mop","Bedrooms & living areas","Trash removal"],
          deep: ["Everything in Basic","Baseboards & vents","Inside oven & fridge","Tile/grout detailing"],
          pro: ["Nightly/weekly options","Supply restocking","Breakrooms & restrooms","Common areas"],
        },
        getPlan: "Get This Plan",
      },
    },
    about: {
      heading: "About Signature Turnkey Solutions",
      body: "We started Signature Turnkey Solutions to make professional cleaning straightforward and trustworthy—trained staff, clear communication, and meticulous results.",
      stats: [
        { k: "5★ Reviews", v: "+1,500" },
        { k: "Homes & Offices", v: "+10,000 cleaned" },
        { k: "Years in Business", v: "10+" },
      ],
    },
    contact: {
      heading: "Contact Us",
      blurb: "Tell us what you need and we’ll reply with a tailored quote. Prefer to call? (555) 123-4567",
      first: "First Name",
      last: "Last Name",
      email: "Email Address",
      phone: "Phone",
      max50: "Max 50 characters.",
      phoneHelp: "A valid 10-digit phone is required.",
      emailHelp: "Use a valid email like name@example.com.",
      servicesLegend: "Services Interested In",
      otherLabel: "Other (25–50 chars)",
      submit: "Request Quote",
      thanks: "Thanks! Your request was sent. We'll reach out shortly.",
      privacy: "By submitting this form you agree to be contacted by Signature Turnkey Solutions about your request. We will never sell your information.",
    },
    footer: { cta: "Get a Free Quote" },
  },
  es: {
    nav: { home: "Inicio", services: "Servicios", pricing: "Precios", about: "Nosotros", contact: "Contáctenos" },
    hero: { title: "Signature Turnkey Solutions Limpieza", subtitle: "Hogares y oficinas impecables—bien hecho, a tiempo, siempre.", cta: "Pide una cotización" },
    home: {
      headline: "Relájate. Nosotros nos encargamos del desorden.",
      features: ["Asegurados y con fianza","Opciones ecológicas","Horarios flexibles","Satisfacción garantizada"],
      packagesHeading: "Paquetes más valorados",
      packagesText: "Prueba Signature Turnkey Solutions Básico para hogares ocupados, o Signature Turnkey Solutions Profundo para una limpieza completa. Las oficinas prefieren Signature Turnkey Solutions Pro después del horario laboral.",
      viewPricing: "Ver Precios",
      areasHeading: "Zonas de Servicio",
      areasText: "Área metropolitana y suburbios. Disponibilidad la misma semana para la mayoría de los códigos postales.",
    },
    services: {
      heading: "Servicios",
      list: {
        standard: "Limpieza de Casa Estándar",
        deep: "Limpieza Profunda",
        move: "Mudanza (Entrada/Salida)",
        office: "Oficinas / Comercial",
        post: "Post-Construcción",
        windows: "Ventanas",
        carpets: "Alfombras y Tapicería",
        disinfect: "Desinfección / Sanitización",
        laundry: "Lavandería y Doblado",
        appliance: "Detalle de Electrodomésticos",
        other: "Otro (especificar)",
      },
      blurbs: {
        standard: "Polvo, pisos, cocina y baños. Ideal para mantenimiento semanal/quincenal.",
        deep: "Electrodomésticos por dentro, zoclos, rejillas y lechada—perfecto para reinicios de temporada.",
        move: "¿Casa vacía? Limpiamos todo para que entregues llaves con confianza.",
        office: "Limpieza fuera de horario, reposición de insumos y listas de verificación.",
        post: "Remoción de polvo fino, ventanas, accesorios y orden general.",
        windows: "Cristales interiores y exteriores alcanzables, sin rayas.",
        carpets: "Tratamientos puntuales y vapor para un look renovado.",
        disinfect: "Superficies de alto contacto con desinfectantes de la Lista N de la EPA.",
        laundry: "Lavar, secar, doblar y cambio de sábanas según solicitud.",
        appliance: "Interiores de refri, horno y microondas—adiós manchas misteriosas.",
      },
    },
    pricing: {
      heading: "Precios",
      note: "Precios simples y transparentes. Sin sorpresas—solo servicio confiable. El precio de limpieza profunda puede variar según el tamaño y condición.",
      plans: {
        basic: "Signature Turnkey Solutions Básico",
        deep: "Signature Turnkey Solutions Profundo",
        pro: "Signature Turnkey Solutions Pro (Oficinas)",
        cadenceVisit: "por visita",
        cadenceMonthly: "mensual",
        features: {
          basic: ["Cocinas y baños","Quitar polvo y aspirar/trapear","Dormitorios y salas","Retiro de basura"],
          deep: ["Todo lo de Básico","Zoclos y rejillas de ventilación","Dentro de horno y refrigerador","Detalle de azulejos/lechada"],
          pro: ["Opciones nocturnas/semanales","Reposición de insumos","Comedores y baños","Áreas comunes"],
        },
        getPlan: "Elegir este plan",
      },
    },
    about: {
      heading: "Sobre Signature Turnkey Solutions",
      body: "Creamos Signature Turnkey Solutions para ofrecer limpieza profesional clara y confiable—personal capacitado, comunicación transparente y resultados meticulosos.",
      stats: [
        { k: "Reseñas 5★", v: "+1,500" },
        { k: "Hogares y Oficinas", v: "+10,000 limpiados" },
        { k: "Años en Servicio", v: "10+" },
      ],
    },
    contact: {
      heading: "Contáctenos",
      blurb: "Cuéntanos qué necesitas y te responderemos con una cotización. ¿Prefieres llamar? Atlanta (770) 569-3502 · Dallas (469) 630-1609",
      first: "Nombre",
      last: "Apellido",
      email: "Correo electrónico",
      phone: "Teléfono",
      max50: "Máx. 50 caracteres.",
      phoneHelp: "Se requiere un teléfono válido de 10 dígitos.",
      emailHelp: "Usa un correo válido como nombre@ejemplo.com.",
      servicesLegend: "Servicios de interés",
      otherLabel: "Otro (25–50 caracteres)",
      submit: "Solicitar cotización",
      thanks: "¡Gracias! Hemos recibido tu solicitud. Te contactaremos pronto.",
      privacy: "Al enviar este formulario aceptas que Signature Turnkey Solutions te contacte sobre tu solicitud. Nunca venderemos tu información.",
    },
    footer: { cta: "Pide una cotización" },
  },
} as const;

function tFactory(lang: Lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return function t(path: string): any {
    return path.split(".").reduce((acc: any, k: string) => (acc && acc[k] !== undefined ? acc[k] : undefined), dict);
  };
}



/* =========================
   Utils
   ========================= */
function useCarousel(length: number, intervalMs = 4500) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);
  return [index, setIndex] as const;
}



/* =========================
   Context
   ========================= */
export const I18nContext = React.createContext<{
  t: (k: string) => any;
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ t: (k) => k, lang: "en", setLang: () => {} });



/* =========================
   Components
   ========================= */
function HeaderCarousel(
  {
    t,
    lang,
    onToggleLang,
    mobileOpen,
    setMobileOpen,
  }: {
    t: ReturnType<typeof tFactory>;
    lang: Lang;
    onToggleLang: () => void;
    mobileOpen: boolean;
    setMobileOpen: (v: boolean) => void;
  }
) {
  const [index, setIndex] = useCarousel(IMAGES.length, 5000);
  return (
    <div className="relative h-52 sm:h-[30vh] md:h-[36vh] min-h-[220px] w-full overflow-hidden">
      {IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Cleaning service in action"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* top-right controls over the header image */}
      <div className="absolute right-4 top-4 z-50 flex items-center gap-2 pointer-events-auto">
        {/* language toggle removed */}
        <button
          className="inline-flex items-center justify-center rounded-xl border border-white/0 bg-white/95 p-2 text-gray-900 shadow active:scale-95 md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
      {/* top-left hero logo (transparent) */}
            <div className="absolute inset-x-0 bottom-6 sm:bottom-8 mx-auto max-w-6xl px-4 text-white">
        <div className="flex flex-col items-start gap-2"><p className="max-w-xl text-base sm:text-lg md:text-xl opacity-90">{t("hero.subtitle")}</p>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-5 py-3 text-gray-900 shadow hover:bg-white">
            {t("hero.cta")} →
          </Link>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 flex gap-2">
        {IMAGES.map((_, i) => (
          <button
            aria-label={`Go to slide ${i + 1}`}
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${i === index ? "bg-white w-6" : "bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
  t,
}: {
  open: boolean;
  onClose: () => void;
  t: ReturnType<typeof tFactory>;
}) {
  const location = useLocation();
  const first = React.useRef(true);
  // close on route change (but not on initial mount)
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    onClose();
  }, [location.pathname]);
  if (!open) return null;
  return (
    <div className="md:hidden fixed inset-0 z-40" role="dialog" aria-modal="true">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      {/* panel */}
      <div className="absolute right-3 top-[72px] w-[15rem] max-w-[70vw] rounded-2xl shadow-lg ring-1 ring-black/5" style={{background:"#0C2C3E"}}>
        <ul className="px-2 py-1 space-y-1">
          {NAV.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                className={({ isActive }) => (
                isActive
                  ? "rounded-xl px-3 py-1 text-sm font-semibold bg-amber-400 text-black ring-2 ring-white/30"
                  : "rounded-xl px-3 py-1 text-sm font-semibold text-gray-200 hover:text-white"
              )}
              >
                {t(`nav.${n.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Navbar(
  { lang, onToggleLang, t }: { lang: Lang; onToggleLang: () => void; t: ReturnType<typeof tFactory> }
) {
  return (
    <>
      {/* Logo bar at very top */}
      <div className="bg-white flex justify-center py-1">
        <img
          src={logoUrl}
          alt="Signature Turnkey Solutions"
          className="h-28 w-auto"
        />
      </div>

      {/* Grey nav bar above carousel */}
      <nav className="hidden md:flex bg-gray-300 h-16 items-center justify-center shadow-xl" aria-label="Main">
        <ul className="hidden md:flex gap-8 text-gray-900 text-base font-semibold">
          {NAV.map((n) => (
            <li key={n.to} className="bg-gray-200 mx-1 px-4 py-1 rounded-md shadow-sm hover:bg-gray-300 transition-colors">
              <NavLink
                to={n.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-300"
                    : "hover:text-orange-200"
                }
              >
                {t(`nav.${n.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}



/* =========================
   Layout
   ========================= */
function ScrollToMain() {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    ref.current?.focus();
  }, [location.pathname]);
  return <div id="main" ref={ref} tabIndex={-1} className="outline-none" />;
}

function Layout(
  { children, t, lang, setLang }: {
    children: React.ReactNode;
    t: ReturnType<typeof tFactory>;
    lang: Lang;
    setLang: (l: Lang) => void;
  }
) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>

      {/* Top logo + nav */}
      <Navbar
        lang={lang}
        onToggleLang={() => setLang(lang === "en" ? "es" : "en")}
        t={t}
      />

      {/* Carousel below nav */}
      <HeaderCarousel
        t={t}
        lang={lang}
        onToggleLang={() => setLang(lang === "en" ? "es" : "en")}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Mobile menu overlay */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        t={t}
      />

      <div className="mx-auto max-w-6xl px-4 -mt-4">
        <ScrollToMain />
      </div>

      <main id="main" className="mx-auto max-w-6xl px-4">
        {children}
      </main>

      <footer className="mt-12 border-t" style={{ background: "#0C2C3E" }}>
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-gray-900">
              Signature Turnkey Solutions
            </div>
            <div className="mt-1 text-slate-300">
              {t("footer.tagline")}
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <div>
              {t("footer.phoneTitle")}: (770) 569-3502 Atlanta • (469) 630-1609 Dallas
            </div>
            <div>
              {t("footer.emailTitle")}: info@signatureATL.com
            </div>
            <div>
              {t("footer.locations")}: Atlanta, GA • Dallas, TX • Volusia County, FL &amp; surrounding areas
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
/* =========================
   App
   ========================= */
export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const transLogo = useTransparentLogo(NAVY, 24);

  const t = useMemo(() => tFactory(lang), [lang]);

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      <Router>
        <Layout t={t} lang={lang} setLang={setLang}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </I18nContext.Provider>
  );
}
