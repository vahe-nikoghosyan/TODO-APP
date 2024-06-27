"use client";
import { FORM_ERROR, TodoForm } from "./TodoForm";
import { CreateTodoSchema } from "../schemas";
import { useMutation } from "@blitzjs/rpc";
import createTodo from "../mutations/createTodo";
import { useRouter } from "next/navigation";

export function New__ModelName() {
  const [createTodoMutation] = useMutation(createTodo);
  const router = useRouter();
  return (
    <TodoForm
      submitText="Create Todo"
      schema={CreateTodoSchema}
      onSubmit={async (values) => {
        try {
          const todo = await createTodoMutation(values);
          router.push(`/todos/${todo.id}`);
        } catch (error: any) {
          console.error(error);
          return {
            [FORM_ERROR]: error.toString(),
          };
        }
      }}
    />
  );
}
