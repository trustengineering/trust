import { messenger } from './lambda';

const httpRoute = (api, httpPath) => api.post(httpPath(`/messages`), messenger);

export default httpRoute;
