export async function POST(request: Request) {
    const requestBody = await request.json();

    //const RAILS_API_KEY = process.env.RAILS_API_KEY;
    const RAILS_API_URL = process.env.RAILS_API_URL;

    if (!RAILS_API_URL) {
        throw new Error('RAILS_API_URL is not defined');
    }

    const URL = process.env.RAILS_API_URL + '/api/v1/users';

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${RAILS_API_KEY}` // Assuming the Rails API uses Bearer token authentication
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to call Rails API');
        }

        const responseData = await response.json();

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {

        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}
