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
};

export type PrivacyApp = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  supportedOs: OperatingSystem[];
  settings: AppSetting[];
};

export const privacyApps: PrivacyApp[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "WA",
    summary: "Reduce metadata exposure and tighten account protections.",
    supportedOs: ["iOS", "Android", "macOS", "Windows"],
    settings: [
      {
        name: "Two-step verification",
        recommendedValue: "ON",
        clickPath: ["Settings", "Account", "Two-step verification"],
        impact:
          "Adds a PIN requirement so a stolen SMS code alone is not enough to take over the account.",
      },
      {
        name: "Last seen & online",
        recommendedValue: "My contacts",
        clickPath: ["Settings", "Privacy", "Last seen & online"],
        impact:
          "Limits passive activity tracking and makes it harder for strangers to profile your usage patterns.",
      },
      {
        name: "Default message timer",
        recommendedValue: "24 hours",
        clickPath: ["Settings", "Privacy", "Default message timer"],
        impact:
          "Reduces how long sensitive conversations remain visible on devices and in cloud backups.",
      },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "IG",
    summary: "Trim data sharing and make profile visibility more intentional.",
    supportedOs: ["iOS", "Android"],
    settings: [
      {
        name: "Similar account suggestions",
        recommendedValue: "OFF",
        clickPath: ["Edit profile", "Show account suggestions on profiles"],
        impact:
          "Prevents your account from being recommended broadly, reducing unwanted discovery.",
      },
      {
        name: "Activity status",
        recommendedValue: "OFF",
        clickPath: ["Settings and activity", "Messages and story replies", "Show activity status"],
        impact:
          "Stops Instagram from exposing when you are active or recently online to other users.",
      },
      {
        name: "Contacts syncing",
        recommendedValue: "OFF",
        clickPath: ["Settings and activity", "Accounts Center", "Your information and permissions", "Upload contacts"],
        impact:
          "Avoids sharing your address book with Meta and reduces cross-account profiling.",
      },
    ],
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "SP",
    summary: "Keep listening habits private and reduce social visibility.",
    supportedOs: ["iOS", "Android", "macOS", "Windows", "Linux"],
    settings: [
      {
        name: "Private session",
        recommendedValue: "ON when needed",
        clickPath: ["Settings", "Privacy", "Private session"],
        impact:
          "Temporarily hides listening activity from followers and recommendation-based social surfaces.",
      },
      {
        name: "Listening activity",
        recommendedValue: "OFF",
        clickPath: ["Settings", "Social", "Listening activity"],
        impact:
          "Stops real-time sharing of your listening habits to followers and linked social features.",
      },
      {
        name: "Ad personalization",
        recommendedValue: "OFF",
        clickPath: ["Settings", "Privacy", "Process my personal data for tailored ads"],
        impact:
          "Reduces profiling based on usage history and limits targeted advertising signals.",
      },
    ],
  },
];
