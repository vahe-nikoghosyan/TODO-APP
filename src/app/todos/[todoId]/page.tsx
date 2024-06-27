import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getTodo from "../queries/getTodo";
import { Todo } from "../components/Todo";

export async function generateMetadata({
  params,
}: TodoPageProps): Promise<Metadata> {
  const Todo = await invoke(getTodo, { id: Number(params.todoId) });
  return {
    title: `Todo ${Todo.id} - ${Todo.name}`,
  };
}

type TodoPageProps = {
  params: { todoId: string };
};

export default async function Page({ params }: TodoPageProps) {
  return (
    <div>
      <p>
        <Link href={"/todos"}>Todos</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Todo todoId={Number(params.todoId)} />
      </Suspense>
    </div>
  );
}
