"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export type TodoStatus = "未着手" | "着手" | "完了";

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
  created_at: string; // DBにあるので合わせる
};

type TodosContextValue = {
  todos: Todo[];
  loading: boolean;
  reload: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (id: number, patch: Partial<Pick<Todo, "title" | "status">>) => Promise<void>;
};

const TodosContext = createContext<TodosContextValue | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("select error:", error);
      setLoading(false);
      return;
    }

    setTodos((data ?? []) as Todo[]);
    setLoading(false);
  };

  useEffect(() => {
    void reload();
  }, []);

  const addTodo = async (title: string) => {
    const v = title.trim();
    if (!v) return;

    const { error } = await supabase.from("todos").insert({
      title: v,
      // status はDB defaultが未着手なら省略でもOK。
      status: "未着手",
    });

    if (error) {
      console.error("insert error:", error);
      return;
    }

    await reload();
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("delete error:", error);
      return;
    }
    await reload();
  };

  const updateTodo = async (id: number, patch: Partial<Pick<Todo, "title" | "status">>) => {
    const { error } = await supabase.from("todos").update(patch).eq("id", id);
    if (error) {
      console.error("update error:", error);
      return;
    }
    await reload();
  };

  const value = useMemo(
    () => ({ todos, loading, reload, addTodo, deleteTodo, updateTodo }),
    [todos, loading]
  );

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used within <TodoProvider>");
  return ctx;
}
