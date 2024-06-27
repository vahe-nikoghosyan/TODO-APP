import { z } from "zod"

export const CreateTodoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  completed: z.boolean(),
})
export const UpdateTodoSchema = CreateTodoSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteTodoSchema = z.object({
  id: z.number(),
})
