import React, { useMemo, useState } from "react";

type LocationKey = "all" | "atlanta" | "dallas" | "volusia";

interface Service {
  id: string;
  name: string;
  description: string;
  category: "core" | "additional";
  locations: LocationKey[];
}

const LOCATIONS: { key: LocationKey; label: string }[] = [
  { key: "all", label: "Choose Your Location (show all services)" },
  { key: "atlanta", label: "Atlanta, GA" },
  { key: "dallas", label: "Dallas, TX" },
  { key: "volusia", label: "Volusia County, FL & Surrounding Areas" },
];

const SERVICES: Service[] = [
  // Core cleaning services from brochure
  {
    id: "apartment-airbnb",
    name: "Apartment & AIRBNB Cleaning and Turnover",
    description:
      "Keep your rental or apartment fresh and guest-ready with regular turnover cleaning for bedrooms, bathrooms, kitchens, and common areas.",
    category: "core",
    locations: ["atlanta", "dallas", "volusia"],
  },
  {
    id: "office-cleaning",
    name: "Office Cleaning",
    description:
      "Maintain a productive, professional workspace with routine cleaning for offices and commercial spaces.",
    category: "core",
    locations: ["atlanta", "dallas", "volusia"],
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    description:
      "Detail-focused cleaning that reaches baseboards, corners, fixtures, and high-touch areas for a healthier space.",
    category: "core",
    locations: ["atlanta", "dallas", "volusia"],
  },
  {
    id: "restaurant-event",
    name: "Restaurant and Event Cleaning",
    description:
      "Front-of-house and back-of-house cleaning for restaurants, venues, and event spaces before or after service.",
    category: "core",
    locations: ["atlanta", "dallas", "volusia"],
  },
  {
    id: "move-in-out",
    name: "Move-In / Move-Out Cleaning",
    description:
      "Thorough cleaning that helps properties present at their best for new tenants, buyers, or final walk-throughs.",
    category: "core",
    locations: ["atlanta", "dallas", "volusia"],
  },

  // Additional brochure services
  {
    id: "carpet-cleaning",
    name: "Carpet Cleaning",
    description:
      "Regular carpet care for small to medium spaces, lifting dirt and stains to keep flooring looking its best.",
    category: "additional",
    locations: ["atlanta", "dallas"],
  },
  {
    id: "water-mitigation",
    name: "Water Mitigation",
    description:
      "Response and cleanup to help reduce or prevent damage from water events, supporting mold prevention and property protection.",
    category: "additional",
    locations: ["dallas"],
  },
  {
    id: "construction-cleaning",
    name: "Construction Cleaning",
    description:
      "Post-construction cleanup that removes dust, debris, and residue so newly built or renovated spaces are ready to use.",
    category: "additional",
    locations: ["atlanta", "dallas", "volusia"],
  },
  {
    id: "post-event-cleaning",
    name: "Post-Event Cleaning",
    description:
      "Complete cleanup after parties, weddings, and corporate events including trash removal, floor care, and reset of the space.",
    category: "additional",
    locations: ["atlanta", "dallas", "volusia"],
  },

  // Location-specific specialty services
  {
    id: "mold-remediation",
    name: "Mold Remediation",
    description:
      "Assessment and cleanup support to address mold-affected areas and help restore a healthier environment.",
    category: "additional",
    locations: ["atlanta", "dallas"],
  },
  {
    id: "painting",
    name: "Painting",
    description:
      "Interior painting services to refresh walls and finishes as part of your turnkey property preparation.",
    category: "additional",
    locations: ["atlanta", "volusia"],
  },
  {
    id: "trash-outs",
    name: "Trash Outs",
    description:
      "Full-property trash outs and debris removal, ideal for turnovers, evictions, and abandoned units.",
    category: "additional",
    locations: ["dallas"],
  },
];

function filterServices(location: LocationKey): Service[] {
  if (location === "all") return SERVICES;
  return SERVICES.filter((s) => s.locations.includes(location));
}

function locationLabel(location: LocationKey): string {
  const found = LOCATIONS.find((l) => l.key === location);
  return found ? found.label : "";
}

export default function Services() {
  const [location, setLocation] = useState<LocationKey>("all");

  const filtered = useMemo(() => filterServices(location), [location]);
  const coreServices = filtered.filter((s) => s.category === "core");
  const additionalServices = filtered.filter((s) => s.category === "additional");

  return (
    <section
      className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:py-12"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="space-y-3">
        <h2
          id="services-title"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
        >
          Services by Location
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Signature Turnkey Solutions offers a full range of cleaning and specialty
          services. Use the location selector below to see what&apos;s available in
          each service area, or choose the default option to view everything we
          offer.
        </p>

        <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Choose your location
            </p>
            <p className="text-xs text-gray-600">
              Default shows all services across Atlanta, Dallas, and Volusia County.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as LocationKey)}
              className="mt-1 block rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.key} value={loc.key}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs text-gray-600">
          Currently showing services available in:{" "}
          <span className="font-semibold text-orange-600">
            {locationLabel(location)}
          </span>
          .
        </p>
      </div>

      {coreServices.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            Core Cleaning Services
          </h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.name}
                description={service.description}
              />
            ))}
          </div>
        </div>
      )}

      {additionalServices.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            Additional &amp; Specialty Services
          </h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.name}
                description={service.description}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="flex flex-col rounded-2xl bg-white p-5 shadow ring-1 ring-gray-100">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
        {description}
      </p>
    </article>
  );
}
