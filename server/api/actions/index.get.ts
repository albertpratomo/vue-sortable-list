export default defineEventHandler(async () => {
    return await ActionSchema.find()
})
