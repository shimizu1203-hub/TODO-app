"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";

export default function SignupPage() {
  const { user, loading, signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loading && user) router.replace("/todos");
  }, [loading, user, router]);

  const onSignup = async () => {
    await signUp(email, password);
    // Email確認OFFならそのままログイン状態になることが多い
    // Email確認ONなら /login へ誘導して「メール確認してね」にするのが一般的
    router.push("/todos");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6">サインアップ</h1>

        <div className="space-y-3">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-green-600 text-white rounded py-2 hover:opacity-90"
            onClick={onSignup}
          >
            サインアップ
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          すでにアカウントある？{" "}
          <Link className="underline" href="/login">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
