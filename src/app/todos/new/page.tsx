import { Metadata } from "next"
import { Suspense } from "react"
import { New__ModelName } from "../components/NewTodo"
import Link from "next/link"

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new project",
}

export default function Page() {
  return (
    <div>
      <div className="bg-white border-gray-200 dark:bg-gray-900 w-full h-screen p-5">
        <p className="flex justify-center text-teal-50">
          <Link className="text-teal-50" href={"/todos"}>
            Todos
          </Link>
        </p>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 border-gray-300 p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <New__ModelName />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
