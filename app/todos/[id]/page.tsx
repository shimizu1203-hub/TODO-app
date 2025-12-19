"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTodos } from "../components/TodoProvider";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";

export default function TodoDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();

  const { todos, deleteTodo } = useTodos();
  const todo = todos.find((t) => t.id === id);

  const [comment, setComment] = useState("");

  if (!todo) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border bg-white p-6">
          <p className="text-lg font-semibold">そのTODOは見つかりませんでした。</p>
          <div className="mt-4">
            <Link className="text-blue-600 hover:underline" href="/todos">
              一覧へ戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusBadge =
    todo.status === "完了"
      ? "bg-green-100 text-green-800"
      : todo.status === "着手"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800";

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">TODO詳細</h1>
            <p className="mt-1 text-sm text-gray-500">ID: {todo.id}</p>
          </div>

          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${statusBadge}`}>
            {todo.status}
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">タイトル</div>
            <div className="mt-1 text-lg font-medium">{todo.title}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <ButtonLink variant="primary" href={`/todos/${todo.id}/edit`}>
            編集
          </ButtonLink>

          <Button
            variant="danger"
            type="button"
            onClick={() => {
              deleteTodo(todo.id);
              router.push("/todos");
            }}
          >
            削除
          </Button>

          <Link className="ml-auto text-sm text-gray-600 hover:underline" href="/todos">
            一覧へ
          </Link>
        </div>
         </div>
    </div>
  );
}
