import { fireEvent, render, screen } from "@testing-library/react";
import TerminalInterface from "@/app/components/TerminalInterface";

describe("TerminalInterface", () => {
  it("responde a un comando valido", () => {
    render(<TerminalInterface />);

    const input = screen.getByPlaceholderText("Escribe un comando...");
    fireEvent.change(input, { target: { value: "open_discography" } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByText((_, element) => element?.textContent === "> open_discography")).toBeInTheDocument();
    expect(screen.getByText((_, element) => element?.textContent === "Acceso concedido: Discography archive linked.")).toBeInTheDocument();
  });

  it("desbloquea el archivo oculto con vialism y dispara el callback", () => {
    const onSecretUnlocked = jest.fn();

    render(<TerminalInterface onSecretUnlocked={onSecretUnlocked} />);

    const input = screen.getByPlaceholderText("Escribe un comando...");
    fireEvent.change(input, { target: { value: "vialism" } });
    fireEvent.submit(input.closest("form")!);

    expect(onSecretUnlocked).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Hidden Asset Unlocked")).toBeInTheDocument();
    expect(screen.getByText((_, element) => element?.textContent === "Codex VIALISM aceptado. Archivo oculto desbloqueado.")).toBeInTheDocument();
  });
});
