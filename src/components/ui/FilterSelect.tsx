import {
  useEffect,
  useId,
  useRef,
  type ComponentType,
} from "react";
import { ChevronDown, Check, type LucideProps } from "lucide-react";

const accentMap = {
  burgundy: "bg-rose-soft text-burgundy",
  sage: "bg-sage-soft text-sage",
  gold: "bg-[#f3ead7] text-[#7a6340]",
} as const;

export type FilterSelectAccent = keyof typeof accentMap;

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  icon: ComponentType<LucideProps>;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  accent?: FilterSelectAccent;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  id: string;
}

const FilterSelect = ({
  icon: Icon,
  label,
  value,
  onChange,
  options,
  accent = "burgundy",
  openId,
  setOpenId,
  id,
}: FilterSelectProps) => {
  const isOpen = openId === id;
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenId(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setOpenId]);

  return (
    <div ref={rootRef} className="relative flex min-w-0 flex-col gap-1.5">
      <span className="px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted/75">
        {label}
      </span>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setOpenId(isOpen ? null : id)}
        className={`
          relative flex w-full items-center gap-2 rounded-2xl border bg-white/90
          py-2.5 pl-2.5 pr-3 text-left text-sm font-medium text-ink
          shadow-[0_1px_0_rgba(60,47,47,0.03)] outline-none transition
          hover:border-burgundy/25
          ${
            isOpen
              ? "border-burgundy/40 ring-2 ring-burgundy/10"
              : "border-sand/90"
          }
        `}
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${accentMap[accent]}`}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
        <span className="min-w-0 flex-1 truncate">{selected?.label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-ink-muted/70 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="
            absolute left-0 right-0 top-[calc(100%+6px)] z-40
            max-h-56 overflow-auto rounded-2xl border border-sand
            bg-[#fdfaf8] p-1.5 shadow-[0_12px_32px_rgba(60,47,47,0.12)]
            animate-softRise
          "
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value || opt.label} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpenId(null);
                  }}
                  className={`
                    flex w-full items-center justify-between gap-2 rounded-xl
                    px-3 py-2.5 text-left text-sm font-medium transition
                    ${
                      active
                        ? "bg-rose-soft text-burgundy"
                        : "text-ink hover:bg-parchment/80"
                    }
                  `}
                >
                  <span>{opt.label}</span>
                  {active && (
                    <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterSelect;
