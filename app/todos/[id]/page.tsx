"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTodos } from "../components/TodoProvider";

export default function TodoDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();

  const { todos, deleteTodo, addComment } = useTodos();
  const todo = todos.find((t) => t.id === id);

  const [comment, setComment] = useState("");

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

      <p>
        <b>タイトル:</b> {todo.title}
      </p>
      <p>
        <b>進捗:</b> {todo.status}
      </p>

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

      <hr />

      <h2>コメント</h2>

      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="コメントを書く"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            addComment(todo.id, comment);
            setComment("");
          }}
        >
          追加
        </button>
      </div>

      {todo.comments.length === 0 ? (
        <p>コメントなし</p>
      ) : (
        <ul>
          {todo.comments.map((c, i) => (
            <li key={`${todo.id}-${i}`}>{c}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
