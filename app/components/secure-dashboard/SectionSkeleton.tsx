type SectionSkeletonProps = {
  title: string;
  description: string;
  minHeightClass?: string;
};

export default function SectionSkeleton({
  title,
  description,
  minHeightClass = "min-h-[320px]",
}: SectionSkeletonProps) {
  return (
    <section
      aria-busy="true"
      className={`rounded-xl border border-clancy-line/80 bg-clancy-surface/88 p-6 backdrop-blur-md ${minHeightClass}`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
        Cargando modulo
      </p>
      <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-clancy-ink">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-clancy-muted">{description}</p>
      <div className="mt-6 space-y-3">
        <div className="h-12 rounded-lg border border-clancy-line/70 bg-clancy-raised/72" />
        <div className="h-12 rounded-lg border border-clancy-line/70 bg-clancy-raised/72" />
        <div className="h-12 rounded-lg border border-clancy-line/70 bg-clancy-raised/72" />
      </div>
    </section>
  );
}
