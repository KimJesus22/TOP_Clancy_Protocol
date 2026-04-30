import { fireEvent, render, screen } from "@testing-library/react";
import SmugglerStorefront from "@/app/smuggler/SmugglerStorefront";
import { useTrenchWalletStore } from "@/src/store/trenchWalletStore";

describe("SmugglerStorefront", () => {
  beforeEach(() => {
    localStorage.clear();
    useTrenchWalletStore.setState({
      credits: 50,
      usedCodes: [],
      unlockedThemes: ["default"],
      activeTheme: "default",
    });
  });

  it("muestra saldo insuficiente y no descuenta creditos cuando no alcanza para comprar", () => {
    render(<SmugglerStorefront />);

    fireEvent.click(screen.getByRole("button", { name: "Comprar Modo Blurryface" }));

    expect(screen.getByText(/Saldo insuficiente/i)).toBeInTheDocument();
    expect(useTrenchWalletStore.getState().credits).toBe(50);
    expect(useTrenchWalletStore.getState().unlockedThemes).toEqual(["default"]);
  });

  it("alterna Modo Blurryface con un unico boton contextual cuando ya esta desbloqueado", () => {
    useTrenchWalletStore.setState({
      credits: 250,
      usedCodes: [],
      unlockedThemes: ["default"],
      activeTheme: "default",
    });

    render(<SmugglerStorefront />);

    fireEvent.click(screen.getByRole("button", { name: "Comprar Modo Blurryface" }));

    expect(useTrenchWalletStore.getState().credits).toBe(50);
    expect(useTrenchWalletStore.getState().activeTheme).toBe("blurryface");
    expect(screen.getByRole("button", { name: "Volver a modo default" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Equipar Modo Blurryface" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Volver a modo default" }));

    expect(useTrenchWalletStore.getState().activeTheme).toBe("default");
    expect(screen.getByRole("button", { name: "Equipar Modo Blurryface" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Volver a modo default" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Equipar Modo Blurryface" }));

    expect(useTrenchWalletStore.getState().activeTheme).toBe("blurryface");
    expect(screen.getByRole("button", { name: "Volver a modo default" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Equipar Modo Blurryface" })).not.toBeInTheDocument();
  });
});
