"use client";

import Link from "next/link";
import { useTodos } from "./components/TodoProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./components/Button";
import ButtonLink from "./components/ButtonLink";
import { useAuth } from "../lib/auth";

export default function TodosPage() {
  const { todos, deleteTodo, addTodo, updateTodo } = useTodos();
  const [title, setTitle] = useState("");

  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!user) return null;

    const activeTodos = todos.filter((t) => t.status !== "完了");
    const doneTodos = todos.filter((t) => t.status === "完了");


    const handleCreate = async () => {
    const v = title.trim();
    if (!v) return;

    await addTodo(v); // addTodo が async なら await 必須
    setTitle("");
  };

    const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };




  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1>TODO一覧</h1>

      <div className="mb-4 flex items-center justify-between">
  <div className="text-sm text-gray-600">
    {user ? `ログイン中: ${user.email}` : "未ログイン"}
  </div>
  <button
    className="border rounded px-3 py-1"
    type="button"
    onClick={() => signOut()}
  >
    ログアウト
  </button>
</div>


      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいTODO"
        />
        <button  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        type="button" onClick={handleCreate}>
          追加
        </button>
      </div>

      <h2>未完了</h2>
      <ul>
        {activeTodos.map((t) => (
          <li
  key={t.id}
  className="flex items-center justify-between gap-2 p-3 border rounded mb-2 hover:shadow"
>
  <div className="flex-1">
    <Link className="font-medium hover:underline" href={`/todos/${t.id}`}>
      {t.title}
    </Link>
    <div className="text-sm text-gray-500">（{t.status}）</div>
  </div>

  <div className="flex gap-2">
    <Button variant="success" type="button" onClick={() => updateTodo(t.id, { status: "完了" })}>
  完了
</Button>

<ButtonLink variant="primary" href={`/todos/${t.id}/edit`}>
  編集
</ButtonLink>

<Button variant="danger" type="button" onClick={() => deleteTodo(t.id)}>
  削除
</Button>

  </div>
</li>

        ))}
      </ul>

      <h2 style={{ marginTop: 20 }}>完了TODO</h2>
      <ul>
        {doneTodos.map((t) => (
          <li
  key={t.id}
  className="flex items-center justify-between gap-2 p-3 border rounded mb-2 opacity-60"
>
  <div className="flex-1">
    <Link className="font-medium line-through hover:underline" href={`/todos/${t.id}`}>
      {t.title}
    </Link>
    <div className="text-sm text-gray-500">（{t.status}）</div>
  </div>

  <div className="flex gap-2">
    <Button variant="ghost" type="button" onClick={() => updateTodo(t.id, { status: "未着手" })}>
      戻す
    </Button>

    <Button variant="danger" type="button" onClick={() => deleteTodo(t.id)}>
      削除
    </Button>
  </div>
</li>

        ))}
      </ul>
    </div>
  );
}

