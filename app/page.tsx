"use client";

import { useEffect, useId, useState } from "react";

/* ---------------------------------- icons ---------------------------------- */

function Icon({
  d,
  className = "h-5 w-5",
  strokeWidth = 2,
}: {
  d: string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const paths = {
  check: "M20 6 9 17l-5-5",
  shield: "M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10z",
  shieldCheck: "M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10z M9 12l2 2 4-4",
  tag: "M12 2H2v10l9.3 9.3a2 2 0 0 0 2.8 0l7.2-7.2a2 2 0 0 0 0-2.8L12 2z M7 7h.01",
  arrowRight: "M5 12h14 M12 5l7 7-7 7",
  rupee: "M6 3h12 M6 8h12 M6 13l8.5 8 M6 13h3a6 6 0 0 0 6-6V3",
  fileCheck: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z M14 2v6h6 M9 15l2 2 4-4",
  car: "M5 17H3v-4l2-5h12l3 5v4h-2 M7 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0 M15 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0 M5 12h14",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.2z",
  plus: "M12 5v14 M5 12h14",
  menu: "M4 6h16 M4 12h16 M4 18h16",
  x: "M18 6 6 18 M6 6l12 12",
  handshake:
    "M11 17l-1.5 1.5a2.1 2.1 0 0 1-3-3L11 11l2-2c1-1 3-1 4 0l4 4 M8 8l-4 4 3.5 3.5 M13 9l4.5 4.5a2.1 2.1 0 0 1-3 3L13 15",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
  ban: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M4.9 4.9l14.2 14.2",
  trendingUp: "M22 7l-8.5 8.5-5-5L2 17 M16 7h6v6",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  mapPin:
    "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8",
  gift: "M20 12v10H4V12 M2 7h20v5H2z M12 22V7 M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z",
};

/* ------------------------------ scroll reveal ------------------------------ */

function useReveal(dep?: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/* ---------------------------------- navbar --------------------------------- */

const navLinks: Record<Tab, { href: string; label: string }[]> = {
  exchange: [
    { href: "#why-exchange", label: "Why exchange" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#rc-transfer", label: "RC transfer" },
    { href: "#faq", label: "FAQ" },
  ],
  new: [],
  prenew: [],
};

const navCta: Record<Tab, { label: string; href: string }> = {
  exchange: { label: "Get exchange price", href: "#get-price" },
  new: { label: "Choose your car", href: "#find-car" },
  prenew: { label: "Find your Prenew", href: "#find-prenew" },
};

function Navbar({ tab }: { tab: Tab }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cta = navCta[tab];
  const links = navLinks[tab];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-mist-200 bg-white/85 shadow-lg shadow-navy-950/5 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[72px] lg:px-8">
        <a href="#" className="flex items-center gap-2.5" aria-label="Prenew365 home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-flame-500 text-white shadow-lg shadow-accent-500/30">
            <Icon d={paths.car} className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-ink-900">
            Prenew<span className="text-accent-500">365</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-600 transition-colors duration-200 hover:text-ink-900"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-flame-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent-500/30 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            {cta.label}
            <Icon d={paths.arrowRight} className="h-4 w-4" />
          </a>
        </div>

        <button
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg text-ink-900 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon d={open ? paths.x : paths.menu} className="h-6 w-6" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-mist-200 bg-white/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-ink-600 hover:bg-mist-100 hover:text-ink-900"
              >
                {l.label}
              </a>
            ))}
            <a
              href={cta.href}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-flame-500 px-5 py-3 text-sm font-bold text-white"
            >
              {cta.label}
              <Icon d={paths.arrowRight} className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- tab bar --------------------------------- */

const tabs = [
  { id: "exchange", label: "Exchange", icon: paths.handshake },
  { id: "new", label: "Buy New Car", icon: paths.car },
  { id: "prenew", label: "Buy Prenew", icon: paths.tag },
] as const;

type Tab = (typeof tabs)[number]["id"];

function TabBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div className="bg-mist-50 pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex gap-1 rounded-2xl border border-mist-200 bg-white p-1.5 shadow-sm sm:max-w-md">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                window.scrollTo({ top: 0 });
              }}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-2 py-2.5 text-xs font-bold transition-colors duration-200 sm:gap-2 sm:px-3 sm:text-sm ${
                tab === t.id
                  ? "bg-gradient-to-r from-accent-500 to-flame-500 text-white shadow-lg shadow-accent-500/25"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              <Icon d={t.icon} className="h-4 w-4 shrink-0" />
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- hero ---------------------------------- */

function RegForm() {
  const id = useId();
  const [reg, setReg] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200"
        role="status"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
          <Icon d={paths.check} className="h-5 w-5" />
        </span>
        <p className="text-sm font-semibold">
          Got it — {reg.toUpperCase()}. Our exchange expert will call you within 30
          minutes with your best price.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (reg.trim().length >= 6) setDone(true);
      }}
      className="flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl shadow-navy-950/10 ring-1 ring-mist-200 sm:flex-row sm:items-center"
    >
      <label htmlFor={id} className="sr-only">
        Car registration number
      </label>
      <input
        id={id}
        value={reg}
        onChange={(e) => setReg(e.target.value.toUpperCase())}
        placeholder="Enter your car number"
        autoComplete="off"
        className="h-13 min-h-[52px] flex-1 rounded-xl bg-mist-100 px-5 text-base font-semibold tracking-wide text-ink-900 outline-none transition-shadow placeholder:font-medium placeholder:text-ink-400 focus-visible:ring-2 focus-visible:ring-accent-500"
      />
      <button
        type="submit"
        className="inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-flame-500 px-7 text-base font-bold text-white shadow-lg shadow-accent-500/30 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        Get exchange price
        <Icon d={paths.arrowRight} className="h-5 w-5" />
      </button>
    </form>
  );
}

