import { debug } from 'console';
import pino from 'pino';

export const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    level: "debug"
})