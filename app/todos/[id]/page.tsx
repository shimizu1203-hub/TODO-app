"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTodos } from "../components/TodoProvider";

export default function TodoDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();

  const { todos, deleteTodo } = useTodos();
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return (
      <div style={{ padding: 16 }}>
        <p>そのTODOは見つかりませんでした。</p>
        <Link href="/todos">一覧へ</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>TODO詳細</h1>

      <p><b>タイトル:</b> {todo.title}</p>
      <p><b>進捗:</b> {todo.status}</p>

      <div style={{ margin: "12px 0" }}>
        <Link href={`/todos/${todo.id}/edit`}>編集へ</Link>{" "}
        <button
          type="button"
          onClick={() => {
            deleteTodo(todo.id);
            router.push("/todos");
          }}
        >
          削除
        </button>{" "}
        <Link href="/todos">一覧へ</Link>
      </div>
    </div>
  );
}
