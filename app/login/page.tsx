"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, signUp, signOut, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (loading) return <p className="p-6">Loading...</p>;

  // すでにログインしてたら TODO へ
  if (user) {
    return (
      <div className="p-6 max-w-md mx-auto space-y-4">
        <p className="text-center">ログイン中：{user.email}</p>
        <button
          className="w-full bg-red-500 text-white py-2 rounded"
          onClick={async () => {
            await signOut();
            router.refresh();
          }}
        >
          ログアウト
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">ログイン / サインアップ</h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border px-3 py-2 rounded"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-500 text-white py-2 rounded"
        onClick={async () => {
          try {
            setError(null);
            await signIn(email, password);
            router.push("/todos");
          } catch (e: any) {
            setError(e.message);
          }
        }}
      >
        ログイン
      </button>

      <button
        className="w-full bg-green-500 text-white py-2 rounded"
        onClick={async () => {
          try {
            setError(null);
            await signUp(email, password);
            alert("サインアップ成功（そのままログイン）");
            router.push("/todos");
          } catch (e: any) {
            setError(e.message);
          }
        }}
      >
        サインアップ
      </button>
    </div>
  );
}
