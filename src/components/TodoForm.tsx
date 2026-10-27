"use client";

import { useState, type FormEvent } from "react";

interface TodoFormProps {
  onSubmit: (text: string) => boolean;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please enter a todo before adding.");
      return;
    }

    if (trimmed.length > 200) {
      setError("Keep it under 200 characters.");
      return;
    }

    const success = onSubmit(trimmed);
    if (success) {
      setText("");
      setError(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="todo-input" className="sr-only">
          New todo
        </label>
        <input
          id="todo-input"
          type="text"
          value={text}
          maxLength={200}
          placeholder="What needs to be done?"
          onChange={(event) => {
            setText(event.target.value);
            if (error) {
              setError(null);
            }
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "todo-input-error" : undefined}
          className="w-full flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 sm:shrink-0"
        >
          Add todo
        </button>
      </div>
      {error ? (
        <p id="todo-input-error" role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      ) : null}
    </form>
  );
}
