"use client";
import { Suspense } from "react";
import updateTodo from "../mutations/updateTodo";
import getTodo from "../queries/getTodo";
import { UpdateTodoSchema } from "../schemas";
import { FORM_ERROR, TodoForm } from "./TodoForm";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

export const EditTodo = ({ todoId }: { todoId: number }) => {
  const [todo, { setQueryData }] = useQuery(
    getTodo,
    { id: todoId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateTodoMutation] = useMutation(updateTodo);
  const router = useRouter();
  return (
    <>
      <div>
        <h1>Edit Todo {todo.id}</h1>
        <pre>{JSON.stringify(todo, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoForm
            submitText="Update Todo"
            schema={UpdateTodoSchema}
            initialValues={todo}
            onSubmit={async (values) => {
              try {
                const updated = await updateTodoMutation({
                  ...values,
                  id: todo.id,
                });
                await setQueryData(updated);
                router.refresh();
              } catch (error: any) {
                console.error(error);
                return {
                  [FORM_ERROR]: error.toString(),
                };
              }
            }}
          />
        </Suspense>
      </div>
    </>
  );
};
