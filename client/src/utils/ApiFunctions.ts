import { Logger } from '@/services/Logger';

// eslint-disable-next-line no-unused-vars
type RequestHandler = (req: any) => Promise<Response>;

export async function clientRequestHandler({
  req,
  apiHandler,
  handlerNeedsBody = true,
}: {
  req: Request;
  apiHandler: RequestHandler;
  handlerNeedsBody?: boolean;
}): Promise<Response> {
  try {
    Logger.debug('START: Client side request');

    const body = handlerNeedsBody ? await req.json() : undefined;

    const response = await apiHandler(body);

    Logger.debug('Response from backend:');
    await Logger.logResponse(response);

    Logger.debug('END: Returning response for client side request');
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    Logger.error('Error processing client request', error);

    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
