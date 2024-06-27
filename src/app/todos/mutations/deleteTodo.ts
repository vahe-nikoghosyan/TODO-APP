import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteTodoSchema } from "../schemas"

export default resolver.pipe(resolver.zod(DeleteTodoSchema), async ({ id }) => {
  const todo = await db.todo.deleteMany({ where: { id } })

  return todo
})
