"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    setErrorMsg(null);
    setSubmitting(true);

    try {
      await signIn(email, password);
      router.push("/todos");
    } catch (err: any) {
      const message = err?.message ?? "";

      if (message.includes("Invalid login credentials")) {
        setErrorMsg("メールアドレスまたはパスワードが間違っています");
      } else if (message.includes("Email not confirmed")) {
        setErrorMsg("メールアドレスの確認が完了していません");
      } else {
        setErrorMsg("ログインに失敗しました");
      }
    } finally {
      // ★ これが無いとボタンが永久に押せなくなる
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4"
      >
        <h1 className="text-center text-2xl font-bold">ログイン</h1>

        <input
          className="w-full border rounded px-4 py-3"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMsg) setErrorMsg(null);
          }}
          autoComplete="email"
          disabled={submitting}
        />

        <input
          className="w-full border rounded px-4 py-3"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errorMsg) setErrorMsg(null);
          }}
          autoComplete="current-password"
          disabled={submitting}
        />

        {errorMsg && (
          <div className="border border-red-300 bg-red-50 text-red-700 rounded px-4 py-3 text-sm">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white rounded px-4 py-3 font-medium disabled:opacity-60"
        >
          {submitting ? "ログイン中..." : "ログイン"}
        </button>

        <p className="text-center text-sm">
          アカウントがない？{" "}
          <Link className="underline" href="/signup">
            サインアップ
          </Link>
        </p>
      </form>
    </div>
  );
}
