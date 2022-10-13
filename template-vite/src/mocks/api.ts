import type { DefaultBodyType, ResponseResolver, RestContext, RestRequest } from 'msw'
import { rest } from 'msw'

type ApiRoute = ResponseResolver<RestRequest, RestContext, DefaultBodyType>

// delay request time in ms
const delay = 2000

/**
 * Handles a user's login request
 */
const login: ApiRoute = async (_request, response, context) =>
  response(context.delay(delay), context.json({ token: 'blablabla' }))

export const apiHandlers = [rest.post('/api/login', login)]
