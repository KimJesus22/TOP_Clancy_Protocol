import Link from "next/link";
import { BookOpen, Shield, Terminal, ArrowLeft } from "lucide-react";
import LearnLessonHub from "../components/LearnLessonHub";
import { topLessons } from "@/src/lib/data/lessons";

const modules = [
  {
    id: "vocabulary-core",
    title: "Lexicon Core",
    description: "Vocabulario esencial para misiones de comunicacion en ingles.",
    level: "Basico",
    icon: BookOpen,
  },
  {
    id: "defense-grammar",
    title: "Grammar Shield",
    description: "Estructuras gramaticales para respuestas claras y seguras.",
    level: "Intermedio",
    icon: Shield,
  },
  {
    id: "conversation-console",
    title: "Conversation Terminal",
    description: "Practica guiada de speaking en escenarios reales.",
    level: "Avanzado",
    icon: Terminal,
  },
];

export default function LearnPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-6 md:p-10">
      <section className="rounded-xl border border-clancy-trench/70 bg-black/40 p-6 backdrop-blur-md">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Dashboard de Progreso
        </p>
        <h1 className="mt-2 font-mono text-3xl text-white">
          Nivel de Linguistica Bandito
        </h1>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <article className="rounded-md border border-clancy-trench/50 bg-black/35 p-4">
            <p className="text-sm text-gray-300">Nivel Actual</p>
            <p className="mt-1 font-mono text-2xl text-clancy-trench">B1</p>
          </article>
          <article className="rounded-md border border-clancy-trench/50 bg-black/35 p-4">
            <p className="text-sm text-gray-300">Racha de Estudio</p>
            <p className="mt-1 font-mono text-2xl text-clancy-trench">12 dias</p>
          </article>
          <article className="rounded-md border border-clancy-trench/50 bg-black/35 p-4">
            <p className="text-sm text-gray-300">Modulos Completados</p>
            <p className="mt-1 font-mono text-2xl text-clancy-trench">7/15</p>
          </article>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-clancy-trench/70 bg-black/40 p-6 backdrop-blur-md">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Modulos de Desencriptacion
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article
                key={module.id}
                className="rounded-lg border border-clancy-trench/50 bg-black/35 p-5 transition-all duration-300 hover:shadow-[0_0_18px_rgba(252,227,0,0.22)]"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-clancy-trench" />
                  <h2 className="font-mono text-lg text-white">{module.title}</h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">{module.description}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-clancy-trench">
                  Nivel: {module.level}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <LearnLessonHub lessons={topLessons} />

      <Link
        href="/"
        className="fixed bottom-36 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-clancy-trench/70 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_16px_rgba(252,227,0,0.28)]"
      >
        <ArrowLeft className="h-4 w-4 text-clancy-trench" />
        Volver al Centro de Mando
      </Link>
    </main>
  );
}
