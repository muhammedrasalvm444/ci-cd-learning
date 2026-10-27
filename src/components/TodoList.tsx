import type { Todo } from "@/types/todo";
import { EmptyState } from "./EmptyState";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  filterLabel: string;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => boolean;
  onDelete: (id: string) => void;
}

export function TodoList({
  todos,
  filterLabel,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState filterLabel={filterLabel} />;
  }

  return (
    <ul className="divide-y divide-slate-100" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
