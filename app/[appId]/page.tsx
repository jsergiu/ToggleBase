import { notFound } from "next/navigation";

import { privacyApps } from "@/app/data/apps";
import AppDetailClient from "./AppDetailClient";

export function generateStaticParams() {
  return privacyApps.map((app) => ({ appId: app.id }));
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;
  const app = privacyApps.find((a) => a.id === appId);
  if (!app) notFound();

  return <AppDetailClient app={app} />;
}
