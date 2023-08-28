export async function GET(request: Request) {
  return new Response('Still alive!', {
    status: 200,
  });
}