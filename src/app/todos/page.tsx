import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TodosList } from "./components/TodosList";

export const metadata: Metadata = {
  title: "Todos",
  description: "List of todos",
};

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/todos/new"}>Create Todo</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <TodosList />
      </Suspense>
    </div>
  );
}
