import { defineMongooseModel } from '#nuxt/mongoose'

export interface Action {
    description: string
    beforeState: number[]
    afterState: number[]
}

export const ActionSchema = defineMongooseModel<Action>({
    name: 'Action',
    schema: {
        description: {
            type: 'string',
            required: true,
        },
        beforeState: {
            type: ['number'],
            required: true,
        },
        afterState: {
            type: ['number'],
            required: true,
        },
    },
    options: {
        timestamps: true,
    },
})
