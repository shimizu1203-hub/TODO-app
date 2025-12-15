import { TodoProvider } from "./components/TodoProvider";

export default function TodosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TodoProvider>{children}</TodoProvider>;
}
