import { TodoApp } from "@/components/TodoApp";

export default function Home() {
  return (
    <main className="app-shell flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
      <TodoApp />
    </main>
  );
}
