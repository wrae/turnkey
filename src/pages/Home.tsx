import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section
      className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:py-12"
      id="home"
      aria-labelledby="home-title"
    >
      <h2
        id="home-title"
        className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
      >
        Your Trusted Cleaning &amp; Restoration Experts
      </h2>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-gray-700 leading-relaxed">
            Signature Turnkey Solutions provides professional cleaning and
            restoration services for apartments, Airbnbs, offices, restaurants,
            and post-construction projects. Our trained, background-checked
            crews use eco-friendly products and detailed checklists so every
            visit feels like a fresh start.
          </p>

          <ul className="mt-5 grid grid-cols-1 gap-2 text-gray-800 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
              10% off for first-time commercial customers
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
              Trained &amp; background-checked team members
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
              Flexible scheduling, including after-hours service
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
              Eco-friendly options safe for families and pets
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5 sm:p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold">
            Turnkey Cleaning Packages
          </h3>
          <p className="text-gray-700">
            Choose from routine maintenance visits, deep-clean options, or full
            post-construction cleaning. We’ll tailor a plan around your
            property, traffic levels, and budget.
          </p>
          <Link
            to="/pricing"
            className="mt-4 inline-block rounded-2xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            View Pricing Options
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-5 sm:p-6 shadow ring-1 ring-gray-100">
        <h3 className="text-lg font-semibold">Service Areas</h3>
        <p className="mt-2 text-gray-700">
          Signature Turnkey Solutions proudly serves Atlanta, GA and Dallas, TX,
          including their surrounding metro areas. We work with property
          managers, real estate professionals, office managers, restaurant
          owners, and event venues to keep every space guest-ready.
        </p>
      </div>
    </section>
  );
}