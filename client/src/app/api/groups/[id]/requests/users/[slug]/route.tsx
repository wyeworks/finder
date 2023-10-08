import { clientRequestHandler } from '@/utils/ApiFunctions';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export async function GET(
  request: Request,
  { params }: { params: { slug: string; id: string } }
) {
  const groupId = params.id;
  const userId = params.slug;
  return clientRequestHandler({
    req: request,
    handlerNeedsBody: false,
    apiHandler: async () => {
      return await ApiCommunicator.getRequestStateGroup(groupId, userId);
    },
  });
}
