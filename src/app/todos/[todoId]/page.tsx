import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getTodo from "../queries/getTodo"
import { Todo } from "../components/Todo"

export async function generateMetadata({ params }: TodoPageProps): Promise<Metadata> {
  const Todo = await invoke(getTodo, { id: Number(params.todoId) })
  return {
    title: `Todo ${Todo.id} - ${Todo.name}`,
  }
}

type TodoPageProps = {
  params: { todoId: string }
}

export default async function Page({ params }: TodoPageProps) {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 w-full h-screen p-5">
      <p className="flex justify-center text-teal-50">
        <Link className="text-teal-50" href={"/todos"}>
          Todos
        </Link>
      </p>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 border-gray-300 p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Todo todoId={Number(params.todoId)} />
        </Suspense>
      </div>
    </div>
  )
}
