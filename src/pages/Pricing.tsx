import React from "react";

export default function Pricing() {
  return (
    <section
      className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:py-12"
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <h2
        id="pricing-title"
        className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
      >
        Flexible, Transparent Pricing
      </h2>

      <p className="text-gray-700 leading-relaxed">
        Every property is unique, so final pricing depends on size, layout,
        traffic, and frequency of service. The ranges below give a starting
        point—contact us for a customized quote for your space in Atlanta or
        Dallas.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <PlanCard
          name="Routine Cleaning"
          highlight="Best for apartments &amp; offices"
          price="Contact for quote"
          cadence="Weekly, bi-weekly, or monthly"
          features={[
            "Bathrooms, kitchens, and common areas",
            "Dusting, vacuuming, and mopping",
            "Trash removal and touch-point cleaning",
          ]}
        />
        <PlanCard
          name="Deep Cleaning"
          highlight="Recommended seasonally"
          price="Contact for quote"
          cadence="One-time or as needed"
          features={[
            "Everything in Routine Cleaning",
            "Baseboards, vents, and detail work",
            "Inside appliances and cabinets (on request)",
          ]}
          featured
        />
        <PlanCard
          name="Turnkey &amp; Specialty"
          highlight="Construction, mitigation &amp; events"
          price="Contact for quote"
          cadence="Custom schedule"
          features={[
            "Post-construction cleanup",
            "Water mitigation support",
            "Event and restaurant cleaning",
          ]}
        />
      </div>

      <p className="text-sm text-gray-600">
        All quotes are provided upfront with no hidden fees. We can also bundle
        services into a single turnkey package for property managers and
        multi-site clients.
      </p>
    </section>
  );
}

function PlanCard({
  name,
  highlight,
  price,
  cadence,
  features,
  featured,
}: {
  name: string;
  highlight: string;
  price: string;
  cadence: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <article
      className={
        "flex flex-col rounded-2xl border bg-white p-5 shadow-sm " +
        (featured
          ? "border-orange-500 shadow-md ring-1 ring-orange-200"
          : "border-slate-200")
      }
    >
      <h3 className="text-base font-semibold text-slate-900">{name}</h3>
      <p className="mt-1 text-sm text-orange-600">{highlight}</p>
      <p className="mt-4 text-2xl font-semibold text-slate-900">{price}</p>
      <p className="text-sm text-gray-600">{cadence}</p>
      <ul className="mt-4 space-y-1 text-sm text-gray-700">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 inline-flex items-center justify-center rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
        Request a Quote
      </button>
    </article>
  );
}