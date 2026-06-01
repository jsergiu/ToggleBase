"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { operatingSystems, privacyApps, OperatingSystem } from "@/app/data/apps";

interface SidebarProps {
  selectedOs: OperatingSystem;
}

export default function Sidebar({ selectedOs }: SidebarProps) {
  const router = useRouter();

  return (
    <aside className="border-b border-slate-800 bg-slate-950/95 px-4 py-6 lg:sticky lg:top-0 lg:min-h-screen lg:w-72 lg:border-r lg:border-b-0 lg:px-6">
      <Link href={`/?os=${selectedOs}`} className="block">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-400">
          ToggleBase
        </p>
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-white">
        Privacy & security guides
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Pick an operating system to instantly narrow the app list.
      </p>

      <nav aria-label="Operating systems" className="mt-6 space-y-2">
        {operatingSystems.map((os) => {
          const appCount = privacyApps.filter((app) =>
            app.supportedOs.includes(os),
          ).length;
          const isSelected = os === selectedOs;

          return (
            <button
              key={os}
              type="button"
              onClick={() => router.push(`/?os=${os}`)}
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
  );
}
