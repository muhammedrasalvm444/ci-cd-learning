"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => boolean;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function startEditing() {
    setDraft(todo.text);
    setError(null);
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraft(todo.text);
    setError(null);
    setIsEditing(false);
  }

  function saveEdit(event?: FormEvent) {
    event?.preventDefault();

    const trimmed = draft.trim();
    if (!trimmed) {
      setError("Todo cannot be empty.");
      return;
    }

    if (trimmed.length > 200) {
      setError("Keep it under 200 characters.");
      return;
    }

    const success = onUpdate(todo.id, trimmed);
    if (success) {
      setIsEditing(false);
      setError(null);
    }
  }

  return (
    <li className="border-b border-slate-100 last:border-b-0">
      <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-3 sm:px-5">
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <form onSubmit={saveEdit} className="space-y-2" noValidate>
              <input
                ref={inputRef}
                type="text"
                value={draft}
                maxLength={200}
                onChange={(event) => {
                  setDraft(event.target.value);
                  if (error) {
                    setError(null);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    cancelEditing();
                  }
                }}
                aria-label="Edit todo"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `todo-edit-error-${todo.id}` : undefined}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
              {error ? (
                <p
                  id={`todo-edit-error-${todo.id}`}
                  role="alert"
                  className="text-xs text-rose-600"
                >
                  {error}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p
              className={`break-words text-sm leading-relaxed sm:text-[0.95rem] ${
                todo.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-800"
              }`}
            >
              {todo.text}
            </p>
          )}
        </div>

        {!isEditing ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onToggle(todo.id)}
              aria-label={
                todo.completed
                  ? `Mark “${todo.text}” as active`
                  : `Complete “${todo.text}”`
              }
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                todo.completed
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-teal-700 text-white hover:bg-teal-800"
              }`}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
              type="button"
              onClick={startEditing}
              aria-label={`Edit “${todo.text}”`}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete “${todo.text}”`}
              className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </li>
  );
}
