import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateTodoSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(CreateTodoSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const todo = await db.todo.create({ data: input });

    return todo;
  }
);
