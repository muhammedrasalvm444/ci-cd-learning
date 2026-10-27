import type { TodoFilter } from "@/types/todo";

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

interface TodoFiltersProps {
  current: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

export function TodoFilters({ current, onChange }: TodoFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter todos"
      className="flex w-full gap-1 rounded-xl bg-slate-100/80 p-1"
    >
      {FILTERS.map(({ value, label }) => {
        const isActive = current === value;

        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(value)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
