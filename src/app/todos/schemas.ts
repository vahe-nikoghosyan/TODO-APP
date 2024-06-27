import { z } from "zod";

export const CreateTodoSchema = z.object({
  name: z.string(),
  completed: z.boolean(),
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateTodoSchema = CreateTodoSchema.merge(
  z.object({
    id: z.number(),
  })
);

export const DeleteTodoSchema = z.object({
  id: z.number(),
});
