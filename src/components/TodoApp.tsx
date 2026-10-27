"use client";

import { useTodos } from "@/hooks/useTodos";
import { TodoFilters } from "./TodoFilters";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export function TodoApp() {
  const {
    filteredTodos,
    filter,
    setFilter,
    isHydrated,
    activeCount,
    completedCount,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
  } = useTodos();

  const filterLabel =
    filter === "all" ? "all" : filter === "active" ? "active" : "completed";

  return (
    <div className="mx-auto w-full max-w-xl">
      <header className="mb-8 space-y-2 text-center sm:mb-10 sm:text-left">
        <p className="text-sm font-medium tracking-wide text-teal-800/80">
          Local task list
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Todo
        </h1>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          Add, edit, and track tasks. Everything stays in this browser.
        </p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <TodoForm onSubmit={addTodo} />
        </div>

        <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
          <TodoFilters current={filter} onChange={setFilter} />
        </div>

        <div className="min-h-[220px]">
          {!isHydrated ? (
            <div className="flex items-center justify-center py-16 text-sm text-slate-400">
              Loading todos…
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              filterLabel={filterLabel}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          )}
        </div>

        <footer className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p>
            <span className="font-medium text-slate-700">{activeCount}</span>{" "}
            {activeCount === 1 ? "item" : "items"} left
            {completedCount > 0 ? (
              <span className="text-slate-400">
                {" "}
                · {completedCount} completed
              </span>
            ) : null}
          </p>
          {completedCount > 0 ? (
            <button
              type="button"
              onClick={clearCompleted}
              className="self-start font-medium text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline sm:self-auto"
            >
              Clear completed
            </button>
          ) : null}
        </footer>
      </section>
    </div>
  );
}