const carWishCopy = {
  new: {
    placeholder: "e.g. Creta SX, Nexon EV, Fronx…",
    cta: "Get my best deal",
    done: (car: string) =>
      `Great choice — ${car}. Our deal expert will call you within 30 minutes with competing dealership offers.`,
  },
  prenew: {
    placeholder: "e.g. Swift 2022, City under ₹8L…",
    cta: "Find my Prenew",
    done: (car: string) =>
      `Noted — ${car}. Our Prenew expert will call you within 30 minutes with certified cars that match.`,
  },
} as const;

function CarWishForm({ variant }: { variant: keyof typeof carWishCopy }) {
  const id = useId();
  const [car, setCar] = useState("");
  const [done, setDone] = useState(false);
  const copy = carWishCopy[variant];

  if (done) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200"
        role="status"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
          <Icon d={paths.check} className="h-5 w-5" />
        </span>
        <p className="text-sm font-semibold">{copy.done(car.trim())}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (car.trim().length >= 3) setDone(true);
      }}
      className="flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl shadow-navy-950/10 ring-1 ring-mist-200 sm:flex-row sm:items-center"
    >
      <label htmlFor={id} className="sr-only">
        Which car do you want to buy?
      </label>
      <input
        id={id}
        value={car}
        onChange={(e) => setCar(e.target.value)}
        placeholder={copy.placeholder}
        autoComplete="off"
        className="h-13 min-h-[52px] flex-1 rounded-xl bg-mist-100 px-5 text-base font-semibold text-ink-900 outline-none transition-shadow placeholder:font-medium placeholder:text-ink-400 focus-visible:ring-2 focus-visible:ring-accent-500"
      />
      <button
        type="submit"
        className="inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-flame-500 px-7 text-base font-bold text-white shadow-lg shadow-accent-500/30 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        {copy.cta}
        <Icon d={paths.arrowRight} className="h-5 w-5" />
      </button>
    </form>
  );
}

function OfferCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* glow */}
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-accent-500/25 via-flame-500/10 to-transparent blur-3xl" />

      {/* main offer card */}
      <div className="relative rounded-3xl border border-mist-200 bg-white p-6 shadow-2xl shadow-navy-950/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
              Your exchange offer
            </p>
            <p className="mt-1 text-sm font-semibold text-ink-600">
              Maruti Baleno Zeta · 2021
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 ring-1 ring-emerald-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live offer
          </span>
        </div>

        <p className="mt-5 text-5xl font-extrabold tracking-tight text-ink-900">
          ₹6,45,000
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600">
          <Icon d={paths.arrowRight} className="h-4 w-4 -rotate-45" />
          ₹38,000 above best market quote
        </p>

        <div className="mt-6 space-y-3 border-t border-mist-200 pt-5">
          {[
            { icon: paths.handshake, text: "Exchanged via new-car dealership" },
            { icon: paths.fileCheck, text: "RC transfer — assured & tracked" },
            { icon: paths.gift, text: "₹10,000 accessories voucher on your new car" },
          ].map((row) => (
            <div key={row.text} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-mist-100 text-flame-500">
                <Icon d={row.icon} className="h-4 w-4" />
              </span>
              <p className="text-sm font-medium text-ink-600">{row.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* floating badges */}
      <div className="float-y absolute -bottom-11 -left-6 hidden items-center gap-2 rounded-2xl border border-mist-200 bg-white px-4 py-3 shadow-xl shadow-navy-950/10 sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
          <Icon d={paths.shieldCheck} className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold text-ink-900">RC Transferred</p>
          <p className="text-[11px] font-medium text-ink-400">100% assured</p>
        </div>
      </div>

      <div className="float-y-slow absolute -right-3 -top-9 hidden items-center gap-2 rounded-2xl border border-mist-200 bg-white px-4 py-3 shadow-xl shadow-navy-950/10 sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-flame-500/15 text-flame-500">
          <Icon d={paths.tag} className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold text-ink-900">Best price promise</p>
          <p className="text-[11px] font-medium text-ink-400">Beat any quote</p>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="get-price"
      className="relative overflow-hidden bg-mist-50 pb-20 pt-10 sm:pt-14"
    >
      {/* backdrop */}
      <div className="hero-grid absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[120px]" />
      <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-flame-500/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-8">
        <div>
          <div className="rise inline-flex items-center gap-2 rounded-full border border-mist-200 bg-white px-4 py-1.5 shadow-sm">
            <Icon d={paths.star} className="h-3.5 w-3.5 text-flame-500" />
            <span className="text-xs font-semibold tracking-wide text-ink-600">
              India&apos;s smarter way to upgrade your car
            </span>
          </div>

          <h1
            className="rise mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl"
            style={{ "--rise-delay": "100ms" } as React.CSSProperties}
          >
            Don&apos;t sell your car.
            <br />
            <span className="bg-gradient-to-r from-accent-500 via-flame-500 to-amber-400 bg-clip-text text-transparent">
              Exchange it.
            </span>
          </h1>

          <p
            className="rise mt-6 max-w-xl text-lg leading-relaxed text-ink-600"
            style={{ "--rise-delay": "200ms" } as React.CSSProperties}
          >
            We promise the <strong className="text-ink-900">best price in the market</strong> —
            because you don&apos;t sell to a dealer, you exchange through our{" "}
            <strong className="text-ink-900">new-car dealership network</strong>. With{" "}
            <strong className="text-ink-900">assured RC transfer</strong>, every single time.
          </p>

          <div
            className="rise mt-8 max-w-xl"
            style={{ "--rise-delay": "300ms" } as React.CSSProperties}
          >
            <RegForm />
          </div>

          <div
            className="rise mt-6 flex flex-wrap gap-x-6 gap-y-3"
            style={{ "--rise-delay": "400ms" } as React.CSSProperties}
          >
            {[
              "Best price promise",
              "Assured RC transfer",
              "Zero hidden charges",
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <Icon d={paths.check} className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="rise" style={{ "--rise-delay": "250ms" } as React.CSSProperties}>
          <OfferCard />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- marquee --------------------------------- */

const brands = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata Motors",
  "Mahindra",
  "Kia",
  "Toyota",
  "Honda",
  "MG",
  "Skoda",
  "Volkswagen",
];

function BrandMarquee() {
  return (
    <section className="border-y border-mist-200 bg-white py-8">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
        Exchange across every major brand&apos;s dealership network
      </p>
      <div className="relative overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="marquee-track flex w-max gap-12 pr-12">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="whitespace-nowrap text-lg font-bold tracking-wide text-ink-400/70"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- stats ---------------------------------- */

const stats = [
  { value: "400+", label: "Dealership partners" },
  { value: "₹38K", label: "Avg. more than market quotes" },
  { value: "48 hrs", label: "Average payment time" },
  { value: "100%", label: "RC transfers completed" },
];

function Stats({ items = stats }: { items?: typeof stats }) {
  return (
    <section className="bg-white pb-20 pt-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 lg:grid-cols-4 lg:px-8">
        {items.map((s, i) => (
          <div
            key={s.label}
            className="reveal rounded-2xl border border-mist-200 bg-mist-50 p-6 text-center"
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
          >
            <p className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1.5 text-sm font-medium text-ink-600">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ why exchange ------------------------------- */

function WhyExchange() {
  const selling = [
    "Dealers lowball — they resell your car for margin",
    "Endless calls, haggling and test-drive strangers",
    "RC transfer left to the buyer's goodwill",
    "Payment in instalments, sometimes in cash",
  ];
  const exchanging = [
    "New-car dealerships pay more — your car fuels their sale",
    "One evaluation, competing dealership offers",
    "RC transfer handled and tracked by us — assured",
    "Full payment to your bank within 48 hours",
  ];

  return (
    <section id="why-exchange" className="bg-mist-50 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-500">
            Why exchange wins
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Selling gets you a quote.
            <br className="hidden sm:block" /> Exchanging gets you the best price.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            When a new-car dealership takes your car in exchange, your car helps them
            close a new-car sale — so they can afford to pay you more than any
            resale dealer ever will.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="reveal rounded-3xl border border-mist-200 bg-white p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mist-100 text-ink-400">
                <Icon d={paths.ban} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink-900">Selling the old way</h3>
                <p className="text-sm text-ink-400">Classifieds &amp; resale dealers</p>
              </div>
            </div>
            <ul className="mt-6 space-y-4">
              {selling.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-ink-600">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mist-100 text-ink-400">
                    <Icon d={paths.x} className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal relative overflow-hidden rounded-3xl bg-navy-950 p-8 shadow-2xl shadow-navy-950/30"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent-500/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-flame-500 text-white">
                    <Icon d={paths.handshake} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Exchanging with Prenew365
                    </h3>
                    <p className="text-sm text-white/50">New-car dealership channel</p>
                  </div>
                </div>
                <span className="hidden rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400 ring-1 ring-emerald-400/30 sm:block">
                  Recommended
                </span>
              </div>
              <ul className="mt-6 space-y-4">
                {exchanging.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-[15px] font-medium text-white/85"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Icon d={paths.check} className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- how it works ------------------------------ */

const steps = [
  {
    icon: paths.car,
    title: "Share your car details",
    text: "Enter your car number and get an instant estimate. Book a free doorstep evaluation at a time that suits you.",
  },
  {
    icon: paths.tag,
    title: "Dealerships compete for it",
    text: "Your car goes to our network of 400+ new-car dealerships. They bid because your car helps them sell a new one.",
  },
  {
    icon: paths.rupee,
    title: "Get the best price, fast",
    text: "Accept the highest offer. Full payment lands in your bank account within 48 hours — no cash, no instalments.",
  },
  {
    icon: paths.fileCheck,
    title: "RC transfer, assured",
    text: "We handle the entire RC transfer through the dealership channel and keep you updated until it's done. In writing.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-500">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            From car number to best price in 4 steps
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="reveal group relative rounded-3xl border border-mist-200 bg-mist-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-500/30 hover:bg-white hover:shadow-xl hover:shadow-navy-950/10"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <span className="absolute right-6 top-6 text-4xl font-extrabold text-mist-200 transition-colors duration-300 group-hover:text-accent-500/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-flame-500 text-white shadow-lg shadow-accent-500/25">
                <Icon d={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ new car deal ------------------------------- */

const newCarSteps = [
  {
    icon: paths.car,
    title: "You choose the car",
    text: "Tell us the car, variant and colour you want — any brand, any dealership in our network.",
  },
  {
    icon: paths.tag,
    title: "Dealers share their offers",
    text: "Partner dealerships send their best quotes for that exact car, competing for your business.",
  },
  {
    icon: paths.handshake,
    title: "We negotiate the best deal",
    text: "Our experts push discounts, exchange bonuses and freebies further than you could alone.",
  },
];

function NewCarDeal() {
  return (
    <section id="new-car" className="relative overflow-hidden bg-mist-50 py-24">
      <div className="hero-grid absolute inset-0" />
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-flame-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-flame-500">
            Your next car, sorted too
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            We don&apos;t just take your old car.
            <br className="hidden sm:block" /> We win you the new one.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            The same dealership network that competes for your old car competes
            for your new-car business — and we do the haggling for you.
          </p>
        </div>

        <div id="find-car" className="reveal mx-auto mt-10 max-w-xl scroll-mt-28">
          <p className="mb-3 text-center text-base font-bold text-ink-900">
            Which car do you want to buy?
          </p>
          <CarWishForm variant="new" />
          <p className="mt-3 text-center text-sm font-medium text-ink-400">
            Any brand, any model — 400+ dealerships compete for your booking.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {newCarSteps.map((s, i) => (
            <div
              key={s.title}
              className="reveal relative rounded-3xl border border-mist-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-950/10"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <span className="absolute right-6 top-6 text-4xl font-extrabold text-mist-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-flame-500 text-white shadow-lg shadow-accent-500/25">
                <Icon d={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
            </div>
          ))}
        </div>

        {/* voucher ticket */}
        <div className="reveal mx-auto mt-12 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-600 via-accent-500 to-flame-500 p-1 shadow-2xl shadow-accent-500/30">
            <div className="flex flex-col items-center gap-6 rounded-[1.4rem] bg-navy-950/20 px-8 py-8 sm:flex-row sm:gap-8 sm:px-10">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm">
                <Icon d={paths.gift} className="h-8 w-8" />
              </span>
              <div className="hidden h-16 border-l-2 border-dashed border-white/30 sm:block" />
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  Assured with every new car booked
                </p>
                <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  ₹10,000 accessories voucher
                </p>
                <p className="mt-1.5 text-sm font-medium text-white/75">
                  Seat covers, mats, infotainment, styling — your pick, on us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- buy prenew -------------------------------- */

const soldCars: {
  name: string;
  year: number;
  price: string;
  img: string;
  featured?: boolean;
  tilt?: string;
}[] = [
  {
    name: "Grand Vitara",
    year: 2024,
    price: "₹11.5 L",
    img: "/cars/grand-vitara.jpg",
    featured: true,
  },
  { name: "Seltos", year: 2022, price: "₹7.5 L", img: "/cars/seltos.jpg", tilt: "lg:-rotate-2" },
  { name: "Verna", year: 2020, price: "₹6.5 L", img: "/cars/verna.png", tilt: "lg:rotate-2" },
  { name: "Baleno", year: 2023, price: "₹4.75 L", img: "/cars/baleno.jpg", tilt: "lg:rotate-1" },
  { name: "Polo GT", year: 2020, price: "₹4.5 L", img: "/cars/polo-gt.png", tilt: "lg:-rotate-1" },
];

function SoldStamp() {
  return (
    <span className="absolute right-3 top-3 -rotate-6 rounded-md border-2 border-white/90 bg-navy-950/40 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white shadow-lg backdrop-blur-sm">
      Sold
    </span>
  );
}

function SoldCollage() {
  return (
    <div className="relative mx-auto w-full max-w-[25.2rem]">
      {/* glow */}
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-accent-500/25 via-flame-500/10 to-transparent blur-3xl" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-mist-200 bg-white px-4 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-bold tracking-wide text-ink-600">
              Recently sold on Prenew365
            </span>
          </span>
          <span className="hidden text-xs font-semibold text-ink-400 sm:block">
            This month
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {soldCars.map((c, i) => (
            <div
              key={c.name}
              className={`rise group overflow-hidden rounded-2xl bg-white shadow-lg shadow-navy-950/10 ring-1 ring-mist-200 transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-xl ${
                c.featured ? "col-span-2" : ""
              } ${c.tilt ?? ""}`}
              style={{ "--rise-delay": `${250 + i * 90}ms` } as React.CSSProperties}
            >
              <div
                className={`relative overflow-hidden ${
                  c.featured ? "aspect-[2/1]" : "aspect-[16/10]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={`${c.name} ${c.year}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <SoldStamp />
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink-900">{c.name}</p>
                  <p className="text-[11px] font-medium text-ink-400">{c.year}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ink-900 py-1 pl-2 pr-2.5 text-xs font-bold text-white">
                  <Icon d={paths.tag} className="h-3 w-3 text-flame-500" />
                  {c.price}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div
          className="rise mt-4 flex items-center justify-center gap-2.5 rounded-2xl border border-mist-200 bg-white px-4 py-3 shadow-sm"
          style={{ "--rise-delay": "700ms" } as React.CSSProperties}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
            <Icon d={paths.shieldCheck} className="h-4 w-4" />
          </span>
          <p className="text-xs font-semibold text-ink-600">
            <span className="font-bold text-ink-900">RC transferred on all 5 cars</span>{" "}
            · assured, in writing
          </p>
        </div>
      </div>
    </div>
  );
}

function PrenewHero() {
  return (
    <section className="relative overflow-hidden bg-mist-50 pb-20 pt-10 sm:pt-14">
      <div className="hero-grid absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
        <div className="max-w-2xl">
          <div className="rise inline-flex items-center gap-2 rounded-full border border-mist-200 bg-white px-4 py-1.5 shadow-sm">
            <Icon d={paths.shieldCheck} className="h-3.5 w-3.5 text-flame-500" />
            <span className="text-xs font-semibold tracking-wide text-ink-600">
              Certified pre-owned, dealer-sourced
            </span>
          </div>

          <h1
            className="rise mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl"
            style={{ "--rise-delay": "100ms" } as React.CSSProperties}
          >
            Buy a Prenew car.
            <br />
            <span className="bg-gradient-to-r from-accent-500 via-flame-500 to-amber-400 bg-clip-text text-transparent">
              Better than used.
            </span>
          </h1>

          <p
            className="rise mt-6 max-w-xl text-lg leading-relaxed text-ink-600"
            style={{ "--rise-delay": "200ms" } as React.CSSProperties}
          >
            Every Prenew car comes from a{" "}
            <strong className="text-ink-900">new-car dealership exchange</strong> —
            inspected, transparently priced, with{" "}
            <strong className="text-ink-900">assured RC transfer</strong> to your name.
          </p>

          <div
            className="rise mt-8 flex flex-wrap gap-x-6 gap-y-3"
            style={{ "--rise-delay": "300ms" } as React.CSSProperties}
          >
            {[
              "Dealership-sourced cars",
              "Assured RC transfer",
              "Transparent pricing",
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <Icon d={paths.check} className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </span>
            ))}
          </div>

          <div
            id="find-prenew"
            className="rise mt-9 max-w-xl scroll-mt-28"
            style={{ "--rise-delay": "400ms" } as React.CSSProperties}
          >
            <p className="mb-3 text-base font-bold text-ink-900">
              Which car are you looking for?
            </p>
            <CarWishForm variant="prenew" />
          </div>

          <a
            href="tel:+911800000365"
            className="rise mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-600 transition-colors hover:text-ink-900"
            style={{ "--rise-delay": "500ms" } as React.CSSProperties}
          >
            <Icon d={paths.phone} className="h-4 w-4" />
            Prefer to talk? 1800-000-365 (toll free)
          </a>
        </div>

        <div className="rise" style={{ "--rise-delay": "250ms" } as React.CSSProperties}>
          <SoldCollage />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ dealer network ----------------------------- */

// ponytail: dummy data, replace with API/CMS feed when real dealers onboard
const dealers = [
  { name: "Pearl Maruti Suzuki", brand: "Maruti Suzuki", city: "Gurugram", cars: 14, rating: 4.8 },
  { name: "Capital Hyundai", brand: "Hyundai", city: "Noida", cars: 11, rating: 4.7 },
  { name: "Frontier Tata Motors", brand: "Tata", city: "New Delhi", cars: 9, rating: 4.8 },
  { name: "Shiva Kia", brand: "Kia", city: "Faridabad", cars: 8, rating: 4.6 },
  { name: "Ring Road Honda", brand: "Honda", city: "New Delhi", cars: 7, rating: 4.7 },
  { name: "Silverline Toyota", brand: "Toyota", city: "Ghaziabad", cars: 6, rating: 4.9 },
];

function DealerNetwork() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-flame-500">
            Where your car comes from
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Sourced from new-car dealerships
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            Every Prenew car is an exchange car from a registered new-car
            dealership — not an anonymous private seller.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dealers.map((d, i) => (
            <div
              key={d.name}
              className="reveal flex items-start gap-4 rounded-3xl border border-mist-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-950/10"
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mist-100 text-ink-600 ring-1 ring-mist-200">
                <Icon d={paths.car} className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-ink-900">{d.name}</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-500">
                  <Icon d={paths.mapPin} className="h-3.5 w-3.5 shrink-0" />
                  {d.city} · {d.brand}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    {d.cars} Prenew cars
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                    <Icon d={paths.star} className="h-3 w-3" />
                    {d.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-10 text-center text-sm font-semibold text-ink-400">
          Part of our 400+ dealership partner network across NCR
        </p>
      </div>
    </section>
  );
}

/* ------------------------------- rc transfer ------------------------------- */

function RcTransfer({ buyer = false }: { buyer?: boolean }) {
  const items = buyer
    ? [
        {
          icon: paths.shieldCheck,
          title: "Dealership-channel transfer",
          text: "Your RC reaches you through the new-car dealership channel — a registered business, not an anonymous private seller.",
        },
        {
          icon: paths.fileCheck,
          title: "Tracked till it's done",
          text: "Get status updates at every stage — from Form 29/30 to the RC in your name. You'll never wonder where your transfer stands.",
        },
        {
          icon: paths.shield,
          title: "Zero past liability",
          text: "Pending challans, dues and hypothecation are cleared before handover — the car reaches you with a clean slate, in writing.",
        },
      ]
    : [
        {
          icon: paths.shieldCheck,
          title: "Dealership-channel transfer",
          text: "Your RC transfer runs through the new-car dealership that takes your car — a registered business, not an anonymous buyer.",
        },
        {
          icon: paths.fileCheck,
          title: "Tracked till it's done",
          text: "Get status updates at every stage — from Form 29/30 to the new RC. You'll never wonder where your transfer stands.",
        },
        {
          icon: paths.shield,
          title: "Zero future liability",
          text: "Challans, tolls, accidents after handover — none of it comes back to you. We put the assurance in writing.",
        },
      ];

  return (
    <section id="rc-transfer" className="relative overflow-hidden bg-mist-50 py-24">
      <div className="hero-grid absolute inset-0" />
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-flame-500">
            The part everyone worries about
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            RC transfer. Assured. In writing.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            {buyer
              ? "The #1 fear in buying a pre-owned car is the RC never reaching your name. Every Prenew purchase includes a tracked, assured transfer."
              : "The #1 fear in selling a car is the RC never getting transferred. Our dealership channel makes that impossible to slip through the cracks."}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="reveal rounded-3xl border border-mist-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-950/10"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200">
                <Icon d={it.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- testimonials ------------------------------ */

const testimonialCopy = {
  exchange: {
    eyebrow: "Real exchanges",
    heading: "People who stopped selling and started exchanging",
    items: [
      {
        quote:
          "Cars24 quoted ₹5.9L, a local dealer ₹6L. Prenew365's exchange offer was ₹6.4L — and the RC transfer was done in 3 weeks with updates on WhatsApp.",
        name: "Rohit Sharma",
        detail: "Exchanged a Hyundai i20 · Delhi",
      },
      {
        quote:
          "I didn't want strangers coming home for test drives. One evaluation, three dealership offers by evening, money in my account in two days.",
        name: "Priya Nair",
        detail: "Exchanged a Honda City · Bengaluru",
      },
      {
        quote:
          "Sold my last car privately and chased the buyer for the RC transfer for a year. This time it was handled completely — I just got the confirmation.",
        name: "Amandeep Singh",
        detail: "Exchanged a Maruti Swift · Chandigarh",
      },
    ],
  },
  new: {
    eyebrow: "Real deals",
    heading: "People who let us do the haggling",
    items: [
      {
        quote:
          "The showroom's best offer was list price minus ₹15K. Prenew365 got the same dealership to ₹52K off — with mats and mud flaps thrown in.",
        name: "Kunal Mehta",
        detail: "Bought a Hyundai Creta · Gurugram",
      },
      {
        quote:
          "I told them the variant and colour on Monday. By Wednesday I had three dealer quotes, and the ₹10,000 voucher covered seat covers and a dashcam.",
        name: "Sneha Kulkarni",
        detail: "Bought a Tata Nexon · Pune",
      },
      {
        quote:
          "No showroom hopping, no back-and-forth on price. They negotiated with the dealers — I just picked the best offer and took delivery.",
        name: "Arjun Reddy",
        detail: "Bought a Maruti Fronx · Hyderabad",
      },
    ],
  },
  prenew: {
    eyebrow: "Real Prenew buyers",
    heading: "People who bought better than used",
    items: [
      {
        quote:
          "The car came straight from a dealership exchange — full service history, an honest inspection report, and no surprises after delivery.",
        name: "Rohit Sharma",
        detail: "Bought a Prenew Hyundai i20 · Delhi",
      },
      {
        quote:
          "The RC was in my name in three weeks, with WhatsApp updates the whole way. Buying a pre-owned car never felt this clean.",
        name: "Priya Nair",
        detail: "Bought a Prenew Honda City · Bengaluru",
      },
      {
        quote:
          "One call, three certified cars matched to my budget by evening. The pricing was transparent — what was quoted is what I paid.",
        name: "Amandeep Singh",
        detail: "Bought a Prenew Maruti Swift · Chandigarh",
      },
    ],
  },
} as const;

function Testimonials({ variant = "exchange" }: { variant?: Tab }) {
  const { eyebrow, heading, items } = testimonialCopy[variant];
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-500">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {heading}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <figure
              key={t.name}
              className="reveal flex flex-col rounded-3xl border border-mist-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-950/8"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <div className="flex gap-1 text-flame-500" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-mist-200 pt-5">
                <p className="font-bold text-ink-900">{t.name}</p>
                <p className="mt-0.5 text-sm text-ink-400">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- faq ----------------------------------- */

const faqs = [
  {
    q: "How can you promise the best price in the market?",
    a: "Because you're not selling — you're exchanging. A resale dealer pays you less so they can profit on resale. A new-car dealership pays you more because your car helps them close a new-car sale, and they earn on that sale too. Multiple dealerships compete for your car, which pushes your price up, not down. If you have a better written quote, show us — we'll beat it or tell you honestly to take it.",
  },
  {
    q: "Do I have to buy a new car to exchange mine?",
    a: "No. 'Exchange' describes how your car moves — through new-car dealership channels — not what you have to do. You simply hand over your car and receive full payment. Buying a new car through us is optional — but if you do, you choose the car, dealers compete with offers, we negotiate the final deal for you, and you get an assured ₹10,000 accessories voucher on top.",
  },
  {
    q: "How does the ₹10,000 accessories voucher work?",
    a: "Book your new car through Prenew365 — any brand, any partner dealership — and you get an assured accessories voucher worth ₹10,000, redeemable on things like seat covers, mats, infotainment and styling at delivery. It's over and above the deal we negotiate for you, not part of it.",
  },
  {
    q: "What does 'assured RC transfer' actually mean?",
    a: "Your car's registration certificate is transferred out of your name through the dealership channel, and we track it end-to-end until the new RC is issued. You get written assurance and status updates at every stage — so future challans, tolls or liabilities can never land on you.",
  },
  {
    q: "How fast do I get paid?",
    a: "Once you accept an offer and hand over the car with documents, full payment reaches your bank account within 48 hours on average. No cash deals, no instalments, no 'token now, rest later'.",
  },
  {
    q: "Is the doorstep evaluation really free?",
    a: "Yes — completely free with zero obligation. Our evaluator inspects your car at your home or office, and you're free to reject every offer you receive. No charges, no pressure.",
  },
  {
    q: "Which cities and cars do you cover?",
    a: "We work with 400+ new-car dealership partners across major Indian cities, covering all mainstream brands — Maruti Suzuki, Hyundai, Tata, Mahindra, Kia, Toyota, Honda and more. Enter your car number and we'll confirm coverage for your location right away.",
  },
];

function Faq() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="reveal text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-500">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Questions, answered straight
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="faq reveal group rounded-2xl border border-mist-200 bg-mist-50 transition-colors duration-200 open:bg-white open:shadow-lg open:shadow-navy-950/5"
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-bold text-ink-900 [list-style:none]">
                {f.q}
                <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-ink-600 ring-1 ring-mist-200 group-open:bg-accent-500 group-open:text-white group-open:ring-accent-500">
                  <Icon d={paths.plus} className="h-4 w-4" />
                </span>
              </summary>
              <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-600">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ final cta + footer ------------------------- */

function FinalCta({
  title = (
    <>
      Your car is worth more
      <br />
      <span className="bg-gradient-to-r from-accent-500 via-flame-500 to-amber-400 bg-clip-text text-transparent">
        than any quote you&apos;ve got.
      </span>
    </>
  ),
  sub = "Find out in 30 seconds. Free evaluation, zero obligation.",
  form = <RegForm />,
}: {
  title?: React.ReactNode;
  sub?: string;
  form?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-mist-50 py-24">
      <div className="hero-grid absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="reveal text-3xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
          {title}
        </h2>
        <p className="reveal mt-5 text-lg text-ink-600">{sub}</p>
        <div className="reveal mx-auto mt-9 max-w-xl">{form}</div>
      </div>
    </section>
  );
}

function Footer({ tab }: { tab: Tab }) {
  return (
    <footer className="border-t border-mist-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm text-center md:text-left">
            <a href="#" className="inline-flex items-center gap-2.5" aria-label="Prenew365 home">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-flame-500 text-white">
                <Icon d={paths.car} className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-ink-900">
                Prenew<span className="text-accent-500">365</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              Exchange your old car, buy your next one new, or pick a certified
              Prenew — with assured RC transfer through new-car dealership
              channels, every time.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href="tel:+911800000365"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600 transition-colors hover:text-ink-900"
            >
              <Icon d={paths.phone} className="h-4 w-4" />
              1800-000-365 (toll free)
            </a>
            <div className="flex gap-6">
              {navLinks[tab].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-ink-400 transition-colors hover:text-ink-900"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-mist-200 pt-6 text-center text-xs text-ink-400">
          © {new Date().getFullYear()} Prenew365. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------- page ---------------------------------- */

export default function Home() {
  const [tab, setTab] = useState<Tab>("exchange");
  useReveal(tab);

  return (
    <main>
      <Navbar tab={tab} />
      <TabBar tab={tab} setTab={setTab} />

      {tab === "exchange" && (
        <>
          <Hero />
          <BrandMarquee />
          <Stats />
          <WhyExchange />
          <HowItWorks />
          <RcTransfer />
          <Testimonials />
          <Faq />
          <FinalCta />
        </>
      )}

      {tab === "new" && (
        <>
          <NewCarDeal />
          <Stats
            items={[
              { value: "400+", label: "Dealership partners" },
              { value: "₹10K", label: "Assured accessories voucher" },
              { value: "30 min", label: "Callback with offers" },
              { value: "₹0", label: "Charge for negotiating your deal" },
            ]}
          />
          <Testimonials variant="new" />
          <FinalCta
            title={
              <>
                Tell us the car.
                <br />
                <span className="bg-gradient-to-r from-accent-500 via-flame-500 to-amber-400 bg-clip-text text-transparent">
                  We&apos;ll win you the deal.
                </span>
              </>
            }
            sub="Competing dealership offers, negotiated for you — plus a ₹10,000 accessories voucher."
            form={<CarWishForm variant="new" />}
          />
        </>
      )}

      {tab === "prenew" && (
        <>
          <PrenewHero />
          <DealerNetwork />
          <RcTransfer buyer />
          <Testimonials variant="prenew" />
        </>
      )}

      <Footer tab={tab} />
    </main>
  );
}
