"use client";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import deleteTodo from "../mutations/deleteTodo";
import getTodo from "../queries/getTodo";

export const Todo = ({ todoId }: { todoId: number }) => {
  const router = useRouter();
  const [deleteTodoMutation] = useMutation(deleteTodo);
  const [todo] = useQuery(getTodo, { id: todoId });

  return (
    <>
      <div>
        <h1>Project {todo.id}</h1>
        <pre>{JSON.stringify(todo, null, 2)}</pre>

        <Link href={`/todos/${todo.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTodoMutation({ id: todo.id });
              router.push("/todos");
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};
