import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getTodo from "../../queries/getTodo";
import { EditTodo } from "../../components/EditTodo";

type EditTodoPageProps = {
  params: { todoId: string };
};

export async function generateMetadata({
  params,
}: EditTodoPageProps): Promise<Metadata> {
  const Todo = await invoke(getTodo, { id: Number(params.todoId) });
  return {
    title: `Edit Todo ${Todo.id} - ${Todo.name}`,
  };
}

export default async function Page({ params }: EditTodoPageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTodo todoId={Number(params.todoId)} />
      </Suspense>
    </div>
  );
}
