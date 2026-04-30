import { fireEvent, render, screen } from "@testing-library/react";
import LyricQuizEngine from "@/app/components/LyricQuizEngine";
import { topLessons } from "@/src/lib/data/lessons";
import { useTrenchWalletStore } from "@/src/store/trenchWalletStore";

describe("LyricQuizEngine", () => {
  beforeEach(() => {
    localStorage.clear();
    useTrenchWalletStore.setState({
      credits: 0,
      usedCodes: [],
      unlockedThemes: ["default"],
      activeTheme: "default",
    });
  });

  it("otorga 10 creditos por cada respuesta correcta y avanza a la siguiente transmision", () => {
    expect(topLessons).toHaveLength(10);

    render(<LyricQuizEngine lessons={topLessons} />);

    topLessons.forEach((lesson, index) => {
      expect(screen.getByText(`${index + 1}/${topLessons.length}`)).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: lesson.song })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: lesson.missingWord }));

      expect(useTrenchWalletStore.getState().credits).toBe((index + 1) * 10);
    });

    expect(screen.getByText(`1/${topLessons.length}`)).toBeInTheDocument();
    expect(useTrenchWalletStore.getState().credits).toBe(100);
  });
});
