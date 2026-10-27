interface EmptyStateProps {
  filterLabel: string;
}

export function EmptyState({ filterLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center">
      <div
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100"
      >
        <svg
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <div className="space-y-1">
        <p className="text-base font-medium text-slate-800">No todos here</p>
        <p className="max-w-xs text-sm leading-relaxed text-slate-500">
          {filterLabel === "all"
            ? "Add your first task above to get started."
            : `Nothing matches the “${filterLabel}” filter right now.`}
        </p>
      </div>
    </div>
  );
}
