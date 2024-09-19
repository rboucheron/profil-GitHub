import vine from '@vinejs/vine'

export const registrationValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().trim(),
    password: vine.string().trim(),
  })
)
