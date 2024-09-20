import vine from '@vinejs/vine'

export const githubRepotValidators = vine.compile(
  vine.object({
    name: vine.string().trim(),
    homepage: vine.string().trim(),
    description: vine.string().trim(),
    language: vine.string().trim(),
    htmlUrl: vine.string().trim(),
  })
)
