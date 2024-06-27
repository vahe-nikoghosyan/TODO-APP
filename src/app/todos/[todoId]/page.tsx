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
        <Suspense
          fallback={
            <div>Loading...</div>
            // <div role="status" className="max-w-sm animate-pulse">
            //   <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            //   <span className="sr-only">Loading...</span>
            // </div>
          }
        >
          <Todo todoId={Number(params.todoId)} />
        </Suspense>
      </div>
    </div>
  )
}
