"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { PrivacyApp, OperatingSystem } from "@/app/data/apps";
import Sidebar from "@/app/components/Sidebar";

function AppDetailContent({ app }: { app: PrivacyApp }) {
  const searchParams = useSearchParams();
  const selectedOs = (searchParams.get("os") ?? "iOS") as OperatingSystem;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
        <Sidebar selectedOs={selectedOs} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Link
            href={`/?os=${selectedOs}`}
            className="mb-5 inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-emerald-400"
          >
            ← All apps
          </Link>

          <section className="mt-5 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30">
            <div className="flex items-start gap-4 border-b border-slate-800 pb-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-cyan-400 text-base font-bold text-slate-950">
                {app.icon}
              </div>
              <div>
                <p className="text-sm text-emerald-400">Recommended guide</p>
                <h2 className="text-2xl font-semibold text-white">{app.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {app.settings.length} focused settings for {selectedOs} users.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {app.settings.map((setting) => (
                <article
                  key={setting.name}
                  className="rounded-3xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {setting.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {setting.impact}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
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
                          <span
                            key={`${setting.name}-${step}`}
                            className="flex items-center gap-2"
                          >
                            <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200">
                              {step}
                            </span>
                            {index < setting.clickPath.length - 1 && (
                              <span className="text-slate-600">→</span>
                            )}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function AppDetailClient({ app }: { app: PrivacyApp }) {
  return (
    <Suspense>
      <AppDetailContent app={app} />
    </Suspense>
  );
}
