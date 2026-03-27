export type BanditoWalletRecord = {
  id: string;
  codename: string;
  credits: number;
  rank: "Scout" | "Courier" | "Infiltrator" | "Torchbearer";
  sector: string;
};

export type WalletTransactionRecord = {
  id: string;
  codename: string;
  item: string;
  creditsSpent: number;
  occurredAt: string;
  channel: "Smuggler" | "DecodeChallenge" | "LyricQuiz";
};

export function calculateMeanBalance(users: BanditoWalletRecord[]) {
  if (users.length === 0) return 0;

  const total = users.reduce((sum, user) => sum + user.credits, 0);
  return total / users.length;
}

export function calculateMedianBalance(users: BanditoWalletRecord[]) {
  if (users.length === 0) return 0;

  const sortedBalances = users
    .map((user) => user.credits)
    .sort((left, right) => left - right);

  const middleIndex = Math.floor(sortedBalances.length / 2);

  if (sortedBalances.length % 2 === 0) {
    return (sortedBalances[middleIndex - 1] + sortedBalances[middleIndex]) / 2;
  }

  return sortedBalances[middleIndex];
}

export function calculateModeReward(transactions: WalletTransactionRecord[]) {
  if (transactions.length === 0) {
    return "Sin recompensas";
  }

  const itemCounts = transactions.reduce<Record<string, number>>((accumulator, transaction) => {
    accumulator[transaction.item] = (accumulator[transaction.item] ?? 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(itemCounts).sort((left, right) => right[1] - left[1])[0][0];
}
