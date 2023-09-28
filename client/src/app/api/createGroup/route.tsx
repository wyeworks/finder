import { clientRequestHandler } from '@/utils/ApiFunctions';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export async function POST(request: Request) {
  return clientRequestHandler({
    req: request,
    apiHandler: async (reqBody) => {
      return await ApiCommunicator.createGroup({
        name: reqBody.name,
        description: reqBody.description,
        size: reqBody.size,
        subject_id: reqBody.subject_id,
        time_preferences: reqBody.time_preferences,
      });
    },
  });
}
