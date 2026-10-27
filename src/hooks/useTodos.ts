"use client";

import {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { loadTodos, saveTodos } from "@/lib/storage";
import type { Todo, TodoFilter } from "@/types/todo";

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

let storeTodos: Todo[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Todo[] {
  if (storeTodos === null) {
    storeTodos = loadTodos();
  }
  return storeTodos;
}

function getServerSnapshot(): Todo[] {
  return [];
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  listeners.forEach((listener) => listener());
}

function setStoreTodos(updater: Todo[] | ((current: Todo[]) => Todo[])) {
  const current = getSnapshot();
  const next = typeof updater === "function" ? updater(current) : updater;
  storeTodos = next;
  saveTodos(next);
  notify();
}

export function useTodos() {
  const todos = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [filter, setFilter] = useState<TodoFilter>("all");

  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return false;
    }

    setStoreTodos((current) => [
      {
        id: createId(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
      ...current,
    ]);

    return true;
  }, []);

  const updateTodo = useCallback((id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return false;
    }

    setStoreTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo,
      ),
    );

    return true;
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setStoreTodos((current) => current.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setStoreTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setStoreTodos((current) => current.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const completedCount = todos.length - activeCount;

  return {
    todos,
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
  };
}
