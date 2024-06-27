"use client"
import { Suspense } from "react"
import updateTodo from "../mutations/updateTodo"
import getTodo from "../queries/getTodo"
import { UpdateTodoSchema } from "../schemas"
import { FORM_ERROR, TodoForm } from "./TodoForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditTodo = ({ todoId }: { todoId: number }) => {
  const [todo, { setQueryData }] = useQuery(
    getTodo,
    { id: todoId },
    {
      staleTime: Infinity,
    }
  )
  const [updateTodoMutation] = useMutation(updateTodo)
  const router = useRouter()
  return (
    <>
      <div>
        <h1 className="text-gray-800 font-bold text-2xl uppercase">Project {todo.id}</h1>
        <h1>Edit Todo {todo.id}</h1>
        <hr className="my-2" />
        <pre>{JSON.stringify(todo, null, 2)}</pre>
        <hr className="my-2" />
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
                })
                await setQueryData(updated)
                router.refresh()
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}
