import { setupWorker } from 'msw'
import { apiHandlers } from './api'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...apiHandlers)
