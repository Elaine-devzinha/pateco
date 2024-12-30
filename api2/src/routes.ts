import type { FastifyInstance } from 'fastify';
import z from "zod"
import { FastifyTypedInstance } from './types';

export async function routes(app:FastifyTypedInstance) {
    app.post('/users', {
        schema:{
            body:z.object({
                name:z.string()
            })
        }
    }, () => {
        return 'Hello Brother'
    })
}