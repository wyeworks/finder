import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const requestBody = await request.json();

  const RAILS_API_URL = process.env.RAILS_API_URL;

  if (!RAILS_API_URL) {
    throw new Error('RAILS_API_URL is not defined');
  }

  const URL = process.env.RAILS_API_URL + '/users/signup';

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: requestBody.name,
          email: requestBody.email,
          password: requestBody.password,
          birth_date: '2023-08-25 23:32:19.261991000 +0000',
        },
      }),
    });

    return new Response(response.body, {
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

export async function PATCH(request: Request) {
  const session = await getServerSession();
  const token = session?.user?.name;

  const requestBody = await request.json();
  const RAILS_API_URL = process.env.RAILS_API_URL;

  if (!RAILS_API_URL) {
    throw new Error('RAILS_API_URL is not defined');
  }

  if (!token) {
    throw new Error('Token is not defined');
  }

  const URL = process.env.RAILS_API_URL + 'users/signup';

  let bodyAux = '';
  // For testing only sending password
  if (requestBody.newPassword) {
    bodyAux = JSON.stringify({
      user: {
        password: requestBody.newPassword,
      },
    });
  } else {
    bodyAux = JSON.stringify({
      user: {
        name: requestBody.name,
        bio: requestBody.biography,
        birth_date: requestBody.birthdate,
      },
    });
  }

  try {
    const response = await fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: bodyAux,
    });

    return new Response(response.body, {
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
