"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { privacyApps, OperatingSystem } from "@/app/data/apps";
import Sidebar from "@/app/components/Sidebar";

function HomeContent() {
  const searchParams = useSearchParams();
  const selectedOs = (searchParams.get("os") ?? "iOS") as OperatingSystem;
  const [query, setQuery] = useState("");

  const filteredApps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return privacyApps.filter((app) => {
      const matchesOs = app.supportedOs.includes(selectedOs);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        app.name.toLowerCase().includes(normalizedQuery) ||
        app.summary.toLowerCase().includes(normalizedQuery);
      return matchesOs && matchesQuery;
    });
  }, [query, selectedOs]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
        <Sidebar selectedOs={selectedOs} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">Selected OS</p>
                <h2 className="text-xl font-semibold text-white">
                  {selectedOs} app settings
                </h2>
              </div>
              <label className="block sm:max-w-xs sm:flex-1">
                <span className="sr-only">Search apps</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search apps"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400"
                />
              </label>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredApps.map((app) => (
                <Link
                  key={app.id}
                  href={`/${app.id}?os=${selectedOs}`}
                  className="block rounded-3xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-emerald-400/40 hover:bg-slate-900"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-cyan-400 text-sm font-bold text-slate-950">
                      {app.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{app.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {app.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredApps.length === 0 && (
              <div className="mt-5 rounded-3xl border border-dashed border-slate-800 bg-slate-950 px-4 py-10 text-center text-sm text-slate-400">
                No apps match that search for {selectedOs}.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
