export const operatingSystems = [
  "iOS",
  "Android",
  "macOS",
  "Windows",
  "Linux",
] as const;

export type OperatingSystem = (typeof operatingSystems)[number];

export type AppSetting = {
  name: string;
  recommendedValue: string;
  clickPath: string[];
  impact: string;
  source?: string;
};

export type PrivacyApp = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  supportedOs: OperatingSystem[];
  settings: AppSetting[];
};

import whatsapp from "./apps/whatsapp.json";
import tiktok from "./apps/tiktok.json";
import instagram from "./apps/instagram.json";
import facebook from "./apps/facebook.json";
import youtube from "./apps/youtube.json";
import telegram from "./apps/telegram.json";
import snapchat from "./apps/snapchat.json";
import twitterX from "./apps/twitter-x.json";
import googleMaps from "./apps/google-maps.json";
import googleChrome from "./apps/google-chrome.json";
import signal from "./apps/signal.json";
import spotify from "./apps/spotify.json";
import discord from "./apps/discord.json";
import gmail from "./apps/gmail.json";
import linkedin from "./apps/linkedin.json";
import netflix from "./apps/netflix.json";
import reddit from "./apps/reddit.json";
import zoom from "./apps/zoom.json";
import uber from "./apps/uber.json";
import chatgpt from "./apps/chatgpt.json";

export const privacyApps: PrivacyApp[] = [
  whatsapp,
  tiktok,
  instagram,
  facebook,
  youtube,
  telegram,
  snapchat,
  twitterX,
  googleMaps,
  googleChrome,
  signal,
  spotify,
  discord,
  gmail,
  linkedin,
  netflix,
  reddit,
  zoom,
  uber,
  chatgpt,
] as PrivacyApp[];
