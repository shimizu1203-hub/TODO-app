"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTodos } from "../../components/TodoProvider";

export default function EditTodoPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();

  const { todos, updateTodo } = useTodos();

  const todo = useMemo(() => todos.find((t) => t.id === id), [todos, id]);

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (todo) setTitle(todo.title ?? "");
  }, [todo]);

  if (!todo) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h1 className="text-lg font-semibold">TODO編集</h1>
            <p className="mt-2 text-sm text-gray-600">
              そのTODOは見つかりませんでした。
            </p>

            <div className="mt-4">
              <Link className="text-blue-600 hover:underline" href="/todos">
                一覧へ戻る
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const handleSave = async () => {
    const v = title.trim();
    if (!v) return;

    await updateTodo(id, { title: v });
    router.push(`/todos/${id}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold">TODO編集</h1>
              <p className="mt-1 text-sm text-gray-600">
                タイトルを変更して保存できます
              </p>
            </div>

            <Link className="text-sm text-gray-600 hover:underline" href="/todos">
              一覧へ
            </Link>
          </div>

          <div className="mt-6 space-y-2">
            <label className="text-sm font-medium text-gray-700">
              新しいタイトル
            </label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
              placeholder="新しいタイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              保存
            </button>

            <button
              type="button"
              onClick={() => router.push(`/todos/${id}`)}
              className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
