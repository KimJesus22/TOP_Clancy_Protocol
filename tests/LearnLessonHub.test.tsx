import { fireEvent, render, screen } from "@testing-library/react";
import LearnLessonHub from "@/app/components/LearnLessonHub";
import { topLessons } from "@/src/lib/data/lessons";

describe("LearnLessonHub", () => {
  it("muestra ejercicios coreanos y japoneses traducidos al cambiar idioma", () => {
    render(<LearnLessonHub lessons={topLessons} />);

    fireEvent.click(screen.getByRole("button", { name: "Korean" }));

    expect(screen.getByRole("heading", { name: "Intercepted Seoul Signal" })).toBeInTheDocument();
    expect(screen.getByText("안녕, 나의 [ _______ ]")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "친구" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Japanese" }));

    expect(screen.getByRole("heading", { name: "Tokyo Resistance Broadcast" })).toBeInTheDocument();
    expect(screen.getByText("未来へ、[ _______ ]")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ありがとう" })).toBeInTheDocument();
  });
});
