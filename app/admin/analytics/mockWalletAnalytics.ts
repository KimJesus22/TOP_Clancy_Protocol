import type {
  BanditoWalletRecord,
  WalletTransactionRecord,
} from "@/src/lib/walletAnalytics";

const codenames = [
  "Ghost_141",
  "Sector_TXT",
  "Torchline_09",
  "PaladinNode",
  "NedRelay",
  "Echo_Bandit",
  "Vault-22",
  "FPE_Runner",
  "DemaLeak",
  "TrenchPulse",
  "Signal_Cliff",
  "StaticNiner",
  "YellowTape",
  "CipherCrow",
  "NorthCell",
  "SouthMorse",
  "AshPacket",
  "NeonVessel",
  "OrbitJumpsuit",
  "VialBreak",
  "BandNode",
  "QuietLevitate",
  "CrimsonNico",
  "BlurLock",
  "SeizeKeons",
  "FuelSaturday",
  "OutsideEcho",
  "PaladinStrait",
  "MapRoom",
  "RedEnvelope",
  "StillAlive",
  "VoltBandito",
  "RadioGhost",
  "WickSignal",
  "EastIsUp",
  "RadarBloom",
  "NinerCross",
  "SilentTorch",
  "HexCarrier",
  "Orbit_Dema",
  "GhostLantern",
  "TorchDelta",
  "IndexClancy",
  "Torchglow",
  "CipherHelm",
  "VoldsoyWave",
  "BlueDragon",
  "TrenchMint",
  "StaticMule",
  "Signal_053",
];

const sectors = [
  "Sector-01",
  "Sector-03",
  "Sector-07",
  "Sector-TXT",
  "Sector-Ned",
  "Sector-East",
];

const ranks: BanditoWalletRecord["rank"][] = [
  "Scout",
  "Courier",
  "Infiltrator",
  "Torchbearer",
];

const rewardsCatalog = [
  { item: "Modo Blurryface", creditsSpent: 200, channel: "Smuggler" as const },
  { item: "Pase Paladin Strait", creditsSpent: 120, channel: "Smuggler" as const },
  { item: "Kit de Antorcha", creditsSpent: 80, channel: "Smuggler" as const },
  { item: "Paquete Decode Bonus", creditsSpent: 50, channel: "DecodeChallenge" as const },
  { item: "Badge Lyric Elite", creditsSpent: 60, channel: "LyricQuiz" as const },
];

export const banditoWalletUsers: BanditoWalletRecord[] = codenames.map((codename, index) => ({
  id: `bandito-${index + 1}`,
  codename,
  credits: 90 + ((index * 37) % 420) + (index % 6 === 0 ? 180 : 0),
  rank: ranks[index % ranks.length],
  sector: sectors[index % sectors.length],
}));

export const recentWalletTransactions: WalletTransactionRecord[] = Array.from(
  { length: 18 },
  (_, index) => {
    const user = banditoWalletUsers[(index * 3) % banditoWalletUsers.length];
    const reward = rewardsCatalog[index % rewardsCatalog.length];
    const hoursAgo = index * 4 + 2;

    return {
      id: `wallet-tx-${index + 1}`,
      codename: user.codename,
      item: reward.item,
      creditsSpent: reward.creditsSpent,
      occurredAt: new Date(Date.UTC(2026, 2, 26, 18 - hoursAgo, 15, 0)).toISOString(),
      channel: reward.channel,
    };
  },
);
