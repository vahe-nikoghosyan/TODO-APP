"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteTodo from "../mutations/deleteTodo"
import getTodo from "../queries/getTodo"

export const Todo = ({ todoId }: { todoId: number }) => {
  const router = useRouter()
  const [deleteTodoMutation] = useMutation(deleteTodo)
  const [todo] = useQuery(getTodo, { id: todoId })

  return (
    <>
      <div className="px-4 py-2">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M7.28856 0.796908C7.42258 0.734364 7.57742 0.734364 7.71144 0.796908L13.7114 3.59691C13.8875 3.67906 14 3.85574 14 4.05V10.95C14 11.1443 13.8875 11.3209 13.7114 11.4031L7.71144 14.2031C7.57742 14.2656 7.42258 14.2656 7.28856 14.2031L1.28856 11.4031C1.11252 11.3209 1 11.1443 1 10.95V4.05C1 3.85574 1.11252 3.67906 1.28856 3.59691L7.28856 0.796908ZM2 4.80578L7 6.93078V12.9649L2 10.6316V4.80578ZM8 12.9649L13 10.6316V4.80578L8 6.93078V12.9649ZM7.5 6.05672L12.2719 4.02866L7.5 1.80176L2.72809 4.02866L7.5 6.05672Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <h1 className="text-gray-800 font-bold text-2xl uppercase">Project {todo.id}</h1>
        <p>Name: {todo.name}</p>
        <p>Status: {todo.completed ? "Completed" : "In progress"}</p>
      </div>
      <div className="px-4 py-2">
        <Link href={`/todos/${todo.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTodoMutation({ id: todo.id })
              router.push("/todos")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}
