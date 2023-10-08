import { clientRequestHandler } from '@/utils/ApiFunctions';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export async function GET(request: Request) {
  return clientRequestHandler({
    req: request,
    handlerNeedsBody: false,
    apiHandler: async () => {
      return await ApiCommunicator.getSubjects();
    },
  });
}
