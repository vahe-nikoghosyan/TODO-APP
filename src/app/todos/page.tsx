import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { TodosList } from "./components/TodosList"

export const metadata: Metadata = {
  title: "Todos",
  description: "List of todos",
}

export default function Page() {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 w-full h-screen p-5">
      <p className="flex justify-center text-teal-50">
        <Link href={"/todos/new"}>Create Todo</Link>
      </p>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 border-gray-300">
        <Suspense fallback={<div>Loading...</div>}>
          <TodosList />
        </Suspense>
      </div>
    </div>
  )
}
