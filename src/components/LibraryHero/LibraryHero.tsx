import type { LibraryStats } from "../../types";

interface StatBoxProps {
  value: number | string;
  label: string;
}

const StatBox = ({ value, label }: StatBoxProps) => (
  <div className="rounded-2xl border border-white/50 bg-white/55 px-3 py-2.5 text-center backdrop-blur-sm">
    <p className="font-display text-xl font-semibold tabular-nums text-burgundy">
      {value}
    </p>
    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-burgundy/80">
      {label}
    </p>
  </div>
);

interface LibraryHeroProps {
  title?: string;
  subtitle?: string;
  stats?: LibraryStats;
}

const LibraryHero = ({
  title = "Your private reading library.",
  subtitle = "A calm shelf for every book you love — track what you’re reading, finish what you start, and keep favorites close.",
  stats = {},
}: LibraryHeroProps) => {
  const {
    total = 0,
    finished = 0,
    reading = 0,
    favorites = 0,
  } = stats;

  return (
    <section className="hero-shelf mb-5 rounded-[28px] border border-sand/70 p-5 shadow-[0_12px_40px_rgba(60,47,47,0.06)] sm:p-7 animate-softRise">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div className="min-w-0 max-w-xl flex-1">
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-[15px]">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[340px]">
          <StatBox value={total} label="Books" />
          <StatBox value={finished} label="Finished" />
          <StatBox value={reading} label="Reading" />
          <StatBox value={favorites} label="Favorites" />
        </div>
      </div>
    </section>
  );
};

export default LibraryHero;
