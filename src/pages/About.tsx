import React from "react";

export default function About() {
  return (
    <section
      className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:py-12"
      id="about"
      aria-labelledby="about-title"
    >
      <h2
        id="about-title"
        className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
      >
        About Signature Turnkey Solutions
      </h2>

      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <p className="text-gray-700 leading-relaxed">
          Signature Turnkey Solutions brings together years of hands-on
          experience in cleaning, construction support, and property
          maintenance. We serve property managers, business owners, and
          homeowners who want one dependable partner to keep their spaces
          spotless, safe, and ready for guests or customers.
        </p>

        <div className="rounded-3xl bg-slate-50 p-5 sm:p-6 shadow">
          <h3 className="text-lg font-semibold">What &quot;Turnkey&quot; Means</h3>
          <p className="mt-2 text-gray-700">
            From construction cleanup to restaurant and office maintenance, we
            handle the details so you can simply open the door and get to work.
            Our team can coordinate ongoing visits, specialty services, and
            emergency water mitigation under a single, easy-to-manage plan.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Metro Areas Served" value="Atlanta, Dallas &amp; Volusia County, FL &amp; Surrounding Areas" />
        <Stat label="Service Types" value="Cleaning &amp; Restoration" />
        <Stat label="Scheduling" value="Day, Evening &amp; Emergency" />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 text-center shadow ring-1 ring-gray-100">
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}