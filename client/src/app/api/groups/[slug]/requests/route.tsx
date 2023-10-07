import { clientRequestHandler } from '@/utils/ApiFunctions';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const groupId = params.slug;
  return clientRequestHandler({
    req: request,
    apiHandler: async () => {
      return await ApiCommunicator.submitRequestGroup(groupId);
    },
    handlerNeedsBody: false,
  });
}
