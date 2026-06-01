"use client";

import { useMemo, useState } from "react";

import { operatingSystems, privacyApps } from "@/app/data/apps";

export default function Home() {
  const [selectedOs, setSelectedOs] = useState<(typeof operatingSystems)[number]>(
    "iOS",
  );
  const [query, setQuery] = useState("");
  const [selectedAppId, setSelectedAppId] = useState<string>(privacyApps[0].id);

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

  const activeApp =
    filteredApps.find((app) => app.id === selectedAppId) ?? filteredApps[0] ?? null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-slate-800 bg-slate-950/95 px-4 py-6 lg:sticky lg:top-0 lg:min-h-screen lg:w-72 lg:border-r lg:border-b-0 lg:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-400">
            ToggleBase
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-white">
            Privacy & security guides
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Pick an operating system to instantly narrow the app list.
          </p>

          <nav aria-label="Operating systems" className="mt-6 space-y-2">
            {operatingSystems.map((os) => {
              const appCount = privacyApps.filter((app) => app.supportedOs.includes(os)).length;
              const isSelected = os === selectedOs;

              return (
                <button
                  key={os}
                  type="button"
                  onClick={() => setSelectedOs(os)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-emerald-400/60 bg-emerald-400/10 text-white"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="font-medium">{os}</span>
                  <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                    {appCount}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <section>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30">
                <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Selected OS</p>
                    <h2 className="text-xl font-semibold text-white">{selectedOs} app settings</h2>
                  </div>

                  <label className="block sm:max-w-xs sm:flex-1">
                    <span className="sr-only">Search apps</span>
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search apps"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400"
                    />
                  </label>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredApps.map((app) => {
                    const isActive = activeApp?.id === app.id;

                    return (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setSelectedAppId(app.id)}
                        className={`rounded-3xl border p-4 text-left transition ${
                          isActive
                            ? "border-emerald-400/60 bg-emerald-400/10"
                            : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-cyan-400 text-sm font-bold text-slate-950">
                            {app.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{app.name}</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-400">{app.summary}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {filteredApps.length === 0 ? (
                  <div className="mt-5 rounded-3xl border border-dashed border-slate-800 bg-slate-950 px-4 py-10 text-center text-sm text-slate-400">
                    No apps match that search for {selectedOs}.
                  </div>
                ) : null}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30">
              {activeApp ? (
                <>
                  <div className="flex items-start gap-4 border-b border-slate-800 pb-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-cyan-400 text-base font-bold text-slate-950">
                      {activeApp.icon}
                    </div>
                    <div>
                      <p className="text-sm text-emerald-400">Recommended guide</p>
                      <h2 className="text-2xl font-semibold text-white">{activeApp.name}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {activeApp.settings.length} focused settings for {selectedOs} users.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {activeApp.settings.map((setting) => (
                      <article
                        key={setting.name}
                        className="rounded-3xl border border-slate-800 bg-slate-950 p-4"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{setting.name}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-400">{setting.impact}</p>
                          </div>
                          <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-emerald-300 uppercase">
                            {setting.recommendedValue}
                          </span>
                        </div>

                        <dl className="mt-4 space-y-3 text-sm text-slate-300">
                          <div>
                            <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                              Click path
                            </dt>
                            <dd className="mt-1 flex flex-wrap items-center gap-2">
                              {setting.clickPath.map((step, index) => (
                                <span key={`${setting.name}-${step}`} className="flex items-center gap-2">
                                  <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200">
                                    {step}
                                  </span>
                                  {index < setting.clickPath.length - 1 ? (
                                    <span className="text-slate-600">→</span>
                                  ) : null}
                                </span>
                              ))}
                            </dd>
                          </div>
                        </dl>
                      </article>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex h-full min-h-80 items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-950 p-6 text-center text-sm leading-6 text-slate-400">
                  Choose an app to review its recommended privacy settings.
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
