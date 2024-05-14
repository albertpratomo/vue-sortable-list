export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    return await new ActionSchema(body).save()
})
