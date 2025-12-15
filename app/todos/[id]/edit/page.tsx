"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTodos } from "../../components/TodoProvider";

export default function EditTodoPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();

  const { todos, updateTodo } = useTodos();
  const todo = todos.find((t) => t.id === id);

  const [title, setTitle] = useState(todo?.title ?? "");

  if (!todo) {
    return (
      <div style={{ padding: 16 }}>
        <p>そのTODOは見つかりませんでした。</p>
      </div>
    );
  }

  const handleSave = () => {
    updateTodo(id, { title });
    router.push(`/todos/${id}`);
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>TODO編集</h1>

      <input
        type="text"
        placeholder="新しいタイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div style={{ marginTop: 12 }}>
        <button type="button" onClick={handleSave}>
          保存
        </button>
        <button type="button" onClick={() => router.push(`/todos/${id}`)}>
          キャンセル
        </button>
      </div>
    </div>
  );
}
