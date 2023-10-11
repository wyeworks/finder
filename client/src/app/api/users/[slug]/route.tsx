import { clientRequestHandler } from '@/utils/ApiFunctions';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const userId = params.slug;
  return clientRequestHandler({
    req: request,
    apiHandler: async () => {
      return await ApiCommunicator.getUser(userId);
    },
    handlerNeedsBody: false,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const userId = params.slug;
  return clientRequestHandler({
    req: request,
    apiHandler: async () => {
      return await ApiCommunicator.deleteUser(userId);
    },
    handlerNeedsBody: false,
  });
}
