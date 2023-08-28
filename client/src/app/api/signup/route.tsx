export async function POST(request: Request) {
    const requestBody = await request.json();
    console.log("Received data:", requestBody);

    return new Response(null, {
        status: 200,
    });
}