import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const requestBody = await request.json();

  const RAILS_API_URL = process.env.RAILS_API_URL;

  if (!RAILS_API_URL) {
    throw new Error('RAILS_API_URL is not defined');
  }

  if (!session?.user.accessToken) {
    throw new Error('Access token is not defined');
  }

  const URL = process.env.RAILS_API_URL + '/groups';

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session?.user.accessToken,
      },
      body: JSON.stringify({
        name: requestBody.name,
        description: requestBody.description,
        size: 7,
        subject_id: requestBody.subject_id,
        time_preferences: requestBody.time_preferences,
      }),
    });

    const responseBody = await response.json();
    return new Response(JSON.stringify(responseBody), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
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
