import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  rest,
  RestContext,
  RestRequest,
} from 'msw';

type ApiRoute = ResponseResolver<
  RestRequest<DefaultBodyType, PathParams<string>>,
  RestContext,
  DefaultBodyType
>;

/**
 * Handles a user's login request
 */
const login: ApiRoute = async (_req, res, c) =>
  res(c.delay(2000), c.json({ token: 'blablabla' }));

export const apiHandlers = [rest.post('/api/login', login)];
