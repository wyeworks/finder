import { Logger } from '@/services/Logger';

export async function GET() {
  Logger.debug('GET /api/health');
  return new Response('Still alive!', {
    status: 200,
  });
}
