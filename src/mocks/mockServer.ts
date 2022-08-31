import { setupServer } from 'msw/node';
import { routeHandlers } from './routeHandlers';


export const mockServer = setupServer(...routeHandlers);
