"use client"
import { invalidateQuery, useMutation, usePaginatedQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import getTodos from "../queries/getTodos"
import { useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { Route } from "next"
import { FORM_ERROR, TodoForm } from "@/src/app/todos/components/TodoForm"
import { CreateTodoSchema } from "@/src/app/todos/schemas"
import { Todo } from "db"
import createTodo from "@/src/app/todos/mutations/createTodo"
import updateTodo from "@/src/app/todos/mutations/updateTodo"
import deleteTodo from "@/src/app/todos/mutations/deleteTodo"

const ITEMS_PER_PAGE = 5

export const TodosList = () => {
  const searchParams = useSearchParams()!
  const [createTodoMutation] = useMutation(createTodo)
  const [updateTodoMutation] = useMutation(updateTodo)
  const [deleteTodoMutation] = useMutation(deleteTodo)

  const page = Number(searchParams.get("page")) || 0
  const [{ todos, hasMore }] = usePaginatedQuery(getTodos, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const router = useRouter()
  const pathname = usePathname()

  const handleToggleComplete = async (todo: Todo) => {
    await updateTodoMutation({
      ...todo,
      completed: !todo.completed,
    })
    await invalidateQuery(getTodos)
  }

  const handleDeleteTodo = async (todoId: number) => {
    await deleteTodoMutation({ id: todoId })
    await invalidateQuery(getTodos)
  }

  const goToPreviousPage = () => {
    const params = new URLSearchParams(searchParams)
    params.set("page", (page - 1).toString())
    router.push((pathname + "?" + params.toString()) as Route)
  }
  const goToNextPage = () => {
    const params = new URLSearchParams(searchParams)
    params.set("page", (page + 1).toString())
    router.push((pathname + "?" + params.toString()) as Route)
  }

  return (
    <div>
      <div className="px-4 py-2 flex justify-center">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
      </div>

      <TodoForm
        className="w-full max-w-sm mx-auto px-4 py-2"
        submitText="Create Todo"
        schema={CreateTodoSchema}
        initialValues={{ completed: false }}
        onSubmit={async (values) => {
          try {
            const todo = await createTodoMutation(values)
            router.push(`/todos/${todo.id}`)
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <ul className="divide-y divide-gray-200 px-4">
        {todos.map((todo) => (
          <li className="py-4" key={todo.id}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <input
                  name={todo.name}
                  checked={todo.completed}
                  type="checkbox"
                  className="h-6 w-6 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  onChange={() => handleToggleComplete(todo)}
                />
                <Link href={`/todos/${todo.id}`}>
                  <label htmlFor="todo1" className="ml-3 block text-gray-900 max-w-32">
                    <span className="text-lg font-medium">{todo.name}</span>
                    <span className="text-sm font-light text-gray-500"> (ID: {todo.id})</span>
                  </label>
                </Link>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleToggleComplete(todo)}
                  className={`ml-2 p-2 ${
                    todo.completed ? "bg-green-500" : "bg-red-500"
                  } text-white rounded-md`}
                >
                  {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="ml-2 p-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center my-4">
        <button
          disabled={page === 0}
          onClick={goToPreviousPage}
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </button>
        <button
          disabled={!hasMore}
          onClick={goToNextPage}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  )
}
