"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTodos } from "../components/TodoProvider";

export default function NewTodoPage() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleCreate = () => {
    addTodo(title);
    router.push("/todos");
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>TODO作成</h1>

      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="button" onClick={handleCreate}>
        追加
      </button>

      <div style={{ marginTop: 12 }}>
        <button type="button" onClick={() => router.push("/todos")}>
          戻る
        </button>
      </div>
    </div>
  );
}
