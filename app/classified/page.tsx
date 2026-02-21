import { Suspense } from "react";
import InterceptedMessages from "./InterceptedMessages";

function ClassifiedLoading() {
  return (
    <section className="rounded-xl border border-zinc-700 bg-black/80 p-6">
      <p className="font-mono text-sm uppercase tracking-[0.12em] text-zinc-400">
        Loading intercept stream...
      </p>
    </section>
  );
}

export default function ClassifiedPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center p-6">
      <Suspense fallback={<ClassifiedLoading />}>
        <InterceptedMessages />
      </Suspense>
    </main>
  );
}
