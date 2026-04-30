import { useTrenchWalletStore } from "@/src/store/trenchWalletStore";

const initialState = {
  credits: 0,
  usedCodes: [] as string[],
  unlockedThemes: ["default"] as const,
  activeTheme: "default" as const,
};

describe("trenchWalletStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useTrenchWalletStore.setState({
      ...initialState,
    });
  });

  it("incrementa creditos cuando redeemCode recibe un codigo nuevo", () => {
    const success = useTrenchWalletStore.getState().redeemCode("keons");

    expect(success).toBe(true);
    expect(useTrenchWalletStore.getState().credits).toBe(50);
    expect(useTrenchWalletStore.getState().usedCodes).toContain("KEONS");
  });

  it("no duplica creditos cuando redeemCode reutiliza el mismo codigo", () => {
    useTrenchWalletStore.getState().redeemCode("SAHLOFOLINA");
    const secondAttempt = useTrenchWalletStore.getState().redeemCode("sahlofolina");

    expect(secondAttempt).toBe(false);
    expect(useTrenchWalletStore.getState().credits).toBe(50);
    expect(useTrenchWalletStore.getState().usedCodes).toEqual(["SAHLOFOLINA"]);
  });

  it("persiste creditos y codigos usados tras rehidratar el store", async () => {
    useTrenchWalletStore.getState().redeemCode("SAHLOFOLINA");
    useTrenchWalletStore.getState().redeemCode("KEONS");

    expect(useTrenchWalletStore.getState().credits).toBe(100);
    expect(useTrenchWalletStore.getState().usedCodes).toEqual(["SAHLOFOLINA", "KEONS"]);

    const persistedWallet = localStorage.getItem("trench-wallet");
    expect(persistedWallet).not.toBeNull();

    useTrenchWalletStore.setState({
      ...initialState,
    });
    localStorage.setItem("trench-wallet", persistedWallet!);

    await useTrenchWalletStore.persist.rehydrate();

    expect(useTrenchWalletStore.getState().credits).toBe(100);
    expect(useTrenchWalletStore.getState().usedCodes).toEqual(["SAHLOFOLINA", "KEONS"]);
  });
});
