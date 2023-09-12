import { Request } from 'next/dist/compiled/@edge-runtime/primitives';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const RAILS_API_URL = process.env.RAILS_API_URL;

  if (!RAILS_API_URL) {
    throw new Error('RAILS_API_URL is not defined');
  }

  const URL = process.env.RAILS_API_URL + '/users/' + params.id;

  const response = await fetch(URL);

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
