import React, { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:py-12"
      id="contact"
      aria-labelledby="contact-title"
    >
      <h2
        id="contact-title"
        className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
      >
        Request a Free Quote
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 text-gray-700">
          <p>
            Tell us about your property, the type of cleaning or restoration you
            need, and how often you&apos;d like service. We&apos;ll follow up
            with a customized quote for your space in Atlanta or Dallas.
          </p>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Call or Text
            </h3>
            <p>Atlanta: (770) 569-3502</p>
            <p>Dallas: (469) 630-1609</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Email</h3>
            <p>info@signatureATL.com</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Service Hours
            </h3>
            <p>Daytime, evening, and after-hours scheduling available.</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl bg-white p-5 shadow ring-1 ring-gray-100"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First Name" id="first" />
            <Field label="Last Name" id="last" />
          </div>
          <Field label="Email" id="email" type="email" />
          <Field label="Phone" id="phone" type="tel" />
          <Field label="City" id="city" />
          <div>
            <label
              htmlFor="serviceType"
              className="block text-sm font-medium text-slate-900"
            >
              Service Type
            </label>
            <select
              id="serviceType"
              className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option>Apartment / Airbnb Turnover</option>
              <option>Office Cleaning</option>
              <option>Restaurant / Event Cleaning</option>
              <option>Construction Cleaning</option>
              <option>Water Mitigation</option>
              <option>Carpet &amp; Upholstery Cleaning</option>
              <option>Other / Custom Package</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-slate-900"
            >
              Property &amp; Schedule Details
            </label>
            <textarea
              id="details"
              rows={4}
              className="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Tell us about square footage, number of rooms, current condition, and preferred schedule."
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Submit Request
          </button>
          {submitted && (
            <p className="text-sm text-green-700">
              Thank you! This demo form has been submitted. Connect it to your
              CRM or email handler in production.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
}: {
  label: string;
  id: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-900"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
      />
    </div>
  );
}