import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateTodoSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(UpdateTodoSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const todo = await db.todo.update({ where: { id }, data });

    return todo;
  }
);
